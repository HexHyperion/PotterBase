import { ThemeContext } from "@/components/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Home() {
  const {theme, setTheme} = useContext(ThemeContext)
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{fontSize: 52, fontFamily: "HarryP", color: "white"}}>There's no place like 127.0.0.1</Text>
      <ThemeSelector/>
    </View>
  )
}