import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { 
  Printer, 
  Barcode, 
  Plus, 
  Trash2, 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight,
  Search,
  Minus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransferItem {
  id: string;
  name: string;
  qty: number;
  from?: string;
  mrp?: number;
  sellingPrice?: number;
  destination?: string;
  barcode?: string;
}

export default function StockTransfer() {
  const [inItems, setInItems] = useState<TransferItem[]>([
    { id: "1", name: "SS Cooking Pot 5L", qty: 5, from: "TERMINAL MR02", barcode: "KITCH-001" },
    { id: "2", name: "Dinner Set 32pc", qty: 2, from: "WAREHOUSE A", barcode: "DINE-001" },
  ]);
  const [outItems, setOutItems] = useState<TransferItem[]>([]);
  
  const [outForm, setOutForm] = useState({ name: "", qty: 1, barcode: "", destination: "terminal-mr02" });

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [receiveWorkflowStep, setReceiveWorkflowStep] = useState(1);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);
  const [adjustedItems, setAdjustedItems] = useState<TransferItem[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const MOCK_HISTORY = [
    { id: "TR-001", date: "2024-01-05", from: "Warehouse", items: 12, status: "Pending" },
    { id: "TR-002", date: "2024-01-04", from: "Main Store", items: 5, status: "Received" },
  ];

  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (!selectedCategory || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
     p.barcode.includes(productSearch) ||
     p.id.toString().includes(productSearch))
  );

  const addOutItem = () => {
    if (!outForm.name || outForm.qty <= 0) {
      toast.error("Please fill product name and quantity");
      return;
    }
    const newItem: TransferItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: outForm.name,
      qty: Number(outForm.qty),
      destination: outForm.destination,
      barcode: outForm.barcode,
    };
    setOutItems([...outItems, newItem]);
    setOutForm({ ...outForm, name: "", qty: 1, barcode: "" });
    toast.success("Item added to issue list");
  };

  const removeItem = (id: string, type: 'in' | 'out') => {
    if (type === 'in') setInItems(inItems.filter(i => i.id !== id));
    else setOutItems(outItems.filter(i => i.id !== id));
  };

  const handlePrint = (type: string) => {
    toast.success(`${type} completed! Printing documents...`, {
      description: "Bill and barcodes are being generated.",
    });
    if (type === 'Stock Receive') setInItems([]);
    else setOutItems([]);
  };

  const updateAdjustedQty = (id: string, delta: number) => {
    setAdjustedItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ));
  };

  return (
    <div className="space-y-6 w-full p-4 md:p-0 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-6 flex-shrink-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Stock Transfer</h1>
          <p className="text-muted-foreground font-medium text-xs">Manage inventory movement between showrooms</p>
        </div>
      </div>

      <Tabs defaultValue="in" className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-start flex-shrink-0 border-b border-border/50 pb-4 mb-4">
          <TabsList className="grid grid-cols-2 w-[320px] p-1 bg-slate-50 dark:bg-slate-900/50 rounded-xl h-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <TabsTrigger 
              value="in" 
              className="rounded-lg font-bold uppercase tracking-wider text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 transition-all h-full"
            >
              <ArrowDownLeft className="mr-2 h-3.5 w-3.5" />
              Transfer IN
            </TabsTrigger>
            <TabsTrigger 
              value="out" 
              className="rounded-lg font-bold uppercase tracking-wider text-[10px] data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-500 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 transition-all h-full"
            >
              <ArrowUpRight className="mr-2 h-3.5 w-3.5" />
              Transfer OUT
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="in" className="flex-1 flex flex-col gap-4 min-h-0 data-[state=inactive]:hidden">
          <div className="flex justify-between items-center px-2 flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Incoming Shipments</h2>
              <p className="text-xs text-muted-foreground">Verify and receive stock from other locations</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setHistoryModalOpen(true)}
              className="h-9 rounded-xl font-bold uppercase tracking-wider text-[10px] gap-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-4"
            >
              <Package className="h-3.5 w-3.5" />
              History
            </Button>
          </div>

          <div className="flex flex-col flex-1 min-h-0">
            {/* Separate Header */}
            <div className="bg-slate-50 dark:bg-slate-950/50 py-4 px-6 border border-slate-200 dark:border-slate-800 border-b-0 rounded-t-2xl flex flex-row items-center justify-between space-y-0 flex-shrink-0">
              <div>
                <h3 className="text-base font-bold">Pending Receipt</h3>
                <p className="text-[11px] text-muted-foreground">Items issued by other showrooms to your terminal</p>
              </div>
              {inItems.length > 0 && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold px-2 py-0 text-[10px] border border-emerald-200 dark:border-emerald-800">
                  {inItems.length} Pending
                </Badge>
              )}
            </div>

            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-b-2xl rounded-t-none overflow-hidden flex flex-col min-h-[400px]">
              <CardContent className="p-0 flex-1 overflow-hidden relative min-h-[400px]">
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide scroll-smooth">
                  <Table className="relative border-separate border-spacing-0">
                    <TableHeader className="bg-slate-50 dark:bg-slate-950/50 sticky top-0 z-10">
                      <TableRow>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] pl-6 h-12">Product</TableHead>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] text-center h-12">Qty</TableHead>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] text-right h-12 pr-6">From Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inItems.length === 0 ? (
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                          <TableCell colSpan={3} className="h-64 text-center border-none">
                            <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                              <Package className="h-10 w-10 opacity-20" />
                              <p className="font-medium text-sm">No incoming transfers at the moment</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        inItems.map((item) => (
                          <TableRow
                            key={item.id}
                            className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                          >
                            <TableCell className="py-4 pl-6 font-bold text-sm tracking-tight">{item.name}</TableCell>
                            <TableCell className="py-4 text-center">
                              <Badge variant="outline" className="font-bold border-emerald-200 text-emerald-600 dark:border-emerald-900 dark:text-emerald-500">
                                {item.qty}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 text-right pr-6 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">
                              {item.from || "UNKNOWN"}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-border/50 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
                <Button 
                  disabled={inItems.length === 0}
                  onClick={() => handlePrint('Stock Receive')}
                  className="h-10 rounded-xl font-bold uppercase tracking-wider text-[10px] gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg px-6"
                >
                  <Printer className="h-4 w-4" />
                  Receive & Print Bill
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="out" className="flex-1 flex flex-col gap-4 min-h-0 data-[state=inactive]:hidden">
          <div className="flex justify-between items-center px-2 flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Outgoing Shipments</h2>
              <p className="text-xs text-muted-foreground">Issue and transfer stock to other locations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
            <Card className="lg:col-span-4 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col max-h-[500px]">
              <CardHeader className="bg-slate-50 dark:bg-slate-950/50 pb-6 border-b border-border/50 flex-shrink-0">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                  Issue Entry
                </CardTitle>
                <CardDescription>Enter details of stock being issued</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Barcode</Label>
                  <Input 
                    placeholder="Scan barcode..." 
                    value={outForm.barcode}
                    onChange={e => setOutForm({...outForm, barcode: e.target.value})}
                    className="rounded-xl border-border h-11 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Name</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Select product..." 
                      value={outForm.name}
                      readOnly
                      onClick={() => setProductModalOpen(true)}
                      className="rounded-xl border-border h-11 bg-slate-50 dark:bg-slate-950 flex-1 cursor-pointer"
                    />
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl" onClick={() => setProductModalOpen(true)}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quantity</Label>
                    <div className="flex items-center bg-slate-50 dark:bg-slate-950 rounded-xl p-0.5 border border-border h-11 w-full">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-7 rounded-lg"
                        onClick={() => setOutForm(prev => ({...prev, qty: Math.max(1, prev.qty - 1)}))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input 
                        type="number" 
                        value={outForm.qty}
                        onChange={e => setOutForm({...outForm, qty: parseInt(e.target.value) || 1})}
                        className="h-9 w-full border-0 bg-transparent text-center focus-visible:ring-0 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0" 
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-7 rounded-lg"
                        onClick={() => setOutForm(prev => ({...prev, qty: prev.qty + 1}))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Destination</Label>
                    <Select value={outForm.destination} onValueChange={(v) => setOutForm({...outForm, destination: v})}>
                      <SelectTrigger className="h-11 rounded-xl border-border bg-slate-50 dark:bg-slate-950">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="terminal-mr02">TERMINAL MR02</SelectItem>
                        <SelectItem value="main-store">Main Store</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addOutItem} className="w-full h-11 rounded-xl font-bold uppercase tracking-wider text-[11px] gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white shadow-lg shadow-primary/20">
                  <Plus className="h-4 w-4" />
                  Add to List
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-8 border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col max-h-[500px]">
              <CardHeader className="bg-slate-50 dark:bg-slate-950/50 py-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0 flex-shrink-0">
                <div>
                  <CardTitle className="text-base font-bold">Issue List</CardTitle>
                  <CardDescription className="text-[11px]">Items ready to be issued out</CardDescription>
                </div>
                {outItems.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-bold px-3 border border-primary/20">
                    {outItems.length} Items Added
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden relative min-h-[300px]">
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide scroll-smooth">
                  <Table className="relative border-separate border-spacing-0">
                    <TableHeader className="bg-slate-50 dark:bg-slate-950/50 sticky top-0 z-10">
                      <TableRow>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] pl-6 h-12">Product</TableHead>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] text-center h-12">Qty</TableHead>
                        <TableHead className="font-bold uppercase tracking-wider text-[10px] text-center h-12">Destination</TableHead>
                        <TableHead className="w-[80px] h-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outItems.length === 0 ? (
                        <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                          <TableCell colSpan={4} className="h-64 text-center border-none hover:bg-transparent dark:hover:bg-transparent">
                            <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                              <ArrowUpRight className="h-10 w-10 opacity-20" />
                              <p className="font-medium text-sm">No items to issue yet</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        outItems.map((item) => (
                          <TableRow
                            key={item.id}
                            className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                          >
                            <TableCell className="py-4 pl-6">
                              <div>
                                <p className="font-bold text-sm tracking-tight">{item.name}</p>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.barcode}</p>
                              </div>
                            </TableCell>
                            <TableCell className="py-4 text-center">
                              <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5">
                                {item.qty}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 text-center">
                              <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5">
                                {item.destination?.replace('-', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 pr-6 text-right">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                onClick={() => removeItem(item.id, 'out')}
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
              </CardContent>
              <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-t border-border/50 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
                <Button 
                  disabled={outItems.length === 0}
                  onClick={() => handlePrint('Stock Issue')}
                  className="h-11 rounded-xl font-bold uppercase tracking-wider text-[11px] gap-2 bg-slate-900 dark:bg-slate-700 text-white shadow-lg px-8 hover:bg-slate-800"
                >
                  <Printer className="h-4 w-4" />
                  Issue & Print List
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={historyModalOpen} onOpenChange={(open) => {
        if (!open) {
          setReceiveWorkflowStep(1);
          setHistoryModalOpen(false);
        }
      }}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-[85vw] md:max-w-[700px] p-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-200"
        >
          {receiveWorkflowStep === 1 && (
            <>
              <DialogHeader className="p-8 pb-4">
                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Transfer History</DialogTitle>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Review recent incoming stock transfers.</p>
              </DialogHeader>
              <div className="px-8 pb-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase">Transfer ID</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase">From</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase">Items</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_HISTORY.map(history => (
                      <TableRow 
                        key={history.id}
                        className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedHistoryItem(history);
                          // Create a copy of inItems for adjustment
                          setAdjustedItems([...inItems]);
                          setReceiveWorkflowStep(2);
                        }}
                      >
                        <TableCell className="font-mono text-xs">{history.id}</TableCell>
                        <TableCell className="font-bold">{history.from}</TableCell>
                        <TableCell>{history.items} Items</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className={history.status === 'Received' ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200/50' : 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200/50'}>
                            {history.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {receiveWorkflowStep === 2 && (
            <div className="p-8 space-y-8 animate-in slide-in-from-right duration-300">
              <div className="space-y-2 text-center text-slate-900 dark:text-slate-200">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold">Items Fully Received?</h3>
                <p className="text-slate-500 dark:text-slate-400">Did you receive all items matching the shipment?</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => setReceiveWorkflowStep(1)}
                >
                  Go Back
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-500 font-bold hover:bg-amber-50 dark:hover:bg-amber-950/20"
                  onClick={() => {
                    setAdjustedItems(JSON.parse(JSON.stringify(inItems)));
                    setReceiveWorkflowStep(2.5);
                  }}
                >
                  No, Adjust Qty
                </Button>
                <Button 
                  className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold"
                  onClick={() => {
                    setAdjustedItems(JSON.parse(JSON.stringify(inItems)));
                    setReceiveWorkflowStep(3);
                  }}
                >
                  Yes, All Good
                </Button>
              </div>
            </div>
          )}

          {receiveWorkflowStep === 2.5 && (
            <div className="flex flex-col h-[500px]">
              <DialogHeader className="p-8 pb-4 flex-shrink-0">
                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Adjust Quantities</DialogTitle>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Update the quantities received for each item.</p>
              </DialogHeader>
              <div className="px-8 pb-4 flex-1 overflow-y-auto scrollbar-hide">
                <Table>
                  <TableHeader className="sticky top-0 bg-white dark:bg-[#0f172a] z-10">
                    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase">Product</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase text-center w-[150px]">Received Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adjustedItems.map(item => (
                      <TableRow key={item.id} className="border-slate-100 dark:border-slate-800/50">
                        <TableCell className="font-bold py-4 text-slate-900 dark:text-slate-200">{item.name}</TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-md text-slate-500"
                              onClick={() => updateAdjustedQty(item.id, -1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="w-10 text-center font-bold text-sm text-slate-900 dark:text-slate-200">{item.qty}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-md text-slate-500"
                              onClick={() => updateAdjustedQty(item.id, 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-8 pt-4 flex-shrink-0">
                <Button 
                  onClick={() => setReceiveWorkflowStep(3)}
                  className="w-full h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-black uppercase tracking-widest shadow-xl"
                >
                  Done, Verify Receipt
                </Button>
              </div>
            </div>
          )}

          {receiveWorkflowStep === 3 && (
            <div className="p-8 space-y-8 animate-in slide-in-from-right duration-300">
              <div className="space-y-2 text-center text-slate-900 dark:text-slate-200">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowDownLeft className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold">Update Inventory</h3>
                <p className="text-slate-500 dark:text-slate-400">Add these {adjustedItems.length} items to your local stock?</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 max-h-[200px] overflow-y-auto scrollbar-hide">
                <Table>
                  <TableBody>
                    {adjustedItems.map(item => (
                      <TableRow key={item.id} className="border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-transparent">
                        <TableCell className="py-2 font-medium">{item.name}</TableCell>
                        <TableCell className="py-2 text-right">
                          <Badge variant="outline" className="font-bold">{item.qty}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => setReceiveWorkflowStep(2)}
                >
                  Go Back
                </Button>
                <Button 
                  className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold"
                  onClick={() => setReceiveWorkflowStep(4)}
                >
                  Yes, Add to Inventory
                </Button>
              </div>
            </div>
          )}

          {receiveWorkflowStep === 4 && (
            <div className="p-0 flex flex-col h-[70vh] animate-in slide-in-from-right duration-300">
              <div className="p-8 pb-4 text-slate-900 dark:text-slate-200 flex-shrink-0">
                <h3 className="text-2xl font-bold">Print Barcodes</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Print individual labels for each received item.</p>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 py-4 scrollbar-hide scroll-smooth">
                <div className="space-y-3 pb-4">
                  {adjustedItems.map(item => (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-200">{item.name}</p>
                        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.barcode || 'NO-BARCODE'} • {item.qty} units</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        disabled={item.qty === 0}
                        className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white gap-2 font-bold text-[10px] uppercase tracking-wider"
                        onClick={() => toast.success(`Printing ${item.qty} barcodes for ${item.name}`)}
                      >
                        <Barcode className="h-3.5 w-3.5" />
                        Print Barcode
                      </Button>
                    </div>
                  ))}
                  {adjustedItems.length === 0 && (
                    <div className="h-64 flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <Package className="h-10 w-10 opacity-20" />
                      <p className="font-medium text-sm">No items to print barcodes for</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/80 mt-auto flex-shrink-0">
                <Button 
                  className="w-full h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-black uppercase tracking-widest"
                  onClick={() => {
                    setHistoryModalOpen(false);
                    setReceiveWorkflowStep(1);
                    setInItems([]);
                    toast.success("Stock receipt process completed!");
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent 
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="sm:max-w-[90vw] md:max-w-[850px] lg:max-w-[1000px] h-[80vh] flex flex-col p-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-200"
        >
          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Select Product</DialogTitle>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Browse by category or search for a specific product.</p>
          </DialogHeader>
          
          <div className="flex-1 flex overflow-hidden px-8 pb-8 gap-8">
            <div className="w-48 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Categories</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === null 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 rounded-xl focus:ring-slate-200 dark:focus:ring-slate-700 focus:border-slate-200 dark:focus:border-slate-700"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-wider text-right">Price</TableHead>
                      <TableHead className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-wider text-right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map(product => (
                      <TableRow 
                        key={product.id}
                        className="border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer group transition-colors"
                        onClick={() => {
                          setOutForm(prev => ({...prev, name: product.name, barcode: product.barcode}));
                          setProductModalOpen(false);
                          toast.success(`Selected: ${product.name}`);
                        }}
                      >
                        <TableCell className="py-4">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors">{product.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{product.category}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <p className="font-bold text-slate-900 dark:text-slate-200">₹{product.sellingPrice}</p>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <p className="font-bold text-slate-500 dark:text-slate-400">{product.stock}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredProducts.length === 0 && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={3} className="h-64 text-center border-none">
                          <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                            <Package className="h-12 w-12 opacity-20" />
                            <p className="font-bold tracking-tight">No products found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/30 dark:bg-slate-900/30">
            <Button 
              variant="outline" 
              onClick={() => setProductModalOpen(false)}
              className="px-8 h-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-bold"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
