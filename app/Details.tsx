import { PotterObject } from "@/constants/Types";
import { useRoute } from "@react-navigation/native";
import { Button, Text } from "react-native";

export default function Details({navigation, route}: {navigation: any, route: any}) {
  const object = route.params.object as PotterObject
  navigation.setOptions({title: "zogga"})
  switch (object.type){
    case "book": {

    }
    case "chapter": {

    }
    case "movie": {

    }
    case "character": {

    }
    case "potion": {

    }
    case "spell": {

    }
  }

  return (
    <>
      <Text>Details of {object.type} with ID {object.id}</Text>
    </>
  )
}