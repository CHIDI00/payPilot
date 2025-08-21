import React, { type PropsWithChildren } from "react";

const FormSubTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="text-[#7C5DFA] font-bold text-[1.5rem] mb-5">{children}</p>
  );
};

export default FormSubTitle;
