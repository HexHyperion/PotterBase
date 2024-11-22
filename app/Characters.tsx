import { createStackNavigator } from "@react-navigation/stack"
import NestedNavigator from "@/app/nested/NestedNavigator"

const Stack = createStackNavigator()

export default function Characters() {
  return (
    <NestedNavigator category="Characters"/>
  )
}