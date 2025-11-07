import LoginForm from "@/features/authentication/LoginForm";
import FormHeader from "@/ui/FormHeader";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="w-screen h-[100dvh] flex justify-center items-center bg-primary-bg dark:bg-[#141625] p-4">
      <div className="w-[40rem] p-4 flex flex-col justify-center items-start bg-white dark:bg-[#0d0e18] rounded-[2rem] border-[1px] border-gray-100 dark:border-gray-800">
        <FormHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
