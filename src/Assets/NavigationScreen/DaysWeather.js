import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
const DaysWeather = ({ route }) => {
  const [daysData, setDaysData] = useState([]);
  const [loading,setLoading]= useState(true)
  const city = route.params?.city;

  const WeatherData = async () => {
    const Data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fd7499f7bd7e76ea6e3ccbc366873a88`);
    const json = await Data.json();
    console.log("🚀 ~ WeatherData ~ json:", JSON.stringify(json));
    setDaysData(json.list);
    setLoading(false)
  };

  useEffect(() => {
    WeatherData();
  }, [city]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading?
      <View style={{flex:1, justifyContent:'center'}}>
      <ActivityIndicator color={'blue'} size={70} style={{alignSelf:"center", }}/>
      <Text style={{textAlign:'center', fontSize:18, marginTop:10}}>Loading...</Text>
      </View>
      :
      <FlatList
        data={daysData}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1 }}>
              <View style={{ height: 80, width: '80%', backgroundColor: 'dimgrey', margin: 10, alignSelf: "center", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                <View>
                  <Text style={{ fontSize: 20, color: 'white', fontWeight: '700', fontFamily:'PTSerif-Bold' }}>{item?.main?.temp ? `${(item.main.temp - 273.15).toFixed(2)}°C` : ''}</Text>
                  <Text style={{color:'white', fontFamily:'PTSerif-Bold'}}>{item?.weather && item.weather.length > 0 ? item.weather[0].description : ''}</Text>
                  <Text style={{color:'white', fontFamily:"PTSerif-Bold"}}>{item.dt_txt}</Text>
                </View>
              </View>
            </View>
          )
        }}
      />}
    </View>
  )
}

export default DaysWeather;

const styles = StyleSheet.create({});
