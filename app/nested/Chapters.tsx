import detailStyles from "@/components/Details/DetailStyles"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"
import { Chapter, FetchedData } from "@/constants/Types"
import { useContext, useEffect, useState } from "react"
import { ScrollView, View, Text } from "react-native"
import ChapterCard from "@/components/Chapters/ChapterCard"
import fetchStyles from "@/components/FetchingList/FetchStyles"

const endpoint = "https://api.potterdb.com/v1/"


// Chapter explorer for a given book ID
export default function Chapters({navigation, route}: {navigation: any, route: any}) {
  const book = route.params.book

  const [loading, setLoading] = useState(true)
  const [chapters, setChapters] = useState<FetchedData>({} as FetchedData)

  const theme = useContext(ThemeContext).theme
  const darkBackground = themes[theme].darkBackground
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const lighterBackground = themes[theme].lighterBackground


  // The exact same fetchData from the FetchingList, but without the no data fallback
  // Unless a new book is written, there's no risk of undefined
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
    <>
      {loading && (
        // Waiting for the fetching to end
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: darkBackground}}>
          <Text style={fetchStyles.text}>Loading...</Text>
        </View>
      )}

      {!loading && (
        <ScrollView style={detailStyles.wrapper}>
          <View style={[detailStyles.cardWrapper, {gap: 10}]}>

            {/* Add all chapters one by one */}
            {chapters.data.map((chapter, index) => (
              <ChapterCard
                key={index}
                chapter={chapter as Chapter}
              />
            ))}

          </View>
        </ScrollView>
      )}
    </>
  )
}
