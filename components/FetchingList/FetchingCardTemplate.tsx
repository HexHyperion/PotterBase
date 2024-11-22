import { View, Text, Image } from "react-native"
import { fieldNames, PotterObject } from "@/constants/Types"
import fetchStyles from "./FetchStyles"
import { getImage } from "@/components/Details/DetailFunctions"
import DetailList from "@/components/Details/DetailList"
import Space from "@/components/Space"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"


// The actual card visible on every category's page
// Works as a template, actual work is done by the DetailList
export default function FetchingCardTemplate({item, labels, optionalField, optionalLast = false}: {item: PotterObject, labels: string[], optionalField?: string, optionalLast?: boolean}) {
  const theme = useContext(ThemeContext).theme
  const lightBackground = themes[theme].lightBackground

  return (
    <View style={[fetchStyles.card, {backgroundColor: lightBackground}]}>

      {/* The big image on the left side of the card */}
      {/* Stylesheets have names like "bookImageView", "bookImage", hence the weird expression below */}
      <View style={[(fetchStyles as any)[`${item.type}ImageView`] ?? {}, fetchStyles.imageView]}>
        <Image style={[(fetchStyles as any)[`${item.type}Image`] ?? {}, fetchStyles.image]} source={getImage(item, fieldNames.image[item.type])}/>
      </View>

      {/* Content on the right of the picture */}
      <View style={fetchStyles.cardInside}>
        <Text style={fetchStyles.header}>{(item.attributes as any)[fieldNames.header[item.type]]}</Text>

        {/* Optional field takes the first or last element of an array and displays it as a label */}
        {optionalField && (
          <>
            <Space/>
            <Text style={fetchStyles.text}>
              <Text style={{fontFamily: "Grenze-Bold", fontSize: 16}}>{optionalField}: </Text>
              {
                (item.attributes as any)
                  [`${optionalField.toLowerCase()}s`]                                                         // Converts the name to actual prop name, e.g. Director -> directors
                  [optionalLast ? (item.attributes as any)[`${optionalField.toLowerCase()}s`].length-1 : 0]   // If optionalLast is true, index is length-1 (last), otherwise 0
                ?? <Text style={fetchStyles.disabled}>n/d</Text>
              }
            </Text>
          </>
        )}

        {/* Every normal field that's inside the card */}
        <DetailList object={item} labels={labels} collapsibles={[]}/>
      </View>
    </View>
  )
}