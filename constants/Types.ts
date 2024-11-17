export type Theme = "neutral" | "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff" | "disabled";

export type Category = "Books" | "Movies" | "Characters" | "Potions" | "Spells"

export type Link = "current" | "first" | "prev" | "next" | "last"

export type NestedNavigationParams = { path: string }

export type PotterObject = Book | Chapter | Movie | Character | Potion | Spell

export type FetchedData = {
  data: PotterObject[]
  meta: {
    pagination: {
      current: number
      first: number | undefined
      prev: number | undefined
      next: number | undefined
      last: number | undefined
      records: number
    }
    copyright: string
    generated_at: string
  }
  links: {
    self: string
    current: string
    first: string | undefined
    prev: string | undefined
    next: string | undefined
    last: string | undefined
  }
}

export type Book = {
  id: string
  type: "book"
  attributes: {
    slug: string
    author: string
    cover: string
    dedication: string
    pages: number
    release_date: string
    summary: string
    title: string
    wiki: string
  }
  relationships: {
    chapters: {
      data: {
        id: string
        type: "chapter"
      }[]
    }
  }
  links: {
    self: string
  }
}

export type Chapter = {
  id: string
  type: "chapter"
  attributes: {
    slug: string
    order: number
    summary: string | null
    title: string
  }
  relationships: {
    book: {
      data: {
        id: string
        type: "book"
      }
    }
  }
  links: {
    self: string
  }
}

export type Movie = {
  id: string
  type: "movie"
  attributes: {
    slug: string
    box_office: string
    budget: string
    cinematographers: string[]
    directors: string[]
    distributors: string[]
    editors: string[]
    music_composers: string[]
    poster: string
    producers: string[]
    rating: string
    release_date: string
    running_time: string
    screenwriters: string[]
    summary: string
    title: string
    trailer: string
    wiki: string
  }
  links: {
    self: string
  }
}

export type Character = {
  id: string
  type: "character"
  attributes: {
    slug: string
    alias_names: string[]
    animagus: string | null
    blood_status: string | null
    boggart: string | null
    born: string | null
    died: string | null
    eye_color: string | null
    family_members: string[]
    gender: string | null
    hair_color: string | null
    height: string | null
    house: string | null
    image: string | null
    jobs: string[]
    marital_status: string | null
    name: string
    nationality: string | null
    patronus: string | null
    romances: string[]
    skin_color: string | null
    species: string | null
    titles: string[]
    wands: string[]
    weight: string | null
    wiki: string
  }
  links: {
    self: string
  }
}

export type Potion = {
  id: string
  type: "potion"
  attributes: {
    slug: string
    characteristics: string | null
    difficulty: string | null
    effect: string | null
    image: string | null
    inventors: string | null
    ingredients: string | null
    manufacturers: string | null
    name: string
    side_effects: string | null
    time: string | null
    wiki: string
  }
  links: {
    self: string
  }
}

export type Spell = {
  id: string
  type: "spell"
  attributes: {
    slug: string
    category: string
    creator: string | null
    effect: string
    hand: string | null
    image: string | null
    incantation: string | null
    light: string | null
    name: string
    wiki: string
  }
  links: {
    self: string
  }
}