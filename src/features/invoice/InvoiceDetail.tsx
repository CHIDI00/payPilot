import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import DeleteModal from "../../ui/DeleteModal";
import Modal from "../../ui/Modal";
import CreateInvoiceForm from "./CreateInvoiceForm";
import useInvoice from "./useInvoice";
// import { useParams } from "react-router-dom";

const InvoiceDetail: React.FC = () => {
  const moveBack = useMoveBack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { invoice, isLoading } = useInvoice();

  // const { id } = useParams<{ id: string }>(); // /invoices/:id

  // find the invoice that matches the clicked id
  // const invoice = invoices?.find((inv) => inv.id === id);

  const onClose = () => setIsDeleteModalOpen(false);

  if (isLoading) return <p>Loading...</p>;
  if (!invoice) return <div>No invoice found</div>;

  const {
    invoice_id,
    street_address,
    post_code,
    city,
    country,
    client_name,
    client_email,
    client_street_address,
    client_city,
    client_post_code,
    client_country,
    invoice_date,
    // payment_terms,
    description,
    status,
  } = invoice;

  return (
    <>
      <div className="relative w-full py-20 lg:px-0 px-6">
        <div className="w-full mb-10">
          <button
            className="flex justify-between items-center gap-7 text-[1.7rem]"
            onClick={moveBack}
          >
            <span>
              <ChevronLeft size={18} />
            </span>{" "}
            Go back
          </button>
        </div>

        {/* INVOICE STATUS */}
        <div className="w-full flex justify-between items-center py-8 md:px-12 px-10 bg-primary-gray md:rounded-lg rounded-[1rem] shadow-sm mb-10">
          <div className="md:w-1/2 w-full flex gap-7 md:justify-start justify-between items-center">
            <p className="text-[1.4rem] text-gray-400">Status</p>

            <div
              className={`px-4 py-2 font-bold text-[1.6rem] rounded-xl flex justify-center items-center gap-1
                ${
                  status?.toLowerCase() === "paid"
                    ? "text-green-500 bg-green-50"
                    : status?.toLowerCase() === "pending"
                    ? "text-orange-400 bg-orange-50"
                    : "text-[#252945] bg-[#DFE3FA]"
                }`}
            >
              <span className="text-[2.5rem]">•</span> {status}
            </div>
          </div>

          <div className="hidden w-1/2 md:flex justify-end items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(true);
                console.log("clicked");
              }}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              Delete
            </Button>
            <Button>Mark as Paid</Button>
          </div>
        </div>

        {/* INVOICE INFO */}
        <div className="w-full flex flex-col justify-between items-center py-14 md:px-16 px-10 bg-primary-gray md:rounded-lg rounded-[1rem] gap-12 mb-10">
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-[1.6rem]">
                <span className="text-[#7E88C3]">#</span>
                {invoice_id}
              </div>
              <p className="text-[#7E88C3] text-[1.4rem]">{description}</p>
            </div>

            <div className="flex flex-col justify-end items-end">
              <p className="text-[#7E88C3] text-[1.4rem]">{street_address}</p>
              <p className="text-[#7E88C3] text-[1.4rem]">{city}</p>
              <p className="text-[#7E88C3] text-[1.4rem]">{post_code}</p>
              <p className="text-[#7E88C3] text-[1.4rem]">{country}</p>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-3 grid-cols-2 justify-between items-start gap-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[#7E88C3] text-[1.4rem]">Payment Date</p>
                <p className="font-bold text-[1.6rem]">
                  {invoice_date &&
                    new Date(invoice_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#7E88C3] text-[1.4rem]">Payment Due</p>
                <p className="font-bold text-[1.6rem]">31 Aug 2025</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#7E88C3] text-[1.4rem] capitalize">Bill to</p>
              <p className="font-bold text-[1.6rem] capitalize">
                {client_name}
              </p>

              <div className="flex flex-col justify-start items-start">
                <p className="text-[#7E88C3] text-[1.4rem]">
                  {client_street_address}
                </p>
                <p className="text-[#7E88C3] text-[1.4rem]">{client_city}</p>
                <p className="text-[#7E88C3] text-[1.4rem]">
                  {client_post_code}
                </p>
                <p className="text-[#7E88C3] text-[1.4rem]">{client_country}</p>
              </div>
            </div>

            <div className="">
              <p className="text-[#7E88C3] text-[1.4rem]">Send to</p>
              <p className="font-bold text-[1.6rem]">{client_email}</p>
            </div>
          </div>

          {/* INVOICE PAYMENT */}
          <div className="w-full bg-primary-gray100 mb-10 md:rounded-lg rounded-[1rem]">
            <div className="px-10 py-8 hidden md:flex flex-col bg-primary-gray100 rounded-[1rem] gap-4">
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] mb-5">
                <p className="text-[#7E88C3] text-[1.4rem]">Item Name</p>
                <p className="text-[#7E88C3] text-[1.4rem] text-right">QTY.</p>
                <p className="text-[#7E88C3] text-[1.4rem] text-right">Price</p>
                <p className="text-[#7E88C3] text-[1.4rem] text-right">Total</p>
              </div>

              {invoice.items?.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[1.6fr_1fr_1fr_1fr] mb-2"
                >
                  <p className="font-bold text-[1.6rem]">{item.name}</p>
                  <p className="font-bold text-[#7E88C3] text-[1.6rem] text-right">
                    {item.quantity}
                  </p>
                  <p className="font-bold text-[#7E88C3] text-[1.6rem] text-right">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="font-bold text-[1.6rem] text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-10 py-8 md:hidden flex flex-col gap-4 justify-between items-center bg-primary-gray100 rounded-[1rem]">
              <div className="flex w-full justify-between items-center py-1">
                <div className="flex flex-col justify-center items-start">
                  <p className="font-bold text-[1.6rem]">Email Design</p>
                  <p className="font-bold text-[#7E88C3] text-[1.6rem] ">
                    1 x $ 150.00
                  </p>
                </div>

                <p className="font-bold text-[1.6rem]">$ 150.00</p>
              </div>
              <div className="flex w-full justify-between items-center py-3">
                <div className="flex flex-col justify-center items-start">
                  <p className="font-bold text-[1.6rem]">Email Design</p>
                  <p className="font-bold text-[#7E88C3] text-[1.6rem] ">
                    1 x $ 150.00
                  </p>
                </div>

                <p className="font-bold text-[1.6rem]">$ 150.00</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center px-10 py-10 bg-[#252945] rounded-b-[1rem]">
              <p className="text-primary-gray text-[1.4rem]">Amount Due</p>
              <p className="font-bold text-primary-gray text-[2.3rem]">
                $ 556.00
              </p>
            </div>
          </div>
        </div>

        {isDeleteModalOpen && (
          <DeleteModal
            onClose={onClose}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
      </div>

      <div className="md:hidden w-full bg-white flex justify-between items-center gap-4 px-10 py-16">
        <Button
          variant="secondary"
          className="text-[1.5rem] font-bold px-16"
          onClick={() => {
            setIsModalOpen(true);
            console.log("clicked");
          }}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </Button>
        <Button>Mark as Paid</Button>
      </div>

      {isModalOpen && (
        <Modal onClose={onClose} isModalOpen={isModalOpen}>
          <CreateInvoiceForm invoiceToEdit={invoice} onCloseModal={onClose} />
        </Modal>
      )}
    </>
  );
};

export default InvoiceDetail;
