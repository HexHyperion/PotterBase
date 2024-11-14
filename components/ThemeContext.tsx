import { createContext } from "react";

export type Theme = "neutral" | "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff" | "disabled";

export const ThemeContext = createContext({
    theme: "gryffindor" as Theme,
    setTheme: (theme: Theme) => {}
});