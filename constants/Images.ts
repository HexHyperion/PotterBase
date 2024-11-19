// Friendship ended with require(), I don't have friends now

const images = {
  neutral: {
    crest: require("@/assets/images/HogwartsCrest.png"),
    background: require("@/assets/images/transparent.png"),
    navbar: {
      home: require(`@/assets/images/theme/neutral/hogwarts.png`),
      books: require(`@/assets/images/theme/neutral/pen.png`),
      movies: require(`@/assets/images/theme/neutral/map.png`),
      characters: require(`@/assets/images/theme/neutral/hedwig.png`),
      potions: require(`@/assets/images/theme/neutral/potion.png`),
      spells: require(`@/assets/images/theme/neutral/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/neutral/sorting.png`),
      bolt: require(`@/assets/images/theme/neutral/bolt.png`)
    }
  },
  gryffindor: {
    crest: require("@/assets/images/GryffindorCrest.png"),
    background: require("@/assets/images/theme/gryffindor/background.jpg"),
    navbar: {
      home: require(`@/assets/images/theme/gryffindor/hogwarts.png`),
      books: require(`@/assets/images/theme/gryffindor/pen.png`),
      movies: require(`@/assets/images/theme/gryffindor/map.png`),
      characters: require(`@/assets/images/theme/gryffindor/hedwig.png`),
      potions: require(`@/assets/images/theme/gryffindor/potion.png`),
      spells: require(`@/assets/images/theme/gryffindor/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/gryffindor/sorting.png`),
      bolt: require(`@/assets/images/theme/gryffindor/bolt.png`)
    }
  },
  slytherin: {
    crest: require("@/assets/images/SlytherinCrest.png"),
    background: require("@/assets/images/theme/slytherin/background.jpg"),
    navbar: {
      home: require(`@/assets/images/theme/slytherin/hogwarts.png`),
      books: require(`@/assets/images/theme/slytherin/pen.png`),
      movies: require(`@/assets/images/theme/slytherin/map.png`),
      characters: require(`@/assets/images/theme/slytherin/hedwig.png`),
      potions: require(`@/assets/images/theme/slytherin/potion.png`),
      spells: require(`@/assets/images/theme/slytherin/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/slytherin/sorting.png`),
      bolt: require(`@/assets/images/theme/slytherin/bolt.png`)
    }
  },
  ravenclaw: {
    crest: require("@/assets/images/RavenclawCrest.png"),
    background: require("@/assets/images/theme/ravenclaw/background.jpg"),
    navbar: {
      home: require(`@/assets/images/theme/ravenclaw/hogwarts.png`),
      books: require(`@/assets/images/theme/ravenclaw/pen.png`),
      movies: require(`@/assets/images/theme/ravenclaw/map.png`),
      characters: require(`@/assets/images/theme/ravenclaw/hedwig.png`),
      potions: require(`@/assets/images/theme/ravenclaw/potion.png`),
      spells: require(`@/assets/images/theme/ravenclaw/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/ravenclaw/sorting.png`),
      bolt: require(`@/assets/images/theme/ravenclaw/bolt.png`)
    }
  },
  hufflepuff: {
    crest: require("@/assets/images/HufflepuffCrest.png"),
    background: require("@/assets/images/theme/hufflepuff/background.jpg"),
    navbar: {
      home: require(`@/assets/images/theme/hufflepuff/hogwarts.png`),
      books: require(`@/assets/images/theme/hufflepuff/pen.png`),
      movies: require(`@/assets/images/theme/hufflepuff/map.png`),
      characters: require(`@/assets/images/theme/hufflepuff/hedwig.png`),
      potions: require(`@/assets/images/theme/hufflepuff/potion.png`),
      spells: require(`@/assets/images/theme/hufflepuff/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/hufflepuff/sorting.png`),
      bolt: require(`@/assets/images/theme/hufflepuff/bolt.png`)
    }
  },
  disabled: {
    crest: require("@/assets/images/notfound.png"),
    background: require("@/assets/images/notfound.png"),
    navbar: {
      home: require(`@/assets/images/theme/disabled/hogwarts.png`),
      books: require(`@/assets/images/theme/disabled/pen.png`),
      movies: require(`@/assets/images/theme/disabled/map.png`),
      characters: require(`@/assets/images/theme/disabled/hedwig.png`),
      potions: require(`@/assets/images/theme/disabled/potion.png`),
      spells: require(`@/assets/images/theme/disabled/wand.png`)
    },
    buttons: {
      sorting: require(`@/assets/images/theme/disabled/sorting.png`),
      bolt: require(`@/assets/images/theme/disabled/bolt.png`)
    }
  }
};

export default images;