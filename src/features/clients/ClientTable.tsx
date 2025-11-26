import React from "react";

const clientTable = () => {
  return (
    <div className="grid w-full grid-cols-[2fr_1fr_1fr_1fr_.3fr] gap-5 px-6 py-5 bg-white border-b border-gray-300 rounded-t-2xl">
      <div className="">Client</div>
      <div className="">Phone</div>
      <div className="text-left">Outstanding Balance</div>
      <div className="">Due Date</div>
    </div>
  );
};

export default clientTable;
