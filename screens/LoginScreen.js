import React from 'react';
import AuthentificationForm from '../components/AuthentificationForm';
import { StyleSheet } from 'react-native';
import { useColor } from '../components/ColorContext';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import images from '../assets/images';



export function LoginScreen({ navigation }) {
  const { color } = useColor();

  // Utilisez la clé appropriée pour obtenir l'image en fonction de la couleur
  const backgroundImage = images[color];

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={backgroundImage} // Utilisez la variable backgroundImage ici
      />

      <AuthentificationForm mode="connexion" navigation={navigation} />

      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.containerRedirection}>

        <Text style={styles.buttonRedirection} >Or SignUp Using</Text>

        <Text style={styles.buttonRedirection}>SIGN UP</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  imageBackground: {
    position: 'absolute',
    height: '100%',
    top: '-32%',
    width: '100%',
  },
  buttonRedirection:{
    color: "#787878",
    fontSize : 15,
    width : "100%",
    textAlign : "center",
    marginBottom : 10
  },
  containerRedirection:{
    position : "absolute",
    bottom: 0,
    width : "100%",
    
  }
});
