import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Purchase from './pages/Purchase';
import Returns from './pages/Returns';
import Reports from './pages/Reports';
import MainDashboard from './pages/MainDashboard'; 
import './App.css';
import CreateCategory from './pages/CreateCategory';
import UserProfile from './pages/UserProfile';
import AllUser from './pages/AllUser';
import CreateProductsPage from './pages/CreateProductsPage';
import CreateBrand from './pages/CreateBrand';

function App() {
  const [activeMenu, setActiveMenu] = useState('main-dashboard');
  
  // Products state - এটা CreateProductsPage এবং Products page এর মধ্যে share হবে
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      brand: 'Apple',
      purchasePrice: 85000,
      sellingPrice: 99900,
      stock: 25,
      reorderLevel: 10,
      status: 'In Stock',
      description: 'Latest iPhone with Pro camera system'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Smartphones',
      brand: 'Samsung',
      purchasePrice: 75000,
      sellingPrice: 89900,
      stock: 15,
      reorderLevel: 12,
      status: 'In Stock',
      description: 'Premium Android smartphone'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      category: 'Laptops',
      brand: 'Apple',
      purchasePrice: 100000,
      sellingPrice: 119900,
      stock: 8,
      reorderLevel: 5,
      status: 'In Stock',
      description: 'Lightweight laptop with M2 chip'
    },
    {
      id: 4,
      name: 'AirPods Pro',
      category: 'Accessories',
      brand: 'Apple',
      purchasePrice: 20000,
      sellingPrice: 24900,
      stock: 3,
      reorderLevel: 15,
      status: 'Low Stock',
      description: 'Wireless earbuds with noise cancellation'
    }
  ]);

  // Shared state for categories
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Smartphones', 
      description: 'Mobile phones and accessories',
      productCount: 0,
      createdDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Laptops', 
      description: 'Portable computers and notebooks',
      productCount: 0,
      createdDate: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Tablets', 
      description: 'Tablet devices and iPad',
      productCount: 0,
      createdDate: '2024-01-08'
    },
    { 
      id: 4, 
      name: 'Accessories', 
      description: 'Electronic accessories and peripherals',
      productCount: 0,
      createdDate: '2024-01-05'
    },
    { 
      id: 5, 
      name: 'Wearables', 
      description: 'Smart watches and fitness trackers',
      productCount: 0,
      createdDate: '2024-01-03'
    }
  ]);

  // Shared state for brands
  const [brands, setBrands] = useState([
    { id: 1, name: 'Apple', productCount: 0, createdDate: '2024-01-15' },
    { id: 2, name: 'Samsung', productCount: 0, createdDate: '2024-01-10' },
    { id: 3, name: 'Google', productCount: 0, createdDate: '2024-01-08' },
    { id: 4, name: 'Dell', productCount: 0, createdDate: '2024-01-05' },
    { id: 5, name: 'Xiaomi', productCount: 0, createdDate: '2024-01-03' }
  ]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // Product create করার function
  const handleProductCreate = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    
    // Update category product count
    setCategories(prev => prev.map(cat => 
      cat.name === newProduct.category 
        ? { ...cat, productCount: cat.productCount + 1 }
        : cat
    ));
    
    // Update brand product count
    setBrands(prev => prev.map(brand => 
      brand.name === newProduct.brand 
        ? { ...brand, productCount: brand.productCount + 1 }
        : brand
    ));

    // Product create করার পর Products page এ redirect
    setActiveMenu('products');
  };

  // Handle category creation
  const handleCategoryCreate = (newCategory) => {
    setCategories(prev => [newCategory, ...prev]);
  };

  // Handle brand creation
  const handleBrandCreate = (newBrand) => {
    setBrands(prev => [newBrand, ...prev]);
  };

  const renderPage = () => {
    if (activeMenu === 'main-dashboard') {
      return <MainDashboard onMenuClick={handleMenuClick} />;
    }

    const pageToRender = () => {
      switch (activeMenu) {
        case 'dashboard':
          return <Dashboard />;
        case 'sales':
          return <Sales />;
        case 'products':
          return (
            <Products 
              products={products}
              setProducts={setProducts}
              onNavigateToCreate={() => setActiveMenu('CreateProductsPage')}
            />
          );
        case 'inventory':
          return <Inventory />;
        case 'purchase':
          return <Purchase />;
        case 'returns':
          return <Returns />;
        case 'reports':
          return <Reports />;
        case 'createCategory':
          return (
            <CreateCategory 
              categories={categories}
              setCategories={setCategories}
              onCategoryCreate={handleCategoryCreate}
              onNavigateBack={() => setActiveMenu('main-dashboard')}
            />
          );
        case 'CreateBrand':
          return (
            <CreateBrand 
              brands={brands}
              setBrands={setBrands}
              onBrandCreate={handleBrandCreate}
              onNavigateBack={() => setActiveMenu('main-dashboard')}
            />
          );
        case 'CreateProductsPage':
          return (
            <CreateProductsPage 
              onProductCreate={handleProductCreate}
              onNavigateBack={() => setActiveMenu('products')}
              categories={categories}
              brands={brands}
            />
          );
        case 'UserProfile':
          return <UserProfile />;
        case 'AllUser':
          return <AllUser />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
        {pageToRender()}
      </Layout>
    );
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        {renderPage()}
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

