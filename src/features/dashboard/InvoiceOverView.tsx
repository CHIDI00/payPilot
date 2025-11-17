import { ReceiptTurkishLira, SquaresExclude } from "lucide-react";
import React from "react";
import invoiceIcon from "../../assets/invoiceIcon.png";
import receiptIcon from "../../assets/receiptIcon.png";
import duebill from "../../assets/duebill.png";

const InvoiceOverView = () => {
  return (
    <div className="grid items-center justify-center md:grid-cols-3 grid-cols-1 gap-5">
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-purple-600 rounded-full">
            <SquaresExclude size={15} />
          </span>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-bold ">Invoice volume</p>
            <p className="lg:text-4xl md:text-2xl text-3xl font-extrabold">
              $ 465,826,826.836
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-300">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        <img src={invoiceIcon} alt="" className="w-[30%]" />
        {/* </div> */}
      </div>
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-green-700 rounded-full">
            <ReceiptTurkishLira size={15} />
          </span>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-bold ">Receipt volume</p>
            <p className="lg:text-4xl md:text-2xl text-3xl font-extrabold">
              $ 65,826,826.836
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-300">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        <img src={receiptIcon} alt="" className="w-[30%]" />
        {/* </div> */}
      </div>
      <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-7">
          <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-orange-600 rounded-full">
            <SquaresExclude size={15} />
          </span>

          <div className="flex flex-col items-start justify-start gap-2 my-10">
            <p className="font-bold ">due volume</p>
            <p className="lg:text-4xl md:text-2xl text-3xl font-extrabold">
              $ 26,826.836
            </p>
          </div>

          <p className="text-xl font-semibold text-gray-300">Last 12 months</p>
        </div>
        {/* <div className=""> */}
        <img src={duebill} alt="" className="w-[30%]" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default InvoiceOverView;
