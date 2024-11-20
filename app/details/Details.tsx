import { themes } from "@/constants/Themes";
import { houses, PotterObject } from "@/constants/Types";
import { useContext } from "react";
import { Text } from "react-native";
import { Theme } from "@/constants/Types";
import { extractColors } from "@/components/Details/DetailFunctions";
import detailStyles from "@/components/Details/DetailStyles";
import { ThemeContext } from "@/components/ThemeContext";
import { DetailCard, DetailCardGradient } from "@/components/Details/DetailCard";

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
      // Seriously? Moody is "Unknown", and now they give us three houses at once?!
      const gradient = (themes[((houses.includes(object.attributes.house ?? "") ? object.attributes.house : null) ?? "neutral").toLowerCase() as Theme].gradient).length >= 2 ? themes[((object.attributes.house != "Unknown" ? object.attributes.house : null) ?? "neutral").toLowerCase() as Theme].gradient : [lightBackground, lightBackground]

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
      const backgroundGradient = extractColors(object.attributes.characteristics ?? "")
      const gradient = backgroundGradient.length >= 2 ? backgroundGradient : (backgroundGradient.length == 1 ? [...backgroundGradient, ...backgroundGradient] : [lightBackground, lightBackground])

      return (
        <DetailCardGradient object={object} gradient={gradient}
          labelsInline={["Difficulty", "", "Effect", "", "Ingredients", "", "Characteristics"]}
          labelsOutside={["Side effects", "", "Time", "", "Inventors", "", "Manufacturers"]}
          imageStyles={{height: "100%", width: "100%", maxWidth: 150, borderWidth: 1, objectFit: "contain", borderRadius: 10}}
        />
      )
    }

    case "spell": {
      const backgroundGradient = extractColors(object.attributes.light ?? "")
      const gradient = backgroundGradient.length >= 2 ? backgroundGradient : (backgroundGradient.length == 1 ? [...backgroundGradient, ...backgroundGradient] : [lightBackground, lightBackground])

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