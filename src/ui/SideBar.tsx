import React from "react";

import logo from "../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
// import { useDarkMode } from "../context/useDarkMode";
import {
  LayoutDashboard,
  // Moon,
  Settings,
  SquaresExclude,
  Users,
  // SunDim,
} from "lucide-react";
import { useUser } from "../features/authentication/useUser";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  // const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { user } = useUser();

  const avatarUrl = user?.user_metadata?.avatar;
  const userGoogleAvatar = user?.user_metadata?.avatar_url;

  return (
    <div className="hidden lg:flex items-center justify-between w-full h-full lg:flex-col">
      <NavLink to="/invoices">
        <div className="flex gap-5 items-center lg:w-full w-[20%] h-full p-5">
          <img src={logo} alt="logo" className="h-full lg:w-[15%] lg:h-auto" />
          <p className="text-4xl font-medium text-white">PayPilot</p>
        </div>
      </NavLink>

      <div className="flex flex-col w-full gap-6 p-5 mt-5 text-white">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-5 px-4 py-3 text-2xl text-white"
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink
          to="/invoices"
          className="flex items-center gap-5 px-4 py-3 text-2xl text-white"
        >
          <SquaresExclude size={18} /> Invoices
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-5 px-4 py-3 text-2xl text-white"
        >
          <Users size={18} /> Clients
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-5 px-4 py-3 text-2xl text-white"
        >
          <Settings size={18} /> Settings
        </NavLink>
      </div>

      <div className="flex items-center justify-end w-full h-full lg:flex-col lg:justify-end">
        {/* <div onClick={toggleDarkMode} className="p-5 text-white cursor-pointer">
          {isDarkMode ? <SunDim size={24} /> : <Moon size={24} />}
        </div> */}

        <div className="lg:w-full lg:h-auto z-[30] h-full flex justify-start items-center  gap-4 lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <div
            onClick={() => navigate("/settings")}
            className="w-16 h-16 border-2 border-purple-400 rounded-full lg:min-w-18 lg:max-h-36"
          >
            <img
              src={avatarUrl ? avatarUrl : userGoogleAvatar}
              alt="profile image"
              className="w-full h-full rounded-full cursor-pointer"
            />
          </div>
          <div className="">
            <p className="text-xl leading-tight text-gray-200">Good morning</p>
            <p className="text-3xl font-semibold leading-tight text-white">
              Chidi M.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
