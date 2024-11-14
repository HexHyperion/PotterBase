import FetchingList from "@/components/FetchingList"
import { View, Text } from "react-native"

export default function Characters() {
  return (
    <>
      <FetchingList path={"characters"}></FetchingList>
    </>
  )
}