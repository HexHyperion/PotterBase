import { fieldNames, PotterObject } from "@/constants/Types";
import { ScrollView, View, Image, Text } from "react-native";
import Space from "../Space";
import { getImage, getData } from "./DetailFunctions";
import DetailList from "./DetailList";
import detailStyles from "./DetailStyles";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { themes } from "@/constants/Themes";
import LinearGradient from "react-native-linear-gradient";

export function DetailCard({object, labelsInline, labelsInside, labelsOutside, collapsibles, imageStyles, imageViewStyles}: {object: PotterObject, labelsInline: string[], labelsInside?: string[], labelsOutside?: string[], collapsibles?: string[], imageStyles: object, imageViewStyles?: object}) {
	const theme = useContext(ThemeContext).theme
	const lightBackground = themes[theme].lightBackground
	const accent = themes[theme].accent

	return (
		<ScrollView style={detailStyles.wrapper}>
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
					<DetailList object={object} labels={labelsInside} collapsibles={[]}></DetailList>
				</>
				)}
			</View>
			{labelsOutside || collapsibles && (
				<View style={detailStyles.cardOutside}>
					<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}></DetailList>
				</View>
				)}
		</ScrollView>
	)
}

export function DetailCardGradient({object, labelsInline, labelsInside, labelsOutside, collapsibles, imageStyles, gradient}: {object: PotterObject, labelsInline: string[], labelsInside?: string[], labelsOutside?: string[], collapsibles?: string[], imageStyles: object, gradient: string[]}) {
	const theme = useContext(ThemeContext).theme
	const lightBackground = themes[theme].lightBackground

	return (
		<ScrollView style={detailStyles.wrapper}>
			<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={gradient} style={[detailStyles.cardBackground]}>
				<View style={detailStyles.cardDimmer}>
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
						<DetailList object={object} labels={labelsInside} collapsibles={[]}></DetailList>
					</>
					)}
				</View>
			</LinearGradient>
			{(labelsOutside || collapsibles) && (
				<View style={detailStyles.cardOutside}>
					<DetailList object={object} labels={labelsOutside ?? []} collapsibles={collapsibles ?? []}/>
				</View>
			)}
		</ScrollView>
	)
}