import React, { useState } from "react";
import ProFeature from "../../components/ProFeature";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import { useCompanyInfo } from "../acount/useCompanyInfo";

const PaymentSettings: React.FC = () => {
  const [pk, setPk] = useState("");
  const [sk, setSk] = useState("");

  const { companyInfo, isPending: isSaving } = useCompanyInfo();

  if (isSaving) return <Loader />;

  const plan = (companyInfo?.subscription_plan ?? "free").toString();

  const isPro = plan.trim().toLowerCase() === "pro";

  console.log("DEBUG plan:", plan, "isPro:", isPro);

  return (
    <div className="w-[80%] px-6 mx-auto my-10">
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
          {/* Public Key */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium text-gray-700 dark:text-gray-200">
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
            <label className="text-2xl font-medium text-gray-700 dark:text-gray-200">
              Paystack Secret Key
            </label>
            <input
              type="password"
              value={sk}
              onChange={(e) => setSk(e.target.value)}
              placeholder="sk_live_..."
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-[#141625] dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
            <p className="my-5 text-2xl text-gray-400">
              Your secret key is stored securely and never shown to clients or
              anyone.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button disabled={isSaving}>
              {isSaving ? "Saving..." : "Save API Keys"}
            </Button>
          </div>
        </div>
      </ProFeature>
    </div>
  );
};

export default PaymentSettings;
