import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{fontSize: 36, color: "white"}}>There's no place like 127.0.0.1</Text>
    </View>
  )
}