import { View, Text } from "react-native"
import detailStyles from "@/components/Details/DetailStyles"
import { themes } from "@/constants/Themes"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { Chapter } from "@/constants/Types"
import filterStyles from "@/components/Filters/FilterStyles"


// Card displaying one chapter's title and summary (as if they existed beyond the first book... :/ )
export default function ChapterCard({chapter}: {chapter: Chapter}) {
  const theme = useContext(ThemeContext).theme
  const lightBackground = themes[theme].lightBackground

  return (
    <View style={[detailStyles.card, {backgroundColor: lightBackground}]}>
      <View style={filterStyles.filter}>

        {/* Title with chapter number (was intended to be chronological order but they're all in order already) */}
        <Text style={[detailStyles.header]}>{chapter.attributes.order}. {chapter.attributes.title}</Text>

        {/* Well, turns out that the author(s) of the API got bored after the first book and didn't want to write summaries anymore... */}
        {/* Kinda shame I found out after I already implemented it, but whatever, wasn't that complicated anyway, but I'm leaving it here just for the Philosopher's Stone */}
        <Text style={detailStyles.text}>
          {/* Oh, and some are empty strings, and some are nulls, because why not */}
          {/* Who needs consistency in programming anyway ._. */}
          {(chapter.attributes.summary && chapter.attributes.summary != "")
            ? chapter.attributes.summary
            : <Text style={detailStyles.disabled}>(No summary provided)</Text>
          }
        </Text>
      </View>
    </View>
  )
}
