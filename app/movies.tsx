import FetchingList from "@/components/FetchingList"
import { View, Text } from "react-native"

export default function Movies() {
  return (
    <>
      <FetchingList path={"movies"}></FetchingList>
    </>
  )
}