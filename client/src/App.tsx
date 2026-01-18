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
      <Route path="/daily-book">
        <Layout>
          <DailyBook />
        </Layout>
      </Route>
      <Route path="/inventory">
        <Layout>
          <Inventory />
        </Layout>
      </Route>
      <Route path="/billing">
        <Layout>
          <Billing />
        </Layout>
      </Route>
      <Route path="/invoice-list">
        <Layout>
          <InvoiceList />
        </Layout>
      </Route>
      <Route path="/stock-transfer">
        <Layout>
          <StockTransfer />
        </Layout>
      </Route>
      <Route path="/accounts">
        <Layout>
          <Accounts />
        </Layout>
      </Route>
      <Route path="/price-list">
        <Layout>
          <PriceList />
        </Layout>
      </Route>
      <Route path="/stock-master">
        <Layout>
          <StockMaster />
        </Layout>
      </Route>
      <Route path="/reports">
        <Layout>
          <Reports />
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <Settings />
        </Layout>
      </Route>
      <Route path="/">
        <Layout>
          <Dashboard />
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
