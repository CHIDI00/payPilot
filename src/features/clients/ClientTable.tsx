import React from "react";

const clientTable = () => {
  return (
    <div className="grid grid-cols-[2fr_1.5fr_1.5fr_.7fr_1fr_2fr_.5fr] w-full px-6 py-5 bg-white border-b border-gray-300 rounded-t-2xl">
      <div className="bg-red-100">Name</div>
      <div className="bg-blue-100">Phone Number</div>
      <div className="bg-green-100">Email</div>
      <div className="bg-purple-100">Invoices</div>
      <div className="bg-orange-100">State</div>
      <div className="bg-pink-100">Outstanding</div>
      <div className=""></div>
    </div>
  );
};

export default clientTable;
