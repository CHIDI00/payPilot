import React from "react";
import logo from "../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { useDarkMode } from "@/context/useDarkMode";
import { Moon, SunDim } from "lucide-react";
import { useUser } from "../features/authentication/useUser";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { user } = useUser();

  const avatarUrl = user?.user_metadata?.avatar;
  const userGoogleAvatar = user?.user_metadata?.avatar_url;

  return (
    <div className="w-full h-full flex lg:flex-col justify-between items-center">
      <div className="lg:w-full w-[20%] h-full ">
        <NavLink to="/invoices">
          <img src={logo} alt="logo" className="lg:w-full lg:h-auto h-full" />
        </NavLink>
      </div>

      <div className="h-full w-full flex lg:flex-col lg:justify-end justify-end items-center">
        <div onClick={toggleDarkMode} className="p-5 text-white cursor-pointer">
          {isDarkMode ? <SunDim size={24} /> : <Moon size={24} />}
        </div>

        <div className="lg:w-full lg:h-auto z-[30] h-full flex justify-center items-center lg:p-10 p-10 lg:border-t-2 lg:border-l-0 border-l-2 border-gray-500">
          <div
            onClick={() => navigate("/settings")}
            className=" border-2 border-purple-400 rounded-full lg:min-w-full w-16 h-16 lg:max-h-14"
          >
            <img
              src={avatarUrl ? avatarUrl : userGoogleAvatar}
              alt="profile image"
              className="w-full h-full cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
