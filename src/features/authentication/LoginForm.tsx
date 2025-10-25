import Button from "@/ui/Button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useLogin } from "./useLogin";
import { motion } from "framer-motion";
import {
  useForm,
  type FieldError,
  type FieldErrorsImpl,
  type FieldValues,
  type Merge,
} from "react-hook-form";
import { signInWithGoogle } from "../../services/apiAuth";
import google from "../../assets/google.svg";

interface InvoiceLoginData {
  email: string;
  password: string;
  errors?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InvoiceLoginData>();

  async function onSubmit({ email, password }: InvoiceLoginData) {
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-5 p-3"
      >
        {/* EMAIL */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-[1.7rem]">Email</label>
          <div className="relative flex items-center justify-start w-full  border-2 border-gray-300 dark:border-gray-700 rounded-lg">
            <Mail className="absolute left-3 top-2 dark:text-gray-700" />
            <input
              id="email"
              type="text"
              placeholder="Enter your Email"
              className="w-full pl-14 py-3 bg-transparent"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
        </div>{" "}
        {/* PASSWORD */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-[1.7rem]">Password</label>
          <div className="relative flex items-center justify-start w-full border-2 border-gray-300 dark:border-gray-700 rounded-lg">
            <Lock className="absolute left-3 top-2 dark:text-gray-700" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-14 py-3 bg-transparent"
              {...register("password", { required: "Enter your password" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? (
                <EyeOff className="w-9 h-9" />
              ) : (
                <Eye className="w-9 h-9" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-800">{errors.password.message as string}</p>
          )}
        </div>{" "}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.95, rotate: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-full"
        >
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-4xl rounded-lg"
          >
            {isPending ? "Loading" : "Login"}
          </Button>
        </motion.div>
        {/* GOOGLE LOGIN */}
        <button
          onClick={signInWithGoogle}
          type="button"
          className="flex items-center justify-center w-full gap-4 px-6 py-4 transition-all border-2 border-gray-200 cursor-pointer rounded-xl hover:shadow-md"
        >
          <img src={google} alt="google" className="w-7 h-7" />
          <p className="font-medium text-3xl text-gray-700 dark:text-white">
            Continue with Google
          </p>
        </button>
      </form>
    </>
  );
};

export default LoginForm;
