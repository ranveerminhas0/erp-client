import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { Menu, X, Moon, Sun, LogOut, User, Settings, ShieldCheck, MapPin, ChevronDown, Bell, BookLock, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  onCloseDailyBook?: () => void;
}

export function Header({ onMenuClick, sidebarOpen, onCloseDailyBook }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [isDailyBookClosed, setIsDailyBookClosed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutWarningOpen, setIsLogoutWarningOpen] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(5);
  const themeToggleRef = useRef<HTMLDivElement>(null);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: "Ranveer",
    email: "ranveer@klkg.com",
    role: "Admin",
    accessLevel: "Full Access"
  });

  const [tempProfileData, setTempProfileData] = useState(profileData);

  useEffect(() => {
    let interval: any;
    if (isLogoutWarningOpen && logoutTimer > 0) {
      interval = setInterval(() => {
        setLogoutTimer((prev) => prev - 1);
      }, 1000);
    } else if (isLogoutWarningOpen && logoutTimer === 0) {
      setIsLogoutWarningOpen(false);
      setLocation("/login");
    }
    return () => clearInterval(interval);
  }, [isLogoutWarningOpen, logoutTimer, setLocation]);

  useEffect(() => {
    const handleStatus = (e: any) => {
      setIsDailyBookClosed(e.detail.closed);
    };
    window.addEventListener('daily-book-status', handleStatus);
    window.dispatchEvent(new CustomEvent('check-daily-book-status'));
    return () => window.removeEventListener('daily-book-status', handleStatus);
  }, [location]);

  const handleProfileUpdate = () => {
    setProfileData(tempProfileData);
    setIsProfileOpen(false);
  };

  const handleLogoutInitiate = () => {
    setDropdownOpen(false);
    setLogoutTimer(5);
    setIsLogoutWarningOpen(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-40 flex items-center justify-between px-6">
      {/* Logout Warning Dialog */}
      <Dialog open={isLogoutWarningOpen} onOpenChange={setIsLogoutWarningOpen}>
        <DialogContent className="max-w-[360px] p-8 border-none rounded-3xl shadow-2xl bg-white dark:bg-slate-900">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Logging Out</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              You're about to logout from the system. Redirecting in...
            </DialogDescription>
            <div className="text-5xl font-black text-primary animate-pulse">
              {logoutTimer}
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setIsLogoutWarningOpen(false)} 
              className="h-12 rounded-2xl font-bold text-[11px] uppercase tracking-widest border-slate-200 dark:border-slate-800"
            >
              Cancel Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Settings Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-[#FAFAFA] dark:bg-[#020617]">
          <DialogHeader className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Profile Settings
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-5">
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Full Name</Label>
              <Input 
                value={tempProfileData.name}
                onChange={e => setTempProfileData({...tempProfileData, name: e.target.value})}
                className="h-9 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Software Access Email</Label>
              <Input 
                value={tempProfileData.email}
                onChange={e => setTempProfileData({...tempProfileData, email: e.target.value})}
                className="h-9 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Role</Label>
                <Input disabled value={tempProfileData.role} className="h-9 rounded-xl bg-muted/30 font-bold border-none text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Access Level</Label>
                <Input disabled value={tempProfileData.accessLevel} className="h-9 rounded-xl bg-muted/30 font-bold border-none text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsProfileOpen(false)} className="h-9 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest border-slate-200 dark:border-slate-800">
              Cancel
            </Button>
            <Button onClick={handleProfileUpdate} className="h-9 px-6 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 flex items-center gap-2 shadow-lg">
              <Save className="w-3.5 h-3.5" />
              Update Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-4">
        {/* Left: Hamburger / Close Icon */}
        <button
          onClick={onMenuClick}
          className={`transition-colors duration-200 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer`}
          data-testid="button-toggle-sidebar"
          style={{
            position: "relative",
            width: "20px",
            height: "16px",
            padding: "0",
            margin: "0",
            background: "none",
            border: "none",
          }}
        >
          <span 
            className={`block bg-primary transition-all duration-300`}
            style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              left: "0",
              top: sidebarOpen ? "7px" : "1px",
              transform: sidebarOpen ? "rotate(45deg)" : "none",
              transformOrigin: "center",
            }}
          />
          <span 
            className={`block bg-primary transition-all duration-300`}
            style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              left: "0",
              top: "7px",
              opacity: sidebarOpen ? 0 : 1,
            }}
          />
          <span 
            className={`block bg-primary transition-all duration-300`}
            style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              left: "0",
              top: sidebarOpen ? "7px" : "13px",
              transform: sidebarOpen ? "rotate(-45deg)" : "none",
              transformOrigin: "center",
            }}
          />
        </button>

        {/* Organization Name & Terminal */}
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold tracking-tight text-primary uppercase">KLKG ORGANISATION</h1>
          <span className="text-muted-foreground font-medium text-xs border-l border-border pl-2">TERMINAL MM01</span>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <div className="relative">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setHasNewNotifications(false);
            }}
            className="h-10 w-10 flex items-center justify-center transition-colors duration-200 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-primary relative"
            data-testid="button-notifications"
            onMouseEnter={(e) => {
              const bellIcon = e.currentTarget.querySelector(".bell-icon") as HTMLElement;
              if (bellIcon) {
                bellIcon.style.animation = "none";
                setTimeout(() => {
                  bellIcon.style.animation = "bell-swing 0.6s ease-in-out";
                }, 10);
              }
            }}
            onMouseLeave={(e) => {
              const bellIcon = e.currentTarget.querySelector(".bell-icon") as HTMLElement;
              if (bellIcon) {
                bellIcon.style.animation = "none";
              }
            }}
          >
            <span className="bell-icon" style={{ display: "inline-flex", alignItems: "center" }}>
              <Bell className="h-4 w-4" />
            </span>
            {hasNewNotifications && (
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-1 w-80 bg-background border border-border/50 rounded-lg shadow-2xl overflow-hidden z-50">
              {/* Header */}
              <div className="px-5 py-4 border-b border-border/50 bg-secondary/20">
                <h3 className="text-sm font-bold text-primary">Latest Updates</h3>
              </div>
              
              {/* Content */}
              <div className="p-2 space-y-1">
                <div className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">System Update</span>
                    <span className="text-[9px] font-bold text-primary/30">Just now</span>
                  </div>
                  <p className="text-xs font-bold text-primary mb-1">v1.0 is Shipped</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">The initial stable release is now live. All terminal modules are active and optimized.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 group outline-none cursor-pointer">
            <Avatar className="h-9 w-9 border border-border transition-all duration-200 group-hover:border-primary/20 group-hover:shadow-sm">
              <AvatarFallback className="bg-secondary text-primary font-bold text-xs uppercase">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", dropdownOpen && "rotate-180")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-0 shadow-2xl border-border/50 rounded-xl overflow-hidden mt-1">
          {/* User Section */}
          <div className="px-5 py-5 bg-gradient-to-br from-secondary/50 to-background border-b border-border/50">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg uppercase">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-base font-bold text-primary truncate leading-none mb-1.5">{profileData.name}</p>
                <Badge variant="outline" className="text-[9px] h-4.5 px-1.5 font-bold uppercase tracking-wider bg-primary/5 text-primary/70 border-primary/10">
                  {profileData.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Context Details */}
          <div className="p-2">
            <div className="px-3 py-2.5 rounded-lg bg-secondary/30 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground font-medium flex items-center gap-2 uppercase tracking-tight">
                  <MapPin className="h-3.5 w-3.5 text-primary/40" /> Showroom
                </span>
                <span className="font-bold text-primary">KLKG</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground font-medium flex items-center gap-2 uppercase tracking-tight">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary/40" /> Terminal
                </span>
                <span className="font-mono font-bold text-primary">MM01</span>
              </div>
              <div className="pt-1.5 border-t border-border/30 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">System Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.1em]">Online</span>
                </div>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="mx-0 h-[1px] bg-border/40" />

          {/* Actions */}
          <div className="p-1.5 space-y-0.5">
            <DropdownMenuItem 
              onClick={() => {
                setTempProfileData(profileData);
                setIsProfileOpen(true);
              }}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:!bg-slate-100 dark:hover:!bg-slate-700 focus:!bg-slate-100 dark:focus:!bg-slate-700 !text-primary text-sm font-medium transition-colors border-none outline-none select-none"
            >
              <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center pointer-events-none">
                <User className="h-4 w-4 text-primary/60" />
              </div>
              <span className="pointer-events-none">Profile Settings</span>
            </DropdownMenuItem>
            
            <div ref={themeToggleRef}>
              <DropdownMenuItem 
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:!bg-slate-100 dark:hover:!bg-slate-700 focus:!bg-slate-100 dark:focus:!bg-slate-700 !text-primary text-sm font-medium transition-colors border-none outline-none select-none"
                onClick={async () => {
                  if (!document.startViewTransition || !themeToggleRef.current) {
                    setTheme(theme === "dark" ? "light" : "dark");
                    return;
                  }
                  
                  const transition = document.startViewTransition(() => {
                    flushSync(() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    });
                  });

                  await transition.ready;

                  const { top, left, width, height } = themeToggleRef.current.getBoundingClientRect();
                  const x = left + width / 2;
                  const y = top + height / 2;

                  const maxDist = Math.hypot(
                    Math.max(x, window.innerWidth - x),
                    Math.max(y, window.innerHeight - y)
                  );

                  document.documentElement.animate(
                    {
                      clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxDist}px at ${x}px ${y}px)`,
                      ],
                    },
                    {
                      duration: 600,
                      easing: "ease-in-out",
                      pseudoElement: "::view-transition-new(root)",
                    }
                  );
                }}
              >
                <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center pointer-events-none">
                  {theme === "dark" ? <Sun className="h-4 w-4 text-primary/60" /> : <Moon className="h-4 w-4 text-primary/60" />}
                </div>
                <span className="pointer-events-none">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </DropdownMenuItem>
            </div>

            {location === "/daily-book" && onCloseDailyBook && !isDailyBookClosed && (
              <DropdownMenuItem 
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:!bg-amber-100 dark:hover:!bg-amber-900/30 focus:!bg-amber-100 dark:focus:!bg-amber-900/30 !text-amber-600 dark:!text-amber-500 text-sm font-bold transition-colors border-none outline-none select-none"
                onClick={() => {
                  setDropdownOpen(false);
                  onCloseDailyBook();
                }}
              >
                <div className="h-8 w-8 rounded-md bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center pointer-events-none">
                  <BookLock className="h-4 w-4" />
                </div>
                <span className="pointer-events-none">Close Daily Book</span>
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator className="mx-0 h-[1px] bg-border/40" />

          {/* Logout */}
          <div className="p-1.5">
            <DropdownMenuItem 
              onClick={handleLogoutInitiate}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:!bg-destructive/10 focus:!bg-destructive/10 !text-destructive text-sm font-bold border-none outline-none select-none"
            >
              <div className="h-8 w-8 rounded-md bg-destructive/5 flex items-center justify-center pointer-events-none">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="pointer-events-none">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
