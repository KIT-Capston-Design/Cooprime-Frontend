import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OneToOneCalling from "./OneToOneCall";

export default function Calling() {
  const startGroupCall = () => {
    console.log("start group call");
  };

  const startJustTwo = () => {
    console.log("start just two1");
  };

  return (
    <View style={styles.container}>
      <OneToOneCalling />
      {/* <TouchableOpacity style={styles.justTwo} onPress={() => startJustTwo()}>
        <Text>Just Two</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.groupCall}
        onPress={() => startGroupCall()}
      >
        <Text>Group Call</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  justTwo: {
    width: 105,
    height: 210,
    borderRadius: 150,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },
  groupCall: {
    width: 105,
    height: 210,
    borderRadius: 150,
    backgroundColor: "#ff00ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
