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
    fontSize: 26,
    color: "white",
    fontFamily: "Grenze-SemiBold",
    lineHeight: 26,
    marginTop: 5
  },
  wrapper: {
    paddingHorizontal: 5
  },
  card: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 10
  },
  cardBackground: {
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 10
  },
  cardInline: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    // backgroundColor: "red"
  },
  cardDimmer: {
    // backgroundColor: "#000000aa",
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderRadius: 10
  },
  cardOutside: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  disabled: {
    color: "#6a6a6a"
  }
})

export default detailStyles