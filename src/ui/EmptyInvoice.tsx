import React from "react";
import emptyIcon from "../assets/emptyIcon.svg";

const EmptyInvoice: React.FC = () => {
  return (
    <div className="w-full p-10 flex flex-col justify-center items-center">
      <div className="md:w-[40%] w-full aspect-square">
        <img src={emptyIcon} alt="" className="w-full" />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className="text-[2.5rem] font-bold">There is nothing here</h2>
        <p className="text-center text-[1.3rem] leading-tight text-gray-400">
          {" "}
          Create an invoice by clicking the <br />
          New Invoice button and get started
        </p>
      </div>
    </div>
  );
};

export default EmptyInvoice;
