import React from "react";
import { Lock } from "lucide-react";
import Button from "@/ui/Button";

interface ProFeatureProps {
  children: React.ReactNode;
  isPro?: boolean;
}

const ProFeature: React.FC<ProFeatureProps> = ({ children, isPro = false }) => {
  // 1. If the user is PRO, show the content normally
  if (isPro) {
    return <>{children}</>;
  }

  // 2. If NOT Pro, show the Lock Overlay
  return (
    <div className="relative h-[40rem] overflow-hidden border border-gray-200 rounded-xl dark:border-gray-700">
      {/* THE MAIN CONTENT */}
      <div className="blur-[4px] opacity-50 select-none pointer-events-none p-1">
        {children}
      </div>

      {/* LOCK OVERLAY */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px]">
        <div className="flex flex-col items-center max-w-xl p-8 text-center bg-white border border-gray-100 shadow-2xl dark:bg-[#1e2139] dark:border-gray-700 rounded-2xl mx-4">
          <div className="flex items-center justify-center w-24 h-24 mb-5 bg-purple-100 rounded-full dark:bg-purple-900/30">
            <Lock className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>

          <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Pro Feature 💎
          </h3>

          <p className="mb-10 text-2xl text-gray-500 dark:text-gray-300">
            Upgrade to <b>PayPilot Pro</b> to unlock Online Payments,
            Auto-Reminders, and remove watermarks.
          </p>

          <Button
            className="w-full py-4 text-2xl"
            // TODO: Replace this URL with your actual Paystack Payment Page link later
            onClick={() => window.open("https://paystack.com", "_blank")}
          >
            Upgrade for ₦6,500/month
          </Button>

          <p className="mt-4 text-xl text-gray-400">
            Cancel anytime. Secure payment via Paystack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProFeature;
