// // supabase/functions/paystack-webhook/index.ts
// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// console.log("Paystack Webhook Listener running...")

// serve(async (req) => {
//   // 1. Init Supabase Admin Client
//   const supabaseAdmin = createClient(
//     Deno.env.get('SUPABASE_URL') ?? '',
//     Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
//   )

//   // 2. Parse Paystack Payload
//   const payload = await req.json()
//   const event = payload.event
//   const data = payload.data

//   // 3. Handle "Charge Success"
//   if (event === 'charge.success') {
//     const invoiceId = data.metadata?.invoice_id
//     const amountPaid = data.amount / 100 // Convert Kobo to Naira
//     const reference = data.reference

//     console.log(`Payment received for Invoice: ${invoiceId}, Ref: ${reference}`)

//     if (!invoiceId) {
//       return new Response("Missing invoice_id in metadata", { status: 400 })
//     }

//     // 4. Update Invoice in Supabase
//     const { error } = await supabaseAdmin
//       .from('invoices')
//       .update({
//         status: 'Paid',
//         amount_paid: amountPaid,
//         payment_date: new Date().toISOString()
//       })
//       .eq('id', invoiceId)

//     if (error) {
//       console.error("Failed to update invoice:", error)
//       return new Response("Database update failed", { status: 500 })
//     }

//     return new Response("Invoice Updated Successfully", { status: 200 })
//   }

//   return new Response("Event ignored", { status: 200 })
// })
