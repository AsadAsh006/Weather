import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Show from './src/Assets/NavigationScreen/Show';
import DaysWeather from './src/Assets/NavigationScreen/DaysWeather';
import CityName from './src/Assets/NavigationScreen/CityName';
import Splash from './src/Assets/NavigationScreen/Splash';
import Profile from './src/Assets/NavigationScreen/Profile';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log("🚀 ~ checkUserData ~ userData:", userData)
        if (userData) {
          setInitialRoute('Show');
        } else {
          setInitialRoute('CityName');
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        setInitialRoute('CityName');
      }
      setIsLoading(false); 
    };

    checkUserData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="CityName" component={CityName} />
        <Stack.Screen name="Show" component={Show} />
        <Stack.Screen name="Days" component={DaysWeather} />
        <Stack.Screen name='Profile' component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
