import Button from "@/ui/Button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useLogin } from "./useLogin";
import {
  useForm,
  type FieldError,
  type FieldErrorsImpl,
  type FieldValues,
  type Merge,
} from "react-hook-form";

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
          setEmail("");
          setPassword("");
        },
      }
    );

    reset(); // clear form after success (optional)
  }

  return (
    <>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-5 p-3"
      >
        {/* Email */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-[1.7rem]">Email</label>
          <div className="flex items-center justify-start w-full px-4 border-2 border-gray-300 rounded-lg">
            <Mail />
            <input
              id="email"
              type="text"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 bg-transparent"
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
        {/* Password */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-[1.7rem]">Password</label>
          <div className="flex items-center justify-start w-full px-4 border-2 border-gray-300 rounded-lg">
            <Lock />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-transparent"
              {...register("password", { required: "Enter your password" })}
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
          {errors.password && (
            <p className="text-red-800">{errors.password.message as string}</p>
          )}
        </div>{" "}
        {/* <div className="">
            Don't have an account yet?{" "}
            <NavLink to="">Create an account</NavLink>
          </div> */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg"
        >
          {isPending ? "Loading" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
