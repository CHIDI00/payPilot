import React, { useEffect, useState } from "react";
import InvoiceHeading from "../features/invoice/InvoiceHeading";
import InvoiceContainer from "../features/invoice/InvoiceContainer";
import Modal from "../ui/Modal";
import CreateInvoiceForm from "../features/invoice/CreateInvoiceForm";
import { getInvoice } from "../services/apiInvoices";

const Invoices: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);
  useEffect(function () {
    getInvoice().then((data) => console.log(data));
  }, []);

  return (
    <>
      <div className="w-full h-full  flex flex-col justify-center items-center lg:px-0 px-6 pb-8">
        <InvoiceHeading setIsModalOpen={setIsModalOpen} />
        <InvoiceContainer />
      </div>
      {isModalOpen && (
        <Modal onClose={onClose} isModalOpen={isModalOpen}>
          <CreateInvoiceForm onCloseModal={onClose} />
        </Modal>
      )}
    </>
  );
};

export default Invoices;
