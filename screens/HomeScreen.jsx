import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import image from "../assets/ImageIcon.png";
const HomeScreen = () => {
  const [product, setProduct] = useState([]);

  const fecthProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      if (response.data) {
        setProduct(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthProduct();
  }, []);

  const [heart,setHeart] = useState(false)
  const handleFavourite = () => {
    console.log('handleFavourite called');
    setHeart(!heart)
  }

  const OfferArray = [
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
    {
      offer: "50% OFF",
      order: "On first 02 order",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.name}>Hey, Rahul</Text>
          <View style={styles.cart}>
            <SimpleLineIcons name="handbag" size={24} color="#fff" />
            <Text style={styles.cartNumber}>3</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search Products or store"
            placeholderTextColor="#8891A5"
          />
          <Ionicons
            style={styles.searchicon}
            name="search-outline"
            size={24}
            color="black"
          />
        </View>

        <View style={styles.wrapper}>
          <View style={{ gap: 2 }}>
            <Text
              style={{
                color: "#F8F9FB",
                fontSize: 11,
                fontWeight: 800,
                opacity: 0.5,
              }}
            >
              DELIVERY TO
            </Text>

            <Text style={{ color: "#F8F9FB", fontSize: 14, fontWeight: 500 }}>
              Green Way 3000, Sylhet ^
            </Text>
          </View>
          <View style={{ gap: 2 }}>
            <Text
              style={{
                color: "#F8F9FB",
                fontSize: 11,
                fontWeight: 800,
                opacity: 0.5,
              }}
            >
              WITHIN
            </Text>
            <Text style={{ color: "#F8F9FB", fontSize: 14, fontWeight: 500 }}>
              1 Hour ^
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.horizontalWrapper}>
        <FlatList
          horizontal={true}
          data={OfferArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer} key={index}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  padding: 20,
                }}
              >
                <Image
                  style={{ height: 86, width: 86, objectFit: "contain" }}
                  source={image}
                />
                <View>
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: 300 }}
                  >
                    Get
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 25, fontWeight: 900 }}
                  >
                    {item?.offer}
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: 300 }}
                  >
                    {item?.order}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <Text
        style={{
          color: "#1E222B",
          marginTop: -20,
          fontSize: 30,
          fontWeight: "400",
          paddingHorizontal: 15,
        }}
      >
        Recommended
      </Text>

      <ScrollView contentContainerStyle={styles.productContainer}>
        {product?.map((elem, index) => {
          return (
            <View style={styles.itemList} key={index}>
              <Image
                source={{ uri: elem?.thumbnail }}
                style={{
                  height: "100%",
                  opacity: 0.5,
                  width: "100%",
                  borderRadius: 11,
                  objectFit: "cover",
                }}
              />
   
              <TouchableOpacity onPress={handleFavourite} style={{
                position: "absolute",
                left:15,
                top:15,
              }}>
                {
                  heart ? 
              (<AntDesign name="heart" size={24} color="red" />) :
              (<AntDesign  name="hearto" size={24} color="black" /> )
                }
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.OS === "android" ? 60 : 0,
    gap: 32,
  },
  mainContainer: {
    backgroundColor: "#2A4BA0",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 30,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "#f8f9fb",
    fontSize: 22,
    fontWeight: "600",
  },
  searchicon: {
    position: "absolute",
    color: "#F8F9FB",
    left: 20,
    top: 22,
  },
  cart: {
    position: "relative",
  },
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
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#153075",
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 20,
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  horizontalWrapper: {
    flexDirection: "row",
    paddingVertical: 5,
    overflow: "scroll",
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: "#F9B023",
    borderRadius: 16,
    width: 269,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
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
    width: 175,
    height: 210,
    borderRadius: 12,
    backgroundColor: "#F8F9FB",
    position:"relative"
  },
});
