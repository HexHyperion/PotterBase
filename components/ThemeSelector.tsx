import { useContext, useState } from "react"
import { Button } from "react-native"
import { ThemeContext } from "./ThemeContext"
import { themes } from "@/constants/Themes"


// The component responsible for changing the theme context
// I still don't know why it works, but if it does, leave it alone :P
export default function ThemeSelector() {
  const {theme, setTheme} = useContext(ThemeContext)
  return (
    <>
      <Button title="Gryffindor" color={themes["gryffindor"].color} onPress={() => setTheme("gryffindor")}></Button>
      <Button title="Slytherin" color={themes["slytherin"].color} onPress={() => setTheme("slytherin")}></Button>
      <Button title="Ravenclaw" color={themes["ravenclaw"].color} onPress={() => setTheme("ravenclaw")}></Button>
      <Button title="Hufflepuff" color={themes["hufflepuff"].color} onPress={() => setTheme("hufflepuff")}></Button>
      <Button title="Neutral" color={themes["disabled"].color} onPress={() => setTheme("neutral")}></Button>
    </>
  )
}