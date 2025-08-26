import React from "react";
import InvoiceRow from "./InvoiceRow";
import type { Invoice } from "../../helper/types";

type InvoiceContainerProps = {
  invoice: Invoice[] | undefined; // or Invoice[] if you're sure it's always an array
};

const InvoiceContainer: React.FC<InvoiceContainerProps> = ({ invoice }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      {" "}
      {invoice?.map((invoice) => (
        <InvoiceRow invoice={invoice} key={invoice.id} />
      ))}
    </div>
  );
};

export default InvoiceContainer;
