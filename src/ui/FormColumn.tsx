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
  className?: string;
}

const FormColumn: React.FC<FormColumnProps> = ({
  label,
  error,
  children,
  className,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-start gap-2 w-full mb-7 font-medium ${
        className || ""
      }`}
    >
      <div className="w-full flex justify-between items-center">
        {label && (
          <label
            htmlFor=""
            className={`text-[1.2rem] text-[#7E88C3] ${
              error && "text-red-600"
            }`}
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-red-600 text-[1.1rem]">
            {typeof error === "object" && error !== null && "message" in error
              ? (error as FieldError).message
              : ""}
          </p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default FormColumn;
