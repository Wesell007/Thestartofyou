import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://thestartofyou.com",
  "https://www.thestartofyou.com",
  "http://localhost:8080",
  ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((value) => value.trim()).filter(Boolean),
]);

const headersFor = (req: Request) => {
  const origin = req.headers.get("origin");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  };
  if (origin && allowedOrigins.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
};

const json = (req: Request, body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...headersFor(req), "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: headersFor(req) });
  if (req.method !== "POST") return json(req, { error: "Method not allowed." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authorization = req.headers.get("authorization");
  if (!supabaseUrl || !anonKey || !serviceKey) return json(req, { error: "Account deletion is unavailable." }, 503);
  if (!authorization?.startsWith("Bearer ")) return json(req, { error: "Authentication required." }, 401);

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || (body as { confirmed?: unknown }).confirmed !== true) {
    return json(req, { error: "Deletion must be explicitly confirmed." }, 400);
  }

  const caller = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });
  const { data: userData, error: userError } = await caller.auth.getUser();
  if (userError || !userData.user) return json(req, { error: "Authentication required." }, 401);

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const userId = userData.user.id;

  // Storage objects are not covered by auth.users foreign-key cascades.
  const { data: photos, error: listError } = await admin.storage.from("weekly-photos").list(userId, { limit: 1000 });
  if (listError) {
    console.error("delete-account could not list photos", listError.message);
    return json(req, { error: "We could not remove all account data. Nothing else was deleted." }, 502);
  }
  if (photos?.length) {
    const { error: storageError } = await admin.storage
      .from("weekly-photos")
      .remove(photos.map((photo) => `${userId}/${photo.name}`));
    if (storageError) {
      console.error("delete-account could not remove photos", storageError.message);
      return json(req, { error: "We could not remove all account data. Nothing else was deleted." }, 502);
    }
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) {
    console.error("delete-account auth deletion failed", deleteError.message);
    return json(req, { error: "We could not delete your account. Please try again." }, 502);
  }

  return json(req, { deleted: true }, 200);
});
