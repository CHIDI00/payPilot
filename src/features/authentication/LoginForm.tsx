import Button from "@/ui/Button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { error } = formState;

  return (
    <>
      {/* FORM */}
      <form className="w-full flex flex-col items-center gap-5 p-3">
        {/* Email */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[1.7rem]">Email</label>
          <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
            <Mail />
            <input
              id="fullName"
              type="text"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 bg-transparent"
              {...register("fullName", { required: "Enter your fullname" })}
            />
          </div>
        </div>{" "}
        {/* Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[1.7rem]">Password</label>
          <div className="w-full flex justify-start items-center border-2 border-gray-300 rounded-lg px-4">
            <Lock />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-transparent"
              {...register("password", { required: "Enter your fullname" })}
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
      </form>
    </>
  );
};

export default LoginForm;
