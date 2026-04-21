import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a quiet reflection assistant inside "The Start of You", a calm pregnancy companion.

A pregnant woman has just spoken or typed her rough, unfiltered thoughts about how she is feeling this week. She is often tired or overwhelmed and does not want to write.

Your job is to gently shape her words into a short, calm reflection draft she can keep — written in her own voice, in the first person.

RULES:
- Write in first person (I, me, my). Never address her as "you".
- Keep the voice hers. If she rambled, distil. If she was blunt, keep it. Do not make her sound polished or poetic if she was not.
- 2 to 4 sentences. Never more than 4. Never a list.
- Do not add advice, reassurance, or commentary. You are not a coach.
- Do not invent feelings she did not express.
- British English. Calm, plain, warm. No clinical language. No em dashes or en dashes — use commas or full stops.
- Do not include a heading, label, quote marks, or sign-off. Return only the reflection text itself.
- If her input was very short (one feeling), return one or two honest sentences in her voice. Do not pad it.

The result should feel like she wrote it herself on a calmer day.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rawThoughts, week } = await req.json();
    if (!rawThoughts || typeof rawThoughts !== "string" || rawThoughts.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Please share a thought first." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contextLine = week ? `\n\n(She is in week ${week} of pregnancy.)` : "";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Her rough thoughts:\n\n${rawThoughts.trim()}${contextLine}` },
          ],
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

    const data = await response.json();
    const draft = data?.choices?.[0]?.message?.content?.trim() ?? "";

    return new Response(JSON.stringify({ draft }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-reflect error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
