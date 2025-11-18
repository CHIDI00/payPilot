import type React from "react";
import { useForm } from "react-hook-form";
import { type Dispatch, type SetStateAction, type FormEvent } from "react";

import Button from "@/ui/Button";
import FormColumn from "@/ui/FormColumn";

import { useUpdateUser } from "../authentication/useUpdateUserProfile";

interface userFormToUpdateProfile {
  setFullName: Dispatch<SetStateAction<string>>;
  handleAvatarUpdate: (e: FormEvent<HTMLFormElement>) => void;
}

interface PasswordFormFields {
  newPassword: string;
  confirmPassword: string;
}

const AccountSetting: React.FC<userFormToUpdateProfile> = ({
  setFullName,
  handleAvatarUpdate,
}) => {
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<PasswordFormFields>();

  function handleUpdatePassword(data: PasswordFormFields) {
    updateUser({ password: data.newPassword });
    reset();
  }

  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-6">
      <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
        Profile setting
      </h3>

      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-col">
          <p className="md:text-[1.6rem] text-2xl leading-tight">
            Change username
          </p>
        </div>

        <form
          onSubmit={handleAvatarUpdate}
          className="grid items-center justify-center w-full grid-cols-1 md:grid-cols-3 gap-x-5"
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
      </div>
      <div className="flex flex-col">
        <p className="md:text-[1.6rem] text-2xl leading-tight">
          Change password
        </p>
        <p className="md:text-[1.4rem] text-xl leading-tight text-gray-400">
          Update your password for better security.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdatePassword)}
        className="grid items-center justify-center w-full grid-cols-1 md:grid-cols-3 gap-x-5"
      >
        <FormColumn label="New password">
          <input
            type="password"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md"
            {...register("newPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password needs a min of 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500">
              {errors.newPassword.message as string}
            </span>
          )}
        </FormColumn>
        <FormColumn label="Confirm new password">
          <input
            type="password"
            className="w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords need to match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message as string}
            </span>
          )}
        </FormColumn>
        <Button className="rounded-lg " disabled={isUpdating}>
          Update password
        </Button>
      </form>
    </div>
  );
};

export default AccountSetting;
