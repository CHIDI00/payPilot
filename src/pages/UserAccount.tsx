import { useMoveBack } from "@/hooks/useMoveBack";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Profile from "@/features/acount/Profile";
import AccountSetting from "@/features/acount/AccountSetting";
import { useUpdateUser } from "@/features/authentication/useUpdateUserProfile";
import { useUser } from "@/features/authentication/useUser";

const UserAccount: React.FC = () => {
  const moveBack = useMoveBack();

  const { user } = useUser();
  console.log(user);

  const userFullName = user?.user_metadata?.fullName ?? "No name";
  const email = user?.email ?? "No email";
  const avatarUrl = user?.user_metadata?.avatar;
  const userGoogleAvatar = user?.user_metadata?.avatar_url;
  console.log(userGoogleAvatar);
  const dateJoined = user?.created_at;

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(userFullName);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative w-full md:py-20 py-3 lg:px-0 px-6"
    >
      <div className="w-full mb-10 flex justify-between items-center">
        <h2 className="text-[2.5rem] font-medium">Account</h2>
        <button
          className="flex justify-between items-center md:gap-7 gap-2 md:text-[1.7rem] text-[1.5rem]"
          onClick={moveBack}
        >
          <span>
            <ChevronLeft size={18} />
          </span>
          Go back
        </button>
      </div>

      <div className="flex w-full flex-col md:gap-10 gap-6">
        <Profile
          email={email}
          userName={fullName}
          avatar={avatar}
          setAvatar={setAvatar}
          isUpdating={isUpdating}
          dateJoined={dateJoined}
          handleSubmit={handleSubmit}
          avatarUrl={avatarUrl}
          userGoogleAvatar={userGoogleAvatar}
        />
        <AccountSetting />
      </div>
    </motion.div>
  );
};

export default UserAccount;
