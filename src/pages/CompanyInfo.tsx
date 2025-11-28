import { useMoveBack } from "@/hooks/useMoveBack";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import CompanyInfor from "@/features/acount/CompanyInfor";

const CompanyInfo: React.FC = () => {
  const moveBack = useMoveBack();

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-full px-6 py-3 md:py-20 lg:px-0"
    >
      <div className="flex items-center justify-between w-full mb-10">
        <h2 className="text-[2.5rem] font-medium">Company's profile</h2>
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

      <div className="flex flex-col w-full gap-6 md:gap-10">
        <CompanyInfor />
      </div>
    </motion.div>
  );
};

export default CompanyInfo;
