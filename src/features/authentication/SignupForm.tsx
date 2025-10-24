import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "@/ui/Button";
import google from "../../assets/google.svg";
import { useSignup } from "./useSignup";

interface InvoiceSignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<InvoiceSignupData>();
  const { errors } = formState;

  const { signup, isPending } = useSignup();

  function onSubmit(data: InvoiceSignupData) {
    const { fullName, email, password } = data;

    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );

    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-full gap-5 p-4"
    >
      {/* Full Name */}
      <div className="flex flex-col w-full gap-2">
        <label className="text-[1.6rem] font-medium">Full Name</label>
        <div className="flex items-center px-4 transition-all border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
          <User className="text-gray-500" />
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-transparent focus:outline-none"
            {...register("fullName", { required: "Full name is required" })}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col w-full gap-2">
        <label className="text-[1.6rem] font-medium">Email</label>
        <div className="flex items-center px-4 transition-all border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
          <Mail className="text-gray-500" />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-transparent focus:outline-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col w-full gap-2">
        <label className="text-[1.6rem] font-medium">Password</label>
        <div className="flex items-center px-4 transition-all border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
          <Lock className="text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Create a password"
            className="w-full px-4 py-3 bg-transparent focus:outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col w-full gap-2">
        <label className="text-[1.6rem] font-medium">Confirm Password</label>
        <div className="flex items-center px-4 transition-all border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
          <Lock className="text-gray-500" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm your password"
            className="w-full px-4 py-3 bg-transparent focus:outline-none"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-500 hover:text-gray-800"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Animated Submit Button */}
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.95, rotate: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-full"
      >
        <Button
          disabled={isPending}
          className="w-full py-3 text-lg transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {isPending ? "Getting ready" : "Sign Up"}
        </Button>
      </motion.div>

      {/* Divider */}
      <div className="relative flex items-center w-full">
        <div className="flex-grow h-[0.15rem] bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-600 uppercase">or</span>
        <div className="flex-grow h-[0.15rem] bg-gray-300"></div>
      </div>

      {/* Google Signup */}
      <div className="flex items-center justify-center w-full gap-4 px-6 py-4 transition-all border-2 border-gray-200 cursor-pointer rounded-xl hover:shadow-md">
        <img src={google} alt="google" className="w-7 h-7" />
        <p className="font-medium text-gray-700">Sign up with Google</p>
      </div>
    </form>
  );
};

export default SignupForm;
