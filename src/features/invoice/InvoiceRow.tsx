import React from "react";

import { useNavigate } from "react-router-dom";
import type { Invoice } from "../../utils/types";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "../../utils/helper";

type InvoiceContainerProps = {
  invoice: Invoice;
};

const InvoiceRow: React.FC<InvoiceContainerProps> = ({ invoice }) => {
  const navigate = useNavigate();

  const {
    id,
    invoice_id,
    client_name,
    invoice_date,
    items,
    status,
    created_at,
  } = invoice;

  const totalPrice = items?.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );

  if (invoice) {
    return (
      <>
        {/* LARGE SCREEN LAYOUT */}
        <div
          key={id}
          className="hidden md:grid w-full px-8 py-4 rounded-2xl bg-primary-gray dark:bg-[#1E2139] justify-between items-center grid-cols-[1.3fr_2.3fr_2.3fr_2.3fr_1.9fr_1.7fr_.6fr] gap-16 shadow-sm "
        >
          <div className="font-bold text-[1.6rem]">
            <span className="text-[#7E88C3]">#</span>
            {invoice_id}
          </div>
          <div className="text-[#888EB0] dark:text-[#DFE3FA]">
            {created_at &&
              new Date(created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </div>
          <div className="text-[#888EB0] dark:text-[#DFE3FA]">
            Due{" "}
            {invoice_date &&
              new Date(invoice_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </div>

          <div className="text-[#888EB0] dark:text-[#FFFFFF]">
            {client_name}
          </div>
          <div className="font-bold text-[1.6rem] w-full flex justify-end items-center">
            {formatCurrency(Number(totalPrice))}
          </div>

          <div
            className={`px-4 py-2 font-bold text-[1.6rem] rounded-xl flex justify-center items-center gap-1
                ${
                  status.toLowerCase() === "paid"
                    ? "text-green-500 bg-green-50 dark:bg-[#889f8530]"
                    : status.toLowerCase() === "pending"
                    ? "text-orange-400 bg-orange-50 dark:bg-[#aa7e4330]"
                    : "text-[#252945] dark:text-[#DFE3FA] bg-[#DFE3FA] dark:bg-[#c4c4f316]"
                }`}
          >
            <span className="text-[2.5rem]">•</span> {status}
          </div>
          <div className="w-full flex justify-end items-center text-[#7E88C3]">
            <button
              type="button"
              title="Details"
              onClick={() => navigate(`/invoice/view_invoice/${id}`)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div
          key={id}
          onClick={() => navigate(`/invoice/view_invoice/${id}`)}
          className="grid md:hidden w-full px-12 py-8 rounded-2xl bg-primary-gray dark:bg-[#1E2139] justify-between items-center grid-cols-2 gap-x-10 gap-y-8"
        >
          <div className="font-bold text-[14px]">
            <span className="text-[#7E88C3]">#</span>
            {invoice_id}
          </div>
          <div className="text-[#888EB0] text-[14px] dark:text-[#FFFFFF] flex justify-end items-center">
            {client_name}
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[#888EB0] text-[14px] dark:text-[#DFE3FA]">
              Due{" "}
              {invoice_date &&
                new Date(invoice_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </div>
            <div className="font-bold text-[1.7rem] w-full flex justify-start items-center">
              {formatCurrency(Number(totalPrice))}
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <div
              className={`px-4 py-2 w-[90%] font-bold text-[1.3rem] rounded-xl flex justify-center items-center gap-1
                ${
                  status.toLowerCase() === "paid"
                    ? "text-green-500 bg-green-50 dark:bg-[#889f8530]"
                    : status.toLowerCase() === "pending"
                    ? "text-orange-400 bg-orange-50 dark:bg-[#aa7e4330]"
                    : "text-[#252945] dark:text-[#DFE3FA] bg-[#DFE3FA] dark:bg-[#c4c4f316]"
                }`}
            >
              <span className="text-[2.5rem]">•</span> {status}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default InvoiceRow;
