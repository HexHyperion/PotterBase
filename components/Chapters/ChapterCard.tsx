import { filters } from "@/constants/Filters"
import { View, TextInput, Image, TouchableOpacity, Text } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import detailStyles from "@/components/Details/DetailStyles"
import { themes } from "@/constants/Themes"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { Chapter, FetchedData } from "@/constants/Types"
import images from "@/constants/Images"
import filterStyles from "@/components/Filters/FilterStyles"


export default function ChapterCard({chapter}: {chapter: Chapter}) {
  const theme = useContext(ThemeContext).theme
  const lighterBackground = themes[theme].lighterBackground
  const lightBackground = themes[theme].lightBackground
  const background = themes[theme].background

  return (
    <View style={[detailStyles.card, {backgroundColor: background}]}>
      <View style={filterStyles.filter}>
        <View style={filterStyles.inline}>
          <Text style={detailStyles.text}>{chapter.attributes.title}</Text>
          <Text style={detailStyles.text}>{chapter.attributes.summary}</Text>
        </View>
      </View>
    </View>
  )
}
