import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useState } from "react";
import { Text, View, Button, Image, StyleSheet, StatusBar, StyleProp, TextStyle, ColorValue } from "react-native";
import Home from "./Home";
import Books from "./Books";
import Movies from "./Movies";
import Characters from "./Characters";
import Potions from "./Potions";
import Spells from "./Spells";
import { SelectNavImage } from "@/components/SelectImage";
import { ThemeContext } from "@/components/ThemeContext";
import themes from "@/constants/Themes";
import ThemeSelector from "@/components/ThemeSelector";
import { Theme } from "@/constants/Types";
// import { UseNetInfo } from "@react-native-community/netinfo"

const Tab = createBottomTabNavigator();

StatusBar.setBarStyle('light-content')
StatusBar.setBackgroundColor("black")

function RootStack() {
  const theme = useContext(ThemeContext).theme;
  const accentColor = themes[theme as Theme].color;

  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: "black"}} screenOptions={{
      headerStyle: {backgroundColor: "black"},  // for debugging
      headerTintColor: accentColor == "white" || accentColor == "#ffd90d" ? "black" : "white",
      tabBarStyle: {backgroundColor: "black", borderColor: "#2a2a2a", height: 60, paddingTop: 6, paddingBottom: 6}
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Home"),
        tabBarIcon: ({size, focused}) => {
          size *= 1.1
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "home")}/>
        }
      }}/>
      <Tab.Screen name="Books" component={Books} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Books"),
        tabBarIcon: ({size, focused}) => {
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "books")}/>
        }
      }}/>
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Movies"),
        tabBarIcon: ({size, focused}) => {
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "movies")}/>
        }
      }}/>
      <Tab.Screen name="Characters" component={Characters} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Characters"),
        tabBarIcon: ({size, focused}) => {
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "characters")}/>
        }
      }}/>
      <Tab.Screen name="Potions" component={Potions} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Potions"),
        tabBarIcon: ({size, focused}) => {
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "potions")}/>
        }
      }}/>
      <Tab.Screen name="Spells" component={Spells} options={{
        tabBarLabel: ({focused}) => SetNavLabelStyle(focused, accentColor, "Spells"),
        tabBarIcon: ({size, focused}) => {
          return <Image style={{width: size, height: size}} source={SelectNavImage(focused, theme as Theme, "spells")}/>
        }
      }}/>
    </Tab.Navigator>
  )
}

export default function Index() {
  const [theme, setTheme] = useState("gryffindor" as Theme);  // CHANGE IT LATER TO USE ASYNCMEMORY!!!
  const value = {theme, setTheme};
  return (
    <ThemeContext.Provider value={value}>
      <RootStack/>
      {/* <ThemeSelector/> */}
    </ThemeContext.Provider>
  );
}

function SetNavLabelStyle(focused: boolean, targetColor: string, text: string) {
  if (focused) {
    return (
      <Text style={{color: targetColor, fontSize: 10}}>{text}</Text>
    )
  }
  else {
    return (
      <Text style={{color: (themes["disabled"].color as ColorValue), fontSize: 10}}>{text}</Text>
    )
  }
}