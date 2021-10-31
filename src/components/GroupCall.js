import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function GroupCall({ navigation }) {
  const iconSize = 30;
  const disconnect = () => {
    navigation.navigate("Calling");
    console.log("disconnect");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>그룹 통화</Text>
      <TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
        <Feather name="x-circle" size={iconSize} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
  disconnectBtn: { backgroundColor: "#0000ff" },
});
