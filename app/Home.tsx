import { ThemeContext } from "@/components/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";
import images from "@/constants/Images";
import { themes } from "@/constants/Themes";
import { useContext } from "react";
import { Image, Text, View } from "react-native";

export default function Home() {
  const {theme, setTheme} = useContext(ThemeContext)
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10
    }}>
      <Image source={images[theme].crest} style={{height: 300, width: "100%", objectFit: "contain"}}/>
      <Text style={{fontSize: 52, fontFamily: "HarryP", color: "white"}}>Welcome to {theme.charAt(0).toUpperCase() + theme.slice(1, theme.length)}</Text>
      <ThemeSelector/>
    </View>
  )
}