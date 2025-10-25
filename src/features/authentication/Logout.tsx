import { useLogout } from "./useLogout";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { logout, isPoading } = useLogout();

  return (
    <button
      disabled={isPoading}
      onClick={logout}
      className="pointer-cursor lg:mb-4 text-white"
    >
      <LogOut />
    </button>
  );
};

export default Logout;
