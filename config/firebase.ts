import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '../firebaseAuth/reactNativeAsyncStorage'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBO8zkVHUD9Hxl48jN_tW631BsrvjYYwHU",
  authDomain: "tapzx-11a18.firebaseapp.com",
  projectId: "tapzx-11a18",
  storageBucket: "tapzx-11a18.appspot.com", // ✅ Corrected storage bucket
  messagingSenderId: "294123038350",
  appId: "1:294123038350:web:806a1a865ab1f9e13fcbdf",
  measurementId: "G-WFPH1GJ2FJ"
};

// ✅ Initialize Firebase App (only once)
const app = initializeApp(firebaseConfig);

// ✅ Conditional Auth Initialization (Web vs Native)
const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

// ✅ Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export modules
export { app, auth, db, storage };
