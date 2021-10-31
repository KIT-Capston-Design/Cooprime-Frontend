import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OneToOneCall from "./OneToOneCall";
import GroupCall from "./GroupCall";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Calling({ navigation }) {
  const startOneToOneCall = () => {
    // 일대일 통화 시작
    navigation.navigate("OneToOne"); // 일대일 통화 페이지로 이동
  };

  const startGroupCall = () => {
    // 그룹 통화 시작
    navigation.navigate("Group"); // 그룹 통화 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.justTwo} onPress={startOneToOneCall}>
        <Text>Just Two</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.groupCall} onPress={startGroupCall}>
        <Text>Group Call</Text>
      </TouchableOpacity>
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
