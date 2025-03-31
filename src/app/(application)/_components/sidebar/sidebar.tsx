/**
 * Application Sidebar Component
 * 
 * A client-side component that provides the main navigation sidebar for the application.
 * Features include:
 * - Collapsible sidebar with mobile support
 * - Premium feature access control
 * - User profile management
 * - Theme toggle integration
 * - Responsive design with mobile menu
 */

'use client'

import ComponentButton from "../sidebar/_components/component-button";
import Logo from "./_components/logo";
import Image from "next/image";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getPremiumStatus } from "@/app/(application)/account/_functions/getPremiumStatus";
import { getCheckoutUrl } from "@/app/(application)/account/_functions/stripePayment";
import { Button } from "@/components/ui/button";
import Tooltip from "./_components/tooltip";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { SidebarThemeToggle } from "@/components/sidebar-theme-toggle";

/**
 * Sidebar component props interface
 * 
 * @interface SidebarProps
 * @property {(collapsed: boolean) => void} [onCollapse] - Callback function when sidebar collapse state changes
 * @property {boolean} [isMobileMenuOpen] - Whether the mobile menu is currently open
 * @property {() => void} [onCloseMobileMenu] - Function to close the mobile menu
 */
interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

/**
 * Sidebar Component
 * 
 * The main navigation sidebar for the application that provides:
 * - Collapsible navigation with mobile support
 * - Premium feature access control
 * - User profile management
 * - Theme toggle integration
 * - Responsive design with mobile menu
 * 
 * @param {SidebarProps} props - Component props
 * @returns {JSX.Element} The sidebar component
 */
export default function Sidebar({ onCollapse, isMobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  // Initialize Firebase and get auth instance
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  // State management
  const [user, setUser] = useState(auth.currentUser);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Window resize handler
   * Updates mobile state based on window width
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Authentication state change handler
   * Updates user state and checks premium status
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkPremiumStatus();
      }
    });

    return () => unsubscribe();
  }, [auth]);

  /**
   * Collapse state change handler
   * Notifies parent component of collapse state changes
   */
  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);

  /**
   * Mobile menu state handler
   * Resets collapse state when mobile menu is closed
   */
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsCollapsed(false);
    }
  }, [isMobileMenuOpen]);

  /**
   * Checks the user's premium subscription status
   */
  const checkPremiumStatus = async () => {
    try {
      const status = await getPremiumStatus(app);
      setIsPremium(status);
    } catch (error) {
      console.error("Error checking premium status:", error);
    }
  };

  /**
   * Handles the upgrade to premium process
   * Redirects to Stripe checkout
   */
  const upgradeToPremium = async() => {
    try {
      setIsLoading(true);
      const priceId = "price_1R6OLJCmqCvukeXKizvocThA";
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen flex flex-col border-r-[1px] border-border transition-all duration-300 bg-background ${isCollapsed && !isMobile ? 'w-[80px]' : 'w-[248px]'} relative`}>
      {/* Top section with logo and collapse button */}
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full flex items-center justify-between">
          <Logo isCollapsed={isCollapsed && !isMobile} />
          {/* Desktop Collapse Button */}
          <div 
            className="cursor-pointer p-1 bg-background rounded-full border-[1px] border-border absolute top-4 -right-[14px] hover:bg-accent transition-colors md:block hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Image 
              src="/icons/arrow-left.svg" 
              alt="Close Icon" 
              width={20} 
              height={20} 
              className={`transition-transform duration-300 dark:invert ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
        <div className="w-[calc(100%+32px)] border-b border-border -ml-4"></div>
        <ComponentButton isCollapsed={isCollapsed && !isMobile} />
        
        {/* Navigation items */}
        <div className="flex flex-col gap-2">
          {(!isCollapsed || isMobile) && <p className="text-xs text-muted-foreground">Features</p>}
          
          {/* Dashboard link */}
          {isCollapsed && !isMobile ? (
            <Tooltip text="Dashboard" position="right">
              <div className="flex items-center justify-center gap-2 w-full hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => {
                router.push('/dashboard');
                if (isMobile && isMobileMenuOpen) {
                  onCloseMobileMenu?.();
                }
              }}>
                <Image src="/icons/dashboard.svg" alt="Dashboard Icon" width={20} height={20} className="dark:invert" />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 w-full hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => {
              router.push('/dashboard');
              if (isMobile && isMobileMenuOpen) {
                onCloseMobileMenu?.();
              }
            }}>
              <Image src="/icons/dashboard.svg" alt="Dashboard Icon" width={20} height={20} className="dark:invert" />
              <p className="text-xs">Dashboard</p>
            </div>
          )}

          {/* Free Feature link */}
          {isCollapsed && !isMobile ? (
            <Tooltip text="Free Feature" position="right">
              <div className="flex items-center justify-center gap-2 w-full hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => {
                router.push('/free-feature');
                if (isMobile && isMobileMenuOpen) {
                  onCloseMobileMenu?.();
                }
              }}>
                <Image src="/icons/book.svg" alt="Book Icon" width={20} height={20} className="dark:invert" />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 w-full hover:bg-accent p-2 rounded-md cursor-pointer" onClick={() => {
              router.push('/free-feature');
              if (isMobile && isMobileMenuOpen) {
                onCloseMobileMenu?.();
              }
            }}>
              <Image src="/icons/book.svg" alt="Book Icon" width={20} height={20} className="dark:invert" />
              <p className="text-xs">Free Feature</p>
            </div>
          )}

          {/* Premium Feature A link */}
          {isCollapsed && !isMobile ? (
            <Tooltip text="Premium Feature" position="right">
              <div className={`flex items-center justify-center gap-2 w-full p-2 rounded-md ${isPremium ? 'hover:bg-accent cursor-pointer' : 'cursor-default opacity-50'}`} onClick={() => {
                if (isPremium) {
                  router.push('/premium-feature-a');
                  if (isMobile && isMobileMenuOpen) {
                    onCloseMobileMenu?.();
                  }
                }
              }}>
                <Image src="/icons/analytics.svg" alt="Analytics Icon" width={20} height={20} className="dark:invert" />
              </div>
            </Tooltip>
          ) : (
            <div className={`flex items-center gap-2 w-full p-2 rounded-md ${isPremium ? 'hover:bg-accent cursor-pointer' : 'cursor-default opacity-50'}`} onClick={() => {
              if (isPremium) {
                router.push('/premium-feature-a');
                if (isMobile && isMobileMenuOpen) {
                  onCloseMobileMenu?.();
                }
              }
            }}>
              <Image src="/icons/analytics.svg" alt="Analytics Icon" width={20} height={20} className="dark:invert" />
              <p className="text-xs">Premium Feature</p>
            </div>
          )}

          {/* Premium Feature B link */}
          {isCollapsed && !isMobile ? (
            <Tooltip text="Premium Feature" position="right">
              <div className={`flex items-center justify-center gap-2 w-full p-2 rounded-md ${isPremium ? 'hover:bg-accent cursor-pointer' : 'cursor-default opacity-50'}`} onClick={() => {
                if (isPremium) {
                  router.push('/premium-feature-b');
                  if (isMobile && isMobileMenuOpen) {
                    onCloseMobileMenu?.();
                  }
                }
              }}>
                <Image src="/icons/cloud.svg" alt="Cloud Icon" width={20} height={20} className="dark:invert" />
              </div>
            </Tooltip>
          ) : (
            <div className={`flex items-center gap-2 w-full p-2 rounded-md ${isPremium ? 'hover:bg-accent cursor-pointer' : 'cursor-default opacity-50'}`} onClick={() => {
              if (isPremium) {
                router.push('/premium-feature-b');
                if (isMobile && isMobileMenuOpen) {
                  onCloseMobileMenu?.();
                }
              }
            }}>
              <Image src="/icons/cloud.svg" alt="Cloud Icon" width={20} height={20} className="dark:invert" />
              <p className="text-xs">Premium Feature</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section with upgrade button and user profile */}
      <div className="mt-auto">
        {/* Upgrade Button - Shown only for non-premium users and when sidebar is expanded */}
        {!isPremium && (!isCollapsed || isMobile) && (
          <div className="mb-4 px-4">
            <Button 
              onClick={upgradeToPremium} 
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white text-xs cursor-pointer"
            >
              {isLoading ? "Loading..." : "Upgrade your plan"}
            </Button>
          </div>
        )}
        
        {/* User Profile Card */}
        <div className="w-full border-t border-border"></div>
        <div onClick={() => {
          router.push("/account");
          if (isMobile && isMobileMenuOpen) {
            onCloseMobileMenu?.();
          }
        }} className="p-4">
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} gap-3 p-2 hover:bg-accent rounded-md cursor-pointer`}>
            <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={user?.photoURL || "/default-avatar.png"}
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium truncate text-foreground">{user?.displayName || "User"}</p>
                  {isPremium && (
                    <Tooltip text="Premium Plan">
                      <span className="text-yellow-500 text-xs flex items-center -m-[2px] mx-[1px]">★</span>
                    </Tooltip>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Settings and Logout */}
        {isMobile && (
          <>
            <div className="w-full border-t border-border"></div>
            <div className="p-4">
              <div 
                onClick={() => {
                  router.push('/settings');
                  if (isMobile && isMobileMenuOpen) {
                    onCloseMobileMenu?.();
                  }
                }} 
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer"
              >
                <Image src="/icons/settings.svg" alt="Settings Icon" width={20} height={20} className="dark:invert" />
                <p className="text-sm text-foreground">Settings</p>
              </div>
              <div 
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer"
              >
                <SidebarThemeToggle />
                <p className="text-sm text-foreground">Theme</p>
              </div>
              <div 
                onClick={() => {
                  auth.signOut();
                  router.push("/");
                  if (isMobile && isMobileMenuOpen) {
                    onCloseMobileMenu?.();
                  }
                }} 
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer"
              >
                <Image src="/icons/logout.svg" alt="Logout Icon" width={20} height={20} className="dark:invert" />
                <p className="text-sm text-foreground">Logout</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}