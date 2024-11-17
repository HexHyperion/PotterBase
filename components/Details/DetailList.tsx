import { View } from "react-native";
import { PotterObject } from "@/constants/Types";
import Space from "../Space";
import DetailCollapsible from "./DetailCollapsible";
import DetailLabel from "./DetailLabel";

export default function DetailList({object, labels, collapsibles}: {object: PotterObject, labels: string[], collapsibles: string[]}) {
  return (
    <>
      {(labels.map((label: string, index: number) => (label != "" ? <DetailLabel key={index} object={object} label={label}/> : <Space key={index}/>)))}
      {(collapsibles.map((label: string, index: number) => (<View key={index}><Space/><DetailCollapsible object={object} label={label}/></View>)))}
    </>
  )
}