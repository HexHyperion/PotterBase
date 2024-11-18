import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import FetchingList from "@/components/FetchingList/FetchingList"
import Details from "@/app/Details"
import { Category } from "@/constants/Types"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import { themes } from "@/constants/Themes"

const Stack = createStackNavigator()

export default function NestedNavigator({category}: {category: Category}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FetchingList"
        component={FetchingList}
        initialParams={{path: category.toLowerCase()}}
        options={{
          headerTitle: category,
          headerTintColor: "white",
          headerStyle: {backgroundColor: "black"},
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 40},
          cardStyle: {backgroundColor: "black"},
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="Details" component={Details} options={{cardStyle: {backgroundColor: "rgba(0,0,0,0.95)"}, presentation: "transparentModal", headerStyle: {backgroundColor: "black"}, headerTintColor: "white", headerShadowVisible: false, ...TransitionPresets.RevealFromBottomAndroid}}/>
    </Stack.Navigator>
  )
}