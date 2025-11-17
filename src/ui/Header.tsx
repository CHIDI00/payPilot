import { Bell } from "lucide-react";
import React from "react";
import Button from "./Button";

interface HeaderProp {
  setMenuIsOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProp> = ({ setMenuIsOpen }) => {
  return (
    <div className="sticky z-[20] top-0 left-0 flex items-center justify-between w-full px-6 py-5 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center justify-start gap-5">
        <div
          onClick={() => setMenuIsOpen(true)}
          className="flex flex-col items-center justify-between gap-2 lg:hidden"
        >
          <span className="w-8 h-[0.15rem] bg-black rounded-full"></span>
          <span className="w-8 h-[0.15rem] bg-black ml-3 rounded-full"></span>
          <span className="w-8 h-[0.15rem] bg-black rounded-full"></span>
        </div>
        <h2 className="font-bold text-[2.5rem]">DashBoard</h2>
      </div>

      <div className="">
        <Button variant="secondary" size="sm" className="rounded-full">
          <Bell size={15} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
