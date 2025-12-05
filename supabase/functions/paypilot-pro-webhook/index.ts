import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "https://deno.land/std@0.168.0/node/crypto.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PAYPILOT_SECRET = Deno.env.get("PAYPILOT_PAYSTACK_SECRET_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

// Verify webhook signature to make suer it's from Paystack
function verify(body: string, sig: string | null): boolean {
  if (!sig) return false;
  const hmac = crypto.createHmac("sha512", PAYPILOT_SECRET);
  const expected = hmac.update(body).digest("hex");
  return expected === sig;
}

serve(async (req) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Read raw body for signature verification
  const raw = await req.text();
  const sig = req.headers.get("x-paystack-signature");

  // Verify that the signature is valid
  if (!verify(raw, sig)) {
    console.error("Invalid Paystack signature for Pro webhook");
    return new Response("Invalid signature", { status: 400 });
  }

  // Parse the webhook payload
  const payload = JSON.parse(raw) as {
    event: string;
    data: {
      amount: number;
      subscription?: { subscription_code: string };
      customer?: { customer_code: string };
      metadata?: { company_id?: string };
    };
  };

  console.log("PAYPILOT PRO WEBHOOK PAYLOAD", payload);

  // Only process successful charge events
  if (payload.event !== "charge.success") {
    return new Response("Event ignored", { status: 200 });
  }

  // Extract company_id from metadata
  const companyId = payload.data.metadata?.company_id;
  if (!companyId) {
    console.error("Missing company_id in metadata");
    return new Response("Missing company_id", { status: 400 });
  }

  // Extract subscription details from Paystack response
  const subCode = payload.data.subscription?.subscription_code;
  const custCode = payload.data.customer?.customer_code;

  // Calculate next billing date (today + 1 month)
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  console.log(`Processing Pro subscription for company: ${companyId}`);

  // Update company with Pro subscription details
  const { error } = await supabase
    .from("companyInfo")
    .update({
      subscription_plan: "pro",
      paystack_subscription_code: subCode,
      paystack_customer_code: custCode,
      next_billing_date: nextBillingDate.toISOString(),
      subscription_cancelled_at: null,
    })
    .eq("company_id", companyId);

  if (error) {
    console.error("Failed to update Pro subscription:", error);
    return new Response("DB error", { status: 500 });
  }

  console.log(`✅ Pro subscription activated for company: ${companyId}`);
  return new Response("OK", { status: 200 });
});
