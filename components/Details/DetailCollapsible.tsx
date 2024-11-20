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
        {/* Label text functioning as a button for the Collapsible */}
        {/* Also the arrow changes its state when collapsed */}
        <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
          <Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>{label}: <Text style={{fontFamily: "Lato-Regular"}}>{collapsed ? "▶" : "▼"}</Text></Text>
        </TouchableWithoutFeedback>

        <Collapsible collapsed={collapsed}>
          {
            // Another complicated-looking simple thing
            // Just adds all elements of the array one by one
            (object.attributes as any)[toProp(label)]?.map((item: string, index: number) => (
              <Text key={index} style={detailStyles.text}>- {item}</Text>
            ))
          }
        </Collapsible>
      </>

    // If there's only one value make it non-expandable
    ) : <><Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>{label}:</Text><Text style={detailStyles.text}>- {getData(object, label)}</Text></>

  // If there are no values display n/d
  ) : <Text style={detailStyles.text}><Text style={{fontFamily: "Grenze-Bold", fontSize: 16}}>{label}: </Text><Text style={detailStyles.disabled}>n/d</Text></Text>
}