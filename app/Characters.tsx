import { createStackNavigator } from "@react-navigation/stack"
import NestedNavigator from "@/app/details/NestedNavigator"

const Stack = createStackNavigator()

export default function Characters() {
  return (
    <NestedNavigator category="Characters"/>
  )
}