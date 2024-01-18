import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useFavoriteContext } from "../context/FavouriteContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import nodataimg from "../assets/noproducts.jpg"
const CartScreen = ({ route }) => {
  const { product } = route.params;
  const { cart, removeCart } = useFavoriteContext();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 0) + amount;
      return {
        ...prevQuantities,
        [productId]: newQuantity < 1 ? 1 : newQuantity,
      };
    });
  };

  const getItemQuantity = (itemId) => quantities[itemId] || 1;

  const calculateSubtotal = (itemId) => {
    const quantity = getItemQuantity(itemId);
    const item = cart.find((cartItem) => cartItem.id === itemId);
    return item ? quantity * item.price : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item.id), 0);
  };
  return (
    <View style={styles.container}>
      {cart?.length > 0 ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollcontainer}>
          {
            cart?.map((item) => {
              const quantity = getItemQuantity(item.id);
            const subtotal = calculateSubtotal(item.id);
              return (
                <>
                  <View style={styles.itemContainer}>
                    <View
                      style={{
                        gap: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item?.thumbnail }}
                        style={{ height: 80, width: 80, borderRadius: 10 }}
                      />
                      <View style={{ gap: 10 }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: "#1E222B",
                            fontSize: 19,
                            fontWeight: "500",
                            width: 150,
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Text
                          style={{
                            color: "#1E222B",
                            fontSize: 19,
                            fontWeight: "500",
                          }}
                        >
                          ${item?.price}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, -1)}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 19 }}>{ quantity}</Text>
                      <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, 1)}
                      >
                        <Ionicons name="add" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeCart(item?.id)}
                      style={{ position: "absolute", right: -10, top: -15 }}
                    >
                      <Ionicons name="close-outline" size={34} color="red" />
                    </TouchableOpacity>
                  </View>
                </>
              );
            })}
        </ScrollView>
      ) : (
        <>
          <View style={styles.nodata}>
              <Image source={ nodataimg} style={{height:250, width:350, objectFit:"contain"}} />
          </View>
        </>
      )}

      <View style={{
        flexDirection: "column",
        gap: 10,
        height: 200,
        padding:20
      }}>
        <View style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        }}>
          <Text style={{color:"#616A7D", fontWeight:"400",fontSize:17}}>Subtotal</Text>
          <Text style={{ color: "#1E222B", fontWeight: "500", fontSize: 20 }}>${calculateTotal()}</Text>
       </View>
       <View style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        }}>
          <Text style={{color:"#616A7D", fontWeight:"400",fontSize:17}}>Delivery</Text>
          <Text style={{color:"#1E222B", fontWeight:"500",fontSize:20}}>$0</Text>
        </View>
        <View style={{
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        }}>
          <Text style={{color:"#616A7D", fontWeight:"400",fontSize:17}}>Total</Text>
          <Text style={{ color: "#1E222B", fontWeight: "500", fontSize: 20 }}>${calculateTotal()}</Text>
       </View>
      </View>

      <TouchableOpacity style={{height:60,alignItems:"center" ,justifyContent:"center",backgroundColor:"#2A4BA0", borderRadius:20, }}>
        <Text style={{color:"#fff", fontWeight:"600",fontSize:19,}}>Proceed To Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:30,
    backgroundColor: "#fff",
  },
  nodata: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 800,
  },
  itemContainer: {
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollcontainer: {
    flexDirection: "column",
    overflow: "scroll",
    gap: 20,
    flexGrow:1,
    paddingVertical: 15,
  },
  

});

