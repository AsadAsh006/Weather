import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../Components/Icon';
import InputText from '../../../Components/InputText';
import CustomButton from '../../../Components/CustomButton';
import WeatherIcon from '../../../Components/WeatherIcon';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
const Show = ({ navigation, route }) => {
  const [weekData, setWeekData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [UVIndex, setUVIndex] = useState('');
  const [coordinatesSet, setCoordinatesSet] = useState(false);
  const [airQuality, setAirQuality] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage,setSelectedImage]=useState('')
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userData');
        if (savedUserData) {
          const { city: savedCity, name: savedName } = JSON.parse(savedUserData);
          setCity(savedCity);
          setName(savedName);
          await getWeatherData(savedCity);
        } else if (route.params?.userData) {
          const { city: paramCity, name: paramName } = route.params.userData;
          setCity(paramCity);
          setName(paramName);
          await getWeatherData(paramCity);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadData();
  }, [route.params?.userData]);

  useEffect(() => {
    if (coordinatesSet) {
      fetchUVData();
    }
  }, [coordinatesSet]);

  const fetchUVData = async () => {
    if (!latitude || !longitude) {
      console.error('Latitude or longitude not set correctly.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`
      );
      const responseText = await response.text();
      console.log("fetchUVData response text:", responseText);
      const data = JSON.parse(responseText);
      console.log("Parsed UV data:", data);
      setUVIndex(data.value);
    } catch (error) {
      console.error('Error fetching UV data:', error);
    }
  };

  const fetchAirQualityData = async () => {
    if (!latitude || !longitude) {
      console.log('Latitude or longitude not set correctly.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`
      );
      const json = await response.json();
      console.log("Air quality data:", json);
      if (json.list && json.list.length > 0) {
        setAirQuality(json.list[0].main.aqi);
      }
    } catch (error) {
      console.log("Error fetching air quality data:", error);
    }
  };

  useEffect(() => {
    const getImageData= async () => {
      try {
        const imageUri = await AsyncStorage.getItem('@image');
        if (imageUri) {
          setSelectedImage(imageUri);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } 
    };

    getImageData(selectedImage);
  }, [selectedImage]);

  

  const getWeatherData = async (city) => {
    await getWeekWeather(city);
    await currentWeather(city);
    await fetchAirQualityData(city);

    setLoading(false);
  };

  const getWeekWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`);
      const json = await response.json();
      setWeekData(json.list);
    } catch (error) {
      console.error("Error fetching week weather data:", error);
    }
  };

  const currentWeather = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`);
      const json = await response.json();
      console.log("🚀 ~ currentWeather ~ json:", json);
      setCurrentData(json);
      if (json.coord) {
        setLatitude(json.coord.lat);
        setLongitude(json.coord.lon);
        setCoordinatesSet(true);
      }
    } catch (error) {
      console.error("Error fetching current weather data:", error);
    }
  };

  useEffect(() => {
    if (coordinatesSet) {
      fetchAirQualityData();
    }
  }, [coordinatesSet]);

  const handleSearch = async () => {
    await AsyncStorage.setItem('userData', JSON.stringify({ city, name }));
    await getWeatherData(city);
    navigation.navigate('Days', { city });
  };

 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View style={{ flex: 1 , }}>
          {loading ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color={'blue'} size={'large'}  />
            </View>
          ) : (
            <>
              <View style={{ justifyContent: 'space-between', alignItems: "center", flexDirection: "row" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, fontFamily: 'Roboto-Bold' }}>Weather</Text>
                  <Image source={require('../Images/imag.png')} style={{ height: 40, width: 40 }} />
                </View>
<TouchableOpacity onPress={()=>navigation.navigate('Profile')}>        
       {  selectedImage ? 
            <Image source={{ uri: selectedImage }} style={{height:30,width:30, borderRadius:15, marginRight:10}} /> : 
            <EvilIcon name={'user'} size={30} color={'white'} />}
      </TouchableOpacity>
              </View>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', paddingVertical: 20, paddingLeft: 10, fontFamily: 'Roboto-Bold' }}>{name}</Text>
              <InputText EvilIcon={true} icon={'search'} placeholder={'Enter Your City Name'} state={setCity} val={city} action={handleSearch} touch={true} />
              <View style={{ flexDirection: 'row', paddingTop: 15, flexWrap: 'nowrap', justifyContent: 'space-around' }}>
                <Image source={require('../Images/Weather.png')} style={{ width: 160, height: 160 }} />
                <Text style={{ color: 'white', fontSize: 20, left: responsiveHeight(10), marginTop: 5, fontFamily: 'LibreBaskerville-Bold' }}>
                  {currentData?.weather && currentData.weather.length > 0 ? currentData.weather[0].description : ''}
                </Text>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(5.5), marginVertical: 10, fontWeight: '700', right: responsiveWidth(4), paddingTop: 20 }}>
                  {currentData?.main?.temp ? `${(currentData.main.temp - 273.15).toFixed(2)}°C` : ''}
                </Text>
              </View>
              <Text style={{ color: 'white', fontSize: 18, alignSelf: 'flex-end', bottom: responsiveHeight(10), marginRight: responsiveHeight(3) }}> {currentData?.name}, {currentData?.sys?.country}</Text>
              <CustomButton Text={'Get Every 3 hours Data'} action={() => navigation.navigate('Days', { city })} />
              <View style={{ backgroundColor: 'dimgray', margin: responsiveHeight(2), borderRadius: responsiveHeight(2) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                  <WeatherIcon image={true} pic={require('../Images/Icon.png')} text={'Air Quality'} item={'center'} APItext={airQuality} unit={'AQI'} />
                  <WeatherIcon image={true} pic={require('../Images/Guage.png')} text={'Pressure'} item={'center'} APItext={currentData?.main?.pressure} unit={'hPa'} />
                  <WeatherIcon image={true} pic={require('../Images/Uvv.png')} text={'UV'} item={'center'} APItext={UVIndex} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom:10 }}>
                  <WeatherIcon MaterialIcon={true} icon={'weather-partly-snowy-rainy'} text={'Humidity'} item={'center'} APItext={currentData.main.humidity} unit={'%'} />
                  <WeatherIcon Feather={true} icon={'wind'} text={'Wind'} item={'center'} APItext={currentData?.wind?.speed} unit={'Km/h'} />
                  <WeatherIcon Feather={true} icon={'eye'} text={'Visibility'} item={'center'} APItext={currentData.visibility >= 1000 ? `${(currentData.visibility / 1000).toFixed(1)} km` : `${currentData.visibility} m`} />
                </View>
              </View>
              <View style={{ backgroundColor: 'dimgray', flex: 0.4, margin: responsiveHeight(2), borderRadius: responsiveHeight(2), justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <View>
                    <Text style={{ color: 'white' }}>{currentData?.sys?.sunrise ? new Date(currentData.sys.sunrise * 1000).toLocaleTimeString() : ''}</Text>
                    <Text style={{ color: 'white' }}>Sunrise</Text>
                  </View>
                  <Image source={require('../Images/New.png')} style={{ height: 93, width: 100 }} />
                  <View>
                    <Text style={{ color: 'white' }}>{currentData?.sys?.sunset ? new Date(currentData.sys.sunset * 1000).toLocaleTimeString() : ''}</Text>
                    <Text style={{ color: 'white' }}>Sun Set</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Show;

