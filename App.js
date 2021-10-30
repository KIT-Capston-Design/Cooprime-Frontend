import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderBar from "./src/HeaderBar";
import Calling from "./src/Calling";
import BottomBar from "./src/BottomBar";

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <Calling />
      <BottomBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  // header: {
  //   flex: 1,
  //   backgroundColor: "#00ff00",
  //   fontSize: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
