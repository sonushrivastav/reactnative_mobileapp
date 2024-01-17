import React from 'react'
import {View,StyleSheet,Text} from "react-native"

const CartScreen = ({ route }) => {
  const { product } = route.params;
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
