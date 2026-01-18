import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Truck,
  Building2,
  Wallet,
  MoreVertical,
  Activity,
  ListFilter,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs as ModalTabs,
  TabsContent as ModalTabsContent,
  TabsList as ModalTabsList,
  TabsTrigger as ModalTabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for Ledgers
const INITIAL_LEDGERS = [
  {
    id: "L001",
    name: "Rahul Kumar",
    type: ["Customer"],
    balance: 12450,
    nature: "Dr",
    status: "Active",
    phone: "9876543210",
    gstin: "Unregistered",
  },
  {
    id: "L002",
    name: "Metal Distributors Pvt Ltd",
    type: ["Supplier"],
    balance: 8200,
    nature: "Cr",
    status: "Active",
    phone: "8888888888",
    gstin: "03ABCDE1234F1Z5",
  },
  {
    id: "L003",
    name: "Modern Kitchen Solutions",
    type: ["Customer", "Supplier"],
    balance: 15600,
    nature: "Dr",
    status: "Active",
    phone: "9998887776",
    gstin: "05GHIJK6789L2Z3",
  },
  {
    id: "L004",
    name: "HDFC Bank - Main A/c",
    type: ["Bank"],
    balance: 450000,
    nature: "Dr",
    status: "Active",
    phone: "-",
    gstin: "-",
  },
  {
    id: "L005",
    name: "Office Rent",
    type: ["Expense"],
    balance: 25000,
    nature: "Dr",
    status: "Active",
    phone: "-",
    gstin: "-",
  },
  {
    id: "L006",
    name: "Electricity Bill",
    type: ["Expense"],
    balance: 4500,
    nature: "Dr",
    status: "Active",
    phone: "-",
    gstin: "-",
  },
  {
    id: "L007",
    name: "Equity Capital",
    type: ["Capital"],
    balance: 1000000,
    nature: "Cr",
    status: "Active",
    phone: "-",
    gstin: "-",
  },
];

const STATEMENT_DATA = [
  {
    date: "Jan 01, 2026",
    particulars: "Opening Balance",
    ref: "-",
    debit: 0,
    credit: 0,
    balance: 25000,
    b_nature: "Dr",
  },
  {
    date: "Jan 02, 2026",
    particulars: "Cash Sales",
    ref: "SI-2026-001",
    debit: 0,
    credit: 15000,
    balance: 10000,
    b_nature: "Dr",
  },
  {
    date: "Jan 02, 2026",
    particulars: "Office Rent",
    ref: "PV-2026-012",
    debit: 12000,
    credit: 0,
    balance: 22000,
    b_nature: "Dr",
  },
  {
    date: "Jan 03, 2026",
    particulars: "HDFC Bank Transfer",
    ref: "JV-2026-005",
    debit: 50000,
    credit: 0,
    balance: 72000,
    b_nature: "Dr",
  },
  {
    date: "Jan 03, 2026",
    particulars: "Purchase from Global Tech",
    ref: "PI-2026-088",
    debit: 25000,
    credit: 0,
    balance: 97000,
    b_nature: "Dr",
  },
  {
    date: "Jan 04, 2026",
    particulars: "Service Fee Received",
    ref: "RV-2026-044",
    debit: 0,
    credit: 35000,
    balance: 62000,
    b_nature: "Dr",
  },
  {
    date: "Jan 04, 2026",
    particulars: "Utility Bill Payment",
    ref: "PV-2026-015",
    debit: 4500,
    credit: 0,
    balance: 66500,
    b_nature: "Dr",
  },
  {
    date: "Jan 05, 2026",
    particulars: "Salary Payout - Jan",
    ref: "PV-2026-018",
    debit: 85000,
    credit: 0,
    balance: 151500,
    b_nature: "Dr",
  },
  {
    date: "Jan 05, 2026",
    particulars: "Inter-Account Transfer",
    ref: "JV-2026-009",
    debit: 0,
    credit: 20000,
    balance: 131500,
    b_nature: "Dr",
  },
  {
    date: "Jan 06, 2026",
    particulars: "Hardware Maintenance",
    ref: "PV-2026-022",
    debit: 8500,
    credit: 0,
    balance: 140000,
    b_nature: "Dr",
  },
  {
    date: "Jan 06, 2026",
    particulars: "Kitchenware Stock In",
    ref: "SI-2026-045",
    debit: 0,
    credit: 45000,
    balance: 95000,
    b_nature: "Dr",
  },
  {
    date: "Jan 07, 2026",
    particulars: "Showroom Rent (Bandra)",
    ref: "PV-2026-045",
    debit: 65000,
    credit: 0,
    balance: 160000,
    b_nature: "Dr",
  },
  {
    date: "Jan 07, 2026",
    particulars: "Cash Sales (Appliances)",
    ref: "SI-2026-046",
    debit: 0,
    credit: 28500,
    balance: 131500,
    b_nature: "Dr",
  },
  {
    date: "Jan 08, 2026",
    particulars: "Interest Received",
    ref: "RV-2026-056",
    debit: 0,
    credit: 1200,
    balance: 130300,
    b_nature: "Dr",
  },
  {
    date: "Jan 08, 2026",
    particulars: "Staff Welfare",
    ref: "PV-2026-089",
    debit: 3200,
    credit: 0,
    balance: 133500,
    b_nature: "Dr",
  },
];

import {
  User,
  History,
  Receipt,
  Phone,
  MapPin,
  Fingerprint,
  Mail,
  CalendarDays,
} from "lucide-react";

// Add after INITIAL_LEDGERS
const BILL_DATA = [
  {
    id: "SI-2026-001",
    date: "Jan 02, 2026",
    type: "Sales",
    amount: 15000,
    status: "Paid",
  },
  {
    id: "PV-2026-012",
    date: "Jan 02, 2026",
    type: "Payment",
    amount: 12000,
    status: "Settled",
  },
  {
    id: "JV-2026-005",
    date: "Jan 03, 2026",
    type: "Journal",
    amount: 50000,
    status: "Adjusted",
  },
];

export default function Accounts() {
  const [activeTab, setActiveTab] = useState("account-master");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [ledgers, setLedgers] = useState(INITIAL_LEDGERS);
  const [selectedLedger, setSelectedLedger] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("statement");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    email: "",
    gstinStatus: "Unregistered",
    gstinNumber: "",
    pan: "",
    address: "",
    city: "",
    pincode: "",
    openingDate: new Date().toISOString().split("T")[0],
    ledgerType: "Customer",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    email: "",
    gstinStatus: "Unregistered",
    gstinNumber: "",
    pan: "",
    address: "",
    city: "",
    pincode: "",
    openingDate: "",
    ledgerType: "Customer",
  });

  // Voucher Entry States
  const [vchAccountHead, setVchAccountHead] = useState("Select Account...");
  const [vchAccountSearch, setVchAccountSearch] = useState("");
  const [vchType, setVchType] = useState("Payment");

  // Statement States
  const [stAccountName, setStAccountName] = useState("Rahul Kumar");
  const [stAccountSearch, setStAccountSearch] = useState("");

  const filteredLedgers = ledgers.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || l.type.includes(typeFilter);
    return matchesSearch && matchesType;
  });

  const filteredVchAccounts = ledgers.filter(
    (l) =>
      l.name.toLowerCase().includes(vchAccountSearch.toLowerCase()) ||
      l.id.toLowerCase().includes(vchAccountSearch.toLowerCase()),
  );

  const filteredStAccounts = ledgers.filter(
    (l) =>
      l.name.toLowerCase().includes(stAccountSearch.toLowerCase()) ||
      l.id.toLowerCase().includes(stAccountSearch.toLowerCase()),
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-4">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Accounts & Ledgers
          </h1>
          <p className="text-muted-foreground font-medium text-[11px]">
            Manage financial ledgers, parties, and statements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 h-10 px-6 font-bold rounded-xl shadow-sm transition-all active:scale-95 text-xs uppercase tracking-wider"
            data-testid="button-new-account"
            onClick={() => {
              setAddFormData({
                name: "",
                phone: "",
                phone2: "",
                email: "",
                gstinStatus: "Unregistered",
                gstinNumber: "",
                pan: "",
                address: "",
                city: "",
                pincode: "",
                openingDate: new Date().toISOString().split("T")[0],
                ledgerType: "Customer",
              });
              setIsAddAccountOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> New Account
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Total Receivables
                </p>
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                  <ArrowDownLeft className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-2xl font-bold text-foreground tracking-tight"
                  data-testid="text-receivables"
                >
                  ₹2,84,500
                </h2>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Dr
                </span>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> From 14 Customers
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Total Payables
                </p>
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-2xl font-bold text-foreground tracking-tight"
                  data-testid="text-payables"
                >
                  ₹1,12,000
                </h2>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Cr
                </span>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" /> To 8 Suppliers
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Cash & Bank
                </p>
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-2xl font-bold text-foreground tracking-tight"
                  data-testid="text-cash-bank"
                >
                  ₹8,45,200
                </h2>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Dr
                </span>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" /> Across 3 Accounts
              </p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Active Ledgers
                </p>
                <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-2xl font-bold text-foreground tracking-tight"
                  data-testid="text-active-ledgers"
                >
                  42
                </h2>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" /> 8
                New this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50 p-0.5 rounded-xl h-9 w-fit border border-border/50">
              <TabsTrigger
                value="account-master"
                className="rounded-lg px-6 font-bold text-[10px] uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
              >
                Account Master
              </TabsTrigger>
              <TabsTrigger
                value="statements"
                className="rounded-lg px-6 font-bold text-[10px] uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
              >
                Statements
              </TabsTrigger>
              <TabsTrigger
                value="vouchers"
                className="rounded-lg px-6 font-bold text-[10px] uppercase tracking-wider data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
              >
                Vouchers
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="account-master"
            className="outline-none space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative w-full lg:max-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Search by name, ID..."
                  className="pl-9 h-9 font-medium text-xs border-border/50 focus:ring-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-ledgers"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <div className="flex items-center gap-1 bg-muted/30 border border-border/50 rounded-xl p-1">
                  {["All", "Customer", "Supplier", "Bank", "Expense"].map(
                    (type) => (
                      <Button
                        key={type}
                        variant={typeFilter === type ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setTypeFilter(type)}
                        className={`h-7 rounded-lg px-3 text-[10px] font-bold uppercase tracking-wider transition-all ${
                          typeFilter === type
                            ? "bg-white dark:bg-slate-900 text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        data-testid={`button-filter-${type.toLowerCase()}`}
                      >
                        {type}
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-[380px]">
              <div className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-border/50 shrink-0">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-none">
                      <th className="w-[80px] pl-6 h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-left">
                        ID
                      </th>
                      <th className="h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-left">
                        Name / Ledger Head
                      </th>
                      <th className="w-[220px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-left">
                        Type
                      </th>
                      <th className="w-[180px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-right">
                        Balance
                      </th>
                      <th className="w-[160px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-center">
                        Status
                      </th>
                      <th className="w-[100px] h-11 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 text-right pr-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="flex-1 overflow-auto scrollbar-hide">
                <table className="w-full table-fixed">
                  <tbody>
                    {filteredLedgers.map((ledger) => (
                      <tr
                        key={ledger.id}
                        className="group hover:bg-muted/30 transition-colors border-b border-border/50 cursor-pointer last:border-0"
                        data-testid={`row-ledger-${ledger.id}`}
                        onClick={() => {
                          setSelectedLedger(ledger);
                          setModalTab("statement");
                          setIsModalOpen(true);
                        }}
                      >
                        <td className="w-[80px] pl-6 font-mono text-[10px] font-bold text-muted-foreground/70 py-4">
                          {ledger.id}
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm tracking-tight text-foreground">
                              {ledger.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                              {ledger.phone !== "-" ? ledger.phone : "No Phone"}
                            </span>
                          </div>
                        </td>
                        <td className="w-[220px] py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {ledger.type.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="bg-muted/50 text-[9px] px-2 py-0 border-border/50 text-muted-foreground font-bold uppercase tracking-widest"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="w-[180px] text-right py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="font-bold text-sm tracking-tight text-foreground">
                              ₹{ledger.balance.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[9px] font-black text-muted-foreground uppercase">
                              {ledger.nature}
                            </span>
                          </div>
                        </td>
                        <td className="w-[160px] text-center py-4">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${ledger.status === "Active" ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                          >
                            <div
                              className={`h-1 w-1 rounded-full ${ledger.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}
                            />
                            <span
                              className={`text-[9px] font-black uppercase tracking-widest ${ledger.status === "Active" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {ledger.status}
                            </span>
                          </div>
                        </td>
                        <td className="w-[100px] text-right pr-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                                data-testid={`button-actions-${ledger.id}`}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48 rounded-xl border-border/50 p-1.5"
                            >
                              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Account Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                className="rounded-lg font-bold text-xs uppercase tracking-wide py-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLedger(ledger);
                                  setModalTab("statement");
                                  setIsModalOpen(true);
                                }}
                              >
                                View Statement
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="rounded-lg font-bold text-xs uppercase tracking-wide py-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLedger(ledger);
                                  setModalTab("profile");
                                  setIsModalOpen(true);
                                }}
                              >
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-1 border-border/50" />
                              <DropdownMenuItem
                                className="rounded-lg font-bold text-xs uppercase tracking-wide py-2 text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  setLedgers((prev) =>
                                    prev.map((l) =>
                                      l.id === ledger.id
                                        ? {
                                            ...l,
                                            status:
                                              l.status === "Active"
                                                ? "Deactivated"
                                                : "Active",
                                          }
                                        : l,
                                    ),
                                  );
                                }}
                              >
                                {ledger.status === "Active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Account Details Popup */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
                <DialogHeader className="p-6 pb-0 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-900 dark:bg-slate-50 flex items-center justify-center text-white dark:text-slate-900">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl font-black uppercase tracking-tight">
                          {selectedLedger?.name}
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {selectedLedger?.id} •{" "}
                          {selectedLedger?.type?.join(", ")}
                        </DialogDescription>
                      </div>
                    </div>
                    <div className="text-right pr-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Current Balance
                      </p>
                      <p className="text-xl font-black tracking-tighter">
                        ₹{selectedLedger?.balance?.toLocaleString()}
                        <span className="text-xs ml-1 opacity-60">
                          {selectedLedger?.nature}
                        </span>
                      </p>
                    </div>
                  </div>

                  <ModalTabs
                    value={modalTab}
                    onValueChange={setModalTab}
                    className="w-full"
                  >
                    <ModalTabsList className="w-full justify-start h-12 bg-transparent p-0 border-b border-border/50 rounded-none gap-8">
                      <ModalTabsTrigger
                        value="statement"
                        className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 dark:data-[state=active]:border-slate-50 bg-transparent px-0 font-black text-[10px] uppercase tracking-[0.2em] shadow-none transition-all"
                      >
                        <History className="h-3.5 w-3.5 mr-2" /> Statement
                      </ModalTabsTrigger>
                      <ModalTabsTrigger
                        value="bills"
                        className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 dark:data-[state=active]:border-slate-50 bg-transparent px-0 font-black text-[10px] uppercase tracking-[0.2em] shadow-none transition-all"
                      >
                        <Receipt className="h-3.5 w-3.5 mr-2" /> Bills/Vouchers
                      </ModalTabsTrigger>
                      <ModalTabsTrigger
                        value="profile"
                        className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 dark:data-[state=active]:border-slate-50 bg-transparent px-0 font-black text-[10px] uppercase tracking-[0.2em] shadow-none transition-all"
                      >
                        <User className="h-3.5 w-3.5 mr-2" /> Profile
                      </ModalTabsTrigger>
                    </ModalTabsList>
                  </ModalTabs>
                </DialogHeader>

                <div className="p-6 max-h-[400px] overflow-y-auto bg-white dark:bg-slate-900">
                  <ModalTabs value={modalTab} className="w-full">
                    <ModalTabsContent
                      value="statement"
                      className="mt-0 outline-none"
                    >
                      <div className="rounded-xl border border-border/50 overflow-hidden">
                        <table className="w-full text-[11px] font-bold uppercase tracking-wider">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-border/50">
                            <tr>
                              <th className="px-4 py-3 text-left">Date</th>
                              <th className="px-4 py-3 text-left">
                                Particulars
                              </th>
                              <th className="px-4 py-3 text-right">Debit</th>
                              <th className="px-4 py-3 text-right">Credit</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50">
                            {STATEMENT_DATA.slice(0, 5).map((row, i) => (
                              <tr key={i} className="hover:bg-muted/30">
                                <td className="px-4 py-3 opacity-60">
                                  {row.date}
                                </td>
                                <td className="px-4 py-3">{row.particulars}</td>
                                <td className="px-4 py-3 text-right text-muted-foreground">
                                  {row.debit > 0
                                    ? `₹${row.debit.toLocaleString()}`
                                    : "-"}
                                </td>
                                <td className="px-4 py-3 text-right text-muted-foreground">
                                  {row.credit > 0
                                    ? `₹${row.credit.toLocaleString()}`
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Button
                        variant="link"
                        className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground"
                      >
                        View Full Statement{" "}
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </Button>
                    </ModalTabsContent>

                    <ModalTabsContent
                      value="bills"
                      className="mt-0 outline-none"
                    >
                      <div className="grid gap-3">
                        {BILL_DATA.map((bill) => (
                          <div
                            key={bill.id}
                            className="p-4 rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between group hover:border-slate-400 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-border/50 shadow-sm">
                                <FileText className="h-4 w-4 text-slate-500" />
                              </div>
                              <div>
                                <p className="text-[11px] font-black uppercase tracking-tight">
                                  {bill.id}
                                </p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">
                                  {bill.date} • {bill.type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-black tracking-tight">
                                ₹{bill.amount.toLocaleString()}
                              </p>
                              <Badge
                                variant="outline"
                                className="text-[8px] h-4 px-1.5 font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-emerald-200"
                              >
                                {bill.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ModalTabsContent>

                    <ModalTabsContent
                      value="profile"
                      className="mt-0 outline-none"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <Phone className="h-3 w-3" /> Phone Number
                            </Label>
                            <p className="text-xs font-bold">
                              {selectedLedger?.phone || "-"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <Mail className="h-3 w-3" /> Email Address
                            </Label>
                            <p className="text-xs font-bold">
                              contact@
                              {selectedLedger?.name
                                ?.toLowerCase()
                                ?.replace(/\s+/g, "")}
                              .com
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <Fingerprint className="h-3 w-3" /> GSTIN Number
                            </Label>
                            <p className="text-xs font-bold">
                              {selectedLedger?.gstin || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-3 w-3" /> Registered Address
                            </Label>
                            <p className="text-xs font-bold leading-relaxed">
                              123 Business Park, Phase II, Industrial Area,
                              Mumbai - 400001
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <CalendarDays className="h-3 w-3" /> Opening Date
                            </Label>
                            <p className="text-xs font-bold">Apr 01, 2025</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-border/50 flex gap-3">
                        <Button
                          className="flex-1 h-10 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px]"
                          data-testid="button-edit-profile"
                          onClick={() => {
                            const gstinVal = selectedLedger?.gstin || "";
                            const isRegistered =
                              gstinVal &&
                              gstinVal !== "-" &&
                              gstinVal !== "Unregistered";
                            setEditFormData({
                              name: selectedLedger?.name || "",
                              phone: selectedLedger?.phone || "",
                              phone2: "",
                              email: `contact@${selectedLedger?.name?.toLowerCase()?.replace(/\s+/g, "")}.com`,
                              gstinStatus: isRegistered
                                ? "Registered"
                                : "Unregistered",
                              gstinNumber: isRegistered ? gstinVal : "",
                              pan: isRegistered ? "ABCDE1234F" : "",
                              address:
                                "123 Business Park, Phase II, Industrial Area",
                              city: "Mumbai",
                              pincode: "400001",
                              openingDate: "2025-04-01",
                              ledgerType:
                                selectedLedger?.type?.includes("Customer") &&
                                selectedLedger?.type?.includes("Supplier")
                                  ? "Supplier, Customer"
                                  : selectedLedger?.type?.[0] || "Customer",
                            });
                            setIsEditProfileOpen(true);
                          }}
                        >
                          Edit Details
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 h-10 rounded-xl border-border/50 font-black uppercase tracking-widest text-[10px]"
                        >
                          More Actions
                        </Button>
                      </div>
                    </ModalTabsContent>
                  </ModalTabs>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Profile Popup */}
            <Dialog
              open={isEditProfileOpen}
              onOpenChange={setIsEditProfileOpen}
            >
              <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
                <DialogHeader className="p-6 pb-4 bg-slate-50 dark:bg-slate-900/50 border-b border-border/50">
                  <DialogTitle className="text-lg font-black uppercase tracking-tight">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Update account details for {selectedLedger?.name}
                  </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-4 bg-white dark:bg-slate-900 max-h-[450px] overflow-y-auto scrollbar-hide">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Account Name
                      </Label>
                      <Input
                        value={editFormData.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Ledger Type / B-S Class
                      </Label>
                      <Select
                        value={editFormData.ledgerType}
                        onValueChange={(val) =>
                          setEditFormData({ ...editFormData, ledgerType: val })
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-[11px] uppercase tracking-widest px-3 shadow-sm focus:ring-1 focus:ring-slate-400">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-1">
                          {[
                            "Customer",
                            "Supplier",
                            "Supplier, Customer",
                            "Expense",
                            "Bank",
                            "Capital",
                          ].map((t) => (
                            <SelectItem
                              key={t}
                              value={t}
                              className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2"
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone 1
                      </Label>
                      <Input
                        value={editFormData.phone}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            phone: e.target.value,
                          })
                        }
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-phone"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone 2
                      </Label>
                      <Input
                        value={editFormData.phone2}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            phone2: e.target.value,
                          })
                        }
                        placeholder="Optional"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-phone2"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </Label>
                      <Input
                        value={editFormData.email}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Fingerprint className="h-3 w-3" /> GST Status
                      </Label>
                      <Select
                        value={editFormData.gstinStatus}
                        onValueChange={(val) =>
                          setEditFormData({
                            ...editFormData,
                            gstinStatus: val,
                            gstinNumber:
                              val !== "Registered"
                                ? ""
                                : editFormData.gstinNumber,
                            pan: val !== "Registered" ? "" : editFormData.pan,
                          })
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-[11px] uppercase tracking-widest px-3 shadow-sm focus:ring-1 focus:ring-slate-400">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-1">
                          {["Registered", "Applied", "Unregistered"].map(
                            (t) => (
                              <SelectItem
                                key={t}
                                value={t}
                                className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2"
                              >
                                {t}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    {editFormData.gstinStatus === "Registered" && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                            GSTIN Number
                          </Label>
                          <Input
                            value={editFormData.gstinNumber}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                gstinNumber: e.target.value,
                              })
                            }
                            placeholder="22AAAAA0000A1Z5"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                            data-testid="input-edit-gstin-number"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                            PAN Number
                          </Label>
                          <Input
                            value={editFormData.pan}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                pan: e.target.value,
                              })
                            }
                            placeholder="ABCDE1234F"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                            data-testid="input-edit-pan"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Address
                    </Label>
                    <textarea
                      value={editFormData.address}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      className="w-full min-h-[70px] rounded-xl border border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 py-2.5 shadow-sm focus:ring-1 focus:ring-slate-400 focus:outline-none resize-none"
                      data-testid="input-edit-address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        City
                      </Label>
                      <Input
                        value={editFormData.city}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            city: e.target.value,
                          })
                        }
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-city"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Pin Code
                      </Label>
                      <Input
                        value={editFormData.pincode}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            pincode: e.target.value,
                          })
                        }
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-edit-pincode"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> Opening Date
                      </Label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={editFormData.openingDate}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              openingDate: e.target.value,
                            })
                          }
                          className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400 w-full appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                          onClick={(e) =>
                            (e.target as HTMLInputElement).showPicker?.()
                          }
                          data-testid="input-edit-opening-date"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <CalendarDays className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-border/50 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 rounded-xl border-border/50 font-black uppercase tracking-widest text-[10px]"
                    onClick={() => setIsEditProfileOpen(false)}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-10 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px]"
                    onClick={() => {
                      setIsEditProfileOpen(false);
                    }}
                    data-testid="button-save-profile"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add New Account Popup */}
            <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
              <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
                <DialogHeader className="p-6 pb-4 bg-slate-50 dark:bg-slate-900/50 border-b border-border/50">
                  <DialogTitle className="text-lg font-black uppercase tracking-tight">
                    Add New Account
                  </DialogTitle>
                  <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Create a new ledger account
                  </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-4 bg-white dark:bg-slate-900 max-h-[450px] overflow-y-auto scrollbar-hide">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Account Name
                      </Label>
                      <Input
                        value={addFormData.name}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter account name"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Ledger Type / B-S Class
                      </Label>
                      <Select
                        value={addFormData.ledgerType}
                        onValueChange={(val) =>
                          setAddFormData({ ...addFormData, ledgerType: val })
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-[11px] uppercase tracking-widest px-3 shadow-sm focus:ring-1 focus:ring-slate-400">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-1">
                          {[
                            "Customer",
                            "Supplier",
                            "Supplier, Customer",
                            "Expense",
                            "Bank",
                            "Capital",
                          ].map((t) => (
                            <SelectItem
                              key={t}
                              value={t}
                              className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2"
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone 1
                      </Label>
                      <Input
                        value={addFormData.phone}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Primary phone"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-phone"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone 2
                      </Label>
                      <Input
                        value={addFormData.phone2}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            phone2: e.target.value,
                          })
                        }
                        placeholder="Optional"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-phone2"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </Label>
                      <Input
                        value={addFormData.email}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Email address"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <Fingerprint className="h-3 w-3" /> GST Status
                      </Label>
                      <Select
                        value={addFormData.gstinStatus}
                        onValueChange={(val) =>
                          setAddFormData({
                            ...addFormData,
                            gstinStatus: val,
                            gstinNumber:
                              val !== "Registered"
                                ? ""
                                : addFormData.gstinNumber,
                            pan: val !== "Registered" ? "" : addFormData.pan,
                          })
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-[11px] uppercase tracking-widest px-3 shadow-sm focus:ring-1 focus:ring-slate-400">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-1">
                          {["Registered", "Applied", "Unregistered"].map(
                            (t) => (
                              <SelectItem
                                key={t}
                                value={t}
                                className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2"
                              >
                                {t}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    {addFormData.gstinStatus === "Registered" && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                            GSTIN Number
                          </Label>
                          <Input
                            value={addFormData.gstinNumber}
                            onChange={(e) =>
                              setAddFormData({
                                ...addFormData,
                                gstinNumber: e.target.value,
                              })
                            }
                            placeholder="22AAAAA0000A1Z5"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                            data-testid="input-add-gstin-number"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                            PAN Number
                          </Label>
                          <Input
                            value={addFormData.pan}
                            onChange={(e) =>
                              setAddFormData({
                                ...addFormData,
                                pan: e.target.value,
                              })
                            }
                            placeholder="ABCDE1234F"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                            data-testid="input-add-pan"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Address
                    </Label>
                    <textarea
                      value={addFormData.address}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter full address"
                      className="w-full min-h-[70px] rounded-xl border border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 py-2.5 shadow-sm focus:ring-1 focus:ring-slate-400 focus:outline-none resize-none"
                      data-testid="input-add-address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        City
                      </Label>
                      <Input
                        value={addFormData.city}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            city: e.target.value,
                          })
                        }
                        placeholder="City name"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-city"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Pin Code
                      </Label>
                      <Input
                        value={addFormData.pincode}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            pincode: e.target.value,
                          })
                        }
                        placeholder="Pin code"
                        className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400"
                        data-testid="input-add-pincode"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> Opening Date
                      </Label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={addFormData.openingDate}
                          onChange={(e) =>
                            setAddFormData({
                              ...addFormData,
                              openingDate: e.target.value,
                            })
                          }
                          className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-800 font-bold text-xs px-3 shadow-sm focus:ring-1 focus:ring-slate-400 w-full appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                          onClick={(e) =>
                            (e.target as HTMLInputElement).showPicker?.()
                          }
                          data-testid="input-add-opening-date"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <CalendarDays className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-border/50 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 rounded-xl border-border/50 font-black uppercase tracking-widest text-[10px]"
                    onClick={() => setIsAddAccountOpen(false)}
                    data-testid="button-cancel-add"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-10 rounded-xl bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px]"
                    onClick={() => {
                      setIsAddAccountOpen(false);
                    }}
                    data-testid="button-save-account"
                  >
                    Add Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="statements" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1 border-border/50 shadow-sm h-fit bg-white dark:bg-slate-900 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Filter Statement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Account
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between h-10 border-border/50 rounded-xl bg-white dark:bg-slate-900 font-bold text-[10px] px-3 shadow-sm hover:bg-muted/30"
                          data-testid="button-select-account"
                        >
                          <span className="truncate uppercase tracking-wide">
                            {stAccountName}
                          </span>
                          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        side="bottom"
                        sideOffset={5}
                        className="w-[250px] p-2 rounded-xl border-border/50 shadow-xl overflow-hidden bg-white dark:bg-slate-900"
                        onCloseAutoFocus={(e) => e.preventDefault()}
                      >
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 pt-1.5 pb-1">
                          Select Account
                        </DropdownMenuLabel>
                        <div className="px-2 pb-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                              placeholder="Search..."
                              value={stAccountSearch}
                              onChange={(e) =>
                                setStAccountSearch(e.target.value)
                              }
                              onKeyDown={(e) => e.stopPropagation()}
                              className="w-full h-8 text-[10px] pl-7 rounded-lg border border-border/50 bg-muted/30 outline-none focus:ring-1 focus:ring-slate-400 font-bold uppercase"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-[250px] overflow-y-auto pr-1 scrollbar-hide">
                          {filteredStAccounts.map((l) => (
                            <DropdownMenuItem
                              key={l.id}
                              className="rounded-lg font-bold text-[10px] uppercase tracking-wide py-2.5 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setStAccountName(l.name);
                              }}
                            >
                              {l.name}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        From
                      </Label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="h-9 rounded-xl border-border/50 bg-white dark:bg-slate-900 font-bold text-[10px] px-3 shadow-sm focus:ring-1 focus:ring-slate-400 w-full appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                          defaultValue="2026-01-01"
                          onClick={(e) =>
                            (e.target as HTMLInputElement).showPicker?.()
                          }
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Till
                      </Label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="h-9 rounded-xl border-border/50 bg-white dark:bg-slate-900 font-bold text-[10px] px-3 shadow-sm focus:ring-1 focus:ring-slate-400 w-full appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          onClick={(e) =>
                            (e.target as HTMLInputElement).showPicker?.()
                          }
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-10 mt-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-[10px]">
                    Fetch Statement
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[420px]">
                <CardHeader className="flex flex-row items-center justify-between py-3 px-6 border-b border-border/50 bg-slate-100/80 dark:bg-slate-900/80 shrink-0">
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm font-black uppercase tracking-widest">
                      Account Statement
                    </CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      Jan 01, 2026 - Jan 06, 2026
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-lg font-bold text-[9px] uppercase tracking-widest border-border/50 bg-white dark:bg-slate-950 px-2.5"
                    >
                      <Plus className="h-3 w-3 mr-1.5" /> Print
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-lg font-bold text-[9px] uppercase tracking-widest border-border/50 bg-white dark:bg-slate-950 px-2.5"
                    >
                      <FileText className="h-3 w-3 mr-1.5" /> Export PDF
                    </Button>
                  </div>
                </CardHeader>
                <div className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-border/50 shrink-0 px-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="w-[100px] h-10 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 p-0">
                          Date
                        </TableHead>
                        <TableHead className="h-10 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 p-0">
                          Particulars
                        </TableHead>
                        <TableHead className="text-right w-[100px] h-10 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 p-0">
                          Debit
                        </TableHead>
                        <TableHead className="text-right w-[100px] h-10 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 p-0">
                          Credit
                        </TableHead>
                        <TableHead className="text-right w-[120px] h-10 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 p-0 pr-0">
                          Balance
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>
                <CardContent className="p-0 flex-1 overflow-auto scrollbar-hide">
                  <Table className="table-fixed w-full">
                    <TableBody>
                      {STATEMENT_DATA.map((row, i) => (
                        <TableRow
                          key={i}
                          className="border-border/50 hover:bg-muted/10 transition-colors"
                        >
                          <TableCell className="w-[100px] pl-6 text-[11px] font-medium py-3 text-foreground/80">
                            {row.date}
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-foreground">
                                {row.particulars}
                              </span>
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                                {row.ref}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-[100px] text-right font-medium text-xs py-3 text-foreground/80">
                            {row.debit > 0
                              ? `₹${row.debit.toLocaleString()}`
                              : "-"}
                          </TableCell>
                          <TableCell className="w-[100px] text-right font-medium text-xs py-3 text-foreground/80">
                            {row.credit > 0
                              ? `₹${row.credit.toLocaleString()}`
                              : "-"}
                          </TableCell>
                          <TableCell className="w-[120px] text-right pr-6 py-3">
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="font-bold text-xs text-foreground/80">
                                ₹{row.balance.toLocaleString()}
                              </span>
                              <span className="text-[9px] font-black text-muted-foreground uppercase">
                                {row.b_nature}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <div className="border-t border-border/50 bg-slate-100/80 dark:bg-slate-900/80 px-6 py-1.5 shrink-0">
                  <div className="flex flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Period:
                      </span>
                      <span className="text-[9px] font-black uppercase">
                        Jan 01 — Jan 08
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                          Debit:
                        </span>
                        <span className="text-[10px] font-bold">
                          ₹
                          {STATEMENT_DATA.reduce(
                            (acc, row) => acc + row.debit,
                            0,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                          Credit:
                        </span>
                        <span className="text-[10px] font-bold">
                          ₹
                          {STATEMENT_DATA.reduce(
                            (acc, row) => acc + row.credit,
                            0,
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-4 border-l border-border/50">
                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                          Closing:
                        </span>
                        <span className="text-[10px] font-bold">
                          ₹
                          {STATEMENT_DATA[
                            STATEMENT_DATA.length - 1
                          ].balance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vouchers" className="outline-none">
            <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-2xl max-w-4xl mx-auto overflow-hidden">
              <CardHeader className="border-b border-border/50 py-4 px-6 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <CardTitle className="text-lg font-black uppercase tracking-tight">
                      Voucher Entry
                    </CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                      Post financial transactions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Voucher Type
                      </Label>
                      <Select value={vchType} onValueChange={setVchType}>
                        <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-900 font-bold text-[11px] uppercase tracking-widest px-3 shadow-sm focus:ring-1 focus:ring-slate-400">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-1">
                          {[
                            { label: "Sales", desc: "" },
                            { label: "Purchase", desc: "For supplier bills" },
                            { label: "Receipt", desc: "Money coming IN." },
                            { label: "Payment", desc: "Money going OUT." },
                            {
                              label: "Journal",
                              desc: "FOR O. BAL. / ADJUSTMENTS",
                            },
                            { label: "Credit / Debit Note", desc: "" },
                          ].map((t) => (
                            <SelectItem
                              key={t.label}
                              value={t.label}
                              className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2"
                            >
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {vchType === "Purchase" && (
                        <p className="text-[9px] font-bold text-muted-foreground ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          For supplier bills
                        </p>
                      )}
                      {vchType === "Receipt" && (
                        <p className="text-[9px] font-bold text-muted-foreground ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          Money coming IN.
                        </p>
                      )}
                      {vchType === "Payment" && (
                        <p className="text-[9px] font-bold text-muted-foreground ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          Money going OUT.
                        </p>
                      )}
                      {vchType === "Journal" && (
                        <p className="text-[9px] font-bold text-muted-foreground ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          FOR O. BAL. / ADJUSTMENTS
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Transaction Date
                        </Label>
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-900 font-bold text-[11px] px-3 shadow-sm focus:ring-1 focus:ring-slate-400 w-full appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                            defaultValue={
                              new Date().toISOString().split("T")[0]
                            }
                            onClick={(e) =>
                              (e.target as HTMLInputElement).showPicker?.()
                            }
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-calendar"
                            >
                              <path d="M8 2v4" />
                              <path d="M16 2v4" />
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <path d="M3 10h18" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Account Head
                        </Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between h-10 border-border/50 rounded-xl bg-white dark:bg-slate-900 font-bold text-[11px] px-3 shadow-sm hover:bg-muted/30 text-left"
                              data-testid="button-voucher-account"
                            >
                              <span className="truncate uppercase tracking-widest">
                                {vchAccountHead}
                              </span>
                              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            side="top"
                            sideOffset={10}
                            className="w-[300px] p-2 rounded-xl border-border/50 shadow-2xl bg-white dark:bg-slate-900 animate-in slide-in-from-bottom-2 duration-200"
                          >
                            <div className="p-2 border-b border-border/50 mb-2">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input
                                  placeholder="Search Account..."
                                  value={vchAccountSearch}
                                  onChange={(e) =>
                                    setVchAccountSearch(e.target.value)
                                  }
                                  onKeyDown={(e) => e.stopPropagation()}
                                  className="w-full h-8 text-[10px] pl-8 rounded-lg border border-border/50 bg-muted/30 outline-none font-bold uppercase"
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div className="max-h-[250px] overflow-y-auto pr-1 scrollbar-hide">
                              {filteredVchAccounts.length > 0 ? (
                                filteredVchAccounts.map((l) => (
                                  <DropdownMenuItem
                                    key={l.id}
                                    className="rounded-lg font-bold text-[10px] uppercase tracking-widest py-2.5 px-3 flex items-center justify-between cursor-pointer"
                                    onClick={() => setVchAccountHead(l.name)}
                                  >
                                    <span>{l.name}</span>
                                    <Badge
                                      variant="outline"
                                      className="text-[8px] font-black border-border/50 px-1.5 h-4 leading-none"
                                    >
                                      {l.id}
                                    </Badge>
                                  </DropdownMenuItem>
                                ))
                              ) : (
                                <div className="py-4 text-center text-[10px] font-bold text-muted-foreground uppercase">
                                  No results found
                                </div>
                              )}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Debit (Dr.)
                        </Label>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-900 text-sm font-black pl-8 shadow-sm focus:ring-1 focus:ring-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">
                            ₹
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Credit (Cr.)
                        </Label>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="h-10 rounded-xl border-border/50 bg-white dark:bg-slate-900 text-sm font-black pl-8 shadow-sm focus:ring-1 focus:ring-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">
                            ₹
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col space-y-1.5">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Narration
                      </Label>
                      <textarea
                        placeholder="Enter transaction details..."
                        className="w-full flex-1 p-3 rounded-xl border border-border/50 bg-white dark:bg-slate-900 text-[11px] font-bold outline-none focus:ring-1 focus:ring-slate-400 shadow-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-10 mt-6 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-[10px]">
                  Save Voucher
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
