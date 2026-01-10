import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

// Components
import Button from "@/ui/Button";
import ClientTable from "./ClientTable";
import ClientRow from "./ClientRow";
import Loader from "@/ui/Loader";
import Modal from "@/ui/Modal";
import CreateClientForm from "./CreateClientForm";

// Logic & Helpers
import { formatCurrency } from "@/utils/helper";
import { AnimatePresence } from "framer-motion";
import { useClients } from "./useClient";

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);

  // 1. Fetch Data
  const { isLoading, clients, error } = useClients();

  // 2. Search Logic
  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 3. Calculate Dashboard Stats (Memoized)
  const stats = useMemo(() => {
    if (!clients || clients.length === 0) {
      return {
        topRevenue: null,
        mostActive: null,
        newClientsCount: 0,
        inactiveCount: 0,
      };
    }

    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // A. Most Active Client (Highest REVENUE in last 30 days)
    // We sort by 'recent_total_billed' descending
    const mostActive = [...clients].sort(
      (a, b) => b.recent_total_billed - a.recent_total_billed
    )[0];

    // B. Top Revenue Client (Highest ALL TIME Revenue)
    // We keep this as 'all time' to distinguish it from Most Active
    const topRevenue = [...clients].sort(
      (a, b) => b.total_billed - a.total_billed
    )[0];

    // C. New Customers (Created in last 30 days)
    const newClientsCount = clients.filter((c) => {
      return c.created_at && new Date(c.created_at) > thirtyDaysAgo;
    }).length;

    // D. Inactive Clients (No invoices in last 30 days)
    const inactiveCount = clients.filter((c) => {
      return c.recent_invoice_count === 0;
    }).length;

    return { topRevenue, mostActive, newClientsCount, inactiveCount };
  }, [clients]);

  // Loading State
  if (isLoading) return <Loader />;

  // Error State
  if (error) {
    return (
      <div className="w-full my-20 text-center text-red-500">
        <p className="text-xl font-bold">Error loading clients.</p>
        <p className="text-sm">Please refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full my-10">
        {/* ------Client overview------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center mb-6 gap-7">
          {/* CARD 1: MOST ACTIVE (Highest Recent Revenue) */}
          <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
            <h2
              className="text-4xl font-normal truncate w-full"
              title={stats.mostActive?.name}
            >
              {/* Only show name if they actually have recent revenue */}
              {stats.mostActive && stats.mostActive.recent_total_billed > 0
                ? stats.mostActive.name
                : "No Active Client"}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Most Active Client</p>
              <p className="font-normal text-[1.3rem] text-gray-400">
                {stats.mostActive && stats.mostActive.recent_total_billed > 0
                  ? `${formatCurrency(
                      stats.mostActive.recent_total_billed
                    )} from ${stats.mostActive.recent_invoice_count} invoice${
                      stats.mostActive.recent_invoice_count !== 1 ? "s" : ""
                    } past 30 days`
                  : "No activity past 30 days"}
              </p>
            </div>
          </div>

          {/* CARD 2: INACTIVE CLIENTS */}
          <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
            <h2 className="text-4xl font-normal">{stats.inactiveCount}</h2>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Inactive Clients</p>
              <p className="font-normal text-[1.3rem] text-gray-400">
                No invoices past 30 days
              </p>
            </div>
          </div>

          {/* CARD 3: TOP REVENUE (All Time) */}
          <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
            <h2
              className="text-4xl font-normal truncate w-full"
              title={stats.topRevenue?.name}
            >
              {stats.topRevenue && stats.topRevenue.total_billed > 0
                ? stats.topRevenue.name
                : "No Client With Revenue"}
            </h2>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Top Revenue Client</p>
              <p className="font-normal text-[1.3rem] text-gray-400">
                {stats.topRevenue
                  ? `${formatCurrency(
                      stats.topRevenue.total_billed
                    )} billed all time`
                  : "No revenue yet"}
              </p>
            </div>
          </div>

          {/* CARD 4: NEW CUSTOMERS */}
          <div className="border border-gray-300 p-8 bg-white rounded-2xl flex flex-col justify-between items-start w-full h-[17rem]">
            <h2 className="text-4xl font-normal">{stats.newClientsCount}</h2>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">New Customers</p>
              <p className="font-normal truncate text-[1.3rem] text-gray-400">
                Added past 30 days
              </p>
            </div>
          </div>
        </div>

        {/* --- TOP BAR --- */}
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

          <Button onClick={() => setIsModalOpen(true)} className="">
            Add New Client
          </Button>
        </div>

        {/* --- TABLE --- */}
        <div className="flex flex-col w-full border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#1e2139] shadow-sm">
          <ClientTable />

          <div className="w-full">
            {!filteredClients || filteredClients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg">No clients found.</p>
              </div>
            ) : (
              filteredClients.map((client) => (
                <ClientRow
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  email={client.email || "--"}
                  state={client.state}
                  phone_number={client.phone_number}
                  balance={formatCurrency(client.outstanding_balance)}
                  // Dynamic Invoice Count
                  invoiceCount={client.invoice_count}
                  lastActive={
                    client.last_activity
                      ? new Date(client.last_activity).toLocaleDateString()
                      : "N/A"
                  }
                  onView={() => console.log("View", client.id)}
                  onEdit={() => console.log("Edit", client.id)}
                  onDelete={() => console.log("Delete", client.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={onClose} isModalOpen={isModalOpen}>
            <CreateClientForm onCloseModal={onClose} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientsPage;
