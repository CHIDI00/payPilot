import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

import FormColumn from "../../ui/FormColumn";
import FormSubTitle from "../../ui/FormSubTitle";
import { Plus, Trash } from "lucide-react";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../../services/apiInvoices";

interface ClosesModalProp {
  onCloseModal: () => void;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceFormData {
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

  // instead of single fields, use an array
  items: InvoiceItem[];
}

const CreateInvoiceForm: React.FC<ClosesModalProp> = ({ onCloseModal }) => {
  const { register, handleSubmit, formState, control } =
    useForm<InvoiceFormData>({
      defaultValues: {
        items: [
          { name: "", quantity: 0, price: 0 }, // 👈 start with one item
        ],
      },
    });
  const { errors } = formState;

  // ...rest of your code

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items", // 👈 this links to InvoiceFormData.items
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onCloseModal?.();
    },
    onError: (err) => console.log(err.message),
  });

  function onSubmit(data: InvoiceFormData) {
    console.log(data);
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-[2.1rem] mb-10">New Invoice</h2>
      {/* BILL FROM */}
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress" error={errors.street_address}>
          <input
            type="text"
            id="street_address"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("post_code", {
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

        <FormColumn label="Client's Name" error={errors.client_name}>
          <input
            type="text"
            id="client_name"
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
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
            className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_street_address
                ? "border-red-600"
                : "border-gray-300"
            }`}
            {...register("client_street_address", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid grid-cols-3 gap-6">
          <FormColumn label="City" error={errors.client_city}>
            <input
              type="text"
              id="client_city"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_city", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Post Code" error={errors.client_post_code}>
            <input
              type="text"
              id="client_post_code"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_post_code", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Country" error={errors.client_country}>
            <input
              type="text"
              id="client_country"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_country ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_country", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormColumn label="Invoice Date" error={errors.invoice_date}>
            <input
              type="date"
              id="invoice_date"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.invoice_date ? "border-red-600" : "border-gray-300"
              }`}
              {...register("invoice_date", {
                required: "can't be empty",
              })}
            />
          </FormColumn>
          <FormColumn label="Payment Terms" error={errors.payment_terms}>
            <input
              type="text"
              id="payment_terms"
              className={`w-full bg-transparent text-[1.3rem] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.payment_terms ? "border-red-600" : "border-gray-300"
              }`}
              {...register("payment_terms", {
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

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[3fr_1fr_1.3fr_1fr_.4fr] gap-7 mb-4"
          >
            {/* Item Name */}
            <FormColumn error={errors.items?.[index]?.name}>
              <input
                type="text"
                className={`w-full bg-transparent text-[1.3rem] border-[1px] py-3 px-6 font-bold rounded-md ${
                  errors.items?.[index]?.name
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.name` as const, {
                  required: "Required",
                })}
              />
            </FormColumn>

            {/* Quantity */}
            <FormColumn error={errors.items?.[index]?.quantity}>
              <input
                type="number"
                className={`w-full bg-transparent text-[1.3rem] border-[1px] py-3 px-6 font-bold rounded-md ${
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

            {/* Price */}
            <FormColumn error={errors.items?.[index]?.price}>
              <input
                type="number"
                step="0.01"
                className={`w-full bg-transparent text-[1.3rem] border-[1px] py-3 px-6 font-bold rounded-md ${
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

            {/* Total (read-only) */}
            <p className="text-[#000] py-3 font-bold text-[1.7rem] mb-5">
              {(field.quantity ?? 0) * (field.price ?? 0)}
            </p>

            {/* Delete Item */}
            <div className="py-3 cursor-pointer" onClick={() => remove(index)}>
              <Trash />
            </div>
          </div>
        ))}

        {/* Add New Item */}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: 0, price: 0 })}
          className="flex justify-center items-center gap-3 w-full px-10 lg:py-7 py-7 mt-5 text-[#7C5DFA] font-bold bg-primary-gray100 rounded-full"
        >
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
          <Button className="font-bold" type="submit" disabled={isPending}>
            Save & Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;
