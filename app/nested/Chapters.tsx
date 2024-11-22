import { getFilterableFields, toDropdownFormat } from "@/components/Filters/FilterFunctions"
import detailStyles from "@/components/Details/DetailStyles"
import filterStyles from "@/components/Filters/FilterStyles"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"
import { Chapter, FetchedData, FilterData } from "@/constants/Types"
import { useContext, useEffect, useState } from "react"
import { ScrollView, View, Button, TouchableOpacity, Text, Image } from "react-native"
import FilterCard from "@/components/Filters/FilterCard"
import images from "@/constants/Images"
import ChapterCard from "@/components/Chapters/ChapterCard"

const endpoint = "https://api.potterdb.com/v1/"


// Chapter explorer for a given book ID
export default function Chapters({navigation, route}: {navigation: any, route: any}) {
  const book = route.params.book

  const [loading, setLoading] = useState(true)
  const [chapters, setChapters] = useState<FetchedData>({} as FetchedData)

  const theme = useContext(ThemeContext).theme
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const lighterBackground = themes[theme].lighterBackground


  const fetchData = async () => {
    const url = endpoint + `/books/${book}/chapters/`
    try {
      setLoading(true)
      const response = await fetch(url)
      const fetchedData: FetchedData = await response.json()
      setChapters(fetchedData)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {fetchData()}, [])

  return (
    <ScrollView style={detailStyles.wrapper}>
      <View style={[detailStyles.cardWrapper, {gap: 10}]}>

        {/* doesn't work */}
        {chapters.data.map((chapter, index) => (
          <ChapterCard
            key={index}
            chapter={chapter as Chapter}
          />
        ))}

      </View>
    </ScrollView>
  )
}
