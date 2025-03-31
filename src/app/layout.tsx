/**
 * Root Layout Component
 * 
 * This is the root layout component for the Next.js application. It provides:
 * - Font configuration (Geist Sans and Geist Mono)
 * - Theme provider setup
 * - Basic HTML structure
 * - Global styles
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Geist Sans font configuration
 * Used as the primary font for the application
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration
 * Used for monospace text and code blocks
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application metadata configuration
 * Defines the basic SEO information for the application
 */
export const metadata: Metadata = {
  title: "Firestorm.js",
  description: "A simple, secure and serverless Next.js build package",
};

/**
 * Root Layout Component
 * 
 * The main layout wrapper for the application that provides:
 * - HTML structure with language and hydration settings
 * - Font variables for Geist Sans and Geist Mono
 * - Theme provider with system theme support
 * - Basic styling for the body element
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="firestorm-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
