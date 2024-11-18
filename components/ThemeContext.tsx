import { createContext, useContext } from "react";
import { Theme } from "@/constants/Types";
import { themes } from "@/constants/Themes";
import SystemNavigationBar from "react-native-system-navigation-bar";

export const ThemeContext = createContext({
  theme: "neutral" as Theme,
  setTheme: (theme: Theme) => {}
});