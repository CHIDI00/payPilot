import React from "react";
import InvoiceRow from "./InvoiceRow";

const InvoiceContainer: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      {" "}
      <InvoiceRow />
    </div>
  );
};

export default InvoiceContainer;
