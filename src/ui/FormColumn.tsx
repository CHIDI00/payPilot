import React, { type PropsWithChildren } from "react";
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  FieldValues,
} from "react-hook-form";

interface FormColumnProps extends PropsWithChildren {
  label?: string;
  error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
}

const FormColumn: React.FC<FormColumnProps> = ({ label, error, children }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full mb-7 font-medium">
      {label && (
        <label htmlFor="" className="text-[1.5rem] text-[#7E88C3]">
          {label}
        </label>
      )}
      <div className="w-full">
        {children}
        {error && (
          <p className="text-red-500 text-[1.4rem]">
            {typeof error === "object" && error !== null && "message" in error
              ? (error as FieldError).message
              : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormColumn;
