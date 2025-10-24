import React from "react";
import logo from "../assets/logo.png";
import profilePic from "../assets/profilePic.png";
import { useDarkMode } from "@/context/useDarkMode";
import { Moon, SunDim } from "lucide-react";

const SideBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="w-full h-full flex lg:flex-col justify-between items-center">
      <div className="lg:w-full w-[20%] h-full ">
        <img src={logo} alt="logo" className="lg:w-full lg:h-auto h-full" />
      </div>

      <div className="h-full flex lg:flex-col lg:justify-end justify-center items-center">
        <div
          className="w-full text-white p-10 flex justify-center items-center"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <SunDim /> : <Moon />}
        </div>
        <div className="w-full lg:h-auto h-full flex justify-center items-center lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <img
            src={profilePic}
            alt=""
            className="lg:w-auto w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
