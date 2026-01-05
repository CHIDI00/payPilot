import React from "react";

import logo from "../assets/logo.png";
import companyAvartar from "../assets/homedark.png";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, SquaresExclude } from "lucide-react";
import { useCompanyInfo } from "@/features/acount/useCompanyInfo";

const SideBar: React.FC = () => {
  const { companyInfo } = useCompanyInfo();

  return (
    <div className="items-center justify-between hidden w-full h-full lg:flex lg:flex-col">
      <NavLink to="/invoices">
        <div className="flex gap-5 items-center lg:w-full w-[20%] h-full p-5">
          <img src={logo} alt="logo" className="h-full lg:w-[15%] lg:h-auto" />
          <p className="text-4xl font-medium text-white">PayPilot</p>
        </div>
      </NavLink>

      <div className="flex flex-col w-full gap-6 p-5 mt-5 text-white">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-5 px-4 py-3 text-2xl text-white ${
              isActive ? "bg-white/10 rounded-md" : ""
            }`
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            `flex items-center gap-5 px-4 py-3 text-2xl text-white ${
              isActive ? "bg-white/10 rounded-md" : ""
            }`
          }
        >
          <SquaresExclude size={18} /> Invoices
        </NavLink>
        {/* <NavLink
          to="/clients"
          className={({ isActive }) =>
            `flex items-center gap-5 px-4 py-3 text-2xl text-white ${
              isActive ? "bg-white/10 rounded-md" : ""
            }`
          }
        >
          <Users size={18} /> Clients
        </NavLink> */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-5 px-4 py-3 text-2xl text-white ${
              isActive ? "bg-white/10 rounded-md" : ""
            }`
          }
        >
          <Settings size={18} /> Settings
        </NavLink>
      </div>

      <div className="flex items-center justify-center w-full h-full lg:flex-col lg:justify-end">
        <NavLink
          to="/settings/company_profile"
          className="lg:w-full lg:h-auto z-[30] h-full flex justify-start items-center  gap-4 lg:px-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500"
        >
          <div className="w-16 h-16 border-2 border-purple-400 rounded-full lg:min-w-18 lg:max-h-36">
            <img
              src={companyInfo?.logo ? companyInfo?.logo : companyAvartar}
              alt="profile image"
              className="w-full h-full rounded-full cursor-pointer"
            />
          </div>
          <div className="">
            {/* <p className="text-xl leading-tight text-gray-200">
              {companyInfo?.companyEmail}
            </p> */}
            <p className="text-3xl font-semibold leading-tight text-white truncate">
              {companyInfo?.companyName}
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
