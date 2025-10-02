import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales/Sales";
import Purchase from "./pages/Purchase/Purchase";
import MainDashboard from "./pages/MainDashboard";
import UserProfile from "./pages/Security/MyProfile";
import UserList from "./pages/Security/UserList";
import CurrentStock from "./pages/Inventory/CurrentStock";
import StockMovements from "./pages/Inventory/StockMovements";
import ExpiryDamage from "./pages/Inventory/ExpiryDamage";
import StockReport from "./pages/Inventory/StockReport";

// Reports Subpages
import BestProducts from "./pages/Reports/BestProducts";
import DateOver from "./pages/Reports/DateOver";
import ProfitLoss from "./pages/Reports/ProfitLoss";
import SalesReports from "./pages/Reports/SalesReports";
import Templates from "./pages/Reports/templates";

// HR
import EmployeeList from "./pages/HR/EmployeeList";

import "./App.css";
import LoginPage from "./components/LoginPage";
import Warehouses from "./pages/Inventory/Warehouses";
import Invoices from "./pages/Sales/Invoices";
import SalesOrders from "./pages/Sales/SalesOrders";
import Customers from "./pages/Sales/Customers";
import Suppliers from "./pages/Purchase/Suppliers";
import PurchaseOrders from "./pages/Purchase/PurchaseOrders";
import GoodsReceiving from "./pages/Purchase/GoodsReceiving";
import ChartOfAccounts from "./pages/Account/ChartOfAccounts";
import JournalEntries from "./pages/Account/JournalEntries";
import PaymentsReceipts from "./pages/Account/PaymentsReceipts";
import AccountReports from "./pages/Account/AccountReports";
import Leads from "./pages/CRM/Leads";
import Opportunities from "./pages/CRM/Opportunities";
import SupportTickets from "./pages/CRM/SupportTickets";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Projects/Tasks";
import EmployeeAttendance from "./pages/HR/Attendance";
import LeaveManagement from "./pages/HR/LeaveManagement";
import RolesPermissions from "./pages/Security/RolesPermissions";
import AuditLogs from "./pages/Security/AuditLogs";
import InventoryReports from "./pages/Reports/InventoryReports";
import HRReports from "./pages/Reports/HRReports";
import FinanceReports from "./pages/Reports/FinanceReports";
import EmployeeSalaryList from "./pages/HR/EmployeeSalaryList";
import AccountTypes from "./pages/Account/AccountTypes";
import Register from "./components/Register";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root → main-dashboard (outside layout) */}
           {/* ✅ Main Dashboard outside Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />

          {/* Protected + Layout wrapper */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Main Routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Inventory */}
            <Route path="/sales" element={<Sales />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales-orders" element={<SalesOrders />} />
            <Route path="/invoices" element={<Invoices />} />

            {/* HR */}
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/Attendance" element={<EmployeeAttendance />} />
            <Route path="/LeaveManagement" element={<LeaveManagement />} />
            <Route path="/EmployeeSalaryList" element={<EmployeeSalaryList />} />

            {/* Purchase */}
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/goods-receiving" element={<GoodsReceiving />} />

            {/* Account */}
            <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
            <Route path="/account-types" element={<AccountTypes />} />
            <Route path="/journal-entries" element={<JournalEntries />} />
            <Route path="/payments-receipts" element={<PaymentsReceipts />} />
            <Route path="/account-reports" element={<AccountReports />} />

            {/* CRM */}
            <Route path="/leads" element={<Leads />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/support-tickets" element={<SupportTickets />} />

            {/* Projects */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />

            {/* Inventory */}
            <Route path="/current-stock" element={<CurrentStock />} />
            <Route path="/stock-transactions" element={<StockMovements />} />
            <Route path="/expiry-damage" element={<ExpiryDamage />} />
            <Route path="/stock-report" element={<StockReport />} />
            <Route path="/warehouses" element={<Warehouses />} />

            {/* Reports */}
            <Route path="/reports/best-products" element={<BestProducts />} />
            <Route path="/reports/date-over" element={<DateOver />} />
            <Route path="/reports/InventoryReports" element={<InventoryReports />} />
            <Route path="/reports/profit-loss" element={<ProfitLoss />} />
            <Route path="/reports/sales-reports" element={<SalesReports />} />
            <Route path="/reports/templates" element={<Templates />} />
            <Route path="/reports/HRReports" element={<HRReports />} />
            <Route path="/reports/FinanceReports" element={<FinanceReports />} />

            {/* Security */}
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/Security/RolesPermissions" element={<RolesPermissions />} />
            <Route path="/Security/AuditLogs" element={<AuditLogs />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback → main-dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
