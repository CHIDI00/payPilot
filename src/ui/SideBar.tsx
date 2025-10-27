import React from "react";
import logo from "../assets/logo.png";
import profilePic from "../assets/profilePic.png";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/ui/ThemeToggle";

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex lg:flex-col justify-between items-center">
      <div className="lg:w-full w-[20%] h-full ">
        <img src={logo} alt="logo" className="lg:w-full lg:h-auto h-full" />
      </div>

      <div className="h-full w-full flex lg:flex-col lg:justify-end justify-end items-center">
        <ThemeToggle />
        {/* <div className="lg:w-full text-white pr-4 flex justify-center items-center">
          <Logout />
        </div> */}
        <div
          onClick={() => navigate("/settings")}
          className="lg:w-full text-white  lg:p-5 pr-4 flex justify-center items-center"
        >
          <Settings size={24} />
        </div>
        <div className="lg:w-full lg:h-auto z-[30] h-full flex justify-center items-center lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <div
            onClick={() => navigate("/account")}
            className=" border-2 border-purple-400 rounded-full lg:min-w-full max-h-14"
          >
            <img
              src={profilePic}
              alt=""
              className="w-full cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
