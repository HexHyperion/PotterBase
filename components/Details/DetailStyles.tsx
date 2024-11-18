import { StyleSheet } from "react-native"

const detailStyles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderWidth: 1,
    objectFit: "contain"
  },
  text: {
    color: "white",
    fontFamily: "Lato-Regular",
    fontSize: 14,
    lineHeight: 20
  },
  header: {
    fontSize: 30,
    color: "white",
    fontFamily: "Grenze-SemiBold"
  },
  wrapper: {
    paddingHorizontal: 20
  },
  disabled: {
    color: "#6a6a6a"
  }
})

export default detailStyles