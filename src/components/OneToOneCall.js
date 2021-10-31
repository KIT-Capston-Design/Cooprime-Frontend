import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";

//socket context api
import SocketContext from "../Contexts/socket";

import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export default function OneToOneCall({ navigation }) {
	const socket = io(URL);

	function test() {
		console.log(socket);
		socket.emit("test", "Helloworld");
	}

	const iconSize = 30;
	const muteSound = () => {
		Alert.alert("mute sound?", "Are you sure?", [
			{ text: "Cancel" },
			{
				text: "I'm Sure",
				style: "destructive",
			},
		]);
	};
	const videoOff = () => {
		Alert.alert("video off?", "Are you sure?", [
			{ text: "Cancel" },
			{
				text: "I'm Sure",
				style: "destructive",
			},
		]);
	};
	const disconnect = () => {
		/* 피어간 연결 종료 로직 */

		navigation.navigate("Calling");
		console.log("disconnect");
	};
	useEffect(() => {
		connectPeer();
	}, []);
	const connectPeer = async () => {
		try {
			console.log("inside connectPeer method");
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.videoContainer}>
				<View style={styles.localVideos}>
					<Text>My Video</Text>
					{/* 아래의 View를 RTCView로 변경해야함 */}
					<View style={styles.localVideo}></View>
				</View>

				<View style={styles.remoteVideos}>
					<Text>Friends Video</Text>
					{/* 아래의 View를 RTCView로 변경해야함 */}
					<View style={styles.remoteVideo}></View>
				</View>

				<View style={styles.callSetting}>
					<TouchableOpacity style={styles.muteBtn} onPress={test}>
						<Octicons name="mute" size={iconSize} color="black" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.videoOffBtn} onPress={videoOff}>
						<Feather name="video" size={iconSize} color="black" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
						<Feather name="x-circle" size={iconSize} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffff00",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	videoContainer: {
		flex: 1,
	},
	localVideos: {
		flex: 1,
		position: "absolute",
		overflow: "hidden",
		borderRadius: 6,
		height: "20%",
		width: "25%",
		marginBottom: 10,
		backgroundColor: "#aaaaaa",
		zIndex: 1,
	},
	remoteVideos: {
		width: "100%",
		flex: 1,
		position: "relative",
		overflow: "hidden",
		borderRadius: 6,
		height: 400,
	},
	localVideo: {
		height: "100%",
		width: "100%",
		backgroundColor: "#009999",
	},
	remoteVideo: {
		height: "100%",
		width: "100%",
		backgroundColor: "#ff0000",
	},
	callSetting: {
		backgroundColor: "#ff00ff",
		flex: 0.2,
		marginTop: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
	},
	muteBtn: { backgroundColor: "#ff0000" },
	videoOffBtn: { backgroundColor: "#00ff00" },
	disconnectBtn: { backgroundColor: "#0000ff" },
});
