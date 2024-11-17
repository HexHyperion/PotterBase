import { FlatList, Text, StyleSheet, Button, View, TouchableHighlight } from "react-native"
import { useEffect, useState } from "react"
import { Character, FetchedData, NestedNavigationParams, PotterObject } from "@/constants/Types"
import { createStackNavigator } from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"
import { Theme } from "@/constants/Types"
import themes from "@/constants/Themes"

const endpoint = "https://api.potterdb.com/v1/"
const Stack = createStackNavigator()

export default function FetchingList({navigation}: {navigation: any}) {

  const route = useRoute()
  try {
    const path = (route.params as NestedNavigationParams).path

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<FetchedData>({} as FetchedData)

    const fetchData = async () => {
      const response = await fetch(endpoint + path)
      const data = await response.json()
      setData(data)
      setLoading(false)
    }

    useEffect(() => {fetchData()}, [])

    function renderItem({item}: {item: PotterObject}) {
      const handlePress = () => {
        navigation.navigate("Details", { object: item })
      }

      const getItemText = (item: PotterObject) => {
        switch (item.type) {
          case "book": return <>{item.attributes.title}</>
          case "chapter": return <>{item.attributes.title}</>
          case "movie": return <>{item.attributes.title}</>
          case "character": return <>{item.attributes.name}  <Text style={{color: "#6a6a6a"}}>{item.attributes.house}</Text></>
          case "potion": return <>{item.attributes.name}  <Text style={{color: "#6a6a6a"}}>{item.attributes.difficulty}</Text></>
          case "spell": return <>{item.attributes.name}  <Text style={{color: "#6a6a6a"}}>{item.attributes.category}</Text></>
          default: return <>[Unknown Item]</>
        }
      }

      return (
        <TouchableHighlight style={listStyles.button} onPress={handlePress}><Text style={listStyles.text}>{getItemText(item)}</Text></TouchableHighlight>
      )
    }

    return (
      <>
        {loading && <Text style={{color: "white"}}>Loading...</Text>}
        {!loading && (
          <FlatList
            style={listStyles.list}
            data={data.data as ArrayLike<PotterObject>}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </>
    )
  }
  catch (err) {
    console.log(err);
    return <><Text style={{color: "white"}}>Something went wrong during loading the list!</Text><Text style={{color: "white"}}>Application returned {`${err}`}</Text></>
  }
}

const listStyles = StyleSheet.create({
  list: {
    backgroundColor: "black"
  },
  button: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    margin: 5,
    marginHorizontal: 10,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 16
  }
})