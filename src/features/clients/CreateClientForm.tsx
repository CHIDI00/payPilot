import Button from "@/ui/Button";
import FormColumn from "@/ui/FormColumn";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateClient } from "./useCreateClient";
import type { CreateClientData } from "@/services/apiClient";

interface ClosesModalProp {
  onCloseModal: () => void;
}

const CreateClientForm: React.FC<ClosesModalProp> = ({ onCloseModal }) => {
  // CUSTOM HOOK FOR CLIENT CREATION
  const { createNewClient, isCreating } = useCreateClient();

  // REACT HOOK FORM SETUP
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateClientData>();

  // FORM SUBMISSION HANDLER
  function handleFormForCreatingClient(data: CreateClientData) {
    createNewClient(data, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(handleFormForCreatingClient)}>
      <div className="w-full mb-10">
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
      </div>

      <h2 className="font-bold text-[2.1rem] dark:text-[#FFF] mb-10">
        Create client
      </h2>

      <div className="my-6">
        {/* NAME FIELD - REQUIRED */}
        <FormColumn label="Name" error={errors.name}>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-6 font-medium rounded-md ${
              errors.name ? "border-red-600" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Name is required",
            })}
          />
        </FormColumn>

        {/* EMAIL FIELD - REQUIRED */}
        <FormColumn label="Billing Email" error={errors.email}>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-6 font-medium rounded-md ${
              errors.email ? "border-red-600" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </FormColumn>

        {/* PHONE FIELD - OPTIONAL */}
        <FormColumn label="Phone">
          <input
            type="text"
            id="phone_number"
            placeholder="+234 786 9837 88"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
            {...register("phone_number")}
          />
        </FormColumn>

        {/* WEBSITE FIELD - OPTIONAL */}
        <FormColumn label="Website">
          <input
            type="text"
            id="website"
            placeholder="john.com"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
            {...register("website")}
          />
        </FormColumn>

        {/* ADDRESS LINE 1 - OPTIONAL */}
        <FormColumn label="Address line 1">
          <input
            type="text"
            id="address_line_1"
            placeholder="222 St Ikeja"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
            {...register("address_line_1")}
          />
        </FormColumn>

        {/* ADDRESS LINE 2 - OPTIONAL */}
        <FormColumn label="Address line 2">
          <input
            type="text"
            id="address_line_2"
            placeholder="122 St Ikoyi"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
            {...register("address_line_2")}
          />
        </FormColumn>

        <div className="grid grid-cols-2 gap-7">
          {/* CITY FIELD - OPTIONAL */}
          <FormColumn label="City">
            <input
              type="text"
              id="city"
              placeholder="Ikeja"
              className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
              {...register("city")}
            />
          </FormColumn>

          {/* STATE FIELD - OPTIONAL */}
          <FormColumn label="State/Province">
            <input
              type="text"
              id="state"
              placeholder="Lagos"
              className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
              {...register("state")}
            />
          </FormColumn>

          {/* ZIP CODE FIELD - OPTIONAL */}
          <FormColumn label="Zip Code">
            <input
              type="text"
              id="zipcode"
              placeholder="IK8637"
              className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
              {...register("zipcode")}
            />
          </FormColumn>

          {/* COUNTRY FIELD - OPTIONAL */}
          <FormColumn label="Country">
            <input
              type="text"
              id="country"
              placeholder="Nigeria"
              className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md"
              {...register("country")}
            />
          </FormColumn>
        </div>

        {/* NOTE FIELD - OPTIONAL */}
        <FormColumn label="Note">
          <textarea
            id="note"
            placeholder="Additional information..."
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium resize-none rounded-md h-[10rem]"
            {...register("note")}
          />
        </FormColumn>
      </div>

      {/* FORM ACTIONS */}
      <div className="flex justify-end items-start gap-5">
        <Button
          type="button"
          variant="secondary"
          onClick={onCloseModal}
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateClientForm;
