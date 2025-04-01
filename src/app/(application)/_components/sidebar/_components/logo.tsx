/**
 * Logo Component
 * 
 * A responsive logo component that adapts to the sidebar's collapsed state.
 * Features include:
 * - Collapsible text display
 * - Link to dashboard
 * - Hover effects
 * - Image optimization with Next.js
 */

import Image from "next/image";
import Link from "next/link";

/**
 * Logo component props interface
 * 
 * @interface LogoProps
 * @property {boolean} [isCollapsed] - Whether the sidebar is in collapsed state
 */
interface LogoProps {
  isCollapsed?: boolean;
}

/**
 * Logo Component
 * 
 * Renders the application logo with optional text display based on sidebar state.
 * Links to the dashboard and includes hover effects for better interactivity.
 * 
 * @param {LogoProps} props - Component props
 * @returns {JSX.Element} A responsive logo component
 */
export default function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className={`flex-1 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
      <Link 
        href="/dashboard" 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
      >
        <div className="w-8 h-8 relative flex-shrink-0">
          <Image 
            src="/firestorm-logo.svg" 
            alt="Firestorm.js" 
            fill
            className="object-contain"
          />
        </div>
        {!isCollapsed && (
          <h1 className="truncate">
            Firestorm.js
          </h1>
        )}
      </Link>
    </div>
  );
}