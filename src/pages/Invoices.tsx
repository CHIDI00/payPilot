import React, { useEffect, useState } from "react";
import InvoiceHeading from "../features/invoice/InvoiceHeading";
import InvoiceContainer from "../features/invoice/InvoiceContainer";
import Modal from "../ui/Modal";
import CreateInvoiceForm from "../features/invoice/CreateInvoiceForm";
import { getInvoice } from "../services/apiInvoices";
import { useQuery } from "@tanstack/react-query";

const Invoices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);
  useEffect(function () {
    getInvoice().then((data) => console.log(data));
  }, []);

  const { isPending, data: Invoice } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoice(),
  });

  return (
    <>
      <div className="w-full h-full  flex flex-col justify-center items-center lg:px-0 px-6 pb-8">
        <InvoiceHeading invoice={Invoice} setIsModalOpen={setIsModalOpen} />

        {isPending ? "Loading..." : <InvoiceContainer invoice={Invoice} />}
      </div>
      {isModalOpen && (
        <Modal onClose={onClose} isModalOpen={isModalOpen}>
          <CreateInvoiceForm invoiceToEdit={null} onCloseModal={onClose} />
        </Modal>
      )}
    </>
  );
};

export default Invoices;
