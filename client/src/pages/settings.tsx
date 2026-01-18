import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Building2,
  Users,
  FileText,
  Receipt,
  IndianRupee,
  Package,
  ClipboardList,
  Database,
  Upload,
  Save,
  Plus,
  Lock,
  Unlock,
  RotateCcw,
  Download,
  AlertTriangle,
  Shield,
  Check,
  ChevronsUpDown,
  Pencil,
  Ban
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "1", name: "Admin", email: "admin@store.com", softwareEmail: "admin@erp.store.com", role: "Admin", status: "active", mobile: "+91 9876543210", address: "123 Main Street, Mumbai", city: "Mumbai", pincode: "400001", altNumber: "+91 9876543211", upiId: "admin@upi", cvUrl: "/cv/admin.pdf" },
  { id: "2", name: "Ranveer", email: "ranveer@store.com", softwareEmail: "ranveer@erp.store.com", role: "Manager", status: "active", mobile: "+91 9123456789", address: "456 Park Road, Pune", city: "Pune", pincode: "411001", altNumber: "+91 9123456788", upiId: "ranveer@upi", cvUrl: "/cv/ranveer.pdf" },
  { id: "3", name: "Priya", email: "priya@store.com", softwareEmail: "priya@erp.store.com", role: "Billing", status: "active", mobile: "+91 9988776655", address: "789 Lake View, Thane", city: "Thane", pincode: "400601", altNumber: "", upiId: "priya@upi", cvUrl: "/cv/priya.pdf" },
  { id: "4", name: "Amit", email: "amit@store.com", softwareEmail: "amit@erp.store.com", role: "Inventory", status: "locked", mobile: "+91 9112233445", address: "321 Hill Top, Nashik", city: "Nashik", pincode: "422001", altNumber: "+91 9112233446", upiId: "amit@upi", cvUrl: "/cv/amit.pdf" },
  { id: "5", name: "Sneha", email: "sneha@store.com", softwareEmail: "sneha@erp.store.com", role: "Billing", status: "active", mobile: "+91 9556677889", address: "55 Green Park, Nagpur", city: "Nagpur", pincode: "440001", altNumber: "+91 9556677880", upiId: "sneha@upi", cvUrl: "/cv/sneha.pdf" },
  { id: "6", name: "Vikram", email: "vikram@store.com", softwareEmail: "vikram@erp.store.com", role: "Inventory", status: "active", mobile: "+91 9334455667", address: "78 Lake Road, Aurangabad", city: "Aurangabad", pincode: "431001", altNumber: "", upiId: "vikram@upi", cvUrl: "/cv/vikram.pdf" },
  { id: "7", name: "Kavita", email: "kavita@store.com", softwareEmail: "kavita@erp.store.com", role: "Manager", status: "active", mobile: "+91 9223344556", address: "90 Hill View, Kolhapur", city: "Kolhapur", pincode: "416001", altNumber: "+91 9223344557", upiId: "kavita@upi", cvUrl: "/cv/kavita.pdf" },
];

const permissionModules = ["Billing", "Inventory", "Accounts", "Reports", "Settings"];
const accessLevels = ["No Access", "View Only", "Create/Edit", "Full Access"];

const initialPermissions: Record<string, Record<string, string>> = {
  "Billing": { Admin: "Full Access", Manager: "Full Access", Billing: "Full Access", Inventory: "No Access" },
  "Inventory": { Admin: "Full Access", Manager: "Full Access", Billing: "No Access", Inventory: "Full Access" },
  "Accounts": { Admin: "Full Access", Manager: "Full Access", Billing: "No Access", Inventory: "No Access" },
  "Reports": { Admin: "Full Access", Manager: "Full Access", Billing: "View Only", Inventory: "View Only" },
  "Settings": { Admin: "Full Access", Manager: "No Access", Billing: "No Access", Inventory: "No Access" },
};

const indianStatesAndUTs = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const businessTypes = ["Proprietorship", "Partnership", "LLP", "Pvt Ltd"];

import { useLocation } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [manualBackupDialogOpen, setManualBackupDialogOpen] = useState(false);
  const [manualBackupConfirmDialogOpen, setManualBackupConfirmDialogOpen] = useState(false);
  const [manualBackupType, setManualBackupType] = useState("all");
  const [backupFreqDialogOpen, setBackupFreqDialogOpen] = useState(false);
  const [pendingBackupFreq, setPendingBackupFreq] = useState("daily");
  const [currentBackupFreq, setCurrentBackupFreq] = useState("daily");

  const [activeTab, setActiveTab] = useState("business");
  const [stateOpen, setStateOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  
  // Role change confirmation states
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState<{ userId: string; newRole: string; userName: string } | null>(null);
  const [userRoles, setUserRoles] = useState<Record<string, string>>(() => 
    mockUsers.reduce((acc, user) => ({ ...acc, [user.id]: user.role }), {})
  );
  
  // Edit user dialog states
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    softwareEmail: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    altNumber: "",
    upiId: "",
    cvUrl: ""
  });
  
  // Add user dialog states
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    softwareEmail: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    altNumber: "",
    upiId: "",
    role: "Billing"
  });
  
  // Update confirmation dialog
  const [updateConfirmDialogOpen, setUpdateConfirmDialogOpen] = useState(false);
  const [changedFields, setChangedFields] = useState<{ field: string; before: string; after: string }[]>([]);
  
  const handleRoleChange = (userId: string, newRole: string, userName: string) => {
    setPendingRoleChange({ userId, newRole, userName });
    setRoleChangeDialogOpen(true);
  };
  
  const confirmRoleChange = () => {
    if (pendingRoleChange) {
      setUserRoles(prev => ({ ...prev, [pendingRoleChange.userId]: pendingRoleChange.newRole }));
    }
    setRoleChangeDialogOpen(false);
    setPendingRoleChange(null);
  };
  
  const cancelRoleChange = () => {
    setRoleChangeDialogOpen(false);
    setPendingRoleChange(null);
  };
  
  const openEditUserDialog = (user: typeof mockUsers[0]) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      softwareEmail: user.softwareEmail || "",
      mobile: user.mobile || "",
      address: user.address || "",
      city: user.city || "",
      pincode: user.pincode || "",
      altNumber: user.altNumber || "",
      upiId: user.upiId || "",
      cvUrl: user.cvUrl || ""
    });
    setEditUserDialogOpen(true);
  };
  
  const handleUpdateUser = () => {
    if (!editingUser) return;
    const changes: { field: string; before: string; after: string }[] = [];
    if (editForm.name !== editingUser.name) changes.push({ field: "User Name", before: editingUser.name, after: editForm.name });
    if (editForm.email !== editingUser.email) changes.push({ field: "Personal Email", before: editingUser.email, after: editForm.email });
    if (editForm.softwareEmail !== (editingUser.softwareEmail || "")) changes.push({ field: "Software Access Email", before: editingUser.softwareEmail || "", after: editForm.softwareEmail });
    if (editForm.mobile !== (editingUser.mobile || "")) changes.push({ field: "Mobile Number", before: editingUser.mobile || "", after: editForm.mobile });
    if (editForm.address !== (editingUser.address || "")) changes.push({ field: "Home Address", before: editingUser.address || "", after: editForm.address });
    if (editForm.city !== (editingUser.city || "")) changes.push({ field: "City", before: editingUser.city || "", after: editForm.city });
    if (editForm.pincode !== (editingUser.pincode || "")) changes.push({ field: "Pincode", before: editingUser.pincode || "", after: editForm.pincode });
    if (editForm.altNumber !== (editingUser.altNumber || "")) changes.push({ field: "Alternative Number", before: editingUser.altNumber || "", after: editForm.altNumber });
    if (editForm.upiId !== (editingUser.upiId || "")) changes.push({ field: "UPI ID", before: editingUser.upiId || "", after: editForm.upiId });
    setChangedFields(changes);
    setUpdateConfirmDialogOpen(true);
  };
  
  const confirmUpdateUser = () => {
    setUpdateConfirmDialogOpen(false);
    setEditUserDialogOpen(false);
    setEditingUser(null);
  };
  
  // User status toggle
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>(() =>
    mockUsers.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
  );
  
  const [lockConfirmDialogOpen, setLockConfirmDialogOpen] = useState(false);
  const [pendingLockChange, setPendingLockChange] = useState<{ userId: string; userName: string; currentStatus: string } | null>(null);
  
  const handleLockToggle = (userId: string, userName: string, currentStatus: string) => {
    setPendingLockChange({ userId, userName, currentStatus });
    setLockConfirmDialogOpen(true);
  };
  
  const confirmLockToggle = () => {
    if (pendingLockChange) {
      setUserStatuses(prev => ({
        ...prev,
        [pendingLockChange.userId]: pendingLockChange.currentStatus === "active" ? "locked" : "active"
      }));
    }
    setLockConfirmDialogOpen(false);
    setPendingLockChange(null);
  };
  
  // Permission levels state
  const [permissionLevels, setPermissionLevels] = useState<Record<string, Record<string, string>>>(initialPermissions);
  const [permissionChangeDialogOpen, setPermissionChangeDialogOpen] = useState(false);
  const [pendingPermissionChange, setPendingPermissionChange] = useState<{ module: string; role: string; newLevel: string; oldLevel: string } | null>(null);
  
  // Invoice prefix change confirmation dialog
  const [invoicePrefixDialogOpen, setInvoicePrefixDialogOpen] = useState(false);
  
  // GST settings states
  const [gstSettingsDialogOpen, setGstSettingsDialogOpen] = useState(false);
  const [cgstSgstEnabled, setCgstSgstEnabled] = useState(true);
  const [igstEnabled, setIgstEnabled] = useState(false);
  
  // Mass GST Update states
  const [massGstDialogOpen, setMassGstDialogOpen] = useState(false);
  const [massGstConfirmDialogOpen, setMassGstConfirmDialogOpen] = useState(false);
  const [existingGstRate, setExistingGstRate] = useState<string>("");
  const [newGstRate, setNewGstRate] = useState<string>("");
  
  const gstSlabs = [
    { value: "0", label: "0% GST", itemCount: 45 },
    { value: "5", label: "5% GST", itemCount: 128 },
    { value: "12", label: "12% GST", itemCount: 312 },
    { value: "18", label: "18% GST", itemCount: 567 },
    { value: "28", label: "28% GST", itemCount: 89 },
  ];
  
  const handleMassGstUpdate = () => {
    if (existingGstRate && newGstRate && existingGstRate !== newGstRate) {
      setMassGstDialogOpen(false);
      setMassGstConfirmDialogOpen(true);
    }
  };
  
  const confirmMassGstUpdate = () => {
    setMassGstConfirmDialogOpen(false);
    setExistingGstRate("");
    setNewGstRate("");
  };
  
  // Financial settings states
  const [allowBackdatedEntries, setAllowBackdatedEntries] = useState(true);
  const [maxBackdateDays, setMaxBackdateDays] = useState("7");
  
  // Period Locking states
  const [periodLockDialogOpen, setPeriodLockDialogOpen] = useState(false);
  const [periodLockConfirmDialogOpen, setPeriodLockConfirmDialogOpen] = useState(false);
  const [selectedLockPeriod, setSelectedLockPeriod] = useState("");
  const [periodLockNarration, setPeriodLockNarration] = useState("");
  const [currentLockedPeriod, setCurrentLockedPeriod] = useState("March 2025");
  
  // Financial Settings save confirmation
  const [financialSettingsDialogOpen, setFinancialSettingsDialogOpen] = useState(false);
  
  // Inventory settings states
  const [allowStockAdjustment, setAllowStockAdjustment] = useState(true);
  const [maxAdjustmentPercent, setMaxAdjustmentPercent] = useState("5");
  const [stockValuationMethod, setStockValuationMethod] = useState("weighted-avg");
  const [inventorySettingsDialogOpen, setInventorySettingsDialogOpen] = useState(false);
  
  // Audit logging states
  const [auditLogsPaused, setAuditLogsPaused] = useState(false);
  const [pauseLoggingDialogOpen, setPauseLoggingDialogOpen] = useState(false);
  const [pauseLoggingConfirmDialogOpen, setPauseLoggingConfirmDialogOpen] = useState(false);
  const [saveAuditDialogOpen, setSaveAuditDialogOpen] = useState(false);
  const [retentionConfirmDialogOpen, setRetentionConfirmDialogOpen] = useState(false);
  const [exportDataDialogOpen, setExportDataDialogOpen] = useState(false);
  const [exportAllAdminDialogOpen, setExportAllAdminDialogOpen] = useState(false);
  const [exportAllAdminForm, setExportAllAdminForm] = useState({
    adminEmail: "",
    adminPassword: "",
    narration: ""
  });
  const [restoreStep, setRestoreStep] = useState(0);
  const initialRestoreForm = {
    superAdminEmail: "",
    superAdminPassword: "",
    superAdminReason: "",
    adminEmail: "",
    adminPassword: "",
    adminReason: "",
    otp: ["", "", "", "", "", ""],
    dataType: "inventory",
    dateRange: "whole",
    startDate: "",
    endDate: ""
  };
  const [restoreDataForm, setRestoreDataForm] = useState(initialRestoreForm);

  const resetRestoreData = () => {
    setRestoreDataForm(initialRestoreForm);
    setRestoreStep(0);
  };
  const [exportType, setExportType] = useState("");
  const [exportForm, setExportForm] = useState({
    dateRange: "all",
    startDate: "",
    endDate: "",
    format: "csv",
    includeInactive: false
  });
  const [pauseLoggingForm, setPauseLoggingForm] = useState({
    adminEmail: "",
    adminPassword: "",
    narration: ""
  });
  const [logLevel, setLogLevel] = useState("all");
  const [exportFormat, setExportFormat] = useState("csv");
  const [retentionPeriod, setRetentionPeriod] = useState("365");
  const [retentionWarningOpen, setRetentionWarningOpen] = useState(false);
  const [pendingRetention, setPendingRetention] = useState("");
  const [pauseTimeRemaining, setPauseTimeRemaining] = useState(3600);

  const getLoggedEvents = (level: string) => {
    const events = [
      { name: "Login / Logout", critical: false, financial: false, user: true },
      { name: "Invoice create / edit / delete", critical: false, financial: true, user: false },
      { name: "Voucher create / cancel", critical: false, financial: true, user: false },
      { name: "Stock adjustment", critical: true, financial: true, user: false },
      { name: "Price change", critical: true, financial: false, user: false },
      { name: "Settings change", critical: true, financial: false, user: false },
      { name: "Role change", critical: true, financial: false, user: true },
      { name: "Data export / backup", critical: true, financial: false, user: false },
    ];

    return events.map(event => {
      let isLogged = false;
      if (level === "all") isLogged = true;
      else if (level === "critical" && event.critical) isLogged = true;
      else if (level === "financial" && (event.financial || event.critical)) isLogged = true;
      else if (level === "user" && (event.user || event.critical)) isLogged = true;
      return { ...event, isLogged };
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect for pause countdown
  useEffect(() => {
    if (auditLogsPaused && pauseTimeRemaining > 0) {
      const interval = setInterval(() => {
        setPauseTimeRemaining(prev => {
          if (prev <= 1) {
            setAuditLogsPaused(false);
            return 3600;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [auditLogsPaused, pauseTimeRemaining]);
  
  const lockPeriods = [
    { value: "apr-2025", label: "April 2025" },
    { value: "may-2025", label: "May 2025" },
    { value: "jun-2025", label: "June 2025" },
    { value: "jul-2025", label: "July 2025" },
    { value: "aug-2025", label: "August 2025" },
    { value: "sep-2025", label: "September 2025" },
    { value: "oct-2025", label: "October 2025" },
    { value: "nov-2025", label: "November 2025" },
    { value: "dec-2025", label: "December 2025" },
  ];
  
  const handlePeriodLock = () => {
    if (selectedLockPeriod) {
      setPeriodLockDialogOpen(false);
      setPeriodLockConfirmDialogOpen(true);
    }
  };
  
  const confirmPeriodLock = () => {
    const period = lockPeriods.find(p => p.value === selectedLockPeriod);
    if (period) {
      setCurrentLockedPeriod(period.label);
    }
    setPeriodLockConfirmDialogOpen(false);
    setSelectedLockPeriod("");
    setPeriodLockNarration("");
  };
  
  const handleCgstSgstToggle = (checked: boolean) => {
    setCgstSgstEnabled(checked);
    if (checked) {
      setIgstEnabled(false);
    }
  };
  
  const handleIgstToggle = (checked: boolean) => {
    setIgstEnabled(checked);
    if (checked) {
      setCgstSgstEnabled(false);
    }
  };
  
  const [saveBusinessProfileDialogOpen, setSaveBusinessProfileDialogOpen] = useState(false);

  const handlePermissionChange = (module: string, role: string, newLevel: string) => {
    const oldLevel = permissionLevels[module][role];
    if (oldLevel === newLevel) return;
    setPendingPermissionChange({ module, role, newLevel, oldLevel });
    setPermissionChangeDialogOpen(true);
  };
  
  const confirmPermissionChange = () => {
    if (pendingPermissionChange) {
      setPermissionLevels(prev => ({
        ...prev,
        [pendingPermissionChange.module]: {
          ...prev[pendingPermissionChange.module],
          [pendingPermissionChange.role]: pendingPermissionChange.newLevel
        }
      }));
    }
    setPermissionChangeDialogOpen(false);
    setPendingPermissionChange(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-page-title">
          Settings & Configuration
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your business settings, users, and system preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg" data-testid="tabs-settings">
          <TabsTrigger value="business" className="text-xs px-3 py-2" data-testid="tab-business">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            Business
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs px-3 py-2" data-testid="tab-users">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="invoice" className="text-xs px-3 py-2" data-testid="tab-invoice">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Invoice
          </TabsTrigger>
          <TabsTrigger value="gst" className="text-xs px-3 py-2" data-testid="tab-gst">
            <Receipt className="w-3.5 h-3.5 mr-1.5" />
            GST & Tax
          </TabsTrigger>
          <TabsTrigger value="financial" className="text-xs px-3 py-2" data-testid="tab-financial">
            <IndianRupee className="w-3.5 h-3.5 mr-1.5" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs px-3 py-2" data-testid="tab-inventory">
            <Package className="w-3.5 h-3.5 mr-1.5" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="audit" className="text-xs px-3 py-2" data-testid="tab-audit">
            <ClipboardList className="w-3.5 h-3.5 mr-1.5" />
            Audit & Logs
          </TabsTrigger>
          <TabsTrigger value="backup" className="text-xs px-3 py-2" data-testid="tab-backup">
            <Database className="w-3.5 h-3.5 mr-1.5" />
            Data & Backup
          </TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Showroom / Business Profile
              </CardTitle>
              <CardDescription>Configure your business details for invoices and documents</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="showroom-name">Showroom Name</Label>
                  <Input id="showroom-name" placeholder="Enter showroom name" defaultValue="Modern Kitchen Store" data-testid="input-showroom-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input id="gstin" placeholder="22AAAAA0000A1Z5" defaultValue="27AABCU9603R1ZM" data-testid="input-gstin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select defaultValue="Proprietorship">
                    <SelectTrigger id="business-type" data-testid="select-business-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter street address" defaultValue="123 Main Road, Near City Center" data-testid="input-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" defaultValue="Mumbai" data-testid="input-city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="400001" defaultValue="400001" data-testid="input-pincode" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Popover open={stateOpen} onOpenChange={setStateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={stateOpen}
                        className="w-full justify-between font-normal"
                        data-testid="select-state"
                      >
                        {selectedState || "Select state..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search state..." data-testid="input-state-search" />
                        <CommandList className="max-h-[200px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {indianStatesAndUTs.map((state) => (
                              <CommandItem
                                key={state}
                                value={state}
                                onSelect={() => {
                                  setSelectedState(state);
                                  setStateOpen(false);
                                }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", selectedState === state ? "opacity-100" : "opacity-0")} />
                                {state}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" placeholder="Enter district" defaultValue="Mumbai Suburban" data-testid="input-district" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Contact</Label>
                  <Input id="phone" placeholder="+91 9876543210" defaultValue="+91 9876543210" data-testid="input-phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-contact">Alternative Contact</Label>
                  <Input id="alt-contact" placeholder="+91 9876543210" defaultValue="+91 9876543211" data-testid="input-alt-contact" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="store@example.com" defaultValue="contact@modernkitchen.com" data-testid="input-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input id="emergency" placeholder="+91 9876543210" defaultValue="+91 9988776655" data-testid="input-emergency" />
                </div>
                <div className="space-y-2 lg:col-span-4">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm" data-testid="button-upload-logo">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">Max size: 1MB | Formats: PNG, JPG</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 lg:col-span-4">
                  <Label htmlFor="footer">Invoice Footer Text</Label>
                  <Textarea id="footer" placeholder="Thank you for your business!" defaultValue="Thank you for shopping with us! Terms & Conditions Apply." data-testid="input-footer" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">Last updated by Admin on 12 Jan 2026</p>
                <Button 
                  onClick={() => setSaveBusinessProfileDialogOpen(true)}
                  data-testid="button-save-business"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Business Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Save Business Profile Confirmation Dialog */}
        <Dialog open={saveBusinessProfileDialogOpen} onOpenChange={setSaveBusinessProfileDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Confirm Profile Changes
              </DialogTitle>
              <DialogDescription className="py-2">
                Are you sure you want to update the business profile?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <p className="text-sm text-muted-foreground">
                Changing these details will have the following effects:
              </p>
              <ul className="space-y-2">
                <li className="text-xs flex items-start gap-2">
                  <span className="text-muted-foreground font-bold">•</span>
                  <span>All future invoices will reflect these new business details immediately.</span>
                </li>
                <li className="text-xs flex items-start gap-2">
                  <span className="text-muted-foreground font-bold">•</span>
                  <span>GST calculations and billing address formats may be affected by state or type changes.</span>
                </li>
                <li className="text-xs flex items-start gap-2">
                  <span className="text-muted-foreground font-bold">•</span>
                  <span>Price list displays and report headers will be updated to match the new profile.</span>
                </li>
              </ul>
              <div className="rounded-lg bg-muted/50 p-3 border border-border">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong>Warning:</strong> Ensure all details are correct. Incorrect profile data can lead to compliance issues with GST and financial reporting.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSaveBusinessProfileDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setSaveBusinessProfileDialogOpen(false);
                  // Mock save action
                }}
              >
                Yes, Update Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {/* Users & Roles Tab */}
        <TabsContent value="users" className="mt-6 space-y-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Users
                  </CardTitle>
                  <CardDescription>Manage user accounts and roles</CardDescription>
                </div>
                <Button size="sm" onClick={() => setAddUserDialogOpen(true)} data-testid="button-add-user">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[280px] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <table className="w-full">
                  <thead className="bg-muted/50 dark:bg-slate-800/50 sticky top-0 z-10">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 bg-muted/50 dark:bg-slate-800/50">Name</th>
                      <th className="px-4 py-3 bg-muted/50 dark:bg-slate-800/50">Email</th>
                      <th className="px-4 py-3 bg-muted/50 dark:bg-slate-800/50">Role</th>
                      <th className="px-4 py-3 bg-muted/50 dark:bg-slate-800/50">Status</th>
                      <th className="px-4 py-3 text-right bg-muted/50 dark:bg-slate-800/50">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 dark:hover:bg-slate-800/30" data-testid={`row-user-${user.id}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <Select 
                          value={userRoles[user.id]} 
                          onValueChange={(value) => handleRoleChange(user.id, value, user.name)}
                        >
                          <SelectTrigger className="w-28 h-8 text-xs" data-testid={`select-role-${user.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Billing">Billing</SelectItem>
                            <SelectItem value="Inventory">Inventory</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={userStatuses[user.id] === "active" ? "default" : "secondary"} className="text-xs">
                          {userStatuses[user.id] === "active" ? "Active" : "Locked"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            title="Edit User"
                            onClick={() => openEditUserDialog(user)}
                            data-testid={`button-edit-user-${user.id}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            title={userStatuses[user.id] === "active" ? "Lock Account" : "Unlock Account"}
                            onClick={() => handleLockToggle(user.id, user.name, userStatuses[user.id])}
                            data-testid={`button-lock-${user.id}`}
                          >
                            {userStatuses[user.id] === "active" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50 py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Roles & Permissions
              </CardTitle>
              <CardDescription className="text-xs">Configure module access for each role</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50 dark:bg-slate-800/50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-2">Module</th>
                    <th className="px-4 py-2 text-center">Admin</th>
                    <th className="px-4 py-2 text-center">Manager</th>
                    <th className="px-4 py-2 text-center">Billing</th>
                    <th className="px-4 py-2 text-center">Inventory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {permissionModules.map((module) => (
                    <tr key={module} className="hover:bg-muted/30 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-medium text-foreground">{module}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs text-muted-foreground cursor-not-allowed" title="Admin permissions cannot be changed">Full Access</span>
                      </td>
                      {["Manager", "Billing", "Inventory"].map((role) => (
                        <td key={role} className="px-4 py-3 text-center">
                          <Select 
                            value={permissionLevels[module][role]}
                            onValueChange={(value) => handlePermissionChange(module, role, value)}
                          >
                            <SelectTrigger className="w-28 h-8 text-xs mx-auto" data-testid={`select-perm-${module}-${role}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {accessLevels.map((level) => (
                                <SelectItem key={level} value={level} className="text-xs">{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          
          {/* Add User Dialog */}
          <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Add New User
                </DialogTitle>
                <DialogDescription>
                  Create a new user account
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-name">User Name</Label>
                    <Input 
                      id="add-name" 
                      value={addUserForm.name}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter user name"
                      data-testid="input-add-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-role">Role</Label>
                    <Select value={addUserForm.role} onValueChange={(value) => setAddUserForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger id="add-role" data-testid="select-add-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                        <SelectItem value="Inventory">Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-software-email">Software Access Email</Label>
                    <Input 
                      id="add-software-email" 
                      type="email"
                      value={addUserForm.softwareEmail}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, softwareEmail: e.target.value }))}
                      placeholder="user@erp.store.com"
                      data-testid="input-add-software-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-email">Personal Email</Label>
                    <Input 
                      id="add-email" 
                      type="email"
                      value={addUserForm.email}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="user@email.com"
                      data-testid="input-add-email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-mobile">Mobile Number</Label>
                    <Input 
                      id="add-mobile" 
                      value={addUserForm.mobile}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="+91 9876543210"
                      data-testid="input-add-mobile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-alt-number">Alternative Number</Label>
                    <Input 
                      id="add-alt-number" 
                      value={addUserForm.altNumber}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, altNumber: e.target.value }))}
                      placeholder="+91 9876543211"
                      data-testid="input-add-alt-number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-upi">UPI ID</Label>
                    <Input 
                      id="add-upi" 
                      value={addUserForm.upiId}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, upiId: e.target.value }))}
                      placeholder="user@upi"
                      data-testid="input-add-upi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-pincode">Pincode</Label>
                    <Input 
                      id="add-pincode" 
                      value={addUserForm.pincode}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="400001"
                      data-testid="input-add-pincode"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-address">Home Address</Label>
                  <Input 
                    id="add-address" 
                    value={addUserForm.address}
                    onChange={(e) => setAddUserForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter home address"
                    data-testid="input-add-address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-city">City</Label>
                    <Input 
                      id="add-city" 
                      value={addUserForm.city}
                      onChange={(e) => setAddUserForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                      data-testid="input-add-city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload CV</Label>
                    <Button variant="outline" className="w-full h-9 text-sm font-normal text-muted-foreground justify-start" data-testid="button-add-upload-cv">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose file...
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setAddUserDialogOpen(false)} data-testid="button-cancel-add-user">
                  Cancel
                </Button>
                <Button onClick={() => setAddUserDialogOpen(false)} data-testid="button-save-add-user">
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Permission Change Confirmation Dialog */}
          <Dialog open={permissionChangeDialogOpen} onOpenChange={setPermissionChangeDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Permission Change
                </DialogTitle>
                <DialogDescription className="pt-2">
                  Are you sure you want to change the permission for <span className="font-semibold text-foreground">{pendingPermissionChange?.role}</span> role on <span className="font-semibold text-foreground">{pendingPermissionChange?.module}</span> module?
                  <div className="mt-4 bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="line-through text-muted-foreground">{pendingPermissionChange?.oldLevel}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-foreground">{pendingPermissionChange?.newLevel}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">This will affect all users with the {pendingPermissionChange?.role} role.</p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setPermissionChangeDialogOpen(false)} data-testid="button-cancel-permission">
                  Cancel
                </Button>
                <Button onClick={confirmPermissionChange} data-testid="button-confirm-permission">
                  Yes, Go Ahead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Role Change Confirmation Dialog */}
          <Dialog open={roleChangeDialogOpen} onOpenChange={setRoleChangeDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Role Change
                </DialogTitle>
                <DialogDescription className="pt-2">
                  Are you sure you want to change the role for <span className="font-semibold text-foreground">{pendingRoleChange?.userName}</span> to <span className="font-semibold text-foreground">{pendingRoleChange?.newRole}</span>?
                  <br /><br />
                  This will affect the permissions for this user account. They will have access to different modules based on the new role.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={cancelRoleChange} data-testid="button-cancel-role-change">
                  Cancel
                </Button>
                <Button onClick={confirmRoleChange} data-testid="button-confirm-role-change">
                  Yes, Change Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Edit User Dialog */}
          <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-primary" />
                  Edit User Details
                </DialogTitle>
                <DialogDescription>
                  Update information for {editingUser?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">User Name</Label>
                    <Input 
                      id="edit-name" 
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      data-testid="input-edit-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-software-email">Software Access Email</Label>
                    <Input 
                      id="edit-software-email" 
                      type="email"
                      value={editForm.softwareEmail}
                      onChange={(e) => setEditForm(prev => ({ ...prev, softwareEmail: e.target.value }))}
                      placeholder="user@erp.store.com"
                      data-testid="input-edit-software-email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Personal Email</Label>
                    <Input 
                      id="edit-email" 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-edit-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-mobile">Mobile Number</Label>
                    <Input 
                      id="edit-mobile" 
                      value={editForm.mobile}
                      onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="+91 9876543210"
                      data-testid="input-edit-mobile"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-alt-number">Alternative Number</Label>
                    <Input 
                      id="edit-alt-number" 
                      value={editForm.altNumber}
                      onChange={(e) => setEditForm(prev => ({ ...prev, altNumber: e.target.value }))}
                      placeholder="+91 9876543211"
                      data-testid="input-edit-alt-number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-upi">UPI ID</Label>
                    <Input 
                      id="edit-upi" 
                      value={editForm.upiId}
                      onChange={(e) => setEditForm(prev => ({ ...prev, upiId: e.target.value }))}
                      placeholder="user@upi"
                      data-testid="input-edit-upi"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Home Address</Label>
                  <Input 
                    id="edit-address" 
                    value={editForm.address}
                    onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter home address"
                    data-testid="input-edit-address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-city">City</Label>
                    <Input 
                      id="edit-city" 
                      value={editForm.city}
                      onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                      data-testid="input-edit-city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-pincode">Pincode</Label>
                    <Input 
                      id="edit-pincode" 
                      value={editForm.pincode}
                      onChange={(e) => setEditForm(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="400001"
                      data-testid="input-edit-pincode"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>CV Document</Label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" data-testid="button-download-cv">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                    <span className="text-sm text-muted-foreground">cv_{editingUser?.name?.toLowerCase()}.pdf</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setEditUserDialogOpen(false)} data-testid="button-cancel-edit-user">
                  Cancel
                </Button>
                <Button onClick={handleUpdateUser} data-testid="button-update-user">
                  Update User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Lock/Unlock Confirmation Dialog */}
          <Dialog open={lockConfirmDialogOpen} onOpenChange={setLockConfirmDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {pendingLockChange?.currentStatus === "active" ? (
                    <Lock className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Unlock className="w-5 h-5 text-amber-500" />
                  )}
                  {pendingLockChange?.currentStatus === "active" ? "Lock User Account" : "Unlock User Account"}
                </DialogTitle>
                <DialogDescription className="pt-2">
                  {pendingLockChange?.currentStatus === "active" ? (
                    <>
                      Are you sure you want to lock the account for <span className="font-semibold text-foreground">{pendingLockChange?.userName}</span>?
                      <br /><br />
                      This account will no longer be able to access this software and will be locked until unlocked by an administrator.
                    </>
                  ) : (
                    <>
                      Are you sure you want to unlock the account for <span className="font-semibold text-foreground">{pendingLockChange?.userName}</span>?
                      <br /><br />
                      This account will regain access to this software based on their assigned role permissions.
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setLockConfirmDialogOpen(false)} data-testid="button-cancel-lock">
                  Cancel
                </Button>
                <Button onClick={confirmLockToggle} data-testid="button-confirm-lock">
                  {pendingLockChange?.currentStatus === "active" ? "Yes, Lock Account" : "Yes, Unlock Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Update Confirmation Dialog */}
          <Dialog open={updateConfirmDialogOpen} onOpenChange={setUpdateConfirmDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Update
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div>
                    <p>Are you sure you want to update the following fields?</p>
                    {changedFields.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {changedFields.map((change) => (
                          <div key={change.field} className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">{change.field}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="line-through text-muted-foreground">{change.before || "(empty)"}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-medium text-foreground">{change.after || "(empty)"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-muted-foreground">No changes detected.</p>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setUpdateConfirmDialogOpen(false)} data-testid="button-cancel-update">
                  Cancel
                </Button>
                <Button onClick={confirmUpdateUser} disabled={changedFields.length === 0} data-testid="button-confirm-update">
                  Yes, Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Invoice & Numbering Tab */}
        <TabsContent value="invoice" className="mt-6 space-y-4">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Invoice & Numbering
              </CardTitle>
              <CardDescription>Configure invoice numbering and voucher series</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                  <Input id="invoice-prefix" placeholder="INV/MM01/2026" defaultValue="INV/MM01/2026" data-testid="input-invoice-prefix" />
                  <p className="text-xs text-muted-foreground">Example: INV/MM01/2026-0001</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fy-reset">Financial Year Reset Logic</Label>
                  <Select defaultValue="april">
                    <SelectTrigger id="fy-reset" data-testid="select-fy-reset">
                      <SelectValue placeholder="Select reset month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april">April (Indian FY)</SelectItem>
                      <SelectItem value="january">January (Calendar Year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-4">Voucher Numbering Series</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pv-prefix" className="text-sm">Payment Voucher</Label>
                    <Input id="pv-prefix" defaultValue="PV-" className="h-9" data-testid="input-pv-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rv-prefix" className="text-sm">Receipt Voucher</Label>
                    <Input id="rv-prefix" defaultValue="RV-" className="h-9" data-testid="input-rv-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cn-prefix" className="text-sm">Credit Note</Label>
                    <Input id="cn-prefix" defaultValue="CN-" className="h-9" data-testid="input-cn-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dn-prefix" className="text-sm">Debit Note</Label>
                    <Input id="dn-prefix" defaultValue="DN-" className="h-9" data-testid="input-dn-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jv-prefix" className="text-sm">Journal Voucher</Label>
                    <Input id="jv-prefix" defaultValue="JV-" className="h-9" data-testid="input-jv-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv-prefix" className="text-sm">Contra Voucher</Label>
                    <Input id="cv-prefix" defaultValue="CV-" className="h-9" data-testid="input-cv-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sv-prefix" className="text-sm">Sales Voucher</Label>
                    <Input id="sv-prefix" defaultValue="SV-" className="h-9" data-testid="input-sv-prefix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="puv-prefix" className="text-sm">Purchase Voucher</Label>
                    <Input id="puv-prefix" defaultValue="PUV-" className="h-9" data-testid="input-puv-prefix" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button onClick={() => setInvoicePrefixDialogOpen(true)} data-testid="button-save-invoice">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Caution Notes */}
          <div className="px-2 space-y-2">
            <p className="text-xs text-muted-foreground">• Changing prefixes will only affect newly generated invoices and vouchers. Existing documents will retain their original numbering.</p>
            <p className="text-xs text-muted-foreground">• Ensure the new prefix format is unique and distinguishable from previous series to avoid confusion during audits.</p>
            <p className="text-xs text-muted-foreground">• For GST compliance, maintain consistent invoice numbering within a financial year. Avoid changing prefixes mid-year unless absolutely necessary.</p>
            <p className="text-xs text-muted-foreground">• Keep a record of all prefix changes for your accounting and compliance documentation.</p>
          </div>
          
          {/* Invoice Prefix Change Confirmation Dialog */}
          <Dialog open={invoicePrefixDialogOpen} onOpenChange={setInvoicePrefixDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Prefix Changes
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p>You are about to update the invoice and voucher numbering prefixes.</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• All future invoices will use the new prefix</p>
                      <p className="text-sm text-muted-foreground">• All future vouchers (Payment, Receipt, Credit Note) will use new prefixes</p>
                      <p className="text-sm text-muted-foreground">• This action cannot be undone for already generated documents</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Are you sure you want to proceed with these changes?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setInvoicePrefixDialogOpen(false)} data-testid="button-cancel-invoice-save">
                  Cancel
                </Button>
                <Button onClick={() => setInvoicePrefixDialogOpen(false)} data-testid="button-confirm-invoice-save">
                  Yes, Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* GST & Tax Settings Tab */}
        <TabsContent value="gst" className="mt-6 space-y-4">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                GST & Tax Settings
              </CardTitle>
              <CardDescription>Configure tax behavior and GST settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gst-behavior">Default GST Behavior</Label>
                  <Select defaultValue="included">
                    <SelectTrigger id="gst-behavior" data-testid="select-gst-behavior">
                      <SelectValue placeholder="Select behavior" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="included">GST Included in Price</SelectItem>
                      <SelectItem value="extra">GST Extra on Price</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">This setting is used as default for new bills. Item-level and bill-level GST settings will override this.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-rate">Default GST Rate (Fallback)</Label>
                  <Select defaultValue="18">
                    <SelectTrigger id="default-rate" data-testid="select-default-rate">
                      <SelectValue placeholder="Select rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Used only if item-level GST rate is not defined.</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gst-rounding">GST Rounding Method</Label>
                  <Select defaultValue="per-line">
                    <SelectTrigger id="gst-rounding" data-testid="select-gst-rounding">
                      <SelectValue placeholder="Select rounding method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="per-line">Round Per Line Item</SelectItem>
                      <SelectItem value="on-total">Round on Total</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Controls how GST amounts are rounded. Per-line rounds each item separately, On-total rounds the final GST sum. This can cause ₹1-₹2 audit differences.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mass-gst-update">Mass GST Update</Label>
                  <div 
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer"
                    onClick={() => setMassGstDialogOpen(true)}
                    data-testid="button-mass-gst-update"
                  >
                    <span className="text-muted-foreground">Update GST Rates in Bulk</span>
                    <RotateCcw className="h-4 w-4 opacity-50" />
                  </div>
                  <p className="text-xs text-muted-foreground">Change GST rate for multiple items at once. Move all items from one GST slab to another.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>CGST/SGST Split (Intra-State)</Label>
                    <p className="text-xs text-muted-foreground">Automatically split GST into CGST & SGST for intra-state sales</p>
                  </div>
                  <Switch checked={cgstSgstEnabled} onCheckedChange={handleCgstSgstToggle} data-testid="switch-cgst-sgst" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable IGST (Inter-State)</Label>
                    <p className="text-xs text-muted-foreground">Apply IGST for inter-state transactions</p>
                  </div>
                  <Switch checked={igstEnabled} onCheckedChange={handleIgstToggle} data-testid="switch-igst" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>HSN Code Mandatory</Label>
                    <p className="text-xs text-muted-foreground">Require HSN code for all items</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-hsn" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button onClick={() => setGstSettingsDialogOpen(true)} data-testid="button-save-gst">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Caution Notes */}
          <div className="px-2 space-y-2">
            <p className="text-xs text-muted-foreground">• When HSN Code Mandatory is enabled, items without HSN cannot be billed in GST invoices.</p>
            <p className="text-xs text-muted-foreground">• CGST/SGST Split and IGST cannot be enabled at the same time. The system will auto-disable one when the other is turned on.</p>
            <p className="text-xs text-muted-foreground">• GST rounding method affects how tax amounts are calculated. Changing this mid-year may cause minor discrepancies in reconciliation.</p>
            <p className="text-xs text-muted-foreground">• Mass GST Update will change the GST slab for all selected items permanently. Existing invoices will not be affected, but all future billing will use the new rate.</p>
          </div>
          
          {/* GST Settings Confirmation Dialog */}
          <Dialog open={gstSettingsDialogOpen} onOpenChange={setGstSettingsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm GST Settings
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p>You are about to update the GST and tax settings for your business.</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• These changes will apply to all new invoices and bills</p>
                      <p className="text-sm text-muted-foreground">• Existing invoices will not be affected</p>
                      <p className="text-sm text-muted-foreground">• Ensure your GST settings comply with current tax regulations</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Are you sure you want to proceed with these changes?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setGstSettingsDialogOpen(false)} data-testid="button-cancel-gst-save">
                  Cancel
                </Button>
                <Button onClick={() => setGstSettingsDialogOpen(false)} data-testid="button-confirm-gst-save">
                  Yes, Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Mass GST Update Dialog */}
          <Dialog open={massGstDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setMassGstDialogOpen(false);
              setExistingGstRate("");
              setNewGstRate("");
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  Mass GST Update
                </DialogTitle>
                <DialogDescription>
                  Change GST rate for all items in a specific slab to a new rate.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Existing GST Slab</Label>
                  <Select value={existingGstRate} onValueChange={setExistingGstRate}>
                    <SelectTrigger data-testid="select-existing-gst">
                      <SelectValue placeholder="Select current GST rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {gstSlabs.map((slab) => (
                        <SelectItem key={slab.value} value={slab.value}>
                          {slab.label} — {slab.itemCount} items
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Change To (New GST Rate)</Label>
                  <Select value={newGstRate} onValueChange={setNewGstRate}>
                    <SelectTrigger data-testid="select-new-gst">
                      <SelectValue placeholder="Select new GST rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {gstSlabs.filter(slab => slab.value !== existingGstRate).map((slab) => (
                        <SelectItem key={slab.value} value={slab.value}>
                          {slab.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {existingGstRate && newGstRate && existingGstRate !== newGstRate && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{gstSlabs.find(s => s.value === existingGstRate)?.itemCount || 0} items</span> currently in {existingGstRate}% GST slab will be moved to <span className="font-medium">{newGstRate}% GST</span> slab.
                  </p>
                )}
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setMassGstDialogOpen(false);
                  setExistingGstRate("");
                  setNewGstRate("");
                }} data-testid="button-cancel-mass-gst">
                  Cancel
                </Button>
                <Button 
                  onClick={handleMassGstUpdate} 
                  disabled={!existingGstRate || !newGstRate || existingGstRate === newGstRate}
                  data-testid="button-proceed-mass-gst"
                >
                  Proceed
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Mass GST Update Confirmation Dialog */}
          <Dialog open={massGstConfirmDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setMassGstConfirmDialogOpen(false);
              setExistingGstRate("");
              setNewGstRate("");
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Caution: Confirm Mass GST Update
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p className="text-sm">
                      All <span className="font-semibold">{gstSlabs.find(s => s.value === existingGstRate)?.itemCount || 0} items</span> in the <span className="font-semibold">{existingGstRate}% GST</span> slab will be moved to <span className="font-semibold">{newGstRate}% GST</span> slab.
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• This change will affect all future invoices for these items</p>
                      <p className="text-sm text-muted-foreground">• Existing invoices will not be modified</p>
                      <p className="text-sm text-muted-foreground">• This action cannot be easily undone</p>
                      <p className="text-sm text-muted-foreground">• Ensure this change complies with GST regulations</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">Are you absolutely sure you want to proceed?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setMassGstConfirmDialogOpen(false);
                  setExistingGstRate("");
                  setNewGstRate("");
                }} data-testid="button-cancel-mass-gst-confirm">
                  No, Cancel
                </Button>
                <Button variant="destructive" onClick={confirmMassGstUpdate} data-testid="button-confirm-mass-gst">
                  Yes, Update All Items
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Financial Settings Tab */}
        <TabsContent value="financial" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Financial Settings
              </CardTitle>
              <CardDescription>Configure financial year and entry rules</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fy-start">Financial Year Start</Label>
                  <Select defaultValue="april">
                    <SelectTrigger id="fy-start" data-testid="select-fy-start">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Changing financial year start will only apply to future financial years.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lock-date">Opening Balance Lock Date</Label>
                  <Input id="lock-date" type="date" defaultValue="2025-04-01" data-testid="input-lock-date" />
                  <p className="text-xs text-muted-foreground">Entries dated before this will not allow opening balance changes.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backdate-days">Max Backdate Days</Label>
                  {allowBackdatedEntries ? (
                    <Select value={maxBackdateDays} onValueChange={setMaxBackdateDays}>
                      <SelectTrigger id="backdate-days" data-testid="select-backdate-days">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="15">15 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div 
                      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2 text-sm cursor-not-allowed"
                      title="Enable 'Allow Backdated Entries' to use this field"
                    >
                      <span className="text-muted-foreground">Disabled</span>
                      <Ban className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Maximum days allowed for backdated entries</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-lock">Period Locking</Label>
                  <div 
                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm cursor-pointer"
                    onClick={() => setPeriodLockDialogOpen(true)}
                    data-testid="button-period-lock"
                  >
                    <span className="text-muted-foreground">Locked till: {currentLockedPeriod}</span>
                    <Lock className="h-4 w-4 opacity-50" />
                  </div>
                  <p className="text-xs text-muted-foreground">Lock periods to prevent any changes to past transactions.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Backdated Entries</Label>
                    <p className="text-xs text-muted-foreground">Allow users to create entries with past dates</p>
                  </div>
                  <Switch checked={allowBackdatedEntries} onCheckedChange={setAllowBackdatedEntries} data-testid="switch-backdate" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button onClick={() => setFinancialSettingsDialogOpen(true)} data-testid="button-save-financial">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Caution Notes */}
          <div className="px-2 space-y-2 mt-6">
            <p className="text-xs text-muted-foreground">• Maximum Allowed Backdate Days applies to vouchers, bills, and journal entries. Entries older than the allowed limit will be rejected.</p>
            <p className="text-xs text-muted-foreground">• Period Locking is irreversible for non-admin users. Once locked, transactions in that period cannot be created, modified, or deleted.</p>
            <p className="text-xs text-muted-foreground">• Opening Balance Lock Date prevents changes to opening balances for entries before this date. Useful after finalizing previous year accounts.</p>
            <p className="text-xs text-muted-foreground">• Changing Financial Year Start will only apply from the next financial year. Current year settings remain unchanged.</p>
          </div>
          
          {/* Financial Settings Confirmation Dialog */}
          <Dialog open={financialSettingsDialogOpen} onOpenChange={setFinancialSettingsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Financial Settings
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p>You are about to update the financial settings for your business.</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• These changes will affect how entries are validated</p>
                      <p className="text-sm text-muted-foreground">• Backdated entry rules will apply immediately</p>
                      <p className="text-sm text-muted-foreground">• Period locking changes are separate from this save</p>
                      <p className="text-sm text-muted-foreground">• Ensure your settings comply with accounting standards</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">Are you sure you want to proceed with these changes?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setFinancialSettingsDialogOpen(false)} data-testid="button-cancel-financial-save">
                  Cancel
                </Button>
                <Button onClick={() => setFinancialSettingsDialogOpen(false)} data-testid="button-confirm-financial-save">
                  Yes, Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Period Lock Dialog */}
          <Dialog open={periodLockDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setPeriodLockDialogOpen(false);
              setSelectedLockPeriod("");
              setPeriodLockNarration("");
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Period Locking
                </DialogTitle>
                <DialogDescription>
                  Lock accounting periods to prevent any modifications to transactions in those periods.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">
                    <span className="font-medium">Currently Locked Till:</span> <span className="text-primary font-semibold">{currentLockedPeriod}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All transactions up to and including this period are locked.</p>
                </div>
                <div className="space-y-2">
                  <Label>Extend Lock To Period</Label>
                  <Select value={selectedLockPeriod} onValueChange={setSelectedLockPeriod}>
                    <SelectTrigger data-testid="select-lock-period">
                      <SelectValue placeholder="Select period to lock" />
                    </SelectTrigger>
                    <SelectContent>
                      {lockPeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Select the month up to which you want to lock all transactions.</p>
                </div>
                <div className="space-y-2">
                  <Label>Narration</Label>
                  <Textarea 
                    value={periodLockNarration}
                    onChange={(e) => setPeriodLockNarration(e.target.value)}
                    placeholder="Enter reason for locking this period (e.g., Month-end closing, Audit preparation, etc.)"
                    className="min-h-[80px]"
                    data-testid="input-period-lock-narration"
                  />
                  <p className="text-xs text-muted-foreground">Provide a reason for locking this period. This is mandatory for audit trail.</p>
                </div>
                {selectedLockPeriod && (
                  <p className="text-sm text-muted-foreground">
                    All transactions from <span className="font-medium">{currentLockedPeriod}</span> to <span className="font-medium">{lockPeriods.find(p => p.value === selectedLockPeriod)?.label}</span> will be locked.
                  </p>
                )}
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setPeriodLockDialogOpen(false);
                  setSelectedLockPeriod("");
                  setPeriodLockNarration("");
                }} data-testid="button-cancel-period-lock">
                  Cancel
                </Button>
                <Button 
                  onClick={handlePeriodLock} 
                  disabled={!selectedLockPeriod || !periodLockNarration.trim()}
                  data-testid="button-proceed-period-lock"
                >
                  Lock Period
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Period Lock Confirmation Dialog */}
          <Dialog open={periodLockConfirmDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setPeriodLockConfirmDialogOpen(false);
              setSelectedLockPeriod("");
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Period Lock
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p className="text-sm">
                      You are about to lock all transactions up to <span className="font-semibold">{lockPeriods.find(p => p.value === selectedLockPeriod)?.label}</span>.
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• No new entries can be created in locked periods</p>
                      <p className="text-sm text-muted-foreground">• Existing entries cannot be modified or deleted</p>
                      <p className="text-sm text-muted-foreground">• Only an admin can unlock periods if needed</p>
                      <p className="text-sm text-muted-foreground">• This is typically done after month-end/year-end closing</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">Are you sure you want to lock this period?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setPeriodLockConfirmDialogOpen(false);
                  setSelectedLockPeriod("");
                }} data-testid="button-cancel-period-lock-confirm">
                  No, Cancel
                </Button>
                <Button onClick={confirmPeriodLock} data-testid="button-confirm-period-lock">
                  Yes, Lock Period
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Inventory Rules Tab */}
        <TabsContent value="inventory" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Inventory Rules
              </CardTitle>
              <CardDescription>Configure stock management rules</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Low Stock Threshold Default</Label>
                  <Input id="low-stock" type="number" defaultValue="10" data-testid="input-low-stock" />
                  <p className="text-xs text-muted-foreground">Applied only to items without an item-level threshold.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-adjust">Max Stock Adjustment % Without Approval</Label>
                  {allowStockAdjustment ? (
                    <Select value={maxAdjustmentPercent} onValueChange={setMaxAdjustmentPercent}>
                      <SelectTrigger id="max-adjust" data-testid="select-max-adjust">
                        <SelectValue placeholder="Select percentage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="7">7%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div 
                      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-2 text-sm cursor-not-allowed"
                      title="Enable 'Allow Stock Adjustment' to use this field"
                    >
                      <span className="text-muted-foreground">Disabled</span>
                      <Ban className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">All adjustments beyond this % require manager approval. All logs are still audited.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuation-method">Stock Valuation Method</Label>
                  <Select value={stockValuationMethod} onValueChange={setStockValuationMethod}>
                    <SelectTrigger id="valuation-method" data-testid="select-valuation-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                      <SelectItem value="weighted-avg">Weighted Average</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">FIFO uses oldest stock costs first. Weighted Average calculates uniform cost across all inventory.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Negative Stock Allowed</Label>
                    <p className="text-xs text-muted-foreground">Negative stock may cause mismatch between inventory and physical stock.</p>
                  </div>
                  <Switch data-testid="switch-negative-stock" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-create Item on Barcode Scan</Label>
                    <p className="text-xs text-muted-foreground">New items will require completion of details before sale. (This will not fire in billing module).</p>
                  </div>
                  <Switch data-testid="switch-auto-create" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Stock Adjustment</Label>
                    <p className="text-xs text-muted-foreground">All stock adjustments are recorded in audit logs.</p>
                  </div>
                  <Switch checked={allowStockAdjustment} onCheckedChange={setAllowStockAdjustment} data-testid="switch-stock-adjust" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button onClick={() => setInventorySettingsDialogOpen(true)} data-testid="button-save-inventory">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Caution Notes */}
          <div className="px-2 space-y-2 mt-6">
            <p className="text-xs text-muted-foreground">• When stock adjustment is allowed, the system logs: Old Qty, New Qty, User, and Timestamp for complete audit trail.</p>
            <p className="text-xs text-muted-foreground">• Negative stock sales can only be processed by Admin accounts. Other users will be blocked from billing items with zero or negative stock.</p>
            <p className="text-xs text-muted-foreground">• Auto-create item by barcode scan will only trigger and open the Add Item menu when the software is in Dashboard or Inventory modules. It will not fire in the Billing module.</p>
            <p className="text-xs text-muted-foreground">• Changing the Stock Valuation Method mid-year may cause discrepancies in inventory reports. Consult your accountant before making changes.</p>
          </div>
          
          {/* Inventory Settings Confirmation Dialog */}
          <Dialog open={inventorySettingsDialogOpen} onOpenChange={setInventorySettingsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Inventory Settings
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p>You are about to update the inventory rules and settings.</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• Changes to stock valuation method may affect inventory reports</p>
                      <p className="text-sm text-muted-foreground">• Negative stock settings will apply to all future transactions</p>
                      <p className="text-sm text-muted-foreground">• Stock adjustment rules will be enforced immediately</p>
                      <p className="text-sm text-muted-foreground">• Ensure your settings align with your business operations</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">Are you sure you want to proceed with these changes?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setInventorySettingsDialogOpen(false)} data-testid="button-cancel-inventory-save">
                  Cancel
                </Button>
                <Button onClick={() => setInventorySettingsDialogOpen(false)} data-testid="button-confirm-inventory-save">
                  Yes, Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Audit & Logs Tab */}
        <TabsContent value="audit" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                Audit & Logs
              </CardTitle>
              <CardDescription>Configure system logging and audit trails</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="log-level">Log Level</Label>
                  <Select value={logLevel} onValueChange={setLogLevel}>
                    <SelectTrigger id="log-level" data-testid="select-log-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical" className="group">
                        <span className="flex items-center gap-1.5">
                          <span className="text-foreground font-medium">Critical Only</span>
                          <span className="text-muted-foreground group-data-[highlighted]:text-white/80 transition-colors">(settings changes, stock adjustments, deletions)</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="financial" className="group">
                        <span className="flex items-center gap-1.5">
                          <span className="text-foreground font-medium">Financial & Inventory</span>
                          <span className="text-muted-foreground group-data-[highlighted]:text-white/80 transition-colors">(billing, vouchers, stock in/out)</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="user" className="group">
                        <span className="flex items-center gap-1.5">
                          <span className="text-foreground font-medium">User Activity</span>
                          <span className="text-muted-foreground group-data-[highlighted]:text-white/80 transition-colors">(login, logout, role change)</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="all" className="group">
                        <span className="text-foreground font-medium">All Activities (default)</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Higher log levels increase storage usage.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Logs In</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger id="export-format" data-testid="select-export-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">Export CSV</SelectItem>
                      <SelectItem value="pdf">Export PDF</SelectItem>
                      <SelectItem value="xlsx">Export Excel (.xlsx)</SelectItem>
                      <SelectItem value="json">Export JSON (Developer)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Choose the default format for downloading audit reports.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Retention Period</Label>
                  <Select 
                    value={retentionPeriod} 
                    onValueChange={(val) => {
                      if (val === "90" || val === "180") {
                        setPendingRetention(val);
                        setRetentionConfirmDialogOpen(true);
                      } else {
                        setRetentionPeriod(val);
                      }
                    }}
                  >
                    <SelectTrigger id="retention" data-testid="select-retention">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 Days (Basic)</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">For GST and audit compliance, minimum 1 year is recommended.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>
                      Audit Logging Status {auditLogsPaused ? (
                        <span className="text-red-600 dark:text-red-400 font-normal">(Paused)</span>
                      ) : (
                        <span className="text-muted-foreground font-normal">(Enabled - System Default)</span>
                      )}
                    </Label>
                    <p className="text-xs text-muted-foreground">Record all user actions and system events</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {auditLogsPaused ? (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => {
                          setAuditLogsPaused(false);
                          setPauseTimeRemaining(3600);
                        }}
                        data-testid="button-resume-logging"
                      >
                        <RotateCcw className="w-4 h-4 mr-1.5" />
                        Resume Logging ({formatTime(pauseTimeRemaining)})
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPauseLoggingDialogOpen(true)}
                        data-testid="button-pause-logging"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1.5" />
                        Pause Logging
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border/50">
                <Button onClick={() => setSaveAuditDialogOpen(true)} data-testid="button-save-audit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Footnotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 mt-6">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">
                Audit Trail Details
              </h4>
              <ul className="space-y-1.5">
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>All logs include: User Name, Role, Terminal (MM01 etc), Timestamp, Action, and Before → After state for critical actions.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>IP tracking is enabled for all remote terminal connections to ensure login security.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Audit logs are immutable and cannot be edited or deleted by any user, including admins.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>System-level logs are archived to cloud backup every 24 hours.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Unauthorized attempts to pause logging or change retention periods are flagged for immediate alert.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Historical data older than the retention period is permanently purged and cannot be recovered.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">
                Logged Events (Live View)
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-muted/30 p-4 rounded-xl border border-border/50">
                {getLoggedEvents(logLevel).map((event, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {event.isLogged ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Ban className="w-3.5 h-3.5 text-muted-foreground/50" />
                    )}
                    <span className={cn(event.isLogged ? "text-foreground font-medium" : "text-muted-foreground")}>
                      {event.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Audit Changes Dialog */}
          <Dialog open={saveAuditDialogOpen} onOpenChange={setSaveAuditDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Confirm Audit Settings
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p>You are about to update the system audit and logging configuration.</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Please note:</p>
                      <p className="text-sm text-muted-foreground">• These changes will take effect immediately across all terminals</p>
                      <p className="text-sm text-muted-foreground">• Audit log levels affect system performance and storage</p>
                      <p className="text-sm text-muted-foreground">• Retention changes may trigger permanent data purging</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Are you sure you want to proceed with these changes?</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setSaveAuditDialogOpen(false)} data-testid="button-cancel-audit-save">
                  Cancel
                </Button>
                <Button onClick={() => setSaveAuditDialogOpen(false)} data-testid="button-confirm-audit-save">
                  Yes, Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Retention Period Caution Dialog */}
          <Dialog open={retentionConfirmDialogOpen} onOpenChange={setRetentionConfirmDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Caution: Retention Period
                </DialogTitle>
                <DialogDescription className="pt-4 space-y-3">
                  <p className="font-medium text-foreground">Are you sure you want to change the retention period to {pendingRetention} days?</p>
                  <p>For GST and Audit compliance, it is highly recommended to keep logs for at least <span className="font-bold">1 Year</span>.</p>
                  <p className="text-sm text-muted-foreground">Reducing the retention period will lead to permanent deletion of older audit logs which might be required during official business audits.</p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setRetentionConfirmDialogOpen(false);
                  setPendingRetention("");
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    setRetentionPeriod(pendingRetention);
                    setRetentionConfirmDialogOpen(false);
                    setPendingRetention("");
                  }}
                >
                  Yes, I'm Sure
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Pause Logging Dialog */}
          <Dialog open={pauseLoggingDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setPauseLoggingDialogOpen(false);
              setPauseLoggingForm({ adminEmail: "", adminPassword: "", narration: "" });
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>
                  Pause Audit Logging
                </DialogTitle>
                <DialogDescription>
                  This action requires admin authentication. Pausing audit logs is a sensitive operation and will be recorded.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input 
                    id="admin-email"
                    type="email"
                    placeholder="admin@store.com"
                    value={pauseLoggingForm.adminEmail}
                    onChange={(e) => setPauseLoggingForm(prev => ({ ...prev, adminEmail: e.target.value }))}
                    data-testid="input-pause-admin-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <Input 
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={pauseLoggingForm.adminPassword}
                    onChange={(e) => setPauseLoggingForm(prev => ({ ...prev, adminPassword: e.target.value }))}
                    data-testid="input-pause-admin-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pause-narration">Reason for Pausing</Label>
                  <Textarea 
                    id="pause-narration"
                    placeholder="Enter the reason for pausing audit logs (e.g., System maintenance, Data migration, etc.)"
                    className="min-h-[80px]"
                    value={pauseLoggingForm.narration}
                    onChange={(e) => setPauseLoggingForm(prev => ({ ...prev, narration: e.target.value }))}
                    data-testid="input-pause-narration"
                  />
                  <p className="text-xs text-muted-foreground">This reason will be recorded in the system audit trail.</p>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setPauseLoggingDialogOpen(false);
                  setPauseLoggingForm({ adminEmail: "", adminPassword: "", narration: "" });
                }} data-testid="button-cancel-pause-logging">
                  Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    setPauseLoggingDialogOpen(false);
                    setPauseLoggingConfirmDialogOpen(true);
                  }}
                  disabled={!pauseLoggingForm.adminEmail || !pauseLoggingForm.adminPassword || !pauseLoggingForm.narration.trim()}
                  data-testid="button-proceed-pause-logging"
                >
                  Yes, Pause
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Pause Logging Confirmation Dialog */}
          <Dialog open={pauseLoggingConfirmDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setPauseLoggingConfirmDialogOpen(false);
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="text-red-600 dark:text-red-400">
                  Critical Security Warning
                </DialogTitle>
                <DialogDescription className="pt-2" asChild>
                  <div className="space-y-4">
                    <p className="text-sm font-bold flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Logs will be automatically re-enabled in 1 hour
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Important Cautions:</p>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                          <span>All user activities during the pause will <strong>NOT</strong> be recorded</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                          <span>This action itself will be logged before pausing begins</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                          <span>Any tampering or data changes during this period cannot be traced</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                          <span>Compliance requirements may be affected during the pause</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                          <span>You can manually resume logging at any time before the 1-hour limit</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm font-medium text-foreground pt-2 border-t border-border/50">
                      Are you absolutely sure you want to pause audit logging?
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setPauseLoggingConfirmDialogOpen(false);
                  setPauseLoggingForm({ adminEmail: "", adminPassword: "", narration: "" });
                }} data-testid="button-cancel-pause-confirm">
                  No, Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    setAuditLogsPaused(true);
                    setPauseLoggingConfirmDialogOpen(false);
                    setPauseLoggingForm({ adminEmail: "", adminPassword: "", narration: "" });
                    setPauseTimeRemaining(3600);
                  }}
                  data-testid="button-confirm-pause-logging"
                >
                  Yes, Pause Logging
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Data & Backup Tab */}
        <TabsContent value="backup" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Data & Backup
              </CardTitle>
              <CardDescription>Export data and manage backups</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backup-freq">Backup Frequency</Label>
                  <Select 
                    value={currentBackupFreq} 
                    onValueChange={(val) => {
                      setPendingBackupFreq(val);
                      setBackupFreqDialogOpen(true);
                    }}
                  >
                    <SelectTrigger id="backup-freq" data-testid="select-backup-freq">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Choose how often the system should automatically backup your data to the cloud.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-backup">Manual Backup</Label>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start font-normal border-input"
                    onClick={() => setManualBackupDialogOpen(true)}
                    data-testid="button-manual-backup"
                  >
                    <RotateCcw className="w-4 h-4 mr-2 opacity-50" />
                    Initiate Manual Backup Now
                  </Button>
                  <p className="text-xs text-muted-foreground">Perform an immediate backup of your system data outside the regular schedule.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Export Data</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => { setExportType("Inventory"); setExportDataDialogOpen(true); }} data-testid="button-export-inventory">
                      <Download className="w-4 h-4 mr-2" />
                      Export Inventory
                    </Button>
                    <Button variant="outline" onClick={() => { setExportType("Stock Master"); setExportDataDialogOpen(true); }} data-testid="button-export-stock-master">
                      <Download className="w-4 h-4 mr-2" />
                      Export Stock Master
                    </Button>
                    <Button variant="outline" onClick={() => { setExportType("Sales"); setExportDataDialogOpen(true); }} data-testid="button-export-sales">
                      <Download className="w-4 h-4 mr-2" />
                      Export Sales
                    </Button>
                    <Button variant="outline" onClick={() => { setExportType("Accounts"); setExportDataDialogOpen(true); }} data-testid="button-export-accounts">
                      <Download className="w-4 h-4 mr-2" />
                      Export Accounts
                    </Button>
                    <Button variant="outline" onClick={() => { 
                      setExportType("All Data"); 
                      setExportAllAdminDialogOpen(true); 
                    }} data-testid="button-export-all">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Restore Data</h4>
                <div className="space-y-1">
                  <p className="text-xs text-red-600 dark:text-red-400">• Restoring data from a backup will overwrite all current data. This action cannot be undone.</p>
                  <p className="text-xs text-red-600 dark:text-red-400">• Please ensure you have a current backup before proceeding with any restore operation.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30" 
                  onClick={() => setRestoreStep(1)}
                  data-testid="button-restore"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Restore from Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backup Footnotes & History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 mt-6">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">
                Backup Security & Cautions
              </h4>
              <ul className="space-y-1.5">
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>All backups are AES-256 encrypted and stored securely on redundant cloud servers.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Restoration is a high-privilege action that requires both Super Admin and Admin authorization.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Manual backups are recommended before performing any major system updates or bulk data imports.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Automated backups are retained for 30 days. Critical monthly snapshots are stored for 1 year.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>In case of cloud sync failure, local temporary backups are stored on the primary terminal.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Regularly verify backup integrity by checking the status in the Backup History table.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Avoid refreshing or closing the browser during an active backup or restore process.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Multiple failed backup attempts should be reported to system support immediately.</span>
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Cloud storage quota is monitored; ensure sufficient space for large system snapshots.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">
                Recent Backup History
              </h4>
              <div className="rounded-xl border border-border/50 overflow-hidden bg-muted/30">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                    <tr>
                      <th className="px-3 py-2">Date & Time</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Size</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { date: "13 Jan, 09:00 AM", type: "Auto", size: "14.2 MB", status: "Success" },
                      { date: "12 Jan, 09:00 AM", type: "Auto", size: "13.9 MB", status: "Success" },
                      { date: "11 Jan, 04:30 PM", type: "Manual", size: "13.8 MB", status: "Success" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/20 transition-colors">
                        <td className="px-3 py-2 text-foreground/80">{row.date}</td>
                        <td className="px-3 py-2">
                          <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal">
                            {row.type}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{row.size}</td>
                        <td className="px-3 py-2">
                          <span className={cn(
                            "inline-flex items-center gap-1",
                            row.status === "Success" ? "text-emerald-600" : "text-red-600"
                          )}>
                            <div className={cn("w-1 h-1 rounded-full", row.status === "Success" ? "bg-emerald-600" : "bg-red-600")} />
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-muted-foreground text-center italic">
                Showing last 3 backup events. View full history in <button onClick={() => setLocation("/reports")} className="text-primary hover:underline font-medium">Reports</button>.
              </p>
            </div>
          </div>
          {/* Export Admin Confirmation */}
          <Dialog open={exportAllAdminDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setExportAllAdminDialogOpen(false);
              setExportAllAdminForm({ adminEmail: "", adminPassword: "", narration: "" });
            }
          }}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>
                  Export All Data
                </DialogTitle>
                <DialogDescription>
                  This action requires admin authentication. exporting all data is sensitive operation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="export-admin-email">Admin Email</Label>
                  <Input 
                    id="export-admin-email"
                    type="email"
                    placeholder="admin@store.com"
                    value={exportAllAdminForm.adminEmail}
                    onChange={(e) => setExportAllAdminForm(prev => ({ ...prev, adminEmail: e.target.value }))}
                    data-testid="input-export-all-admin-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="export-admin-password">Admin Password</Label>
                  <Input 
                    id="export-admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={exportAllAdminForm.adminPassword}
                    onChange={(e) => setExportAllAdminForm(prev => ({ ...prev, adminPassword: e.target.value }))}
                    data-testid="input-export-all-admin-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="export-all-narration">Reason for Exporting All data</Label>
                  <Textarea 
                    id="export-all-narration"
                    placeholder="Please provide the reason for exporting the complete system database..."
                    className="min-h-[80px]"
                    value={exportAllAdminForm.narration}
                    onChange={(e) => setExportAllAdminForm(prev => ({ ...prev, narration: e.target.value }))}
                    data-testid="input-export-all-reason"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => {
                  setExportAllAdminDialogOpen(false);
                  setExportAllAdminForm({ adminEmail: "", adminPassword: "", narration: "" });
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-primary"
                  onClick={() => {
                    setExportAllAdminDialogOpen(false);
                    setExportDataDialogOpen(true);
                    setExportAllAdminForm({ adminEmail: "", adminPassword: "", narration: "" });
                  }}
                  disabled={!exportAllAdminForm.adminEmail || !exportAllAdminForm.adminPassword || !exportAllAdminForm.narration.trim()}
                  data-testid="button-proceed-export-all"
                >
                  Yes, Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Data Dialog */}
          <Dialog open={exportDataDialogOpen} onOpenChange={setExportDataDialogOpen}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Export {exportType}
                </DialogTitle>
                <DialogDescription>
                  Configure your export settings for {exportType.toLowerCase()}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select 
                    value={exportForm.dateRange} 
                    onValueChange={(val) => setExportForm(prev => ({ ...prev, dateRange: val }))}
                  >
                    <SelectTrigger data-testid="select-export-date-range">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {exportForm.dateRange === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">From Date</Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        value={exportForm.startDate}
                        onChange={(e) => setExportForm(prev => ({ ...prev, startDate: e.target.value }))}
                        data-testid="input-export-start-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">To Date</Label>
                      <Input 
                        id="end-date" 
                        type="date" 
                        value={exportForm.endDate}
                        onChange={(e) => setExportForm(prev => ({ ...prev, endDate: e.target.value }))}
                        data-testid="input-export-end-date"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>File Format</Label>
                  <Select 
                    value={exportForm.format} 
                    onValueChange={(val) => setExportForm(prev => ({ ...prev, format: val }))}
                  >
                    <SelectTrigger data-testid="select-export-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON (Developers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="include-inactive" 
                    checked={exportForm.includeInactive}
                    onCheckedChange={(checked) => setExportForm(prev => ({ ...prev, includeInactive: checked }))}
                    data-testid="switch-include-inactive"
                  />
                  <Label htmlFor="include-inactive" className="text-sm font-normal cursor-pointer">
                    Include inactive records
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setExportDataDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setExportDataDialogOpen(false)} data-testid="button-confirm-export">
                  Yes, Export Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Restore Data Wizard */}
          {/* Step 1: Confirmation */}
          <Dialog open={restoreStep === 1} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="pt-2">
                  <p className="font-bold text-foreground mb-2 text-xs uppercase tracking-wider opacity-70">You're on step 1</p>
                  <div className="space-y-3">
                    <p>Before proceeding with restoration, please note:</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground">
                      <li>This process will permanently overwrite existing data.</li>
                      <li>It is recommended to take a full backup of current data first.</li>
                      <li>System will be temporarily unavailable during restoration.</li>
                      <li>This action requires multi-level authorization.</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={resetRestoreData}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setRestoreStep(2)}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Step 2: Super Admin Auth */}
          <Dialog open={restoreStep === 2} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Restore Data from Backup</DialogTitle>
                <DialogDescription>
                  <span className="font-bold text-primary block mb-1">You're on step 2</span>
                  This action requires Super admin & admin authentication. Restoring data via backup is sensitive operation and will override current data.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Super Admin Email</Label>
                  <Input 
                    placeholder="superadmin@store.com"
                    value={restoreDataForm.superAdminEmail}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, superAdminEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Super Admin Password</Label>
                  <Input 
                    type="password"
                    placeholder="••••••••"
                    value={restoreDataForm.superAdminPassword}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, superAdminPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reason for Restoring data</Label>
                  <Textarea 
                    placeholder="Enter reason..."
                    value={restoreDataForm.superAdminReason}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, superAdminReason: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetRestoreData}>Cancel</Button>
                <Button 
                  disabled={!restoreDataForm.superAdminEmail || !restoreDataForm.superAdminPassword || !restoreDataForm.superAdminReason}
                  onClick={() => setRestoreStep(3)}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Step 3: Admin Auth */}
          <Dialog open={restoreStep === 3} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Restore Data from backup</DialogTitle>
                <DialogDescription>
                  <span className="font-bold text-primary block mb-1">You're on step 3</span>
                  please add admin details. This ensures secondary level of authorization for the restoration process.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input 
                    placeholder="admin@store.com"
                    value={restoreDataForm.adminEmail}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, adminEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Admin Password</Label>
                  <Input 
                    type="password"
                    placeholder="••••••••"
                    value={restoreDataForm.adminPassword}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, adminPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reason for Restoring Data</Label>
                  <Textarea 
                    placeholder="Enter reason..."
                    value={restoreDataForm.adminReason}
                    onChange={(e) => setRestoreDataForm(prev => ({ ...prev, adminReason: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetRestoreData}>Cancel</Button>
                <Button 
                  disabled={!restoreDataForm.adminEmail || !restoreDataForm.adminPassword || !restoreDataForm.adminReason}
                  onClick={() => setRestoreStep(4)}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Step 4: OTP */}
          <Dialog open={restoreStep === 4} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-md text-center" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Restore Data From Backup</DialogTitle>
                <DialogDescription>
                  <span className="font-bold text-primary block mb-1">youre on Step 4</span>
                  please Enter OTP recived on the Super Admin Email.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 flex flex-col items-center gap-6">
                <div className="flex gap-2 justify-center">
                  {[0,1,2,3,4,5].map((i) => (
                    <Input 
                      key={i}
                      id={`otp-input-${i}`}
                      className="w-12 h-12 text-center text-xl font-bold"
                      maxLength={1}
                      value={restoreDataForm.otp[i]}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !restoreDataForm.otp[i] && i > 0) {
                          document.getElementById(`otp-input-${i - 1}`)?.focus();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length <= 1) {
                          const newOtp = [...restoreDataForm.otp];
                          newOtp[i] = val;
                          setRestoreDataForm(prev => ({ ...prev, otp: newOtp }));
                          
                          if (val && i < 5) {
                            document.getElementById(`otp-input-${i + 1}`)?.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                {restoreDataForm.otp.every(v => v !== "") && (
                  <div className="flex items-center gap-2 text-emerald-600 font-medium animate-in fade-in zoom-in">
                    <Check className="w-5 h-5" />
                    All done
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" className="w-full" onClick={resetRestoreData}>Cancel</Button>
                <Button 
                  className="w-full"
                  disabled={restoreDataForm.otp.some(v => v === "")}
                  onClick={() => setRestoreStep(5)}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Step 5: Data Selection */}
          <Dialog open={restoreStep === 5} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Restore Data From backup</DialogTitle>
                <DialogDescription>
                  <span className="font-bold text-primary block mb-1">you're on step 5</span>
                  Select which data you wanna restore from the backup archive.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select which data</Label>
                  <Select value={restoreDataForm.dataType} onValueChange={(v) => setRestoreDataForm(prev => ({ ...prev, dataType: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Data</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="price-list">Price List</SelectItem>
                      <SelectItem value="vouchers">Vouchers</SelectItem>
                      <SelectItem value="accounts">Accounts</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="settings">Settings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select from</Label>
                  <Select value={restoreDataForm.dateRange} onValueChange={(v) => setRestoreDataForm(prev => ({ ...prev, dateRange: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whole">Whole data</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {restoreDataForm.dateRange === "custom" && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label>From</Label>
                      <Input type="date" value={restoreDataForm.startDate} onChange={(e) => setRestoreDataForm(prev => ({ ...prev, startDate: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Input type="date" value={restoreDataForm.endDate} onChange={(e) => setRestoreDataForm(prev => ({ ...prev, endDate: e.target.value }))} />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetRestoreData}>Cancel</Button>
                <Button onClick={() => setRestoreStep(6)}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Step 6: Final Caution */}
          <Dialog open={restoreStep === 6} onOpenChange={(open) => !open && resetRestoreData()}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Final Security Warning
                </DialogTitle>
                <DialogDescription className="pt-2">
                  <p className="font-bold text-red-600 mb-2 text-xs uppercase tracking-wider">you're on Step 6</p>
                  <p className="font-bold text-foreground">ULTIMATE CAUTION: This is the final step.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You are about to initiate a database restoration. All current system data will be replaced with the selected backup data. 
                    This action is <span className="underline decoration-red-500 font-bold">NOT REVERSIBLE</span>.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={resetRestoreData}>Abort</Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={resetRestoreData}>Yes, Initiate Restore</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Manual Backup Wizard */}
          <Dialog open={manualBackupDialogOpen} onOpenChange={setManualBackupDialogOpen}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Manual Backup
                </DialogTitle>
                <DialogDescription>
                  Select the scope of the manual backup you wish to perform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Backup Scope</Label>
                  <Select value={manualBackupType} onValueChange={setManualBackupType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Complete System Backup (All Data)</SelectItem>
                      <SelectItem value="today">Incremental Backup (Today's Data Only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setManualBackupDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  setManualBackupDialogOpen(false);
                  setManualBackupConfirmDialogOpen(true);
                }}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={manualBackupConfirmDialogOpen} onOpenChange={setManualBackupConfirmDialogOpen}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  Confirm Manual Backup
                </DialogTitle>
                <DialogDescription className="pt-2">
                  <p>Are you sure you want to initiate a manual backup for <strong>{manualBackupType === "all" ? "All Data" : "Today's Data"}</strong>?</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This will create an immediate snapshot of your database. Performance might be slightly affected during the process.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setManualBackupConfirmDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setManualBackupConfirmDialogOpen(false)}>Yes, Initiate Backup</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Backup Frequency Warning */}
          <Dialog open={backupFreqDialogOpen} onOpenChange={setBackupFreqDialogOpen}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  Change Backup Frequency
                </DialogTitle>
                <DialogDescription className="pt-2">
                  <p>You are changing the automatic backup frequency to <strong>{pendingBackupFreq}</strong>.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This will take immediate effect and update the cloud synchronization schedule.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBackupFreqDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  setCurrentBackupFreq(pendingBackupFreq);
                  setBackupFreqDialogOpen(false);
                }}>Confirm Change</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
