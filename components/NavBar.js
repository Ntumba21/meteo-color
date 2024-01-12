// components/NavBar.js

import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useColor } from '../components/ColorContext';
import { requestLocationPermission, fetchWeatherData } from '../firebaseFunctions/weatherFunction';
import { getColorFromWeatherCondition } from '../components/ColorContext'





const NavBar = ({ title }) => {
  const [location, setLocation] = useState(null);
  const { color, updateColor } = useColor(); // Utilisez le contexte de couleur
  const navigation = useNavigation();
  const route = useRoute();

  const handleHomePress = async () => {
  
    
      const coords = await requestLocationPermission();
  
      if (coords) {
        setLocation(coords);
        const weatherData = await fetchWeatherData(coords.latitude, coords.longitude);
        const description = weatherData.description;
  
        updateColor(getColorFromWeatherCondition(description));
        navigation.navigate('Home')
      
    }
  };

  const getGlassImageSource = (color) => {
    // Remplacez cette condition par celle qui correspond à votre route spécifique pour l'écran "Home"
    return route.name === 'Search'
      ? color === 'lightBlue'
        ? require("../assets/glass-lightBlue.png") // Image spéciale pour l'écran Home en bleu
        : color === 'darkBlue'
          ? require("../assets/glass-darkBlue.png") // Image spéciale pour l'écran Home en rouge
          : color === 'blueRain'
            ? require("../assets/glass-blueRain.png") // Image spéciale pour l'écran Home en vert
            : color === 'purple'
              ? require("../assets/glass-purple.png") // Image spéciale pour l'écran Home en jaune
              : color === 'white'
                ? require("../assets/glass-white.png") // Image spéciale pour l'écran Home en violet
                : color === 'orange'
                  ? require("../assets/glass-orange.png") // Image spéciale pour l'écran Home en orange
                  : require("../assets/glass.png") // Image par défaut pour l'écran Home avec une couleur non spécifiée
      : require("../assets/glass.png"); // Image par défaut pour les autres écrans
  };

  const getFavImageSource = (color) => {
    // Remplacez cette condition par celle qui correspond à votre route spécifique pour l'écran "Home"
    return route.name === 'Favoris'
      ? color === 'lightBlue'
        ? require("../assets/favorite-lightBlue.png") // Image spéciale pour l'écran Home en bleu
        : color === 'darkBlue'
          ? require("../assets/favorite-darkBlue.png") // Image spéciale pour l'écran Home en rouge
          : color === 'blueRain'
            ? require("../assets/favorite-blueRain.png") // Image spéciale pour l'écran Home en vert
            : color === 'purple'
              ? require("../assets/favorite-purple.png") // Image spéciale pour l'écran Home en jaune
              : color === 'white'
                ? require("../assets/favorite-white.png") // Image spéciale pour l'écran Home en violet
                : color === 'orange'
                  ? require("../assets/favorite-orange.png") // Image spéciale pour l'écran Home en orange
                  : require("../assets/favori.png") // Image par défaut pour l'écran Home avec une couleur non spécifiée
      : require("../assets/favori.png"); // Image par défaut pour les autres écrans
  };


  const getHomeImageSource = (color) => {
    // Remplacez cette condition par celle qui correspond à votre route spécifique pour l'écran "Home"
    return route.name === 'Home'
      ? color === 'lightBlue'
        ? require("../assets/homepage-lightBlue.png") // Image spéciale pour l'écran Home en bleu
        : color === 'darkBlue'
          ? require("../assets/homepage-darkBlue.png") // Image spéciale pour l'écran Home en rouge
          : color === 'blueRain'
            ? require("../assets/homepage-blueRain.png") // Image spéciale pour l'écran Home en vert
            : color === 'purple'
              ? require("../assets/homepage-purple.png") // Image spéciale pour l'écran Home en jaune
              : color === 'white'
                ? require("../assets/homepage-white.png") // Image spéciale pour l'écran Home en violet
                : color === 'orange'
                  ? require("../assets/homepage-orange.png") // Image spéciale pour l'écran Home en orange
                  : require("../assets/homepage.png") // Image par défaut pour l'écran Home avec une couleur non spécifiée
      : require("../assets/homepage.png"); // Image par défaut pour les autres écrans
  };


  const getUserImageSource = (color) => {
    // Remplacez cette condition par celle qui correspond à votre route spécifique pour l'écran "Home"
    return route.name === 'Profil'
      ? color === 'lightBlue'
        ? require("../assets/user-lightBlue.png") // Image spéciale pour l'écran Home en bleu
        : color === 'darkBlue'
          ? require("../assets/user-darkBlue.png") // Image spéciale pour l'écran Home en rouge
          : color === 'blueRain'
            ? require("../assets/user-blueRain.png") // Image spéciale pour l'écran Home en vert
            : color === 'purple'
              ? require("../assets/user-purple.png") // Image spéciale pour l'écran Home en jaune
              : color === 'white'
                ? require("../assets/user-white.png") // Image spéciale pour l'écran Home en violet
                : color === 'orange'
                  ? require("../assets/user-orange.png") // Image spéciale pour l'écran Home en orange
                  : require("../assets/user.png") // Image par défaut pour l'écran Home avec une couleur non spécifiée
      : require("../assets/user.png"); // Image par défaut pour les autres écrans
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 18, backgroundColor: '#FDFDFD' ,position:'absolute', bottom:0, width: "100%"}}>
      <TouchableOpacity  onPress={handleHomePress}>
        <Image style={{height:40, width: 40}} source={getHomeImageSource(color)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image style={{height:40, width: 40}} source={getGlassImageSource(color)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
        <Image style={{height:40, width: 40}} source={getFavImageSource(color)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <Image style={{height:40, width: 40, marginLeft:7}} source={getUserImageSource(color)} />
      </TouchableOpacity>
    </View>
  );
};



export default NavBar;
