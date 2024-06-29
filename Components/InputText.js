import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const InputText = (params) => {
  return (
    <View style={{width:'80%', backgroundColor:'dimgray', height:40,alignSelf:'center', borderRadius:20,flexDirection:'row',justifyContent:'space-between', alignItems:'center',  marginTop:params.marginTop?params.marginTop:null,marginBottom:params.bottommargin?params.bottommargin:null}}>
    <TextInput placeholder={params.placeholder?params.placeholder:null} style={{paddingLeft:10}} onChangeText={params.state?params.state:null} value={params.val?params.val:null}
    clearTextOnFocus={true}
    />
  
    {params.touch?
    <TouchableOpacity style={{backgroundColor:'blue',height:40,width:65, borderRadius:19, alignItems:"center" , justifyContent:'center'}} onPress={params.action?params.action:null}>
    {EvilIcon? <EvilIcon name={params.icon ? params.icon:null} size={25} color={'white'}/>:null}
    </TouchableOpacity>:null}
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({})