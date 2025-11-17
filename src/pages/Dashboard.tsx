import InvoiceChart from "@/features/dashboard/InvoiceChart";
import InvoiceOverView from "@/features/dashboard/InvoiceOverView";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 py-10 ">
      <InvoiceOverView />
      <InvoiceChart />
    </div>
  );
};

export default Dashboard;
