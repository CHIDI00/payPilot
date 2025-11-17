import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface ModalProp extends PropsWithChildren {
  isModalOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProp> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClose();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [onClose]
  );

  return (
    <div className="fixed top-0 left-0 w-full h-[100dvh] text-black transition-all duration-300 z-[20] flex lg:flex-row flex-col">
      <div className="bg-primary-gray dark:bg-[#141625] lg:w-[20%] lg:h-full md:w-full h-[7%] z-[-100]"></div>
      <div className="w-[80] lg:h-full h-[93%] bg-[#4645454f] dark:bg-[#1a191971]">
        <motion.div
          ref={ref}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className="lg:w-[40%] md:w-[70%] w-full h-full md:rounded-r-[2rem] bg-primary-gray dark:bg-[#141625] px-1 py-6"
        >
          <div className="md:px-14 px-5 md:py-16 py-4 w-full h-full rounded-r-[2rem] overflow-y-scroll">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;
