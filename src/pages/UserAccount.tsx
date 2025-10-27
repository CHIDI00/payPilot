import { useMoveBack } from "@/hooks/useMoveBack";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Profile from "@/features/acount/Profile";
import AccountSetting from "@/features/acount/AccountSetting";
import CompanyInfor from "@/features/acount/CompanyInfor";

const UserAccount: React.FC = () => {
  const moveBack = useMoveBack();

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-full md:py-20 py-3 lg:px-0 px-6"
    >
      <div className="w-full mb-10 flex justify-between items-center">
        <h2 className="text-[2.5rem] font-medium">Account</h2>
        <button
          className="flex justify-between items-center md:gap-7 gap-2 md:text-[1.7rem] text-[1.5rem]"
          onClick={moveBack}
        >
          <span>
            <ChevronLeft size={18} />
          </span>
          Go back
        </button>
      </div>

      <div className="flex w-full flex-col md:gap-10 gap-6">
        <Profile />
        <AccountSetting />
        <CompanyInfor />
      </div>
    </motion.div>
  );
};

export default UserAccount;
