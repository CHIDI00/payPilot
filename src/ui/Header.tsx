import { Bell } from "lucide-react";
import React, { useState } from "react";
import Button from "./Button";

interface HeaderProp {
  setMenuIsOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProp> = ({ setMenuIsOpen }) => {
  const [showNotification, setShowNotification] = useState(false);

  function toggleNotification() {
    setShowNotification((show) => !show);
  }
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

      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={toggleNotification}
        >
          <Bell size={15} />
        </Button>

        {showNotification && (
          <div className="absolute top-[3rem] -right-2 w-[30rem] bg-white rounded-xl shadow-md">
            <div className="w-full py-4 px-6 border-b border-gray-200 flex justify-center items-center">
              <p className="font-bold">Notification</p>
            </div>

            <div className="w-full flex flex-col justify-start items-center p-4">
              <p className="my-6">No notifications</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
