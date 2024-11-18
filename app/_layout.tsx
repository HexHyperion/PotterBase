import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
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

export default function RootStack() {

  const theme = useContext(ThemeContext).theme
  const accentColor = themes[theme as Theme].color
  const background = themes[theme as Theme].background

  StatusBar.setBarStyle('light-content')
  StatusBar.setBackgroundColor(background)

  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: "black"}} screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: background,
        borderColor: "#2a2a2a",
        height: 64,
        paddingTop: 8,
        paddingBottom: 4
      }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Home"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.2
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "home")}/>
        }
      }}/>
      <Tab.Screen name="Books" component={Books} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Books"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "books")}/>
        }
      }}/>
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Movies"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "movies")}/>
        }
      }}/>
      <Tab.Screen name="Characters" component={Characters} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Characters"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "characters")}/>
        }
      }}/>
      <Tab.Screen name="Potions" component={Potions} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Potions"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "potions")}/>
        }
      }}/>
      <Tab.Screen name="Spells" component={Spells} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Spells"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "spells")}/>
        }
      }}/>
    </Tab.Navigator>
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