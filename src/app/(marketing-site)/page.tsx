/**
 * Marketing Site Home Page
 * 
 * This is the main landing page for the marketing site section of the application.
 * It provides:
 * - Global header navigation
 * - Hero section with main marketing content
 * - Centered layout with responsive design
 */

import Header from "./_components/global/header/page";
import Hero from "./_components/home/hero";

/**
 * Home Page Component
 * 
 * The main landing page component that displays:
 * - Global header with navigation
 * - Hero section with marketing content
 * 
 * @returns {JSX.Element} The marketing site home page component
 */
export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <Hero />
    </div>
  );
}
