import { useLogout } from "./useLogout";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { logout, isPoading } = useLogout();

  return (
    <button disabled={isPoading} onClick={logout} className="pointer-cursor">
      <LogOut />

      {/* {!isLoading ? <HiArrowRightEndOnRectangle /> : <SpinnerMini />} */}
    </button>
  );
};

export default Logout;
