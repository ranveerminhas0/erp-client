import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus, Filter, Download, MoreHorizontal, Edit2, Trash2, Ban, AlertCircle, Save, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
  "Prestige",
  "Hawkins",
  "Milton",
  "Bajaj",
  "La Opala",
  "Philips",
  "Glen",
  "Cello",
  "Generic",
];

const mockStock = [
  { 
    id: "ITM-001", 
    name: "Premium Kitchen Set", 
    barcode: "8901234567890", 
    unit: "PCS", 
    size: "12 Pcs", 
    hsn: "7323", 
    gst: 18, 
    itc: "Yes", 
    group: "Prestige", 
    category: "Cookware", 
    mrp: 5999, 
    sellingPrice: 4999, 
    status: "Active" 
  },
  { 
    id: "ITM-002", 
    name: "Non-Stick Frying Pan", 
    barcode: "8901234567891", 
    unit: "PCS", 
    size: "24cm", 
    hsn: "7323", 
    gst: 12, 
    itc: "Yes", 
    group: "Hawkins", 
    category: "Pan", 
    mrp: 1299, 
    sellingPrice: 1099, 
    status: "Active" 
  },
  { 
    id: "ITM-003", 
    name: "Kitchen Tool Set", 
    barcode: "8901234567892", 
    unit: "PCS", 
    size: "5 Pcs", 
    hsn: "8215", 
    gst: 18, 
    itc: "No", 
    group: "Milton", 
    category: "Tools", 
    mrp: 899, 
    sellingPrice: 749, 
    status: "Inactive" 
  },
  { 
    id: "ITM-004", 
    name: "Pressure Cooker 5L", 
    barcode: "8901234567893", 
    unit: "PCS", 
    size: "5 Liters", 
    hsn: "7323", 
    gst: 12, 
    itc: "Yes", 
    group: "Prestige", 
    category: "Cooker", 
    mrp: 3200, 
    sellingPrice: 2850, 
    status: "Active" 
  },
  { 
    id: "ITM-005", 
    name: "Mixer Grinder 750W", 
    barcode: "8901234567894", 
    unit: "PCS", 
    size: "3 Jars", 
    hsn: "8509", 
    gst: 18, 
    itc: "Yes", 
    group: "Bajaj", 
    category: "Appliances", 
    mrp: 4500, 
    sellingPrice: 3899, 
    status: "Active" 
  },
  { 
    id: "ITM-006", 
    name: "Dinner Set - 32 Pcs", 
    barcode: "8901234567895", 
    unit: "PCS", 
    size: "32 Pcs", 
    hsn: "6911", 
    gst: 12, 
    itc: "Yes", 
    group: "La Opala", 
    category: "Tableware", 
    mrp: 2999, 
    sellingPrice: 2499, 
    status: "Active" 
  },
  { 
    id: "ITM-007", 
    name: "Induction Cooktop", 
    barcode: "8901234567896", 
    unit: "PCS", 
    size: "2000W", 
    hsn: "8516", 
    gst: 18, 
    itc: "Yes", 
    group: "Philips", 
    category: "Appliances", 
    mrp: 3500, 
    sellingPrice: 2999, 
    status: "Active" 
  },
  { 
    id: "ITM-008", 
    name: "Water Bottle - 1L", 
    barcode: "8901234567897", 
    unit: "PCS", 
    size: "1000ml", 
    hsn: "3924", 
    gst: 18, 
    itc: "No", 
    group: "Milton", 
    category: "Storage", 
    mrp: 499, 
    sellingPrice: 399, 
    status: "Active" 
  },
  { 
    id: "ITM-009", 
    name: "Gas Stove - 3 Burner", 
    barcode: "8901234567898", 
    unit: "PCS", 
    size: "Glass Top", 
    hsn: "7321", 
    gst: 12, 
    itc: "Yes", 
    group: "Glen", 
    category: "Stove", 
    mrp: 8500, 
    sellingPrice: 6999, 
    status: "Active" 
  },
  { 
    id: "ITM-010", 
    name: "Casserole Set", 
    barcode: "8901234567899", 
    unit: "PCS", 
    size: "3 Pcs Set", 
    hsn: "3924", 
    gst: 12, 
    itc: "No", 
    group: "Cello", 
    category: "Storage", 
    mrp: 1500, 
    sellingPrice: 1199, 
    status: "Inactive" 
  },
  { 
    id: "ITM-011", 
    name: "Loose Cleaning Powder", 
    barcode: "8901234567900", 
    unit: "KG", 
    size: "Bulk", 
    hsn: "3402", 
    gst: 18, 
    itc: "Yes", 
    group: "Generic", 
    category: "Cleaning", 
    mrp: 120, 
    sellingPrice: 95, 
    status: "Active" 
  },
  { 
    id: "ITM-012", 
    name: "Stainless Steel Scrap", 
    barcode: "8901234567901", 
    unit: "KG", 
    size: "Mixed", 
    hsn: "7204", 
    gst: 18, 
    itc: "Yes", 
    group: "Internal", 
    category: "Scrap", 
    mrp: 80, 
    sellingPrice: 65, 
    status: "Active" 
  },
];

export default function StockMaster() {
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState(mockStock);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Filter States
  const [gstFilter, setGstFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [itcFilter, setItcFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("");
  const [mrpRange, setMrpRange] = useState<[number, number]>([0, 10000]);
  const [sellingPriceRange, setSellingPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  
  // Form States
  const [actionReason, setActionReason] = useState("");
  const [editFormData, setEditFormData] = useState<any>(null);
  const [newCompany, setNewCompany] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [availableCompanies, setAvailableCompanies] = useState(companies);
  const [availableCategories, setAvailableCategories] = useState(["Cookware", "Pan", "Tools", "Cooker", "Appliances", "Tableware", "Storage", "Stove", "Cleaning", "Scrap"]);


  const filteredStock = invoices.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery);
    
    const matchesGst = gstFilter === "all" || String(item.gst) === gstFilter;
    const matchesCompany = companyFilter === "all" || item.group === companyFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesUnit = unitFilter === "all" || item.unit === unitFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSize = sizeFilter === "" || item.size.toLowerCase().includes(sizeFilter.toLowerCase());
    const matchesItc = itcFilter === "all" || item.itc === itcFilter;
    const matchesMrp = item.mrp >= mrpRange[0] && item.mrp <= mrpRange[1];
    const matchesSellingPrice = item.sellingPrice >= sellingPriceRange[0] && item.sellingPrice <= sellingPriceRange[1];
    
    return matchesSearch && matchesGst && matchesCompany && matchesCategory && matchesUnit && matchesStatus && matchesSize && matchesItc && matchesMrp && matchesSellingPrice;
  });

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setIsEditPopupOpen(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setEditFormData({
      id: `ITM-${String(invoices.length + 1).padStart(3, '0')}`,
      name: "",
      barcode: "",
      unit: "PCS",
      size: "",
      hsn: "",
      gst: 18,
      itc: "Yes",
      group: "",
      category: "",
      mrp: 0,
      sellingPrice: 0,
      lowStockThreshold: 10,
      status: "Active"
    });
    setIsEditPopupOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    setSelectedItem(item);
    setActionReason("");
    setIsDeleteDialogOpen(true);
  };

  const handleDeactivateClick = (item: any) => {
    setSelectedItem(item);
    setActionReason("");
    setIsDeactivateDialogOpen(true);
  };

  const handleReactivateItem = (item: any) => {
    setInvoices(prev => prev.map(i => 
      i.id === item.id ? { ...i, status: "Active" } : i
    ));
  };

  const proceedToDeleteConfirm = () => {
    setIsDeleteDialogOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  const proceedToDeactivateConfirm = () => {
    setIsDeactivateDialogOpen(false);
    setIsDeactivateConfirmOpen(true);
  };

  const finalDelete = () => {
    setInvoices(prev => prev.filter(i => i.id !== selectedItem.id));
    setIsDeleteConfirmOpen(false);
    setSelectedItem(null);
  };

  const finalDeactivate = () => {
    setInvoices(prev => prev.map(i => 
      i.id === selectedItem.id ? { ...i, status: "Inactive" } : i
    ));
    setIsDeactivateConfirmOpen(false);
    setSelectedItem(null);
  };

  const saveEdit = () => {
    if (selectedItem) {
      // Editing existing item
      setInvoices(prev => prev.map(i => 
        i.id === selectedItem.id ? { ...editFormData } : i
      ));
    } else {
      // Adding new item
      setInvoices(prev => [...prev, { ...editFormData }]);
    }
    setIsEditPopupOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      {/* Edit Item Dialog */}
      <Dialog open={isEditPopupOpen} onOpenChange={setIsEditPopupOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-4xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-[#FAFAFA] dark:bg-[#020617]"
        >
          <DialogHeader className="px-8 py-6">
            <DialogTitle className="text-xl font-bold flex items-center gap-3 uppercase tracking-wider text-slate-900 dark:text-white">
              {selectedItem ? "Edit Item Specifications" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="h-px bg-slate-200 dark:bg-slate-800/60" />

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Item ID</Label>
              <Input disabled value={editFormData?.id || ""} className="h-10 rounded-xl bg-muted/50 font-bold border-none" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Product Name</Label>
              <Input 
                value={editFormData?.name || ""} 
                onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Barcode</Label>
              <Input 
                value={editFormData?.barcode || ""} 
                onChange={e => setEditFormData({...editFormData, barcode: e.target.value})}
                className="h-10 rounded-xl font-mono text-xs border-slate-200 dark:border-slate-800 bg-transparent" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Unit</Label>
              <Select value={editFormData?.unit} onValueChange={v => setEditFormData({...editFormData, unit: v})}>
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800 shadow-xl">
                  <SelectItem value="PCS">PCS</SelectItem>
                  <SelectItem value="KG">KG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Size</Label>
              <Input 
                value={editFormData?.size || ""} 
                onChange={e => setEditFormData({...editFormData, size: e.target.value})}
                className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">HSN Code</Label>
              <Input 
                value={editFormData?.hsn || ""} 
                onChange={e => setEditFormData({...editFormData, hsn: e.target.value})}
                className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">GST %</Label>
              <Select 
                value={String(editFormData?.gst)} 
                onValueChange={v => setEditFormData({...editFormData, gst: Number(v)})}
              >
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800 shadow-xl">
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">ITC Available</Label>
              <Select value={editFormData?.itc} onValueChange={v => setEditFormData({...editFormData, itc: v})}>
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800 shadow-xl">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Group (Company)</Label>
              <Select 
                value={editFormData?.group} 
                onValueChange={v => setEditFormData({...editFormData, group: v})}
              >
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800/50 shadow-xl max-h-[200px] overflow-y-auto bg-white dark:bg-[#020617]">
                  <div className="p-2 sticky top-0 bg-[#FAFAFA] dark:bg-[#020617] z-10 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="h-8 pl-8 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1 focus-visible:ring-slate-200"
                        onInput={(e) => {
                          const search = (e.target as HTMLInputElement).value.toLowerCase();
                          const items = document.querySelectorAll('.company-item');
                          items.forEach((item: any) => {
                            const text = item.textContent?.toLowerCase() || "";
                            item.style.display = text.includes(search) ? 'flex' : 'none';
                          });
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="p-1">
                    {availableCompanies.map((company) => (
                      <SelectItem 
                        key={company} 
                        value={company}
                        className="company-item rounded-lg py-2 cursor-pointer"
                      >
                        {company}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Category</Label>
              <Select 
                value={editFormData?.category} 
                onValueChange={v => setEditFormData({...editFormData, category: v})}
              >
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800/50 shadow-xl max-h-[200px] overflow-y-auto bg-white dark:bg-[#020617]">
                  <div className="p-2 sticky top-0 bg-[#FAFAFA] dark:bg-[#020617] z-10 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="h-8 pl-8 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1 focus-visible:ring-slate-200"
                        onInput={(e) => {
                          const search = (e.target as HTMLInputElement).value.toLowerCase();
                          const items = document.querySelectorAll('.category-item');
                          items.forEach((item: any) => {
                            const text = item.textContent?.toLowerCase() || "";
                            item.style.display = text.includes(search) ? 'flex' : 'none';
                          });
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="p-1">
                    {availableCategories.map((cat) => (
                      <SelectItem 
                        key={cat} 
                        value={cat}
                        className="category-item rounded-lg py-2 cursor-pointer"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Status</Label>
              <Select value={editFormData?.status} onValueChange={v => setEditFormData({...editFormData, status: v})}>
                <SelectTrigger className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-slate-800 shadow-xl">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">MRP (₹)</Label>
              <Input 
                type="number"
                value={editFormData?.mrp || 0} 
                onChange={e => setEditFormData({...editFormData, mrp: Number(e.target.value)})}
                className="h-10 rounded-xl font-black border-slate-200 dark:border-slate-800 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Selling Price (₹)</Label>
              <Input 
                type="number"
                value={editFormData?.sellingPrice || 0} 
                onChange={e => setEditFormData({...editFormData, sellingPrice: Number(e.target.value)})}
                className="h-10 rounded-xl font-black border-slate-200 dark:border-slate-800 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Low stock threshold (override global)</Label>
              <Input 
                type="number"
                value={editFormData?.lowStockThreshold || 0} 
                onChange={e => setEditFormData({...editFormData, lowStockThreshold: Number(e.target.value)})}
                className="h-10 rounded-xl font-black border-slate-200 dark:border-slate-800 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800/60" />

          <DialogFooter className="p-6 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditPopupOpen(false)} className="h-11 px-6 rounded-xl font-bold text-[11px] uppercase tracking-widest border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-900">
              Discard Changes
            </Button>
            <Button onClick={saveEdit} className="h-11 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white shadow-xl dark:shadow-none transition-all active:scale-95 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Item Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-[450px] p-8 border-none rounded-[20px] shadow-2xl bg-[#FAFAFA] dark:bg-slate-950"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <AlertCircle className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl font-bold tracking-tight">Are you sure?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Please provide a reason for deleting <span className="text-slate-900 dark:text-white font-bold">{selectedItem?.name}</span>:
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reason for deletion</Label>
                <Textarea 
                  placeholder="Enter reason for deletion..." 
                  value={actionReason}
                  onChange={e => setActionReason(e.target.value)}
                  className="min-h-[100px] rounded-xl border-slate-200 bg-transparent dark:bg-slate-950 dark:border-slate-800 focus:ring-slate-900/5 focus:border-slate-900 font-medium text-sm p-4 shadow-sm resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)} 
                className="h-9 px-6 rounded-lg font-bold text-[12px] border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Cancel
              </Button>
              <Button 
                disabled={!actionReason.trim()}
                onClick={proceedToDeleteConfirm}
                className="h-9 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-lg font-bold text-[12px] transition-all shadow-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Final Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-[450px] p-8 border-none rounded-[20px] shadow-2xl bg-[#FAFAFA] dark:bg-slate-950"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <AlertCircle className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl font-bold tracking-tight">Are you sure?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                  This action is non-reversible and all associated data will be permanently removed.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteConfirmOpen(false)} 
                className="h-9 px-6 rounded-lg font-bold text-[12px] border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Cancel
              </Button>
              <Button 
                onClick={finalDelete}
                className="h-9 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-lg font-bold text-[12px] transition-all shadow-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deactivate Item Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-[450px] p-8 border-none rounded-[20px] shadow-2xl bg-[#FAFAFA] dark:bg-slate-950"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <AlertCircle className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl font-bold tracking-tight">Are you sure?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Please provide a reason for deactivating <span className="text-slate-900 dark:text-white font-bold">{selectedItem?.name}</span>:
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reason for deactivation</Label>
                <Textarea 
                  placeholder="Enter reason for deactivation..." 
                  value={actionReason}
                  onChange={e => setActionReason(e.target.value)}
                  className="min-h-[100px] rounded-xl border-slate-200 bg-transparent dark:bg-slate-950 dark:border-slate-800 focus:ring-slate-900/5 focus:border-slate-900 font-medium text-sm p-4 shadow-sm resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeactivateDialogOpen(false)} 
                className="h-9 px-6 rounded-lg font-bold text-[12px] border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Cancel
              </Button>
              <Button 
                disabled={!actionReason.trim()}
                onClick={proceedToDeactivateConfirm}
                className="h-9 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-lg font-bold text-[12px] transition-all shadow-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deactivate Final Confirmation Dialog */}
      <Dialog open={isDeactivateConfirmOpen} onOpenChange={setIsDeactivateConfirmOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="max-w-[450px] p-8 border-none rounded-[20px] shadow-2xl bg-[#FAFAFA] dark:bg-slate-950"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <AlertCircle className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl font-bold tracking-tight">Are you sure?</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                  This item will be hidden from all active sales modules.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeactivateConfirmOpen(false)} 
                className="h-9 px-6 rounded-lg font-bold text-[12px] border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Cancel
              </Button>
              <Button 
                onClick={finalDeactivate}
                className="h-9 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-lg font-bold text-[12px] transition-all shadow-sm"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Company Dialog */}
      <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
        <DialogContent className="max-w-[400px] p-6 border-none rounded-2xl shadow-2xl bg-[#FAFAFA] dark:bg-[#020617]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold uppercase tracking-wider">Add New Company</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Company Name</Label>
              <Input 
                value={newCompany}
                onChange={e => setNewCompany(e.target.value)}
                placeholder="Enter company name..."
                className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCompanyOpen(false)} className="rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</Button>
            <Button 
              onClick={() => {
                if (newCompany.trim()) {
                  setAvailableCompanies(prev => [...prev, newCompany.trim()]);
                  setNewCompany("");
                  setIsAddCompanyOpen(false);
                }
              }}
              className="rounded-xl font-bold text-[10px] uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              Add Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="max-w-[400px] p-6 border-none rounded-2xl shadow-2xl bg-[#FAFAFA] dark:bg-[#020617]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold uppercase tracking-wider">Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Category Name</Label>
              <Input 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Enter category name..."
                className="h-10 rounded-xl font-bold border-slate-200 dark:border-slate-800 bg-transparent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)} className="rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</Button>
            <Button 
              onClick={() => {
                if (newCategory.trim()) {
                  setAvailableCategories(prev => [...prev, newCategory.trim()]);
                  setNewCategory("");
                  setIsAddCategoryOpen(false);
                }
              }}
              className="rounded-xl font-bold text-[10px] uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Stock Master</h1>
          <p className="text-muted-foreground font-medium text-sm">Manage your product inventory and specifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsAddCompanyOpen(true)}
            className="h-9 px-4 gap-2 border-border/50 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Company
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsAddCategoryOpen(true)}
            className="h-9 px-4 gap-2 border-border/50 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Category
          </Button>
          <Button 
            onClick={handleAddNew}
            className="h-9 px-4 gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-slate-200 dark:shadow-none transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Item
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-slate-900 flex flex-col h-[calc(100vh-270px)]">
        <CardHeader className="py-3 px-4 border-b border-border/30 bg-muted/20 dark:bg-slate-800/50 flex flex-row items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input 
                placeholder="Search by ID, Name or Barcode..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 font-medium text-xs border-border/50 focus:ring-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm" 
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={cn(
                  "h-9 w-9 border-border/50 rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95",
                  (gstFilter !== "all" || companyFilter !== "all") && "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                )}>
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-1.5 rounded-xl border-border/50 shadow-xl overflow-hidden">
                <div className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Filters</div>
                
                {/* GST Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>Sort by GST</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-32 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <DropdownMenuItem onClick={() => setGstFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All Rates</DropdownMenuItem>
                    {["0", "5", "12", "18", "28", "40"].map(rate => (
                      <DropdownMenuItem key={rate} onClick={() => setGstFilter(rate)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">{rate}%</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Company Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>By Company</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <div className="p-2 border-b border-border/30">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                        <Input
                          placeholder="Search company..."
                          className="h-7 pl-7 text-[10px] rounded-lg bg-slate-50 dark:bg-slate-800 border-none"
                          onInput={(e) => {
                            const search = (e.target as HTMLInputElement).value.toLowerCase();
                            const items = document.querySelectorAll('.filter-company-item');
                            items.forEach((item: any) => {
                              const text = item.textContent?.toLowerCase() || "";
                              item.style.display = text.includes(search) ? 'flex' : 'none';
                            });
                          }}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto p-1 scrollbar-hide">
                      <DropdownMenuItem onClick={() => setCompanyFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All Companies</DropdownMenuItem>
                      {availableCompanies.map(company => (
                        <DropdownMenuItem key={company} onClick={() => setCompanyFilter(company)} className="filter-company-item text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">{company}</DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Category Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>By Category</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <div className="p-2 border-b border-border/30">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                        <Input
                          placeholder="Search category..."
                          className="h-7 pl-7 text-[10px] rounded-lg bg-slate-50 dark:bg-slate-800 border-none"
                          onInput={(e) => {
                            const search = (e.target as HTMLInputElement).value.toLowerCase();
                            const items = document.querySelectorAll('.filter-category-item');
                            items.forEach((item: any) => {
                              const text = item.textContent?.toLowerCase() || "";
                              item.style.display = text.includes(search) ? 'flex' : 'none';
                            });
                          }}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto p-1 scrollbar-hide">
                      <DropdownMenuItem onClick={() => setCategoryFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All Categories</DropdownMenuItem>
                      {availableCategories.map(cat => (
                        <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)} className="filter-category-item text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">{cat}</DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Unit Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>By Unit</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-32 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <DropdownMenuItem onClick={() => setUnitFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All Units</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUnitFilter("PCS")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">PCS</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUnitFilter("KG")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">KG</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Size Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>By Size</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56 p-2 rounded-xl border-border/50 shadow-xl ml-1">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">Search Size</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g. 12 Pcs, 5L..."
                          className="h-8 text-xs rounded-lg border-slate-200"
                          defaultValue={sizeFilter}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setSizeFilter((e.target as HTMLInputElement).value);
                            }
                            e.stopPropagation();
                          }}
                        />
                        <Button 
                          size="sm" 
                          className="h-8 px-2 rounded-lg bg-slate-900 text-white text-[10px] font-bold"
                          onClick={(e) => {
                            const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                            setSizeFilter(input.value);
                          }}
                        >
                          GO
                        </Button>
                      </div>
                      <p className="text-[9px] text-muted-foreground px-1 italic">Press Enter or click GO to filter</p>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Status Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>Status</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-32 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Active")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-green-600">Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Inactive")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-red-600">Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* ITC Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>ITC Available?</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-32 p-1.5 rounded-xl border-border/50 shadow-xl ml-1">
                    <DropdownMenuItem onClick={() => setItcFilter("all")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setItcFilter("Yes")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">Yes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setItcFilter("No")} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">No</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Price Filter Submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg hover:bg-muted transition-colors outline-none">
                    <span>By Price</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-64 p-4 rounded-xl border-border/50 shadow-xl ml-1 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">MRP Range</Label>
                        <span className="text-[10px] font-bold">₹{mrpRange[0]} - ₹{mrpRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={100}
                        value={mrpRange}
                        onValueChange={(val: any) => setMrpRange(val as [number, number])}
                        className="py-2"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Selling Price</Label>
                        <span className="text-[10px] font-bold">₹{sellingPriceRange[0]} - ₹{sellingPriceRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={100}
                        value={sellingPriceRange}
                        onValueChange={(val: any) => setSellingPriceRange(val as [number, number])}
                        className="py-2"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-8 text-[10px] font-bold uppercase tracking-wider rounded-lg"
                      onClick={() => { setMrpRange([0, 10000]); setSellingPriceRange([0, 10000]); }}
                    >
                      Reset Ranges
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>

                {(gstFilter !== "all" || companyFilter !== "all" || categoryFilter !== "all" || unitFilter !== "all" || statusFilter !== "all" || sizeFilter !== "" || itcFilter !== "all" || mrpRange[0] !== 0 || mrpRange[1] !== 10000 || sellingPriceRange[0] !== 0 || sellingPriceRange[1] !== 10000) && (
                  <>
                    <DropdownMenuSeparator className="bg-border/30 my-1" />
                    <DropdownMenuItem 
                      onClick={() => { 
                        setGstFilter("all"); 
                        setCompanyFilter("all"); 
                        setCategoryFilter("all");
                        setUnitFilter("all"); 
                        setStatusFilter("all");
                        setSizeFilter("");
                        setItcFilter("all");
                        setMrpRange([0, 10000]);
                        setSellingPriceRange([0, 10000]);
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 cursor-pointer rounded-lg py-2 justify-center"
                    >
                      Clear All Filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <div className="overflow-x-auto bg-muted/10 dark:bg-slate-800/30 border-b border-border/30 shrink-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Item ID</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[200px]">Product Name</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[140px]">Barcode</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[80px]">Unit</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Size</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">HSN</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[80px]">GST%</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">ITC</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Group</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[120px]">Category</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">MRP</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Sell Price</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 w-[100px]">Status</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground py-4 text-right pr-6 w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        <CardContent className="p-0 overflow-y-auto overflow-x-auto flex-1 scrollbar-hide">
          <Table>
            <TableBody>
              {filteredStock.length > 0 ? (
                filteredStock.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/20 dark:hover:bg-slate-800/50 transition-all border-b border-border/20 dark:border-border/10 last:border-0 group">
                    <TableCell className="font-bold text-xs py-4 w-[100px]">{item.id}</TableCell>
                    <TableCell className="text-xs py-4 font-bold text-foreground w-[200px]">{item.name}</TableCell>
                    <TableCell className="text-[11px] py-4 text-muted-foreground font-medium w-[140px] font-mono">{item.barcode}</TableCell>
                    <TableCell className="text-xs py-4 w-[80px]">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-muted rounded">
                        {item.unit}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-4 text-muted-foreground font-medium w-[100px]">{item.size}</TableCell>
                    <TableCell className="text-xs py-4 text-muted-foreground font-medium w-[100px]">{item.hsn}</TableCell>
                    <TableCell className="text-xs py-4 font-bold text-foreground w-[80px]">{item.gst}%</TableCell>
                    <TableCell className="text-xs py-4 w-[100px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {item.itc}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs py-4 text-muted-foreground font-medium w-[120px]">{item.group}</TableCell>
                    <TableCell className="text-xs py-4 text-muted-foreground font-medium w-[120px]">{item.category}</TableCell>
                    <TableCell className="text-xs py-4 font-black text-foreground w-[100px]">₹{item.mrp.toLocaleString()}</TableCell>
                    <TableCell className="text-xs py-4 font-black text-foreground w-[100px]">₹{item.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell className="py-4 w-[100px]">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        item.status === "Active" ? "text-green-500" : "text-red-500"
                      )}>
                        {item.status}
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
                          <DropdownMenuItem onClick={() => handleEdit(item)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2">
                            <Edit2 className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" /> Edit Item
                          </DropdownMenuItem>
                          
                          {item.status === "Active" ? (
                            <DropdownMenuItem onClick={() => handleDeactivateClick(item)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-amber-600">
                              <Ban className="w-3.5 h-3.5 mr-2.5" /> Deactivate Item
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleReactivateItem(item)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-green-600">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-2.5" /> Reactivate Item
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator className="bg-border/30 my-1" />
                          <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-[11px] font-bold uppercase tracking-wider cursor-pointer rounded-lg py-2 text-red-500 font-black">
                            <Trash2 className="w-3.5 h-3.5 mr-2.5" /> Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} className="h-32 text-center text-muted-foreground font-medium">
                    No items found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}