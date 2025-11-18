import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  LayoutDashboard,
  Settings,
  SquaresExclude,
  Users,
  X,
} from "lucide-react";
import Button from "./Button";
import { useUser } from "@/features/authentication/useUser";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { user } = useUser();

  const avatarUrl = user?.user_metadata?.avatar;
  const userGoogleAvatar = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.fullName;
  const userGoogleName = user?.user_metadata?.full_name;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setMenuIsOpen(true);
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [setMenuIsOpen]
  );

  return (
    <div className="w-screen h-screen bg-primary-bg dark:bg-[#141625] flex lg:flex-row justify-start items-start ">
      <div className="hidden lg:flex lg:w-[18%] w-full bg-[#252945] lg:h-full md:h-[7%] h-[7.5%] z-[1000]">
        <SideBar />
      </div>

      {menuIsOpen && (
        <div className="fixed top-0 left-0 h-[100dvh] lg:hidden flex w-full backdrop-blur-sm bg-[#ffffff00] z-[1000]">
          <motion.div
            ref={ref}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.1, ease: "easeIn" }}
            className="md:w-[50%] w-[80%] bg-[#252945]"
          >
            <div className="flex flex-col items-center justify-between w-full h-full">
              <div className="flex flex-col items-start justify-start w-full gap-5 p-6">
                <NavLink to="/dashboard">
                  <div className="flex items-center w-full h-full gap-5 p-5">
                    <img
                      src={logo}
                      alt="logo"
                      className="md:w-[10%] w-[14%] lg:h-auto"
                    />
                    <p className="text-5xl font-medium text-white">PayPilot</p>
                  </div>
                </NavLink>

                <div className="flex flex-col w-full gap-6 p-5 mt-5 text-white">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 text-3xl text-white ${
                        isActive ? "bg-white/10 rounded-md" : ""
                      }`
                    }
                  >
                    <LayoutDashboard size={25} /> Dashboard
                  </NavLink>
                  <NavLink
                    to="/invoices"
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 text-3xl text-white ${
                        isActive ? "bg-white/10 rounded-md" : ""
                      }`
                    }
                  >
                    <SquaresExclude size={25} /> Invoices
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 text-3xl text-white ${
                        isActive ? "bg-white/10 rounded-md" : ""
                      }`
                    }
                  >
                    <Users size={25} /> Clients
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 text-3xl text-white ${
                        isActive ? "bg-white/10 rounded-md" : ""
                      }`
                    }
                  >
                    <Settings size={25} /> Settings
                  </NavLink>
                </div>
              </div>

              <div className="flex items-center justify-end w-full lg:flex-col">
                <div className="w-full z-[30] h-full flex justify-start items-center  gap-4 lg:p-10 p-10 border-t-2 border-gray-500">
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
                    <p className="text-xl leading-tight text-gray-200">
                      {user?.email}
                    </p>
                    <p className="text-3xl font-semibold leading-tight text-white">
                      {userGoogleName ? userGoogleName : fullName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMenuIsOpen(false)}
            className="fixed font-extrabold bg-transparent top-5 right-5"
          >
            <X />
          </Button>
        </div>
      )}
      <main className="relative lg:w-[85%] w-full h-full overflow-y-scroll">
        <Header setMenuIsOpen={setMenuIsOpen} />
        <div className="max-w-[130rem] mx-auto my-0 md:px-10 px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
