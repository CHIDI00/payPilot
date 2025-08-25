import React from "react";
import { useForm } from "react-hook-form";
import FormColumn from "../../ui/FormColumn";
import FormSubTitle from "../../ui/FormSubTitle";
import { LucideTrash, Plus, Trash } from "lucide-react";
import Button from "../../ui/Button";

interface ClosesModalProp {
  onCloseModal: () => void;
}

interface InvoiceFormData {
  streetAddress?: string;
  postCode?: string;
  city?: string;
  country?: string;
  clientName?: string;
  clientEmail?: string;
  clientStreetAddress?: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  invoiceDate?: string;
  paymentTerms?: string;
  description?: string;
  itemName?: string;
  quantity?: string;
  price?: string;
}

const CreateInvoiceForm: React.FC<ClosesModalProp> = ({ onCloseModal }) => {
  const { register, handleSubmit, formState } = useForm<InvoiceFormData>();
  const { errors } = formState;

  function onSubmit(data: InvoiceFormData) {
    console.log(data);
    onCloseModal();
  }

  function onError(error: unknown) {
    console.log(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className="font-bold text-[2.1rem] mb-10">New Invoice</h2>
      {/* BILL FROM */}
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress" error={errors.streetAddress}>
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.streetAddress ? "border-red-600" : "border-gray-300"
            }`}
            {...register("streetAddress", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          <FormColumn label="City" error={errors.city}>
            <input
              type="text"
              id="city"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("city", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Post Code" error={errors.postCode}>
            <input
              type="text"
              id="postCode"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.postCode ? "border-red-600" : "border-gray-300"
              }`}
              {...register("postCode", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Country" error={errors.country}>
            <input
              type="text"
              id="country"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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

        <FormColumn label="Client's Name" error={errors.clientName}>
          <input
            type="text"
            id="clientName"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.clientName ? "border-red-600" : "border-gray-300"
            }`}
            {...register("clientName", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Client's Email" error={errors.clientEmail}>
          <input
            type="email"
            id="clientEmail"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.clientEmail ? "border-red-600" : "border-gray-300"
            }`}
            {...register("clientEmail", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Street Address" error={errors.clientStreetAddress}>
          <input
            type="text"
            id="clientStreetAddress"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.clientStreetAddress ? "border-red-600" : "border-gray-300"
            }`}
            {...register("clientStreetAddress", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid grid-cols-3 gap-6">
          <FormColumn label="City" error={errors.clientCity}>
            <input
              type="text"
              id="clientCity"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.clientCity ? "border-red-600" : "border-gray-300"
              }`}
              {...register("clientCity", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Post Code" error={errors.clientPostCode}>
            <input
              type="text"
              id="clientPostCode"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.clientPostCode ? "border-red-600" : "border-gray-300"
              }`}
              {...register("clientPostCode", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Country" error={errors.clientCountry}>
            <input
              type="text"
              id="clientCountry"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.clientCountry ? "border-red-600" : "border-gray-300"
              }`}
              {...register("clientCountry", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormColumn label="Invoice Date" error={errors.invoiceDate}>
            <input
              type="date"
              id="invoiceDate"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.invoiceDate ? "border-red-600" : "border-gray-300"
              }`}
              {...register("invoiceDate", {
                required: "can't be empty",
              })}
            />
          </FormColumn>
          <FormColumn label="Payment Terms" error={errors.paymentTerms}>
            <input
              type="text"
              id="paymentTerms"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.paymentTerms ? "border-red-600" : "border-gray-300"
              }`}
              {...register("paymentTerms", {
                required: "can't be empty",
              })}
            />
          </FormColumn>
        </div>
        <FormColumn label="Project Description" error={errors.description}>
          <input
            type="text"
            id="description"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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

        <div className="grid grid-cols-[3fr_.8fr_1.3fr_1fr_.4fr] gap-7 mb-5">
          <p className="text-[#7E88C3] text-[1.4rem]">Item Name</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">QTY.</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Price</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Total</p>
          <div></div>
        </div>

        <div className="grid grid-cols-[3fr_1fr_1.3fr_1fr_.4fr] gap-7">
          <FormColumn error={errors.itemName}>
            <input
              type="text"
              id="itemName"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.itemName ? "border-red-600" : "border-gray-300"
              }`}
              {...register("itemName", {
                required: " ",
              })}
            />
          </FormColumn>
          <FormColumn error={errors.quantity}>
            <input
              type="text"
              id="quantity"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.quantity ? "border-red-600" : "border-gray-300"
              }`}
              {...register("quantity", {
                required: " ",
              })}
            />
          </FormColumn>
          <FormColumn error={errors.price}>
            <input
              type="text"
              id="price"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.price ? "border-red-600" : "border-gray-300"
              }`}
              {...register("price", {
                required: " ",
              })}
            />
          </FormColumn>
          <p className="text-[#000] py-3 font-bold text-[1.7rem] mb-5">
            150.00
          </p>
          <div className="py-3">
            <Trash />
          </div>
        </div>
        <div className="grid grid-cols-[3fr_1fr_1.3fr_1fr_.4fr] gap-7">
          <FormColumn error={errors.itemName}>
            <input
              type="text"
              id="itemName"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.itemName ? "border-red-600" : "border-gray-300"
              }`}
              {...register("itemName", {
                required: "",
              })}
            />
          </FormColumn>
          <FormColumn error={errors.quantity}>
            <input
              type="text"
              id="quantity"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.quantity ? "border-red-600" : "border-gray-300"
              }`}
              {...register("quantity", {
                required: "",
              })}
            />
          </FormColumn>
          <FormColumn error={errors.price}>
            <input
              type="text"
              id="price"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.price ? "border-red-600" : "border-gray-300"
              }`}
              {...register("price", {
                required: "",
              })}
            />
          </FormColumn>
          <p className="text-[#000] py-3 font-bold text-[1.7rem] mb-5">
            150.00
          </p>
          <div className="py-3">
            <LucideTrash />
          </div>
        </div>

        <button className="flex justify-center items-center gap-3 w-full px-10 lg:py-7 py-7 mt-5 text-[#7C5DFA] font-bold bg-primary-gray100 rounded-full">
          <Plus size={15} /> Add New Item
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="">
          <Button
            variant="secondary"
            className="font-bold px-7 text-[1.2rem]"
            onClick={onCloseModal}
          >
            Discard
          </Button>
        </div>

        <div className="flex gap-4">
          <Button variant="dark" className="font-bold" type="submit">
            Save as Draft
          </Button>
          <Button className="font-bold" type="submit">
            Save & Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;
