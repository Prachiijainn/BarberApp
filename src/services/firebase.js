// Firebase configuration for Barber Booking App
// You'll need to replace this with your actual Firebase project credentials

import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Firebase configuration object
const firebaseConfig = {
  // Replace with your Firebase project configuration
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase (this is automatically done by react-native-firebase)
// But we can access the services like this:

export { auth, firestore, messaging };

// Helper functions for Firebase operations
export const createUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

// Firestore helper functions
export const addDocument = async (collection, data) => {
  try {
    const docRef = await firestore().collection(collection).add(data);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async (collection, docId, data) => {
  try {
    await firestore().collection(collection).doc(docId).update(data);
  } catch (error) {
    throw error;
  }
};

export const getDocument = async (collection, docId) => {
  try {
    const doc = await firestore().collection(collection).doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getCollection = async (collection) => {
  try {
    const snapshot = await firestore().collection(collection).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};