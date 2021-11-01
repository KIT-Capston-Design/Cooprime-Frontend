import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useFonts from "../../hooks/useFonts";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HeaderBar() {
	const [isReady, setIsReady] = useState(false);

	const LoadFonts = async () => {
		await useFonts();
	};

	if (!isReady) {
		return (
			<AppLoading
				startAsync={LoadFonts}
				onFinish={() => setIsReady(true)}
				onError={() => {}}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Coprime</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.15,
		borderBottomColor: "#aaaaaa",
		borderBottomWidth: 0.5,
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		paddingTop: width / 20,
		fontSize: width / 10,
		fontFamily: "DancingScript-Bold",
	},
});
