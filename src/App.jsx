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

function App() {
  
  const [activeMenu, setActiveMenu] = useState('main-dashboard');

  
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
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
          return <Products />;
        case 'inventory':
          return <Inventory />;
        case 'purchase':
          return <Purchase />;
        case 'returns':
          return <Returns />;
        case 'reports':
          return <Reports />;
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
        {/* renderPage */}
        {renderPage()}
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
