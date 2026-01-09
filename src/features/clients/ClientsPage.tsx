import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

// Components
import Button from "@/ui/Button";
import ClientTable from "./ClientTable"; // Assuming this is your Header Row
import ClientRow from "./ClientRow";
import Loader from "@/ui/Loader";

// Logic & Helpers
import { getClients } from "../../services/apiClient"; // Adjust path if needed
import { formatCurrency } from "@/utils/helper";

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Define Client type used by the query and components
  type Client = {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    outstanding_balance: number;
    last_activity?: string | null;
  };

  // 1. Fetch Data
  const {
    isLoading,
    data: clients,
    error,
  } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => (await getClients()) as unknown as Client[],
  });

  // 2. Search Logic (Filters by Name or Email)
  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 3. Loading State
  if (isLoading) return <Loader />;

  // 4. Error State
  if (error) {
    return (
      <div className="w-full my-20 text-center text-red-500">
        <p className="text-xl font-bold">Error loading clients.</p>
        <p className="text-sm">Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="w-full my-10">
      {/* ------Client overview------ */}
      <div className="grid grid-cols-4 justify-center items-center mb-6 gap-7">
        <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
          <h2 className="text-4xl font-normal">Okoya Fridaus</h2>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Most Active Client</p>
            <p className="font-normal text-[1.3rem] text-gray-400">
              1 invoice past 30 days
            </p>
          </div>
        </div>
        <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
          <h2 className="text-4xl font-normal">0</h2>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Inactive Client</p>
            <p className="font-normal  text-[1.3rem] text-gray-400">
              No invoices or time tracked past 30 days
            </p>
          </div>
        </div>
        <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
          <h2 className="text-4xl font-normal">Okoya Fridaus</h2>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Top Revenue Client</p>
            <p className="font-normal  text-[1.3rem] text-gray-400">
              NGN 60,000.00 from 1 invoice past 30 days
            </p>
          </div>
        </div>
        <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
          <h2 className="text-4xl font-normal">0</h2>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">New Customers</p>
            <p className="font-normal truncate text-[1.3rem] text-gray-400">
              Added past 30 days
            </p>
          </div>
        </div>
      </div>

      {/* --- TOP BAR: SEARCH & ADD BUTTON --- */}
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center justify-center flex-1 max-w-lg gap-4 px-4 bg-white border border-gray-300 rounded-full dark:bg-[#1e2139] dark:border-transparent transition-colors">
          <Search className="text-gray-400" size={20} />
          <input
            aria-label="Search clients"
            placeholder="Search clients by name or email..."
            className="w-full px-4 py-3 bg-transparent outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Hook this up to your 'AddClientModal' later */}
        <Button onClick={() => console.log("Open Add Modal")} className="">
          Add New Client
        </Button>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="flex flex-col w-full border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#1e2139] overflow-x-scroll shadow-sm">
        <ClientTable />

        {/* Table Rows (The Data) */}
        <div className="w-full">
          {!filteredClients || filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg">No clients found.</p>
            </div>
          ) : (
            filteredClients.map(
              (client: NonNullable<typeof clients>[number]) => (
                <ClientRow
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  email={client.email || ""}
                  phone={client.phone || "N/A"}
                  // Formatted Balance
                  balance={formatCurrency(client.outstanding_balance)}
                  // Formatted Date
                  lastActive={
                    client.last_activity
                      ? new Date(client.last_activity).toLocaleDateString()
                      : "N/A"
                  }
                  // Action Handlers
                  onView={() => console.log("Navigating to view:", client.id)}
                  onEdit={() =>
                    console.log("Opening edit modal for:", client.id)
                  }
                  onDelete={() =>
                    console.log("Opening delete modal for:", client.id)
                  }
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
