import { createContext, useContext } from "react"
import { Theme } from "@/constants/Types"

// The context for themes, downloads information from AsyncMemory
export const ThemeContext = createContext({
  theme: "neutral" as Theme,
  setTheme: (theme: Theme) => {}
})