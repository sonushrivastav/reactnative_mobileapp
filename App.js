import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import CategorieScreen from "./screens/CategorieScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import MoreScreen from "./screens/MoreScreen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff", 
  },
};

const TabIcon = ({ name, size, focused, label }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      position:"relative",
      backgroundColor: focused ? "#000" : "transparent", 
      borderRadius: 50,
      padding: 18,
      bottom: focused ? 20 : 0,
    }}
  >
    {name === "Home" ? (
      <AntDesign name={name.toLowerCase()} size={size} color={focused ? "#FFD700" : "#000"} />
    ) : name === "Categories" ? (
      <Ionicons name="grid-outline" size={size} color={focused ? "#FFD700" : "#000"} />
    ) : name === "Favourite" ? (
      <Fontisto name="heart-alt" size={size} color={focused ? "#FFD700" : "#000"} />
    ) : (
      <Feather name="more-vertical" size={size} color={focused ? "#FFD700" : "#000"} />
    )}
    {!focused && <Text style={{ fontSize: 12, color: "#8891A5" }}>{label}</Text>}
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          options={{ tabBarIcon: ({ focused }) => <TabIcon name="Home" size={24} focused={focused} label="Home" /> }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ focused }) => <TabIcon name="Categories" size={24} focused={focused} label="Categories" /> }}
          name="Categories"
          component={CategorieScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ focused }) => <TabIcon name="Favourite" size={21} focused={focused} label="Favourite" /> }}
          name="Favourite"
          component={FavouriteScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ focused }) => <TabIcon name="More" size={24} focused={focused} label="More" /> }}
          name="More"
          component={MoreScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
