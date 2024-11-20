import images from "@/constants/Images"
import { Theme } from "@/constants/Types"

type Page = "home" | "books" | "movies" | "characters" | "potions" | "spells"


// Returns an image to use as the navbar icon based on the theme
// One of the first things I did in this project, don't judge the stupidity of the solution pls
export function SelectNavImage(active: boolean, theme: Theme, page: Page): any {
  const houseArray = {
    "neutral": images.neutral.navbar,
    "gryffindor": images.gryffindor.navbar,
    "slytherin": images.slytherin.navbar,
    "ravenclaw": images.ravenclaw.navbar,
    "hufflepuff": images.hufflepuff.navbar,
    "disabled": images.disabled.navbar
  }

  let house

  if (active) {
    house = houseArray[theme]
  }
  else {
    house = houseArray["disabled"]
  }

  const imgArray = {
    "home": house.home,
    "books": house.books,
    "movies": house.movies,
    "characters": house.characters,
    "potions": house.potions,
    "spells": house.spells
  }

  return imgArray[page]
}