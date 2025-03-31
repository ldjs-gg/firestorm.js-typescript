/**
 * Marketing Site Navigation Component
 * 
 * A client-side navigation component for the marketing site that provides:
 * - Authentication state management
 * - Google sign-in integration
 * - Theme toggle functionality
 * - Responsive button states
 * - Navigation to dashboard
 */

'use client'

import { Button } from "@/components/ui/button";
import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

/**
 * Navigation Component
 * 
 * Renders the main navigation for the marketing site with:
 * - Authentication state-based UI
 * - Google sign-in functionality
 * - Theme toggle integration
 * - Navigation to dashboard
 * - Sign out functionality
 * 
 * @returns {JSX.Element} A navigation component with authentication controls
 */
export default function Nav() {
  // Initialize Firebase and get auth instance
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<User | null>(null);

  /**
   * Authentication state change handler
   * Updates user state when auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  /**
   * Handles Google sign-in process
   * Redirects to dashboard on successful sign-in
   */
  const signIn = async() => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      goToDashboard();
    }
  };

  /**
   * Handles sign-out process
   * Redirects to home page after signing out
   */
  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  /**
   * Navigates to the dashboard
   */
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="cursor-pointer">
        <ThemeToggle />
      </div>
      {user ? (
        <>
          <Button 
            onClick={goToDashboard} 
            className="bg-orange-600 hover:bg-orange-500 cursor-pointer text-white"
          >
            Dashboard
          </Button>
          <Button 
            onClick={signOut} 
            variant="outline"
            className="cursor-pointer"
          >
            Logout
          </Button>
        </>
      ) : (
        <Button 
          onClick={signIn} 
          className="bg-orange-600 hover:bg-orange-500 cursor-pointer text-white"
        >
          Get started for free
        </Button>
      )}
    </div>
  );
}