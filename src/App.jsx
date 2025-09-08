import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import Returns from "./pages/Returns";
import Reports from "./pages/Reports";
import MainDashboard from "./pages/MainDashboard";
import CreateCategory from "./pages/CreateCategory";
import UserProfile from "./pages/MyProfile";
import UserList from "./pages/UserList";
import CreateProductsPage from "./pages/CreateProductsPage";
import CreateBrand from "./pages/CreateBrand";
import CurrentStock from "./pages/CurrentStock";
import StockMovements from "./pages/StockMovements";
import ExpiryDamage from "./pages/ExpiryDamage";
import StockReport from "./pages/StockReport";

// Reports Subpages
import BestProducts from "./pages/Reports/BestProducts";
import DateOver from "./pages/Reports/DateOver";
import LowQuantity from "./pages/Reports/LowQuantity";
import ProfitLoss from "./pages/Reports/ProfitLoss";
import SalesReports from "./pages/Reports/SalesReports";
import Templates from "./pages/Reports/templates";

// HR
import EmployeeList from "./pages/HR/EmployeeList";

import "./App.css";
import LoginPage from "./components/LoginPage";
import EmployeeAttendance from "./pages/HR/EmployeeAttendance";

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
            <Route path="/sales" element={<Sales />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/attendance" element={<EmployeeAttendance />} />
            <Route
              path="/products"
              element={<Products products={products} setProducts={setProducts} />}
            />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/returns" element={<Returns />} />

            {/* Inventory */}
            <Route path="/current-stock" element={<CurrentStock />} />
            <Route path="/stock-movements" element={<StockMovements />} />
            <Route path="/expiry-damage" element={<ExpiryDamage />} />
            <Route path="/stock-report" element={<StockReport />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/best-products" element={<BestProducts />} />
            <Route path="/reports/date-over" element={<DateOver />} />
            <Route path="/reports/low-quantity" element={<LowQuantity />} />
            <Route path="/reports/profit-loss" element={<ProfitLoss />} />
            <Route path="/reports/sales-reports" element={<SalesReports />} />
            <Route path="/reports/templates" element={<Templates />} />

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

            {/* User */}
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/user-list" element={<UserList />} />
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
