import React from "react";
import { Pencil } from "lucide-react";
import avartar from "../../assets/profilePic.png";

// interface UserProfileProps {
//   name: string;
//   email: string;
//   joined: string;
//   avatarUrl?: string;
//   onEditAvatar?: () => void;
// }

const Profile: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-6">
      <h3 className="text-[1.5rem] font-medium">Profile</h3>

      <div className="flex gap-3 justify-start items-center">
        {/* Avatar with edit button */}
        <div className="relative">
          <img
            src={avartar}
            alt=""
            className="md:w-32 md:h-32 w-20 h-20 rounded-full ring-4 ring-[#e5e4ef]"
          />
          <button className="absolute md:-bottom-3 md:-right-2 bottom-1 right-0 md:w-14 md:h-14 w-7 h-7 rounded-full flex items-center justify-center bg-[#a788fa] hover:bg-[#8257e6] border-2 border-[#e5e4ef] transition">
            <Pencil size={16} className="text-white" />
          </button>
        </div>

        {/* Info section */}
        <div className="ml-6 flex flex-col gap-1">
          <span className="md:text-4xl text-2xl font-semibold text-white">
            Chidi Moses
          </span>
          <span className="md:text-3xl text-xl text-gray-300">
            chidi@gmail.com
          </span>
          <span className="md:text-2xl text-lg text-gray-400 mt-1">
            Joined on{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
