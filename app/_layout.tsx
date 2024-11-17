import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { Text, Image, StatusBar, ColorValue } from "react-native";
import Home from "./tabs/Home";
import Books from "./tabs/Books";
import Movies from "./tabs/Movies";
import Characters from "./tabs/Characters";
import Potions from "./tabs/Potions";
import Spells from "./tabs/Spells";
import { SelectNavImage } from "@/components/SelectImage";
import { ThemeContext } from "@/components/ThemeContext";
import themes from "@/constants/Themes";
import { Theme } from "@/constants/Types";

const Tab = createBottomTabNavigator();

StatusBar.setBarStyle('light-content')
StatusBar.setBackgroundColor("black")

export default function RootStack() {
  const theme = useContext(ThemeContext).theme;
  const accentColor = themes[theme as Theme].color;

  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: "black"}} screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "black",
        borderColor: "#2a2a2a",
        height: 60,
        paddingVertical: 6
      }
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