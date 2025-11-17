import { useDarkMode } from "@/context/useDarkMode";
import { Moon, SunDim } from "lucide-react";

const TheameToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      disabled={true}
      className="lg:w-full text-black dark:text-white flex justify-center items-center"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <SunDim size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default TheameToggle;
