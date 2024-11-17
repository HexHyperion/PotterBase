import { Text } from "react-native"
import { detailStyles, getData } from "./DetailFunctions"
import { PotterObject } from "@/constants/Types"

export default function DetailLabel ({object, label}: {object: PotterObject, label: string}) {
  return <Text style={detailStyles.text}>{label}: {getData(object, label)}</Text>
}

