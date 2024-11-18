import { PotterObject } from "@/constants/Types";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getImage, extractColors } from "../Details/DetailFunctions";
import DetailList from "../Details/DetailList";
import Space from "../Space";
import fetchStyles from "./FetchStyles";

export default function FetchingCard({item}: {item: PotterObject}) {
  switch (item.type) {
    case "book": {
      return (
        <View style={fetchStyles.card}>
          <View style={[fetchStyles.bookImageView, fetchStyles.imageView]}>
            <Image style={[fetchStyles.bookImage, fetchStyles.image]} source={getImage(item, "cover")}/>
          </View>
          <View style={fetchStyles.cardInside}>
            <Text style={fetchStyles.header}>{item.attributes.title}</Text>
            <DetailList object={item} labels={["", "Author", "", "Release date", "", "Pages"]} collapsibles={[]}/>
          </View>
        </View>
      )
    }
    case "chapter": {
      return (
          <View>{item.attributes.title}</View>
        )
    }
    case "movie": {
      return (
        <View style={fetchStyles.card}>
          <View style={[fetchStyles.movieImageView, fetchStyles.imageView]}>
            <Image style={[fetchStyles.movieImage, fetchStyles.image]} source={getImage(item, "poster")}/>
          </View>
          <View style={fetchStyles.cardInside}>
            <Text style={fetchStyles.header}>{item.attributes.title}</Text>
            <Space/>
            <Text style={fetchStyles.text}>Director: {item.attributes.directors[0] ?? <Text style={fetchStyles.disabled}>n/d</Text>}</Text>
            <DetailList object={item} labels={["", "Release date", "", "Running time"]} collapsibles={[]}/>
          </View>
        </View>
      )
    }
    case "character": {
      return (
        <View style={fetchStyles.card}>
          <View style={[fetchStyles.characterImageView, fetchStyles.imageView]}>
            <Image style={[fetchStyles.characterImage, fetchStyles.image]} source={getImage(item, "image")}/>
          </View>
          <View style={fetchStyles.cardInside}>
            <Text style={fetchStyles.header}>{item.attributes.name}</Text>
            <Space/>
            <Text style={fetchStyles.text}>Job: {item.attributes.jobs[item.attributes.jobs.length-1] ?? <Text style={fetchStyles.disabled}>n/d</Text>}</Text>
            <DetailList object={item} labels={["", "Species", "", "House"]} collapsibles={[]}/>
          </View>
        </View>
      )
    }
    case "potion": {
      const background = extractColors(item.attributes.characteristics ?? "")
      const gradient = background.length >= 2 ? background : (background.length == 1 ? [...background, ...background] : ["transparent", "transparent"])
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={fetchStyles.cardBorder} colors={gradient}>
          <View style={fetchStyles.cardWithBorder}>
            <View style={[fetchStyles.potionImageView, fetchStyles.imageView]}>
              <Image style={[fetchStyles.potionImage, fetchStyles.image]} source={getImage(item, "image")}/>
            </View>
            <View style={fetchStyles.cardInside}>
              <Text style={fetchStyles.header}>{item.attributes.name}</Text>
              <DetailList object={item} labels={["", "Difficulty", "", "Characteristics", "", "Effect"]} collapsibles={[]}/>
            </View>
          </View>
        </LinearGradient>
      )
    }
    case "spell": {
      const background = extractColors(item.attributes.light ?? "")
      const gradient = background.length >= 2 ? background : (background.length == 1 ? [...background, ...background] : ["transparent", "transparent"])
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={fetchStyles.cardBorder} colors={gradient}>
          <View style={fetchStyles.cardWithBorder}>
            <View style={[fetchStyles.spellImageView, fetchStyles.imageView]}>
              <Image style={[fetchStyles.spellImage, fetchStyles.image]} source={getImage(item, "image")}/>
            </View>
            <View style={fetchStyles.cardInside}>
              <Text style={fetchStyles.header}>{item.attributes.name}</Text>
              <DetailList object={item} labels={["", "Category", "", "Effect", "", "Light"]} collapsibles={[]}/>
            </View>
          </View>
        </LinearGradient>
      )
    }
    default: {
      return <Text style={fetchStyles.text}>[Unknown item!]</Text>
    }
  }
}