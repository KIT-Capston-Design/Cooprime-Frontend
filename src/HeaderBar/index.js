import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    fontSize: 50,
    backgroundColor: "#00ff00",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
