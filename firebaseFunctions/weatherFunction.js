import { collection, doc, setDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import firebaseInstance from '../firebase';


const favorisCollection = collection(firebaseInstance.firestore, 'favoris');

export const getFavoriteCitiesWithWeather = async () => {
    try {
      const user = firebaseInstance.auth.currentUser;
  
      if (!user) {
        console.error('Aucun utilisateur connecté.');
        return [];
      }
  
      const userDoc = doc(favorisCollection, user.uid);
      const userDocSnapshot = await getDoc(userDoc);
  
      if (userDocSnapshot.exists()) {
        const favorisData = userDocSnapshot.data();
        const favoriteCities = favorisData && favorisData.Villes;
  
        if (favoriteCities && Array.isArray(favoriteCities)) {
          // Récupérer les données météorologiques pour chaque ville favorite
          const citiesWithWeather = await Promise.all(
            favoriteCities.map(async (cityName) => {
              const weatherData = await getWeatherData(cityName);
              return {
                cityName,
                temperature: weatherData.main.temp,
                weather: weatherData.weather[0].main,
              };
            })
          );
  
          return citiesWithWeather;
        }
      }
  
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des villes favorites avec la météo :', error);
      return [];
    }
  };
  
  
  const getWeatherData = async (cityName) => {
    const apiKey = 'bc17afd08a83076cac503c77593e2e8d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Échec de la requête vers l\'API météorologique');
      }
  
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météorologiques :', error.message);
      throw error;
    }
  };


  // weatherUtils.js

import * as Location from 'expo-location';
import axios from 'axios';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      const currentLocation = await Location.getCurrentPositionAsync({});
      return currentLocation.coords;
    } else {
      console.log('Location permission denied');
      return null;
    }
  } catch (err) {
    console.warn('Error requesting location permission:', err);
    return null;
  }
};

export const fetchWeatherData = async (latitude, longitude) => {
  const apiKey = 'bc17afd08a83076cac503c77593e2e8d';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);

    // Extrayez les informations nécessaires pour les prévisions sur 7 jours
    const dailyForecast = response.data.list.filter((forecast, index) => index % 8 === 0);
    const currentDescription = response.data.list[0].weather[0].description;


    return {
      current: response.data.list[0],
      daily: dailyForecast,
      description: currentDescription,

    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
};


// Fonction pour obtenir le chemin de l'image en fonction de la condition météorologique
export const getImagePath = (weatherCondition) => {
  console.log("testtttttt23" + weatherCondition.toLowerCase())
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
    case 'sun':
    case 'clear sky':
    case 'scattered clouds':
      return require('../assets/ensoleille.png');
    case 'few clouds':
    case 'broken clouds':
    case 'overcast clouds':
    case 'clouds':
      return require('../assets/cloudy.png');
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return require('../assets/rainy.png');
    case 'light snow':
    case 'snow':
    case 'heavy snow':
    case 'sleet':
    case 'light shower sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      return require('../assets/snowflake.png');
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'sand/dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
      return require('../assets/windy.png');
    default:
      return require('../assets/thunderstorm.png');
  }
};

export const getIconPath = (weatherCondition) => {
  switch (weatherCondition.toLowerCase()) {
    case 'clear sky':
    case 'few clouds':
    case 'scattered clouds':
      return require('../assets/sunIcon.png');
    case 'broken clouds':
    case 'overcast clouds':
    case 'clouds':
      return require('../assets/cloudyIcon.png');
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return require('../assets/rainyIcon.png');
    case 'light snow':
    case 'snow':
    case 'heavy snow':
    case 'sleet':
    case 'light shower sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      return require('../assets/snowIcon.png');
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'sand/dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
      return require('../assets/windIcon.png');
    default:
      return require('../assets/sunIcon.png');
  }
};


  