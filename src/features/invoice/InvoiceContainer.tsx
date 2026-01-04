import React, { useMemo } from "react";
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

const InvoiceContainer: React.FC<InvoiceContainerProps> = ({ invoice }) => {
  // Sort invoices by creation date - latest first
  const sortedInvoices = useMemo(() => {
    if (!invoice || invoice.length === 0) return [];

    return [...invoice].sort((a, b) => {
      // Try to sort by created_at if it exists
      if (a.created_at && b.created_at) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      // Fallback to invoice_date if created_at doesn't exist
      if (a.invoice_date && b.invoice_date) {
        return (
          new Date(b.invoice_date).getTime() -
          new Date(a.invoice_date).getTime()
        );
      }

      // If no dates available, maintain original order
      return 0;
    });
  }, [invoice]);

  if (!invoice || invoice.length === 0) {
    return <EmptyInvoice />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-start justify-start w-full gap-6"
    >
      {sortedInvoices.map((invoice) => (
        <div key={invoice.id} className="w-full">
          <InvoiceRow invoice={invoice} />
        </div>
      ))}
    </motion.div>
  );
};

export default InvoiceContainer;
