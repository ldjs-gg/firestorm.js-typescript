/**
 * Application Layout Component
 * 
 * This is the main layout component for the authenticated application section.
 * It provides:
 * - Authentication state management
 * - Responsive sidebar navigation
 * - Mobile menu handling
 * - Protected route functionality
 */

'use client'

import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Sidebar from "./_components/sidebar/sidebar";
import Header from "./_components/header/header";

/**
 * ApplicationLayout Component
 * 
 * The main layout wrapper for authenticated application routes that provides:
 * - Firebase authentication integration
 * - Protected route handling
 * - Responsive sidebar navigation
 * - Mobile menu functionality
 * - Click outside handling for mobile menu
 * - Window resize handling for responsive design
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The application layout component
 */
export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Firebase and get auth instance
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  
  // State management for user, sidebar, and mobile menu
  const [user, setUser] = useState(auth.currentUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  /**
   * Authentication state change handler
   * Redirects to home if user is not authenticated
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  /**
   * Click outside handler for mobile menu
   * Closes the mobile menu when clicking outside the sidebar
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  /**
   * Window resize handler
   * Closes mobile menu when switching to desktop view
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show nothing while checking authentication
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Mobile */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar 
          isMobileMenuOpen={false}
          onCloseMobileMenu={() => {}}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}