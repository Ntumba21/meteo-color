// LogoutButton.js
import React from 'react';
import { Button } from 'react-native';
import { signOut } from '../firebaseFunctions/authFunctions';
import { useNavigation } from '@react-navigation/native';

function LogoutButton() {
  const navigation = useNavigation();

  return (
    <Button
      title="Déconnexion"
      onPress={() => signOut(navigation)}
    />
  );
}

export default LogoutButton;
