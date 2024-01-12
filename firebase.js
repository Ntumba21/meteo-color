import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAizPE_8vZot94ZCG9ffetOYv6k1ECThKA",
  authDomain: "meteo-react-7b2bd.firebaseapp.com",
  projectId: "meteo-react-7b2bd",
  storageBucket: "meteo-react-7b2bd.appspot.com",
  messagingSenderId: "588530347770",
  appId: "1:588530347770:web:21701b2bc05aebaab82343",
  measurementId: "G-0MKDWC894Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);  // Utilisez getDatabase pour obtenir une référence à la base de données en temps réel

auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = __DEV__;

const firebaseInstance = { app, auth, firestore, database };



export default firebaseInstance;
