import Button from "@/ui/Button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen h-[100dvh] flex justify-center items-center bg-primary-bg dark:bg-[£141625]">
      <div className="min-w-[40rem] p-4 flex flex-col justify-center items-start">
        {/* HEADER */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-[3.3rem] font-bold ">payPilot</h2>
          <p className=" text-[1.7rem] text-gray-500">
            Navigate your payments with ease
          </p>
        </div>

        {/* SIGNUP */}
        <div className="w-full flex flex-col items-center  p-3  rounded-lg my-2">
          {/* <h2 className="text-[2.4rem] font-bold ">Get Started</h2> */}
          <div className="grid grid-cols-2 w-full justify-center items-center gap-1 bg-primary-gray100 p-1 rounded-xl my-6">
            <div
              onClick={() => navigate("/auth/login")}
              className="w-full  flex items-center justify-center rounded-lg p-3  font-semibold cursor-pointer"
            >
              Login
            </div>
            <div
              onClick={() => navigate("/auth/signup")}
              className="w-full bg-white flex items-center justify-center rounded-lg p-3 font-semibold cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="w-full flex flex-col items-center gap-5 p-3">
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.7rem]">Email</label>
            <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
              <Mail />
              <input
                type="text"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 bg-transparent"
              />
            </div>
          </div>{" "}
          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-[1.7rem]">Password</label>
            <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeOff className="w-9 h-9" />
                ) : (
                  <Eye className="w-9 h-9" />
                )}
              </button>
            </div>
          </div>{" "}
          {/* <div className="">
            Don't have an account yet?{" "}
            <NavLink to="">Create an account</NavLink>
          </div> */}
          <Button className="w-full rounded-lg">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
