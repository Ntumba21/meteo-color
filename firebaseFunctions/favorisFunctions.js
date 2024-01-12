import { collection, doc, setDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import firebaseInstance from '../firebase';
import { getAuth, updateProfile } from 'firebase/auth';


const favorisCollection = collection(firebaseInstance.firestore, 'favoris');

// Fonction pour ajouter une ville aux favoris
export const addFavoriteCity = async (cityName) => {
  try {
    const user = firebaseInstance.auth.currentUser;

    if (!user) {
      console.error('Aucun utilisateur connecté.');
      return;
    }

    const userDoc = doc(favorisCollection, user.uid);

    try {
      // Ajouter la ville à la collection "favorites" avec l'ID de l'utilisateur
      await setDoc(userDoc, {
        Villes: arrayUnion(cityName.cityName)
      }, { merge: true });

      console.log(`${cityName.cityName} ajoutée aux favoris de l'utilisateur.`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ville aux favoris :', error.message);
    }
  } catch (error) {
    console.error('Erreur inattendue :', error);
  }
};

// Fonction pour supprimer une ville des favoris
export const removeFavoriteCity = async (cityName) => {
  try {
    const user = firebaseInstance.auth.currentUser;

    if (!user) {
      console.error('Aucun utilisateur connecté.');
      return;
    }

    const userDoc = doc(favorisCollection, user.uid);

    try {
      // Supprimer la ville de la collection "favorites" avec l'ID de l'utilisateur
      await setDoc(userDoc, {
        Villes: arrayRemove(cityName.cityName)
      }, { merge: true });

      console.log(`${cityName.cityName} retirée des favoris de l'utilisateur.`);
    } catch (error) {
      console.error('Erreur lors de la suppression de la ville des favoris :', error.message);
    }
  } catch (error) {
    console.error('Erreur inattendue :', error);
  }
};

export const isCityInFavorites = async (cityName) => {
  console.log("City Name:", cityName.cityName); // Ajoutez cette ligne

  try {
    const user = firebaseInstance.auth.currentUser;

    if (!user) {
      console.error('Aucun utilisateur connecté.');
      return false;
    }

    const userDoc = doc(favorisCollection, user.uid);
    const userDocSnapshot = await getDoc(userDoc);

    if (userDocSnapshot.exists()) {
      const favorisData = userDocSnapshot.data();
      const favoriteCities = favorisData && favorisData.Villes;


      if (favoriteCities && Array.isArray(favoriteCities)) {
        // Vérifiez si la ville est présente dans le tableau des favoris
        console.log(favoriteCities.includes(cityName.cityName))
        return favoriteCities.includes(cityName.cityName);
        
      }
    }

    return false;
    
  } catch (error) {
    console.error('Erreur lors de la vérification des favoris :', error);
    return false;
  }
};


