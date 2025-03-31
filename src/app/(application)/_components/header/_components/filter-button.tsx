/**
 * Filter Button Component
 * 
 * A dropdown button component for filtering dashboard data by time period.
 * Features include:
 * - Time-based filtering options
 * - Dropdown menu interface
 * - State management for selected filter
 * - Conditional rendering based on route
 * - Dark mode support
 */

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Filter Button Component
 * 
 * Renders a dropdown button for filtering dashboard data by time period.
 * Only visible on the dashboard route and provides options for different time ranges.
 * 
 * @returns {JSX.Element} A dropdown button component for time-based filtering
 */
export default function FilterButton() {
  // Initialize Firebase and get auth instance
  const app = initFirebase();
  const auth = getAuth(app);
  const [selectedFilter, setSelectedFilter] = useState("Last 24 hours");
  const pathname = usePathname();

  const user = auth.currentUser;

  /**
   * Handles the selection of a time filter
   * Updates the selected filter state and logs the selection
   * 
   * @param {string} filter - The selected time filter
   */
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    // Here you can add the logic to apply the filter
    console.log("Selected filter:", filter);
  };

  // Only render on dashboard route
  if(pathname === "/dashboard") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="cursor-pointer shadow-sm text-xs">
            <span>
              <Image src="/icons/filter.svg" alt="Filter Icon" width={16} height={16} className="dark:invert" />
            </span>
            {selectedFilter}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-background border-border">
          <DropdownMenuItem onClick={() => handleFilterSelect("Last 24 hours")} className="text-foreground hover:bg-accent">
            Last 24 hours
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("Last 7 days")} className="text-foreground hover:bg-accent">
            Last 7 days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("Last 28 days")} className="text-foreground hover:bg-accent">
            Last 28 days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("Month to date")} className="text-foreground hover:bg-accent">
            Month to date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("Year to date")} className="text-foreground hover:bg-accent">
            Year to date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilterSelect("All time")} className="text-foreground hover:bg-accent">
            All time
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
}