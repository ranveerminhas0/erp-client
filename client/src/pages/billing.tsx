import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { Trash2, Printer, Save, Search, Plus, Smartphone, Banknote, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MOCK_CUSTOMERS = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", address: "123 Main St, Delhi", dob: "1990-05-15" },
  { id: 2, name: "Priya Patel", phone: "9876543211", address: "456 Oak Ave, Mumbai", dob: "1992-08-22" },
];

export default function Billing() {
  const [items, setItems] = useState([
    { id: 1, product: MOCK_PRODUCTS[0], qty: 2, extraDisc: 0, extraDiscPercent: 0, subitem: "" },
    { id: 2, product: MOCK_PRODUCTS[2], qty: 1, extraDisc: 0, extraDiscPercent: 0, subitem: "" },
  ]);

  const [formData, setFormData] = useState({
    invoiceNo: "INV-2023-001",
    date: new Date().toISOString().split('T')[0],
    terms: "cash",
    party: "cash-sales",
    subType: "local-gst-included",
    agent: [] as string[],
  });

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [discountForm, setDiscountForm] = useState({
    amount: 0,
    percent: 0
  });

  const [partyModalOpen, setPartyModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (!selectedCategory || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
     p.id.toString().includes(productSearch))
  );

  const [parties] = useState([
    { id: 1, name: "Acme Corp", contact: "John Doe", phone: "9876543210", address: "Mumbai, India" },
    { id: 2, name: "Global Industries", contact: "Jane Smith", phone: "9123456789", address: "Delhi, India" },
    { id: 3, name: "Tech Solutions", contact: "Mike Johnson", phone: "8887776665", address: "Bangalore, India" },
    { id: 4, name: "Sunrise Enterprises", contact: "Sarah Williams", phone: "7776665554", address: "Chennai, India" },
  ]);

  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [agents] = useState([
    { id: 1, name: "Rahul", phone: "9876500001", role: "Sales Manager" },
    { id: 2, name: "Simran", phone: "9876500002", role: "Sr. Agent" },
    { id: 3, name: "Owner", phone: "9876500003", role: "Admin" },
    { id: 4, name: "Amit", phone: "9876500004", role: "Agent" },
  ]);

  const [productForm, setProductForm] = useState({
    barcode: "",
    productId: "",
    subitem: "",
    quantity: 1,
    unit: "PCS" as "PCS" | "WEIGHT",
  });

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "upi" | null>(null);
  const [cashReceived, setCashReceived] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    altPhone: "",
    dob: "",
    address: "",
  });
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);

  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [additionalDiscountModalOpen, setAdditionalDiscountModalOpen] = useState(false);
  const [metadataCollapsed, setMetadataCollapsed] = useState(false);

  const calculateDiscountPercent = (product: any) => {
    const discount = ((product.mrp - product.sellingPrice) / product.mrp) * 100;
    return Math.round(discount * 10) / 10;
  };

  const calculateTotal = (item: any) => {
    const baseAmount = item.product.sellingPrice * item.qty;
    const itemDisc = (baseAmount * calculateDiscountPercent(item.product)) / 100;
    const amountAfterItemDisc = baseAmount - itemDisc;
    return amountAfterItemDisc - item.extraDisc;
  };

  const calculateGSTAmount = (item: any) => {
    const total = calculateTotal(item);
    const isIncluded = formData.subType.includes("included");
    
    // MATHEMATICAL EXPLANATION:
    // Rate = 18% (0.18)
    
    // CASE 1: GST EXTRA (₹100 + GST)
    // Base Price = ₹100
    // Tax = ₹100 * 0.18 = ₹18
    // Final Amount = ₹118
    
    // CASE 2: GST INCLUDED (₹118 including GST)
    // To find the base from the final amount: Base = Final / (1 + Rate)
    // Base = 118 / 1.18 = ₹100
    // Tax = Final - Base = 118 - 100 = ₹18
    
    // RESULT: In both cases, if the base is 100 and rate is 18%, the TAX IS ₹18.
    
    if (isIncluded) {
      return total - (total / (1 + (item.product.gst / 100)));
    }
    
    // When "Extra", the "sellingPrice" in our data is treated as the BASE price
    return (total * item.product.gst) / 100;
  };

  const subTotal = items.reduce((acc, item) => acc + calculateTotal(item), 0);
  
  const isGSTIncluded = formData.subType.includes("included");
  const isInterstate = formData.subType.includes("interstate");
  
  let taxAmount = 0;
  let grandTotal = 0;

  // Let's calculate the tax amount based on the mode
  taxAmount = items.reduce((acc, item) => acc + calculateGSTAmount(item), 0);

  if (isGSTIncluded) {
    grandTotal = subTotal;
  } else {
    grandTotal = subTotal + taxAmount;
  }

  const cgst = isInterstate ? 0 : taxAmount / 2;
  const sgst = isInterstate ? 0 : taxAmount / 2;
  const igst = isInterstate ? taxAmount : 0;
  
  const roundedGrandTotal = Math.round(grandTotal - additionalDiscount);
  const roundOff = roundedGrandTotal - (grandTotal - additionalDiscount);
  
  const change = Math.max(0, cashReceived - roundedGrandTotal);

  const handleAddProduct = () => {
    if (!productForm.productId || productForm.productId.trim() === "") {
      toast("Action Required", {
        description: "Please scan a product or select one manually before adding.",
      });
      return;
    }
    
    if (productForm.quantity > 0) {
      const foundProduct = MOCK_PRODUCTS.find(p => 
        p.name === productForm.productId ||
        p.barcode === productForm.barcode
      ) || MOCK_PRODUCTS[0];

      const newItem = {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        product: foundProduct,
        qty: productForm.quantity,
        unit: productForm.unit,
        extraDisc: 0,
        extraDiscPercent: 0,
        subitem: productForm.subitem
      };
      setItems([...items, newItem]);
      setProductForm({ barcode: "", productId: "", subitem: "", quantity: 1, unit: "PCS" });
    }
  };

  const handleOpenDiscount = (item: any) => {
    setEditingItemId(item.id);
    setDiscountForm({
      amount: item.extraDisc,
      percent: item.extraDiscPercent
    });
    setDiscountModalOpen(true);
  };

  const handleApplyDiscount = () => {
    if (editingItemId !== null) {
      setItems(items.map(item => 
        item.id === editingItemId 
          ? { ...item, extraDisc: discountForm.amount, extraDiscPercent: discountForm.percent }
          : item
      ));
      setDiscountModalOpen(false);
      setEditingItemId(null);
    }
  };

  const updateDiscountFromAmount = (amount: number) => {
    const item = items.find(i => i.id === editingItemId);
    if (item) {
      const baseTotal = item.product.sellingPrice * item.qty;
      const percent = baseTotal > 0 ? (amount / baseTotal) * 100 : 0;
      setDiscountForm({ amount, percent: Math.round(percent * 100) / 100 });
    }
  };

  const updateDiscountFromPercent = (percent: number) => {
    const item = items.find(i => i.id === editingItemId);
    if (item) {
      const baseTotal = item.product.sellingPrice * item.qty;
      const amount = (baseTotal * percent) / 100;
      setDiscountForm({ percent, amount: Math.round(amount * 100) / 100 });
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleProceedToPay = () => {
    setCustomerModalOpen(false);
    setPaymentModalOpen(true);
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error("Please fill Name and Phone No.");
      return;
    }
    const customer = {
      id: Date.now().toString(),
      ...newCustomer
    };
    setSelectedCustomer(customer);
    setShowNewCustomerForm(false);
    toast.success("Customer added successfully!");
  };

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.phone.includes(customerSearch)
  );

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing</h1>
            <p className="text-muted-foreground font-medium text-sm">Create invoices for sales transactions</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Side: Billing Interface */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
            {/* Billing Metadata Section */}
            <Card className="border-none shadow-sm transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader 
                className="py-3 px-4 border-b border-border/30 bg-muted/20 flex flex-row items-center justify-between cursor-pointer group"
                onClick={() => setMetadataCollapsed(!metadataCollapsed)}
              >
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors py-0.5">
                  Invoice Metadata
                </CardTitle>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${metadataCollapsed ? '' : 'rotate-180'}`} />
                  </Button>
                </div>
              </CardHeader>
              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  metadataCollapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
                }`}
              >
                <div className="overflow-hidden">
                  <CardContent className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Invoice No.</Label>
                      <div className="font-mono font-bold text-sm text-foreground bg-muted/50 px-2 py-1 rounded border border-border/50">{formData.invoiceNo}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Date</Label>
                      <Input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="h-8 text-xs font-medium" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Terms</Label>
                      <Select value={formData.terms} onValueChange={(v) => setFormData({...formData, terms: v})}>
                        <SelectTrigger className="h-8 text-xs font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="bill">Bill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Party</Label>
                      <div className="flex gap-1">
                        <Select 
                          value={formData.party === "cash-sales" ? "cash-sales" : "credit"} 
                          onValueChange={(v) => {
                            if (v === "credit") {
                              setPartyModalOpen(true);
                            } else {
                              setFormData({...formData, party: "cash-sales"});
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 text-xs font-medium flex-1">
                            <SelectValue>
                              {formData.party === "cash-sales" ? "Cash Sales" : formData.party}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash-sales">Cash Sales</SelectItem>
                            <SelectItem value="credit">Credit Party</SelectItem>
                          </SelectContent>
                        </Select>
                        {formData.party !== "cash-sales" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground/60 hover:text-muted-foreground hover:bg-transparent" 
                            onClick={() => setPartyModalOpen(true)}
                          >
                            <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sub-Type</Label>
                      <Select value={formData.subType} onValueChange={(v) => setFormData({...formData, subType: v})}>
                        <SelectTrigger className="h-8 text-xs font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local-gst-included">Local GST Included</SelectItem>
                          <SelectItem value="local-gst-extra">Local GST Extra</SelectItem>
                          <SelectItem value="interstate-included">Interstate GST Included</SelectItem>
                          <SelectItem value="interstate-extra">Interstate GST Extra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Agent / Deals By</span>
                      <Button 
                        variant="outline" 
                        className="h-8 w-full justify-start px-3 py-1 font-medium text-xs border-border/50" 
                        onClick={() => setAgentModalOpen(true)}
                      >
                        <div className="truncate">
                          {formData.agent.length > 0 ? formData.agent.join(", ") : "Select Agents"}
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Product Entry Section */}
            <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border/30 bg-muted/30">
                <h3 className="text-sm font-semibold text-foreground mb-3">Add Products</h3>
                <div className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Barcode</Label>
                    <Input 
                      placeholder="Barcode" 
                      value={productForm.barcode}
                      onFocus={() => setMetadataCollapsed(true)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setProductForm({...productForm, barcode: val});
                        if (val.length > 3) {
                          const found = MOCK_PRODUCTS.find(p => p.barcode === val);
                          if (found) {
                            setProductForm(prev => ({...prev, barcode: val, productId: found.name}));
                          }
                        }
                      }}
                      className="h-8 text-xs" 
                      data-testid="input-barcode"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Product Name</Label>
                    <Input 
                      placeholder="Product ID/Name" 
                      value={productForm.productId}
                      onChange={(e) => setProductForm({...productForm, productId: e.target.value})}
                      onClick={() => setProductModalOpen(true)}
                      className="h-8 text-xs cursor-pointer" 
                      data-testid="input-product-name"
                      readOnly
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Sub-item</Label>
                    <Input 
                      placeholder="Sub-item" 
                      value={productForm.subitem}
                      onChange={(e) => setProductForm({...productForm, subitem: e.target.value})}
                      className="h-8 text-xs" 
                      data-testid="input-subitem"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Qty Unit</Label>
                    <Select 
                      value={productForm.unit} 
                      onValueChange={(v: "PCS" | "WEIGHT") => setProductForm({...productForm, unit: v})}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PCS">PCS</SelectItem>
                        <SelectItem value="WEIGHT">WEIGHT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                      {productForm.unit === "PCS" ? "Quantity" : "Weight (kg.g)"}
                    </Label>
                    {productForm.unit === "PCS" ? (
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-0.5 border border-border/50 w-full">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-6 rounded-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                          onClick={() => setProductForm(prev => ({...prev, quantity: Math.max(1, prev.quantity - 1)}))}
                        >
                          <span className="text-sm font-medium">-</span>
                        </Button>
                        <Input 
                          type="number" 
                          min="1"
                          value={productForm.quantity}
                          onChange={(e) => setProductForm({...productForm, quantity: parseInt(e.target.value) || 1})}
                          className="h-7 w-full text-[10px] border-0 bg-transparent text-center focus-visible:ring-0 font-bold px-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                          data-testid="input-quantity"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-6 rounded-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                          onClick={() => setProductForm(prev => ({...prev, quantity: prev.quantity + 1}))}
                        >
                          <span className="text-sm font-medium">+</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-0.5 border border-border/50 w-full relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-6 rounded-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all z-10"
                          onClick={() => setProductForm(prev => ({...prev, quantity: Math.max(0, Math.round((prev.quantity - 0.05) * 100) / 100)}))}
                        >
                          <span className="text-sm font-medium">-</span>
                        </Button>
                        <div className="relative flex-1 flex items-center justify-center">
                          <Input 
                            type="number" 
                            step="0.001"
                            placeholder="0.000"
                            value={productForm.quantity}
                            onChange={(e) => setProductForm({...productForm, quantity: parseFloat(e.target.value) || 0})}
                            className="h-7 w-full text-[10px] border-0 bg-transparent text-center focus-visible:ring-0 font-bold pl-0 pr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                            data-testid="input-weight"
                          />
                          <span className="absolute right-0.5 text-[8px] font-black text-muted-foreground/70 pointer-events-none">KG</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-6 rounded-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all z-10"
                          onClick={() => setProductForm(prev => ({...prev, quantity: Math.round((prev.quantity + 0.05) * 100) / 100}))}
                        >
                          <span className="text-sm font-medium">+</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Button 
                      onClick={handleAddProduct}
                      className="h-8 w-full bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-all active:scale-95"
                      data-testid="button-add-product"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5px]" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10 border-b border-border/30">
                    <TableRow className="hover:bg-muted/50">
                      <TableHead className="w-[40px] font-semibold text-xs">#</TableHead>
                      <TableHead className="font-semibold text-xs">Product</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Qty</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Rate</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Disc%</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Ex. Disc</TableHead>
                      <TableHead className="text-right font-semibold text-xs">GST%</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Amount</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No products added yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item, idx) => (
                        <TableRow key={item.id} className="border-border/30 hover:bg-muted/20 transition-colors text-sm">
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell>
                            <div className="font-medium">{item.product.name}</div>
                            {item.subitem && <div className="text-[10px] text-muted-foreground italic">Sub: {item.subitem}</div>}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.qty} <span className="text-[10px] text-muted-foreground">{item.unit || 'PCS'}</span>
                          </TableCell>
                          <TableCell className="text-right font-medium">₹{item.product.sellingPrice}</TableCell>
                          <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">
                            {calculateDiscountPercent(item.product)}%
                          </TableCell>
                          <TableCell 
                            className="text-right cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => handleOpenDiscount(item)}
                          >
                            <div className="font-medium">
                              ₹{item.extraDisc}
                              {item.extraDiscPercent > 0 && <span className="text-[10px] ml-1">({item.extraDiscPercent}%)</span>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">{item.product.gst}%</TableCell>
                          <TableCell className="text-right font-bold">₹{calculateTotal(item).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDeleteItem(item.id)}
                              data-testid={`button-delete-item-${item.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Right Side: Order Summary */}
          <Card className="col-span-12 lg:col-span-3 border-none shadow-sm flex flex-col h-fit">
            <CardHeader className="pb-3 border-b border-border/30">
              <CardTitle className="text-base font-bold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subTotal.toFixed(2)}</span>
                </div>
                {!isInterstate ? (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        CGST {isGSTIncluded && <span className="text-[10px] opacity-70 font-bold">(incl.)</span>}
                      </span>
                      <span className="font-medium">₹{cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        SGST {isGSTIncluded && <span className="text-[10px] opacity-70 font-bold">(incl.)</span>}
                      </span>
                      <span className="font-medium">₹{sgst.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      IGST {isGSTIncluded && <span className="text-[10px] opacity-70 font-bold">(incl.)</span>}
                    </span>
                    <span className="font-medium">₹{igst.toFixed(2)}</span>
                  </div>
                )}
                <div 
                  className="flex justify-between items-center text-sm cursor-pointer hover:bg-muted/50 px-1 -mx-1 rounded transition-colors group"
                  onClick={() => setAdditionalDiscountModalOpen(true)}
                >
                  <span className="text-muted-foreground group-hover:text-foreground">A. Discount (-)</span>
                  <span className="font-medium">₹{additionalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Round Off</span>
                  <span className="font-medium">
                    {roundOff >= 0 ? '+' : ''}{roundOff.toFixed(2)}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-end pt-1">
                <span className="font-semibold">Grand Total</span>
                <span className="font-bold text-2xl text-foreground">₹{roundedGrandTotal.toFixed(0)}.00</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4 bg-muted/30 border-t border-border/30">
              <Button 
                className="w-full h-10 text-sm bg-[#334155] hover:bg-[#1e293b] text-white font-bold shadow-md transition-all active:scale-[0.98]"
                onClick={() => {
                  setShowNewCustomerForm(false);
                  setSelectedCustomer(null);
                  setCustomerModalOpen(true);
                }}
                data-testid="button-save-print"
              >
                <Save className="mr-2 h-4 w-4" /> Save & Print (F12)
              </Button>
              <Button variant="outline" className="w-full h-8 text-xs font-medium" data-testid="button-preview">
                <Printer className="mr-1 h-3 w-3" /> Preview Invoice
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Product Selection Modal */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent 
          className="sm:max-w-[800px] h-[80vh] flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Select Product</DialogTitle>
            <DialogDescription>Browse by category or search for a specific product.</DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-4 flex-1 min-h-0 py-4">
            {/* Categories Side */}
            <div className="w-1/3 border-r pr-4 overflow-y-auto">
              <Label className="text-xs font-bold uppercase text-muted-foreground mb-2 block">Categories</Label>
              <div className="space-y-1">
                <Button 
                  variant={selectedCategory === null ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm h-9"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Products
                </Button>
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={selectedCategory === cat ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm h-9"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Side */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 h-9 text-sm"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>
              
              <div className="flex-1 border border-border/30 rounded-lg overflow-y-auto">
                <Table>
                  <TableHeader className="bg-muted/50 sticky top-0">
                    <TableRow>
                      <TableHead className="text-xs font-bold">Name</TableHead>
                      <TableHead className="text-xs font-bold">Price</TableHead>
                      <TableHead className="text-xs font-bold text-right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow 
                        key={product.id} 
                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => {
                          setProductForm({ 
                            ...productForm, 
                            productId: product.name,
                            unit: product.unit === 'WEIGHT' ? 'WEIGHT' : 'PCS'
                          });
                          setProductModalOpen(false);
                          setProductSearch("");
                        }}
                      >
                        <TableCell className="text-sm font-semibold">
                          <div>{product.name}</div>
                          <div className="text-[10px] text-muted-foreground">{product.category}</div>
                        </TableCell>
                        <TableCell className="text-xs font-medium">₹{product.sellingPrice}</TableCell>
                        <TableCell className="text-xs text-right font-mono">{product.stock}</TableCell>
                      </TableRow>
                    ))}
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground italic">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extra Discount Modal */}
      <Dialog open={discountModalOpen} onOpenChange={setDiscountModalOpen}>
        <DialogContent 
          className="sm:max-w-[400px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Apply Extra Discount</DialogTitle>
            <DialogDescription>Set extra discount by amount or percentage.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label className="text-sm font-semibold">Discount Amount (₹)</Label>
              <Input 
                type="number" 
                value={discountForm.amount}
                onChange={(e) => updateDiscountFromAmount(parseFloat(e.target.value) || 0)}
                className="h-9"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-semibold">OR</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-semibold">Discount Percentage (%)</Label>
              <Input 
                type="number" 
                value={discountForm.percent}
                onChange={(e) => updateDiscountFromPercent(parseFloat(e.target.value) || 0)}
                className="h-9"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDiscountModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#334155] hover:bg-[#1e293b] text-white" onClick={handleApplyDiscount}>Apply Discount</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agent Selection Modal */}
      <Dialog open={agentModalOpen} onOpenChange={setAgentModalOpen}>
        <DialogContent 
          className="sm:max-w-[500px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Select Agents</DialogTitle>
            <DialogDescription>Select one or more agents for this transaction.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border border-border/30 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="text-xs font-bold">Agent Name</TableHead>
                    <TableHead className="text-xs font-bold">Role</TableHead>
                    <TableHead className="text-xs font-bold">Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow 
                      key={agent.id} 
                      className="cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => {
                        const newAgents = formData.agent.includes(agent.name)
                          ? formData.agent.filter(a => a !== agent.name)
                          : [...formData.agent, agent.name];
                        setFormData({ ...formData, agent: newAgents });
                      }}
                    >
                      <TableCell>
                        <div className={`h-4 w-4 border rounded flex items-center justify-center ${
                          formData.agent.includes(agent.name) ? 'bg-teal-600 border-teal-600' : 'border-muted-foreground/30'
                        }`}>
                          {formData.agent.includes(agent.name) && <Plus className="h-3 w-3 text-white" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">{agent.name}</TableCell>
                      <TableCell className="text-xs">{agent.role}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{agent.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => setAgentModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Party Selection Modal */}
      <Dialog open={partyModalOpen} onOpenChange={setPartyModalOpen}>
        <DialogContent 
          className="sm:max-w-[600px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Select Credit Party</DialogTitle>
            <DialogDescription>Search and select a credit party for this invoice.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search party name or contact..." 
                className="pl-9 h-9 text-sm"
                data-testid="input-search-party"
              />
            </div>
            <div className="border border-border/30 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-xs font-bold">Party Name</TableHead>
                    <TableHead className="text-xs font-bold">Contact</TableHead>
                    <TableHead className="text-xs font-bold">Phone</TableHead>
                    <TableHead className="text-xs font-bold">Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parties.map((party) => (
                    <TableRow 
                      key={party.id} 
                      className="cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => {
                        setFormData({ ...formData, party: party.name });
                        setPartyModalOpen(false);
                      }}
                    >
                      <TableCell className="text-sm font-semibold">{party.name}</TableCell>
                      <TableCell className="text-xs">{party.contact}</TableCell>
                      <TableCell className="text-xs">{party.phone}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{party.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPartyModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={customerModalOpen} onOpenChange={setCustomerModalOpen}>
        <DialogContent 
          className="sm:max-w-[450px] p-0 overflow-hidden border-border bg-card shadow-2xl"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-6 bg-slate-950 text-white border-b border-white/10">
            <DialogTitle className="text-xl font-bold">Customer Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select an existing customer or add a new one to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-6">
            {!showNewCustomerForm ? (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by Name or Phone..." 
                    className="pl-10 h-11 bg-muted/20 border-border focus:ring-slate-700"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                  />
                </div>

                {customerSearch.length > 0 && (
                  <div className="border border-border rounded-md divide-y divide-border max-h-[200px] overflow-auto bg-muted/5">
                    {filteredCustomers.map(customer => (
                      <div 
                        key={customer.id} 
                        className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedCustomer?.id === customer.id ? 'bg-slate-900/40 border-l-4 border-slate-500' : ''}`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="font-bold text-sm text-foreground">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.phone} • {customer.address}</div>
                      </div>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <div className="p-4 text-center text-sm text-muted-foreground">No customers found</div>
                    )}
                  </div>
                )}

                {selectedCustomer && !customerSearch && (
                  <div className="p-4 bg-muted/20 rounded-lg border border-border">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Selected Customer</div>
                    <div className="font-bold text-foreground">{selectedCustomer.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedCustomer.phone}</div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 h-11 bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                    onClick={handleProceedToPay}
                    disabled={!selectedCustomer}
                  >
                    Proceed to Payment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-11 border-border hover:bg-muted font-semibold"
                    onClick={() => setShowNewCustomerForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
                    <Input 
                      placeholder="Full Name" 
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      className="h-10 bg-muted/20 border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone No.</Label>
                      <Input 
                        placeholder="Mobile Number" 
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        className="h-10 bg-muted/20 border-border"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Alternative No.</Label>
                      <Input 
                        placeholder="Secondary Phone" 
                        value={newCustomer.altPhone}
                        onChange={(e) => setNewCustomer({...newCustomer, altPhone: e.target.value})}
                        className="h-10 bg-muted/20 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</Label>
                    <Input 
                      placeholder="Complete Address" 
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                      className="h-10 bg-muted/20 border-border"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Birth Date</Label>
                    <Input 
                      type="date" 
                      value={newCustomer.dob}
                      onChange={(e) => setNewCustomer({...newCustomer, dob: e.target.value})}
                      className="h-10 bg-muted/20 border-border"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1 h-11 bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                    onClick={handleAddCustomer}
                  >
                    Add Customer
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="h-11 font-semibold text-muted-foreground"
                    onClick={() => setShowNewCustomerForm(false)}
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent 
          className="sm:max-w-[425px] p-0 overflow-hidden border-border bg-card shadow-2xl"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-6 bg-slate-950 text-white border-b border-white/10">
            <DialogTitle className="text-xl font-bold">Payment Settlement</DialogTitle>
            <DialogDescription className="text-slate-400">
              Finalize the transaction by selecting a payment method.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="p-5 bg-muted/20 rounded-xl text-center border border-border">
              <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Net Payable Amount</div>
              <div className="text-4xl font-black text-foreground">₹{roundedGrandTotal.toFixed(0)}.00</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className={`flex flex-col items-center justify-center gap-3 h-28 transition-all border-border ${
                  paymentMethod === 'cash' 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-inner' 
                    : 'bg-background hover:bg-muted/50'
                }`}
                onClick={() => setPaymentMethod('cash')}
                data-testid="button-pay-cash"
              >
                <div className={`p-2 rounded-full ${paymentMethod === 'cash' ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <Banknote className={`h-6 w-6 ${paymentMethod === 'cash' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Cash</span>
              </Button>
              <Button 
                variant="outline" 
                className={`flex flex-col items-center justify-center gap-3 h-28 transition-all border-border ${
                  paymentMethod === 'card' 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-inner' 
                    : 'bg-background hover:bg-muted/50'
                }`}
                onClick={() => setPaymentMethod('card')}
                data-testid="button-pay-card"
              >
                <div className={`p-2 rounded-full ${paymentMethod === 'card' ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <Printer className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Card</span>
              </Button>
              <Button 
                variant="outline" 
                className={`flex flex-col items-center justify-center gap-3 h-28 transition-all border-border ${
                  paymentMethod === 'upi' 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-inner' 
                    : 'bg-background hover:bg-muted/50'
                }`}
                onClick={() => setPaymentMethod('upi')}
                data-testid="button-pay-upi"
              >
                <div className={`p-2 rounded-full ${paymentMethod === 'upi' ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <Smartphone className={`h-6 w-6 ${paymentMethod === 'upi' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">UPI</span>
              </Button>
            </div>

            {paymentMethod === 'cash' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cash Received</Label>
                  <div className="flex items-center bg-background border border-border rounded-lg p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-md hover:bg-muted transition-all"
                      onClick={() => setCashReceived(prev => Math.max(0, prev - 100))}
                    >
                      <span className="text-xl font-medium">-</span>
                    </Button>
                    <div className="relative flex-1 px-2">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground z-10">₹</span>
                      <Input 
                        type="number" 
                        placeholder="0.00"
                        value={cashReceived || ""}
                        onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                        className="text-xl h-10 font-mono pl-10 border-0 bg-transparent text-center focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        data-testid="input-cash-received"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-md hover:bg-muted transition-all"
                      onClick={() => setCashReceived(prev => (prev || 0) + 100)}
                    >
                      <span className="text-xl font-medium">+</span>
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Return Change</Label>
                  <div className="p-2 bg-muted/20 rounded-lg border border-border text-right font-mono text-lg font-bold text-foreground">
                    ₹{change.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-black text-base shadow-lg transition-all active:scale-95"
              onClick={() => {
                setPaymentModalOpen(false);
                toast.success("Transaction Completed Successfully!");
              }}
              data-testid="button-complete-bill"
              disabled={!paymentMethod}
            >
              COMPLETE & PRINT BILL
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Additional Discount Modal */}
      <Dialog open={additionalDiscountModalOpen} onOpenChange={setAdditionalDiscountModalOpen}>
        <DialogContent 
          className="sm:max-w-[400px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Additional Discount</DialogTitle>
            <DialogDescription>Apply a flat discount to the entire invoice.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-sm font-semibold">Discount Amount (₹)</Label>
              <Input 
                type="number" 
                value={additionalDiscount}
                onChange={(e) => setAdditionalDiscount(parseFloat(e.target.value) || 0)}
                className="h-9"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdditionalDiscountModalOpen(false)}>Cancel</Button>
            <Button className="bg-slate-800 hover:bg-slate-900 text-white" onClick={() => setAdditionalDiscountModalOpen(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
