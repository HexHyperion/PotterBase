import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useState } from "react";
import { Text, Image, StatusBar, ColorValue } from "react-native";
import Home from "./Home";
import Books from "./Books";
import Movies from "./Movies";
import Characters from "./Characters";
import Potions from "./Potions";
import Spells from "./Spells";
import { SelectNavImage } from "@/components/SelectImage";
import { ThemeContext } from "@/components/ThemeContext";
import { themes } from "@/constants/Themes";
import { Theme } from "@/constants/Types";
import SystemNavigationBar from "react-native-system-navigation-bar"

const Tab = createBottomTabNavigator();

const navColor = async (color: string) => {
  const result = await SystemNavigationBar.setNavigationColor(color, "light")
}

export default function RootStack() {

  const [theme, setTheme] = useState<Theme>("neutral");  // CHANGE IT LATER TO USE ASYNCMEMORY!!!
  const value = {theme, setTheme}
  const accentColor = themes[theme].color
  const background = themes[theme].background
  const darkBackground = themes[theme].darkBackground
  const accent = themes[theme].accent

  navColor(background)

  StatusBar.setBarStyle('light-content')
  StatusBar.setBackgroundColor(background)

  return (
    // I'M LITERALLY CRYING RN
    // For three f-ing hours I searched why this stupid theme context doesn't work
    // And guess what - BECAUSE IT WAS IN INDEX AND NOT HERE, AND FOR SOME REASON EVEN LOGS DON'T WORK IN INDEX :(((
    <ThemeContext.Provider value={value}>
      <Tab.Navigator sceneContainerStyle={{backgroundColor: darkBackground}} screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: background,
          borderColor: "transparent",
          height: 70,
          paddingTop: 12,
          paddingBottom: 8
        }
      }}>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Home"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.2
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "home")}/>
          }
        }}/>
        <Tab.Screen name="Books" component={Books} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Books"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.1
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "books")}/>
          }
        }}/>
        <Tab.Screen name="Movies" component={Movies} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Movies"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.1
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "movies")}/>
          }
        }}/>
        <Tab.Screen name="Characters" component={Characters} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Characters"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.1
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "characters")}/>
          }
        }}/>
        <Tab.Screen name="Potions" component={Potions} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Potions"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.1
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "potions")}/>
          }
        }}/>
        <Tab.Screen name="Spells" component={Spells} options={{
          tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Spells"),
          tabBarIcon: ({size, focused}) => {
            size *= 1.1
            return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme, "spells")}/>
          }
        }}/>
      </Tab.Navigator>
    </ThemeContext.Provider>
  )
}

function SetNavLabelStyle(focused: boolean, targetColor: string, text: string) {
  if (focused) {
    return (
      <Text style={{color: targetColor, fontSize: 13, fontFamily: "Grenze-SemiBold"}}>{text}</Text>
    )
  }
  else {
    return (
      <Text style={{color: (themes["disabled"].color as ColorValue), fontSize: 13, fontFamily: "Grenze-SemiBold"}}>{text}</Text>
    )
  }
}