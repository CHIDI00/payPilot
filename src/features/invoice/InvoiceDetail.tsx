import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronLeft, Send } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import companyLogo from "../../assets/home.png";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Loader from "../../ui/Loader";
import DeleteModal from "../../ui/DeleteModal";
import useInvoice from "./useInvoice";
import CreateInvoiceForm from "./CreateInvoiceForm";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteInvoice } from "./useDeleteInvoice";
import {
  formatCurrency,
  formatCurrencyWithoutFormating,
} from "../../utils/helper";
import { blobToBase64 } from "@/utils/blobToBase64";
import { markInvoiceAsPaid } from "../../services/apiInvoices";
import FailedToLoadInvoiceDetails from "@/ui/FailedToLoadInvoiceDetails";
// import { previewInvoiceAsPDF } from "@/utils/downloadInvoice";
import { useCompanyInfo } from "../acount/useCompanyInfo";
import { sendInvoiceEmail } from "@/services/sendInvoiceEmail";

import { invoiceEmailHtml } from "@/utils/invoiceEmailFormat";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "@/utils/invoicedownload";

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

  const [sending, setSending] = useState(false);

  // IMMEDIATELY SHOW THE INVOICE STATUS WHEN LOADED
  useEffect(() => {
    if (invoice?.status) setIsStatus(invoice.status);
  }, [invoice?.status]);

  // DISPLAY LOADER WHEN LOADING DETAILS
  if (isLoading) return <Loader />;
  // SHOW FAILD TO LOAD IMAGE WHEN INVOICE FAILD TO FETCH
  if (!invoice) return <FailedToLoadInvoiceDetails />;

  const {
    // created_at,
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
    status,
    items,
  } = invoice;

  const {
    created_at,
    companyName,
    companyLine,
    companyWebsite,
    // companyAddress,
    logo,
  } = companyInfo || {};

  const total = invoice.items?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // PDF DATA FOR DOWNLOAD
  const invoiceData = {
    // Company Details
    companyName: companyName || "PayPilot",
    phone: companyLine ? String(companyLine) : undefined,
    website: companyWebsite || "",
    logoUrl: logo || companyLogo, // Uses user logo or default
    addressLine1: street_address || "",
    addressLine2: `${city || ""}`,
    postCode: post_code || "",
    country: country || "",

    // Invoice Details
    invoiceId: invoice_id,
    description: description || "Invoice",
    date: created_at ? new Date(created_at).toLocaleDateString() : "",
    dueDate: invoice_date ? new Date(invoice_date).toLocaleDateString() : "",

    // Client Details
    clientName: client_name,
    clientAddress1: client_street_address || "",
    clientAddress2: client_city || "",
    clientAddress3: client_post_code || "",
    clientCountry: client_country || "",
    clientEmail: client_email || "",

    // Items (Map over the REAL items)
    items:
      invoice.items?.map((item) => ({
        name: item.name,
        qty: item.quantity,
        // Format currency numbers to strings for the PDF
        price: formatCurrencyWithoutFormating(item.price)
          .replace("NGN", "")
          .trim(),
        total: formatCurrencyWithoutFormating(item.price * item.quantity)
          .replace("NGN", "")
          .trim(),
      })) || [],

    grandTotal: formatCurrency(total).replace("NGN", "").trim(),
  };

  // MARK INVOICE AS PAID
  const handleMarkInvoiceAsPaid = async () => {
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

  // SEND EMAIL
  const onSendClick = async () => {
    setSending(true);
    try {
      if (!client_email) {
        toast.error("Client email is missing");
        setSending(false);
        return;
      }

      const blob = await pdf(<InvoicePDF data={invoiceData} />).toBlob();

      const base64Pdf = await blobToBase64(blob);

      const htmlContent = invoiceEmailHtml({
        logo,
        companyLogo,
        client_name,
        invoice_id,
        invoice_id_uuid: id,
        total,
        formatCurrency,
        formatCurrencyWithoutFormating,
        invoice_date: invoice_date ?? null,
        companyWebsite,
        companyName,
        items,
        status,
      });

      await sendInvoiceEmail({
        recipient: client_email,
        subject: `Your ${
          isStatus.toLowerCase() === "paid" ? "payment receipt" : "invoice"
        } from ${companyName}`,
        htmlContent,
        replyTo: companyInfo?.companyEmail || "support@paypilot.com",
        attachment:
          isStatus.toLowerCase() !== "paid"
            ? {
                content: base64Pdf,
                name: `invoice-${invoice_id}.pdf`,
              }
            : undefined,
      });
      toast.success("Receipt sent successfully!");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast.error("Failed to send: " + errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full py-3 mx-auto lg:w-[75%] md:py-20 lg:px-0"
      >
        <div className="flex items-center justify-between w-full mb-10">
          <button
            className="flex justify-between items-center gap-7 text-[1.7rem]"
            onClick={moveBack}
          >
            <span>
              <ChevronLeft size={18} />
            </span>{" "}
            Go back
          </button>

          <PDFDownloadLink
            document={<InvoicePDF data={invoiceData} />}
            fileName={`invoice-${invoice_id}.pdf`}
            style={{ textDecoration: "none" }}
          >
            {({ loading }) => (
              <Button
                variant="secondary"
                className="text-[1.1rem]"
                disabled={loading}
              >
                {loading ? "Generating..." : "Download invoice (.pdf)"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        {/* INVOICE STATUS */}
        <div className="w-full flex justify-between items-center py-8 md:px-12 px-10 bg-primary-gray dark:bg-[#1e2139] md:rounded-lg rounded-[1rem] shadow-sm mb-10">
          <div className="flex items-center justify-between w-full md:w-1/2 gap-7 md:justify-start">
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

          <div className="items-center justify-end hidden w-1/2 gap-4 md:flex">
            {isStatus.toLowerCase() !== "paid" && (
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
            )}
            <Button
              variant="danger"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
            {isStatus !== "Paid" && (
              <Button onClick={handleMarkInvoiceAsPaid}>
                {loading ? "Marking..." : "Mark as Paid"}
              </Button>
            )}
            <Button
              variant="secondary"
              disabled={sending}
              onClick={onSendClick}
            >
              {sending ? (
                <span className="mini-loader"></span>
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>
        </div>

        {/* INVOICE INFO */}
        <div
          id="invoice-content"
          className="w-full flex flex-col justify-between items-center md:py-14 py-6 md:px-16 px-5 bg-primary-gray dark:bg-[#1e2139] md:rounded-lg rounded-[1rem] gap-12 md:mb-10 mb-40"
        >
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-[1.6rem]">
                <span className="text-[#7E88C3]">#</span>
                {invoice_id}
              </div>
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                {description}
              </p>
            </div>

            <div className="flex flex-col items-end justify-end">
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
          <div className="grid items-start justify-between w-full grid-cols-2 md:grid-cols-3 gap-y-8">
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

              <div className="flex flex-col items-start justify-start">
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

            <div className="col-span-2 md:col-span-1">
              <p className="text-[#7E88C3] dark:text-gray-300 text-[1.4rem]">
                Send to
              </p>
              <p className="font-bold text-[1.6rem] truncate">{client_email}</p>
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
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start justify-center">
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
            onClick={handleMarkInvoiceAsPaid}
            className="w-full py-6 text-[1.2rem] px-[10px]"
          >
            {loading ? "Marking..." : "Mark as Paid"}
          </Button>
        )}
        <Button variant="secondary" disabled={sending} onClick={onSendClick}>
          {sending ? <span className="mini-loader"></span> : <Send size={18} />}
        </Button>
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
