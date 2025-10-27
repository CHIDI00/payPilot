import { Pencil } from "lucide-react";
import React from "react";
import avartar from "../../assets/profilePic.png";
// import FormColumn from "@/ui/FormColumn";
// import Button from "@/ui/Button";

const CompanyInfor: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-10">
      <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
        Company Info
      </h3>
      <div className="flex gap-3 justify-start items-center">
        <div className="relative">
          <img
            src={avartar}
            alt="Company's logo"
            className="md:w-32 md:h-32 w-24 h-24 rounded-lg ring-2 ring-[#b853e7]"
          />
          <button className="absolute md:-bottom-3 md:-right-2 bottom-1 right-0 md:w-14 md:h-14 w-7 h-7 rounded-full flex items-center justify-center bg-[#a788fa] hover:bg-[#8257e6] border-2 border-[#e5e4ef] transition">
            <Pencil size={16} className="text-white" />
          </button>
        </div>

        {/* INFO SECTION */}
        <div className="ml-6 flex flex-col ">
          <span className="md:text-4xl text-2xl font-semibold text-black dark:text-white leading-tight">
            Livestock Feeds Plc
          </span>
          <span className="md:text-3xl text-xl text-gray-300 leading-tight">
            livestock@gmail.com
          </span>
          <span className="md:text-2xl text-lg text-gray-400 mt-1 leading-tight">
            Joined on
          </span>
        </div>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">
            Company's name
          </p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            Update your pasword for better security.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">
            Official Email
          </p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            livestock@gmail.com
          </p>
        </div>

        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">
            Phone Number
          </p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            +234 904 878 2864
          </p>
        </div>

        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">Address</p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            No. 14 Henry Carr Street, Ikeja, Lagos State.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">
            VAT Number/Tax ID
          </p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            LSF123456789
          </p>
        </div>

        <div className="flex flex-col">
          <p className="md:text-[1.7rem] text-2xl leading-tight">Website</p>
          <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
            www.livestockfeedsplc.com
          </p>
        </div>

        {/* <div className="w-full grid md:grid-cols-3 grid-cols-1 justify-center items-center gap-x-5">
          <FormColumn label="Company's name">
            <input
              type="text"
              id="companyName"
              defaultText="Livestock Feeds Plc"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
              // {...register("client_name", {
              //   required: "can't be empty",
              // })}
            />
          </FormColumn>

          <FormColumn label="Email">
            <input
              type="text"
              id="client_name"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
              // {...register("client_name", {
              //   required: "can't be empty",
              // })}
            />
          </FormColumn>

          <FormColumn label="VAT Number">
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
        </div> */}
      </div>
    </div>
  );
};

export default CompanyInfor;
