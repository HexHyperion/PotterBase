import { PotterObject } from "@/constants/Types";
import { Image, StyleSheet, Text, View } from "react-native";

export default function DetailCard({item}: {item: PotterObject}) {
  let imageProp: "image" | "cover" | "poster"
  switch (item.type) {
    case "book": {
      imageProp = "cover"
    }
    case "movie": {
      imageProp = "poster"
    }
    default: {
      imageProp = "image"
    }
  }

  return (
    <View style={cardStyles.wrapper}>
      <View>
        <Image style={cardStyles.image} source={(item.attributes as any)[imageProp]}/>
      </View>
      <Text style={cardStyles.header}></Text>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 10
  },
  text: {

  },
  image: {

  },
  wideImage: {

  },
  header: {

  }
})