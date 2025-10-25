import React from "react";
import { useNavigate } from "react-router-dom";

const FormHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-[3.3rem] font-bold ">payPilot</h2>
        <p className=" text-[1.7rem] text-gray-500">
          Navigate your payments with ease
        </p>
      </div>

      <div className="w-full flex flex-col items-center  p-3  rounded-lg my-2">
        {/* <h2 className="text-[2.4rem] font-bold ">Get Started</h2> */}
        <div className="grid grid-cols-2 w-full justify-center items-center gap-1 bg-primary-gray100 dark:bg-[#141625] p-1 rounded-xl my-6">
          <div
            onClick={() => navigate("/auth/login")}
            className="w-full  flex items-center justify-center rounded-lg p-3  font-semibold cursor-pointer"
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
