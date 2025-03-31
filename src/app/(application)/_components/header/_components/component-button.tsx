/**
 * Component Button
 * 
 * A simple button component used in the header for adding new components.
 * Features include:
 * - Ghost variant styling
 * - Icon integration
 * - Dark mode support
 * - Shadow effect
 */

import { Button } from "@/components/ui/button";
import Image from "next/image";

/**
 * Component Button
 * 
 * Renders a button with an add icon and text for creating new components.
 * Used in the application header for quick access to component creation.
 * 
 * @returns {JSX.Element} A button component with add icon and text
 */
export default function ComponentButton() {
  return (
    <Button variant="ghost" size="sm" className="cursor-pointer shadow-sm text-xs">
      <span>
        <Image src="/icons/add.svg" alt="Add Icon" width={16} height={16} className="dark:invert" />
      </span>
      Component Button
    </Button>
  );
}