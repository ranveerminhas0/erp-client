import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ArrowRightLeft,
  Users,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  Receipt,
  Layers,
  FileStack
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const [location] = useLocation();

  const navCategories: NavCategory[] = [
    {
      category: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/", icon: LayoutDashboard }
      ]
    },
    {
      category: "OPERATIONS",
      items: [
        { label: "Billing", href: "/billing", icon: ShoppingCart },
        { label: "Invoice List", href: "/invoice-list", icon: FileStack },
        { label: "Daily Book", href: "/daily-book", icon: BookOpen }
      ]
    },
    {
      category: "STOCK & MOVEMENT",
      items: [
        { label: "Inventory", href: "/inventory", icon: Package },
        { label: "Stock Transfer", href: "/stock-transfer", icon: ArrowRightLeft }
      ]
    },
    {
      category: "MASTERS & ACCOUNTS",
      items: [
        { label: "Accounts", href: "/accounts", icon: Users },
        { label: "Price List", href: "/price-list", icon: FileText }
      ]
    },
    {
      category: "SYSTEM",
      items: [
        { label: "Stock Master", href: "/stock-master", icon: Layers },
        { label: "Reports", href: "/reports", icon: BarChart3 },
        { label: "Settings", href: "/settings", icon: Settings }
      ]
    }
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 overflow-y-auto z-50 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Section Title */}
      <div className="px-4 py-3 border-b border-sidebar-border/30">
        <h3 className="text-xs font-extrabold tracking-widest text-sidebar-foreground/70 dark:text-sidebar-foreground/50 uppercase">Modules</h3>
      </div>

      {/* Navigation Categories */}
      <nav className="flex-1 pb-4">
        {navCategories.map((category) => (
          <div key={category.category}>
            {/* Category Header */}
            <div className="px-4 py-3 mt-2">
              <h4 className="text-xs font-bold tracking-wider text-sidebar-foreground/80 dark:text-sidebar-foreground/60 uppercase">
                {category.category}
              </h4>
            </div>

            {/* Category Items */}
            <div className="grid gap-0 px-2">
              {category.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <a
                      onClick={onClose}
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70"
                      )}
                      data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                    >
                      <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-sidebar-foreground/50")} />
                      {item.label}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
