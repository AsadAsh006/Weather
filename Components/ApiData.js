import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const ApiData = () => {
const [city,setCity]=useState('')
const [latitude,setLatitude]= useState('')
const [longitude,setLongitude]=useState('')
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userData');
        if (savedUserData) {
          const { city: savedCity, name: savedName } = JSON.parse(savedUserData);
          setCity(savedCity);
          setName(savedName);
          getWeatherData(savedCity);
        } else if (route.params?.userData) {
          const { city: paramCity, name: paramName } = route.params.userData;
          setCity(paramCity);
          setName(paramName);
          getWeatherData(paramCity);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadData();
  }, [route.params?.userData]);

  const currentWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`);
      const json = await response.json();
      setCurrentData(json);
      if (json.coord) {
        setLatitude(json.coord.lat);
        setLongitude(json.coord.lon);
       
      }
    } catch (error) {
      console.error("Error fetching current weather data:", error);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`
      );
      const data = await response.json();
      console.log("🚀 ~ fetchAirQuality ~ data:", data)
      setAirQuality(data);
    } catch (error) {
      console.error(error);
    }
  };

const getWeatherData= async(city)=>{
    await currentWeather(city)
    await fetchAirQuality(city)
}

  return (
    <View>
      <Text>ApiData</Text>
    </View>
  )
}

export default ApiData

const styles = StyleSheet.create({})