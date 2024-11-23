import { StyleSheet } from "react-native"

const filterStyles = StyleSheet.create({
  text: {
    fontFamily: "Lato-Regular",
    color: "white"
  },
  filter: {
    display: "flex",
    gap: 10
  },

  dropdown: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white"
  },
  dropdownText: {
    color: "white",
    fontFamily: "Lato-Regular",
    fontSize: 14,
    backgroundColor: "transparent"
  },
  dropdownList: {
    borderRadius: 10,
    borderWidth: 0,
    marginHorizontal: 5,
    overflow: "hidden"
  },

  input: {
    height: 40,
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 15,
    flex: 1,
    fontSize: 14,
    fontFamily: "Lato-Regular"
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  button: {
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    width: 60,
    borderRadius: 10,
    flex: 1,
    alignSelf: "flex-end"
  },
  addButton: {
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    width: 60,
    borderRadius: 10,
    alignSelf: "flex-end"
  },
  buttonImage: {
    height: 40,
    width: 30,
    objectFit: "contain"
  },

  delete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  deleteButton: {
    height: 40,
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteButtonImage: {
    height: 18,
    width: 20
  }
})

export default filterStyles