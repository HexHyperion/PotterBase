import images from "./images";

export type Theme = "neutral" | "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
type Page = "home" | "books" | "movies" | "characters" | "potions" | "spells";

export function selectNavImage(active: boolean, theme: Theme, page: Page): any {
  const houseArray = {
    "neutral": images.neutral.navbar,
    "gryffindor": images.gryffindor.navbar,
    "slytherin": images.slytherin.navbar,
    "ravenclaw": images.ravenclaw.navbar,
    "hufflepuff": images.hufflepuff.navbar
  };

  let house;
  if (active) {
    house = houseArray[theme];
  }
  else {
    house = houseArray["neutral"];
  }

  const imgArray = {
    "home": house.home,
    "books": house.books,
    "movies": house.movies,
    "characters": house.characters,
    "potions": house.potions,
    "spells": house.spells
  };


  return imgArray[page];
}