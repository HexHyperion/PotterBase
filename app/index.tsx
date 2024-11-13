import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useState } from "react";
import { Text, View, Button, Image, StyleSheet, StatusBar, StyleProp, TextStyle, ColorValue } from "react-native";
import Home from "./home";
import Books from "./books";
import Movies from "./movies";
import Characters from "./characters";
import Potions from "./potions";
import Spells from "./spells";
import { SelectNavImage } from "@/components/SelectImage";
import { ThemeContext, Theme, ChangeTheme } from "@/components/ThemeContext";
import themes from "@/components/themes";
// import { UseNetInfo } from "@react-native-community/netinfo"

const Tab = createBottomTabNavigator();

StatusBar.setBarStyle('light-content')
StatusBar.setBackgroundColor("black")

function RootStack() {
  const theme = useContext(ThemeContext);
  const accentColor = themes[theme].color;
  // NEXT UP figure out how to change the theme dynamically

  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: "black"}} screenOptions={{
      headerStyle: {backgroundColor: accentColor},  // for debugging
      headerTintColor: "white",
      tabBarStyle: {backgroundColor: "black", borderColor: "white", height: 60, paddingTop: 8}
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
  const theme = useContext(ThemeContext)
  const accentColor = themes[theme as Theme].color
  return (
    <ThemeContext.Provider value={theme}>
      <RootStack/>
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