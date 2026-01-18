import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Filter, Download, MoreHorizontal, Eye, Printer, XCircle, Calendar as CalendarIcon, Clock, Edit2, FileText, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";

const mockInvoices = [
    { id: "INV-2024-001", customer: "John Doe", phone: "9876543210", dateTime: "13 Jan 2024, 10:30 AM", type: "Cash", total: 12500, paid: 12500, balance: 0, status: "Paid" },
    { id: "INV-2024-002", customer: "Jane Smith", phone: "9876543211", dateTime: "12 Jan 2024, 02:15 PM", type: "Bill", total: 8200, paid: 4000, balance: 4200, status: "Partial" },
    { id: "INV-2024-003", customer: "Modern Kitchens", phone: "9876543212", dateTime: "11 Jan 2024, 09:45 AM", type: "Bill", total: 45000, paid: 0, balance: 45000, status: "Due" },
    { id: "INV-2024-004", customer: "Rahul Sharma", phone: "9876543213", dateTime: "10 Jan 2024, 04:20 PM", type: "Cash", total: 3400, paid: 0, balance: 3400, status: "Cancelled" },
    { id: "INV-2024-005", customer: "Priya Patel", phone: "9876543214", dateTime: "09 Jan 2024, 11:00 AM", type: "Cash", total: 15800, paid: 15800, balance: 0, status: "Paid" },
    { id: "INV-2024-006", customer: "Suresh Kumar", phone: "9988776655", dateTime: "08 Jan 2024, 02:30 PM", type: "Cash", total: 24500, paid: 24500, balance: 0, status: "Paid" },
    { id: "INV-2024-007", customer: "Anita Singh", phone: "9123456789", dateTime: "07 Jan 2024, 11:15 AM", type: "Bill", total: 12300, paid: 5000, balance: 7300, status: "Partial" },
    { id: "INV-2024-008", customer: "Vikram Mehta", phone: "9876500123", dateTime: "06 Jan 2024, 04:45 PM", type: "Cash", total: 8900, paid: 8900, balance: 0, status: "Paid" },
    { id: "INV-2024-009", customer: "Rajesh Chen", phone: "9555443322", dateTime: "05 Jan 2024, 01:20 PM", type: "Cash", total: 31200, paid: 31200, balance: 0, status: "Paid" },
    { id: "INV-2024-010", customer: "Meera Gupta", phone: "9444332211", dateTime: "04 Jan 2024, 10:10 AM", type: "Bill", total: 6700, paid: 2000, balance: 4700, status: "Due" },
    { id: "INV-2024-011", customer: "Anjali Sharma", phone: "9333221100", dateTime: "03 Jan 2024, 03:45 PM", type: "Cash", total: 14500, paid: 14500, balance: 0, status: "Paid" },
    { id: "INV-2024-012", customer: "Karan Singh", phone: "9222110099", dateTime: "02 Jan 2024, 12:30 PM", type: "Cash", total: 21000, paid: 21000, balance: 0, status: "Paid" },
    { id: "INV-2024-013", customer: "Sunita Roy", phone: "9111009988", dateTime: "01 Jan 2024, 11:20 AM", type: "Cash", total: 5400, paid: 5400, balance: 0, status: "Paid" },
    { id: "INV-2024-014", customer: "Rakesh Verma", phone: "9000998877", dateTime: "31 Dec 2023, 04:15 PM", type: "Bill", total: 18900, paid: 8000, balance: 10900, status: "Partial" },
];

export default function InvoiceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isAmountFilterOpen, setIsAmountFilterOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isReactivateDialogOpen, setIsReactivateDialogOpen] = useState(false);
  const [isViewBillOpen, setIsViewBillOpen] = useState(false);
  const [isEditBillOpen, setIsEditBillOpen] = useState(false);
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);
  const [isPartyPopupOpen, setIsPartyPopupOpen] = useState(false);
  const [editInvoiceData, setEditInvoiceData] = useState<any>(null);
  const [saveReason, setSaveReason] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [reactivateReason, setReactivateReason] = useState("");
  const [newStatus, setNewStatus] = useState<string>("Paid");
  const [newPaidAmount, setNewPaidAmount] = useState("");
  const [invoices, setInvoices] = useState(mockInvoices);

  const [amountType, setAmountType] = useState<"total" | "paid" | "balance">("total");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [appliedAmountFilter, setAppliedAmountFilter] = useState<{ type: string; min: number; max: number } | null>(null);

  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [appliedDateFilter, setAppliedDateFilter] = useState<{ from: Date | undefined; to: Date | undefined; start: string; end: string } | null>(null);

  const filteredInvoices = useMemo(() => {
    let result = invoices.filter(invoice => {
      const matchesSearch = 
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.phone.includes(searchQuery);

      if (!matchesSearch) return false;

      if (activeFilter !== "ALL") {
        if (["PAID", "PARTIAL", "DUE", "CANCELLED"].includes(activeFilter)) {
          if (invoice.status.toUpperCase() !== activeFilter) return false;
        }
        if (activeFilter === "CASH") {
          if (invoice.type.toUpperCase() !== "CASH") return false;
        }
        if (activeFilter === "BILL") {
          if (invoice.type.toUpperCase() !== "BILL") return false;
        }
      }

      if (appliedAmountFilter) {
        const val = appliedAmountFilter.type === "total" ? invoice.total : 
                    appliedAmountFilter.type === "paid" ? invoice.paid : 
                    invoice.balance;
        if (val < appliedAmountFilter.min || val > appliedAmountFilter.max) return false;
      }

      if (appliedDateFilter && appliedDateFilter.from) {
        const invoiceDate = parse(invoice.dateTime, "dd MMM yyyy, hh:mm a", new Date());
        const startOfRange = appliedDateFilter.from;
        const endOfRange = appliedDateFilter.to || appliedDateFilter.from;
        
        const dateOnly = new Date(invoiceDate.getFullYear(), invoiceDate.getMonth(), invoiceDate.getDate());
        const fromDateOnly = new Date(startOfRange.getFullYear(), startOfRange.getMonth(), startOfRange.getDate());
        const toDateOnly = new Date(endOfRange.getFullYear(), endOfRange.getMonth(), endOfRange.getDate());

        if (dateOnly < fromDateOnly || dateOnly > toDateOnly) return false;

        const [sH, sM] = appliedDateFilter.start.split(":").map(Number);
        const [eH, eM] = appliedDateFilter.end.split(":").map(Number);
        
        const invoiceTimeValue = invoiceDate.getHours() * 60 + invoiceDate.getMinutes();
        const startTimeValue = sH * 60 + sM;
        const endTimeValue = eH * 60 + eM;

        if (invoiceTimeValue < startTimeValue || invoiceTimeValue > endTimeValue) return false;
      }

      return true;
    });

    return [...result].sort((a, b) => {
      if (activeFilter === "SORT_VAL_DESC") return b.total - a.total;
      if (activeFilter === "SORT_VAL_ASC") return a.total - b.total;
      if (activeFilter === "SORT_DATE_DESC") return parse(b.dateTime, "dd MMM yyyy, hh:mm a", new Date()).getTime() - parse(a.dateTime, "dd MMM yyyy, hh:mm a", new Date()).getTime();
      if (activeFilter === "SORT_DATE_ASC") return parse(a.dateTime, "dd MMM yyyy, hh:mm a", new Date()).getTime() - parse(b.dateTime, "dd MMM yyyy, hh:mm a", new Date()).getTime();
      
      return 0;
    });
  }, [searchQuery, activeFilter, appliedDateFilter, appliedAmountFilter, invoices]);

  const handleCancelInvoice = () => {
    if (!selectedInvoiceId) return;
    setInvoices(prev => prev.map(inv => 
      inv.id === selectedInvoiceId 
        ? { ...inv, status: "Cancelled" } 
        : inv
    ));
    setIsCancelDialogOpen(false);
    setCancelReason("");
    setSelectedInvoiceId(null);
  };

  const handleReactivateInvoice = () => {
    if (!selectedInvoiceId) return;
    setInvoices(prev => prev.map(inv => {
      if (inv.id === selectedInvoiceId) {
        const paid = newStatus === "Paid" ? inv.total : (newStatus === "Partial" ? Number(newPaidAmount) : 0);
        const balance = inv.total - paid;
        return { 
          ...inv, 
          status: newStatus as any,
          paid,
          balance
        };
      }
      return inv;
    }));
    setIsReactivateDialogOpen(false);
    setReactivateReason("");
    setNewPaidAmount("");
    setSelectedInvoiceId(null);
  };

  const handleApplyDateFilter = () => {
    setAppliedDateFilter({
      from: dateRange.from,
      to: dateRange.to,
      start: startTime,
      end: endTime
    });
    setIsDateFilterOpen(false);
    setActiveFilter("CUSTOM_DATE");
  };

  const handleApplyAmountFilter = () => {
    setAppliedAmountFilter({
      type: amountType,
      min: minAmount === "" ? 0 : Number(minAmount),
      max: maxAmount === "" ? Infinity : Number(maxAmount)
    });
    setIsAmountFilterOpen(false);
    setActiveFilter("CUSTOM_AMOUNT");
  };

  const resetAmountFilter = () => {
    setMinAmount("");
    setMaxAmount("");
    setAppliedAmountFilter(null);
    setActiveFilter("ALL");
  };

  const resetDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
    setStartTime("00:00");
    setEndTime("23:59");
    setAppliedDateFilter(null);
    setActiveFilter("ALL");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Invoice List</h1>
          <p className="text-muted-foreground font-medium text-sm">Manage and track all customer invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-border/50 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95">
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            Export Invoices
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50 flex flex-col h-[calc(100vh-270px)]">
        <CardHeader className="py-3 px-4 border-b border-border/30 bg-muted/20 dark:bg-slate-800/50 flex flex-row items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input 
                placeholder="Search by Bill No, Customer or Phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 font-medium text-xs border-border/50 focus:ring-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm" 
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn(
                  "h-9 w-9 border-border/50 rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95",
                  (activeFilter !== "ALL" || appliedDateFilter || appliedAmountFilter) && "text-primary border-primary/50"
                )}>
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-1.5 rounded-xl border-border/50 shadow-xl overflow-hidden">
                <div className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Filters</div>
                <DropdownMenuItem onClick={() => { setActiveFilter("ALL"); setAppliedDateFilter(null); setAppliedAmountFilter(null); }} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">
                  All Invoices
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <div className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Status</div>
                <DropdownMenuItem onClick={() => setActiveFilter("PAID")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Paid</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("PARTIAL")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Partial</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("DUE")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Due</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("CANCELLED")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-red-500">Cancelled</DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <div className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Type</div>
                <DropdownMenuItem onClick={() => setActiveFilter("CASH")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Cash</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("BILL")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Bill</DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <div className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Sorting</div>
                <DropdownMenuItem onClick={() => setActiveFilter("SORT_VAL_DESC")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Value: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("SORT_VAL_ASC")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Value: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("SORT_DATE_DESC")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Date: New to Old</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("SORT_DATE_ASC")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Date: Old to New</DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <div className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Custom Filters</div>
                <DropdownMenuItem onClick={() => setIsDateFilterOpen(true)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 flex items-center gap-2">
                  <CalendarIcon className="w-3 h-3" /> Date & Time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAmountFilterOpen(true)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 flex items-center gap-2">
                   <Filter className="w-3 h-3" /> By Amount
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(appliedDateFilter || appliedAmountFilter) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { resetDateFilter(); resetAmountFilter(); }}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-3 rounded-xl font-bold text-[9px] uppercase tracking-widest border border-red-100"
              >
                Clear Filters
              </Button>
            )}

            {appliedDateFilter && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-tight">
                <CalendarIcon className="w-3 h-3" />
                {appliedDateFilter.from ? format(appliedDateFilter.from, "dd MMM") : ""} 
                {appliedDateFilter.to ? ` - ${format(appliedDateFilter.to, "dd MMM")}` : ""}
                <span className="mx-1 opacity-30">|</span>
                <Clock className="w-3 h-3" />
                {appliedDateFilter.start} - {appliedDateFilter.end}
              </div>
            )}

            {appliedAmountFilter && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-tight">
                <span className="capitalize">{appliedAmountFilter.type}</span>: 
                ₹{appliedAmountFilter.min} - {appliedAmountFilter.max === Infinity ? "Max" : `₹${appliedAmountFilter.max}`}
              </div>
            )}
          </div>
        </CardHeader>

        <div className="overflow-x-auto bg-muted/10 dark:bg-slate-800/30 border-b border-border/30 shrink-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Bill No</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[180px]">Date & Time</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[200px]">Customer</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Phone No</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Bill Type</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Total Amount</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Paid</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Balance</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Status</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 text-right pr-6 w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        <CardContent className="p-0 overflow-y-auto overflow-x-auto flex-1 scrollbar-hide">
          <Table>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/20 dark:hover:bg-slate-800/50 transition-all border-b border-border/20 dark:border-border/10 last:border-0 group">
                    <TableCell className="font-bold text-xs py-4 w-[120px]">{invoice.id}</TableCell>
                    <TableCell className="text-[11px] py-4 text-muted-foreground font-medium w-[180px]">{invoice.dateTime}</TableCell>
                    <TableCell className="text-xs py-4 font-bold text-foreground w-[200px]">{invoice.customer}</TableCell>
                    <TableCell className="text-xs py-4 text-muted-foreground font-medium w-[120px]">{invoice.phone}</TableCell>
                    <TableCell className="text-xs py-4 w-[100px]">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground">
                        {invoice.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-4 font-black text-foreground w-[120px]">₹{invoice.total.toLocaleString()}</TableCell>
                    <TableCell className="text-xs py-4 font-black text-foreground w-[120px]">₹{invoice.paid.toLocaleString()}</TableCell>
                    <TableCell className="text-xs py-4 font-black text-foreground w-[120px]">₹{invoice.balance.toLocaleString()}</TableCell>
                    <TableCell className="py-4 w-[100px]">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        invoice.status === "Cancelled" ? "text-red-500" : "text-muted-foreground"
                      )}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 pr-6 w-[80px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground hover:bg-muted rounded-lg transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl border-border/50 shadow-xl overflow-hidden">
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setIsViewBillOpen(true);
                            }}
                            className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2"
                          >
                            <Eye className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setEditInvoiceData({
                                ...invoice,
                                items: [
                                  { id: 1, name: "Premium Kitchen Set", desc: "Stainless Steel | 12 Pcs", qty: 1, rate: invoice.total * 0.5, exDisc: 0 },
                                  { id: 2, name: "Non-Stick Frying Pan", desc: "Ceramic Coating | 24cm", qty: 1, rate: invoice.total * 0.3, exDisc: 0 },
                                  { id: 3, name: "Kitchen Tool Set", desc: "Silicone & Wood | 5 Pcs", qty: 1, rate: invoice.total * 0.2, exDisc: 0 },
                                ],
                                terms: invoice.type === "Cash" ? "CASH" : "BILL",
                                party: "Cash Sales",
                                subType: invoice.subType || "LOCAL GST INCLUDED",
                                paymentMethod: invoice.paymentMethod?.toUpperCase() || "CASH",
                                agents: ["Rahul", "Simran"],
                                aDiscount: 0
                              });
                              setIsEditBillOpen(true);
                            }}
                            className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" /> Edit Bill
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">
                            <Printer className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" /> Print Bill
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">
                            <FileText className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" /> Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30 my-1" />
                          {invoice.status === "Cancelled" ? (
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedInvoiceId(invoice.id);
                                setIsReactivateDialogOpen(true);
                                setNewStatus("Paid");
                              }}
                              className="text-[11px] font-bold uppercase tracking-wider cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50/50 rounded-lg py-2"
                            >
                              <Filter className="w-3.5 h-3.5 mr-2.5" /> Reactivate Bill
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedInvoiceId(invoice.id);
                                setIsCancelDialogOpen(true);
                              }}
                              className="text-[11px] font-bold uppercase tracking-wider cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50/50 rounded-lg py-2"
                            >
                              <XCircle className="w-3.5 h-3.5 mr-2.5" /> Cancel Bill
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-32 text-center text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                    No invoices found for the selected criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Bill Dialog */}
      <Dialog open={isEditBillOpen} onOpenChange={setIsEditBillOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-muted/20">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Edit Invoice</h2>
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>No: {editInvoiceData?.id}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="grid grid-cols-2 gap-12 pb-8 border-b border-dashed border-slate-200 dark:border-slate-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Customer Information</div>
                    {editInvoiceData?.party === "Cash Sales" && (
                      <div className="relative w-48">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input 
                          placeholder="Search Customer..." 
                          className="h-7 pl-7 text-[10px] font-bold rounded-lg border-slate-200"
                          onChange={(e) => {
                            const search = e.target.value.toLowerCase();
                            const found = [
                              { name: "Rahul Sharma", phone: "9876543210" },
                              { name: "Priya Patel", phone: "9876543211" },
                              { name: "Suresh Kumar", phone: "9988776655" }
                            ].find(c => c.name.toLowerCase().includes(search) || c.phone.includes(search));
                            if (found && search.length > 2) {
                              setEditInvoiceData({...editInvoiceData, customer: found.name, phone: found.phone});
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 dark:text-white">{editInvoiceData?.customer}</p>
                    <p className="text-sm font-bold text-muted-foreground">{editInvoiceData?.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-wider">Terms</Label>
                    <Select value={editInvoiceData?.terms} onValueChange={(v) => setEditInvoiceData({...editInvoiceData, terms: v})}>
                      <SelectTrigger className="h-9 rounded-xl font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BILL">BILL</SelectItem>
                        <SelectItem value="CASH">CASH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-wider">Party</Label>
                    <Select 
                      value={editInvoiceData?.party} 
                      onValueChange={(v) => {
                        if (v === "Credit Party") setIsPartyPopupOpen(true);
                        setEditInvoiceData({...editInvoiceData, party: v});
                      }}
                    >
                      <SelectTrigger className="h-9 rounded-xl font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash Sales">Cash Sales</SelectItem>
                        <SelectItem value="Credit Party">Credit Party</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-wider">Sub Type</Label>
                    <Select value={editInvoiceData?.subType} onValueChange={(v) => setEditInvoiceData({...editInvoiceData, subType: v})}>
                      <SelectTrigger className="h-9 rounded-xl font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOCAL GST INCLUDED">LOCAL GST INCLUDED</SelectItem>
                        <SelectItem value="LOCAL GST">LOCAL GST</SelectItem>
                        <SelectItem value="INTERSTATE GST">INTERSTATE GST</SelectItem>
                        <SelectItem value="INTERSTATE GST INCLUDED">INTERSTATE GST INCLUDED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-wider">Payment Method</Label>
                    <Select value={editInvoiceData?.paymentMethod || "CASH"} onValueChange={(v) => setEditInvoiceData({...editInvoiceData, paymentMethod: v})}>
                      <SelectTrigger className="h-9 rounded-xl font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASH">CASH</SelectItem>
                        <SelectItem value="CARD">CARD</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                        <SelectItem value="NET BANKING">NET BANKING</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] font-black uppercase tracking-wider">Agents</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 w-full justify-start px-3 py-1 font-bold text-xs rounded-xl border-slate-200">
                          <div className="truncate">
                            {editInvoiceData?.agents?.length > 0 ? editInvoiceData.agents.join(", ") : "Select Agents"}
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 rounded-xl">
                        {["Rahul", "Simran", "Amit", "Owner"].map((agent) => (
                          <DropdownMenuItem 
                            key={agent} 
                            onClick={() => {
                              const currentAgents = editInvoiceData?.agents || [];
                              const newAgents = currentAgents.includes(agent)
                                ? currentAgents.filter((a: string) => a !== agent)
                                : [...currentAgents, agent];
                              setEditInvoiceData({...editInvoiceData, agents: newAgents});
                            }}
                            className="text-xs font-bold uppercase"
                          >
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={editInvoiceData?.agents?.includes(agent)} 
                                readOnly 
                                className="h-3 w-3 rounded"
                              />
                              {agent}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Items</div>
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900">
                      <TableRow className="h-10">
                        <TableHead className="text-[9px] font-black uppercase">Product</TableHead>
                        <TableHead className="text-[9px] font-black uppercase text-center w-20">Qty</TableHead>
                        <TableHead className="text-[9px] font-black uppercase text-right">Rate</TableHead>
                        <TableHead className="text-[9px] font-black uppercase text-center w-24">Ex. Disc%</TableHead>
                        <TableHead className="text-[9px] font-black uppercase text-right">Amount</TableHead>
                        <TableHead className="text-[9px] font-black uppercase text-center w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {editInvoiceData?.items?.map((item: any, idx: number) => (
                        <TableRow key={item.id} className="h-16">
                          <TableCell>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.qty} 
                              onChange={(e) => {
                                const newItems = [...editInvoiceData.items];
                                newItems[idx].qty = Number(e.target.value);
                                setEditInvoiceData({...editInvoiceData, items: newItems});
                              }}
                              className="h-8 text-center font-bold text-xs rounded-lg"
                            />
                          </TableCell>
                          <TableCell className="text-right font-bold text-sm">₹{item.rate.toLocaleString()}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.exDisc} 
                              onChange={(e) => {
                                const newItems = [...editInvoiceData.items];
                                newItems[idx].exDisc = Number(e.target.value);
                                setEditInvoiceData({...editInvoiceData, items: newItems});
                              }}
                              className="h-8 text-center font-bold text-xs rounded-lg"
                            />
                          </TableCell>
                          <TableCell className="text-right font-black text-sm">₹{(item.qty * item.rate * (1 - item.exDisc/100)).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:bg-red-50"
                              onClick={() => {
                                const newItems = editInvoiceData.items.filter((_: any, i: number) => i !== idx);
                                setEditInvoiceData({...editInvoiceData, items: newItems});
                              }}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <div className="w-80 space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase">A. Discount</span>
                    <Input 
                      type="number" 
                      value={editInvoiceData?.aDiscount} 
                      onChange={(e) => setEditInvoiceData({...editInvoiceData, aDiscount: Number(e.target.value)})}
                      className="h-8 w-24 text-right font-bold text-xs rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center p-4 rounded-xl border bg-slate-50 dark:bg-slate-900/50">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Grand Total</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">₹{
                      (editInvoiceData?.items?.reduce((acc: number, item: any) => acc + (item.qty * item.rate * (1 - item.exDisc/100)), 0) - (editInvoiceData?.aDiscount || 0)).toLocaleString()
                    }</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-muted/10 flex gap-4">
              <Button 
                onClick={() => setIsSaveConfirmationOpen(true)}
                className="flex-1 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] h-12 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={isSaveConfirmationOpen} onOpenChange={setIsSaveConfirmationOpen}>
        <DialogContent className="sm:max-w-[400px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-lg font-bold tracking-tight">Confirm Update</h2>
              <p className="text-sm text-muted-foreground">Please provide a reason for this update.</p>
            </div>
            <textarea 
              value={saveReason}
              onChange={(e) => setSaveReason(e.target.value)}
              placeholder="Enter reason here..."
              className="w-full min-h-[100px] p-4 rounded-2xl border bg-muted/20 font-medium text-sm outline-none resize-none"
            />
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setIsSaveConfirmationOpen(false)} className="flex-1 rounded-xl font-bold uppercase text-[10px]">Cancel</Button>
              <Button 
                onClick={() => {
                  const newTotal = editInvoiceData.items.reduce((acc: number, item: any) => acc + (item.qty * item.rate * (1 - item.exDisc/100)), 0) - (editInvoiceData.aDiscount || 0);
                  setInvoices(prev => prev.map(inv => 
                    inv.id === editInvoiceData.id 
                      ? { 
                          ...inv, 
                          customer: editInvoiceData.customer, 
                          phone: editInvoiceData.phone,
                          total: newTotal,
                          type: editInvoiceData.terms === "CASH" ? "Cash" : "Credit",
                          balance: Math.max(0, newTotal - inv.paid),
                          subType: editInvoiceData.subType,
                          paymentMethod: editInvoiceData.paymentMethod
                        } 
                      : inv
                  ));
                  setIsSaveConfirmationOpen(false);
                  setIsEditBillOpen(false);
                  setSaveReason("");
                }}
                disabled={!saveReason.trim()}
                className="flex-[1.5] rounded-xl font-bold uppercase text-[10px] bg-slate-900 text-white"
              >
                Yes, Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Party Selection Popup */}
      <Dialog open={isPartyPopupOpen} onOpenChange={setIsPartyPopupOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <h2 className="text-lg font-bold tracking-tight">Select Party</h2>
            <div className="space-y-2">
              {[
                { name: "Global Kitchen Solutions", phone: "9822001122", address: "Mumbai, Maharashtra" },
                { name: "Royal Utensils Hub", phone: "9833445566", address: "Pune, Maharashtra" },
                { name: "Modern Home Needs", phone: "9855667788", address: "Surat, Gujarat" }
              ].map((p, i) => (
                <div 
                  key={i} 
                  className="p-4 border rounded-2xl hover:bg-muted/50 cursor-pointer transition-all"
                  onClick={() => {
                    setEditInvoiceData({
                      ...editInvoiceData,
                      customer: p.name,
                      phone: p.phone,
                      party: "Credit Party"
                    });
                    setIsPartyPopupOpen(false);
                  }}
                >
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.phone} • {p.address}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDateFilterOpen} onOpenChange={setIsDateFilterOpen}>
        <DialogContent className="sm:max-w-[420px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Filter Invoices</h2>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Select date and time</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 border border-slate-100 dark:border-slate-800 flex justify-center">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                  className="rounded-md border-none"
                  classNames={{
                    months: "w-full",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center px-8",
                    caption_label: "text-sm font-bold text-slate-900 dark:text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-all rounded-lg border-none hover:bg-slate-200 dark:hover:bg-slate-800"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-bold text-[10px] uppercase",
                    row: "flex w-full mt-2",
                    cell: cn(
                      "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/5 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full",
                      "h-9 w-9"
                    ),
                    day: cn(
                      "h-9 w-9 p-0 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all text-xs"
                    ),
                    day_range_start: "aria-selected:bg-primary aria-selected:text-primary-foreground rounded-full",
                    day_range_end: "aria-selected:bg-primary aria-selected:text-primary-foreground rounded-full",
                    day_selected: "bg-primary text-primary-foreground",
                    day_today: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold",
                    day_outside: "text-muted-foreground/30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-primary",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Start Time</Label>
                  <Input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-10 rounded-xl font-bold text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">End Time</Label>
                  <Input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="h-10 rounded-xl font-bold text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsDateFilterOpen(false)} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 border-border/50 dark:text-slate-400"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApplyDateFilter} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Bill Dialog */}
      <Dialog open={isViewBillOpen} onOpenChange={setIsViewBillOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="flex flex-col h-full max-h-[85vh]">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-muted/20">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Invoice Details</h2>
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>No: {selectedInvoice?.id}</span>
                  <span className="opacity-30">|</span>
                  <span>Date: {selectedInvoice?.dateTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-12 pb-8 border-b border-dashed border-slate-200 dark:border-slate-800">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Customer Information</div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 dark:text-white">{selectedInvoice?.customer}</p>
                    <p className="text-sm font-bold text-muted-foreground">{selectedInvoice?.phone}</p>
                    <p className="text-xs font-medium text-muted-foreground/60 leading-relaxed">
                      123 Business Street, Showroom 1<br />
                      GSTIN: 27AAAAA0000A1Z5
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Billing Details</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Status</p>
                      <span className={cn(
                        "inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md",
                        selectedInvoice?.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" :
                        selectedInvoice?.status === "Cancelled" ? "bg-red-500/10 text-red-600" :
                        "bg-amber-500/10 text-amber-600"
                      )}>
                        {selectedInvoice?.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Terms</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">{selectedInvoice?.terms || "Cash"}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Sub-Type</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">{selectedInvoice?.subType || "Local GST Included"}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Payment Method</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">{selectedInvoice?.paymentMethod || "Cash"}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Party</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">Cash Sales</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">Agent / Deals By</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">{selectedInvoice?.agents?.join(", ") || "Rahul, Simran"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Line Items</div>
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900">
                      <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                        <TableHead className="text-[9px] font-black uppercase h-10 text-slate-500">Product Description</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-center text-slate-500">Qty</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-right text-slate-500">Rate</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-right text-slate-500">Disc%</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-right text-slate-500">Ex. Disc%</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-right text-slate-500">GST%</TableHead>
                        <TableHead className="text-[9px] font-black uppercase h-10 text-right text-slate-500">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        const totalAmount = selectedInvoice?.total || 0;
                        const items = [
                          { name: "Premium Kitchen Set", desc: "Stainless Steel | 12 Pcs", qty: 1, rate: totalAmount * 0.5 },
                          { name: "Non-Stick Frying Pan", desc: "Ceramic Coating | 24cm", qty: 1, rate: totalAmount * 0.3 },
                          { name: "Kitchen Tool Set", desc: "Silicone & Wood | 5 Pcs", qty: 1, rate: totalAmount * 0.2 },
                        ];
                        return items.map((item, idx) => (
                          <TableRow key={idx} className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                            <TableCell className="py-4">
                              <p className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{item.desc}</p>
                            </TableCell>
                            <TableCell className="text-center font-bold text-sm text-slate-900 dark:text-white">{item.qty}</TableCell>
                            <TableCell className="text-right font-bold text-sm text-slate-900 dark:text-white">₹{item.rate.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-bold text-sm text-slate-500">0%</TableCell>
                            <TableCell className="text-right font-bold text-sm text-slate-500">0%</TableCell>
                            <TableCell className="text-right font-bold text-sm text-slate-500">18%</TableCell>
                            <TableCell className="text-right font-black text-sm text-slate-900 dark:text-white">₹{item.rate.toLocaleString()}</TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Summary Section */}
              <div className="flex justify-end pt-4">
                <div className="w-80 space-y-2.5">
                  <div className="grid grid-cols-2 px-2 text-[11px] font-bold text-muted-foreground/80">
                    <span className="uppercase tracking-wider">Subtotal</span>
                    <span className="text-right text-slate-900 dark:text-white">₹{selectedInvoice?.total?.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 px-2 text-[11px] font-bold text-muted-foreground/80">
                    <span className="uppercase tracking-wider">CGST (9%)</span>
                    <span className="text-right text-slate-900 dark:text-white">₹{(selectedInvoice?.total * 0.09 || 0).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 px-2 text-[11px] font-bold text-muted-foreground/80">
                    <span className="uppercase tracking-wider">SGST (9%)</span>
                    <span className="text-right text-slate-900 dark:text-white">₹{(selectedInvoice?.total * 0.09 || 0).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 px-2 text-[11px] font-bold text-muted-foreground/80">
                    <span className="uppercase tracking-wider">A. Discount</span>
                    <span className="text-right text-emerald-600">₹0</span>
                  </div>
                  <div className="grid grid-cols-2 px-2 text-[11px] font-bold text-muted-foreground/80">
                    <span className="uppercase tracking-wider">Round Off</span>
                    <span className="text-right text-slate-500">₹0.00</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Grand Total</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">₹{selectedInvoice?.total?.toLocaleString()}</span>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Paid</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">₹{selectedInvoice?.paid?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Balance</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">₹{selectedInvoice?.balance?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-muted/10 flex gap-4">
              <Button 
                onClick={() => setIsViewBillOpen(false)}
                className="flex-1 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] h-12 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reactivate Bill Dialog */}
      <Dialog open={isReactivateDialogOpen} onOpenChange={setIsReactivateDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Reactivate Invoice</h2>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Update status for {selectedInvoiceId}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">New Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs bg-slate-50/50 dark:bg-slate-900/50">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50">
                    <SelectItem value="Paid" className="text-xs font-bold uppercase py-2">Paid</SelectItem>
                    <SelectItem value="Partial" className="text-xs font-bold uppercase py-2">Partial</SelectItem>
                    <SelectItem value="Due" className="text-xs font-bold uppercase py-2">Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newStatus === "Partial" && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Paid Amount (₹)</Label>
                  <Input 
                    type="number"
                    value={newPaidAmount}
                    onChange={(e) => setNewPaidAmount(e.target.value)}
                    placeholder="Enter amount paid"
                    className="h-10 rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs bg-white dark:bg-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Reason for Reactivation</Label>
                <textarea 
                  value={reactivateReason}
                  onChange={(e) => setReactivateReason(e.target.value)}
                  placeholder="Enter reason here..."
                  className="w-full min-h-[80px] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 font-medium text-sm focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900/50 dark:focus:ring-white/10 dark:focus:border-white/20 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsReactivateDialogOpen(false)} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 border-border/50 dark:text-slate-400"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleReactivateInvoice}
                disabled={!reactivateReason.trim() || (newStatus === "Partial" && !newPaidAmount)}
                className="flex-[1.5] rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-black/10 dark:shadow-white/5"
              >
                Update & Reactivate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Bill Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Cancel Invoice</h2>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Confirm cancellation for {selectedInvoiceId}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Reason for Cancellation</Label>
              <textarea 
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter reason here..."
                className="w-full min-h-[100px] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 font-medium text-sm focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900/50 dark:focus:ring-white/10 dark:focus:border-white/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsCancelDialogOpen(false)} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 border-border/50 dark:text-slate-400"
              >
                Go Back
              </Button>
              <Button 
                onClick={handleCancelInvoice}
                disabled={!cancelReason.trim()}
                className="flex-[1.5] rounded-xl font-bold uppercase text-[10px] tracking-widest h-11 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg shadow-black/10 dark:shadow-white/5"
              >
                Yes, Cancel Bill
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isAmountFilterOpen} onOpenChange={setIsAmountFilterOpen}>
        <DialogContent className="sm:max-w-[380px] p-6 rounded-3xl border-none shadow-2xl bg-white dark:bg-slate-950">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Amount Filter</h2>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Filter by payment metrics</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Select Field</Label>
                <Select value={amountType} onValueChange={(val: any) => setAmountType(val)}>
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs bg-slate-50/50 dark:bg-slate-900/50">
                    <SelectValue placeholder="Select amount type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50">
                    <SelectItem value="total" className="text-xs font-bold uppercase py-2">Total Amount</SelectItem>
                    <SelectItem value="paid" className="text-xs font-bold uppercase py-2">Paid Amount</SelectItem>
                    <SelectItem value="balance" className="text-xs font-bold uppercase py-2">Balance Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Amount Range (₹)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    placeholder="Min" 
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs bg-white dark:bg-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Input 
                    placeholder="Max" 
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 dark:border-slate-800 font-bold text-xs bg-white dark:bg-slate-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsAmountFilterOpen(false)} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-10 border-border/50 dark:text-slate-400"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApplyAmountFilter} 
                className="flex-1 rounded-xl font-bold uppercase text-[10px] tracking-widest h-10 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
