import React from "react";
import { View, StyleSheet } from "react-native";

export default function GroupCall({ navigation }) {
  const disconnect = () => {
    navigation.navigate("Calling");
    console.log("disconnect");
  };

  return (
    <View style={styles.container}>
      <View style={styles.callSetting}>
        <TouchableOpacity style={styles.muteBtn} onPress={muteSound}>
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
  );
}

const styles = StyleSheet.create({
  container: {},
});
