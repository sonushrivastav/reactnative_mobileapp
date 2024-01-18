import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavoriteContext } from "../context/FavouriteContext";
import { Image } from "react-native";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import nodata from "../assets/noproducts.jpg"
const FavouriteScreen = () => {
  const { favoriteProducts, addFavorite, removeFavorite } =
    useFavoriteContext();

  console.log(favoriteProducts);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.productContainer}>
        
        { favoriteProducts?.length > 0 ?
          favoriteProducts?.map((elem, index) => {
          return (
            <View style={styles.itemList} key={index}>
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: elem?.thumbnail }}
                  style={{
                    height: "70%",
                    opacity: 0.6,
                    width: "100%",
                    borderRadius: 11,
                    objectFit: "contain",
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    left: 15,
                    top: 15,
                  }}
                >
                  <AntDesign
                    name={
                      favoriteProducts.some((product) => product.id === elem.id)
                        ? "heart"
                        : "hearto"
                    }
                    size={24}
                    color={
                      favoriteProducts.some((product) => product.id === elem.id)
                        ? "red"
                        : "black"
                    }
                  />
                </View>

                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 15 }}
                  onPress={() => removeFavorite(elem?.id)}
                >
                  <Text>
                    <Ionicons name="close" size={24} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#1E222B",
                    position: "absolute",
                    top: -15,
                    left: 16,
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  ${elem?.price}
                </Text>

                <TouchableOpacity
                  style={{ position: "absolute", right: 8, top: -15 }}
                >
                  <Ionicons name="add-circle" size={34} color="#2A4BA0" />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#616A7D",
                  position: "absolute",
                  fontSize: 14,
                  top: "80%",
                  left: 18,
                  fontWeight: "400",
                  width: 130,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {elem?.title}
              </Text>
            </View>
          );
          }) : (
            <View style={styles.nodata}>
            <Text style={{fontSize:50}}>Oops!</Text>
                    <Image source={ nodata} style={{height:250, width:350, objectFit:"contain"}} />
            </View>
        )
        }
      </ScrollView>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  nodata: {
    flex:1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:800
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    overflow: "scroll",
    paddingHorizontal: 15,
  },
  itemList: {
    width: 375,
    height: 310,
    borderRadius: 12,
    backgroundColor: "#F8F9FB",
  },
});
