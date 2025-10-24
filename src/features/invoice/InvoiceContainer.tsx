import React from "react";
import InvoiceRow from "./InvoiceRow";
import type { Invoice } from "../../utils/types";
import EmptyInvoice from "@/ui/EmptyInvoice";

type InvoiceContainerProps = {
  invoice: Invoice[] | undefined;
};

const InvoiceContainer: React.FC<InvoiceContainerProps> = ({ invoice }) => {
  if (!invoice || invoice.length === 0) {
    return <EmptyInvoice />;
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      {invoice?.map((invoice) => (
        <InvoiceRow invoice={invoice} key={invoice.id} />
      ))}
    </div>
  );
};

export default InvoiceContainer;
