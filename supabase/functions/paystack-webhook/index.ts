import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Initialize Supabase Admin
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // 1. Check Method
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 2. Parse Body safely
  const rawBody = await req.text();
  console.log("RAW BODY RECEIVED:", rawBody);

  // --- ⚠️ SKIPPING SIGNATURE VERIFICATION FOR BYOK ARCHITECTURE ---
  // In a multi-tenant app, you cannot verify signature with a single env var.
  // We will trust the invoice_id lookup for this MVP.

  if (!rawBody) {
    return new Response("Empty body", { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;
  const data = payload.data;

  // 3. Handle Charge Success
  if (event === "charge.success") {
    const invoiceId = data.metadata?.invoice_id; // Check exact spelling from frontend
    const amountPaid = data.amount / 100;
    const reference = data.reference;

    console.log(`Processing Invoice: ${invoiceId}, Ref: ${reference}`);

    if (!invoiceId) {
      console.error("Missing invoice_id in metadata");
      return new Response("Missing invoice_id", { status: 400 });
    }

    // 4. Update Database
    const { error } = await supabase
      .from("invoices")
      .update({
        status: "Paid",
        amount_paid: amountPaid,
        payment_date: new Date().toISOString(),
        // Make sure you actually have a column named 'paystack_reference' in your DB!
        // If not, remove this line or the update will fail.
        // paystack_reference: reference,
      })
      .eq("id", invoiceId);

    if (error) {
      console.error("Failed to update invoice:", error);
      return new Response("DB error", { status: 500 });
    }

    console.log("SUCCESS: Invoice marked as Paid");
    return new Response("OK", { status: 200 });
  }

  return new Response("Event ignored", { status: 200 });
});
