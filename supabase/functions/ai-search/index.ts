import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI guidance system for "The Start of You" — a calm, emotionally intelligent pregnancy, fertility, and early parenthood companion.

You provide ONE clear, structured answer to each question. You are NOT a chatbot. You are a guided answer system.

TONE: Warm, calm, clear, supportive. Never clinical or alarmist. Never dismissive.

RESPONSE FORMAT — Always use this exact markdown structure:

## [Direct, clear answer as a heading]

[2-3 sentences giving the direct answer. Calm, concise, reassuring where appropriate.]

### What this means

[2-3 sentences interpreting the answer. Reduce overthinking. Provide context.]

### What to expect next

[2-3 sentences about what may happen next, what changes may come, what to keep in mind.]

### When to seek support

[1-2 sentences. Only include if medically relevant. Calm, not alarmist. If not relevant, skip this section entirely.]

RULES:
- Keep answers concise — no more than 250 words total
- Be stage-aware: if context includes a week number or stage, reference it specifically
- Never say "consult your doctor" as a cop-out — give the actual guidance first, then mention professional support if genuinely warranted
- Never use bullet-point lists longer than 3 items
- Never use clinical jargon without explanation
- Sign off answers with: "✔ Medically reviewed by Jenny Joines"
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contextLine = context
      ? `\n\nUser context: ${context}`
      : "";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: query + contextLine },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-search error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
