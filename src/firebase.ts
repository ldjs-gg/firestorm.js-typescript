/**
 * Firebase Configuration and Initialization Module
 * 
 * This module handles the initialization of Firebase services in the application.
 * It sets up Firebase with environment-specific configuration and handles
 * development environment emulator connections.
 */

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

/**
 * Firebase configuration object containing all necessary credentials and settings.
 * Values are pulled from environment variables for security.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

/**
 * Initializes Firebase in the application.
 * 
 * This function:
 * 1. Checks if Firebase is already initialized
 * 2. If not initialized, creates a new Firebase app instance
 * 3. In development environment, connects to the Firebase Functions emulator
 * 4. Returns the Firebase app instance
 * 
 * @returns {FirebaseApp} The initialized Firebase app instance
 */
const initFirebase = () => {
  const apps = getApps();
  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    
    // Initialize Functions and connect to emulator in development
    if (process.env.NODE_ENV === 'development') {
      const functions = getFunctions(app, 'us-central1');
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    
    return app;
  } else {
    return apps[0];
  }
};

export { initFirebase };
