// FavorisScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { getFavoriteCitiesWithWeather } from '../firebaseFunctions/weatherFunction';
import { useNavigation } from '@react-navigation/native';
import firebaseInstance from '../firebase';
import NavBar from '../components/NavBar';
import { useColor } from '../components/ColorContext';
import images from '../assets/images';
import { getImagePath } from '../firebaseFunctions/weatherFunction';

export function FavorisScreen() {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const navigation = useNavigation();
  const { color } = useColor();
  const backgroundImage = images[color];

  useEffect(() => {
    const user = firebaseInstance.auth.currentUser;
    if (!user) {
      navigation.navigate('Login');
    } else {
      loadFavoriteCities();
    }
  }, [navigation]);

  const loadFavoriteCities = async () => {
    try {
      const citiesWithWeather = await getFavoriteCitiesWithWeather();
      setFavoriteCities(citiesWithWeather);
    } catch (error) {
      console.error('Erreur lors du chargement des villes favorites :', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.imageBackground}
        source={backgroundImage}
      />
      <Text style={{ position:"absolute", top:"6.5%", left:150, color:"white", fontWeight:700, fontSize:27, zIndex:3 }}>FAVORIS</Text>
  
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <FlatList style={{ marginTop: 125, marginBottom:110 }}
          data={favoriteCities}
          keyExtractor={(item) => item.cityName}
          renderItem={({ item }) => (
            <View style={styles.containerFav}>
              <Text style={{ color: "#A3A1A1", fontSize: 22 }}>{item.cityName}</Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "#A3A1A1", fontSize: 40, marginTop: 30 }}>{(item.temperature - 273.15).toFixed(0)}°C</Text>
                <Image
                  style={{ height: 110, width: 110, position: "absolute", right: 30, bottom: 2 }}
                  source={getImagePath(item.weather)}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    height: '100%',
    top: '-85%',
    width: '100%',
    zIndex:2,
  },
  containerFav:{
    backgroundColor:"white",
    padding: 10,
    height:150,
    width: "80%",
    marginLeft:"10%",
    borderRadius:15,
    marginTop:30,
    paddingLeft:20,
    position:"relative",
  }
});
