import React, { useState } from "react";
import { 
  Search, 
  CircleDollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  Box,
  History,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Settings2,
  ListFilter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for kitchenware inventory
const inventoryData = [
  { id: 1, group: "Hawkins", item: "Pressure Cooker 3L", unit: "Pcs", opening: 45, receipt: 20, issue: 12, stock: 53 },
  { id: 2, group: "Prestige", item: "Aluminum Cooker 5L", unit: "Pcs", opening: 30, receipt: 15, issue: 18, stock: 27 },
  { id: 3, group: "Milton", item: "Thermosteel Flask", unit: "Pcs", opening: 60, receipt: 0, issue: 25, stock: 35 },
  { id: 4, group: "Pigeon", item: "Non-Stick Set", unit: "Set", opening: 100, receipt: 50, issue: 40, stock: 110 },
  { id: 5, group: "Butterfly", item: "Mixer Grinder", unit: "Pcs", opening: 12, receipt: 5, issue: 3, stock: 14 },
  { id: 6, group: "Vinod", item: "Stainless Kadai", unit: "Pcs", opening: 85, receipt: 30, issue: 45, stock: 70 },
  { id: 7, group: "Hawkins", item: "Non-Stick Tawa", unit: "Pcs", opening: 20, receipt: 10, issue: 5, stock: 25 },
  { id: 8, group: "Prestige", item: "Mixer Grinder 750W", unit: "Pcs", opening: 15, receipt: 25, issue: 22, stock: 18 },
  { id: 9, group: "Cello", item: "Container Set", unit: "Set", opening: 40, receipt: 10, issue: 15, stock: 35 },
  { id: 10, group: "Milton", item: "Spin Mop", unit: "Pcs", opening: 25, receipt: 5, issue: 8, stock: 22 },
  { id: 11, group: "Vinod", item: "Platinum Triply Saucepan", unit: "Pcs", opening: 10, receipt: 0, issue: 10, stock: 0 },
  { id: 12, group: "Hawkins", item: "Hard Anodized Pan", unit: "Pcs", opening: 50, receipt: 10, issue: 5, stock: 55 },
  { id: 13, group: "Prestige", item: "Induction Cooktop", unit: "Pcs", opening: 10, receipt: 20, issue: 8, stock: 22 },
  { id: 14, group: "Milton", item: "Casserole Set of 3", unit: "Set", opening: 40, receipt: 15, issue: 12, stock: 43 },
  { id: 15, group: "Pigeon", item: "Glass Top 3 Burner", unit: "Pcs", opening: 8, receipt: 4, issue: 2, stock: 10 },
  { id: 16, group: "Butterfly", item: "Wet Grinder 2L", unit: "Pcs", opening: 5, receipt: 10, issue: 3, stock: 12 },
  { id: 17, group: "Vinod", item: "Pressure Pan 5L", unit: "Pcs", opening: 25, receipt: 5, issue: 10, stock: 20 },
  { id: 18, group: "Cello", item: "Insulated Water Bottle", unit: "Pcs", opening: 120, receipt: 50, issue: 80, stock: 90 },
  { id: 19, group: "Wonderchef", item: "Nutri-blend Mixer", unit: "Pcs", opening: 15, receipt: 10, issue: 7, stock: 18 },
  { id: 20, group: "Borosil", item: "Glass Storage Set", unit: "Set", opening: 30, receipt: 20, issue: 15, stock: 35 },
  { id: 21, group: "Stahl", item: "Triply Frypan", unit: "Pcs", opening: 20, receipt: 5, issue: 8, stock: 17 },
  { id: 22, group: "Meyer", item: "Cast Iron Skillet", unit: "Pcs", opening: 15, receipt: 0, issue: 5, stock: 10 },
  { id: 23, group: "Hawkins", item: "Contura Black 3.5L", unit: "Pcs", opening: 40, receipt: 20, issue: 15, stock: 45 },
  { id: 24, group: "Prestige", item: "Omega Deluxe Tawa", unit: "Pcs", opening: 60, receipt: 25, issue: 30, stock: 55 },
  { id: 25, group: "Milton", item: "Spotzero Mop", unit: "Pcs", opening: 45, receipt: 15, issue: 20, stock: 40 },
  { id: 26, group: "Pigeon", item: "Chopper Large", unit: "Pcs", opening: 150, receipt: 100, issue: 120, stock: 130 },
  { id: 27, group: "Butterfly", item: "Smart Mixer 3 Jar", unit: "Pcs", opening: 25, receipt: 10, issue: 12, stock: 23 },
  { id: 28, group: "Vinod", item: "Hancook Grill Pan", unit: "Pcs", opening: 18, receipt: 12, issue: 10, stock: 20 },
  { id: 29, group: "Cello", item: "Checkers Bottle Set", unit: "Set", opening: 55, receipt: 30, issue: 40, stock: 45 },
  { id: 30, group: "Borosil", item: "Microwave Safe Bowl", unit: "Set", opening: 42, receipt: 18, issue: 20, stock: 40 },
  { id: 31, group: "Stahl", item: "Artisan Saucepan", unit: "Pcs", opening: 12, receipt: 8, issue: 5, stock: 15 },
  { id: 32, group: "Aashirvaad", item: "Atta 5kg", unit: "Kg", opening: 20, receipt: 10, issue: 15, stock: 15 },
  { id: 33, group: "Tata Salt", item: "Iodized Salt 1kg", unit: "Kg", opening: 100, receipt: 50, issue: 60, stock: 90 },
  { id: 34, group: "Fortune", item: "Sunflower Oil 1L", unit: "Ltr", opening: 40, receipt: 20, issue: 25, stock: 35 },
];

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  
  // Advanced Search States
  const [advCategory, setAdvCategory] = useState("all");
  const [advBrand, setAdvBrand] = useState("all");
  const [advSize, setAdvSize] = useState("all");
  
  // Applied Advanced Search States
  const [appliedCategory, setAppliedCategory] = useState("all");
  const [appliedBrand, setAppliedBrand] = useState("all");
  const [appliedSize, setAppliedSize] = useState("all");
  
  const [isAdvSearchOpen, setIsAdvSearchOpen] = useState(false);
  
  // Internal search states for dropdowns
  const [catSearch, setCatSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");

  const groups = ["All Groups", ...Array.from(new Set(inventoryData.map(item => item.group)))];
  
  // Extract categories (Frypan, Cooker, etc) from item names
  const categories = ["all", "Frypan", "Cooker", "Mixer", "Mop", "Set", "Bottle", "Pan"];
  const brands = ["all", ...Array.from(new Set(inventoryData.map(item => item.group)))];
  const sizes = ["all", "3L", "5L", "1L", "20cm", "24cm", "26cm", "750W"];

  const totalItemsCount = inventoryData.reduce((acc, item) => acc + item.stock, 0);
  const lowStockCount = inventoryData.filter(item => item.stock > 0 && item.stock < 20).length;
  const outOfStockCount = inventoryData.filter(item => item.stock <= 0).length;
  const okItemsCount = inventoryData.filter(item => item.stock >= 20).length;
  const stockHealth = Math.round((okItemsCount / inventoryData.length) * 100);

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(search.toLowerCase()) || 
                          item.group.toLowerCase().includes(search.toLowerCase());
    
    // Advanced Filters (using applied states)
    const matchesAdvCategory = appliedCategory === "all" || item.item.toLowerCase().includes(appliedCategory.toLowerCase());
    const matchesAdvBrand = appliedBrand === "all" || item.group === appliedBrand;
    const matchesAdvSize = appliedSize === "all" || item.item.toLowerCase().includes(appliedSize.toLowerCase());

    let matchesFilter = true;
    if (selectedGroup === "Low Stock Items") {
      matchesFilter = item.stock < 20;
    } else if (selectedGroup === "Out of Stock") {
      matchesFilter = item.stock <= 0;
    } else if (selectedGroup === "Most Issued Items") {
      matchesFilter = item.issue > 20;
    } else if (selectedGroup === "By Weight Items") {
      matchesFilter = item.item.toLowerCase().includes("kg") || item.item.toLowerCase().includes("ml") || item.unit.toLowerCase().includes("kg");
    } else if (selectedGroup === "Highest Stock") {
      matchesFilter = true;
    } else if (selectedGroup !== "All Groups") {
      matchesFilter = item.group === selectedGroup;
    }

    return matchesSearch && matchesFilter && matchesAdvCategory && matchesAdvBrand && matchesAdvSize;
  }).sort((a, b) => {
    if (selectedGroup === "Highest Stock") return b.stock - a.stock;
    if (selectedGroup === "Most Issued Items") return b.issue - a.issue;
    return 0;
  });

  const filteredCompanies = groups.filter(g => 
    g !== "All Groups" && g.toLowerCase().includes(companySearch.toLowerCase())
  );

  const getStatus = (stock: number) => {
    if (stock <= 0) return { label: "OUT", color: "text-red-600 bg-red-50 dark:bg-red-900/20", icon: XCircle };
    if (stock < 20) return { label: "Low", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20", icon: AlertTriangle };
    return { label: "OK", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", icon: CheckCircle2 };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Inventory</h1>
          <p className="text-muted-foreground font-medium text-sm">Monitor real time inventory of terminal MM01</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Items</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <Box className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground tracking-tight">{totalItemsCount}</div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Low Stock Items</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 tracking-tight">{lowStockCount} Items</div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Out of Stock</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <XCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive tracking-tight">{outOfStockCount} Items</div>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-sm shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Stock Health</CardTitle>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground tracking-tight">{stockHealth}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-2">
          <div className="relative w-full lg:max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input 
              placeholder="Search items..." 
              className="pl-9 h-9 font-medium text-xs border-border/50 focus:ring-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog open={isAdvSearchOpen} onOpenChange={setIsAdvSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-9 px-4 gap-2 border-border/50 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95">
                  <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
                  Advanced Search
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-2xl border-border/50 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold tracking-tight">Advanced Inventory Search</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
                    <Select value={advCategory} onValueChange={setAdvCategory}>
                      <SelectTrigger className="rounded-xl border-border/50 h-11">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-[300px]">
                        <div className="p-2 sticky top-0 bg-popover z-10">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <Input 
                              placeholder="Search categories..." 
                              value={catSearch}
                              onChange={(e) => setCatSearch(e.target.value)}
                              className="h-8 text-[10px] pl-7 rounded-lg border-border/50"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <SelectItem value="all" className="rounded-lg font-bold text-xs uppercase tracking-wide">All Categories</SelectItem>
                        {categories.filter(c => c !== "all" && c.toLowerCase().includes(catSearch.toLowerCase())).map(cat => (
                          <SelectItem key={cat} value={cat} className="rounded-lg font-bold text-xs uppercase tracking-wide">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Brand / Group</Label>
                    <Select value={advBrand} onValueChange={setAdvBrand}>
                      <SelectTrigger className="rounded-xl border-border/50 h-11">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-[300px]">
                        <div className="p-2 sticky top-0 bg-popover z-10">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <Input 
                              placeholder="Search brands..." 
                              value={brandSearch}
                              onChange={(e) => setBrandSearch(e.target.value)}
                              className="h-8 text-[10px] pl-7 rounded-lg border-border/50"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <SelectItem value="all" className="rounded-lg font-bold text-xs uppercase tracking-wide">All Brands</SelectItem>
                        {brands.filter(b => b !== "all" && b.toLowerCase().includes(brandSearch.toLowerCase())).map(brand => (
                          <SelectItem key={brand} value={brand} className="rounded-lg font-bold text-xs uppercase tracking-wide">
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Size / Capacity</Label>
                    <Select value={advSize} onValueChange={setAdvSize}>
                      <SelectTrigger className="rounded-xl border-border/50 h-11">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-[300px]">
                        <div className="p-2 sticky top-0 bg-popover z-10">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <Input 
                              placeholder="Search sizes..." 
                              value={sizeSearch}
                              onChange={(e) => setSizeSearch(e.target.value)}
                              className="h-8 text-[10px] pl-7 rounded-lg border-border/50"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <SelectItem value="all" className="rounded-lg font-bold text-xs uppercase tracking-wide">All Sizes</SelectItem>
                        {sizes.filter(s => s !== "all" && s.toLowerCase().includes(sizeSearch.toLowerCase())).map(size => (
                          <SelectItem key={size} value={size} className="rounded-lg font-bold text-xs uppercase tracking-wide">
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="flex gap-2 sm:justify-start">
                  <Button 
                    variant="ghost" 
                    className="rounded-xl font-bold text-xs uppercase px-6"
                    onClick={() => {
                      setAdvCategory("all");
                      setAdvBrand("all");
                      setAdvSize("all");
                      setAppliedCategory("all");
                      setAppliedBrand("all");
                      setAppliedSize("all");
                      setIsAdvSearchOpen(false);
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="rounded-xl font-bold text-xs uppercase px-8 flex-1"
                    onClick={() => {
                      setAppliedCategory(advCategory);
                      setAppliedBrand(advBrand);
                      setAppliedSize(advSize);
                      setIsAdvSearchOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-4 gap-2 border-border/50 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95">
                  <ListFilter className="h-3 w-3 text-muted-foreground" />
                  {selectedGroup}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-border/50 shadow-xl overflow-hidden">
                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-1.5">View Mode</DropdownMenuLabel>
                <div className="max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
                  <DropdownMenuItem onClick={() => setSelectedGroup("All Groups")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    All Groups
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGroup("Highest Stock")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    Highest Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGroup("Low Stock Items")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    Low Stock Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGroup("Out of Stock")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    Out of Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedGroup("Most Issued Items")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    Most Issued Items
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-1.5">Sort & Category</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSelectedGroup("By Weight Items")} className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5">
                    By Weight Items
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 pt-1.5 pb-1">
                    By Company
                  </DropdownMenuLabel>
                  <div className="px-2 pb-2" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-slate-400" />
                      <Input 
                        placeholder="Find company..." 
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="h-7 text-[10px] pl-6 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-slate-400 rounded-md w-full text-foreground"
                      />
                    </div>
                  </div>
                  {filteredCompanies.map(group => (
                    <DropdownMenuItem 
                      key={group} 
                      onClick={() => setSelectedGroup(group)}
                      className="rounded-lg font-bold text-xs uppercase tracking-wide py-2.5"
                    >
                      {group}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[400px]">
          {/* Static Header Section */}
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 z-50">
            <table className="w-full table-fixed border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 pl-6 w-[15%] text-left">Group</th>
                  <th className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[25%] text-left">Item Name</th>
                  <th className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[10%] text-left">Unit</th>
                  <th className="text-right font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[10%]">Opening</th>
                  <th className="text-right font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[10%]">Receipt</th>
                  <th className="text-right font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[10%]">Issue</th>
                  <th className="text-right font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 w-[12%] pr-8">Stock</th>
                  <th className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-slate-400 h-12 pr-6 w-[10%] text-right">Status</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Body Section */}
          <div className="overflow-y-auto overflow-x-auto flex-1 scrollbar-hide">
            <Table className="relative border-separate border-spacing-0 table-fixed">
              <TableBody>
                {filteredData.map((item) => {
                  const status = getStatus(item.stock);
                  const StatusIcon = status.icon;
                  return (
                    <TableRow
                      key={item.id}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                    >
                      <TableCell className="py-4 pl-6 w-[15%]">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-muted-foreground">
                          {item.group}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 font-bold text-foreground text-sm tracking-tight w-[25%] overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.item}
                      </TableCell>
                      <TableCell className="py-4 w-[10%]">
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-[9px] font-bold uppercase px-2 py-0">
                          {item.unit}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4 font-medium text-muted-foreground text-sm w-[10%]">{item.opening}</TableCell>
                      <TableCell className="text-right py-4 font-medium text-muted-foreground text-sm w-[10%]">{item.receipt}</TableCell>
                      <TableCell className="text-right py-4 font-medium text-muted-foreground text-sm w-[10%]">{item.issue}</TableCell>
                      <TableCell className="text-right py-4 pr-8 w-[12%]">
                        <span className="font-bold text-foreground text-sm">
                          {item.stock}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 pr-6 text-right w-[10%]">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${status.color}`}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {status.label}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
