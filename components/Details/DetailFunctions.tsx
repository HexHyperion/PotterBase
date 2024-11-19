import { Text } from "react-native";
import { themes, webColors } from "@/constants/Themes";
import { Character, Theme, PotterObject, ImagePropName } from "@/constants/Types";
import detailStyles from "./DetailStyles";


// Returns a usable (e.g. hex code) color of a given character's Hogwarts house
export function getHouseColor(item: Character): string {
  const house = item.attributes.house

  // The person who put "house: 'unknown'" in the API is a damn troll
  if (house && ["gryffindor","slytherin","ravenclaw","hufflepuff"].includes(house.toLowerCase())) {
    console.log(house, house as Theme);

    return themes[(house as Theme).toLowerCase() as Theme].color
  }
  else return "#6a6a6a"
}


// Returns an array of usable color names extracted from the characteristics of a potion or spell
export function extractColors(description: string): string[] {
  let colors: Set<string> = new Set()
  const descPrepared = description.toLowerCase().replaceAll(",", "").split(" ")

  descPrepared.forEach((word: string, index: number) => {
    const prefix = descPrepared[index-1]

    // e.g. "light blue", "dark red"
    if (["light", "dark"].includes(prefix) && webColors.includes(prefix + word)) {
      colors.add(prefix + word)
    }
    else {

      // Two versions of "-" separated words
      const dividedWord = word.split("-")
      const singleWord = word.replaceAll("-","")

      // e.g. dark-red -> darkred, also normal words
      if (webColors.includes(singleWord)) {
        colors.add(singleWord)
      }

      // e.g. teal-colored -> [teal, colored] -> teal
      dividedWord.filter((divided: string) => webColors.includes(divided)).forEach((divided: string) => {
        colors.add(divided)
      })

      // A small exception because a few spells have "light: 'golden'"
      if (singleWord == "golden") {
        colors.add("gold")
        colors.add("orange")          // because CSS gold looks stupidly yellow
      }
    }
  })
  return [...colors]
}


// Returns a given object's image, or notfound.png if there's none
export function getImage(object: PotterObject, prop: ImagePropName) {
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