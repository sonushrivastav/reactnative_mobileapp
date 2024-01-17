import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FavouriteScreen = ({navigation}) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  console.log(favoriteProducts);
  return (
    <View style={styles.container}>
      <Text>{favoriteProducts}</Text>

    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
     paddingVertical:70,
  },
  
});
