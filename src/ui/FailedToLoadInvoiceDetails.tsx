import failedIcon from "../assets/failedIcon.png";
import { motion } from "framer-motion";

const FailedToLoadInvoiceDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full p-10 flex flex-col justify-center items-center"
    >
      <div className="md:w-[40%] w-full aspect-square">
        <img src={failedIcon} alt="" className="w-full" />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className="text-[2.5rem] font-bold">Something went wrong</h2>
        <p className="text-center text-[1.3rem] leading-tight text-gray-400">
          {" "}
          We couldn't load the invoice details
        </p>
      </div>
    </motion.div>
  );
};

export default FailedToLoadInvoiceDetails;
