import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface DeleteModalProp {
  resourceName: string;
  onClose: () => void;
  onConfirm: () => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProp> = ({
  onClose,
  onConfirm,
  resourceName,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-[100vh] z-[50] flex justify-center items-center bg-[#9797976f] dark:bg-[#1a191971]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          ref={ref}
          className="bg-white m-auto dark:bg-[#141625] lg:w-[27%] md:w-[50%] w-[90%] lg:p-12 p-6 flex flex-col gap-4 rounded-lg"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <h2 className="text-[2rem] text-black dark:text-[#FFFF] font-bold">
            Confirm deletion
          </h2>
          <div className="text-[1.4rem] text-black dark:text-[#FFFF]">
            <p>
              Are you sure you want to delete invoice{" "}
              <span className="font-bold text-[1.6rem] text-[#7E88C3]">#</span>
              <span className="font-bold text-[1.6rem]">{resourceName}</span>?
              This action cannot be undone.
            </p>
          </div>
          <div className="w-full flex justify-end items-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
export default DeleteModal;

// const DeleteModal: React.FC<DeleteModalProp> = ({
//   onClose,
//   onConfirm,
//   resourceName,
// }) => {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         onClose();
//       }
//     }
//     document.addEventListener("click", handleClick, true);
//     return () => document.removeEventListener("click", handleClick, true);
//   }, [onClose]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed top-0 left-0 w-full h-[100vh]  z-[20] flex justify-center items-center bg-[#9797976f] dark:bg-[#1a191971]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.1 }}
//       >
//         <motion.div
//           ref={ref}
//           className="bg-white m-auto dark:bg-[#141625] lg:w-[45%] md:w-[50%] w-[90%] lg:p-12 p-6 flex flex-col gap-4 rounded-lg"
//           initial={{ opacity: 0, scale: 0.9, y: -20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//           transition={{ duration: 0.1, ease: "easeInOut" }}
//         >
//           <h2 className="text-[2rem] text-black dark:text-[#FFFF] font-bold">
//             Confirm deletion
//           </h2>
//           <div className="text-[1.4rem] text-black dark:text-[#FFFF]">
//             <p>
//               Are you sure you want to delete invoice{" "}
//               <span className="font-bold text-[1.6rem] text-[#7E88C3]">#</span>
//               <span className="font-bold text-[1.6rem]">{resourceName}</span>?
//               This action cannot be undone.
//             </p>
//           </div>

//           <div className="w-full flex justify-end items-end gap-4">
//             <Button variant="secondary" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={onConfirm}>
//               Delete
//             </Button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default DeleteModal;
