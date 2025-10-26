import React from "react";

import FormColumn from "../../ui/FormColumn";
import FormSubTitle from "../../ui/FormSubTitle";
import Button from "../../ui/Button";

import { useForm, useFieldArray } from "react-hook-form";
import { ChevronLeft, Plus, Trash } from "lucide-react";
import { useCreateInvoice } from "./useCreateInvoice";
import { useEditInvoice } from "./useEditInvoice";
import type { Invoice } from "../../utils/types";
import { generateInvoiceId } from "../../utils/helper";
import toast from "react-hot-toast";

interface ClosesModalProp {
  onCloseModal: () => void;
  invoiceToEdit: Invoice | null;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceFormData {
  id: string;
  invoice_id: string;
  street_address?: string;
  post_code?: string;
  city?: string;
  country?: string;
  client_name?: string;
  client_email?: string;
  client_street_address?: string;
  client_city?: string;
  client_post_code?: string;
  client_country?: string;
  invoice_date?: string;
  payment_terms?: string;
  description?: string;
  status: string;

  items: InvoiceItem[];
}

const CreateInvoiceForm: React.FC<ClosesModalProp> = ({
  invoiceToEdit,
  onCloseModal,
}) => {
  const { createInvoice, isCreating } = useCreateInvoice();
  const { editInvoice, isEditing } = useEditInvoice();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValue } = invoiceToEdit ?? {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, control, reset, getValues } =
    useForm<InvoiceFormData>({
      defaultValues: isEditSession
        ? { ...editValue }
        : {
            items: [{ name: "", quantity: 0, price: 0 }],
          },
    });

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(data: InvoiceFormData) {
    console.log(data);

    if (isEditSession && editId) {
      // EDITING AND EXISTING INVOICE
      editInvoice(
        { newInvoiceData: { ...data }, id: editId! },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      // CREATE A NEW INVOICE
      const newInvoice = {
        ...data,
        invoice_id: generateInvoiceId(),
        status: data.status || "Pending",
      };

      createInvoice(
        { id: data.id, newInvoice },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onSaveDraft() {
    // SAVE FORM VALUES WITHOUT RUNNING VALIDATION
    const draftData = getValues();

    const newInvoice = {
      ...draftData,
      invoice_id: generateInvoiceId(),
      status: "Draft",
    };

    createInvoice(
      { id: draftData.id, newInvoice },
      {
        onSuccess: () => {
          toast.success("Invoice saved as draft");

          reset();
          onCloseModal?.();
        },
        onError: () => {
          toast.error("Please Select a date");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mb-10">
        {isEditSession && (
          // (window.innerWidth <= 500 && (
          <button
            type="button"
            onClick={onCloseModal}
            className="flex justify-between items-center gap-7 text-[1.7rem] dark:text-[#FFF]"
          >
            <span>
              <ChevronLeft size={18} />
            </span>{" "}
            Close
          </button>
        )}
      </div>
      {isEditSession ? (
        <h2 className="font-bold text-[2.1rem] dark:text-[#FFF] mb-10">
          Edit <span className="text-[#7E88C3]">#</span>
          {invoiceToEdit?.invoice_id}
        </h2>
      ) : (
        <h2 className="font-bold text-[2.1rem] dark:text-[#FFF] mb-10">
          New Invoice
        </h2>
      )}
      {/* BILL FROM */}
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        {/* STREET ADDRESS */}

        <FormColumn label="Street Adress" error={errors.street_address}>
          <input
            type="text"
            id="street_address"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.street_address ? "border-red-600" : "border-gray-300"
            }`}
            {...register("street_address", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          <FormColumn label="City" error={errors.city}>
            <input
              type="text"
              id="city"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("city", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Post Code" error={errors.post_code}>
            <input
              type="text"
              id="post_code"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("post_code", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn
            label="Country"
            error={errors.country}
            className="col-span-2 md:col-span-1"
          >
            <input
              type="text"
              id="country"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.country ? "border-red-600" : "border-gray-300"
              }`}
              {...register("country", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>
      </div>

      {/* BILL TO */}
      <div className="my-6">
        <FormSubTitle>Bill To</FormSubTitle>

        <FormColumn label="Client's Name" error={errors.client_name}>
          <input
            type="text"
            id="client_name"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_name ? "border-red-600" : "border-gray-300"
            }`}
            {...register("client_name", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Client's Email" error={errors.client_email}>
          <input
            type="email"
            id="client_email"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_email ? "border-red-600" : "border-gray-300"
            }`}
            {...register("client_email", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Street Address" error={errors.client_street_address}>
          <input
            type="text"
            id="client_street_address"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_street_address
                ? "border-red-600"
                : "border-gray-300"
            }`}
            {...register("client_street_address", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {/* CLIENT'S CITY */}
          <FormColumn label="City" error={errors.client_city}>
            <input
              type="text"
              id="client_city"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_city", {
                required: "*",
              })}
            />
          </FormColumn>

          {/* CLIENT'S POST CODE */}
          <FormColumn label="Post Code" error={errors.client_post_code}>
            <input
              type="text"
              id="client_post_code"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_post_code", {
                required: "*",
              })}
            />
          </FormColumn>

          {/* CLIENT'S COUNTRY */}
          <FormColumn
            label="Country"
            error={errors.client_country}
            className="col-span-2 md:col-span-1"
          >
            <input
              type="text"
              id="client_country"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_country ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_country", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {/* INVOICE DATA */}
          <FormColumn label="Invoice Date" error={errors.invoice_date}>
            <input
              type="date"
              id="invoice_date"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.invoice_date ? "border-red-600" : "border-gray-300"
              }`}
              {...register("invoice_date", {
                required: "can't be empty",
              })}
            />
          </FormColumn>

          {/* PAYMENT TERMS */}
          <FormColumn label="Payment Terms" error={errors.payment_terms}>
            <input
              type="text"
              id="payment_terms"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.payment_terms ? "border-red-600" : "border-gray-300"
              }`}
              {...register("payment_terms", {
                required: "can't be empty",
              })}
            />
          </FormColumn>
        </div>

        {/* DESCRIPTION */}
        <FormColumn label="Project Description" error={errors.description}>
          <input
            type="text"
            id="description"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.description ? "border-red-600" : "border-gray-300"
            }`}
            {...register("description", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
      </div>

      <div className="my-14">
        <FormSubTitle>Item List</FormSubTitle>

        <div className="hidden md:grid grid-cols-[3fr_.8fr_1.3fr_1fr_.4fr] gap-7 mb-5">
          <p className="text-[#7E88C3] text-[1.4rem]">Item Name</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">QTY.</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Price</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Total</p>
          <div></div>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid md:grid-cols-[3fr_1fr_1.3fr_1fr_.4fr] grid-cols-[1.5fr_1.5fr_.7fr_.3fr] justify-center items-center gap-7 mb-4"
          >
            {/* ITEM NAME */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `Item` : ""}`}
              error={errors.items?.[index]?.name}
              className="col-span-5 md:col-span-1"
            >
              <input
                type="text"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-6 font-bold rounded-md ${
                  errors.items?.[index]?.name
                    ? "border-red-600 dark:border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.name` as const, {
                  required: "Item name",
                })}
              />
            </FormColumn>

            {/* QUANTITY */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `QTY` : ""}`}
              error={errors.items?.[index]?.quantity}
            >
              <input
                type="number"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-2 font-bold rounded-md ${
                  errors.items?.[index]?.quantity
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.quantity` as const, {
                  required: "Required",
                  valueAsNumber: true,
                })}
              />
            </FormColumn>

            {/* PRICE */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `Price` : ""}`}
              error={errors.items?.[index]?.price}
            >
              <input
                type="number"
                step="0.01"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-2 font-bold rounded-md ${
                  errors.items?.[index]?.price
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.price` as const, {
                  required: "Required",
                  valueAsNumber: true,
                })}
              />
            </FormColumn>

            {/* TOTAL PRICE */}
            <p className="text-[#000] dark:text-white font-bold text-[1.7rem] ">
              {(field.quantity ?? 0) * (field.price ?? 0)}
            </p>

            {/* DELETE ITEM */}
            <div
              className="cursor-pointer dark:text-white"
              onClick={() => remove(index)}
            >
              <Trash />
            </div>
          </div>
        ))}

        {/* ADD NEW ITEM */}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: 0, price: 0 })}
          className="flex justify-center items-center gap-3 w-full px-10 lg:py-7 py-5 mt-5 text-[#7C5DFA] dark:text-[#DFE3FA] font-bold bg-primary-gray100 dark:bg-[#252945] rounded-full"
        >
          <Plus size={15} /> Add New Item
        </button>
      </div>

      {isEditSession ? (
        <div className="flex justify-end items-center gap-4">
          <Button
            type="button"
            variant="secondary"
            className="font-bold"
            onClick={() => {
              onCloseModal();
              console.log("Clicked");
            }}
          >
            Cancel
          </Button>
          <Button className="font-bold" type="submit" disabled={isWorking}>
            Save changes
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="">
            <Button
              type="button"
              variant="secondary"
              className="font-bold px-7 text-[1.2rem]"
              onClick={onCloseModal}
            >
              Discard
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant="dark"
              className="font-bold"
              type="button"
              disabled={isWorking}
              onClick={onSaveDraft}
            >
              Save as Draft
            </Button>
            <Button className="font-bold" type="submit" disabled={isWorking}>
              Save & Send
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateInvoiceForm;
