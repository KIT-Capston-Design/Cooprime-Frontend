import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import HeaderBar from "./src/components/layouts/HeaderBar";
import BottomBar from "./src/components/layouts/BottomBar";
import Calling from "./src/components/Calling";
import OneToOneCall from "./src/components/OneToOneCall";
import GroupCall from "./src/components/GroupCall";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* 페이지 전환 Navigation 예제
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details Screen</Text>
    <Button
    title="Go to Details... again"
    onPress={() => navigation.push("Details")}
    />
    <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    <Button title="Go back" onPress={() => navigation.goBack()} />
    <Button
    title="Go back to first screen in stack"
    onPress={() => navigation.popToTop()}
    />
    </View>
    );
  }

      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  */

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Calling"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Calling" component={Calling} />
          <Stack.Screen name="OneToOne" component={OneToOneCall} />
          <Stack.Screen name="Group" component={GroupCall} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
  },
});
