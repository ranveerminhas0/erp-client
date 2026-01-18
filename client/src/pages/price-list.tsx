import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Filter, X, MoreVertical } from "lucide-react";

const INITIAL_PRICE_LIST_DATA = [
  {
    id: "1",
    group: "Kitchen King",
    itemName: "SS Cooking Pot 5L",
    mrp: 1200,
    sellingPrice: 950,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "2",
    group: "Plasto World",
    itemName: "Plastic Bucket 20L",
    mrp: 350,
    sellingPrice: 280,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "3",
    group: "Royal Crockery",
    itemName: "Dinner Set 32pc",
    mrp: 4500,
    sellingPrice: 3800,
    gst: 12,
    unit: "PCS",
    active: true,
  },
  {
    id: "4",
    group: "Kitchen King",
    itemName: "Steel Container Set",
    mrp: 800,
    sellingPrice: 600,
    gst: 12,
    unit: "PCS",
    active: false,
  },
  {
    id: "5",
    group: "Kitchen King",
    itemName: "Copper Bowl (Premium)",
    mrp: 1500,
    sellingPrice: 1100,
    gst: 18,
    unit: "Weight",
    active: true,
  },
  {
    id: "6",
    group: "Prestige",
    itemName: "Pressure Cooker 5L",
    mrp: 2800,
    sellingPrice: 2400,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "7",
    group: "Hawkins",
    itemName: "Non-Stick Kadai",
    mrp: 1800,
    sellingPrice: 1550,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "8",
    group: "Milton",
    itemName: "Insulated Casserole Set",
    mrp: 2200,
    sellingPrice: 1850,
    gst: 12,
    unit: "PCS",
    active: false,
  },
  {
    id: "9",
    group: "Borosil",
    itemName: "Glass Storage Containers",
    mrp: 1600,
    sellingPrice: 1350,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "10",
    group: "Pigeon",
    itemName: "Electric Kettle 1.5L",
    mrp: 1100,
    sellingPrice: 899,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "11",
    group: "Butterfly",
    itemName: "Mixer Grinder 750W",
    mrp: 4200,
    sellingPrice: 3600,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "12",
    group: "Prestige",
    itemName: "Induction Cooktop",
    mrp: 3500,
    sellingPrice: 2999,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "13",
    group: "Kitchen King",
    itemName: "SS Tiffin Box 4 Tier",
    mrp: 950,
    sellingPrice: 750,
    gst: 12,
    unit: "PCS",
    active: true,
  },
  {
    id: "14",
    group: "Plasto World",
    itemName: "Storage Box Set 5pc",
    mrp: 650,
    sellingPrice: 520,
    gst: 18,
    unit: "PCS",
    active: true,
  },
  {
    id: "15",
    group: "Royal Crockery",
    itemName: "Tea Cup Set 6pc",
    mrp: 1200,
    sellingPrice: 980,
    gst: 12,
    unit: "PCS",
    active: false,
  },
  {
    id: "16",
    group: "Kitchen King",
    itemName: "Brass Utensil Set",
    mrp: 3200,
    sellingPrice: 2800,
    gst: 18,
    unit: "Weight",
    active: true,
  },
  {
    id: "17",
    group: "Royal Crockery",
    itemName: "Silver Serving Spoons",
    mrp: 2500,
    sellingPrice: 2100,
    gst: 12,
    unit: "Weight",
    active: true,
  },
];

const COMPANIES = Array.from(
  new Set(INITIAL_PRICE_LIST_DATA.map((p) => p.group)),
);

type ViewByOption =
  | "all"
  | "costliest"
  | "cheapest"
  | "by-weight"
  | "active"
  | "inactive";

export default function PriceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewBy, setViewBy] = useState<ViewByOption>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("All");
  const [companySearch, setCompanySearch] = useState("");
  const [priceListData, setPriceListData] = useState(INITIAL_PRICE_LIST_DATA);

  const filteredCompanies = COMPANIES.filter((c) =>
    c.toLowerCase().includes(companySearch.toLowerCase()),
  );

  const toggleActiveStatus = (id: string) => {
    setPriceListData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };

  const getFilterLabel = () => {
    if (companyFilter !== "All") return companyFilter;
    switch (viewBy) {
      case "costliest":
        return "Costliest Items";
      case "cheapest":
        return "Cheapest Items";
      case "by-weight":
        return "By Weight Items";
      case "active":
        return "Active Items";
      case "inactive":
        return "Inactive Items";
      default:
        return "All Items";
    }
  };

  const filteredProducts = priceListData
    .filter((p) => {
      const matchesSearch =
        p.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.group.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany =
        companyFilter === "All" || p.group === companyFilter;
      const matchesViewBy =
        viewBy === "all" ||
        (viewBy === "by-weight" && p.unit === "Weight") ||
        (viewBy === "active" && p.active) ||
        (viewBy === "inactive" && !p.active) ||
        viewBy === "costliest" ||
        viewBy === "cheapest";
      return matchesSearch && matchesCompany && matchesViewBy;
    })
    .sort((a, b) => {
      if (viewBy === "costliest") return b.sellingPrice - a.sellingPrice;
      if (viewBy === "cheapest") return a.sellingPrice - b.sellingPrice;
      return 0;
    });

  const handleViewByChange = (option: ViewByOption) => {
    setViewBy(option);
    setCompanyFilter("All");
  };

  const handleCompanyChange = (company: string) => {
    setCompanyFilter(company);
    setViewBy("all");
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-4">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Price List
          </h1>
          <p className="text-muted-foreground font-medium text-[11px]">
            Quick view of MRP and Selling Prices for all products.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search by item name, brand..."
              className="pl-9 h-9 font-medium text-xs border-border/50 focus:ring-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-price-list"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-4 rounded-xl border-border/50 bg-white dark:bg-slate-900 shadow-sm hover:bg-muted/50 gap-2"
                data-testid="dropdown-filter-trigger"
              >
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-bold">{getFilterLabel()}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl shadow-lg border-border/50 max-h-[400px] overflow-y-auto scrollbar-hide"
            >
              <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                View By
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleViewByChange("all")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "all" && companyFilter === "All" ? "bg-muted" : ""}`}
                data-testid="filter-view-all"
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewByChange("costliest")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "costliest" ? "bg-muted" : ""}`}
                data-testid="filter-view-costliest"
              >
                Costliest Items
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewByChange("cheapest")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "cheapest" ? "bg-muted" : ""}`}
                data-testid="filter-view-cheapest"
              >
                Cheapest Items
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewByChange("by-weight")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "by-weight" ? "bg-muted" : ""}`}
                data-testid="filter-view-by-weight"
              >
                By Weight Items
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewByChange("active")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "active" ? "bg-muted" : ""}`}
                data-testid="filter-view-active"
              >
                Show Activated
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleViewByChange("inactive")}
                className={`text-xs font-medium cursor-pointer ${viewBy === "inactive" ? "bg-muted" : ""}`}
                data-testid="filter-view-inactive"
              >
                Show Inactive
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                By Company
              </DropdownMenuLabel>
              <div className="px-2 py-1.5">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder="Search company..."
                    className="h-7 pl-7 pr-7 text-xs rounded-lg border-border/50"
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    data-testid="input-search-company"
                  />
                  {companySearch && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCompanySearch("");
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              </div>
              <DropdownMenuItem
                onClick={() => handleCompanyChange("All")}
                className={`text-xs font-medium cursor-pointer ${companyFilter === "All" && viewBy === "all" ? "bg-muted" : ""}`}
                data-testid="filter-company-all"
              >
                All Companies
              </DropdownMenuItem>
              {filteredCompanies.map((company) => (
                <DropdownMenuItem
                  key={company}
                  onClick={() => handleCompanyChange(company)}
                  className={`text-xs font-medium cursor-pointer ${companyFilter === company ? "bg-muted" : ""}`}
                  data-testid={`filter-company-${company.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {company}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-2xl border border-border/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-[540px]">
          <div className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-border/50 shrink-0">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-none">
                  <th className="w-[140px] pl-6 h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-left">
                    Group / Brand
                  </th>
                  <th className="h-11 pl-6 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-left">
                    Item Name
                  </th>
                  <th className="w-[100px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-center">
                    Unit
                  </th>
                  <th className="w-[120px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-right">
                    MRP
                  </th>
                  <th className="w-[140px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-right">
                    Selling Price
                  </th>
                  <th className="w-[80px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-center">
                    GST %
                  </th>
                  <th className="w-[80px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-center">
                    Status
                  </th>
                  <th className="w-[60px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-center pr-4">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex-1 overflow-auto scrollbar-hide">
            <table className="w-full table-fixed">
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0"
                    data-testid={`row-product-${product.id}`}
                  >
                    <td className="w-[140px] pl-6 py-4">
                      <Badge
                        variant="outline"
                        className="bg-muted/50 text-[9px] px-2 py-0.5 border-border/50 text-muted-foreground font-bold uppercase tracking-widest"
                      >
                        {product.group}
                      </Badge>
                    </td>
                    <td className="py-4 pl-6">
                      <span className="font-bold text-sm tracking-tight text-foreground">
                        {product.itemName}
                      </span>
                    </td>
                    <td className="w-[100px] text-center py-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        {product.unit}
                      </span>
                    </td>
                    <td className="w-[120px] text-right py-4">
                      <span className="text-xs font-medium text-muted-foreground line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="w-[140px] text-right py-4">
                      <span className="font-bold text-sm tracking-tight text-foreground">
                        ₹{product.sellingPrice.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="w-[80px] text-center py-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        {product.gst}%
                      </span>
                    </td>
                    <td className="w-[80px] text-center py-4">
                      <div
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full ${
                          product.active
                            ? "bg-emerald-50 dark:bg-emerald-900/20"
                            : "bg-red-50 dark:bg-red-900/20"
                        }`}
                      >
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wide ${
                            product.active ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {product.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="w-[60px] text-center py-4 pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                            data-testid={`action-menu-${product.id}`}
                          >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 rounded-xl shadow-lg border-border/50"
                        >
                          <DropdownMenuItem
                            onClick={() => toggleActiveStatus(product.id)}
                            className="text-xs font-medium cursor-pointer"
                            data-testid={`action-toggle-${product.id}`}
                          >
                            {product.active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-12 text-muted-foreground text-sm font-medium"
                    >
                      No products found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border/50 bg-slate-100/80 dark:bg-slate-900/80 px-6 py-2 shrink-0">
            <div className="flex flex-row justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Showing {filteredProducts.length} of {priceListData.length}{" "}
                items
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
