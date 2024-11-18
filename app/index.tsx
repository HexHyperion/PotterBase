import "react-native-gesture-handler"
import { useState } from "react";
import { ThemeContext } from "@/components/ThemeContext";
import { Theme } from "@/constants/Types";
import RootStack from "./_layout";
// import { UseNetInfo } from "@react-native-community/netinfo"

export default function Index() {
  const [theme, setTheme] = useState<Theme>("neutral");  // CHANGE IT LATER TO USE ASYNCMEMORY!!!
  const value = {theme, setTheme}

  return (
    <ThemeContext.Provider value={value}>
      <RootStack/>
    </ThemeContext.Provider>
  )
}