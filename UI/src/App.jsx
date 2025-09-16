import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales/Sales";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase/Purchase";
import Returns from "./pages/Returns";
import Reports from "./pages/Reports";
import MainDashboard from "./pages/MainDashboard";
import CreateCategory from "./pages/CreateCategory";
import UserProfile from "./pages/MyProfile";
import UserList from "./pages/UserList";
import CreateProductsPage from "./pages/CreateProductsPage";
import CreateBrand from "./pages/CreateBrand";
import CurrentStock from "./pages/Inventory/CurrentStock";
import StockMovements from "./pages/Inventory/StockMovements";
import ExpiryDamage from "./pages/Inventory/ExpiryDamage";
import StockReport from "./pages/Inventory/StockReport";

// Reports Subpages
import BestProducts from "./pages/Reports/BestProducts";
import DateOver from "./pages/Reports/DateOver";
import LowQuantity from "./pages/Reports/InventoryReports";
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

function App() {
  // State management (still kept here)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      category: "Smartphones",
      brand: "Apple",
      purchasePrice: 85000,
      sellingPrice: 99900,
      stock: 25,
      reorderLevel: 10,
      status: "In Stock",
      description: "Latest iPhone with Pro camera system",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      category: "Smartphones",
      brand: "Samsung",
      purchasePrice: 75000,
      sellingPrice: 89900,
      stock: 15,
      reorderLevel: 12,
      status: "In Stock",
      description: "Premium Android smartphone",
    },
  ]);
  
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Smartphones",
      description: "Mobile phones",
      productCount: 0,
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Laptops",
      description: "Portable computers",
      productCount: 0,
      createdDate: "2024-01-10",
    },
  ]);

  const [brands, setBrands] = useState([
    { id: 1, name: "Apple", productCount: 0, createdDate: "2024-01-15" },
    { id: 2, name: "Samsung", productCount: 0, createdDate: "2024-01-10" },
  ]);

  const handleProductCreate = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === newProduct.category
          ? { ...cat, productCount: cat.productCount + 1 }
          : cat
      )
    );
    setBrands((prev) =>
      prev.map((brand) =>
        brand.name === newProduct.brand
          ? { ...brand, productCount: brand.productCount + 1 }
          : brand
      )
    );
  };

  const handleCategoryCreate = (newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
  };

  const handleBrandCreate = (newBrand) => {
    setBrands((prev) => [newBrand, ...prev]);
  };

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
            <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />

            {/* Purchase */}
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/goods-receiving" element={<GoodsReceiving />} />

            {/* Account */}
            <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
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

            <Route path="/returns" element={<Returns />} />

            {/* Inventory */}
            <Route path="/current-stock" element={<CurrentStock />} />
            <Route path="/stock-transactions" element={<StockMovements />} />
            <Route path="/expiry-damage" element={<ExpiryDamage />} />
            <Route path="/stock-report" element={<StockReport />} />
            <Route path="/warehouses" element={<Warehouses />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/best-products" element={<BestProducts />} />
            <Route path="/reports/date-over" element={<DateOver />} />
            <Route path="/reports/InventoryReports" element={<InventoryReports />} />
            <Route path="/reports/profit-loss" element={<ProfitLoss />} />
            <Route path="/reports/sales-reports" element={<SalesReports />} />
            <Route path="/reports/templates" element={<Templates />} />
            <Route path="/reports/HRReports" element={<HRReports />} />
            <Route path="/reports/FinanceReports" element={<FinanceReports />} />

            {/* Create Pages */}
            <Route
              path="/create-category"
              element={
                <CreateCategory
                  categories={categories}
                  setCategories={setCategories}
                  onCategoryCreate={handleCategoryCreate}
                />
              }
            />
            <Route
              path="/create-brand"
              element={
                <CreateBrand
                  brands={brands}
                  setBrands={setBrands}
                  onBrandCreate={handleBrandCreate}
                />
              }
            />
            <Route
              path="/create-product"
              element={
                <CreateProductsPage
                  onProductCreate={handleProductCreate}
                  categories={categories}
                  brands={brands}
                />
              }
            />

            {/* Security */}
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/Security/RolesPermissions" element={<RolesPermissions />} />
            <Route path="/Security/AuditLogs" element={<AuditLogs />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          {/* Fallback → main-dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
