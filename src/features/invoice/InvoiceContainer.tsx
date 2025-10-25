import React from "react";
import { motion } from "framer-motion";

import InvoiceRow from "./InvoiceRow";
import type { Invoice } from "../../utils/types";
import EmptyInvoice from "@/ui/EmptyInvoice";

type InvoiceContainerProps = {
  invoice: Invoice[] | undefined;
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const InvoiceContainer: React.FC<InvoiceContainerProps> = ({ invoice }) => {
  if (!invoice || invoice.length === 0) {
    return <EmptyInvoice />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full flex flex-col justify-start items-start gap-6"
    >
      {invoice?.map((invoice) => (
        <motion.div key={invoice.id} variants={itemVariants} className="w-full">
          <InvoiceRow invoice={invoice} />{" "}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default InvoiceContainer;
