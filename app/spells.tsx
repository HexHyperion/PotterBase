import FetchingList from "@/components/FetchingList"
import { View, Text } from "react-native"

export default function Spells() {
  return (
    <>
      <FetchingList path={"spells"}></FetchingList>
    </>
  )
}