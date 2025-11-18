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
    <div className="w-full md:h-[14rem] h-[8rem] py-[1.3rem] flex justify-between items-center">
      <div className="w-1/2 text-primary-text dark:text-white">
        <h2 className="md:text-[4rem] text-[2.3rem] font-bold leading-tight">
          Invoices
        </h2>
        <p className="flex text-[1.5rem] text-gray-400 leading-tight">
          {invoice && invoice.length > 0
            ? `There ${invoice.length === 1 ? "is" : "are"} ${
                invoice.length
              } invoice${invoice.length > 1 ? "s" : ""}`
            : "No invoices"}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 md:w-1/2 md:gap-6 text-primary-text">
        <div className="relative px-5 py-3 lg:px-16">
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
          title="Add new invoice"
          onClick={() => setIsModalOpen(true)}
          className="md:hidden w-28 bg-[#7C5DFA] rounded-full text-[1.5rem] text-white px-2 py-1 gap-2 flex justify-start items-center hover:bg-[#9277FF]"
        >
          <img src={addIcon} alt="" className="w-7 h-7" /> <span>New</span>
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeading;
