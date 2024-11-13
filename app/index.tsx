import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Text, View, Button, Image, StyleSheet, StatusBar } from "react-native";
import Home from "./home";
import Books from "./books";
import Movies from "./movies";
import Characters from "./characters";
import Potions from "./potions";
import Spells from "./spells";
import { selectNavImage, Theme } from "@/components/selectImage";
// import { UseNetInfo } from "@react-native-community/netinfo"

const Tab = createBottomTabNavigator();

StatusBar.setBarStyle('light-content')
StatusBar.setBackgroundColor("black")

function RootStack() {
  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: "black"}} screenOptions={{
      headerStyle: {backgroundColor: "red"},  // for debugging
      headerTitleStyle: {color: "white"},
      tabBarStyle: {backgroundColor: "black", borderColor: "black", height: 70, paddingTop: 10}
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabelStyle: {
          // TODO only when selected
          color: "#ff241c"  // gryff
          // color: "#05dc00"  // slyth
          // color: "#00b2ff"  // raven
          // color: "#ffd90d"  // huffle
        },
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          size *= 1.2
          return (
            <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "home")}/>   // TODO CHANGE WHEN SELECTED, ONLY DARK THEME FOR NOW
          )
        }
      }}/>
      <Tab.Screen name="Books" component={Books} options={{
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          return <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "books")}/>
        }
      }}/>
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          return <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "movies")}/>
        }
      }}/>
      <Tab.Screen name="Characters" component={Characters} options={{
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          return <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "characters")}/>
        }
      }}/>
      <Tab.Screen name="Potions" component={Potions} options={{
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          return <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "potions")}/>
        }
      }}/>
      <Tab.Screen name="Spells" component={Spells} options={{
        tabBarIcon: ({size, focused, color}) => {
          color = "gryffindor"
          return <Image style={{width: size, height: size}} source={selectNavImage(focused, color as Theme, "spells")}/>
        }
      }}/>
    </Tab.Navigator>
  )
}

export default function Index() {
  return (
    <>
    <RootStack/>
    </>
  );
}
