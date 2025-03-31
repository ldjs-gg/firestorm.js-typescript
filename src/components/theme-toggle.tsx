/**
 * Theme Toggle Component
 * 
 * A client-side component that provides a button to switch between light and dark themes.
 * Uses next-themes for theme management and includes animated icons for visual feedback.
 */

"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Image from "next/image"

/**
 * ThemeToggle Component
 * 
 * Renders a button that toggles between light and dark themes.
 * Features:
 * - Animated icon transition between light/dark mode
 * - Accessible button with screen reader support
 * - Hover effects for better user interaction
 * - Uses next-themes for theme state management
 * 
 * @returns {JSX.Element} A button component with theme toggle functionality
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-9 w-9 hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
      <span className="sr-only">
        Toggle theme
      </span>
    </Button>
  )
} 