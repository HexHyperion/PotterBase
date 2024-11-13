import { createContext, useContext } from "react";

let currentTheme: Theme = "gryffindor"   // for debugging

export type Theme = "neutral" | "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff" | "disabled";

export function ChangeTheme(targetTheme: Theme) {
  currentTheme = targetTheme;
}

export const ThemeContext = createContext(currentTheme);