import FetchingList from "@/components/FetchingList/FetchingList"
import NestedNavigator from "@/app/nested/NestedNavigator"
import { View, Text } from "react-native"

export default function Books() {
  return (
    <NestedNavigator category="Books"/>
  )
}