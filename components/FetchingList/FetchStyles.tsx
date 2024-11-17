import { StyleSheet } from "react-native"

const fetchStyles = StyleSheet.create({
  list: {
    backgroundColor: "black"
  },
  button: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    margin: 5,
    borderRadius: 10
  },
  header: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
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
    fontSize: 14
  },
  disabled: {
    color: "#6a6a6a"
  },
  input: {
    backgroundColor: "#1a1a1a",
    height: 40,
    margin: 5,
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 15
  },
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 15
  },
  cardInside: {
    // paddingHorizontal: 10,
    flex: 1
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
    minHeight: 120,
    width: 100,
    position: "absolute",
    objectFit: "cover",
    left: -10             // I hate this crap, what the hell are these stupid transparent frames??? :(
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
    overflow: "hidden"
  },
  bookImageView: {
    minHeight: 120,
    width: 80
  },
  movieImageView: {
    width: 80,
    borderRadius: 5
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