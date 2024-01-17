import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import CategorieScreen from "./screens/CategorieScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import MoreScreen from "./screens/MoreScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import { FavoriteProvider, useFavoriteContext } from "./context/FavouriteContext";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      position: "relative",
      backgroundColor: focused ? "#000" : "transparent",
      borderRadius: 50,
      padding: 18,
      bottom: focused ? 20 : 0,
    }}
  >
    {name === "Home" ? (
      <AntDesign
        name={name.toLowerCase()}
        size={size}
        color={focused ? "#FFD700" : "#000"}
      />
    ) : name === "Categories" ? (
      <Ionicons
        name="grid-outline"
        size={size}
        color={focused ? "#FFD700" : "#000"}
      />
    ) : name === "Favourite" ? (
      <Fontisto
        name="heart-alt"
        size={size}
        color={focused ? "#FFD700" : "#000"}
      />
    ) : (
      <Feather
        name="more-vertical"
        size={size}
        color={focused ? "#FFD700" : "#000"}
      />
    )}
    {!focused && (
      <Text style={{ fontSize: 12, color: "#8891A5" }}>{label}</Text>
    )}
  </View>
);

const Hometabs = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      // options={{ tabBarIcon: ({ focused }) => <TabIcon name="Home" size={24} focused={focused} label="Home" /> }}
      options={({ navigation }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name="Home" size={24} focused={focused} label="Home" />
        ),
      })}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            name="Categories"
            size={24}
            focused={focused}
            label="Categories"
          />
        ),
      }}
      name="Categories"
      component={CategorieScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            name="Favourite"
            size={21}
            focused={focused}
            label="Favourite"
          />
        ),
      }}
      name="Favourite"
      component={FavouriteScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon name="More" size={24} focused={focused} label="More" />
        ),
      }}
      name="More"
      component={MoreScreen}
    />
  </Tab.Navigator>
);

export default function App() {

  return (
    <FavoriteProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={Hometabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailScreen}
          options={({ navigation }) => ({
            title: "", 
            headerRight: () => (
              <TouchableOpacity style={{position:"relative", paddingHorizontal:5}}>
                <SimpleLineIcons name="handbag" size={24} color="black" />
                <Text style={styles.cartNumber}>2</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CartDetails"
          component={CartScreen}
          options={({ navigation }) => ({
            title: "", 
            headerRight: () => (
              
                <Text style={{marginRight:"50%" , color:"#1E222B", fontSize:20,width:190}}>Shopping Cart (5)</Text>
            ),
          })}
        />
      </Stack.Navigator>
      </NavigationContainer>
      </FavoriteProvider>
  );
}

const styles = StyleSheet.create({
  cartNumber: {
    backgroundColor: "#F9B023",
    height: 24,
    width: 24,
    borderRadius: 50,
    color: "#fff",
    left: 8,
    bottom: 0,
    top: -8,
    fontSize: 15,
    position: "absolute",
    fontWeight: "600",
    textAlign: "center",
  },
})