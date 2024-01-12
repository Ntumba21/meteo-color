// AuthentificationForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Authentification } from '../firebaseFunctions/authFunctions';
import { useColor } from '../components/ColorContext';

function AuthentificationForm({ mode, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { color, getHexColor } = useColor(); // Utilisez le contexte de couleur
  const hexColor = getHexColor(color);

  const ClickAuth = () => {
    Authentification(mode, email, password, name, navigation);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />

      <View style={styles.containerForm}>

        {mode === 'inscription' && (
            <Text style={styles.text}>Name</Text>
        )}

        {mode === 'inscription' && (
                      <TextInput 
            style = {styles.inputName}
            placeholder='Name'
            onChangeText={(text) => setName(text)}
            value={name}
          />
        )}

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={[styles.buttonLogin, { backgroundColor: hexColor }]} onPress={ClickAuth}>
          <Text style={styles.buttonText}>
            {mode === 'inscription' ? 'Register' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default AuthentificationForm;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm : {
    width : "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop : 130, 
  },
  input: {
    
    backgroundColor: 'white',
    width: '78%',
    height: 65,
    borderRadius: 20,
    marginBottom: 10,
    padding: 8,
    marginBottom: 40,
    paddingLeft: 20,
  },
  inputName: {
    backgroundColor: 'white',
    width: '78%',
    height: 65,
    borderRadius: 20,
    marginBottom: 10,
    padding: 8,
    marginBottom: 40,
    paddingLeft: 20,
  },
  buttonLogin: {
    
    marginTop: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '76%',
    borderRadius: 60,
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    width: 200,
    height: 210,
    position : "absolute",
    top : -60
  },
  text:{
    alignSelf:"flex-start",
    marginLeft: "13%",
    marginBottom:6,
    color : "white",
    fontWeight : "bold",
    fontSize : 16
  }
});
