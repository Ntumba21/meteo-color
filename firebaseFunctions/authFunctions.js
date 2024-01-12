// AuthFunctions.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebaseInstance from '../firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { sendPasswordResetEmail, getCurrentUser } from 'firebase/auth';

export function signOut(navigation) {
  firebaseSignOut(firebaseInstance.auth);
  navigation.navigate('Login'); // Redirigez vers l'écran de connexion après la déconnexion
  console.log('User signed out successfully.');
}

export async function Authentification(mode, email, password, name, navigation) {
  if (mode === 'inscription') {
    const userCredential = await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    console.log('User registered successfully with name:', name);
  } else {
    const userCredential = await signInWithEmailAndPassword(firebaseInstance.auth, email, password);
    const currentUser = userCredential.user;
    console.log('User logged in successfully:', currentUser.uid);
    navigation.navigate('Home');
  }
}

export async function onPressResetPassword(auth){
    const user = auth.currentUser;

    if (user) {
        await sendPasswordResetEmail(auth, user.email);
        console.log("Email de réinitialisation du mot de passe envoyé avec succès !");
    } else {
        console.log("Aucun utilisateur connecté.");
    }
    
  };


