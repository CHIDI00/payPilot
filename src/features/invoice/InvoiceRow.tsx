import { ChevronRight } from "lucide-react";
import React from "react";
import invoices from "../../data/invoiceData";
import EmptyInvoice from "../../ui/EmptyInvoice";
import { useNavigate } from "react-router-dom";

const InvoiceRow: React.FC = () => {
  const navigate = useNavigate();

  if (invoices.length < 1) {
    return <EmptyInvoice />;
  }

  if (invoices.length >= 1) {
    return (
      <>
        {/* Large screen layout */}
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="hidden md:grid w-full px-8 py-4 rounded-2xl bg-primary-gray justify-between items-center grid-cols-[1.3fr_2.3fr_2.3fr_1.9fr_1.7fr_.6fr] gap-16 shadow-sm"
          >
            <div className="font-bold text-[1.6rem]">
              <span className="text-[#7E88C3]">#</span>
              {invoice.id}
            </div>
            <div className="text-[#888EB0]">
              Due{" "}
              {invoice.dueDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-[#888EB0]">{invoice.clientName}</div>
            <div className="font-bold text-[1.6rem] w-full flex justify-end items-center">
              $ {invoice.amount}
            </div>

            <div
              className={`px-4 py-2 font-bold text-[1.6rem] rounded-xl flex justify-center items-center gap-1
                ${
                  invoice.status === "Paid"
                    ? "text-green-500 bg-green-50"
                    : invoice.status === "Pending"
                    ? "text-orange-400 bg-orange-50"
                    : "text-[#252945] bg-[#DFE3FA]"
                }`}
            >
              <span className="text-[2.5rem]">•</span> {invoice.status}
            </div>
            <div className="w-full flex justify-end items-center text-[#7E88C3]">
              <button
                type="button"
                title="Details"
                onClick={() => navigate(`/invoice/view_invoice/${invoice.id}`)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}

        {/* Mobile layout */}
        {invoices.map((invoice2) => (
          <div
            key={invoice2.id}
            onClick={() => navigate(`/invoice/view_invoice/${invoice2.id}`)}
            className="grid md:hidden w-full px-12 py-8 rounded-2xl bg-primary-gray justify-between items-center grid-cols-2 gap-x-10 gap-y-14"
          >
            <div className="font-bold text-[16px]">
              <span className="text-[#7E88C3]">#</span>
              {invoice2.id}
            </div>
            <div className="text-[#888EB0] flex justify-end items-center">
              {invoice2.clientName}
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[#888EB0] text-[1.4rem]">
                Due{" "}
                {invoice2.dueDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="font-bold text-[1.7rem] w-full flex justify-start items-center">
                $ {invoice2.amount}
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <div
                className={`px-4 py-2 w-[90%] font-bold text-[1.3rem] rounded-xl flex justify-center items-center gap-1
                ${
                  invoice2.status === "Paid"
                    ? "text-green-500 bg-green-50"
                    : invoice2.status === "Pending"
                    ? "text-orange-400 bg-orange-50"
                    : "text-[#252945] bg-[#DFE3FA]"
                }`}
              >
                <span className="text-[2.5rem]">•</span> {invoice2.status}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default InvoiceRow;
