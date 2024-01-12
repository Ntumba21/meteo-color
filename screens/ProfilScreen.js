import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';
import 'firebase/auth';
import firebaseInstance from '../firebase';
import LogoutButton from '../components/LogoutButton';
import ResetPasswordButton from '../components/ResetPasswordButton';
import images from '../assets/images';
import { useColor } from '../components/ColorContext';


export function ProfilScreen() {
  const navigation = useNavigation();
  const user = firebaseInstance.auth.currentUser;
  const [currentUser, setCurrentUser] = useState(null);
  const { color } = useColor();

  let userEmail
  let name
  const backgroundImage = images[color];



  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté
    const user = firebaseInstance.auth.currentUser;
    if (!user) {
      // Redirigez vers l'écran de connexion si l'utilisateur n'est pas connecté
      navigation.navigate('Login');
    }
  }, [navigation]);

  if (!user) {
    navigation.navigate('Login');
  } else {
    userEmail = user.email;
    name = user.displayName

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, }}>
      <Image
        style={styles.imageBackground}
        source={backgroundImage}
      />
      <Text style={{ position:"absolute", top:"8%", left:150, color:"white", fontWeight:700, fontSize:27, zIndex:3 }}>PROFIL</Text>

      <Text>{userEmail}</Text>
      <Text>{name}</Text>

      <ResetPasswordButton/>
      <LogoutButton/>
      <NavBar />

    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    height: '100%',
    top: '-80%',
    width: '100%',
    zIndex:2,
  },

  
});
