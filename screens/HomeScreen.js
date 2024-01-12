// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import WeatherDisplay from '../components/WeatherDisplay';
import NavBar from '../components/NavBar';
import firebaseInstance from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { requestLocationPermission, fetchWeatherData } from '../firebaseFunctions/weatherFunction';
import { useColor } from '../components/ColorContext';
import { getColorFromWeatherCondition } from '../components/ColorContext'



export function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();
  const { color, getHexColor, getHexColorSecondary, updateColor } = useColor(); // Utilisez le contexte de couleur
  const hexColor = getHexColor(color);
  const hexColorSecond = getHexColorSecondary(color);



  useEffect(() => {
    const user = firebaseInstance.auth.currentUser;

    if (!user) {
      navigation.navigate('Login');
      console.log("deco");
    } else {
      const fetchData = async () => {
        const coords = await requestLocationPermission();

        if (coords) {
          setLocation(coords);
          const weatherData = await fetchWeatherData(coords.latitude, coords.longitude);
          // const description = weatherData.description;
          // console.log("vvvvvvvvvvvvvvvv " + description)

          // updateColor(getColorFromWeatherCondition(description));
          setWeather(weatherData);

        }
      };

      fetchData();
      console.log(user);
    }
  }, [navigation]);

  return (
    <LinearGradient
      colors={[hexColor, hexColorSecond, '#FFFFFF']}  // Remplacez #color1, #color2 et #color3 par vos couleurs
      locations={[0.3, 0.58, 0.82]}  // Les pourcentages correspondant à chaque couleur
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', height: 100 }}>
        <WeatherDisplay location={location} weather={weather} />
        <NavBar />
      </View>
    </LinearGradient>
  );
}
