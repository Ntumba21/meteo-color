import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { addFavoriteCity, removeFavoriteCity, isCityInFavorites } from '../firebaseFunctions/favorisFunctions'; // Correction ici

const Favoris = (cityName) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const nonFavoriteImageSource = isFavorite ? require("../assets/favori.png") : require("../assets/favori.png");
    const favoriteImageSource = isFavorite ? require("../assets/favorisV.png") : require("../assets/favorisV.png");

  const checkIfFavorite = async () => {
    try {
      console.log('Vérification des favoris pour la ville :', cityName);
      const cityIsFavorite = await isCityInFavorites(cityName);
      console.log('Résultat de la vérification des favoris :', cityIsFavorite);
      setIsFavorite(cityIsFavorite);
    } catch (error) {
      console.error('Erreur lors de la vérification des favoris :', error.message);
    }
  };

  checkIfFavorite();

  


  const handleFavoritePress = async () => {
    
    const isCityFavorite = await isCityInFavorites(cityName);
    console.log(`La ville ${cityName.cityName} est-elle dans les favoris ? ${isCityFavorite}`)
    

    try {
      if (isFavorite) {
        // Si la ville est déjà un favori, retirez-la des favoris
        await removeFavoriteCity(cityName);
      } else {
        // Sinon, ajoutez-la aux favoris
        await addFavoriteCity(cityName);
      }
  
      // Inversez l'état de favori
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris :', error.message);
    }
  };

  return (
      <TouchableOpacity style={{position:"absolute", top:-370, left:-30}} onPress={handleFavoritePress}>
      <View>
      <Image style={{ height: 40, width: 40 }} source={isFavorite ? favoriteImageSource : nonFavoriteImageSource} />
      </View>
    </TouchableOpacity>
  );
};

export default Favoris;
