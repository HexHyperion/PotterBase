import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import FetchingList from "@/components/FetchingList/FetchingList"
import Details from "@/app/details/Details"
import { Category, Theme } from "@/constants/Types"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"

const Stack = createStackNavigator()

export default function NestedNavigator({category}: {category: Category}) {
  const theme = useContext(ThemeContext).theme
  const background = themes[theme].background
  const darkBackground = themes[theme].darkBackground

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FetchingList"
        component={FetchingList}
        initialParams={{path: category.toLowerCase()}}
        options={{
          headerTitle: category,
          headerTintColor: "white",
          headerStyle: {backgroundColor: background},
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 40},
          cardStyle: {backgroundColor: background},
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          presentation: "transparentModal",
          headerStyle: {backgroundColor: background},
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 26},
          cardStyle: {backgroundColor: `${background}fa`},
          headerTintColor: "white",
          headerShadowVisible: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />
    </Stack.Navigator>
  )
}