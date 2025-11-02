import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import homedark from "../../assets/homedark.png";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Loader from "../../ui/Loader";
import DeleteModal from "../../ui/DeleteModal";
import useInvoice from "./useInvoice";
import CreateInvoiceForm from "./CreateInvoiceForm";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteInvoice } from "./useDeleteInvoice";
import { formatCurrency } from "../../utils/helper";
import { markInvoiceAsPaid } from "../../services/apiInvoices";
import FailedToLoadInvoiceDetails from "@/ui/FailedToLoadInvoiceDetails";
import { downloadInvoiceAsPDF } from "@/utils/downloadInvoice";
import { useCompanyInfo } from "../acount/useCompanyInfo";

const InvoiceDetail: React.FC = () => {
  const moveBack = useMoveBack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { invoice, isLoading } = useInvoice();
  const { deleteInvoice, isDeleting } = useDeleteInvoice();
  const { companyInfo } = useCompanyInfo();

  const onClose = () => setIsDeleteModalOpen(false);
  const closeEditModal = () => setIsModalOpen(false);

  const [isStatus, setIsStatus] = useState(invoice?.status || "Pending");

  if (isLoading) return <Loader />;
  if (!invoice) return <FailedToLoadInvoiceDetails />;

  const {
    id,
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
    // status,
  } = invoice;

  const {
    companyName,
    // companyEmail,
    companyLine,
    companyCity,
    companyStreet,
    companyState,
    companyCountry,
    companyWebsite,
  } = companyInfo;

  const total = invoice.items?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleMarkPaid = async () => {
    setLoading(true);
    try {
      const updated = await markInvoiceAsPaid(invoice.id);
      setIsStatus(updated.status);
    } catch (err) {
      toast.error(`Error updating invoice: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full md:py-20 py-3 lg:px-0 px-6"
      >
        <div className="w-full mb-10 flex justify-between items-center">
          <button
            className="flex justify-between items-center gap-7 text-[1.7rem]"
            onClick={moveBack}
          >
            <span>
              <ChevronLeft size={18} />
            </span>{" "}
            Go back
          </button>

          <Button
            onClick={() =>
              downloadInvoiceAsPDF("invoice-content", `invoice-${invoice_id}`, {
                logoBase64: homedark,
                companyName: `${companyName}`,
                companyAddress: `${companyStreet}, ${companyCity}, ${companyState}, ${companyCountry}`,
                companyPhone: `${companyLine}`,
                companyWebsite: `${companyWebsite}`,
              })
            }
            variant="secondary"
            className="text-[1.1rem]"
          >
            Download invoice (.pdf)
          </Button>
        </div>

        {/* INVOICE STATUS */}
        <div className="w-full flex justify-between items-center py-8 md:px-12 px-10 bg-primary-gray dark:bg-[#1e2139] md:rounded-lg rounded-[1rem] shadow-sm mb-10">
          <div className="md:w-1/2 w-full flex gap-7 md:justify-start justify-between items-center">
            <p className="text-[1.4rem] text-gray-400 dark:text-gray-300">
              Status
            </p>

            <div
              className={`px-4 py-2 font-bold text-[1.6rem] rounded-xl flex justify-center items-center gap-1 ${
                isStatus.toLowerCase() === "paid"
                  ? "text-green-500 bg-green-50 dark:bg-[#889f8530]"
                  : isStatus.toLowerCase() === "pending"
                  ? "text-orange-400 bg-orange-50 dark:bg-[#aa7e4330]"
                  : "text-[#252945] dark:text-[#DFE3FA] bg-[#DFE3FA] dark:bg-[#c4c4f316]"
              }`}
            >
              <span className="text-[2.5rem]">•</span> {isStatus}
            </div>
          </div>

          <div className="hidden w-1/2 md:flex justify-end items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
            {isStatus !== "Paid" && (
              <Button onClick={handleMarkPaid}>
                {loading ? "Marking..." : "Mark as Paid"}
              </Button>
            )}
          </div>
        </div>

        {/* INVOICE INFO */}
        <div
          id="invoice-content"
          className="w-full flex flex-col justify-between items-center md:py-14 py-6 md:px-16 px-5 bg-primary-gray dark:bg-[#1e2139] md:rounded-lg rounded-[1rem] gap-12 md:mb-10 mb-40"
        >
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-[1.6rem]">
                <span className="text-[#7E88C3]">#</span>
                {invoice_id}
              </div>
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {description}
              </p>
            </div>

            <div className="flex flex-col justify-end items-end">
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {street_address}
              </p>
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {city}
              </p>
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {post_code}
              </p>
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {country}
              </p>
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
                <p
                  className="text-[#7E88C3] dark:text-gray-300
 text-[1.4rem]"
                >
                  Payment Due
                </p>
                <p className="font-bold text-[1.6rem]">31 Aug 2025</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#7E88C3] text-[1.4rem] capitalize">Bill to</p>
              <p className="font-bold text-[1.6rem] capitalize">
                {client_name}
              </p>

              <div className="flex flex-col justify-start items-start">
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                  {client_street_address}
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                  {client_city}
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                  {client_post_code}
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                  {client_country}
                </p>
              </div>
            </div>

            <div className="">
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                Send to
              </p>
              <p className="font-bold text-[1.6rem]">{client_email}</p>
            </div>
          </div>

          {/* INVOICE PAYMENT */}
          <div className="w-full bg-primary-gray100 dark:bg-[#252945]  md:rounded-lg rounded-[1rem]">
            <div className="px-10 py-8 hidden md:flex flex-col bg-primary-gray100 dark:bg-[#252945] rounded-[1rem] gap-4">
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] mb-5">
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                  Item Name
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem] text-right">
                  QTY.
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem] text-right">
                  Price
                </p>
                <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem] text-right">
                  Total
                </p>
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
                    {formatCurrency(Number(item.price.toFixed(2)))}
                  </p>
                  <p className="font-bold text-[1.6rem] text-right">
                    {formatCurrency(
                      Number((item.quantity * item.price).toFixed(2))
                    )}
                  </p>
                </div>
              ))}
            </div>

            {invoice.items?.map((item) => (
              <div className="px-6 py-4 md:hidden flex flex-col justify-between items-center bg-primary-gray100 dark:bg-[#252945] rounded-[1rem]">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col justify-center items-start">
                    <p className="font-bold text-[1.6rem]">{item.name}</p>
                    <p className="font-bold text-[#7E88C3] text-[1.6rem] ">
                      {item.quantity} x {item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="font-bold text-[1.6rem]">
                    {formatCurrency(
                      Number((item.quantity * item.price).toFixed(2))
                    )}
                  </p>
                </div>
              </div>
            ))}

            <div className="w-full flex justify-between items-center px-10 py-10 bg-[#252945] dark:bg-[#0C0E16] rounded-b-[1rem]">
              <p className="text-primary-gray md:text-[1.4rem] text-[1.6rem]">
                Amount Due
              </p>
              <p className="font-bold text-primary-gray md:text-[2.3rem] text-[2rem]">
                {formatCurrency(Number(total.toFixed(2)))}
              </p>
            </div>
          </div>
        </div>

        {isDeleteModalOpen && (
          <DeleteModal
            onClose={onClose}
            resourceName={invoice_id}
            onConfirm={() => deleteInvoice(id)}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
      </motion.div>

      {/* MOBILE BUTTON DISPLAY */}
      <div className="fixed bottom-0 left-0 md:hidden w-full bg-white dark:bg-[#252945] flex justify-between items-center gap-4 px-5 py-8 shadow-[0_-8px_7px_rgba(0,0,0,0.1)]">
        <Button
          variant="secondary"
          className="text-[1.5rem] font-bold w-full"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full text-[1.5rem]"
        >
          Delete
        </Button>
        {isStatus !== "Paid" && (
          <Button
            onClick={handleMarkPaid}
            className="w-full py-6 text-[1.2rem] px-[10px]"
          >
            {loading ? "Marking..." : "Mark as Paid"}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={onClose} isModalOpen={isModalOpen}>
            <CreateInvoiceForm
              invoiceToEdit={invoice}
              onCloseModal={closeEditModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default InvoiceDetail;
