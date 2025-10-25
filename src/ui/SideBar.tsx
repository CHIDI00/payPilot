import React from "react";
import logo from "../assets/logo.png";
import profilePic from "../assets/profilePic.png";
import { useDarkMode } from "@/context/useDarkMode";
import { Moon, SunDim } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";

const SideBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex lg:flex-col justify-between items-center">
      <div className="lg:w-full w-[20%] h-full ">
        <img src={logo} alt="logo" className="lg:w-full lg:h-auto h-full" />
      </div>

      <div className="h-full w-full flex lg:flex-col lg:justify-end justify-center items-center">
        <div
          className="w-full text-white p-10 flex justify-center items-center"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <SunDim /> : <Moon />}
        </div>

        <div>
          <Logout />
        </div>
        <div className="w-full  flex justify-center items-center lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <div
            onClick={() => navigate("/account")}
            className=" border-2 border-purple-400 rounded-full min-w-full max-h-14"
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
