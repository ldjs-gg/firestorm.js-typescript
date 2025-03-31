import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ComponentButtonProps {
  isCollapsed?: boolean;
}

export default function ComponentButton({ isCollapsed }: ComponentButtonProps) {
  return (
    <Button 
      variant="ghost" 
      size="lg" 
      className={`cursor-pointer shadow-sm text-xs w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-80 transition-opacity duration-300 hover:text-white ${isCollapsed ? 'px-0 justify-center' : ''}`}
    >
      <span className="flex items-center justify-center">
        <Image src="/icons/add-light.svg" alt="Add Icon" width={20} height={20} />
      </span>
      {!isCollapsed && "Component Button"}
    </Button>
  );
}