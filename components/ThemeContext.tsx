import { createContext } from "react";
import { Theme } from "@/constants/Types";

export const ThemeContext = createContext({
    theme: "gryffindor" as Theme,
    setTheme: (theme: Theme) => {}
});