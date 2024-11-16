import themes from "@/constants/Themes";
import { Character, PotterObject } from "@/constants/Types";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, StyleSheet, Text, Image, View } from "react-native";
import { Theme } from "@/constants/Types";

export default function Details({navigation, route}: {navigation: any, route: any}) {
  const object = route.params.object as PotterObject
  navigation.setOptions({title: "zogga"})

  const getData = (prop: string) => {
    return (object.attributes as any)[prop] ?? <Text style={{color: "#6a6a6a", fontWeight: "normal"}}>[no data]</Text>    // enough crying about types, TypeScript
  }

  const getImage = () => {
    return (object.attributes as any).image ? {uri: ((object.attributes as any).image)} : require("../assets/images/notfound.png")
  }

  switch (object.type){
    case "book": {

    }
    case "chapter": {

    }
    case "movie": {

    }
    case "character": {
      return (
        <View style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 200,
            borderWidth: 1,
            objectFit: "contain",borderColor: getHouseColor(object as Character)}} source={getImage()}/>
          <Text style={detailStyles.header}>{getData("name")}</Text>

          {/* TODO fix this mess */}
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Born:</Text> {getData("born")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Died:</Text> {getData("died")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Gender:</Text> {getData("gender")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Nationality:</Text> {getData("nationality")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Height:</Text> {getData("height")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Weight:</Text> {getData("weight")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Hair color:</Text> {getData("hair_color")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Eye color:</Text> {getData("eye_color")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Skin color:</Text> {getData("skin_color")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Species:</Text> {getData("species")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Blood status:</Text> {getData("blood_status")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Patronus:</Text> {getData("patronus")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Animagus:</Text> {getData("animagus")}</Text>
          <Text style={detailStyles.text}><Text style={{fontWeight: "normal"}}>Boggart:</Text> {getData("boggart")}</Text>
          {/* <Text style={detailStyles.text}></Text> */}
        </View>
      )
    }
    case "potion": {

    }
    case "spell": {

    }
  }
}

const detailStyles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderWidth: 1,
    objectFit: "contain"
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  header: {
    fontSize: 30,
    color: "white"
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})

function getHouseColor(item: Character): string {
  const house = item.attributes.house
  console.log(house);

  if (house && ["gryffindor","slytherin","ravenclaw","hufflepuff"].includes(house.toLowerCase())) {
    console.log(house, house as Theme);

    return themes[(house as Theme).toLowerCase() as Theme].color
  }
  else return "gray"
}