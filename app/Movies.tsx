import FetchingList from "@/components/FetchingList/FetchingList"
import NestedNavigator from "@/app/details/NestedNavigator"
import { View, Text } from "react-native"

export default function Movies() {
  return (
    <NestedNavigator category="Movies"/>
  )
}