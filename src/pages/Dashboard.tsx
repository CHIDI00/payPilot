import { useUser } from "@/features/authentication/useUser";
import InvoiceChart from "@/features/dashboard/InvoiceChart";
import InvoiceOverView from "@/features/dashboard/InvoiceOverView";
import { getGreeting, getFirstName } from "@/utils/helper";
import React from "react";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const greeting = getGreeting();
  const googlefirstName = getFirstName(user?.user_metadata.full_name);
  const userfirstName = getFirstName(user?.user_metadata.fullName);

  return (
    <div className="flex flex-col gap-5 py-10 ">
      <div className="mb-5">
        <h3 className="text-6xl">
          {greeting}{" "}
          <span className="text-gray-400">
            {googlefirstName ? googlefirstName : userfirstName},
          </span>
        </h3>
        <p className="text-gray-400 text-2xl">
          Here's a quick look at how things are going
        </p>
      </div>
      <InvoiceOverView />
      <InvoiceChart />
    </div>
  );
};

export default Dashboard;
