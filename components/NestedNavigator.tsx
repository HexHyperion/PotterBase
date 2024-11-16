import { createStackNavigator } from "@react-navigation/stack"
import FetchingList from "@/components/FetchingList"
import Details from "@/app/Details"
import { Category } from "@/constants/Types"

const Stack = createStackNavigator()

export default function NestedNavigator({category}: {category: Category}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FetchingList"
        component={FetchingList}
        initialParams={{path: category.toLowerCase()}}
        options={{headerTitle: category, headerStyle: {backgroundColor: "black"}, headerTintColor: "white", headerShadowVisible: false}}
      />
      <Stack.Screen name="Details" component={Details}/>
    </Stack.Navigator>
  )
}