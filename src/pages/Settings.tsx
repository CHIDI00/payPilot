import { useMoveBack } from "@/hooks/useMoveBack";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Settings = () => {
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
        <h2 className="text-[2.5rem] font-medium">Settings</h2>
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

      <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139]   rounded-2xl">
        {/* ACCOUNT */}
        <div className="w-full flex justify-between rounded-t-2xl items-center px-10 py-6 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">Account</p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              View and edit account details
            </p>
          </div>

          <div className="flex justify-end items-center text-[#7E88C3]">
            <button
              type="button"
              title="Details"
              onClick={() => navigate(`/invoice/view_invoice/${id}`)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {/* COMPANY */}
        <div className="w-full flex justify-between items-center py-6 px-10 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">
              Company's Profile
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              View and update company's details
            </p>
          </div>

          <div className="flex justify-end items-center text-[#7E88C3]">
            <button
              type="button"
              title="Details"
              onClick={() => navigate(`/invoice/view_invoice/${id}`)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
