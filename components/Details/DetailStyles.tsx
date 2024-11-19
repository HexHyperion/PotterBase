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
    paddingHorizontal: 10
  },
  card: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderRadius: 10
  },
  cardBackground: {
    borderRadius: 10,
    overflow: "hidden"
  },
  cardInline: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    // backgroundColor: "red"
  },
  cardDimmer: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderRadius: 10
  },
  cardOutside: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  cardWrapper: {
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 10
  },
  disabled: {
    color: "#8a8a8a"
  }
})

export default detailStyles