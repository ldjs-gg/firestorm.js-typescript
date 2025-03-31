'use client'

import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPremiumStatus } from "@/app/(application)/account/_functions/getPremiumStatus";

export default function PremiumFeatureB() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (!user) {
        router.push("/");
        return;
      }
      
      // Check premium status
      const premiumStatus = await getPremiumStatus(app);
      setIsPremium(premiumStatus);
      
      if (!premiumStatus) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [auth, router, app]);

  if (!user || !isPremium) {
    return null; // or a loading spinner
  }

  return (
    <div className="p-4 bg-background h-[calc(100vh-65px)]">
      <h5 className="font-bold text-foreground">Premium Feature B</h5>
    </div>
  );
}