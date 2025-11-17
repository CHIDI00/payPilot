import React from "react";

import logo from "../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  SquaresExclude,
  Users,
  // SunDim,
} from "lucide-react";
import { useUser } from "../features/authentication/useUser";

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const avatarUrl = user?.user_metadata?.avatar;
  const userGoogleAvatar = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.fullName;
  const userGoogleName = user?.user_metadata?.full_name;

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
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-5 px-4 py-3 text-2xl text-white ${
              isActive ? "bg-white/10 rounded-md" : ""
            }`
          }
        >
          <Users size={18} /> Clients
        </NavLink>
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

      <div className="flex items-center justify-end w-full h-full lg:flex-col lg:justify-end">
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
            <p className="text-xl leading-tight text-gray-200">{user?.email}</p>
            <p className="text-3xl font-semibold leading-tight text-white">
              {fullName ? fullName : userGoogleName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
