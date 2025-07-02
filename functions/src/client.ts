import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Export Firebase Abstraction
export const region = "europe-west1";
export const db = admin.firestore;
