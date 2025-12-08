import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import supabase from "@/services/supabase";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import toast from "react-hot-toast";
import { formatCurrencyWithoutFormating } from "@/utils/helper";
import { ChevronDown, ChevronUp, Lock, ShieldCheck } from "lucide-react";

import animatedCheck from "../assets/checkAnimation.webm";
interface CompanyInfo {
  companyName?: string;
  logo: string;
  paystack_public_key?: string;
}

interface InvoiceItem {
  quantity: number;
  price: number;
  name: string;
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
  const { publicId } = useParams<{ publicId: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [merchantKey, setMerchantKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // 1. Fetch Logic
  useEffect(() => {
    async function fetchPublicInvoice() {
      const { data: inv, error } = await supabase
        .from("invoices")
        .select("*, companyInfo(companyName, logo, paystack_public_key)")
        .eq("public_uuid", publicId)
        .single();

      if (error || !inv) {
        toast.error("Invoice not found");
        setLoading(false);
        return;
      }

      setInvoice(inv);
      setMerchantKey(inv.companyInfo?.paystack_public_key || "");
      setLoading(false);
    }
    fetchPublicInvoice();
  }, [publicId]);

  // Calculations
  const itemsTotal =
    invoice?.items?.reduce(
      (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
      0
    ) ?? 0;

  // 2. Paystack Setup
  const config = {
    reference: new Date().getTime().toString(),
    email: invoice?.client_email,
    amount: Math.round(itemsTotal * 100),
    publicKey: merchantKey,
    metadata: {
      invoice_id: invoice?.id || "",
      custom_fields: [
        {
          display_name: "Invoice ID",
          variable_name: "invoice_id",
          value: invoice?.invoice_id || "",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  if (loading) return <Loader />;
  if (!invoice)
    return <div className="p-10 text-center">Invoice not found.</div>;

  if (invoice.status?.toLowerCase() === "paid") {
    return (
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-purple-50">
        <div className="w-full max-w-lg text-center bg-white shadow-sm p-14 rounded-xl">
          <div className="flex items-center justify-center w-[15rem] h-[15rem] mx-auto mb-4  rounded-full">
            <video autoPlay muted playsInline className="w-full h-full">
              <source src={animatedCheck} type="video/mp4" />
            </video>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-purple-700">
            Payment Successful!
          </h1>
          <p className="text-gray-600">This invoice has been fully paid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen p-4 font-sans bg-gray-50">
      {/* Trust Header */}
      <div className="flex items-center gap-2 mb-6 text-xl font-medium text-gray-400">
        <ShieldCheck size={16} />
        <span>Secure Payment Portal</span>
      </div>

      <div className="w-full max-w-xl overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
        {/* Header Section */}
        <div className="p-8 text-center border-b border-gray-100">
          {invoice.companyInfo?.logo ? (
            <img
              src={invoice.companyInfo.logo}
              alt="Logo"
              className="object-contain mx-auto mb-4 h-28"
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 font-bold text-gray-400 bg-gray-100 rounded-full">
              {invoice.companyInfo?.companyName?.charAt(0)}
            </div>
          )}

          <p className="mb-1 text-xl text-gray-500">Payment request from</p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {invoice.companyInfo?.companyName}
          </h3>

          <div className="mt-6">
            <p className="text-lg font-semibold tracking-wide text-gray-400 uppercase">
              Total Due
            </p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-gray-900">
              {formatCurrencyWithoutFormating(itemsTotal)}
            </h1>
          </div>
        </div>

        {/* Expandable Order Summary */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full px-8 py-4 text-xl text-gray-500 transition-colors hover:text-gray-700"
          >
            <span className="font-medium">Order Details</span>
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showDetails && (
            <div className="px-8 pb-6 space-y-3 text-sm duration-200 animate-in slide-in-from-top-2">
              {invoice.items?.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <span className="text-xl text-gray-600">
                    <span className="font-semibold ">{item.quantity}x</span>{" "}
                    {item.name || "Item"}
                  </span>
                  <span className="text-xl font-medium text-gray-900">
                    {formatCurrencyWithoutFormating(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-3 text-xl font-bold text-gray-900 border-t border-gray-200">
                <span>Total</span>
                <span>{formatCurrencyWithoutFormating(itemsTotal)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Meta Data */}
        <div className="px-8 py-6 space-y-3 bg-white">
          <div className="flex justify-between text-xl">
            <span className="text-gray-500">Invoice ID</span>
            <span className="font-medium text-gray-900">
              #{invoice.invoice_id}
            </span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="text-gray-500">Billed to</span>
            <span className="font-medium text-gray-900">
              {invoice.client_name}
            </span>
          </div>
        </div>

        {/* Action Area */}
        <div className="p-8 pt-2">
          {merchantKey ? (
            <>
              <Button
                className="w-full py-4 text-xl font-bold bg-[#7C5DFA] hover:bg-[#9277FF] shadow-lg shadow-purple-100 transition-all active:scale-[0.98] rounded-xl"
                onClick={() => {
                  // Use a properly typed signature for the initializePayment function returned by usePaystackPayment
                  const pay = initializePayment as (
                    onSuccess?: () => void,
                    onClose?: () => void
                  ) => void;
                  pay(() => toast.success("Payment Received!"));
                }}
              >
                Pay Now
              </Button>

              {/* Trust Footer */}
              <div className="flex flex-col items-center gap-3 mt-6">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <Lock size={12} />
                  <span>Secured by Paystack</span>
                </div>

                <div className="flex gap-2 opacity-40">
                  <span className="text-[10px] font-bold border border-gray-300 px-1 rounded bg-gray-50">
                    <img src="" alt="" />
                  </span>
                  <span className="text-[10px] font-bold border border-gray-300 px-1 rounded bg-gray-50">
                    Mastercard
                  </span>
                  <span className="text-[10px] font-bold border border-gray-300 px-1 rounded bg-gray-50">
                    Verve
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 text-center border border-red-100 rounded-lg bg-red-50">
              <p className="text-xl font-medium text-red-600">
                This merchant has not setup online payment.
              </p>
              <p className="mt-1 text-xl text-red-400">
                Please contact the merchant.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-8 text-2xl text-gray-400">
        Powered by <strong className="text-gray-500">PayPilot</strong>
      </p>
    </div>
  );
};

export default PublicInvoice;
