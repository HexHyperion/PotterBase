import { FlatList, Text, View, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { filters } from "@/constants/Filters"
import { FetchedData, PotterObject, Theme, Character } from "@/constants/Types"

const endpoint = "https://api.potterdb.com/v1/"

export default function FetchingList({path}: {path: string}) {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<FetchedData>({} as FetchedData)

  const fetchData = async () => {
    const response = await fetch(endpoint + path)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

  useEffect(() => {fetchData()}, [])

  const renderItem = ({item}: {item: PotterObject}) => {
    // Using JS switch-case for the first time in my life, haha
    switch (item.type){
      case "book": {
        return <Text style={listStyles.items}>{item.attributes.title}</Text>
      }
      case "chapter": {
        return <Text style={listStyles.items}>{item.attributes.title} ({item.relationships.book.data.id})</Text>
      }
      case "movie": {
        return <Text style={listStyles.items}>{item.attributes.title}</Text>
      }
      case "character": {
        return <Text style={listStyles.items}>{item.attributes.name}{item.attributes.house ? ` (${item.attributes.house})` : ""}</Text>
      }
      case "potion": {
        return <Text style={listStyles.items}>{item.attributes.name}</Text>
      }
      case "spell": {
        return <Text style={listStyles.items}>{item.attributes.name}</Text>
      }
    }
  }

  return (
    <>
      {loading && <Text style={{color: "white"}}>Loading...</Text>}
      {!loading && (
        <FlatList
          data={data.data as ArrayLike<PotterObject>}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  )
}


const listStyles = StyleSheet.create({
  items: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    marginVertical: 4,
    color: "white"
  }
})