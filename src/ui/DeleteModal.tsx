import React, { useEffect, useRef } from "react";
import Button from "./Button";
// import { motion } from "framer-motion";

interface DeleteModalProp {
  onClose: () => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProp> = ({ onClose }) => {
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
    <div className="fixed top-0 left-0 w-full h-[100vh]  text-black transition-all duration-300 z-[20] bg-[#9797976f] flex justify-center items-center">
      <div className="bg-white m-auto lg:w-[30%] w-[90%] lg:p-12 p-6 flex flex-col gap-4 rounded-lg">
        <h2 className="text-[2rem] font-bold">Confirm deletion</h2>
        <p className="text-[1.4rem]">
          Are you sure you wwant to delete invoice XXXX? This action cannot the
          undone.
        </p>

        <div className="w-full flex justify-end items-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
