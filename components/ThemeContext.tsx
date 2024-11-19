import { createContext, useContext } from "react";
import { Theme } from "@/constants/Types";

export const ThemeContext = createContext({
  theme: "neutral" as Theme,
  setTheme: (theme: Theme) => {}
});