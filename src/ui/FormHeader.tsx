import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const FormHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <NavLink to="/home">
          <div className="flex gap-5 items-center justify-center lg:w-full w-[20%] h-full p-5">
            <img
              src={logo}
              alt="logo"
              className="h-full lg:w-[10%] lg:h-auto"
            />
            <p className="text-5xl font-extrabold text-black">PayPilot</p>
          </div>
        </NavLink>
        <p className=" text-[1.7rem] text-gray-500">
          Navigate your payments with ease
        </p>
      </div>

      <div className="flex flex-col items-center w-full p-3 my-2 rounded-lg">
        {/* <h2 className="text-[2.4rem] font-bold ">Get Started</h2> */}
        <div className="grid grid-cols-2 w-full justify-center items-center gap-1 bg-primary-gray100 dark:bg-[#141625] p-1 rounded-xl my-6">
          <div
            onClick={() => navigate("/auth/login")}
            className="flex items-center justify-center w-full p-3 font-semibold rounded-lg cursor-pointer"
          >
            Login
          </div>
          <div
            onClick={() => navigate("/auth/signup")}
            className="w-full bg-white dark:bg-[#191c2f] flex items-center justify-center rounded-lg p-3 font-semibold cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
};

export default FormHeader;
