import React from "react";
import SideBar from "./SideBar";
import toast from 'react-hot-toast';


import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  const notify = () => toast('Here is your toast.');

  return (
    <div className="w-screen h-screen bg-primary-bg flex lg:flex-row flex-col justify-start items-start ">
      <div className="lg:w-[5.5%] w-full bg-[#252945] lg:h-full md:h-[7%] h-[7.5%] lg:rounded-tr-[2.5rem] lg:rounded-br-[2.5rem] z-[1000]">
        <SideBar />
      </div>
      <main className="relative w-full h-full overflow-y-scroll">
        <div className="max-w-[85rem] mx-auto my-0 ">
          <Outlet />
        </div>
        <button onClick={notify}>click me</button>
      </main>
    </div>
  );
};

export default AppLayout;
