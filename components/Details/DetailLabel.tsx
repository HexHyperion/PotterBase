import { Text } from "react-native"
import { getData } from "./DetailFunctions"
import { PotterObject } from "@/constants/Types"
import detailStyles from "./DetailStyles"

// One-line Text displaying a value for a given PotterObject property
// getData() provides a fallback value "n/d" in case of the field being null
export default function DetailLabel ({object, label}: {object: PotterObject, label: string}) {
  return <Text style={detailStyles.text}><Text style={{fontFamily: "Grenze-Bold", fontSize: 16}}>{label}:</Text> {getData(object, label)}</Text>
}
