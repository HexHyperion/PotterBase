import { FlatList, Text, StyleSheet, Button, View, TouchableHighlight, Image, TextInput } from "react-native"
import { useContext, useEffect, useState } from "react"
import { Character, FetchedData, Link, NestedNavigationParams, PotterObject } from "@/constants/Types"
import { createStackNavigator } from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"
import { Theme } from "@/constants/Types"
import themes from "@/constants/Themes"
import { getImage } from "./Details/DetailFunctions"
import DetailList from "./Details/DetailList"
import Space from "./Space"
import { ThemeContext } from "./ThemeContext"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
import fetchStyles from "./FetchingList/FetchStyles"

const endpoint = "https://api.potterdb.com/v1/"
const Stack = createStackNavigator()

export default function FetchingList({navigation}: {navigation: any}) {

  const theme = useContext(ThemeContext).theme
  const route = useRoute()

  try {
    const path = (route.params as NestedNavigationParams).path

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<FetchedData>({} as FetchedData)


    // Fetches the data from the PotterDB API (or pretty much any other REST API)
    // If an empty string is passed, returns without sending any requests
    const fetchData = async (url: string) => {
      if (url.trim() == "") return
      try {
        setLoading(true)
        const response = await fetch(url)
        const fetchedData = await response.json()
        setData(fetchedData)
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setLoading(false)
      }
    }

    useEffect(() => {fetchData(endpoint + path)}, [])


    // Returns every single item (card) of the FetchingList
    // Has to be so thicc because every category has separate properties (maybe can be a lil bit smaller, we'll see)
    const renderItem = ({item}: {item: PotterObject}) => {

      // Responsible for navigating to each element's detail page
      const handlePress = () => {
        navigation.navigate("Details", { object: item })
      }


      // Returns an appropriate card with information depending on the object's type
      const getItem = (item: PotterObject) => {
        switch (item.type) {
          case "book": {
            return (
              <View style={fetchStyles.card}>
                <View style={{...fetchStyles.bookImageView, ...fetchStyles.imageView}}><Image style={{...fetchStyles.bookImage, ...fetchStyles.image}} source={getImage(item, "cover")}/></View>
                <View style={fetchStyles.cardInside}>
                  <Text style={fetchStyles.header}>{item.attributes.title}</Text>
                  <DetailList object={item} labels={["", "Author", "", "Release date", "", "Pages"]} collapsibles={[]}/>
                </View>
              </View>
            )
          }
          case "chapter": {
            return (
                <View>{item.attributes.title}</View>
              )
          }
          case "movie": {
            return (
              <View style={fetchStyles.card}>
                <View style={{...fetchStyles.movieImageView, ...fetchStyles.imageView}}><Image style={{...fetchStyles.movieImage, ...fetchStyles.image}} source={getImage(item, "poster")}/></View>
                <View style={fetchStyles.cardInside}>
                  <Text style={fetchStyles.header}>{item.attributes.title}</Text>
                  <Space/>
                  <Text style={fetchStyles.text}>Director: {item.attributes.directors[0] ?? <Text style={fetchStyles.disabled}>n/d</Text>}</Text>
                  <DetailList object={item} labels={["", "Release date", "", "Running time"]} collapsibles={[]}/>
                </View>
              </View>
            )
          }
          case "character": {
            return (
              <View style={fetchStyles.card}>
                <View style={{...fetchStyles.characterImageView, ...fetchStyles.imageView}}><Image style={{...fetchStyles.characterImage, ...fetchStyles.image}} source={getImage(item, "image")}/></View>
                <View style={fetchStyles.cardInside}>
                  <Text style={fetchStyles.header}>{item.attributes.name}</Text>
                  <Space/>
                  <Text style={fetchStyles.text}>Job: {item.attributes.jobs[item.attributes.jobs.length-1] ?? <Text style={fetchStyles.disabled}>n/d</Text>}</Text>
                  <DetailList object={item} labels={["", "Species", "", "House"]} collapsibles={[]}/>
                </View>
              </View>
            )
          }
          case "potion": {
            return (
              <View style={fetchStyles.card}>
                <View style={{...fetchStyles.potionImageView, ...fetchStyles.imageView}}><Image style={{...fetchStyles.potionImage, ...fetchStyles.image}} source={getImage(item, "image")}/></View>
                <View style={fetchStyles.cardInside}>
                  <Text style={fetchStyles.header}>{item.attributes.name}</Text>
                  <DetailList object={item} labels={["", "Difficulty", "", "Characteristics", "", "Effect"]} collapsibles={[]}/>
                </View>
              </View>
            )
          }
          case "spell": {
            return (
              <View style={fetchStyles.card}>
                <View style={{...fetchStyles.spellImageView, ...fetchStyles.imageView}}><Image style={{...fetchStyles.spellImage, ...fetchStyles.image}} source={getImage(item, "image")}/></View>
                <View style={fetchStyles.cardInside}>
                  <Text style={fetchStyles.header}>{item.attributes.name}</Text>
                  <DetailList object={item} labels={["", "Category", "", "Effect", "", "Light"]} collapsibles={[]}/>
                </View>
              </View>
            )
          }
          default: {
            return <Text style={fetchStyles.text}>[Unknown item!]</Text>
          }
        }
      }

      return (
        <TouchableHighlight style={fetchStyles.button} onPress={handlePress}>{getItem(item)}</TouchableHighlight>
      )
    }

    // Changes the FetchingList data source to the first, last, previous or next page
    // If the link is nonexistent passes an empty string, causing fetchData() to return without sending a new request
    const handlePage = (link: Link) => {
      if (data.links[link]) {
        fetchData(data.links[link] ?? "")
      }
    }

    // Changes the FetchingList data source to a page with exact number
    // Won't fetch new data if an invalid value was passed
    // Both functions cause a new fetch
    const handleExactPage = ({nativeEvent: {text}}: {nativeEvent: {text: any}}) => {
      if ((data.meta.pagination.first ?? 1) < text && text < (data.meta.pagination.last ?? data.meta.pagination.current)) {
        fetchData(data.links.self.split("?page")[0] + `?page[number]=${text}`)
      }
      else {
        return
      }
    }

    // Navigation between pages - first, previous, exact, next and last
    // TODO disable inactive buttons
    const FetchingNavigation = () => {
      return (
        <View style={fetchStyles.nav}>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("first")}><Text style={fetchStyles.text}>&lt;&lt;</Text></TouchableHighlight>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("prev")}><Text style={fetchStyles.text}>&lt;</Text></TouchableHighlight>
        <TextInput defaultValue="" textAlign="center" onSubmitEditing={handleExactPage} style={fetchStyles.navPage} placeholderTextColor="white" placeholder={((data.meta as any).pagination.current as Double).toString()}></TextInput>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("next")}><Text style={fetchStyles.text}>&gt;</Text></TouchableHighlight>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("last")}><Text style={fetchStyles.text}>&gt;&gt;</Text></TouchableHighlight>
      </View>
      )
    }

    return (
      <>
        {loading && <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text style={{color: "white"}}>Loading...</Text></View>}
        {!loading && (
          <>
            <TextInput placeholderTextColor="white" placeholder={`Search for ${data.data[0].type}s`} style={fetchStyles.input}></TextInput>
            <FlatList
              style={fetchStyles.list}
              data={data.data as ArrayLike<PotterObject>}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={FetchingNavigation}
              ListFooterComponent={FetchingNavigation}
            />
          </>
        )}
      </>
    )
  }
  catch (err) {
    console.log(err);
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{color: "white"}}>Something went wrong during loading the list!</Text>
        <Text style={{color: "white"}}>Application returned {`${err}`}</Text>
      </View>
    )
  }
}