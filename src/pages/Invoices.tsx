import React, { useState } from "react";
import InvoiceHeading from "../features/invoice/InvoiceHeading";
import InvoiceContainer from "../features/invoice/InvoiceContainer";
import Modal from "../ui/Modal";
import CreateInvoiceForm from "../features/invoice/CreateInvoiceForm";
import { getInvoice } from "../services/apiInvoices";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";

const Invoices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all"); // 👈 add filter state

  const onClose = () => setIsModalOpen(false);

  const { isPending, data: invoices } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoice(),
  });

  // 👇 filter invoices based on filter state
  const filteredInvoices = invoices?.filter((inv) =>
    filter === "all" ? true : inv.status.toLowerCase() === filter
  );

  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center lg:px-0 px-6 pb-8">
        <InvoiceHeading
          invoice={invoices}
          setIsModalOpen={setIsModalOpen}
          setFilter={setFilter} // 👈 pass down setFilter
        />

        {isPending ? (
          <Loader />
        ) : (
          <InvoiceContainer invoice={filteredInvoices} /> // 👈 use filtered list
        )}
      </div>
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg border bg-gray-200 dark:bg-gray-800 dark:text-white"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button> */}

      {isModalOpen && (
        <Modal onClose={onClose} isModalOpen={isModalOpen}>
          <CreateInvoiceForm invoiceToEdit={null} onCloseModal={onClose} />
        </Modal>
      )}
    </>
  );
};

export default Invoices;
