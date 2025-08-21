import React, { type PropsWithChildren } from "react";

interface FormColumnProps extends PropsWithChildren {
  label: string;
  error?: string;
}

const FormColumn: React.FC<FormColumnProps> = ({ label, error, children }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full mb-7 font-medium">
      <label htmlFor="" className="text-[1.5rem] text-[#7E88C3]">
        {label}
      </label>
      <div className="w-full">
        {children}
        {error && <p className="text-red-500 text-[1.4rem]">{error}</p>}
      </div>
    </div>
  );
};

export default FormColumn;
