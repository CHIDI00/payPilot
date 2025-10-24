import SignupForm from "@/features/authentication/SignupForm";
import FormHeader from "@/ui/FormHeader";
import React from "react";

const Signup: React.FC = () => {
  return (
    <div className="w-screen h-[100dvh] flex justify-center items-center bg-primary-bg dark:bg-[£141625]">
      <div className="min-w-[40rem] p-4 flex flex-col justify-center items-start bg-white rounded-[2rem] ">
        <FormHeader />
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
