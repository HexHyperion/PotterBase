import { themes } from "@/constants/Themes";
import { Character, PotterObject } from "@/constants/Types";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, Image, View, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible"
import { Theme } from "@/constants/Types";
import { TouchableWithoutFeedback } from "react-native";
import Space from "@/components/Space";
import DetailList from "@/components/Details/DetailList";
import { getImage, getData, getHouseColor } from "@/components/Details/DetailFunctions";
import detailStyles from "@/components/Details/DetailStyles";

export default function Details({navigation, route}: {navigation: any, route: any}) {
  const object = route.params.object as PotterObject

  switch (object.type){
    case "book": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 131,
            borderWidth: 1,
            objectFit: "contain"}} source={getImage(object, "cover")}/>
          <Text style={detailStyles.header}>{getData(object, "Title")}</Text>

          <DetailList object={object} labels={["Author", "", "Dedication", "", "Pages", "", "Release date", "", "Summary"]} collapsibles={[]}></DetailList>
        </ScrollView>
      )
    }
    case "chapter": {

    }
    case "movie": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 131,
            borderWidth: 1,
            objectFit: "contain"}} source={getImage(object, "poster")}/>
          <Text style={detailStyles.header}>{getData(object, "Title")}</Text>

          <DetailList object={object} labels={["Running time", "", "Release date", "", "Budget", "Box office", "", "Rating", "", "Summary"]} collapsibles={["Directors", "Producers", "Distributors", "Screenwriters", "Music composers", "Cinematographers", "Editors"]}></DetailList>
        </ScrollView>
      )
    }
    case "character": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 200,
            borderWidth: 1,
            objectFit: "contain",borderColor: getHouseColor(object as Character)}} source={getImage(object, "image")}/>
          <Text style={detailStyles.header}>{getData(object, "name")}</Text>

          <DetailList object={object} labels={["Born", "Died", "", "Gender", "Nationality", "Marital status", "", "Height", "Weight", "Hair color", "Eye color", "Skin color", "", "Species", "Blood status", "Patronus", "Animagus", "Boggart"]} collapsibles={["Alias names", "Titles", "Jobs", "Family members", "Romances", "Wands"]}></DetailList>
        </ScrollView>
      )
    }
    case "potion": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 200,
            borderWidth: 1,
            objectFit: "contain"}} source={getImage(object, "image")}/>
          <Text style={detailStyles.header}>{getData(object, "name")}</Text>

          <DetailList object={object} labels={["Difficulty", "", "Effect", "Side effects", "Time", "", "Characteristics", "", "Ingredients", "", "Inventors", "Manufacturers"]} collapsibles={[]}></DetailList>
        </ScrollView>
      )
    }
    case "spell": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <Image style={{height: 200,
            width: 200,
            borderWidth: 1,
            objectFit: "contain"}} source={getImage(object, "image")}/>
          <Text style={detailStyles.header}>{getData(object, "name")}</Text>

          <DetailList object={object} labels={["Incantation", "", "Category", "", "Effect", "Light", "", "Hand", "", "Creator"]} collapsibles={[]}></DetailList>
        </ScrollView>
      )
    }
    default: return <Text style={detailStyles.text}>[Unknown object!]</Text>
  }
}