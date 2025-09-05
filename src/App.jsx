import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Purchase from './pages/Purchase';
import Returns from './pages/Returns';
import MainDashboard from './pages/MainDashboard'; 
import './App.css';
import CreateCategory from './pages/CreateCategory';
import UserProfile from './pages/MyProfile';
import AllUser from './pages/UserList';
import CreateProductsPage from './pages/CreateProductsPage';
import CreateBrand from './pages/CreateBrand';
import CurrentStock from './pages/CurrentStock';
import StockMovements from './pages/StockMovements';
import ExpiryDamage from './pages/ExpiryDamage';
import StockReport from './pages/StockReport';
import BestProducts from './pages/Reports/BestProducts';
import DateOver from './pages/Reports/DateOver';
import LowQuantity from './pages/Reports/LowQuantity';
import ProfitLoss from './pages/Reports/ProfitLoss';
import SalesReports from './pages/Reports/SalesReports';
import Templates from './pages/Reports/templates';
import MyProfile from './pages/MyProfile';
import UserList from './pages/UserList';
import EmployeeList from './pages/HR/EmployeeList';
import Attendance from './pages/HR/attendance';

// Inventory sub pages


function App() {
  const [activeMenu, setActiveMenu] = useState('main-dashboard');
  
  // Products state
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
    }
  ]);

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: 'Smartphones', description: 'Mobile phones', productCount: 0, createdDate: '2024-01-15' },
    { id: 2, name: 'Laptops', description: 'Portable computers', productCount: 0, createdDate: '2024-01-10' },
  ]);

  // Brands state
  const [brands, setBrands] = useState([
    { id: 1, name: 'Apple', productCount: 0, createdDate: '2024-01-15' },
    { id: 2, name: 'Samsung', productCount: 0, createdDate: '2024-01-10' }
  ]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleProductCreate = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    setCategories(prev => prev.map(cat => 
      cat.name === newProduct.category ? { ...cat, productCount: cat.productCount + 1 } : cat
    ));
    setBrands(prev => prev.map(brand => 
      brand.name === newProduct.brand ? { ...brand, productCount: brand.productCount + 1 } : brand
    ));
    setActiveMenu('products');
  };

  const handleCategoryCreate = (newCategory) => {
    setCategories(prev => [newCategory, ...prev]);
  };

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
        case 'EmployeeList':
          return <EmployeeList />;
        case 'attendance':
          return <Attendance />;
        case 'products':
          return (
            <Products 
              products={products}
              setProducts={setProducts}
              onNavigateToCreate={() => setActiveMenu('CreateProductsPage')}
            />
          );

        // Inventory main menu (submenu buttons)
        

        case 'currentStock':
          return <CurrentStock />;
        case 'stockMovements':
          return <StockMovements />;
        case 'expiryDamage':
          return <ExpiryDamage />;
        case 'stockReport':
          return <StockReport />;

        case 'purchase':
          return <Purchase />;
        case 'returns':
          return <Returns />;
        // case 'reports':
        //   return <Reports />;
        case 'BestProducts':
         return <BestProducts />;
        case 'DateOver':
         return <DateOver />;
        case 'LowQuantity':
         return <LowQuantity />;
        case 'ProfitLoss':
         return <ProfitLoss />;
        case 'SalesReports':
         return <SalesReports />;
        case 'Templates':
         return <Templates />;


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
        case 'MyProfile':
          return <MyProfile />;
        case 'UserList':
          return <UserList />;
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
