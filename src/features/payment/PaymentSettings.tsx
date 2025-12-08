import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // <--- Added this import
import ProFeature from "../../components/ProFeature";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import { useCompanyInfo } from "../acount/useCompanyInfo";
import { useUpdatePaystackKeys } from "./useUpdatePaystackKeys";

const PaymentSettings: React.FC = () => {
  const [pk, setPk] = useState("");
  const [sk, setSk] = useState("");

  const { companyInfo, isPending: isSaving } = useCompanyInfo();

  const { mutate: saveKeys, isPending: isSavingKeys } = useUpdatePaystackKeys();

  useEffect(() => {
    if (companyInfo) {
      setPk(companyInfo.paystack_public_key ?? "");
      setSk(companyInfo.paystack_secret_key ?? "");
    }
  }, [companyInfo]);

  if (isSaving) return <Loader />;

  const plan = (companyInfo?.subscription_plan ?? "free").toString();
  const isPro = plan.trim().toLowerCase() === "pro";

  // Your unique webhook URL (From your Supabase project)
  const webhookUrl =
    "https://itktbkqrupkkslfvlkht.supabase.co/functions/v1/paystack-webhook";

  return (
    <div className="md:w-[80%] w-full mx-auto my-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Payment Gateway
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Connect your Paystack account to accept instant payments.
        </p>
      </div>

      {/* The Paywall Wrapper */}
      <ProFeature isPro={isPro}>
        <div className="flex flex-col gap-8 bg-white dark:bg-[#1e2139] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          {/* --- STEP 1: API KEYS --- */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Step 1: Enter API Keys
            </h3>

            {/* Public Key */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Paystack Public Key
              </label>
              <input
                type="text"
                value={pk}
                onChange={(e) => setPk(e.target.value)}
                placeholder="pk_live_..."
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-[#141625] dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>

            {/* Secret Key */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Paystack Secret Key
              </label>
              <input
                type="password"
                value={sk}
                onChange={(e) => setSk(e.target.value)}
                placeholder="sk_live_..."
                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-[#141625] dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
              <p className="mt-2 text-sm text-gray-400">
                Your secret key is stored securely and never shown to clients.
              </p>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                disabled={isSavingKeys}
                onClick={() =>
                  saveKeys({ paystack_public_key: pk, paystack_secret_key: sk })
                }
              >
                {isSavingKeys ? "Saving..." : "Save API Keys"}
              </Button>
            </div>
          </div>

          {/* --- STEP 2: WEBHOOK URL (NEW SECTION) --- */}
          <div className="pt-8 mt-2 border-t border-gray-100 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Step 2: Connect Automation
            </h3>

            <div className="p-6 border border-purple-100 bg-purple-50 dark:bg-purple-900/10 rounded-xl dark:border-purple-800/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 text-purple-600 bg-purple-100 rounded-full dark:bg-purple-900/40 dark:text-purple-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Why do I need this?
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    This link tells Paystack to notify PayPilot when you receive
                    money. Without this, your invoices will stay "Pending" even
                    after your client pays.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Your Webhook URL
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-4 bg-white dark:bg-[#141625] rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-600 dark:text-gray-300 overflow-x-auto whitespace-nowrap">
                    {webhookUrl}
                  </code>
                  <Button
                    className="shrink-0 bg-white dark:bg-[#141625] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(webhookUrl);
                      toast.success("Copied Webhook URL!");
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Paste this into the <strong>Webhook URL</strong> field in your{" "}
                  <a
                    href="https://dashboard.paystack.com/#/settings/developer"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Paystack Settings
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </ProFeature>
    </div>
  );
};

export default PaymentSettings;
