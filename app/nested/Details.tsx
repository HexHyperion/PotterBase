import { themes } from "@/constants/Themes"
import { houses, PotterObject } from "@/constants/Types"
import { useContext } from "react"
import { Text } from "react-native"
import { Theme } from "@/constants/Types"
import { extractColors } from "@/components/Details/DetailFunctions"
import detailStyles from "@/components/Details/DetailStyles"
import { ThemeContext } from "@/components/ThemeContext"
import { DetailCard, DetailCardGradient } from "@/components/Details/DetailCard"


// Window/stack screen/modal displaying all information about the passed object
// It's soo compressed already and it's stil thiccc
export default function Details({navigation, route}: {navigation: any, route: any}) {
  const object = route.params.object as PotterObject
  const theme = useContext(ThemeContext).theme
  const lightBackground = themes[theme].lightBackground

  switch (object.type){
    case "book": {
      return (
        <DetailCard object={object}
          labelsInline={["Author", "", "Release date", "", "Dedication", "", "Pages"]}
          labelsInside={["", "Summary"]}
          imageStyles={{height: 220, width: 144, borderWidth: 1, objectFit: "contain", borderRadius: 10}}
        />
      )
    }
    case "chapter": {
      // insert some joke about notImplementedException here, idk
    }

    case "movie": {
      return (
        <DetailCard object={object}
          labelsInline={["Release date", "", "Budget", "Box office", "", "Running time", "", "Rating"]}
          labelsInside={["", "Summary"]} collapsibles={["Directors", "Producers", "Distributors", "Screenwriters", "Music composers", "Cinematographers", "Editors"]}
          imageViewStyles={{height: 200, width: 144, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, overflow: "hidden"}}
          imageStyles={{height: 220, width: 144, borderWidth: 1, objectFit: "contain", borderRadius: 10}}
        />
      )
    }

    case "character": {
      // Seriously? Moody was "Unknown", and now they give us three houses at once?!

      // Before:
      // const gradient = (themes[((houses.includes(object.attributes.house ?? "") ? object.attributes.house : null) ?? "neutral").toLowerCase() as Theme].gradient).length >= 2 ? themes[((object.attributes.house != "Unknown" ? object.attributes.house : null) ?? "neutral").toLowerCase() as Theme].gradient : [lightBackground, lightBackground]

      // After:
      const house = object.attributes.house
      const houseFiltered = ((houses.includes(house ?? "") ? house : null) ?? "neutral").toLowerCase() as Theme   // Get the gradient for the given character's house - if it's unknown, use neutral

      const gradient = (
        themes[houseFiltered].gradient).length >= 2   // The gradient for neutral is [], so if there's no house...
          ? themes[houseFiltered].gradient
          : [lightBackground, lightBackground]        // ...the background of the card is taken from the current theme

      return (
        <DetailCardGradient object={object} gradient={gradient}
          labelsInline={["Born", "", "Died", "", "House", "", "Species", "Gender", "", "Nationality"]}
          labelsOutside={["Hair color", "Eye color", "Skin color", "Height", "Weight", "", "Marital status", "", "Blood status", "Patronus", "Animagus", "Boggart"]}
          collapsibles={["Alias names", "Titles", "Jobs", "Family members", "Romances", "Wands"]}
          imageStyles={{height: 220, width: 150, borderWidth: 1, objectFit: "cover", borderRadius: 10}}
        />
      )
    }

    case "potion": {
      const backgroundGradient = extractColors(object.attributes.characteristics ?? "")   // This is sooo genius
      const gradient = backgroundGradient.length >= 2       // Kinda the same as with characters
        ? backgroundGradient                                // If there are 2+ colors, OK
        : (backgroundGradient.length == 1
          ? [...backgroundGradient, ...backgroundGradient]  // If there's one, duplicate it
          : [lightBackground, lightBackground])             // If there's none, use the current theme background

      return (
        <DetailCardGradient object={object} gradient={gradient}
          labelsInline={["Difficulty", "", "Effect", "", "Ingredients", "", "Characteristics"]}
          labelsOutside={["Side effects", "", "Time", "", "Inventors", "", "Manufacturers"]}
          imageStyles={{height: "100%", width: "100%", maxWidth: 150, borderWidth: 1, objectFit: "contain", borderRadius: 10}}
        />
      )
    }

    case "spell": {
      // The exact same thing as with potions
      const backgroundGradient = extractColors(object.attributes.light ?? "")
      const gradient = backgroundGradient.length >= 2
        ? backgroundGradient
        : (backgroundGradient.length == 1
          ? [...backgroundGradient, ...backgroundGradient]
          : [lightBackground, lightBackground])

      return (
        <DetailCardGradient object={object} gradient={gradient}
          labelsInline={["Incantation", "", "Category", "", "Effect"]}
          labelsOutside={["Light", "", "Hand", "", "Creator"]}
          imageStyles={{height: "100%", width: "100%", maxWidth: 150, borderWidth: 1, objectFit: "contain", borderRadius: 10}}
        />
      )
    }
    default: return <Text style={detailStyles.text}>[Unknown object!]</Text>
  }
}