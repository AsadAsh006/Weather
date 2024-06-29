import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const WeatherIcon = (params) => {
  return (
    <View style={{alignItems:params.item?params.item:null, justifyContent:params.justify?params.justify:null, marginTop:params.marginTop?params.marginTop:null}}>
        {params.Feather?<Feather name={params.icon? params.icon:null} color={'white'} size={30}/>:null}
        {params.MaterialIcon?<MaterialIcon name={params.icon? params.icon:null} color={'white'} size={30}/>:null}
    {params.image ?<Image source={params.pic?params.pic:null} style={{height:40,width:40}}/> :null}
    <Text style={{color:"white", marginTop:3}}>{params.APItext?params.APItext:null} {params.unit?params.unit:null}</Text>
    <Text style={{color:'white'}}>{params.text?params.text:null}</Text>
    </View>
  )
}

export default WeatherIcon

const styles = StyleSheet.create({})