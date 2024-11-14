import { useContext, useState } from "react";
import { Button } from "react-native";
import { Theme, ThemeContext } from "./ThemeContext";
import themes from "@/constants/Themes";

export default function ThemeSelector() {
    const {theme, setTheme} = useContext(ThemeContext)
    return (
        <>
            <Button title={`Gryffindor`} onPress={() => setTheme("gryffindor")}></Button>
            <Button title={`Slytherin`} onPress={() => setTheme("slytherin")}></Button>
            <Button title={`Ravenclaw`} onPress={() => setTheme("ravenclaw")}></Button>
            <Button title={`Hufflepuff`} onPress={() => setTheme("hufflepuff")}></Button>
            <Button title={`Muggle`} onPress={() => setTheme("neutral")}></Button>
        </>
    )
}