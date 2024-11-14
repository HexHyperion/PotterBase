import { FlatList, Text, View } from "react-native"
import { filters } from "@/constants/Filters"
import { Theme } from "@/constants/Types"
import { useEffect, useState } from "react"

const endpoint = "https://api.potterdb.com/v1/"

export default function FetchingList({path}: {path: string}) {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchData = async () => {
    const response = await fetch(endpoint + path)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

  useEffect(() => {fetchData()}, [])

  const renderItem = ({item}: {item: any}) => {
    console.log("zigga");

    return <Text style={{color: "white", marginVertical: 4}}>{item.attributes.name}{item.attributes.house ? ` (${item.attributes.house})` : ""}</Text>
  }

  return (
    <>
      {loading && <Text style={{color: "white"}}>Loading...</Text>}
      {!loading && (
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  )
}