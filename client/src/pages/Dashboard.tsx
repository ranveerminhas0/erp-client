import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Plus,
  Users,
  Box,
  Activity
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const recentSales = [
  { id: "INV-001", customer: "Rahul Sharma", amount: "₹12,450", status: "Paid", time: "2 mins ago" },
  { id: "INV-002", customer: "Priya Patel", amount: "₹8,200", status: "Paid", time: "15 mins ago" },
  { id: "INV-003", customer: "Amit Kumar", amount: "₹24,000", status: "Pending", time: "45 mins ago" },
  { id: "INV-004", customer: "Sneha Gupta", amount: "₹5,600", status: "Paid", time: "1 hour ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Executive Overview</h1>
          <p className="text-muted-foreground font-medium text-sm">Good to see you, Ranveer. Here’s today’s operational snapshot.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent  transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,54,000</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-green-600 uppercase tracking-tight">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent  transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bills Generated</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-green-600 uppercase tracking-tight">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8 new bills today
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent  transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cash In Hand</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹42,500</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-amber-600 uppercase tracking-tight">
                Pending verification
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent  transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Low Stock Items</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">12</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-destructive uppercase tracking-tight">
                <TrendingDown className="h-3 w-3 mr-1" />
                4 critical items
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Business Pulse */}
        <Card className="border-none shadow-md w-full bg-gradient-to-br from-primary/5 to-transparent ">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Today’s Business Pulse</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Real-time operational insights</p>
              </div>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <Activity className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Highest bill today", value: "₹24,000", sub: "Invoice #883" },
                { label: "Average bill value", value: "₹1,085", sub: "+5% from yesterday" },
                { label: "Peak hour", value: "6:30–7:30 PM", sub: "High footfall period" },
                { label: "Items sold today", value: "412", sub: "Across all categories" },
                { label: "Most sold category", value: "Steel Utensils", sub: "84 items sold" },
              ].map((insight, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all hover:shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{insight.label}</p>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">{insight.value}</span>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-tight">{insight.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Behaviour Snapshot */}
        <Card className="border-none shadow-md w-full bg-gradient-to-br from-primary/5 to-transparent ">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Customer Behaviour Snapshot</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Today's customer insights</p>
              </div>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Repeat Customers", value: "22%", sub: "Seen before" },
                { label: "New Customers", value: "78%", sub: "First-time visits" },
                { label: "Avg Items / Bill", value: "2.9", sub: "Basket size" },
                { label: "Preferred Payment", value: "UPI", sub: "55% of bills" },
              ].map((insight, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all hover:shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{insight.label}</p>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">{insight.value}</span>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-tight">{insight.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspirational Quote */}
        <div className="pt-2">
          <p className="text-center text-sm text-muted-foreground italic">
            "Most wins come from boring days done right."
          </p>
        </div>
      </div>
    </div>
  );
}
