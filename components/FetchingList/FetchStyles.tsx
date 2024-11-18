import { StyleSheet } from "react-native"

const fetchStyles = StyleSheet.create({
  list: {
    backgroundColor: "black"
  },
  button: {
    backgroundColor: "#1a1a1a",
    margin: 5,
    borderRadius: 10
  },
  header: {
    color: "white",
    fontSize: 22,
    fontFamily: "Grenze-Regular"
  },
  navButton: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  navPage: {
    color: "white",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    flex: 1,
    fontSize: 16
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 5,
    gap: 10
  },
  text: {
    color: "white",
    fontFamily: "Lato-Regular",
    fontSize: 14,
    lineHeight: 20
  },
  disabled: {
    color: "#6a6a6a"
  },
  input: {
    backgroundColor: "#1a1a1a",
    height: 40,
    flex: 99,
    color: "white",
    paddingHorizontal: 15,
    fontFamily: "Lato-Regular"
  },
  inputGroup: {
    backgroundColor: "#1a1a1a",
    height: 40,
    flex: 99,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden"
  },
  inputGroupButton: {
    backgroundColor: "#1a1a1a",
    height: 40,
    width: 45,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  inputButton: {
    backgroundColor: "#1a1a1a",
    height: 40,
    width: 50,
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    gap: 10,
    justifyContent: "space-between"
  },
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    padding: 5,
    paddingBottom: 15,
    borderRadius: 10
  },
  cardWithBorder: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    padding: 5,
    paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: "#1a1a1aee"  // RGBA? Nice!
  },
  cardBorder: {
    borderRadius: 10,
  },
  cardInside: {
    // paddingHorizontal: 10,
    flex: 1,
    paddingRight: 10
  },
  image: {
    height: "100%",
    borderRadius: 5
  },
  bookImage: {
    width: 80,
    objectFit: "cover",
    position: "absolute"
  },
  movieImage: {
    // I hate this crap, what the hell are these stupid transparent frames??? :(
    height: "100%",
    minHeight: 120,
    width: 100,
    objectFit: "cover"
  },
  characterImage: {
    // TODO AUTOMATIC HEIGHT
    minHeight: 120,
    width: 110,
    objectFit: "cover",
    position: "absolute",
    top: 0
  },
  potionImage: {
    width: "100%",
    objectFit: "contain",
    top: 0
  },
  spellImage: {
    width: "100%",
    objectFit: "contain",
    top: 0
  },
  imageView: {
    height: "100%",
    position: "relative",
    overflow: "hidden",
    marginTop: 5,
    marginLeft: 5
  },
  bookImageView: {
    minHeight: 120,
    width: 80,
  },
  movieImageView: {
    height: "100%",
    minHeight: 120,
    width: 100,
    borderRadius: 5,
    paddingTop: 5,
    backgroundColor: "black"
  },
  characterImageView: {
    minHeight: 120,
    width: 110,
    position: "relative"
  },
  potionImageView: {
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 110
  },
  spellImageView: {
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 110,
  }
})

export default fetchStyles