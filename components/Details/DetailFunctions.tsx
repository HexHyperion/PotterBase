import { Text } from "react-native";
import themes from "@/constants/Themes";
import { Character, Theme, PotterObject } from "@/constants/Types";
import detailStyles from "./DetailStyles";


// Returns a usable (e.g. hex code) color of a given character's Hogwarts house
export function getHouseColor(item: Character): string {
  const house = item.attributes.house

  if (house && ["gryffindor","slytherin","ravenclaw","hufflepuff"].includes(house.toLowerCase())) {
    console.log(house, house as Theme);

    return themes[(house as Theme).toLowerCase() as Theme].color
  }
  else return "#6a6a6a"
}


// Returns a given object's image, or notfound.png if there's none
export function getImage(object: PotterObject, prop: "image" | "cover" | "poster") {
  return (object.attributes as any)[prop] ? {uri: ((object.attributes as any)[prop])} : require("@/assets/images/notfound.png")
}


// Returns a given property value of a given object, or n/d if it's null
export function getData(object: PotterObject, prop: string) {
  return (object.attributes as any)[toProp(prop)] ?? <Text style={detailStyles.disabled}>n/d</Text>
}


// Transforms a human-readable property name into a PotterDB object field name
// Even if a nonexistent label is given, getData() will just return n/d
export function toProp(label: string): string {
  return label.trim().replaceAll(" ", "_").replaceAll(":", "").toLowerCase()
}