import { StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import { launchCamera } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import CustomButton from './CustomButton'
const Camera = (params) => {
  const [cameraModal, setCameraModal] = useState(false)
  useEffect(() => {
    getImage()
  }, [])

  const getImage=async()=>{
     const getNewImage = await AsyncStorage.getItem('@image')
     console.log("🚀 ~ getImage ~ getNewImage:", getNewImage)
     setSelectedImage(getNewImage)
  }
  const [selectedimage, setSelectedImage] = useState()
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        AsyncStorage.setItem('@image' , imageUri)
        {setCameraModal(false)}
      }
    });
  };

  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        AsyncStorage.setItem('@image' , imageUri)
        {setCameraModal(false)}
        console.log(imageUri);
      }
    });
  }

  return (
    <View style={{ backgroundColor: 'white', height:150, width:150, marginTop: 20,borderRadius:75,alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
      <Modal
        transparent={true}
        visible={cameraModal}
        onRequestClose={() => setCameraModal(false)}
        animationType='slide'
      >
        <View style={{ flex:1, backgroundColor:'rgba(50,50,50,0.2)', justifyContent:'center',padding:20,borderWidth:1,  }}>
        <View style={{flex:0.3, backgroundColor:'ghostwhite', justifyContent:'center', borderRadius:20}}>
          <CustomButton Text={"Choose from Device"} action={openImagePicker} bRadius={20}/>
          <CustomButton Text={"Open Camera"} action={handleCameraLaunch} bRadius={20}/>
          <CustomButton Text={'Cancel'} action={()=>setCameraModal(false)} bRadius={20}/>
        </View>
        </View>
      </Modal>
      <View style={{  alignItems:'center',justifyContent:'center' }}>
        <TouchableOpacity onPress={() => setCameraModal(true)} style={{alignItems:'center', justifyContent:'center'}}>
          {selectedimage?
            <Image style={{alignItems:'center',position:'absolute', justifyContent:"center", alignSelf:'center', borderRadius:75, height:150, width:150,backgroundColor:'white', }} source={{ uri: selectedimage }} />
            :
            <FontAwesome5 name='user-circle' color={'grey'} size={150}  style={{alignSelf:'center',marginBottom:5}} />
}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({})