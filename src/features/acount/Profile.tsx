import React, { type FormEvent } from "react";
import { Camera } from "lucide-react";
import { useUpdateUser } from "../authentication/useUpdateUserProfile";
// import profilePic from "../../assets/profilePic.png";

interface UserInfo {
  email: string;
  userName: string;
  userGoogleName: string;
  avatar: File | undefined;
  isUpdating: boolean;
  setAvatar: (file: File | undefined) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  avatarUrl?: string;
  userGoogleAvatar?: string;
  dateJoined: string | number;
}

const Profile: React.FC<UserInfo> = ({
  email,
  userName,
  userGoogleName,
  setAvatar,
  isUpdating,
  handleSubmit,
  avatarUrl,
  userGoogleAvatar,
  dateJoined,
}) => {
  //    function avatar () {
  //   if (avatarUrl) {
  //     return avatarUrl
  //   }else if (!avatarUrl){
  //     return userGoogleAvatar
  // }else return profilePic;}}

  // function avatar() {
  //   if (avatarUrl) {
  //     return avatarUrl
  //   } else if (!avatarUrl) {
  //     return userGoogleAvatar
  //   } else {
  //     return pro
  //   }
  // }

  const { updateUser } = useUpdateUser();

  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary-gray dark:bg-[#1E2139] px-12 md:py-10 py-6 rounded-2xl gap-6">
      <h3 className="md:text-[2rem] text-[1.8rem] font-semibold">Profile</h3>

      <div className="flex gap-3 justify-start items-center">
        <form onSubmit={handleSubmit} className="relative">
          <img
            src={avatarUrl ? avatarUrl : userGoogleAvatar}
            alt="profile image"
            className="md:w-32 md:h-32 w-24 h-24 rounded-full ring-4 ring-[#e5e4ef]"
          />
          <button
            type="button"
            disabled={isUpdating}
            className="absolute md:-bottom-3 md:-right-2 bottom-1 right-0 md:w-14 md:h-14 w-7 h-7 rounded-full flex items-center justify-center bg-[#a788fa] hover:bg-[#8257e6] border-2 border-[#e5e4ef] transition"
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera size={16} className="text-white" />

            <input
              type="file"
              accept="image/*"
              id="avatar"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                setAvatar(file);
                updateUser({ avatar: file });
              }}
            />
          </button>
        </form>

        {/* INFO SECTION */}
        <div className="ml-6 flex flex-col ">
          <span className="md:text-4xl text-2xl font-semibold text-black dark:text-white leading-tight">
            {userName ? userName : userGoogleName}
          </span>
          <span className="md:text-3xl text-xl text-gray-300 leading-tight">
            <a href={`mailto:${email}`}>{email}</a>
          </span>
          <span className="md:text-2xl text-lg text-gray-400 mt-1 leading-tight">
            Joined on {dateJoined}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
