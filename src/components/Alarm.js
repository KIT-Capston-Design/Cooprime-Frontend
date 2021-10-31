import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Alarm() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>Alarm</Text>
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
});
