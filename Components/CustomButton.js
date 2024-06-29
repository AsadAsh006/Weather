import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = (params) => {
  return (
    <View>
      <TouchableOpacity style={{backgroundColor:'blue', height:40, width:'60%', alignSelf:'center', justifyContent:'center', marginTop:10, borderRadius:20}} onPress={params.action?params.action:null}>
        <Text style={{textAlign:'center', fontWeight:'700', color:'white'}}>{params.Text?params.Text:null}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})