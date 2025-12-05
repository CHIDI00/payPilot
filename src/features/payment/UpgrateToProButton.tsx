import { usePaystackPayment } from "react-paystack";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
import { useCompanyInfo } from "../acount/useCompanyInfo";

const PAYPILOT_PK = import.meta.env.VITE_PAYPILOT_PAYSTACK_PUBLIC_KEY;

export function UpgradeToProButton() {
  const { user } = useUser();
  const { companyInfo } = useCompanyInfo();

  const userEmail = user?.email ?? companyInfo?.companyEmail ?? "";

  const initializePayment = usePaystackPayment({
    reference: Date.now().toString(),
    email: userEmail,
    amount: 0,
    publicKey: PAYPILOT_PK,
    plan: "PLN_56ye3c8meuc7ytm",
    metadata: {
      company_id: companyInfo?.company_id,
      custom_fields: [],
    },
  });

  return (
    <Button
      onClick={() =>
        initializePayment({
          onSuccess: () => {
            toast.success("Subscribed");
          },
        })
      }
    >
      Upgrade to Pro N6,500/month
    </Button>
  );
}
