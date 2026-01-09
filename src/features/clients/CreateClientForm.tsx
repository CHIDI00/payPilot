import Button from "@/ui/Button";
import FormColumn from "@/ui/FormColumn";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface ClosesModalProp {
  onCloseModal: () => void;
}

const CreateClientForm: React.FC<ClosesModalProp> = ({ onCloseModal }) => {
  return (
    <form>
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
        <FormColumn label="Name">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="John Doe"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <FormColumn label="Billing Email">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="john@example.com"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <FormColumn label="Phone">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="+234 786 9837 88"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <FormColumn label="Website">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="john.com"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <FormColumn label="Address line 1">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="222 St Ikeja"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <FormColumn label="Address line 2">
          <input
            type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="122 St Ikoyi"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
          />
        </FormColumn>

        <div className="grid grid-cols-2 gap-7">
          <FormColumn label="City">
            <input
              type="text"
              id="street_address"
              // defaultValue={companyStreet}
              placeholder="Ikeja"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
            />
          </FormColumn>
          <FormColumn label="State/Province">
            <input
              type="text"
              id="street_address"
              // defaultValue={companyStreet}
              placeholder="Lagos"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
            />
          </FormColumn>
          <FormColumn label="Zip Code">
            <input
              type="text"
              id="street_address"
              // defaultValue={companyStreet}
              placeholder="IK8637"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
            />
          </FormColumn>
          <FormColumn label="Country">
            <input
              type="text"
              id="street_address"
              // defaultValue={companyStreet}
              placeholder="Nigeria"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium rounded-md `}
            />
          </FormColumn>
        </div>

        <FormColumn label="Note">
          <textarea
            // type="text"
            id="street_address"
            // defaultValue={companyStreet}
            placeholder="Additiona information..."
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-medium resize-none rounded-md h-[10rem]`}
          />
        </FormColumn>
      </div>

      <div className="flex justify-end items-start gap-5">
        <Button variant="secondary">Cancel</Button>
        <Button>Create</Button>
      </div>
    </form>
  );
};

export default CreateClientForm;
