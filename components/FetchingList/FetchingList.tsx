import { FlatList, Text, View, TouchableHighlight, TouchableOpacity, Image, TextInput } from "react-native"
import { useContext, useEffect, useState } from "react"
import { Category, FetchedData, HeaderPropName, Link, NestedNavigationParams, PotterObject } from "@/constants/Types"
import { createStackNavigator } from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"
import { Theme } from "@/constants/Types"
import { themes } from "@/constants/Themes"
import { ThemeContext } from "@/components/ThemeContext"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
import fetchStyles from "./FetchStyles"
import FetchingCard from "./FetchingCard"
import images from "@/constants/Images"

const endpoint = "https://api.potterdb.com/v1/"
const Stack = createStackNavigator()
let currentQuery: string = ""
let queryPage = "?page[number]=1"
let querySearch = ""
let queryFilters = ""
let querySort = ""

export default function FetchingList({navigation}: {navigation: any}) {

  const theme = useContext(ThemeContext).theme
  const route = useRoute()
  const accent = themes[theme].accent
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const darkBackground = themes[theme].darkBackground

  try {
    const path = (route.params as NestedNavigationParams).path

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<FetchedData>({} as FetchedData)

    // Fetches the data from the PotterDB API (or pretty much any other REST API)
    // If an empty string is passed, returns without sending any requests
    const fetchData = async () => {
      let url = endpoint + path + queryPage + querySearch + queryFilters + querySort
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

    useEffect(() => {
      fetchData()
      currentQuery = ""
      querySearch = ""
      queryFilters = ""
      querySort = ""
      queryPage = "?page[number]=1"
    }, [])


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
        queryPage = `?page[number]=${data.meta.pagination[link]}`
        fetchData()
      }
    }

    // Changes the FetchingList data source to a page with an exact number
    // Won't fetch new data if an invalid value was passed
    // Both functions cause a new request to the API
    const handleExactPage = ({nativeEvent: {text}}: {nativeEvent: {text: any}}) => {
      if ((data.meta.pagination.first ?? 1) < text && text < (data.meta.pagination.last ?? data.meta.pagination.current)) {
        queryPage = `?page[number]=${text}`
        fetchData()
      }
      else {
        return
      }
    }

    const handleSearch = ({nativeEvent: {text}}: {nativeEvent: {text: string}}) => {
      try {
        currentQuery = text
        let searchedType: HeaderPropName
        if (data.data) {
          if (["book", "movie"].includes(data.data[0].type)) {
            searchedType = "title"
          }
          else {
            searchedType = "name"
          }

          querySearch = `&filter[${searchedType}_cont]=${text.replaceAll(" ","")}`
          queryPage = `?page[number]=1`
          fetchData()
        }
      }
      catch (err) {
        console.log(err)
      }
      finally {
        return
      }
    }

    const handleReset = () => {
      currentQuery = ""
      queryPage = `?page[number]=1`
      querySearch = ""
      queryFilters = ""
      querySort = ""
      fetchData()
    }

    // Navigation between pages - first, previous, exact, next and last
    // So small, yet so big...
    const FetchingNavigation = () => {
      if ((data.meta.pagination.last && data.meta.pagination.last > 1) || data.meta.pagination.current > 1) {
        return (
          <View style={fetchStyles.nav}>

            {/* First page */}
            <TouchableOpacity activeOpacity={0.75}
              disabled={!(data.meta as any).pagination.first}
              style={[fetchStyles.smallNavButton, {backgroundColor: lightBackground}]}
              onPress={() => handlePage("first")}>
              <Image
                source={(data.meta as any).pagination.first ? images.neutral.buttons.car : images.disabled.buttons.car}
                style={{height: 30, width: 100, objectFit: "contain", transform: [{scaleX: -1}]}}
              />
            </TouchableOpacity>

            {/* Previous page */}
            <TouchableOpacity activeOpacity={0.75}
              disabled={!(data.meta as any).pagination.first}
              style={[fetchStyles.navButton, {backgroundColor: lightBackground}]}
              onPress={() => handlePage("prev")}>
              <Image
                source={(data.meta as any).pagination.first ? images.neutral.buttons.broom : images.disabled.buttons.broom}
                style={{height: 30, width: 100, objectFit: "contain", transform: [{scaleX: -1}]}}
              />
            </TouchableOpacity>

            {/* Exact page number */}
            <TextInput keyboardType="numeric" defaultValue="" textAlign="center" onSubmitEditing={handleExactPage} placeholderTextColor="white"
              style={[fetchStyles.navPage, {backgroundColor: lightBackground, fontFamily: "Grenze-Regular"}]}
              placeholder={((data.meta as any).pagination.current as Double).toString()}
            />

            {/* Next page */}
            <TouchableOpacity activeOpacity={0.75}
              disabled={!(data.meta as any).pagination.last}
              style={[fetchStyles.navButton, {backgroundColor: lightBackground}]}
              onPress={() => handlePage("next")}>
              <Image
                source={(data.meta as any).pagination.last ? images.neutral.buttons.broom : images.disabled.buttons.broom}
                style={{height: 30, width: 100, objectFit: "contain"}}
              />
            </TouchableOpacity>

            {/* Last page */}
            <TouchableOpacity activeOpacity={0.75}
              disabled={!(data.meta as any).pagination.last}
              style={[fetchStyles.smallNavButton, {backgroundColor: lightBackground}]}
              onPress={() => handlePage("last")}>
              <Image
                source={(data.meta as any).pagination.last ? images.neutral.buttons.car : images.disabled.buttons.car}
                style={{height: 30, width: 100, objectFit: "contain"}}
              />
            </TouchableOpacity>
          </View>
        )
      }
      else return null
    }

    return (
      <>
        {loading && <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: darkBackground}}><Text style={{color: "white"}}>Loading...</Text></View>}
        {!loading && (data.data && data.data.length > 0 ? (
          <>
            <View style={[fetchStyles.inputWrapper, {backgroundColor: background}]}>
              <View style={[fetchStyles.inputGroup, {backgroundColor: lightBackground}]}>
                <TextInput defaultValue={currentQuery} onSubmitEditing={handleSearch} placeholderTextColor="white" placeholder={`Search for ${data.data[0].type}s`} style={fetchStyles.input} returnKeyType="search"></TextInput>
                <TouchableOpacity activeOpacity={0.85} disabled={currentQuery == ""} style={fetchStyles.inputGroupButton} onPress={handleReset}><Image source={currentQuery == "" ? images.disabled.buttons.wands : images.neutral.buttons.wands} style={{height: 15, width: 15}}/></TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.75} style={[fetchStyles.inputFilter, {backgroundColor: lightBackground}]} onPress={() => {}}><Image source={images.neutral.buttons.sorting} style={{height: 25, width: 25}}/></TouchableOpacity>
            </View>
            <FlatList
              style={{backgroundColor: background}}
              data={data.data as ArrayLike<PotterObject>}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={FetchingNavigation}
              ListFooterComponent={FetchingNavigation}
            />
          </>
        ) : (
          <>
            <View style={[fetchStyles.inputWrapper, {backgroundColor: background}]}>
              <View style={[fetchStyles.inputGroup, {backgroundColor: lightBackground}]}>
                <TextInput defaultValue={currentQuery} onSubmitEditing={handleSearch} placeholderTextColor="white" style={fetchStyles.input} returnKeyType="search"></TextInput>
                <TouchableOpacity activeOpacity={0.85} disabled={currentQuery == ""} style={fetchStyles.inputGroupButton} onPress={handleReset}><Image source={currentQuery == "" ? images.disabled.buttons.wands : images.neutral.buttons.wands} style={{height: 15, width: 15}}/></TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.75} style={[fetchStyles.inputFilter, {backgroundColor: lightBackground}]} onPress={() => {}}><Image source={images.neutral.buttons.sorting} style={{height: 25, width: 25}}/></TouchableOpacity>
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