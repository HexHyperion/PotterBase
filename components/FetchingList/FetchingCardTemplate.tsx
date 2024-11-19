import { View, Text, Image } from "react-native";
import { fieldNames, PotterObject } from "@/constants/Types";
import fetchStyles from "./FetchStyles";
import { getImage } from "@/components/Details/DetailFunctions";
import DetailList from "@/components/Details/DetailList";
import Space from "../Space";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { themes } from "@/constants/Themes";

export default function FetchingCardTemplate({item, labels, optionalField, optionalLast = false}: {item: PotterObject, labels: string[], optionalField?: string, optionalLast?: boolean}) {
  const theme = useContext(ThemeContext).theme
  const lightBackground = themes[theme].lightBackground

  return (
    <View style={[fetchStyles.card, {backgroundColor: lightBackground}]}>
      <View style={[(fetchStyles as any)[`${item.type}ImageView`] ?? {}, fetchStyles.imageView]}>
        <Image style={[(fetchStyles as any)[`${item.type}Image`] ?? {}, fetchStyles.image]} source={getImage(item, fieldNames.image[item.type])}/>
      </View>
      <View style={fetchStyles.cardInside}>
        <Text style={fetchStyles.header}>{(item.attributes as any)[fieldNames.header[item.type]]}</Text>
        {optionalField && (
          <>
            <Space/>
            <Text style={fetchStyles.text}>
              <Text style={{fontFamily: "Grenze-Bold", fontSize: 16}}>{optionalField}: </Text>
              {(item.attributes as any)[`${optionalField.toLowerCase()}s`][optionalLast ? (item.attributes as any)[`${optionalField.toLowerCase()}s`].length-1 : 0] ?? <Text style={fetchStyles.disabled}>n/d</Text>}
            </Text>
          </>
        )}
        <DetailList object={item} labels={labels} collapsibles={[]}/>
      </View>
    </View>
  )
}