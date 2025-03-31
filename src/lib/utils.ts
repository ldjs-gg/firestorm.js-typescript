/**
 * Utility Functions
 * 
 * This module provides utility functions for common operations across the application.
 * Currently includes a class name merging utility that combines Tailwind CSS classes
 * efficiently while handling conflicts.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names and resolves Tailwind CSS conflicts
 * 
 * This utility function combines multiple class name inputs and intelligently
 * merges them while handling Tailwind CSS class conflicts. It uses:
 * - clsx: For conditional class name joining
 * - tailwind-merge: For resolving Tailwind CSS class conflicts
 * 
 * @param {...ClassValue[]} inputs - Array of class names or conditional class objects
 * @returns {string} Merged class names with resolved conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
