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
      <View style={{height: "100%", display: "flex", justifyContent: "center", alignContent: "center", gap: 10, position: "relative", top: -40, paddingHorizontal: 15}}>
        <Image source={images[theme].crest} style={{height: 275, width: "100%", objectFit: "contain"}}/>
        <Text style={{fontSize: 52, fontFamily: "HarryP", color: "white", textAlign: "center"}}>Welcome to PotterBase!</Text>
        <Text style={detailStyles.text}>Welcome to the world of Harry Potter! This small app will allow you to browse practically all data avaiable in the PotterDB API - books and their chapters, movies, characters, potions or spells - your choice! You can also search and filter the data using advanced rules to find exactly what you're looking for. Be careful though, wizard - some of this information may kill you!</Text>
      </View>
      <ThemeSelector/>
    </>
  )
}