import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import nodata from "../assets/noproducts.jpg"
const CategorieScreen = () => {
  return (
    <View style={styles.container}>
    <Text style={{fontSize:50}}>Oops!</Text>
                    <Image source={ nodata} style={{height:250, width:350, objectFit:"contain"}} />
  </View>
  )
}

export default CategorieScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent:"center"
    }
})