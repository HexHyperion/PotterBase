import { createStackNavigator } from "@react-navigation/stack"
import NestedNavigator from "@/components/NestedNavigator"

const Stack = createStackNavigator()

export default function Characters() {
  return (
    <NestedNavigator category="Characters"/>
  )
}