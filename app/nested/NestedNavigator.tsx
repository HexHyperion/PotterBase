import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import FetchingList from "@/components/FetchingList/FetchingList"
import Details from "@/app/nested/Details"
import { Category, Theme } from "@/constants/Types"
import { useContext } from "react"
import { Image } from "react-native"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"
import images from "@/constants/Images"
import Filters from "./Filters"

const Stack = createStackNavigator()


// The nested stack navigation component responsible for opening those modal-like windows inside of tabs
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
          headerStyle: {backgroundColor: background, height: 100},
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 40, marginTop: 10},
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
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 36, paddingTop: 5},
          headerBackImage: () => {
            return <Image source={images.neutral.buttons.wands} style={{height: 25, width: 25, marginLeft: 10, objectFit: "contain"}}/>   // For some reason doesn't work without the arrow expression
          },
          cardStyle: {backgroundColor: `${darkBackground}fa`},
          headerTintColor: "white",
          headerShadowVisible: false,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />

      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{
          presentation: "transparentModal",
          headerStyle: {backgroundColor: background},
          headerTitleStyle: {fontFamily: "HarryP", fontSize: 36, paddingTop: 5},
          headerBackImage: () => {return <Image source={images.neutral.buttons.wands} style={{height: 25, width: 25, marginLeft: 10, objectFit: "contain"}}/>},
          cardStyle: {backgroundColor: `${darkBackground}fa`},
          headerTintColor: "white",
          headerShadowVisible: false,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
    </Stack.Navigator>
  )
}