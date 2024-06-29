import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={{backgroundColor:"black", flex:1, justifyContent:'center'}}>
      <Image source={require('../Images/Sun.png')} style={{height:200, width:200, alignSelf:'center'}}/>
      <Text style={{fontSize:40, textAlign:'center', color:'white',fontFamily:'PTSerif-Bold'}}>Weather</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})