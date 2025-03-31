'use client'

import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

export const getCheckoutUrl = async (
  app: FirebaseApp,
  priceId: string
): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "users",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: `${window.location.origin}/dashboard`,
    cancel_url: `${window.location.origin}/dashboard`,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  
  if (!user) throw new Error("User is not authenticated");

  try {
    const functions = getFunctions(app, "europe-west2");
    const functionRef = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
    
    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/dashboard`
    });

    // The response data should contain the URL
    const portalData = data as { url: string };
    if (!portalData?.url) {
      throw new Error("No portal URL returned");
    }

    return portalData.url;
  } catch (error) {
    console.error("Error getting portal URL:", error);
    throw error;
  }
};