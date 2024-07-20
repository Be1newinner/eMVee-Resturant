import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};

export let isFirebaseInitialized = false;
export let firebaseApp = null;

export function initializeFirebase() {
  if (!isFirebaseInitialized) {
    firebaseApp = initializeApp(firebaseConfig);
    isFirebaseInitialized = true;
  }
}

initializeFirebase();

export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const realtimeDB = getDatabase(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
export const fireStorage = getStorage(firebaseApp);
