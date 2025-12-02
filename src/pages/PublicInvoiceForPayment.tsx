import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import supabase from "@/services/supabase";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import toast from "react-hot-toast";
import { formatCurrencyWithoutFormating } from "@/utils/helper";

interface CompanyInfo {
  companyName?: string;
  logo: string;
  paystack_public_key?: string;
}

interface InvoiceItem {
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoice_id?: string;
  client_email?: string;
  client_name?: string;
  status?: string;
  items?: InvoiceItem[];
  companyInfo?: CompanyInfo;
  [key: string]: unknown;
}

const PublicInvoice: React.FC = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [merchantKey, setMerchantKey] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. FETCH INVOICE & MERCHANT KEY PUBLICLY
  useEffect(() => {
    async function fetchPublicInvoice() {
      // FETCH THE INVOICE
      const { data: inv, error } = await supabase
        .from("invoices")
        .select("*, companyInfo(companyName, logo, paystack_public_key)")
        .eq("id", id)
        .single();

      if (error || !inv) {
        toast.error("Invoice not found");
        setLoading(false);
        return;
      }

      setInvoice(inv);
      // Get the key from the joined companyInfo table
      setMerchantKey(inv.companyInfo?.paystack_public_key || "");
      setLoading(false);

      console.log("PUBLIC INVOICE RAW:", inv);
      console.log("Keys:", Object.keys(inv));
      console.log("companyInfo value:", inv.companyInfo);
    }
    fetchPublicInvoice();
  }, [id]);

  const itemsTotal =
    invoice?.items?.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
      0
    ) ?? 0;

  // 2. Setup Paystack
  const config = {
    reference: new Date().getTime().toString(),
    email: invoice?.client_email,
    amount: Math.round(itemsTotal * 100),
    publicKey: merchantKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Invoice ID",
          variable_name: "invoice_id",
          value: invoice?.invoice_id || id || "",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  if (loading) return <Loader />;
  if (!invoice)
    return <div className="p-10 text-center">Invoice not found.</div>;
  if (invoice.status === "Paid")
    return (
      <div className="p-10 text-2xl text-center text-green-600">
        This invoice has been paid! 🎉
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-xl p-8 text-center bg-white shadow-lg rounded-xl">
        <img
          src={invoice.companyInfo?.logo}
          alt={invoice.companyInfo?.companyName}
          className="w-[25%] mx-auto"
        />
        <p className="mb-2 text-gray-500">
          Invoice from {invoice.companyInfo?.companyName}
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          {formatCurrencyWithoutFormating(itemsTotal)}
        </h1>

        <div className="py-4 mb-6 space-y-2 text-left border-t border-b border-gray-100">
          <div className="flex justify-between">
            <span className="text-gray-500">Invoice ID</span>
            <span className="font-medium">#{invoice.invoice_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Client</span>
            <span className="font-medium">{invoice.client_name}</span>
          </div>
        </div>

        {merchantKey ? (
          <Button
            className="w-full py-2 text-5xl bg-green-600 hover:bg-green-700"
            onClick={() =>
              (
                initializePayment as (
                  onSuccess: (response: {
                    reference: string;
                    amount?: number;
                    status?: string;
                    message?: string;
                    [key: string]: unknown;
                  }) => void
                ) => void
              )(() => {
                // handle successful payment callback
                toast.success("Payment Received!");
              })
            }
          >
            Continue to payment
          </Button>
        ) : (
          <p className="text-2xl text-red-500">
            This merchant has not set up online payments yet.
            <br />
            Please contact them for bank details.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicInvoice;
