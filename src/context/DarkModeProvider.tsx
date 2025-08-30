import React, { useEffect, type PropsWithChildren } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { DarkModeContext } from "./DarkModeContext";

export const DarkModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    prefersDark,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
