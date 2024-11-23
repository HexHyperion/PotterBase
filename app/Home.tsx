import detailStyles from "@/components/Details/DetailStyles"
import { ThemeContext } from "@/components/ThemeContext"
import ThemeSelector from "@/components/ThemeSelector"
import images from "@/constants/Images"
import { useContext } from "react"
import { Image, Text, View } from "react-native"

export default function Home() {
  const {theme, setTheme} = useContext(ThemeContext)
  return (
    <>
      <View style={{height: "100%", display: "flex", justifyContent: "center", alignContent: "center", gap: 25, position: "relative", top: -40, paddingHorizontal: 15}}>
        <Image source={images[theme].crest} style={{height: 275, width: "100%", objectFit: "contain"}}/>
        <Text style={{fontSize: 52, fontFamily: "HarryP", color: "white", textAlign: "center"}}>Welcome to PotterBase!</Text>
      </View>
      <ThemeSelector/>
    </>
  )
}