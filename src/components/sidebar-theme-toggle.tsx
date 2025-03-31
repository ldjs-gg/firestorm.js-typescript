/**
 * Sidebar Theme Toggle Component
 * 
 * A client-side component that displays the current theme icon in the sidebar.
 * This is a non-interactive version of the theme toggle, used for visual indication
 * of the current theme state in the sidebar navigation.
 */

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

/**
 * SidebarThemeToggle Component
 * 
 * Renders a static button that displays the current theme icon.
 * Features:
 * - Non-interactive display of current theme
 * - Animated icon transition between light/dark mode
 * - Accessible with screen reader support
 * - Used specifically in the sidebar context
 * 
 * @returns {JSX.Element} A static button component showing the current theme icon
 */
export function SidebarThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5 p-0 hover:bg-transparent pointer-events-none"
    >
      {/* Light mode icon - visible in light theme, hidden in dark theme */}
      <Image 
        src="/icons/light-mode.svg" 
        alt="Light Mode" 
        width={20} 
        height={20} 
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:invert" 
      />
      {/* Dark mode icon - hidden in light theme, visible in dark theme */}
      <Image 
        src="/icons/dark-mode.svg" 
        alt="Dark Mode" 
        width={20} 
        height={20} 
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:invert" 
      />
      {/* Screen reader text for accessibility */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 