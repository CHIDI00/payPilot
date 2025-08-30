import {
  DarkModeContext,
  type DarkModeContextType,
} from "@/context/DarkModeContext";
import { useContext } from "react";

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return context;
};
