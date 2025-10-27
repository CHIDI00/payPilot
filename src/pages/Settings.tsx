import { useMoveBack } from "@/hooks/useMoveBack";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ThemeToggle from "@/ui/ThemeToggle";
import Button from "@/ui/Button";
import Logout from "../features/authentication/Logout";

type ToggleSwitchProps = {
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};
const Settings: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled,
}) => {
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
        <div className="w-full flex justify-between rounded-t-2xl items-center md:px-10 px-5 border-b-[1px] border-gray-100 dark:border-gray-700 py-6 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
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
        <div className="w-full flex justify-between items-center py-6 md:px-10 px-5 border-b-[1px] border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
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
        {/* NOTIFICATION */}
        <div className="w-full flex justify-between items-center py-6 md:px-10 px-5 border-b-[1px] border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">
              Notification
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              Get notified when an invoice is confirmed.
            </p>
          </div>

          <div className="flex justify-end items-center text-[#7E88C3]">
            <label className="switch">
              <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                readOnly={!onChange}
                disabled={disabled}
              />
              <div className="slider">
                <div className="circle">
                  {/* Cross SVG */}
                  <svg
                    className="cross"
                    viewBox="0 0 365.696 365.696"
                    height={6}
                    width={6}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        data-original="#000000"
                        fill="currentColor"
                        d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                      ></path>
                    </g>
                  </svg>
                  {/* Checkmark SVG */}
                  <svg
                    className="checkmark"
                    viewBox="0 0 24 24"
                    height={10}
                    width={10}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        data-original="#000000"
                        fill="currentColor"
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </label>
          </div>
        </div>
        {/* THEME */}
        <div className="w-full flex justify-between items-center py-6 md:px-10 px-5 border-b-[1px] border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">Theme mode</p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              Change theme mode
            </p>
          </div>

          <div className="flex justify-end items-center text-[#7E88C3]">
            <ThemeToggle />
          </div>
        </div>
        {/* LOGOUT */}
        <div className="w-full flex justify-between items-center py-6 md:px-10 px-5 border-b-[1px] border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">Logout</p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              Logout from this account
            </p>
          </div>

          <div className="flex justify-end items-center ">
            <Logout />
          </div>
        </div>
        <div className="w-full flex justify-between items-center py-6 md:px-10 px-5 hover:bg-gray-100 dark:hover:bg-[#252946] transition-all duration-300 cursor-pointer">
          <div className="flex flex-col">
            <p className="md:text-[2rem] text-2xl leading-tight">
              Delete account
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              All data will be lost when this action is taken.
            </p>
          </div>

          <div className="flex justify-end items-center text-[#7E88C3]">
            <Button
              type="button"
              title="Delete account"
              disabled="true"
              variant="danger"
              className="bg-red-700 p-1"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
