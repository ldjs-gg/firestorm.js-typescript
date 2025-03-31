'use client'

import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="p-4 bg-background h-[calc(100vh-65px)]">
      <h5 className="font-bold text-foreground">Dashboard</h5>
    </div>
  );
}