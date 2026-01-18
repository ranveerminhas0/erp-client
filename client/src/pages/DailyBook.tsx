import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  History,
  Filter,
  Download,
  Wallet,
  ArrowRight,
  Search,
  Calendar,
  X,
  CheckCircle2,
  AlertTriangle,
  Lock,
  BarChart3,
  CircleDollarSign,
  Smartphone,
  CreditCard,
  UserPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";

const transactions = [
  { id: 1, type: "income", category: "Customer Advance", amount: 2000, description: "Advance for Order #8821", date: "10:30 AM", status: "Completed" },
  { id: 2, type: "expense", category: "Tea & Snacks", amount: 150, description: "Office refreshments", date: "11:15 AM", status: "Completed" },
  { id: 3, type: "income", category: "Cash Sale", amount: 15400, description: "Counter sale MM01", date: "12:45 PM", status: "Completed" },
  { id: 4, type: "deposit", category: "Bank Deposit", amount: 25000, description: "HDFC A/C Transfer", date: "Yesterday", status: "Verified" },
];

export default function DailyBook() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [isCashOutOpen, setIsCashOutOpen] = useState(false);
  const [isCashInOpen, setIsCashInOpen] = useState(false);
  const [isBankDepositOpen, setIsBankDepositOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isEmployeeSelectOpen, setIsEmployeeSelectOpen] = useState(false);
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isSalesStatsOpen, setIsSalesStatsOpen] = useState(false);

  // Close Daily Book Workflow
  const [isCloseDailyBookOpen, setIsCloseDailyBookOpen] = useState(false);
  const [closeStep, setCloseStep] = useState(1);
  const [isVerified, setIsVerified] = useState<string>("");
  const [isDailyBookClosed, setIsDailyBookClosed] = useState(false);

  useEffect(() => {
    const handleOpenCloseDailyBook = () => {
      setIsCloseDailyBookOpen(true);
      setCloseStep(1);
      setIsVerified("");
    };
    const handleCheckCloseState = () => {
      const event = new CustomEvent('daily-book-status', { detail: { closed: isDailyBookClosed } });
      window.dispatchEvent(event);
    };
    window.addEventListener('open-close-daily-book', handleOpenCloseDailyBook);
    window.addEventListener('check-daily-book-status', handleCheckCloseState);
    handleCheckCloseState();
    return () => {
      window.removeEventListener('open-close-daily-book', handleOpenCloseDailyBook);
      window.removeEventListener('check-daily-book-status', handleCheckCloseState);
    };
  }, [isDailyBookClosed]);

  const employees = ["Rajesh Kumar", "Amit Singh", "Suresh Verma", "Priya Sharma"];
  const mockCustomers = [
    { id: "C001", name: "Rahul", balance: 15400 },
    { id: "C002", name: "Anaya", balance: 2100 },
    { id: "C003", name: "Vikram Malhotra", balance: 0 },
    { id: "C004", name: "Sanjay Mehra", balance: 8900 },
  ];

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredTransactions = transactions.filter(t => {
    const matchesTab = activeTab === "all" || t.type === activeTab;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {isDailyBookClosed && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-center justify-center gap-3"
        >
          <Lock className="h-4 w-4 text-amber-600" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Daily Book is closed for today</h2>
        </motion.div>
      )}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Daily Cash Book</h1>
          <p className="text-muted-foreground font-medium text-sm">Monitor and record every cash transaction for the day</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-10 gap-2 border-border/50 hover:bg-muted text-foreground font-bold text-xs uppercase tracking-wider px-4 transition-all active:scale-95"
            onClick={() => {
              if (isDailyBookClosed) {
                toast({
                  title: "Action Restricted",
                  description: "Daily book is closed. You can't add new entries now.",
                  variant: "destructive",
                });
                return;
              }
              setSelectedCategory("");
              setSelectedCustomer(null);
              setIsCashInOpen(true);
            }}
          >
            <ArrowDownRight className="h-4 w-4 stroke-[3px]" />
            Cash In
          </Button>
          <Button 
            variant="outline" 
            className="h-10 gap-2 border-border/50 hover:bg-muted text-foreground font-bold text-xs uppercase tracking-wider px-4 transition-all active:scale-95"
            onClick={() => {
              if (isDailyBookClosed) {
                toast({
                  title: "Action Restricted",
                  description: "Daily book is closed. You can't add new entries now.",
                  variant: "destructive",
                });
                return;
              }
              setSelectedCategory("");
              setSelectedEmployee(null);
              setIsCashOutOpen(true);
            }}
          >
            <ArrowUpRight className="h-4 w-4 stroke-[3px]" />
            Cash Out
          </Button>
          <Button 
            variant="outline" 
            className="h-10 gap-2 border-border/50 hover:bg-muted text-foreground font-bold text-xs uppercase tracking-wider px-4 transition-all active:scale-95"
            onClick={() => {
              if (isDailyBookClosed) {
                toast({
                  title: "Action Restricted",
                  description: "Daily book is closed. You can't add new entries now.",
                  variant: "destructive",
                });
                return;
              }
              setIsBankDepositOpen(true);
            }}
          >
            <Building2 className="h-4 w-4 stroke-[3px]" />
            Bank Deposit
          </Button>
        </div>
      </div>

      {/* Cash Out Dialog */}
      <Dialog open={isCashOutOpen} onOpenChange={setIsCashOutOpen}>
        <DialogContent 
          className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl animate-in fade-in zoom-in duration-700"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Record Cash Out</DialogTitle>
          </div>
          
          <div className="p-8 space-y-8 bg-background">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">₹</span>
                <Input 
                  id="amount" 
                  type="text" 
                  placeholder="0.00" 
                  className="h-11 text-lg font-black pl-10 border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</Label>
              <Select onValueChange={(val) => setSelectedCategory(val)}>
                <SelectTrigger id="category" className="h-11 font-bold border-border/50 focus:ring-[#334155] text-sm">
                  <SelectValue placeholder="Select expense category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office" className="font-bold">Office Expense</SelectItem>
                  <SelectItem value="tea" className="font-bold">Tea / Snacks</SelectItem>
                  <SelectItem value="transport" className="font-bold">Transport</SelectItem>
                  <SelectItem value="misc" className="font-bold">Misc Expense</SelectItem>
                  <SelectItem value="advance" className="font-bold">Advance for employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCategory === "advance" && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-500">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Employee Selection</Label>
                <Button 
                  variant="outline"
                  onClick={() => setIsEmployeeSelectOpen(true)}
                  className="w-full h-11 justify-between border-border/50 hover:bg-muted font-bold text-sm px-4"
                >
                  <span className={selectedEmployee ? "text-foreground" : "text-muted-foreground"}>
                    {selectedEmployee || "Select which employee"}
                  </span>
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="remarks" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Remarks</Label>
              <Textarea 
                id="remarks" 
                placeholder="Enter transaction details..." 
                className="min-h-[120px] resize-none border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] font-medium"
              />
            </div>

            <Button 
              className="w-full h-12 bg-[#334155] hover:bg-[#1e293b] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-[0.98] mt-4"
              onClick={() => setIsCashOutOpen(false)}
            >
              Confirm Cash Out Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cash In Dialog */}
      <Dialog open={isCashInOpen} onOpenChange={setIsCashInOpen}>
        <DialogContent 
          className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl animate-in fade-in zoom-in duration-700"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Record Cash In</DialogTitle>
          </div>
          
          <div className="p-8 space-y-8 bg-background">
            <div className="space-y-3">
              <Label htmlFor="in-amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">₹</span>
                <Input 
                  id="in-amount" 
                  type="text" 
                  placeholder="0.00" 
                  className="h-11 text-lg font-black pl-10 border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="in-category" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</Label>
              <Select onValueChange={(val) => {
                setSelectedCategory(val);
                setSelectedCustomer(null);
              }}>
                <SelectTrigger id="in-category" className="h-11 font-bold border-border/50 focus:ring-[#334155] text-sm">
                  <SelectValue placeholder="Select income category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advance" className="font-bold">Customer Advance</SelectItem>
                  <SelectItem value="due" className="font-bold">Old Due Received</SelectItem>
                  <SelectItem value="capital" className="font-bold">Owner Capital</SelectItem>
                  <SelectItem value="other" className="font-bold">Other (last resort)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(selectedCategory === "advance" || selectedCategory === "due") && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-500">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {selectedCategory === "advance" ? "Customer Selection" : "Customer Selection (Old Due)"}
                </Label>
                <Button 
                  variant="outline"
                  onClick={() => setIsCustomerSelectOpen(true)}
                  className="w-full h-11 justify-between border-border/50 hover:bg-muted font-bold text-sm px-4"
                >
                  <div className="flex flex-col items-start">
                    <span className={selectedCustomer ? "text-foreground" : "text-muted-foreground"}>
                      {selectedCustomer ? selectedCustomer.name : "Select Customer"}
                    </span>
                    {selectedCategory === "due" && selectedCustomer && (
                      <span className="text-[10px] text-red-500 font-bold">Pending: ₹{selectedCustomer.balance.toLocaleString()}</span>
                    )}
                  </div>
                  <Search className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="in-remarks" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Remarks</Label>
              <Textarea 
                id="in-remarks" 
                placeholder="Enter transaction details..." 
                className="min-h-[120px] resize-none border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] font-medium"
              />
            </div>

            <Button 
              className="w-full h-12 bg-[#334155] hover:bg-[#1e293b] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-[0.98] mt-4"
              onClick={() => setIsCashInOpen(false)}
            >
              Confirm Cash In Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Deposit Dialog */}
      <Dialog open={isBankDepositOpen} onOpenChange={setIsBankDepositOpen}>
        <DialogContent 
          className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl animate-in fade-in zoom-in duration-700"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Bank Deposit</DialogTitle>
          </div>
          
          <div className="p-8 space-y-6 bg-background">
            <div className="space-y-3">
              <Label htmlFor="bank-amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">₹</span>
                <Input 
                  id="bank-amount" 
                  type="text" 
                  placeholder="0.00" 
                  className="h-11 text-lg font-black pl-10 border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="bank-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Bank Name (Required)</Label>
              <Select>
                <SelectTrigger id="bank-name" className="h-11 font-bold border-border/50 focus:ring-[#334155] text-sm">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdfc" className="font-bold">HDFC Bank</SelectItem>
                  <SelectItem value="icici" className="font-bold">ICICI Bank</SelectItem>
                  <SelectItem value="sbi" className="font-bold">State Bank of India</SelectItem>
                  <SelectItem value="axis" className="font-bold">Axis Bank</SelectItem>
                  <SelectItem value="canara" className="font-bold">Canara Bank</SelectItem>
                  <SelectItem value="pnb" className="font-bold">Punjab National Bank</SelectItem>
                  <SelectItem value="bob" className="font-bold">Bank of Baroda</SelectItem>
                  <SelectItem value="kotak" className="font-bold">Kotak Mahindra Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="ref-no" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Reference No (Optional)</Label>
              <Input 
                id="ref-no" 
                placeholder="Enter transaction ref no." 
                className="h-11 font-bold border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] text-sm"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="bank-remarks" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Remarks</Label>
              <Textarea 
                id="bank-remarks" 
                placeholder="Enter deposit details..." 
                className="min-h-[100px] resize-none border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155] font-medium"
              />
            </div>

            <Button 
              className="w-full h-12 bg-[#334155] hover:bg-[#1e293b] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-[0.98] mt-4"
              onClick={() => setIsBankDepositOpen(false)}
            >
              Cash to Bank
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Selection Sub-Dialog */}
      <Dialog open={isEmployeeSelectOpen} onOpenChange={setIsEmployeeSelectOpen}>
        <DialogContent 
          className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl animate-in fade-in zoom-in duration-500"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Select Employee</DialogTitle>
          </div>
          <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto bg-background">
            {employees.map((emp) => (
              <Button
                key={emp}
                variant="ghost"
                className="w-full justify-start h-12 font-bold hover:bg-[#334155] hover:text-white transition-colors"
                onClick={() => {
                  setSelectedEmployee(emp);
                  setIsEmployeeSelectOpen(false);
                }}
              >
                {emp}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Selection Sub-Dialog */}
      <Dialog open={isCustomerSelectOpen} onOpenChange={setIsCustomerSelectOpen}>
        <DialogContent 
          className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl animate-in fade-in zoom-in duration-500"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Search Customer</DialogTitle>
          </div>
          <div className="p-6 space-y-6 bg-background">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <Input 
                placeholder="Search by name..." 
                className="h-11 pl-10 font-bold border-border/50 focus-visible:ring-1 focus-visible:ring-[#334155]"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <Button
                    key={customer.id}
                    variant="outline"
                    className="w-full justify-between h-14 border-border/50 hover:border-[#334155] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all px-4 group"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsCustomerSelectOpen(false);
                      setCustomerSearch("");
                    }}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-black text-slate-900 dark:text-white group-hover:text-[#334155] dark:group-hover:text-blue-400 transition-colors">
                        {customer.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">ID: {customer.id}</span>
                    </div>
                    {selectedCategory === "due" && (
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase text-muted-foreground block mb-0.5">Pending Balance</span>
                        <span className="text-sm font-black text-red-500">₹{customer.balance.toLocaleString()}</span>
                      </div>
                    )}
                  </Button>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm font-bold text-muted-foreground italic">No customers found matching "{customerSearch}"</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sales Stats Dialog */}
      <Dialog open={isSalesStatsOpen} onOpenChange={setIsSalesStatsOpen}>
        <DialogContent 
          className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-900 outline-none focus:outline-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="p-8 space-y-8 outline-none focus:outline-none">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Sales Analytics</h2>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Revenue Distribution for Today</p>
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              {/* Primary Metric */}
              <div className="col-span-12 md:col-span-7">
                <div className="relative h-full p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group">
                  <div className="relative z-10 space-y-12">
                    <div className="space-y-2">
                      <h3 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">₹2,84,500</h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Growth</p>
                        <p className="text-lg font-black text-green-600 dark:text-green-400">+12.5%</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Orders</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">142</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Average</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">₹2,003</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-4">
                {[
                  { label: "Cash", value: "₹1,42,000", icon: CircleDollarSign, percentage: "50%" },
                  { label: "UPI", value: "₹85,500", icon: Smartphone, percentage: "30%" },
                  { label: "Card", value: "₹32,000", icon: CreditCard, percentage: "11%" },
                  { label: "Credit", value: "₹25,000", icon: UserPlus, percentage: "9%" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600 transition-transform group-hover:scale-110 shadow-sm">
                      <stat.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <span className="text-[10px] font-bold text-slate-400">{stat.percentage}</span>
                      </div>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <History className="h-3 w-3" />
                Last synchronized: 2 mins ago
              </div>
              <p>MM01 Terminal Insights</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCloseDailyBookOpen} onOpenChange={setIsCloseDailyBookOpen}>
        <DialogContent 
          className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="bg-[#f8fafc] dark:bg-[#334155] p-4 border-b border-border/50 dark:border-[#1e293b] flex justify-between items-center">
            <DialogTitle className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
              {closeStep === 1 && "Step 1: Cash Verification"}
              {closeStep === 2 && "Step 2: Final Confirmation"}
              {closeStep === 3 && "Step 3: Summary & Close"}
            </DialogTitle>
          </div>

          <div className="p-8 bg-background min-h-[400px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {closeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Wallet className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Verify Cash in Hand</h3>
                    <p className="text-sm text-muted-foreground font-medium">Please confirm the physical cash matches the system balance</p>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-border/50 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">System Net Cash</p>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">₹1,61,550</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Verification Status</Label>
                    <Select onValueChange={(val) => setIsVerified(val)}>
                      <SelectTrigger className="h-12 font-bold border-border/50 text-sm">
                        <SelectValue placeholder="Is this verified?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes" className="font-bold">Yes, Verified</SelectItem>
                        <SelectItem value="no" className="font-bold">No, discrepancy found</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {closeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <div className="h-16 w-16 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Are you sure?</h3>
                    <p className="text-sm text-muted-foreground font-medium">Closing the daily book will lock all entries for today</p>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full h-14 font-black uppercase tracking-widest text-xs border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setCloseStep(3)}
                    >
                      Yes, proceed to close
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full h-12 font-bold text-muted-foreground"
                      onClick={() => setIsCloseDailyBookOpen(false)}
                    >
                      No, go back
                    </Button>
                  </div>
                </motion.div>
              )}

              {closeStep === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2 mb-4">
                    <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <History className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Daily Book Summary</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Total Cash In", val: "₹1,74,000", color: "text-foreground font-bold" },
                      { label: "Total Cash Out", val: "₹12,450", color: "text-foreground font-bold" },
                      { label: "Net Cash in Hand", val: "₹1,61,550", color: "text-foreground font-black" },
                      { label: "Verification Status", val: "VERIFIED", color: "text-green-600 font-black" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                        <span className={cn("text-sm font-bold", item.color)}>{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase leading-relaxed">
                      All transaction entries for today will be permanently locked after closing.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-border/50 flex gap-3">
              {closeStep === 1 && (
                <Button 
                  disabled={isVerified !== "yes"}
                  className="w-full h-12 bg-[#334155] hover:bg-[#1e293b] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-[0.98]"
                  onClick={() => setCloseStep(2)}
                >
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {closeStep === 3 && (
                <Button 
                  className="w-full h-12 bg-[#334155] hover:bg-[#1e293b] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-[0.98]"
                  onClick={() => {
                    setIsDailyBookClosed(true);
                    setIsCloseDailyBookOpen(false);
                  }}
                >
                  Verify and Close Daily Book
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Total Cash In</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">₹1,74,000</span>
                </div>
              </div>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:scale-110 transition-transform">
                <ArrowDownRight className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-medium">15 entries processed today</p>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Total Cash Out</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">₹12,450</span>
                </div>
              </div>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:scale-110 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-medium">4 expense entries today</p>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-primary/5 to-transparent transition-all hover:shadow-md shadow-sm dark:shadow-none dark:hover:shadow-none group overflow-hidden relative">
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Net Cash in Hand</p>
                <div className="text-3xl font-black tracking-tight text-foreground">₹1,61,550</div>
              </div>
              <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:scale-110 transition-transform">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <p className={cn(
              "text-[10px] mt-4 font-bold uppercase tracking-tight",
              isDailyBookClosed ? "text-green-600" : "text-amber-600 dark:text-amber-500"
            )}>
              {isDailyBookClosed ? "Verified" : "Pending Verification"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/50">
          {["all", "income", "expense", "deposit"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 text-[10px] font-bold uppercase tracking-wider px-4 transition-all",
                activeTab === tab ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input 
              placeholder="Filter by description or category..." 
              className="h-9 w-full md:w-64 pl-9 text-xs border-border/50 focus-visible:ring-1 focus-visible:ring-ring bg-muted/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 border-border/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            onClick={() => setIsSalesStatsOpen(true)}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        <div className="grid grid-cols-12 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <div className="col-span-6">Transaction Details</div>
          <div className="col-span-2 text-right">Time</div>
          <div className="col-span-2 text-right">Status</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTransactions.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8
                }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-12 items-center px-6 py-4">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 bg-muted text-muted-foreground">
                          {t.type === "income" ? <ArrowDownRight className="h-5 w-5 stroke-[2.5px]" /> : 
                           t.type === "expense" ? <ArrowUpRight className="h-5 w-5 stroke-[2.5px]" /> : <Building2 className="h-5 w-5 stroke-[2.5px]" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm text-foreground">{t.category}</p>
                            <Badge variant="secondary" className="text-[9px] h-4 px-1.5 font-mono opacity-60">ID-{t.id}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">{t.description}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t.date}</p>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">{t.status}</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className={cn(
                          "font-black text-base",
                          t.type === "income" ? "text-green-600" : 
                          t.type === "expense" ? "text-red-600" : "text-blue-600"
                        )}>
                          {t.type === "income" ? "+" : t.type === "expense" ? "-" : ""}₹{t.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
