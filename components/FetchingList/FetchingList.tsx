import { FlatList, Text, StyleSheet, Button, View, TouchableHighlight, TouchableOpacity, Image, TextInput } from "react-native"
import { useContext, useEffect, useState } from "react"
import { Character, FetchedData, Link, NestedNavigationParams, PotterObject } from "@/constants/Types"
import { createStackNavigator } from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"
import { Theme } from "@/constants/Types"
import { themes } from "@/constants/Themes"
import { extractColors, getImage } from "@/components/Details/DetailFunctions"
import DetailList from "@/components/Details/DetailList"
import Space from "@/components/Space"
import { ThemeContext } from "@/components/ThemeContext"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
import { LinearGradient } from "react-native-linear-gradient"
import fetchStyles from "./FetchStyles"
import FetchingCard from "./FetchingCard"
import images from "@/constants/Images"

const endpoint = "https://api.potterdb.com/v1/"
const Stack = createStackNavigator()
let currentQuery: string = ""

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
        console.log("fetchData failed")
        console.error(err)
      }
      finally {
        setLoading(false)
      }
    }

    useEffect(() => {fetchData(endpoint + path)}, [])


    // TEMPORARY
    // if (data.data && data.data.length < 1) return (
    //   <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //     <Text style={{color: "white", textAlign: "center"}}>The request didn't return anything. Click the button below to refresh.</Text>
    //     <Button title="Refresh" onPress={() => fetchData(endpoint+path)}/>
    //   </View>
    // )


    // Returns every item (card) of the FetchingList one by one
    const renderItem = ({item}: {item: PotterObject}) => {

      // Called on card press, navigates to each element's detail page
      const handlePress = () => {
        navigation.navigate("Details", { object: item })
      }

      return (
        <TouchableOpacity activeOpacity={0.85} style={fetchStyles.button} onPress={handlePress}>
          <FetchingCard item={item}/>
        </TouchableOpacity>
      )
    }

    // Changes the FetchingList data source to the first, last, previous or next page
    // If the link is nonexistent passes an empty string, causing fetchData() to return without sending a new request
    const handlePage = (link: Link) => {
      if (data.links[link]) {
        fetchData(data.links[link] ?? "")
      }
    }

    // Changes the FetchingList data source to a page with an exact number
    // Won't fetch new data if an invalid value was passed
    // Both functions cause a new request to the API
    const handleExactPage = ({nativeEvent: {text}}: {nativeEvent: {text: any}}) => {
      if ((data.meta.pagination.first ?? 1) < text && text < (data.meta.pagination.last ?? data.meta.pagination.current)) {
        fetchData(data.links.self.split("?page")[0] + `?page[number]=${text}`)
      }
      else {
        return
      }
    }

    const handleSearch = ({nativeEvent: {text}}: {nativeEvent: {text: string}}) => {
      try {
        currentQuery = text
        fetchData(endpoint + path + `?filter[name_cont]=${text.replaceAll(" ", "")}`)
      }
      catch (err) {
        console.log(err)
      }
      finally {
        return
      }
    }

    const handleReset = () => {
      fetchData(endpoint + path + `?page[number]=${data.meta.pagination.current}`)
      currentQuery = ""
    }

    // Navigation between pages - first, previous, exact, next and last
    // TODO disable inactive buttons
    const FetchingNavigation = () => {
      if ((data.meta.pagination.last && data.meta.pagination.last > 1) || data.meta.pagination.current > 1) return (
        <View style={fetchStyles.nav}>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("first")}><Text style={fetchStyles.text}>&lt;&lt;</Text></TouchableHighlight>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("prev")}><Text style={fetchStyles.text}>&lt;</Text></TouchableHighlight>
        <TextInput defaultValue="" textAlign="center" onSubmitEditing={handleExactPage} style={fetchStyles.navPage} placeholderTextColor="white" placeholder={((data.meta as any).pagination.current as Double).toString()}></TextInput>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("next")}><Text style={fetchStyles.text}>&gt;</Text></TouchableHighlight>
        <TouchableHighlight style={fetchStyles.navButton} onPress={() => handlePage("last")}><Text style={fetchStyles.text}>&gt;&gt;</Text></TouchableHighlight>
      </View>
      )
      else return null
    }

    return (
      <>
        {loading && <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text style={{color: "white"}}>Loading...</Text></View>}
        {!loading && (data.data && data.data.length > 0 ? (
          <>
            <View style={fetchStyles.inputWrapper}>
              <View style={fetchStyles.inputGroup}>
                <TextInput defaultValue={currentQuery} onSubmitEditing={handleSearch} placeholderTextColor="white" placeholder={`Search for ${data.data[0].type}s`} style={fetchStyles.input}></TextInput>
                <TouchableOpacity activeOpacity={0.85} disabled={currentQuery == ""} style={fetchStyles.inputGroupButton} onPress={handleReset}><Image source={currentQuery == "" ? images.disabled.buttons.bolt : images.neutral.buttons.bolt} style={{height: 25, width: 30}}/></TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.85} style={fetchStyles.inputButton} onPress={() => {}}><Image source={images.neutral.buttons.sorting} style={{height: 25, width: 25}}/></TouchableOpacity>
            </View>
            <FlatList
              style={fetchStyles.list}
              data={data.data as ArrayLike<PotterObject>}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={FetchingNavigation}
              ListFooterComponent={FetchingNavigation}
            />
          </>
        ) : (
          <>
            <View style={fetchStyles.inputWrapper}>
              <View style={fetchStyles.inputGroup}>
                <TextInput defaultValue={currentQuery} onSubmitEditing={handleSearch} placeholderTextColor="white" style={fetchStyles.input}></TextInput>
                <TouchableOpacity activeOpacity={0.85} disabled={currentQuery == ""} style={fetchStyles.inputGroupButton} onPress={handleReset}><Image source={currentQuery == "" ? images.disabled.buttons.bolt : images.neutral.buttons.bolt} style={{height: 25, width: 30}}/></TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.85} style={fetchStyles.inputButton} onPress={() => {}}><Image source={images.neutral.buttons.sorting} style={{height: 25, width: 25}}/></TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text style={fetchStyles.header}>No records found!</Text>
              <Text style={fetchStyles.text}>Check the spelling or try a different query.</Text>
            </View>
          </>
        ))}
      </>
    )
  }
  catch (err) {
    console.log(err);
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{color: "white", textAlign: "center"}}>Something went wrong during loading the list!</Text>
        <Text style={{color: "white", textAlign: "center"}}>Application returned {`${err}`}</Text>
      </View>
    )
  }
}