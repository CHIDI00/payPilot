import Button from "@/ui/Button";
import FormColumn from "@/ui/FormColumn";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import type React from "react";

interface userFormToUpdateProfile {
  setFullName: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AccountSetting: React.FC<userFormToUpdateProfile> = ({
  setFullName,
  handleSubmit,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-6">
      <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
        Account setting
      </h3>

      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="md:text-[1.6rem] text-2xl leading-tight">
            Change username
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full grid md:grid-cols-3 grid-cols-1 justify-center items-center gap-x-5"
        >
          <FormColumn label="New userame">
            <input
              type="text"
              id="fullName"
              onChange={(e) => {
                const fullName = (e.target as HTMLInputElement).value;
                setFullName(fullName);
              }}
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
            />
          </FormColumn>

          <Button className="rounded-lg ">Update username</Button>
        </form>
        <div className="flex flex-col">
          <p className="md:text-[1.6rem] text-2xl leading-tight">
            Change password
          </p>
          <p className="md:text-[1.4rem] text-xl leading-tight text-gray-400">
            Update your pasword for better security.
          </p>
        </div>
        <form className="w-full grid md:grid-cols-3 grid-cols-1 justify-center items-center gap-x-5">
          <FormColumn label="Old password">
            <input
              type="text"
              id="client_name"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
              // {...register("client_name", {
              //   required: "can't be empty",
              // })}
            />
          </FormColumn>
          <FormColumn label="New password">
            <input
              type="text"
              id="client_name"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
              // {...register("client_name", {
              //   required: "can't be empty",
              // })}
            />
          </FormColumn>
          <Button className="rounded-lg ">Update password</Button>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
