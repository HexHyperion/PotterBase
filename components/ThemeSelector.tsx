import { useContext } from "react"
import { Text, View } from "react-native"
import { ThemeContext } from "./ThemeContext"
import { themes } from "@/constants/Themes"
import { Dropdown } from "react-native-element-dropdown"
import filterStyles from "./Filters/FilterStyles"
import { Theme } from "@/constants/Types"
import detailStyles from "./Details/DetailStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Saves the chosen theme to AsyncStorage
const storeTheme = async (theme: Theme) => {
  try {
    await AsyncStorage.setItem("theme", theme)
  }
  catch (err) {
    console.error(err)
  }
}


// The component responsible for changing the theme context
export default function ThemeSelector() {
  const {theme, setTheme} = useContext(ThemeContext)
  const lightBackground = themes[theme].lightBackground
  const lighterBackground = themes[theme].lighterBackground

  const themeOptions = [
    {label: "None / OLED", value: "neutral"},
    {label: "Hufflepuff", value: "hufflepuff"},
    {label: "Ravenclaw", value: "ravenclaw"},
    {label: "Slytherin", value: "slytherin"},
    {label: "Gryffindor", value: "gryffindor"}
  ]

  return (
    <View style={{display: "flex", flexDirection: "row", position: "absolute", bottom: 10, alignItems: "center", gap: 15, marginHorizontal: 15}}>
      <View><Text style={detailStyles.text}>What house do you belong to?</Text></View>
      <Dropdown
        style={[filterStyles.dropdown, {backgroundColor: lightBackground, flex: 1}]}
        selectedTextStyle={filterStyles.dropdownText}
        placeholder="Select theme"
        placeholderStyle={{color: "#ffffff6a", fontFamily: "Lato-Regular", fontSize: 14}}
        containerStyle={[filterStyles.dropdownList, {backgroundColor: lightBackground}]}
        dropdownPosition="top"
        itemTextStyle={{color: "white", fontFamily: "Lato-Regular", fontSize: 14}}
        activeColor={lighterBackground}
        data={themeOptions}
        labelField={"label"}
        valueField={"value"}
        value={theme}
        onChange={(item) => {setTheme(item.value as Theme); storeTheme(item.value as Theme)}}
      />
    </View>
  )
}