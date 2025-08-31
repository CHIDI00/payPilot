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
  // const onCloseEdit = () => setIsModalOpen(false);

  const { isPending, data: invoices } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoice(),
  });

  // 👇 filter invoices based on filter state
  const filteredInvoices = invoices?.filter((inv) =>
    filter === "all" ? true : inv.status.toLowerCase() === filter
  );

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

      {isModalOpen && (
        <Modal
          onClose={onClose}
          // onCloseEdit={onCloseEdit}
          isModalOpen={isModalOpen}
        >
          <CreateInvoiceForm
            invoiceToEdit={null}
            onCloseEdit={onClose}
            onCloseModal={onClose}
          />
        </Modal>
      )}
    </>
  );
};

export default Invoices;
