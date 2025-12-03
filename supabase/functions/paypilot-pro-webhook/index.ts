import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "https://deno.land/std@0.168.0/node/crypto.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PAYPILOT_SECRET = Deno.env.get("PAYPILOT_PAYSTACK_SECRET_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

function verify(body: string, sig: string | null) {
  if (!sig) return false;
  const hmac = crypto.createHmac("sha512", PAYPILOT_SECRET);
  const expected = hmac.update(body).digest("hex");
  return expected === sig;
}

serve(async (req) => {
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405 });

  const raw = await req.text();
  const sig = req.headers.get("x-paystack-signature");
  if (!verify(raw, sig))
    return new Response("Invalid signature", { status: 400 });

  const payload = JSON.parse(raw) as {
    event: string;
    data: { metadata?: { company_id?: string } };
  };

  if (payload.event !== "charge.success")
    return new Response("Ignored", { status: 200 });

  const companyId = payload.data.metadata?.company_id;
  if (!companyId) return new Response("Missing company_id", { status: 400 });

  const { error } = await supabase
    .from("companyInfo")
    .update({ subscription_plan: "pro" })
    .eq("company_id", companyId); // adjust to your FK

  if (error) {
    console.error("Pro upgrade failed:", error);
    return new Response("DB error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
