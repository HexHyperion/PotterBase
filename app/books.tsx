import FetchingList from "@/components/FetchingList"
import { View, Text } from "react-native"

export default function Books() {
  return (
    <>
      <FetchingList path={"books"}></FetchingList>
    </>
  )
}