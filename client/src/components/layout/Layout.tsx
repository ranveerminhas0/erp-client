import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Header */}
      <Header 
        onMenuClick={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
        onCloseDailyBook={() => {
          const event = new CustomEvent('open-close-daily-book');
          window.dispatchEvent(event);
        }}
      />

      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content - Shifts right when sidebar opens */}
      <main className={`flex-1 mt-16 overflow-y-auto scrollbar-hide w-full transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
