import { PotterObject } from "@/constants/Types";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getImage, extractColors } from "../Details/DetailFunctions";
import DetailList from "../Details/DetailList";
import Space from "../Space";
import fetchStyles from "./FetchStyles";
import FetchingCardTemplate from "./FetchingCardTemplate";

export default function FetchingCard({item}: {item: PotterObject}) {
  switch (item.type) {
    case "book": {
      return (
        <FetchingCardTemplate item={item} labels={["", "Author", "", "Release date", "", "Pages"]}/>
      )
    }
    case "chapter": {
      return (
          <View>{item.attributes.title}</View>
        )
    }
    case "movie": {
      return (
        <FetchingCardTemplate item={item} labels={["", "Release date", "", "Running time"]} optionalField="Director"/>
      )
    }
    case "character": {
      return (
        <FetchingCardTemplate item={item} labels={["", "Species", "", "House"]} optionalField="Job" optionalLast={true}/>
      )
    }
    case "potion": {
      return (
        <FetchingCardTemplate item={item} labels={["", "Difficulty", "", "Characteristics", "", "Effect"]}/>
      )
    }
    case "spell": {
      return (
        <FetchingCardTemplate item={item} labels={["", "Category", "", "Effect", "", "Light"]}/>
      )
    }
    default: {
      return <Text style={fetchStyles.text}>[Unknown item!]</Text>
    }
  }
}