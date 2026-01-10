import { BadgeAlert, ReceiptTurkishLira, SquaresExclude } from "lucide-react";
import React from "react";
import { formatCurrencyWithoutFormating } from "@/utils/helper";
import { useInvoiceOnDashboard } from "../invoice/useInvoiceOnDashboard";

const InvoiceOverView: React.FC = () => {
  const { invoices, isLoading } = useInvoiceOnDashboard();

  // 1. INVOICE VOLUME (Total of all invoices)
  // OPTIMIZATION: We no longer need to loop through items. We just sum the 'total_amount' column.
  const invoiceVolume = (invoices || []).reduce(
    (acc, inv) => acc + (inv.total_amount || 0),
    0
  );

  // 2. RECEIPT VOLUME (Total of PAID invoices)
  const receiptVolume = (invoices || [])
    .filter((inv) => (inv.status || "").toLowerCase() === "paid")
    .reduce((acc, inv) => acc + (inv.total_amount || 0), 0);

  // 3. DUE VOLUME (Total of PENDING/UNPAID invoices)
  const dueVolume = (invoices || [])
    .filter((inv) => {
      const s = (inv.status || "").toLowerCase();
      return s === "pending" || s === "due" || s === "unpaid";
    })
    .reduce((acc, inv) => acc + (inv.total_amount || 0), 0);

  return (
    <div className="grid items-center justify-center grid-cols-1 gap-5 md:grid-cols-3">
      {/* CARD 1: INVOICE VOLUME */}
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <div className="flex justify-center items-center gap-5">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-purple-600 rounded-full">
              <SquaresExclude size={15} />
            </span>

            <p className="font-bold text-gray-400">Invoice volume</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-medium text-2xl text-gray-400">
              Net sales position · 1year
            </p>
            <p className="text-3xl font-medium lg:text-6xl md:text-2xl">
              {isLoading
                ? "₦ 0.00"
                : formatCurrencyWithoutFormating(invoiceVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-400">Last 12 months</p>
        </div>
      </div>

      {/* CARD 2: RECEIPT VOLUME */}
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <div className="flex justify-center items-center gap-5">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-green-600 rounded-full">
              <ReceiptTurkishLira size={15} />
            </span>

            <p className="font-bold text-gray-400">Receipt volume</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-medium text-gray-400 ">Net revenue · 1year</p>
            <p className="text-3xl font-medium lg:text-6xl md:text-2xl">
              {isLoading
                ? "₦ 0.00"
                : formatCurrencyWithoutFormating(receiptVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-400">Last 12 months</p>
        </div>
      </div>

      {/* CARD 3: DUE VOLUME */}
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <div className="flex justify-center items-center gap-5">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-red-600 rounded-full">
              <BadgeAlert size={15} />
            </span>

            <p className="font-bold text-gray-400">Due volume</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-medium text-gray-400 ">Total net due</p>
            <p className="text-3xl font-medium lg:text-6xl md:text-2xl">
              {isLoading ? "₦ 0.00" : formatCurrencyWithoutFormating(dueVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-400">Last 12 months</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceOverView;
