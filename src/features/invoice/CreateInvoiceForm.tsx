import React from "react";
import { useForm } from "react-hook-form";
import FormColumn from "../../ui/FormColumn";
import FormSubTitle from "../../ui/FormSubTitle";

interface ClosesModalProp {
  onCloseModal: () => void;
}

const CreateInvoiceForm: React.FC<ClosesModalProp> = ({ onCloseModal }) => {
  const { register, error, handleSubmit, formState } = useForm();
  function onSubmit() {
    console.log("Submitted");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-[2.1rem] mb-10" onClick={onCloseModal}>
        New Invoice
      </h2>

      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        <FormColumn label="Street Adress">
          <input
            type="text"
            id="streetAddress"
            className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            {...register("streetAddress")}
          />
        </FormColumn>
        <div className="grid md:grid-cols-3 grid-cols-[1fr_1fr_100%] gap-6">
          <FormColumn label="City">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Post Code">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="streetAddress"
              className={`w-full bg-transparent border-2 border-gray-300 py-3 px-6 font-bold rounded-md ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              {...register("streetAddress")}
            />
          </FormColumn>
        </div>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;
