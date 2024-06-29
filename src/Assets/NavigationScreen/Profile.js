import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Camera from '../../../Components/Camera'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Show from './Show'
const Profile = (navigation) => {

    const [show, setShow]= useState('')
const Data= async()=>{
    
    const Set= await AsyncStorage.getItem('userData')
    const getData= await JSON.parse(Set)
    setShow(getData)
}


useEffect(()=>{
    Data()
},[])
  return (
    <View style={{flex:1, backgroundColor:'black'}}>
      <Camera/>
      <Text style={{color:'white',fontWeight:'800', textAlign:'center', fontSize:25, marginVertical:20}}>{show.name}</Text>
      <Text style={{color:'white',fontWeight:'800', textAlign:'center', fontSize:25, marginVertical:20}}>{}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})