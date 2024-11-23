import { FlatList, Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import { useContext, useEffect, useState } from "react"
import { defaultQueryData, FetchedData, FilterData, HeaderPropName, Link, NestedNavigationParams, Path, PotterObject } from "@/constants/Types"
import { useRoute } from "@react-navigation/native"
import { themes } from "@/constants/Themes"
import { ThemeContext } from "@/components/ThemeContext"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
import fetchStyles from "./FetchStyles"
import FetchingCard from "./FetchingCard"
import images from "@/constants/Images"

const endpoint = "https://api.potterdb.com/v1/"

const queryKeys = ["books", "chapters", "movies", "characters", "potions", "spells"]

// A kind of a last-minute genius fix for queries and filters affecting other instances of the FetchingList
// Basically every category gets its own object containing all query parameters (page, search and filters)
// And TIL about a lot of cool Object methods that can't be used in webdev because Internet Explorer :/
const queries = Object.fromEntries(queryKeys.map(key => [key, {...defaultQueryData}]))


// The list responsible for displaying the fetched data
// aka the sweet child o' mine
export default function FetchingList({navigation}: {navigation: any}) {

  const theme = useContext(ThemeContext).theme
  const route = useRoute()
  const color = themes[theme].color
  const background = themes[theme].background
  const lightBackground = themes[theme].lightBackground
  const darkBackground = themes[theme].darkBackground

  try {
    const path = (route.params as NestedNavigationParams).path
    const keyPath = path as Path

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<FetchedData>({} as FetchedData)
    const [fallbackData, setFallbackData] = useState<FetchedData>({} as FetchedData)    // Used to find the type of items when data.data[0] undefined


    // Fetches the data from the PotterDB API (or pretty much any other REST API)
    const fetchData = async () => {
      const url = endpoint + path + queries[keyPath].queryPage + queries[keyPath].querySearch + queries[keyPath].queryFilters
      console.log(`Fetching for ${url}`)

      try {
        setLoading(true)
        const response = await fetch(url)
        const fetchedData: FetchedData = await response.json()
        setData(fetchedData)
        if (!(fetchedData.data && fetchedData.data.length > 0)) {
          const fallbackUrl = endpoint + path + "?page[size]=1"
          const fallbackResponse = await fetch(fallbackUrl)
          const fallbackData: FetchedData = await fallbackResponse.json()
          setFallbackData(fallbackData)
        }
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setLoading(false)
      }
    }


    // Resets everything on component load
    // Prevents passing the query to other tabs/categories
    // Well, turns out it doesn't, but still better to be safe
    useEffect(() => {
      queries[keyPath].currentQuery = ""
      queries[keyPath].querySearch = ""
      queries[keyPath].queryFilters = ""
      queries[keyPath].queryPage = "?page[number]=1"
      queries[keyPath].currentFilters = []
      fetchData()
    }, [])


    // Returns every item (card) of the FetchingList one by one
    const renderItem = ({item}: {item: PotterObject}) => {

      // Called on card press, navigates to each element's detail page
      const handlePress = () => {
        navigation.navigate("Details", {object: item})
      }

      return (
        <TouchableOpacity activeOpacity={0.85} style={fetchStyles.button} onPress={handlePress}>
          <FetchingCard item={item}/>
        </TouchableOpacity>
      )
    }



    // ================================ EVENT HANDLERS ==================================

    // Changes the FetchingList data source to the first, last, previous or next page
    const handlePage = (link: Link) => {
      if (data.links[link]) {
        queries[keyPath].queryPage = `?page[number]=${data.meta.pagination[link]}`
        fetchData()
      }
    }


    // Changes the FetchingList data source to a page with an exact number
    // Won't fetch new data if an invalid value was passed
    // Both functions cause a new request to the API
    const handleExactPage = ({nativeEvent: {text}}: {nativeEvent: {text: any}}) => {
      if ((data.meta.pagination.first ?? 1) < text && text < (data.meta.pagination.last ?? data.meta.pagination.current)) {
        queries[keyPath].queryPage = `?page[number]=${text}`
        fetchData()
      }
      else {
        return
      }
    }


    // Sets the search query to whatever the user writes
    // TIL about encodeURIComponent so spaces and special symbols can be entered as well
    const handleSearch = ({nativeEvent: {text}}: {nativeEvent: {text: string}}) => {
      try {
        queries[keyPath].currentQuery = text
        let searchedType: HeaderPropName
        if (data.data) {
          if (["book", "movie"].includes(data.data[0].type)) {
            searchedType = "title"
          }
          else {
            searchedType = "name"
          }

          queries[keyPath].querySearch = `&filter[${searchedType}_cont]=${encodeURIComponent(text)}`
          queries[keyPath].queryPage = `?page[number]=1`
          fetchData()
        }
      }
      catch (err) {
        console.error(err)
      }
      finally {
        return
      }
    }


    // Just resets everything
    const handleReset = () => {
      queries[keyPath].currentQuery = ""
      queries[keyPath].queryPage = "?page[number]=1"
      queries[keyPath].querySearch = ""
      queries[keyPath].queryFilters = ""
      queries[keyPath].currentFilters = []
      fetchData()
    }

    // Callback passed to the filter menu
    // Sets the filters once the user returns
    const updateFilters = (newFiltersMemory: FilterData[], newFilters: string) => {
      queries[keyPath].queryFilters = newFilters
      queries[keyPath].currentFilters = newFiltersMemory
      queries[keyPath].queryPage = "?page[number]=1"
      fetchData()
    }



    // ================================ COMPONENTS ==================================

    // Sticky searchbar and the button navigating to the filter menu
    // They have to be here or I'd need to pass the whole damn component in props
    const FetchingSearchBar = ({isDataEmpty = false}: {isDataEmpty?: boolean}) => {
      return (
        <>
          {/* Search and filter group - the highest row */}
          <View style={[fetchStyles.inputWrapper, {backgroundColor: background}]}>

            <View style={[fetchStyles.inputGroup, {backgroundColor: lightBackground}]}>
              {/* Search bar */}
              <TextInput
                style={fetchStyles.input}
                returnKeyType="search"
                defaultValue={queries[keyPath].currentQuery}
                onSubmitEditing={handleSearch}
                placeholderTextColor="#ffffff6a"
                placeholder={isDataEmpty ? "" : `Search for ${data.data[0].type}s`}   // Check if data exists, prevents reading undefined
              />

              {/* Clear all filters */}
              <TouchableOpacity
                disabled={(queries[keyPath].querySearch == "" && queries[keyPath].queryFilters == "")}   // Disable only if the query is clear
                style={fetchStyles.inputGroupButton}
                activeOpacity={0.85}
                onPress={handleReset}>
                <Image
                  style={{height: 15, width: 15}}
                  source={(queries[keyPath].querySearch == "" && queries[keyPath].queryFilters == "")    // No icon if inactive
                    ? require("@/assets/images/transparent.png")
                    : images.neutral.buttons.wands}
                />
              </TouchableOpacity>
            </View>

            {/* Filter menu */}
            <TouchableOpacity
              style={[fetchStyles.inputFilter, {backgroundColor: queries[keyPath].queryFilters != "" ? color : lightBackground}]}    // Highlighted if active, background color if not
              activeOpacity={0.75}
              onPress={() => {
                queries[keyPath].queryFilters = ""
                navigation.navigate("Filters", {data: ((data.data && data.data.length > 0) ? data : fallbackData), updateFilters: updateFilters, path: path, filters: queries[keyPath].currentFilters})
              }}>
              <Image
                style={{height: 25, width: 25}}
                source={(theme == "neutral" && !(queries[keyPath].queryFilters == ""))     // If the highlight is active and white dim the icon (otherwise it would blend)
                  ? images.disabled.buttons.sorting
                  : images.neutral.buttons.sorting}
              />
            </TouchableOpacity>

          </View>
        </>
      )
    }


    // Single navigation button, decides everything based on the mode
    const FetchingNavButton = ({mode}: {mode: "first" | "prev" | "next" | "last"}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          disabled={!(data.meta as any).pagination[["first","prev"].includes(mode) ? "first" : "last"]}
          style={[fetchStyles[["first","last"].includes(mode) ? "smallNavButton" : "navButton"], {backgroundColor: lightBackground}]}   // One-line conditionals, my beloved
          onPress={() => handlePage(mode)}>
          <Image
            style={{
              height: 30, width: 100, objectFit: "contain",
              transform: [
                {scaleX: ["first","prev"].includes(mode) ? -1 : 1}   // The same image, but can be X-inverted
              ]
            }}
            source={(data.meta as any).pagination[["first","prev"].includes(mode) ? "first" : "last"]   // Decides which end of the range it should check
              ? images.neutral.buttons[["first","last"].includes(mode) ? "car" : "broom"]               // Checks which image to display and if the end has been reached
              : images.disabled.buttons[["first","last"].includes(mode) ? "car" : "broom"]}             // And dims the image if it is the end
          />
        </TouchableOpacity>
      )
    }


    // Navigation between pages - first, previous, exact, next and last
    const FetchingNavBar = () => {
      if ((data.meta.pagination.last && data.meta.pagination.last > 1) || data.meta.pagination.current > 1) {
        return (
          <View style={fetchStyles.nav}>

            <FetchingNavButton mode="first"/>
            <FetchingNavButton mode="prev"/>

            {/* Exact page number */}
            <TextInput
              keyboardType="numeric"
              defaultValue=""
              textAlign="center"
              onSubmitEditing={handleExactPage}
              placeholderTextColor="white"
              style={[fetchStyles.navPage, {backgroundColor: lightBackground, fontFamily: "Grenze-Regular"}]}
              placeholder={((data.meta as any).pagination.current as Double).toString()}
            />

            <FetchingNavButton mode="next"/>
            <FetchingNavButton mode="last"/>

          </View>
        )
      }
      else return null
    }



    // Finally, the return of the whole component
    // Just so it doesn't blend with other returns
    return (
      <>
        {loading && (
          // Waiting for the fetching to end
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: darkBackground}}>
            <Text style={fetchStyles.text}>Loading...</Text>
          </View>
        )}

        {!loading && (
          // Showing search results
          <>
            <FetchingSearchBar isDataEmpty={!(data.data && data.data.length > 0)}/>

            {(data.data && data.data.length > 0) ? (
              // All data fetched from the current request
              <FlatList
                style={{backgroundColor: background}}
                data={data.data as ArrayLike<PotterObject>}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={FetchingNavBar}
                ListFooterComponent={FetchingNavBar}
              />
            ) : (
              // If there's no data returned display this
              <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={fetchStyles.header}>No records found!</Text>
                <Text style={fetchStyles.text}>Check the spelling or try a different query.</Text>
              </View>
            )}
          </>
        )}
      </>
    )
  }
  catch (err) {
    console.error(err)
    return (
      // And a failsafe so it doesn't kill itself
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={[fetchStyles.text, {textAlign: "center"}]}>Something went wrong during loading the list!</Text>
        <Text style={[fetchStyles.text, {textAlign: "center"}]}>Application returned {`${err}`}</Text>
      </View>
    )
  }
}