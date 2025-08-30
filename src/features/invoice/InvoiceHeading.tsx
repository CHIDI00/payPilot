import React from "react";
import Button from "../../ui/Button";
import addIcon from "../../assets/addIcon.svg";
import type { Invoice } from "../../utils/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModalProp {
  setIsModalOpen: (open: boolean) => void;
  invoice: Invoice[] | undefined;
  setFilter: (status: string) => void; // 👈 new prop
}

const InvoiceHeading: React.FC<ModalProp> = ({
  setIsModalOpen,
  invoice,
  setFilter,
}) => {
  return (
    <div className="w-full md:h-[20rem] h-[10rem] py-[2rem] flex justify-between items-center">
      <div className="w-1/2 text-primary-text dark:text-white">
        <h2 className="md:text-[4rem] text-[2.7rem] font-bold leading-tight">
          Invoices
        </h2>
        <p className="hidden md:flex text-[1.5rem] text-gray-400 leading-tight">
          {invoice && invoice.length > 0
            ? `There ${invoice.length === 1 ? "is" : "are"} ${
                invoice.length
              } invoice${invoice.length > 1 ? "s" : ""}`
            : "No invoices"}
        </p>
      </div>

      <div className="md:w-1/2 flex justify-end items-center md:gap-6 gap-2 text-primary-text">
        <div className="relative px-16 py-3">
          <Select onValueChange={(value) => setFilter(value)}>
            {" "}
            {/* 👈 call setFilter */}
            <SelectTrigger
              className={`${
                window.innerWidth > 500 ? "w-[180px]" : "w-[100px]"
              } text-black`}
            >
              <SelectValue
                placeholder={
                  window.innerWidth > 500 ? "Filter by status" : "Filter"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {window.innerWidth > 770 && (
          <Button icon={addIcon} onClick={() => setIsModalOpen(true)}>
            New Invoice
          </Button>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden bg-[#7C5DFA] rounded-full text-[1.5rem] text-white py-3 px-9 gap-3 flex justify-center items-center hover:bg-[#9277FF]"
        >
          {" "}
          <img src={addIcon} alt="" className="w-10 h-10" /> New{" "}
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeading;
