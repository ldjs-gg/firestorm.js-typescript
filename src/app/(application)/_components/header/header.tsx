/**
 * Application Header Component
 * 
 * A client-side component that provides the main navigation header for the application.
 * Features include:
 * - User greeting and authentication state
 * - Theme toggle functionality
 * - Settings and logout buttons
 * - Mobile-responsive menu controls
 * - Filter and component buttons
 */

'use client'

import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { Component, useEffect, useState } from "react";
import Image from "next/image";
import FilterButton from "./_components/filter-button";
import ComponentButton from "./_components/component-button";
import Tooltip from "./_components/tooltip";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

/**
 * Header component props interface
 * 
 * @interface HeaderProps
 * @property {boolean} isMobileMenuOpen - Whether the mobile menu is currently open
 * @property {(isOpen: boolean) => void} setIsMobileMenuOpen - Function to toggle mobile menu state
 */
interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

/**
 * Header Component
 * 
 * The main navigation header for the application that provides:
 * - User authentication state display
 * - Theme toggle functionality
 * - Settings and logout actions
 * - Mobile-responsive menu controls
 * - Filter and component buttons
 * 
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} The header component
 */
export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  // Initialize Firebase and get auth instance
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  /**
   * Authentication state change handler
   * Updates the user state when auth state changes
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  // Get user's first name for greeting
  const username = user?.displayName?.split(" ")[0];

  return (
    <div className="w-full h-[65px] border-b-[1px] border-border flex items-center justify-between p-4 md:pl-6">
      {/* User greeting section */}
      <div className="flex items-center gap-2">
        <div className="text-xs dark:text-gray-100">Hello, {username}</div>
      </div>

      {/* Action buttons section */}
      <div className="flex items-center gap-4">
        {/* Filter button - hidden on mobile */}
        <div className="hidden lg:block">
          <FilterButton />
        </div>

        {/* Component button */}
        <div className="">
          <ComponentButton />
        </div>

        {/* Desktop-only action buttons */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Tooltip text="Settings">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/settings')}
              className="relative h-9 w-9 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <Image src="/icons/settings.svg" alt="Settings Button" width={20} height={20} className="dark:invert" />
            </Button>
          </Tooltip>
          <Tooltip text="Logout">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                auth.signOut();
                router.push("/");
              }}
              className="relative h-9 w-9 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <Image src="/icons/logout.svg" alt="Logout Button" width={20} height={20} className="dark:invert" />
            </Button>
          </Tooltip>
        </div>

        {/* Mobile menu controls */}
        <div className="md:hidden">
          {/* Hamburger button - only visible when menu is closed */}
          <div 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`w-7 h-7 flex items-center justify-center cursor-pointer ${
              isMobileMenuOpen ? 'hidden' : ''
            }`}
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <div className="w-full h-[2px] bg-black dark:bg-white"></div>
              <div className="w-full h-[2px] bg-black dark:bg-white"></div>
              <div className="w-full h-[2px] bg-black dark:bg-white"></div>
            </div>
          </div>

          {/* Close button - only visible when menu is open */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-7 h-7 flex items-center justify-center cursor-pointer ${
              !isMobileMenuOpen ? 'hidden' : ''
            }`}
          >
            <div className="relative w-5 h-5">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black dark:bg-white -translate-y-1/2 rotate-45"></div>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black dark:bg-white -translate-y-1/2 -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}