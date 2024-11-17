import { detailStyles, getData } from "./DetailFunctions"
import { toProp } from "./DetailFunctions"
import { PotterObject } from "@/constants/Types"
import { useState } from "react"
import { Text, TouchableWithoutFeedback } from "react-native"
import Collapsible from "react-native-collapsible"

export default function DetailCollapsible({object, label}: {object: PotterObject, label: string}) {
  const [collapsed, setCollapsed] = useState(true)
  return ((object.attributes as any)[toProp(label)] && (object.attributes as any)[toProp(label)].length) ? ((object.attributes as any)[toProp(label)].length != 1 ?
    (
      <>
        {/* Add some rotating arrow and things */}
        <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}><Text style={detailStyles.text}>{label}: ▼</Text></TouchableWithoutFeedback>
        <Collapsible collapsed={collapsed}>
          {
            (object.attributes as any)[toProp(label)]?.map((item: string, index: number) => (<Text key={index} style={detailStyles.text}>- {item}</Text> )) ?? <Text style={detailStyles.text}>No data</Text>
          }
        </Collapsible>
      </>
    ) : <><Text style={detailStyles.text}>{label}:</Text><Text style={detailStyles.text}>- {getData(object, label)}</Text></>
  ) : <Text style={detailStyles.text}>{label}: <Text style={detailStyles.disabled}>n/d</Text></Text>
}