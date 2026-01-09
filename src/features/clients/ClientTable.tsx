import React from "react";

const clientTable = () => {
  return (
    <div className="grid grid-cols-[2fr_1.1fr_1.9fr_.7fr_1fr_2fr_.5fr] w-full px-6 py-5 bg-white border-b border-gray-300 rounded-t-2xl">
      <div className="">Name</div>
      <div className="">Phone Number</div>
      <div className="">Email</div>
      <div className="">Invoices</div>
      <div className="">State</div>
      <div className="">Outstanding</div>
      <div className=""></div>
    </div>
  );
};

export default clientTable;
