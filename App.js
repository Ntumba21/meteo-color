// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import {FavorisScreen} from './screens/FavorisScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import LoadScreen from './screens/LoadScreen';
import { ColorProvider } from './components/ColorContext';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <ColorProvider>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Load"
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Favoris" component={FavorisScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="Load" component={LoadScreen} />



        
      </Stack.Navigator>
    </NavigationContainer>
    </ColorProvider>

  );
}

export default App;
