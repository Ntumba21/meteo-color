import React from 'react';
import { Button } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseInstance from '../firebase'; // Assurez-vous d'importer votre configuration Firebase
import { onPressResetPassword } from '../firebaseFunctions/authFunctions';

function ResetPasswordButton() {
    const auth = getAuth(firebaseInstance.app);

    return (
        <Button
        title="Réinitialiser le mot de passe"
        onPress={() => onPressResetPassword(auth)}
        />
    );
}

export default ResetPasswordButton;
