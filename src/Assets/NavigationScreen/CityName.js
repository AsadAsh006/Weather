// src/Assets/NavigationScreen/CityName.js
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import InputText from '../../../Components/InputText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../Components/CustomButton';

const CityName = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [name, setName] = useState('');

  const handleSaveData = async () => {
    const userData = { city, name };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Show', params: { userData } }],
    });
  };

  
  return (
    <View style={styles.container}>
      <Image source={require('../Images/Wea.png')} style={{height:200, width:200, alignSelf:'center'}}/>
      <View style={{paddingVertical:30
        , justifyContent:'center' }}>
      <InputText bottommargin={10} placeholder={'Enter Your City Name'} state={setCity} val={city} />
      <InputText marginTop={10} placeholder={'Enter your Name'} state={setName} val={name} />
      <CustomButton Text={'Done'} action={handleSaveData} />
      <CustomButton Text={'Skip'} action={()=>navigation.navigate('Show')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
   justifyContent:'center',
    paddingHorizontal: 20,
  },
});

export default CityName;
