import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Text, View, Button, Image } from "react-native";
import Home from "./home";
import Books from "./books";
import Movies from "./movies";
import Characters from "./characters";
import Potions from "./potions";
import Spells from "./spells";
// import { UseNetInfo } from "@react-native-community/netinfo"

const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({size, focused, color}) => {
          return (
            <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/hogwarts.png")}/>   // TODO CHANGE WHEN SELECTED, ONLY DARK THEME FOR NOW
          )
        }
      }}/>
      <Tab.Screen name="Books" component={Books} options={{
        tabBarIcon: ({size, focused, color}) => {
          return <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/pen.png")}/>
        }
      }}/>
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarIcon: ({size, focused, color}) => {
          return <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/map.png")}/>
        }
      }}/>
      <Tab.Screen name="Characters" component={Characters} options={{
        tabBarIcon: ({size, focused, color}) => {
          return <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/hedwig.png")}/>
        }
      }}/>
      <Tab.Screen name="Potions" component={Potions} options={{
        tabBarIcon: ({size, focused, color}) => {
          return <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/potion.png")}/>
        }
      }}/>
      <Tab.Screen name="Spells" component={Spells} options={{
        tabBarIcon: ({size, focused, color}) => {
          return <Image style={{width: size, height: size}} source={require("@/assets/images/theme/ravenclaw/wand.png")}/>
        }
      }}/>
    </Tab.Navigator>
  )
}

export default function Index() {
  return (
    <RootStack/>
  );
}
