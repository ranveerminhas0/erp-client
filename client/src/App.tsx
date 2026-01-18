import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import DailyBook from "@/pages/DailyBook";
import Billing from "@/pages/billing";
import Inventory from "@/pages/inventory";
import StockTransfer from "@/pages/stock-transfer";
import Accounts from "@/pages/accounts";
import NotFound from "@/pages/not-found";
import PriceList from "@/pages/price-list";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";
import InvoiceList from "@/pages/invoice-list";
import StockMaster from "@/pages/stock-master";

import LoginPage from "@/pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/daily-book" component={DailyBook} />
            <Route path="/inventory">
              <Inventory />
            </Route>
            <Route path="/billing" component={Billing} />
            <Route path="/invoice-list" component={InvoiceList} />
            <Route path="/stock-transfer" component={StockTransfer} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/price-list" component={PriceList} />
            <Route path="/stock-master" component={StockMaster} />
            <Route path="/reports" component={Reports} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
