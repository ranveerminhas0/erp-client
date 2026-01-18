import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText, 
  BookOpen, 
  Package, 
  ArrowRightLeft, 
  CreditCard, 
  ClipboardList,
  ShoppingCart
} from "lucide-react";

interface ReportItem {
  id: string;
  title: string;
  description: string;
  icon: any;
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: "sale" | "voucher" | "stock" | "transfer" | "account" | "system";
  action: string;
  details: string;
  user: string;
}

const reports: ReportItem[] = [
  {
    id: "daily-sales",
    title: "Today's Sale Report",
    description: "Complete sales summary including all transactions, totals, and payment methods",
    icon: ShoppingCart
  },
  {
    id: "daily-book",
    title: "Today's Daily Book Report",
    description: "All cash and credit entries recorded in the daily book",
    icon: BookOpen
  },
  {
    id: "items-sold",
    title: "Today's Item Sold Report",
    description: "Detailed list of all items sold with quantities and prices",
    icon: Package
  },
  {
    id: "stock-transfer",
    title: "Today's Stock Transfer Report",
    description: "All stock movements between showrooms",
    icon: ArrowRightLeft
  },
  {
    id: "customer-credit",
    title: "Today's Customer Credit Report",
    description: "Outstanding credit balances and new credit transactions",
    icon: CreditCard
  },
  {
    id: "activity-log",
    title: "Today's Log Report",
    description: "Complete activity log of all system operations",
    icon: ClipboardList
  }
];

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "09:15:23 AM",
    type: "sale",
    action: "Sale Completed",
    details: "Invoice #INV-2026-0142 - ₹4,250.00 - 3 items sold to Walk-in Customer",
    user: "Ranveer"
  },
  {
    id: "2",
    timestamp: "09:32:45 AM",
    type: "voucher",
    action: "Payment Voucher Issued",
    details: "Voucher #PV-0089 - ₹15,000.00 issued to Supplier: Steel Traders",
    user: "Admin"
  },
  {
    id: "3",
    timestamp: "09:45:12 AM",
    type: "stock",
    action: "Stock Updated",
    details: "Pressure Cooker 5L - Quantity reduced from 45 to 42 (3 sold)",
    user: "System"
  },
  {
    id: "4",
    timestamp: "10:08:33 AM",
    type: "transfer",
    action: "Stock Transfer Initiated",
    details: "Transfer #TRF-0034 - 20 items from Showroom 1 to Showroom 2",
    user: "Ranveer"
  },
  {
    id: "5",
    timestamp: "10:22:18 AM",
    type: "sale",
    action: "Sale Completed",
    details: "Invoice #INV-2026-0143 - ₹12,800.00 - 8 items sold to Sharma Electronics",
    user: "Ranveer"
  },
  {
    id: "6",
    timestamp: "10:45:00 AM",
    type: "account",
    action: "New Account Created",
    details: "Customer account created: Gupta Kitchen Supplies - Credit Limit: ₹50,000",
    user: "Admin"
  },
  {
    id: "7",
    timestamp: "11:02:55 AM",
    type: "voucher",
    action: "Receipt Voucher Issued",
    details: "Voucher #RV-0156 - ₹8,500.00 received from Customer: Patel Traders",
    user: "Ranveer"
  },
  {
    id: "8",
    timestamp: "11:18:30 AM",
    type: "stock",
    action: "Stock Adjusted",
    details: "Non-Stick Pan Set - Manual adjustment: +5 units (Damaged goods returned)",
    user: "Admin"
  },
  {
    id: "9",
    timestamp: "11:35:42 AM",
    type: "transfer",
    action: "Stock Transfer Completed",
    details: "Transfer #TRF-0034 - Received and verified at Showroom 2",
    user: "System"
  },
  {
    id: "10",
    timestamp: "11:52:15 AM",
    type: "sale",
    action: "Sale Completed",
    details: "Invoice #INV-2026-0144 - ₹2,150.00 - 2 items sold to Walk-in Customer",
    user: "Ranveer"
  },
  {
    id: "11",
    timestamp: "12:05:08 PM",
    type: "system",
    action: "Daily Backup Created",
    details: "Automatic backup completed - 234 records saved",
    user: "System"
  },
  {
    id: "12",
    timestamp: "12:30:00 PM",
    type: "account",
    action: "Credit Limit Updated",
    details: "Customer: Sharma Electronics - Credit limit increased from ₹25,000 to ₹40,000",
    user: "Admin"
  },
  {
    id: "13",
    timestamp: "01:15:22 PM",
    type: "sale",
    action: "Sale Completed",
    details: "Invoice #INV-2026-0145 - ₹6,750.00 - 5 items sold to Kumar Appliances",
    user: "Ranveer"
  },
  {
    id: "14",
    timestamp: "01:42:33 PM",
    type: "voucher",
    action: "Credit Note Issued",
    details: "Credit Note #CN-0023 - ₹1,200.00 to Customer: Walk-in (Return)",
    user: "Ranveer"
  },
  {
    id: "15",
    timestamp: "02:00:45 PM",
    type: "stock",
    action: "Low Stock Alert",
    details: "Stainless Steel Kadai - Current stock: 3 units (Below minimum: 10)",
    user: "System"
  }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("reports");

  const handleDownload = (reportId: string, reportTitle: string) => {
    console.log(`Downloading ${reportTitle}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-page-title">
          Reports & Logs
        </h1>
        <p className="text-muted-foreground mt-1">
          Download reports and view system activity logs
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2" data-testid="tabs-reports-logs">
          <TabsTrigger value="reports" data-testid="tab-reports">
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="logs" data-testid="tab-logs">
            <ClipboardList className="w-4 h-4 mr-2" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-6">
          <div className="flex flex-col gap-3">
            {reports.map((report) => (
              <Card 
                key={report.id} 
                className="border-border/50 shadow-sm bg-white dark:bg-slate-900 hover:shadow-md transition-all rounded-xl"
                data-testid={`card-report-${report.id}`}
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                  <Button
                    onClick={() => handleDownload(report.id, report.title)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
                    data-testid={`button-download-${report.id}`}
                  >
                    <Download className="w-5 h-5 text-primary" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card className="border-border/50 shadow-sm bg-white dark:bg-slate-900 rounded-xl">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg">Activity Log</CardTitle>
              <CardDescription>
                Real-time log of all system activities for today
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[450px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <table className="w-full">
                  <thead className="sticky top-0 bg-muted/50 dark:bg-slate-800/80 backdrop-blur-sm">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 w-28">Time</th>
                      <th className="px-4 py-3 w-24">Type</th>
                      <th className="px-4 py-3 w-44">Action</th>
                      <th className="px-4 py-3">Details</th>
                      <th className="px-4 py-3 w-24 text-right">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {mockLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-muted/30 dark:hover:bg-slate-800/40 transition-colors"
                        data-testid={`log-entry-${log.id}`}
                      >
                        <td className="px-4 py-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground capitalize">
                          {log.type}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {log.action}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-md">
                          {log.details}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground text-right">
                          {log.user}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
