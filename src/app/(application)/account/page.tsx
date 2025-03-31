'use client'

import { Button } from "@/components/ui/button";
import StandardPanel from "./_components/standardPanel";
import PremiumPanel from "./_components/premiumPanel";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "./_functions/stripePayment";
import { getPremiumStatus } from "./_functions/getPremiumStatus";

export default function Account() {
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

  const username = user?.displayName;
  const email = user?.email;
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = user 
        ? await getPremiumStatus(app) 
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, user?.uid]);

  const upgradeToPremium = async() => {
    try {
      setIsLoading(true);
      const priceId = "price_1R6OLJCmqCvukeXKizvocThA";
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
      console.log("Upgrade to Premium");
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const manageSubscription = async() => {
    try {
      setIsLoading(true);
      const portalUrl = await getPortalUrl(app);
      window.location.href = portalUrl;
    } catch (error) {
      console.error("Failed to get portal URL:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    auth.signOut();
    router.push("/")
  }

  const upgradeToPremiumButton = (
    <Button onClick={upgradeToPremium} disabled={isLoading} className="cursor-pointer text-xs">
      {isLoading ? "Loading..." : "Upgrade your plan"}
    </Button>
  );

  const managePortalButton = (
    <Button onClick={manageSubscription} disabled={isLoading} className="cursor-pointer text-xs">
      {isLoading ? "Loading..." : "Manage subscription"}
    </Button>
  );

  const signOutButton = (
    <Button variant='ghost' onClick={signOut} className="cursor-pointer text-xs">Logout</Button>
  );

  const accountSummary = (
    <div className="flex flex-col gap-1">
      <small className="text-muted-foreground">Signed in as {username}</small>
      <p className="text-foreground">{email}</p>
    </div>
  );

  const statusPanel = isPremium ? <PremiumPanel /> : <StandardPanel />;
  const memberButton = isPremium ? managePortalButton : upgradeToPremiumButton;

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-background h-[calc(100vh-65px)]">
      <h5 className="font-bold text-foreground">Your Account</h5>
      <div className="flex flex-col items-start gap-4 bg-card p-4 rounded-md w-full shadow-sm border border-border">
        {accountSummary}
        {statusPanel}
        {memberButton}
        {signOutButton}
      </div>
    </div>
  );
}