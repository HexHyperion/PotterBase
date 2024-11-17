import { Text, StyleSheet } from "react-native";
import themes from "../../constants/Themes";
import { Character, Theme, PotterObject } from "../../constants/Types";

export function getHouseColor(item: Character): string {
  const house = item.attributes.house

  if (house && ["gryffindor","slytherin","ravenclaw","hufflepuff"].includes(house.toLowerCase())) {
    console.log(house, house as Theme);

    return themes[(house as Theme).toLowerCase() as Theme].color
  }
  else return "#6a6a6a"
}

export function getImage(object: PotterObject, prop: "image" | "cover" | "poster") {
  return (object.attributes as any)[prop] ? {uri: ((object.attributes as any)[prop])} : require("@/assets/images/notfound.png")
}

export function getData(object: PotterObject, prop: string) {
  return (object.attributes as any)[toProp(prop)] ?? <Text style={detailStyles.disabled}>n/d</Text>
}

export function toProp(label: string): string {
  return label.trim().replaceAll(" ", "_").replaceAll(":", "").toLowerCase()
}

export const detailStyles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderWidth: 1,
    objectFit: "contain"
  },
  text: {
    color: "white"
  },
  header: {
    fontSize: 30,
    color: "white"
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  disabled: {
    color: "#6a6a6a"
  }
})