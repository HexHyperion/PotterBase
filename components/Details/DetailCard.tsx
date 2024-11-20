import { fieldNames, houses, PotterObject, Theme } from "@/constants/Types";
import { ScrollView, View, Image, Text, ImageBackground } from "react-native";
import Space from "../Space";
import { getImage, getData, getHouseColor } from "./DetailFunctions";
import DetailList from "./DetailList";
import detailStyles from "./DetailStyles";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { themes } from "@/constants/Themes";
import LinearGradient from "react-native-linear-gradient";
import images from "@/constants/Images";

export function DetailCard({object, labelsInline, labelsInside, labelsOutside, collapsibles, imageStyles, imageViewStyles}: {object: PotterObject, labelsInline: string[], labelsInside?: string[], labelsOutside?: string[], collapsibles?: string[], imageStyles: object, imageViewStyles?: object}) {
	const theme = useContext(ThemeContext).theme
	const lightBackground = themes[theme].lightBackground
	const background = themes[theme].background
	const darkBackground = themes[theme].darkBackground

	return (
		<ScrollView style={detailStyles.wrapper}>
			<View style={[detailStyles.cardWrapper, {backgroundColor: background}]}>
				<View style={[detailStyles.card, {backgroundColor: lightBackground}]}>
					<View style={detailStyles.cardInline}>
						<View style={imageViewStyles ?? {}}>
							<Image source={getImage(object, fieldNames.image[object.type])} style={imageStyles}/>
						</View>
						<View style={{flex: 99}}>
							<Text style={detailStyles.header}>{getData(object, fieldNames.header[object.type])}</Text>
							<Space/>
							<DetailList object={object} labels={labelsInline} collapsibles={[]}/>
						</View>
					</View>
					{labelsInside && (
						<>
						<Space/>
						<DetailList object={object} labels={labelsInside} collapsibles={[]}/>
					</>
					)}
				</View>
				{labelsOutside || collapsibles && (
					<View style={detailStyles.cardOutside}>
						<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
					</View>
				)}
			</View>
		</ScrollView>
	)
}

export function DetailCardGradient({object, labelsInline, labelsInside, labelsOutside, collapsibles, imageStyles, gradient}: {object: PotterObject, labelsInline: string[], labelsInside?: string[], labelsOutside?: string[], collapsibles?: string[], imageStyles: object, gradient: string[]}) {
	const theme = useContext(ThemeContext).theme
	const lightBackground = themes[theme].lightBackground
	const background = themes[theme].background
	const darkBackground = themes[theme].darkBackground
	const attributes = object.attributes as any
	let dimGradient = false
	let houseColor = ""

	if (object.type == "character") {
		houseColor = getHouseColor(object)
	}
	else if (!gradient.includes(lightBackground)) dimGradient = true

	return (
		<ScrollView style={detailStyles.wrapper}>

			{/* Background for the entire card */}
			<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={dimGradient ? gradient : (houseColor != "" ? ["transparent", "transparent"] : [background, background])} style={[detailStyles.cardWrapper, {backgroundColor: houseColor != "" ? houseColor : "transparent"}]}>

				{/* Heavy dimmer for the whole card */}
				<View style={{borderRadius: 9, overflow: "hidden", backgroundColor: dimGradient ? "#000000e0" : "transparent"}}>

					{/* Brighter background for the small card */}
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradient} style={[detailStyles.cardBackground, {backgroundColor: lightBackground}]}>

						{/* If character has a house - background, otherwise transparent */}
						<ImageBackground source={images[((attributes.house && houses.includes(attributes.house) ? attributes.house : "neutral")).toLowerCase() as Theme].background} style={{borderRadius: 10}}>

							{/* Light dimmer for the small card */}
							<View style={[detailStyles.cardDimmer, {backgroundColor: dimGradient ? "#000000aa" : "transparent"}]}>

								<View style={detailStyles.cardInline}>
									<Image source={getImage(object, fieldNames.image[object.type])} style={imageStyles}/>
									<View style={{flex: 99}}>
										<Text style={detailStyles.header}>{getData(object, fieldNames.header[object.type])}</Text>
										<Space/>
										<DetailList object={object} labels={labelsInline} collapsibles={[]}/>
									</View>
								</View>
								{labelsInside && (
								<>
									<Space/>
									<DetailList object={object} labels={labelsInside} collapsibles={[]}/>
								</>
								)}
							</View>
						</ImageBackground>
					</LinearGradient>

					{/* Stuff outside the small card */}
					{(labelsOutside || collapsibles) && (
						<View style={detailStyles.cardOutside}>
							<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
						</View>
					)}
				</View>
			</LinearGradient>
		</ScrollView>
	)
}