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
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderPage = () => {
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
    <AuthProvider>
      <ProtectedRoute>
        <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          {renderPage()}
        </Layout>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

