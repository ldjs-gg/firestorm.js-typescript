/**
 * Marketing Site Header Component
 * 
 * A client-side header component for the marketing site that provides:
 * - Transparent to solid background transition on scroll
 * - Fixed positioning
 * - Logo and navigation integration
 * - Dark mode support
 * - Responsive design
 */

'use client'

import Logo from "./_components/logo";
import Nav from "./_components/nav";
import { useEffect, useState } from "react";

/**
 * Header Component
 * 
 * Renders the main header for the marketing site with dynamic background
 * that changes based on scroll position. Includes logo and navigation.
 * 
 * @returns {JSX.Element} A responsive header component with scroll effects
 */
export default function Header() {
  // Track scroll position for background effect
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * Scroll event handler
   * Updates the header background based on scroll position
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[72px] flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-10 transition-colors duration-200 ${
        isScrolled
          ? "bg-white dark:bg-black border-b-[1px] border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent border-b-[1px] border-transparent"
      }`}
    >
      <Logo />
      <Nav />
    </div>
  );
}