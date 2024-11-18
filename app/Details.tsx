import { themes } from "@/constants/Themes";
import { Character, PotterObject } from "@/constants/Types";
import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, Image, View, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible"
import { Theme } from "@/constants/Types";
import { TouchableWithoutFeedback } from "react-native";
import Space from "@/components/Space";
import DetailList from "@/components/Details/DetailList";
import { getImage, getData, getHouseColor, extractColors } from "@/components/Details/DetailFunctions";
import detailStyles from "@/components/Details/DetailStyles";
import LinearGradient from "react-native-linear-gradient";
import { ThemeContext } from "@/components/ThemeContext";

export default function Details({navigation, route}: {navigation: any, route: any}) {
  const object = route.params.object as PotterObject
  const theme = useContext(ThemeContext).theme

  switch (object.type){
    case "book": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <View style={detailStyles.card}>
            <View style={detailStyles.cardInline}>
              <Image source={getImage(object, "cover")}
                style={{
                  height: 220,
                  width: 144,
                  borderWidth: 1,
                  objectFit: "contain",
                  borderRadius: 10
                }}/>
              <View style={{flex: 99}}>
                <Text style={detailStyles.header}>{getData(object, "Title")}</Text>
                <Space/>
                <DetailList object={object} labels={["Author", "", "Release date", "", "Dedication", "", "Pages"]} collapsibles={[]}/>
              </View>
            </View>
            <Space/>
          <DetailList object={object} labels={["", "Summary"]} collapsibles={[]}></DetailList>
          </View>
        </ScrollView>
      )
    }
    case "chapter": {

    }
    case "movie": {
      return (
        <ScrollView style={detailStyles.wrapper}>
          <View style={detailStyles.card}>
            <View style={detailStyles.cardInline}>
              <View style={{
                height: 200,
                width: 144,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                overflow: "hidden"
              }}>
                <Image source={getImage(object, "poster")}
                  style={{
                    height: 240,
                    width: "100%",
                    borderWidth: 1,
                    objectFit: "cover",
                    marginTop: 10
                  }}/>
              </View>
              <View style={{flex: 99}}>
                <Text style={detailStyles.header}>{getData(object, "Title")}</Text>
                <Space/>
                <DetailList object={object} labels={["Release date", "", "Budget", "Box office", "", "Running time", "", "Rating"]} collapsibles={[]}/>
              </View>
            </View>
            <Space/>
          <DetailList object={object} labels={["", "Summary"]} collapsibles={["Directors", "Producers", "Distributors", "Screenwriters", "Music composers", "Cinematographers", "Editors"]}></DetailList>
          </View>
        </ScrollView>
      )
    }
    case "character": {
      const gradient = themes[((object.attributes.house != "Unknown" ? object.attributes.house : null) ?? "neutral").toLowerCase() as Theme].gradient
      return (
        <ScrollView style={detailStyles.wrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradient} style={detailStyles.cardBackground}>
            <View style={detailStyles.cardDimmer}>
              <View style={detailStyles.cardInline}>
              <Image source={getImage(object, "image")}
                  style={{
                    height: 220,
                    width: 150,
                    borderWidth: 1,
                    objectFit: "cover",
                    borderRadius: 10
                  }}/>
                <View style={{flex: 99}}>
                  <Text style={detailStyles.header}>{getData(object, "Name")}</Text>
                  <Space/>
                  <DetailList object={object} labels={["Born", "", "Died", "", "House", "", "Species", "Gender", "", "Nationality"]} collapsibles={[]}/>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={detailStyles.cardOutside}>
            <DetailList object={object} labels={["Hair color", "Eye color", "Skin color", "Height", "Weight", "", "Marital status", "", "Blood status", "Patronus", "Animagus", "Boggart"]} collapsibles={["Alias names", "Titles", "Jobs", "Family members", "Romances", "Wands"]}></DetailList>
          </View>
        </ScrollView>
      )
    }
    case "potion": {
      const background = extractColors(object.attributes.characteristics ?? "")
      const gradient = background.length >= 2 ? background : (background.length == 1 ? [...background, ...background] : ["#1a1a1a", "#1a1a1a"])
      return (
        <ScrollView style={detailStyles.wrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradient} style={detailStyles.cardBackground}>
            <View style={detailStyles.cardDimmer}>
              <View style={detailStyles.cardInline}>
                <Image source={getImage(object, "image")}
                  style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: 150,
                    borderWidth: 1,
                    objectFit: "contain",
                    borderRadius: 10
                  }}/>
                <View style={{flex: 99}}>
                  <Text style={detailStyles.header}>{getData(object, "Name")}</Text>
                  <Space/>
                  <DetailList object={object} labels={["Difficulty", "", "Effect", "", "Ingredients", "", "Characteristics"]} collapsibles={[]}/>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={detailStyles.cardOutside}>
            <DetailList object={object} labels={["Side effects", "", "Time", "", "Inventors", "", "Manufacturers"]} collapsibles={[]}></DetailList>
          </View>
        </ScrollView>
      )
    }
    case "spell": {
      const background = extractColors(object.attributes.light ?? "")
      const gradient = background.length >= 2 ? background : (background.length == 1 ? [...background, ...background] : ["#1a1a1a", "#1a1a1a"])
      return (
        <ScrollView style={detailStyles.wrapper}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradient} style={detailStyles.cardBackground}>
            <View style={detailStyles.cardDimmer}>
              <View style={detailStyles.cardInline}>
                <Image source={getImage(object, "image")}
                  style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: 150,
                    borderWidth: 1,
                    objectFit: "contain",
                    borderRadius: 10
                  }}/>
                <View style={{flex: 99}}>
                  <Text style={detailStyles.header}>{getData(object, "Name")}</Text>
                  <Space/>
                  <DetailList object={object} labels={["Incantation", "", "Category", "", "Effect"]} collapsibles={[]}/>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={detailStyles.cardOutside}>
            <DetailList object={object} labels={["Light", "", "Hand", "", "Creator"]} collapsibles={[]}></DetailList>
          </View>
        </ScrollView>
      )
    }
    default: return <Text style={detailStyles.text}>[Unknown object!]</Text>
  }
}