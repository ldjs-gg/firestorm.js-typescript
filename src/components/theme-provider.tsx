/**
 * Theme Provider Component
 * 
 * A client-side wrapper component that provides theme context to the entire application.
 * This component uses next-themes to manage theme state and provides theme switching
 * functionality to all child components.
 */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * ThemeProvider Component
 * 
 * Wraps the application with theme context and functionality.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with theme context
 * @param {Object} props...props - Additional props passed to NextThemesProvider
 * @returns {JSX.Element} A provider component that enables theme functionality
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 