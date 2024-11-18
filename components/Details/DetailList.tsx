import { View } from "react-native";
import { PotterObject } from "@/constants/Types";
import Space from "@/components/Space";
import DetailCollapsible from "./DetailCollapsible";
import DetailLabel from "./DetailLabel";

// Block of DetailLabels and DetailCollapsibles with values passed by user in according arrays
// DetailLabels always come first
// DetailCollapsibles have Spaces by default and can't be spaced further
// Empty string inside the labels array creates a Space
export default function DetailList({object, labels, collapsibles}: {object: PotterObject, labels: string[], collapsibles: string[]}) {
  return (
    <View>
      {(labels.map((label: string, index: number) => (label != "" ? <DetailLabel key={index} object={object} label={label}/> : <Space key={index}/>)))}
      {(collapsibles.map((label: string, index: number) => (<View key={index}><Space/><DetailCollapsible object={object} label={label}/></View>)))}
    </View>
  )
}