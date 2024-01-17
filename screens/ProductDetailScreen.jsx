import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFavoriteContext } from "../context/FavouriteContext";

const ProductDetailScreen = ({ route }) => {
  const { favoriteProducts, addFavorite, removeFavorite } = useFavoriteContext();

  const { product } = route.params;
  const navigation = useNavigation();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product?.rating);
    const hasHalfStar = product?.rating % 1 !== 0;

    // Render full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <Ionicons
          key={i}
          name="star"
          size={24}
          color="#FFD700" // Yellow color for full stars
        />
      );
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key="half-star"
          name="star-half"
          size={24}
          color="#FFD700" // Yellow color for half star
        />
      );
    }

    // Render remaining black stars
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-star-${i}`}
          name="star-sharp"
          size={24}
          color="#000" // Black color for remaining stars
        />
      );
    }

    return stars;
  };
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < product?.images.length - 1) {
        carouselRef.current.snapToNext();
      } else {
        carouselRef.current.snapToItem(0);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, product?.images?.length]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  const handleButtonPress = (index) => {
    carouselRef.current.snapToItem(index);
    setCurrentIndex(index);
  };

  const [heart, setHeart] = useState(false);
  const handleFavourite = (index) => {
    // product?.filter((prdct) => {
    //   prdct?.id;
    // });
    setHeart(!heart);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "black", fontSize: 50, fontWeight: 300 }}>
        {product?.title}
      </Text>
      <Text style={{ color: "black", fontSize: 50, fontWeight: "bold" }}>
        {product?.brand}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#A1A1AB", fontSize: 17, fontWeight: 400 }}>
          {renderStars()} {product?.stock} Stock
        </Text>
      </View>

      <View style={{ position: "relative" }}>
        <Carousel
          ref={carouselRef}
          data={product?.images}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
        <TouchableOpacity
          onPress={() => handleFavourite(product?.id)}
          style={{
            position: "absolute",
            right: "10%",
            top: 30,
          }}
        >
          {heart ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {product?.images?.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                currentIndex === index
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handleButtonPress(index)}
            >
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          ))}
        </View>
          </View>
          
          <View style={{flexDirection:"row",gap:20, marginTop:40}}>
              <Text style={{ color: "#2A4BA0", fontSize: 20, fontWeight: 700 }}>${product?.price}</Text>
              <View style={{backgroundColor:"#2A4BA0", alignItems:"center", justifyContent:"center", borderRadius:70,paddingHorizontal:20,paddingVertical:4}}>
              <Text style={{color:"#fff",fontSize:16, textAlign:"center",fontWeight:400}}>${ product?.discountPercentage} OFF</Text>
              </View>
          </View>

          <View style={{flexDirection:"row",gap:20, marginTop:30}}>
              <TouchableOpacity
              onPress={() => navigation.navigate("CartDetails", { product:product })}
                  
                  style={{
                  width: 180,
                  height: 56,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#2A4BA0",
                  alignItems: "center",
                  justifyContent:"center"
                  }}
              >
                  <Text style={{color:"#2A4BA0",fontSize:16, fontWeight:"600"}}>Add To Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                  width: 180,
                  height: 56,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#2A4BA0",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#2A4BA0",
              }}>
                 <Text style={{color:"#fff",fontSize:16, fontWeight:"600"}}> Buy Now </Text>
              </TouchableOpacity>
          </View>

          <Text style={{color:"#1E222B", fontSize:20,fontWeight:400,marginTop:20}}>Details</Text>
          <Text style={{ color: "#8891A5", fontSize: 20, fontWeight: 400, marginTop: 10 }}>{ product?.description}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    
  },
  item: {
    borderRadius: 8,
    height: 200,
    width: 380,
    margin: 8,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 380,
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "start",
    marginTop: 16,
  },
  button: {
    borderRadius: 30,
    marginHorizontal: 4,
    width: 30,
    height: 10,
  },
  activeButton: {
    backgroundColor: "#F9B023",
  },
  inactiveButton: {
    backgroundColor: "gray",
  },
});
