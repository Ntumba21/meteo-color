// ColorContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';


const ColorContext = createContext();

export const getColorFromWeatherCondition = (condition) => {
  switch (condition.toLowerCase()) {
      case 'clear sky':
      case 'scattered clouds':
        return 'lightBlue';
      case 'few clouds':
      case 'broken clouds':
      case 'overcast clouds':
      case 'clouds':
        return 'darkBlue';
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'light intensity shower rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        return 'blueRain';
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
        return 'purple';
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
        return 'white';
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
        return 'orange';
      default:
        return 'red';
    }
    
};

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('white'); // Initial color
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation.coords);

          // Fetch weather data based on location
          const apiKey = 'bc17afd08a83076cac503c77593e2e8d';
          const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&appid=${apiKey}`;

          const response = await axios.get(apiUrl);

          // Extract relevant weather information from the response
          const { main, description } = response.data.weather[0];
          console.log(description)
          const temperature = response.data.main.temp;

          console.log(description);

          setWeather({
            temperature,
            condition: description,
          });

          // Determine the color based on weather conditions
          setColor(getColorFromWeatherCondition(description));
          console.log(getColorFromWeatherCondition(description))

          
        } else {
          console.log('Location permission denied');
          // Handle the case where location permission is denied
        }
      } catch (err) {
        console.warn('Error requesting location or weather data:', err);
        // Handle the error if there is an issue requesting location or weather data
      }
    };

    getLocationAndWeather();
}, []);

  // Function to determine color based on weather condition


  const getHexColor = (color) => {
    switch (color) {
      case 'lightBlue':
        return '#87CEEB';
      case 'darkBlue':
        return '#4682b4';
      case 'blueRain':
        return '#698de9';
      case 'purple':
        return '#8e00db';
      case 'white':
        return '#b7e5eb';
      case 'orange':
        return '#d7811c';
      // Ajoutez d'autres cas au besoin
      default:
        return ''; // ou une valeur par défaut
    }
  }

  const getHexColorSecondary = (color) => {
    switch (color) {
      case 'lightBlue':
        return '#F5FFB8';
      case 'darkBlue':
        return '#9DBEFF';
      case 'blueRain':
        return '#9DBEFF';
      case 'purple':
        return '#B454FF';
      case 'white':
        return '#b7e5eb';
      case 'orange':
        return '#FFC581';
      // Ajoutez d'autres cas au besoin
      default:
        return ''; // ou une valeur par défaut
    }
  }

  const updateColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ColorContext.Provider value={{ color, updateColor, getHexColor, getHexColorSecondary }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  return useContext(ColorContext);
};
