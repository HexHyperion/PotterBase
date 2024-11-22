import { fieldNames, houses, PotterObject, Theme } from "@/constants/Types"
import { ScrollView, View, Image, Text, ImageBackground } from "react-native"
import Space from "@/components/Space"
import { getImage, getData, getHouseColor } from "./DetailFunctions"
import DetailList from "./DetailList"
import detailStyles from "./DetailStyles"
import { useContext } from "react"
import { ThemeContext } from "@/components/ThemeContext"
import { themes } from "@/constants/Themes"
import LinearGradient from "react-native-linear-gradient"
import images from "@/constants/Images"
import { Href, Link } from "expo-router"


// Normal card containing the details for books or movies
// Labels can be placed on the right of the picture, at the bottom of the small card, or outside the small card
// Collapsibles go only outside of the card
export function DetailCard({object, labelsInline, labelsInside, labelsOutside, collapsibles, imageStyles, imageViewStyles}: {object: PotterObject, labelsInline: string[], labelsInside?: string[], labelsOutside?: string[], collapsibles?: string[], imageStyles: object, imageViewStyles?: object}) {
	const theme = useContext(ThemeContext).theme
	const lightBackground = themes[theme].lightBackground
	const background = themes[theme].background
	const darkBackground = themes[theme].darkBackground

	return (
		<ScrollView style={detailStyles.wrapper}>

			{/* Background for the entire card */}
			<View style={[detailStyles.cardWrapper, {backgroundColor: background}]}>

				{/* Brighter background for the small card */}
				<View style={[detailStyles.card, {backgroundColor: lightBackground}]}>
					<View style={detailStyles.cardInline}>

						{/* The image, I truly hate the person who put those stupid frames around movie posters */}
						<View style={imageViewStyles ?? {}}>
							<Image
								source={getImage(object, fieldNames.image[object.type])}
								style={imageStyles}
							/>
						</View>

						{/* The header and the labels on the right of the image */}
						<View style={{flex: 99}}>
							<Text style={detailStyles.header}>{getData(object, fieldNames.header[object.type])}</Text>
							<Space/>
							<DetailList object={object} labels={labelsInline} collapsibles={[]}/>
						</View>

					</View>

					{/* Labels inside the card, but under the image */}
					{labelsInside && (
						<>
							<Space/>
							<DetailList object={object} labels={labelsInside} collapsibles={[]}/>
						</>
					)}
				</View>

				{/* Labels outside the card and collapsibles */}
				{/* If there's none just the wiki link that's present everywhere but chapters */}
				{(labelsOutside || collapsibles) ? (
					<View style={detailStyles.cardOutside}>
						<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
						{(object.type != "chapter") && (
              <>
								<Space/>
								<Text style={detailStyles.text}><Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>Wiki: </Text><Link style={{textDecorationLine: "underline"}} href={object.attributes.wiki as Href}>{getData(object, fieldNames.header[object.type])} on Fandom</Link></Text>
							</>
              // Ah yes, I love when the emulator kills itself and bluescreens my entire PC every time Chrome is opened
						)}
					</View>
				) : (object.type != "chapter") && (
					<View style={detailStyles.cardOutside}>
						<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
						<Text style={detailStyles.text}><Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>Wiki: </Text><Link style={{textDecorationLine: "underline"}} href={object.attributes.wiki as Href}>{getData(object, fieldNames.header[object.type])} on Fandom</Link></Text>
					</View>
				)}
			</View>
		</ScrollView>
	)
}


// Card with gradient or color read off characters, potions and spells
// Rules are the same like with the normal card, but a gradient in the form of 2+ long array can be passed too
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
	else if (!gradient.includes(lightBackground)) {
		dimGradient = true
	}

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

									<Image
										source={getImage(object, fieldNames.image[object.type])}
										style={imageStyles}
									/>

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
					{(labelsOutside || collapsibles) ? (
            <View style={detailStyles.cardOutside}>
              <DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
              {(object.type != "chapter") && (
                <>
                  <Space/>
                  <Text style={detailStyles.text}><Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>Wiki: </Text><Link style={{textDecorationLine: "underline"}} href={object.attributes.wiki as Href}>{getData(object, fieldNames.header[object.type])} on Fandom</Link></Text>
                </>
                // Ah yes, I love when the emulator kills itself and bluescreens my entire PC every time Chrome is opened
              )}
            </View>
          ) : (object.type != "chapter") && (
            <View style={detailStyles.cardOutside}>
              <DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
              <Text style={detailStyles.text}><Text style={[detailStyles.text, {fontFamily: "Grenze-Bold", fontSize: 16}]}>Wiki: </Text><Link style={{textDecorationLine: "underline"}} href={object.attributes.wiki as Href}>{getData(object, fieldNames.header[object.type])} on Fandom</Link></Text>
            </View>
          )}
				</View>
			</LinearGradient>
		</ScrollView>
	)
}