import { ReceiptTurkishLira, SquaresExclude } from "lucide-react";
import React from "react";
import invoiceIcon from "../../assets/invoiceIcon.png";
import receiptIcon from "../../assets/receiptIcon.png";
import duebill from "../../assets/duebill.png";
import { formatCurrencyWithoutFormating } from "@/utils/helper";
import { useInvoiceOnDashboard } from "../invoice/useInvoiceOnDashboard";

const InvoiceOverView: React.FC = () => {
  const { invoices, isLoading } = useInvoiceOnDashboard();

  // Calculate totals by summing item totals (quantity * price)
  const invoiceVolume = (invoices || []).reduce((acc, inv) => {
    const invTotal =
      inv.items?.reduce(
        (s, it) => s + (it.quantity || 0) * (it.price || 0),
        0
      ) || 0;
    return acc + invTotal;
  }, 0);

  const receiptVolume = (invoices || [])
    .filter((inv) => (inv.status || "").toLowerCase() === "paid")
    .reduce((acc, inv) => {
      const invTotal =
        inv.items?.reduce(
          (s, it) => s + (it.quantity || 0) * (it.price || 0),
          0
        ) || 0;
      return acc + invTotal;
    }, 0);

  const dueVolume = (invoices || [])
    .filter((inv) => {
      const s = (inv.status || "").toLowerCase();
      return s === "pending" || s === "due" || s === "unpaid";
    })
    .reduce((acc, inv) => {
      const invTotal =
        inv.items?.reduce(
          (s, it) => s + (it.quantity || 0) * (it.price || 0),
          0
        ) || 0;
      return acc + invTotal;
    }, 0);

  return (
    <div className="grid items-center justify-center grid-cols-1 gap-5 md:grid-cols-3">
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
            <p className="text-3xl font-extrabold lg:text-4xl md:text-2xl">
              {isLoading
                ? "-- : -- "
                : formatCurrencyWithoutFormating(invoiceVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-400">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        {/* <img src={invoiceIcon} alt="" className="w-[30%]" /> */}
        {/* </div> */}
      </div>
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <div className="flex justify-center items-center gap-5">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-purple-600 rounded-full">
              <ReceiptTurkishLira size={15} />
            </span>

            <p className="font-bold text-gray-400">Receipt volume</p>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-medium text-gray-400 ">Net revenue · 1year</p>
            <p className="text-3xl font-extrabold lg:text-4xl md:text-2xl">
              {isLoading
                ? "-- : -- "
                : formatCurrencyWithoutFormating(receiptVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-400">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        {/* <img src={receiptIcon} alt="" className="w-[30%]" /> */}
        {/* </div> */}
      </div>
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-orange-600 rounded-full">
            <SquaresExclude size={15} />
          </span>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-bold ">Due volume</p>
            <p className="text-3xl font-extrabold lg:text-4xl md:text-2xl">
              {isLoading
                ? "-- : -- "
                : formatCurrencyWithoutFormating(dueVolume)}
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-300">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        {/* <img src={duebill} alt="" className="w-[30%]" /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default InvoiceOverView;
