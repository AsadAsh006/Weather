import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Icon = (params) => {
  const [selectedImage, setSelectedImage] = useState('')
  
  const getImage = async () => {
    const getNewImage = await AsyncStorage.getItem('@image')
    
    setSelectedImage(getNewImage)
  }

  useEffect(() => {
    getImage(selectedImage)
  }, [selectedImage])

  return (
    <View>
      <TouchableOpacity onPress={params.action ? params.action : null}>
        {params.Feather && <Feather name={params.icon ? params.icon : null} size={30} color={'white'} />}
        {params.EvilIcon && (
          selectedImage ? 
            <Image source={{ uri: selectedImage }} style={styles.image} /> : 
            <EvilIcon name={params.icon ? params.icon : null} size={30} color={'white'} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Icon

const styles = StyleSheet.create({
  image: {
    marginRight:10,
    borderRadius:15,
    width: 30,
    height: 30,
  },
})
