import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import HeaderBar from "./src/components/layouts/HeaderBar";
import BottomBar from "./src/components/layouts/BottomBar";
import Calling from "./src/components/Calling";
import OneToOneCall from "./src/components/OneToOneCall";
import GroupCall from "./src/components/GroupCall";
import Alarm from "./src/components/Alarm";
import Chatting from "./src/components/Chatting";
import Profile from "./src/components/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeTab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 30;
          if (route.name === "Calling") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chatting") {
            iconName = focused ? "chat" : "chat-outline";
          } else if (route.name === "Alarm") {
            iconName = focused ? "bell" : "bell-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-box" : "account-box-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <HomeTab.Screen name="Calling" component={Calling} />
      <HomeTab.Screen name="Chatting" component={Chatting} />
      <HomeTab.Screen name="Alarm" component={Alarm} />
      <HomeTab.Screen name="Profile" component={Profile} />
    </HomeTab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <HeaderBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="OneToOne" component={OneToOneCall} />
          <Stack.Screen name="Group" component={GroupCall} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
