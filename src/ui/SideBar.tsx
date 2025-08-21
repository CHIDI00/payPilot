import React from "react";
import logo from "../assets/logo.png";
import themeIcon from "../assets/themeIcon.svg";
import profilePic from "../assets/profilePic.png";

const SideBar: React.FC = () => {
  return (
    <div className="w-full h-full flex lg:flex-col justify-between items-center">
      <div className="lg:w-full w-[20%] h-full ">
        <img src={logo} alt="logo" className="lg:w-full lg:h-auto h-full" />
      </div>

      <div className="h-full flex lg:flex-col lg:justify-end justify-center items-center">
        <div className="w-full p-10 flex justify-center items-center">
          <img src={themeIcon} alt="" className=" cursor-pointer" />
        </div>
        <div className="w-full lg:h-auto h-full flex justify-center items-center lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <img
            src={profilePic}
            alt=""
            className="lg:w-auto w-[5rem] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
