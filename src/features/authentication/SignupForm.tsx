import Button from "@/ui/Button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import google from "../../assets/google.svg";
import { useForm } from "react-hook-form";

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full flex flex-col items-center gap-5 p-3"
      >
        {/* FullName */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[1.7rem]">Full Name</label>
          <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
            <User />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-transparent"
              id="fullName"
              {...register("fullName", { required: "Enter your fullname" })}
            />
          </div>
        </div>{" "}
        {/* Email */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[1.7rem]">Email</label>
          <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
            <Mail />
            <input
              type="text"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 bg-transparent"
              id="email"
              {...register("email", { required: "Enter your fullname" })}
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
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Create a password" })}
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
        {/* Comfirm Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[1.7rem]">Confirm Password</label>
          <div
            className={`w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4 ${
              errors && "border-red-800"
            }`}
          >
            <Lock />
            <input
              type="text"
              placeholder="Comfirm your password"
              className={`w-full px-4 py-3 bg-inherit"
              id="confirmPassword `}
              autoComplete="current-password"
              {...register("confirmPassword", {
                required: "Password mismatched",
                validate: (value) =>
                  value === getValues().password || "Password Mismatched",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`text-gray-500 hover:text-gray-800 `}
            >
              {showPassword ? (
                <EyeOff className="w-9 h-9" />
              ) : (
                <Eye className="w-9 h-9" />
              )}
            </button>
          </div>
          {errors && (
            <p className="text-red-800">{errors?.confirmPassword?.message}</p>
          )}
        </div>
        <Button className="w-full rounded-lg">Sign Up</Button>
        <div className="relative w-full">
          <div className="absolute w-full inset-0 flex items-center">
            <div className="w-full h-[0.15rem] bg-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-md uppercase">
            <span className="px-2 bg-primary-bg text-muted-foreground">OR</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center rounded-xl py-4 px-6 gap-5 border-2 border-gray-200 cursor-pointer">
          <img src={google} alt="google" className="w-10 h-10" />
          <p>Sign up with Google</p>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
