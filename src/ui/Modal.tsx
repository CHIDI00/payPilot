import React, { useEffect, useRef, type PropsWithChildren } from "react";

interface ModalProp extends PropsWithChildren {
  isModalOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProp> = ({ children, isModalOpen, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup if modal unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

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

  if (!isModalOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh]  text-black transition-all duration-300 z-[1000] flex lg:flex-row flex-col">
      <div className="lg:w-[5.5%] lg:h-full md:w-full md:h-[7%]"></div>
      <div className="w-full lg:h-full h-[93%] bg-[#9797976f]">
        {/* <div
          className={`bg-primary-gray  h-full lg:w-[33%] md:w-[70%] w-full `}
        > */}
        <div className="lg:w-[33%] md:w-[70%] w-full h-full  rounded-r-[2rem] bg-primary-gray px-1 py-6  ">
          <div className="px-14 py-16 w-full h-full rounded-r-[2rem] overflow-y-scroll">
            {children}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Modal;
