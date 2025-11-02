import { Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";
import avartar from "../../assets/homedark.png";
import { useCompanyInfo } from "./useCompanyInfo";
import { useAddCompany } from "./useAddCompany";
import { useEditCompany } from "./useEditCompany";
import { useForm } from "react-hook-form";

import type { CompanyInfo } from "@/utils/types";
import FormColumn from "@/ui/FormColumn";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import { motion, AnimatePresence } from "framer-motion";

import supabase from "../../services/supabase";

interface CompanyInfoProp {
  companyInfo: CompanyInfo;
}

interface CompanyInfoData {
  user_id: string;
  company_id: string;
  companyName: string;
  companyEmail: string;
  companyLine: number;
  companyStreet: string;
  companyCity: string;
  companyState: string;
  companyCountry: string;
  companyTaxId: string;
  companyWebsite: string;
}

const CompanyInfor: React.FC<CompanyInfoProp> = () => {
  const { companyInfo, isPending } = useCompanyInfo();
  const [showForm, setShowForm] = useState(false);
  const { addUserCompany, isAdding } = useAddCompany();
  const { editUserCompany, isEditing } = useEditCompany();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      const { data: userResp } = await supabase.auth.getUser();
      setUserId(userResp?.user?.id ?? null);
    }
    fetchUserId();
  }, []);

  const { register, handleSubmit, reset } = useForm<CompanyInfoData>({
    defaultValues: companyInfo || undefined,
  });

  // const { error } = formState;

  function onSubmitCompany(data: CompanyInfoData) {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    // ADD COMPANY
    addUserCompany(
      { id: userId, newCompany: data },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  function onEditCompany(data: CompanyInfoData) {
    if (!companyInfo?.id) {
      console.error("Company ID is not available");
      return;
    }
    // EDIT COMPANY
    editUserCompany(
      { id: companyInfo.id, newCompanyData: data },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  if (isPending) return <Loader />;
  if (!companyInfo)
    return (
      <>
        <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-10">
          <div className="w-full flex justify-between items-center">
            <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
              Company Info
            </h3>
            <Button onClick={() => setShowForm(true)}>Add details</Button>{" "}
          </div>
          <div className="flex gap-3 justify-start items-center">
            <div className="relative">
              <img
                src={avartar}
                alt="Company's logo"
                className="md:w-32 md:h-32 w-24 h-24 rounded-lg ring-2 ring-[#b853e7]"
              />
              <button className="absolute md:-bottom-3 md:-right-2 -bottom-3 -right-4 md:w-14 md:h-14 w-12 h-12 rounded-full flex items-center justify-center bg-[#a788fa] hover:bg-[#8257e6] border-2 border-[#e5e4ef] transition">
                <Pencil size={16} className="text-white" />
              </button>
            </div>

            {/* INFO SECTION */}
            <div className="ml-6 flex flex-col ">
              <span className="md:text-4xl text-2xl font-semibold text-black dark:text-white leading-tight">
                -- --
              </span>
              <span className="md:text-3xl text-xl text-gray-300 leading-tight">
                -- --
              </span>
              <span className="md:text-2xl text-lg text-gray-400 mt-1 leading-tight">
                Joined on -- --
              </span>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">
                Company's name
              </p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                -- --
              </p>
            </div>
            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">
                Official Email
              </p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                -- --
              </p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">
                Phone Number
              </p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                -- --
              </p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">Address</p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                --, --, --, --,
              </p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">
                VAT Number/Tax ID
              </p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                -- --
              </p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-[1.7rem] text-2xl leading-tight">Website</p>
              <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
                -- --
              </p>
            </div>
          </div>
        </div>
        {/* ADD COMPANY FORM */}
        {showForm && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full flex flex-col bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl md:gap-10 gap-y-3 gap-x-5"
            >
              <div className="">
                <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
                  Add your company's detail
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmitCompany)}
                className="w-full grid md:grid-cols-2 grid-cols-1 justify-center items-center  bg-primary-gray dark:bg-[#1E2139] gap-y-6 gap-x-5"
              >
                <FormColumn label="Company's name">
                  <input
                    type="text"
                    id="companyName"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyName", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>

                <FormColumn label="Email">
                  <input
                    type="text"
                    id="companyEmail"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyEmail", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>

                <FormColumn label="VAT/Tas ID Number">
                  <input
                    type="text"
                    id="companyTaxId"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyTaxId", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="Phone Number">
                  <input
                    type="text"
                    id="companyLine"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyLine", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="Street Address">
                  <input
                    type="text"
                    id="companyStreet"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyStreet", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="City">
                  <input
                    type="text"
                    id="companyCity"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyCity", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="State">
                  <input
                    type="text"
                    id="companyState"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyState", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="Country">
                  <input
                    type="text"
                    id="companyCountry"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyCountry", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>
                <FormColumn label="Website">
                  <input
                    type="text"
                    id="companyWebsite"
                    className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                    {...register("companyWebsite", {
                      required: "can't be empty",
                    })}
                  />
                </FormColumn>

                <Button
                  type="submit"
                  disabled={isAdding}
                  className="rounded-lg "
                >
                  Update password
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
        )}
      </>
    );

  const {
    companyName,
    companyEmail,
    companyLine,
    companyCity,
    companyStreet,
    companyState,
    companyCountry,
    companyTaxId,
    companyWebsite,
  } = companyInfo;

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-10">
        <div className="w-full flex justify-between items-center">
          <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
            Company Info
          </h3>
        </div>
        <div className="flex gap-3 justify-start items-center">
          <div className="relative">
            <img
              src={avartar}
              alt="Company's logo"
              className="md:w-32 md:h-32 w-24 h-24 rounded-lg ring-2 ring-[#b853e7]"
            />
            <button className="absolute md:-bottom-3 md:-right-2 -bottom-3 -right-4 md:w-14 md:h-14 w-12 h-12 rounded-full flex items-center justify-center bg-[#a788fa] hover:bg-[#8257e6] border-2 border-[#e5e4ef] transition">
              <Pencil size={16} className="text-white" />
            </button>
          </div>

          {/* INFO SECTION */}
          <div className="ml-6 flex flex-col ">
            <span className="md:text-4xl text-2xl font-semibold text-black dark:text-white leading-tight">
              {companyName ? companyName : "-- --"}
            </span>
            <span className="md:text-3xl text-xl text-gray-300 leading-tight">
              {companyEmail ? companyEmail : "-- --"}
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
              {companyName ? companyName : "-- --"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="md:text-[1.7rem] text-2xl leading-tight">
              Official Email
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              {companyEmail ? companyEmail : "-- --"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="md:text-[1.7rem] text-2xl leading-tight">
              Phone Number
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              {companyLine ? companyLine : "-- --"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="md:text-[1.7rem] text-2xl leading-tight">Address</p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              {companyStreet}, {companyCity}, {companyState}, {companyCountry},
            </p>
          </div>

          <div className="flex flex-col">
            <p className="md:text-[1.7rem] text-2xl leading-tight">
              VAT Number/Tax ID
            </p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              {companyTaxId ? companyTaxId : "-- --"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="md:text-[1.7rem] text-2xl leading-tight">Website</p>
            <p className="md:text-[1.6rem] text-xl leading-tight text-gray-400">
              {companyWebsite ? companyWebsite : "-- --"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit COMPANY FORM */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="w-full flex flex-col bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl md:gap-10 gap-y-3 gap-x-5"
        >
          <div className="">
            <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">
              Edit your company's detail
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onEditCompany)}
            className="w-full grid md:grid-cols-2 grid-cols-1 justify-center items-center  bg-primary-gray dark:bg-[#1E2139] gap-y-6 gap-x-5"
          >
            <FormColumn label="Company's name">
              <input
                type="text"
                id="companyName"
                defaultValue={companyName}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyName", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>

            <FormColumn label="Email">
              <input
                type="text"
                id="companyEmail"
                defaultValue={companyEmail}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyEmail", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>

            <FormColumn label="VAT/Tas ID Number">
              <input
                type="text"
                id="companyTaxId"
                defaultValue={companyTaxId}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyTaxId", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="Phone Number">
              <input
                type="text"
                id="companyLine"
                defaultValue={companyLine}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyLine", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="Street Address">
              <input
                type="text"
                id="companyStreet"
                defaultValue={companyStreet}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyStreet", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="City">
              <input
                type="text"
                id="companyCity"
                defaultValue={companyCity}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyCity", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="State">
              <input
                type="text"
                id="companyState"
                defaultValue={companyState}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyState", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="Country">
              <input
                type="text"
                id="companyCountry"
                defaultValue={companyCountry}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyCountry", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>
            <FormColumn label="Website">
              <input
                type="text"
                id="companyWebsite"
                defaultValue={companyWebsite}
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md `}
                {...register("companyWebsite", {
                  required: "can't be empty",
                })}
              />
            </FormColumn>

            <Button type="submit" disabled={isEditing} className="rounded-lg ">
              {isEditing ? "Updating" : "Update Info"}
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CompanyInfor;
