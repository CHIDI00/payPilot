import React, { useState } from "react";
import InvoiceHeading from "../features/invoice/InvoiceHeading";
import InvoiceContainer from "../features/invoice/InvoiceContainer";
import Modal from "../ui/Modal";
import CreateInvoiceForm from "../features/invoice/CreateInvoiceForm";
import { getInvoice } from "../services/apiInvoices";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";
import { AnimatePresence } from "framer-motion";

const Invoices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const onClose = () => setIsModalOpen(false);
  // const onCloseEdit = () => setIsModalOpen(false);

  const { isPending, data: invoices } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoice(),
  });

  // FILTER INVOICE
  const filteredInvoices = invoices?.filter((inv) =>
    filter === "all" ? true : inv.status.toLowerCase() === filter
  );

  return (
    <>
      <div className="lg:w-[75%] w-full mx-auto h-full flex flex-col justify-center items-center lg:px-0  pb-8">
        <InvoiceHeading
          invoice={invoices}
          setIsModalOpen={setIsModalOpen}
          setFilter={setFilter}
        />

        {isPending ? (
          <Loader />
        ) : (
          <InvoiceContainer invoice={filteredInvoices} />
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={onClose} isModalOpen={isModalOpen}>
            <CreateInvoiceForm invoiceToEdit={null} onCloseModal={onClose} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Invoices;
