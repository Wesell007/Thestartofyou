import { sendLovableEmail } from 'npm:@lovable.dev/email-js'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { parseEmailQueuePayload, type EmailQueuePayload } from '../_shared/validation.ts'

const MAX_RETRIES = 5
const DEFAULT_BATCH_SIZE = 10
const DEFAULT_SEND_DELAY_MS = 200
const DEFAULT_AUTH_TTL_MINUTES = 15
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60

class CompletionError extends Error {}

// Check if an error is a rate-limit (429) response.
// Uses EmailAPIError.status when available (email-js >=0.x with structured errors),
// falls back to parsing the error message for older versions.
function isRateLimited(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    return (error as { status: number }).status === 429
  }
  return error instanceof Error && error.message.includes('429')
}

// Check if an error is a forbidden (403) response, which means emails are
// disabled for this project. Retrying won't help — move straight to DLQ.
function isForbidden(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    return (error as { status: number }).status === 403
  }
  return error instanceof Error && error.message.includes('403')
}

// Extract Retry-After seconds from a structured EmailAPIError, or default to 60s.
function getRetryAfterSeconds(error: unknown): number {
  if (error && typeof error === 'object' && 'retryAfterSeconds' in error) {
    return (error as { retryAfterSeconds: number | null }).retryAfterSeconds ?? 60
  }
  return 60
}

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) {
    return null
  }

  try {
    const payload = parts[1]
      .replaceAll('-', '+')
      .replaceAll('_', '/')
      .padEnd(Math.ceil(parts[1].length / 4) * 4, '=')

    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch {
    return null
  }
}

// Move a message to the dead letter queue and log the reason.
async function moveToDlq(
  supabase: ReturnType<typeof createClient>,
  queue: string,
  msg: { msg_id: number; message: Record<string, unknown> },
  reason: string
): Promise<void> {
  const payload = msg.message
  const { error } = await supabase.rpc('move_to_dlq', {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload,
  })
  if (error) {
    console.error('Failed to move message to DLQ', { queue, msg_id: msg.msg_id, reason, error })
    throw error
  }
  const { error: logError } = await supabase.from('email_send_log').insert({
    message_id: typeof payload.message_id === 'string' ? payload.message_id : null,
    template_name: typeof payload.label === 'string' && payload.label ? payload.label : queue,
    recipient_email: typeof payload.to === 'string' && payload.to ? payload.to : 'invalid-payload@invalid.local',
    status: 'dlq',
    error_message: reason.slice(0, 1000),
  })
  if (logError) {
    console.error('Message moved to DLQ but audit log failed', { queue, msg_id: msg.msg_id, error: logError })
  }
  if (typeof payload.message_id === 'string' && payload.message_id) {
    const { error: releaseError } = await supabase.rpc('release_email_delivery', {
      p_message_id: payload.message_id,
    })
    if (releaseError) {
      console.error('Failed to release delivery claim after DLQ move', { message_id: payload.message_id, error: releaseError })
    }
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', Allow: 'POST' } }
    )
  }

  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables')
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Defense in depth: verify_jwt=true already requires a valid JWT at the
  // gateway layer. This adds an explicit role check so only service-role
  // callers can trigger queue processing.
  const token = authHeader.slice('Bearer '.length).trim()
  const claims = parseJwtClaims(token)
  if (claims?.role !== 'service_role') {
    return new Response(
      JSON.stringify({ error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // 1. Check rate-limit cooldown and read queue config
  const { data: state, error: stateError } = await supabase
    .from('email_send_state')
    .select('retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes')
    .single()

  if (stateError) {
    console.error('Failed to load email send state', stateError)
    return new Response(
      JSON.stringify({ error: 'Could not load queue configuration' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (state?.retry_after_until && new Date(state.retry_after_until) > new Date()) {
    return new Response(
      JSON.stringify({ skipped: true, reason: 'rate_limited' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE
  const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS
  const ttlMinutes: Record<string, number> = {
    auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
    transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES,
  }

  let totalProcessed = 0

  // 2. Process auth_emails first (priority), then transactional_emails
  for (const queue of ['auth_emails', 'transactional_emails']) {
    const { data: messages, error: readError } = await supabase.rpc('read_email_batch', {
      queue_name: queue,
      batch_size: batchSize,
      vt: 30,
    })

    if (readError) {
      console.error('Failed to read email batch', { queue, error: readError })
      continue
    }

    if (!messages?.length) continue

    // Retry budget is based on real send failures, not pgmq read_ct.
    // read_ct increments for every message in a claimed batch, including
    // messages not attempted when a 429 stops processing early.
    const messageIds = Array.from(
      new Set(
        messages
          .map((msg) =>
            msg?.message?.message_id && typeof msg.message.message_id === 'string'
              ? msg.message.message_id
              : null
          )
          .filter((id): id is string => Boolean(id))
      )
    )
    const failedAttemptsByMessageId = new Map<string, number>()
    if (messageIds.length > 0) {
      const { data: failedRows, error: failedRowsError } = await supabase
        .from('email_send_log')
        .select('message_id')
        .in('message_id', messageIds)
        .eq('status', 'failed')

      if (failedRowsError) {
        console.error('Failed to load failed-attempt counters', {
          queue,
          error: failedRowsError,
        })
      } else {
        for (const row of failedRows ?? []) {
          const messageId = row?.message_id
          if (typeof messageId !== 'string' || !messageId) continue
          failedAttemptsByMessageId.set(
            messageId,
            (failedAttemptsByMessageId.get(messageId) ?? 0) + 1
          )
        }
      }
    }

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      const rawPayload = msg.message as Record<string, unknown>
      const payloadResult = parseEmailQueuePayload(rawPayload)
      if (!payloadResult.ok) {
        console.error('Invalid email queue payload', {
          queue,
          msg_id: msg.msg_id,
          reason: payloadResult.error,
        })
        try {
          await moveToDlq(supabase, queue, msg, `Invalid payload: ${payloadResult.error}`)
        } catch {
          // The queue message remains available for an operational retry.
        }
        continue
      }
      const payload: EmailQueuePayload = payloadResult.value
      const failedAttempts =
        payload?.message_id && typeof payload.message_id === 'string'
          ? (failedAttemptsByMessageId.get(payload.message_id) ?? 0)
          : msg.read_ct ?? 0

      // Drop expired messages (TTL exceeded).
      // Prefer payload.queued_at when present; fall back to PGMQ's enqueued_at
      // which is always set by the queue.
      const queuedAt = payload.queued_at ?? msg.enqueued_at
      if (queuedAt) {
        const ageMs = Date.now() - new Date(queuedAt).getTime()
        const maxAgeMs = ttlMinutes[queue] * 60 * 1000
        if (ageMs > maxAgeMs) {
          console.warn('Email expired (TTL exceeded)', {
            queue,
            msg_id: msg.msg_id,
            queued_at: queuedAt,
            ttl_minutes: ttlMinutes[queue],
          })
          try {
            await moveToDlq(supabase, queue, msg, `TTL exceeded (${ttlMinutes[queue]} minutes)`)
          } catch {
            // Keep the source message for an operational retry.
          }
          continue
        }
      }

      // Move to DLQ if max failed send attempts reached.
      if (failedAttempts >= MAX_RETRIES) {
        try {
          await moveToDlq(supabase, queue, msg, `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`)
        } catch {
          // Keep the source message for an operational retry.
        }
        continue
      }

      const { data: claimState, error: claimError } = await supabase.rpc('claim_email_delivery', {
        p_message_id: payload.message_id,
        p_lease_seconds: 120,
      })
      if (claimError) {
        console.error('Failed to claim email delivery', { queue, msg_id: msg.msg_id, error: claimError })
        continue
      }
      if (claimState === 'sent') {
        const { error: duplicateDeleteError } = await supabase.rpc('delete_email', {
          queue_name: queue,
          message_id: msg.msg_id,
        })
        if (duplicateDeleteError) {
          console.error('Failed to delete an already-sent queue message', {
            queue,
            msg_id: msg.msg_id,
            error: duplicateDeleteError,
          })
        }
        continue
      }
      if (claimState !== 'claimed') {
        // Another worker owns the lease. Leave this message for a later read.
        continue
      }

      try {
        await sendLovableEmail(
          {
            run_id: payload.run_id,
            to: payload.to,
            from: payload.from,
            sender_domain: payload.sender_domain,
            subject: payload.subject,
            html: payload.html,
            text: payload.text,
            purpose: payload.purpose,
            label: payload.label,
            idempotency_key: payload.idempotency_key,
            unsubscribe_token: payload.unsubscribe_token,
            message_id: payload.message_id,
          },
          // sendUrl is optional — when LOVABLE_SEND_URL is not set, the library
          // falls back to the default Lovable API endpoint (https://api.lovable.dev).
          // Set LOVABLE_SEND_URL as a Supabase secret to override (e.g. for local dev).
          { apiKey, sendUrl: Deno.env.get('LOVABLE_SEND_URL') }
        )

        // Audit success, mark the claim sent and acknowledge the PGMQ message in
        // one database transaction. If this fails, the stable provider
        // idempotency key makes the subsequent retry safe.
        const { data: completed, error: completionError } = await supabase.rpc('complete_email_delivery', {
          p_queue_name: queue,
          p_queue_message_id: msg.msg_id,
          p_message_id: payload.message_id,
          p_template_name: payload.label || queue,
          p_recipient_email: payload.to,
        })
        if (completionError || !completed) {
          throw new CompletionError(`Email sent but completion transaction failed: ${completionError?.message ?? 'queue acknowledgement failed'}`)
        }
        totalProcessed++
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        console.error('Email send failed', {
          queue,
          msg_id: msg.msg_id,
          read_ct: msg.read_ct,
          failed_attempts: failedAttempts,
          error: errorMsg,
        })

        if (error instanceof CompletionError) {
          // The provider accepted the message. Keep the claim until its lease
          // expires and retry with the same idempotency key; do not consume the
          // provider-failure retry budget.
          continue
        }

        if (isRateLimited(error)) {
          const { error: rateLogError } = await supabase.from('email_send_log').insert({
            message_id: payload.message_id,
            template_name: payload.label || queue,
            recipient_email: payload.to,
            status: 'rate_limited',
            error_message: errorMsg.slice(0, 1000),
          })
          if (rateLogError) {
            console.error('Failed to record provider rate limit', { message_id: payload.message_id, error: rateLogError })
          }

          const retryAfterSecs = getRetryAfterSeconds(error)
          const { error: cooldownError } = await supabase
            .from('email_send_state')
            .update({
              retry_after_until: new Date(
                Date.now() + retryAfterSecs * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', 1)

          const { error: releaseError } = await supabase.rpc('release_email_delivery', {
            p_message_id: payload.message_id,
          })
          if (cooldownError || releaseError) {
            console.error('Failed to persist rate-limit recovery state', {
              message_id: payload.message_id,
              cooldownError,
              releaseError,
            })
            return new Response(
              JSON.stringify({ processed: totalProcessed, error: 'rate_limit_state_failed' }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            )
          }

          // Stop processing — remaining messages stay in queue (VT expires, retried next cycle)
          return new Response(
            JSON.stringify({ processed: totalProcessed, stopped: 'rate_limited' }),
            { headers: { 'Content-Type': 'application/json' } }
          )
        }

        // 403 means emails are disabled for this project — retrying won't help.
        // Move straight to DLQ and stop processing the rest of the batch.
        if (isForbidden(error)) {
          try {
            await moveToDlq(supabase, queue, msg, 'Emails disabled for this project')
          } catch {
            return new Response(
              JSON.stringify({ processed: totalProcessed, error: 'dlq_move_failed' }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            )
          }
          return new Response(
            JSON.stringify({ processed: totalProcessed, stopped: 'emails_disabled' }),
            { headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Log non-429 failures to track real retry attempts.
        const { error: failureLogError } = await supabase.from('email_send_log').insert({
          message_id: payload.message_id,
          template_name: payload.label || queue,
          recipient_email: payload.to,
          status: 'failed',
          error_message: errorMsg.slice(0, 1000),
        })
        if (failureLogError) {
          console.error('Failed to record email send failure', {
            message_id: payload.message_id,
            error: failureLogError,
          })
          // Keep the claim until its lease expires. This prevents a hot retry
          // loop while the audit database is unavailable.
          continue
        }
        const { error: releaseError } = await supabase.rpc('release_email_delivery', {
          p_message_id: payload.message_id,
        })
        if (releaseError) {
          console.error('Failed to release delivery claim', { message_id: payload.message_id, error: releaseError })
        }
        if (payload.message_id) {
          failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1)
        }

        // Non-429 errors: message stays invisible until VT expires, then retried
      }

      // Small delay between sends to smooth bursts
      if (i < messages.length - 1) {
        await new Promise((r) => setTimeout(r, sendDelayMs))
      }
    }
  }

  return new Response(
    JSON.stringify({ processed: totalProcessed }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
