// Questions are shortened versions of the official Pottermore quiz
// github.com/EGROENE/hogwarts-house-quiz

export const housesInfo = [
  {
    houseName: "Slytherin",
    houseCrest: "./assets/crest-slytherin.png",
  },
  {
    houseName: "Gryffindor",
    houseCrest: "./assets/crest-gryffindor.png",
  },
  {
    houseName: "Ravenclaw",
    houseCrest: "./assets/crest-ravenclaw.png",
  },
  {
    houseName: "Hufflepuff",
    houseCrest: "./assets/crest-hufflepuff.png",
  },
]

export const allQuestions = [
  {
    question: "Which word below describes you best?",
    answers: {
      slytherin: "Cunning",
      gryffindor: "Brave",
      ravenclaw: "Clever",
      hufflepuff: "Friendly",
    },
    weight: 4,
  },
  {
    question: "Of these, which animal do you like best?",
    answers: {
      slytherin: "Snake",
      gryffindor: "Lion",
      ravenclaw: "Raven",
      hufflepuff: "Badger",
    },
    weight: 2,
  },
  {
    question: "What's your favorite color?",
    answers: {
      slytherin: "Green",
      gryffindor: "Scarlet",
      ravenclaw: "Blue",
      hufflepuff: "Yellow",
    },
    weight: 1,
  },
  {
    question: "What do you find the most interesting?",
    answers: {
      slytherin: "Hexes",
      gryffindor: "Broom Flying",
      ravenclaw: "Transfiguration",
      hufflepuff: "Care of Magical Creatures",
    },
    weight: 2,
  },
  {
    question: "Which famous Hogwarts alumnus/alumna would you like to meet?",
    answers: {
      slytherin: "Tom Riddle",
      gryffindor: "Albus Dumbledore",
      ravenclaw: "Garrick Olivander",
      hufflepuff: "Cedric Diggory",
    },
    weight: 1,
  },
  {
    question: "What's your favorite movie genre?",
    answers: {
      slytherin: "Crime",
      gryffindor: "Action",
      ravenclaw: "Documentary",
      hufflepuff: "Comedy",
    },
    weight: 2,
  },
  {
    question: "How do you see yourself in the Mirror of Erised?",
    answers: {
      slytherin: "With riches",
      gryffindor: "On an adventure",
      ravenclaw: "With a book",
      hufflepuff: "With friends & family",
    },
    weight: 3,
  },
  {
    question: "Of these four, which muggle profession would you choose?",
    answers: {
      slytherin: "Salesperson",
      gryffindor: "Firefighter",
      ravenclaw: "Researcher",
      hufflepuff: "Caregiver",
    },
    weight: 3,
  },
  {
    question: "What is at the core of your wand?",
    answers: {
      slytherin: "Dragon heartstring",
      gryffindor: "Phoenix feather",
      ravenclaw: "Veela hair",
      hufflepuff: "Unicorn hair",
    },
    weight: 2,
  },
  {
    question: "What part of Hogwarts are you most eager to explore?",
    answers: {
      slytherin: "The Forbidden Forest",
      gryffindor: "The Room of Requirement",
      ravenclaw: "The Library",
      hufflepuff: "The Kitchen",
    },
    weight: 1,
  },
  {
    question: "What do you find most attractive in a partner?",
    answers: {
      slytherin: "Ambition",
      gryffindor: "Sense of adventure",
      ravenclaw: "Intellect",
      hufflepuff: "Kindness",
    },
    weight: 4,
  },
  {
    question: "Which is your favorite Dumbledore quote?",
    answers: {
      slytherin: '"It matters not what someone is born, but what they grow to be."',
      gryffindor: '"It does not do to dwell on dreams and forget to live."',
      ravenclaw: '"Words are, in my not-so-humble opinion, our most inexhaustible source of magic."',
      hufflepuff: '"Pity the living. And above all those who live without love."',
    },
    weight: 3,
  },
  {
    question: "What type of Zodiac sign do you have?",
    answers: {
      slytherin: "Fire",
      gryffindor: "Earth",
      ravenclaw: "Air",
      hufflepuff: "Water",
    },
    weight: 1,
  },
  {
    question: "How would others describe you?",
    answers: {
      slytherin: "Ambitious",
      gryffindor: "Honorable",
      ravenclaw: "Curious",
      hufflepuff: "Humble",
    },
    weight: 4,
  },
  {
    question: "What would you rather be?",
    answers: {
      slytherin: "Praised",
      gryffindor: "Respected",
      ravenclaw: "Admired",
      hufflepuff: "Trusted",
    },
    weight: 4,
  },
  {
    question:
      "You encounter a troll on a bridge you want to cross; how do you deal with it?",
    answers: {
      slytherin: "Kill it",
      gryffindor: "Fight it fairly",
      ravenclaw: "Trick it",
      hufflepuff: "Negotiate with it to let you pass",
    },
    weight: 3,
  },
  {
    question: "Which leisure activity is most appealing to you?",
    answers: {
      slytherin: "Improving myself",
      gryffindor: "Trying something new",
      ravenclaw: "Reading",
      hufflepuff: "Volunteering",
    },
    weight: 2,
  },
  {
    question: "Which of these animals would you rather have as a pet?",
    answers: {
      slytherin: "Lizard",
      gryffindor: "Dog",
      ravenclaw: "Cat",
      hufflepuff: "Bunny",
    },
    weight: 1,
  },
  {
    question:
      "If you could make a potion that would guarantee you one thing, what would it be?",
    answers: {
      slytherin: "Fame",
      gryffindor: "Respect",
      ravenclaw: "Wisdom",
      hufflepuff: "Love",
    },
    weight: 1,
  },
  {
    question:
      "You find a bag with 10,000 galleons in it; what do you do with it?",
    answers: {
      slytherin: "Keep it & tell no one",
      gryffindor: "Go to the police with it",
      ravenclaw: "Keep it & make a strategic investment",
      hufflepuff: "Try to find the owner",
    },
    weight: 3,
  },
  {
    question: "You would be most offended if someone called you...",
    answers: {
      slytherin: "Lazy",
      gryffindor: "Cowardly",
      ravenclaw: "Ignorant",
      hufflepuff: "Inconsiderate",
    },
    weight: 5,
  },
  {
    question: "What is the most likely reason you'd receive a Howler?",
    answers: {
      slytherin: "Cheating on an exam",
      gryffindor: "Sneaking into the Forbidden Forest",
      ravenclaw: "Staying in the library past closing time",
      hufflepuff: "I would never, ever receive one",
    },
    weight: 5,
  },
  {
    question: "Which of these career paths would you be most likely to pursue?",
    answers: {
      slytherin: "Minister of Magic",
      gryffindor: "Auror",
      ravenclaw: "Professor",
      hufflepuff: "Dragon Keeper",
    },
    weight: 4,
  },
  {
    question: "You notice a friend cheating on an exam; what do you do?",
    answers: {
      slytherin: "Offer to let them cheat off of your test next time",
      gryffindor: "Tell the professor",
      ravenclaw: "Offer to help them study for the next one",
      hufflepuff: "Nothing",
    },
    weight: 3,
  },
  {
    question: "Would you ever use a forbidden spell under any circumstances?",
    answers: {
      slytherin: "If it served me, & I could get away with it, yes",
      gryffindor: "To save my life or the lives of others, yes",
      ravenclaw: "I shouldn't ever need to use one",
      hufflepuff: "No, that's illegal!",
    },
    weight: 6,
  },
  {
    question: "After you have died, how do you want people to remember you?",
    answers: {
      slytherin: "Think with admiration of your achievements",
      gryffindor: "Ask for more stories about your adventures",
      ravenclaw:
        "I don't care what people think of me after I'm dead, it's what they think of me while I'm alive that counts",
      hufflepuff: "Miss you, but smile",
    },
    weight: 4,
  },
  {
    question:
      "If you could have one of these abilities, which would you choose?",
    answers: {
      slytherin: "Read others' minds",
      gryffindor: "Invisibility",
      ravenclaw: "Time travel",
      hufflepuff: "Ability to talk with animals",
    },
    weight: 1,
  },
  {
    question: "Which nightmare would frighten you most?",
    answers: {
      slytherin: "Being publicly embarrassed",
      gryffindor: "Being trapped on a high-up place with nothing to stop you from falling",
      ravenclaw: "An eye at the keyhole of the dark, windowless room in which you are locked",
      hufflepuff: "Your loved ones forget who you are",
    },
    weight: 2,
  },
  {
    question: "Choose one of these things to do for the rest of your life",
    answers: {
      slytherin: "Start your own company",
      gryffindor: "Explore the world",
      ravenclaw: "Stay in school",
      hufflepuff: "Raise a family",
    },
    weight: 5,
  },
  {
    question: "Which house do you hope to be in?",
    answers: {
      slytherin: "Slytherin",
      gryffindor: "Gryffindor",
      ravenclaw: "Ravenclaw",
      hufflepuff: "Hufflepuff",
    },
    weight: 8,
  }
]
