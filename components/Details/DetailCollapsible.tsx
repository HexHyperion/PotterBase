import { getData } from "./DetailFunctions"
import { toProp } from "./DetailFunctions"
import { PotterObject } from "@/constants/Types"
import { useState } from "react"
import { Text, TouchableWithoutFeedback } from "react-native"
import detailStyles from "./DetailStyles"
import Collapsible from "react-native-collapsible"


// Expandable list of every value of given property, e.g. all aliases or family members
export default function DetailCollapsible({object, label}: {object: PotterObject, label: string}) {
  const [collapsed, setCollapsed] = useState(true)
  return ((object.attributes as any)[toProp(label)] &&
    (object.attributes as any)[toProp(label)].length) ? ((object.attributes as any)[toProp(label)].length != 1 ?
    (
      <>
        {/* TODO add some rotating arrow and things */}
        <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}><Text style={detailStyles.text}>{label}: ▼</Text></TouchableWithoutFeedback>
        <Collapsible collapsed={collapsed}>
          {
            (object.attributes as any)[toProp(label)]?.map((item: string, index: number) => (<Text key={index} style={detailStyles.text}>- {item}</Text> )) ?? <Text style={detailStyles.text}>No data</Text>
          }
        </Collapsible>
      </>

    // If there's only one value make it non-expandable
    ) : <><Text style={detailStyles.text}>{label}:</Text><Text style={detailStyles.text}>- {getData(object, label)}</Text></>

  // If there are no values display n/d
  ) : <Text style={detailStyles.text}>{label}: <Text style={detailStyles.disabled}>n/d</Text></Text>
}