import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BottomBar() {
  return (
    <View style={styles.container}>
      <Text>BottomBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    fontSize: 50,
    backgroundColor: "#0000ff",
  },
});
