import React, { useState } from "react";
import Button from "../../ui/Button";
import addIcon from "../../assets/addIcon.svg";
import { ChevronDown } from "lucide-react";
import invoices from "../../data/invoiceData";

interface ModalProp {
  setIsModalOpen: (open: boolean) => void;
}
const InvoiceHeading: React.FC<ModalProp> = ({ setIsModalOpen }) => {
  const [menuIsOpen, setMenueIsOpen] = useState(false);

  function handleMenu() {
    setMenueIsOpen((prev) => !prev);
  }

  return (
    <>
      <div className="w-full md:h-[20rem] h-[10rem] py-[2rem] flex justify-between items-center">
        <div className="w-1/2 text-primary-text">
          <h2 className="md:text-[4rem] text-[2.7rem] font-bold leading-tight">
            Invoices
          </h2>
          <p className="hidden md:flex text-[1.5rem] text-gray-400 leading-tight">
            {invoices.length > 0
              ? `There are ${invoices.length} total invoices`
              : "No invoice"}
          </p>
          <p className="block md:hidden text-[1.5rem] text-gray-400 leading-tight">
            {" "}
            {invoices.length > 0 ? `${invoices.length} invoices` : "No invoice"}
          </p>
        </div>

        <div className="md:w-1/2 flex justify-end items-center md:gap-6 gap-2 text-primary-text">
          <div className="relative px-16 py-3" onClick={handleMenu}>
            <p className="hidden md:flex font-semibold gap-5">
              Filter by status{" "}
              <span>
                <ChevronDown />
              </span>
            </p>
            <p className="flex md:hidden font-semibold">
              Filter{" "}
              <span>
                <ChevronDown />
              </span>
            </p>

            {menuIsOpen && (
              <div className="absolute w-full top-full left-0  bg-primary-gray p-8 shadow-2xl rounded-xl flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="w-7 h-7 accent-purple-500 cursor-pointer"
                  />
                  <label className="font-semibold">Draft</label>
                </div>
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="w-7 h-7 accent-purple-500 cursor-pointer"
                  />
                  <label className="font-semibold">Pending</label>
                </div>
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    className="w-7 h-7 accent-purple-500 cursor-pointer"
                  />
                  <label className="font-semibold">Paid</label>
                </div>
              </div>
            )}
          </div>

          {window.innerWidth > 770 && (
            <Button icon={addIcon} onClick={() => setIsModalOpen(true)}>
              New Invoice
            </Button>
          )}
          <button className="md:hidden bg-[#7C5DFA] rounded-full text-[1.5rem] text-white py-3 px-9 gap-3 flex justify-center items-center hover:bg-[#9277FF]">
            <img src={addIcon} alt="" className="w-10 h-10" />
            New
          </button>
        </div>
      </div>

      {/* <Modal /> */}
    </>
  );
};

export default InvoiceHeading;
