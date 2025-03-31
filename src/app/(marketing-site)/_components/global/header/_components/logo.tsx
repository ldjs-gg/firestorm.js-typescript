/**
 * Marketing Site Logo Component
 * 
 * A responsive logo component for the marketing site header that provides:
 * - Link to home page
 * - Responsive text display (hidden on mobile)
 * - Hover effects
 * - Image optimization with Next.js
 */

import Image from "next/image";
import Link from "next/link";

/**
 * Logo Component
 * 
 * Renders the application logo with responsive text display.
 * Links to the home page and includes hover effects for better interactivity.
 * Text is hidden on mobile devices for a cleaner look.
 * 
 * @returns {JSX.Element} A responsive logo component
 */
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link 
        href="/" 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
      >
        <Image 
          src="/firestorm_logo.svg" 
          alt="Firestorm.js" 
          width={32} 
          height={32}
        />
        <h1 className="hidden md:block text-foreground">
          Firestorm.js
        </h1>
      </Link>
    </div>
  );
}