/**
 * Tooltip Component
 * 
 * A reusable tooltip component that displays additional information on hover.
 * Features include:
 * - Multiple positioning options (top, right, bottom)
 * - Smooth fade-in/out animations
 * - Customizable content
 * - Accessible design
 * - Dark mode support
 */

import { ReactNode } from 'react';

/**
 * Tooltip component props interface
 * 
 * @interface TooltipProps
 * @property {ReactNode} children - The element that triggers the tooltip
 * @property {string} text - The text content to display in the tooltip
 * @property {'top' | 'right' | 'bottom'} [position='bottom'] - The position of the tooltip relative to its trigger
 */
interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'right' | 'bottom';
}

/**
 * Tooltip Component
 * 
 * Displays a tooltip with the specified text when hovering over the children element.
 * The tooltip can be positioned above, to the right, or below the trigger element.
 * 
 * @param {TooltipProps} props - Component props
 * @returns {JSX.Element} A tooltip component with the specified configuration
 */
export default function Tooltip({ children, text, position = 'bottom' }: TooltipProps) {
  // Position-specific classes for tooltip container
  const tooltipClasses = position === 'top' 
    ? 'left-1/2 -translate-x-1/2 bottom-full mb-1'
    : position === 'right'
    ? 'left-full top-1/2 -translate-y-1/2 ml-1'
    : 'left-1/2 -translate-x-1/2 top-[calc(100%+6px)]';

  // Position-specific classes for tooltip arrow
  const arrowClasses = position === 'top'
    ? 'left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-t-[4px] border-t-popover border-r-[4px] border-r-transparent dark:border-t-popover'
    : position === 'right'
    ? 'left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-popover border-b-[4px] border-b-transparent dark:border-r-popover'
    : 'left-1/2 -translate-x-1/2 -top-[4px] w-0 h-0 border-l-[4px] border-l-transparent border-b-[4px] border-b-popover border-r-[4px] border-r-transparent dark:border-b-popover';

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${tooltipClasses} px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-150 delay-[50ms] whitespace-nowrap pointer-events-none z-50 shadow-sm border border-border`}>
        {text}
        <div className={`absolute ${arrowClasses}`}></div>
      </div>
    </div>
  );
} 