import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firebaseInstance from '../firebase';
import NavBar from '../components/NavBar';
import { LinearGradient } from 'expo-linear-gradient';
import { useColor } from '../components/ColorContext';
import { getColorFromWeatherCondition } from '../components/ColorContext'


export function SearchScreen() {
  const [location] = useState(null);
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermRef = useRef(searchTerm);
  const { color, getHexColor, getHexColorSecondary, updateColor } = useColor(); // Utilisez le contexte de couleur
  const hexColor = getHexColor(color);
  const hexColorSecond = getHexColorSecondary(color);

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté
    const user = firebaseInstance.auth.currentUser;
    if (!user) {
      // Redirigez vers l'écran de connexion si l'utilisateur n'est pas connecté
      navigation.navigate('Login');
    }
  }, [navigation]);

  

  async function handleSearch(term) {

    try {
      setSearchTerm(term);

      const apiKey = 'bc17afd08a83076cac503c77593e2e8d';
      const cityWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=${apiKey}`;

      const response = await axios.get(cityWeatherUrl);
      const currentWeather = response.data;

      const cityForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=${apiKey}`;
      const forecastResponse = await axios.get(cityForecastUrl);
      const dailyForecast = forecastResponse.data.list.filter((forecast, index) => index % 8 === 0);
      const description = currentWeather.weather[0].description;

      updateColor(getColorFromWeatherCondition(description));;
      console.log("bbbbbbbbbb" + description)


      setWeather({
        current: currentWeather,
        daily: dailyForecast,
      });

      searchTermRef.current = term;

    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      Alert.alert('Error', 'City not found. Please try again.');
    }
  }


  return (
    <LinearGradient
      colors={[hexColor, hexColorSecond, '#FFFFFF']}  // Remplacez #color1, #color2 et #color3 par vos couleurs
      locations={[0.3, 0.58, 0.82]}  // Les pourcentages correspondant à chaque couleur
      style={{ flex: 1 }}
    >
      <View style={{flex: 1, justifyContent: 'center', height : 100,}}>
        <SearchBar style={{position:"absolute", top:30}}onSearch={handleSearch} />
        {weather && <WeatherDisplay location={location} weather={weather} searchTerm={searchTerm} />}
        <NavBar/>

      </View>
    </LinearGradient>
  );
}
