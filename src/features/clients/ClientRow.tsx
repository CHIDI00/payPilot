import Button from "@/ui/Button";
import React from "react";

const ClientRow: React.FC = () => {
  return (
    <div className="w-full px-6 py-5   grid grid-cols-[2fr_1fr_1fr_1fr_.3fr] gap-5 justify-center items-center">
      <div className="flex flex-col">
        <p className="text-3xl font-medium">Tech Solutions Inc.</p>
        <p className="text-[1.2rem] text-gray-400">contact@techsol.com</p>
      </div>
      <div className="">09073887755</div>
      <div className="text-left">N200,000</div>
      <div className="">04/12/2025</div>
      <div className="">
        <Button
          variant="secondary"
          className="rounded-xl text-[2rem] px-[8px] py-[6px]"
        >
          ⋮
        </Button>
      </div>
    </div>
  );
};

export default ClientRow;
