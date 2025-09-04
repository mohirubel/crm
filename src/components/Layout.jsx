import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  FileText,
  LogOut,
  User,
  RotateCcw,
  Menu,
  X,
  FileEditIcon,
  ChevronDown,
  Users,
  Shield,
} from 'lucide-react';

const Layout = ({ children, activeMenu, setActiveMenu }) => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopMenu, setSelectedTopMenu] = useState('dashboard'); // Track which top menu is selected
  
  // Separate state for top menu dropdowns
  const [topProductsOpen, setTopProductsOpen] = useState(false);
  const [topInventoryOpen, setTopInventoryOpen] = useState(false);
  const [topReportsOpen, setTopReportsOpen] = useState(false);
  const [topCreateOpen, setTopCreateOpen] = useState(false);
  const [topHROpen, setTopHROpen] = useState(false);
  const [topSecurityOpen, setTopSecurityOpen] = useState(false);
  
  // Separate state for sidebar dropdowns
  const [sidebarProductsOpen, setSidebarProductsOpen] = useState(false);
  const [sidebarInventoryOpen, setSidebarInventoryOpen] = useState(false);
  const [sidebarReportsOpen, setSidebarReportsOpen] = useState(false);
  const [sidebarCreateOpen, setSidebarCreateOpen] = useState(false);
  const [sidebarHROpen, setSidebarHROpen] = useState(false);
  const [sidebarSecurityOpen, setSidebarSecurityOpen] = useState(false);

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => logout();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleMenuClick = (id) => {
    setActiveMenu(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    // Close all top dropdowns when a menu item is clicked
    setTopProductsOpen(false);
    setTopInventoryOpen(false);
    setTopReportsOpen(false);
    setTopCreateOpen(false);
    setTopHROpen(false);
    setTopSecurityOpen(false);
  };

  const handleTopMenuClick = (menuName) => {
    setSelectedTopMenu(menuName);
    // Open the corresponding sidebar dropdown
    setSidebarProductsOpen(menuName === 'products');
    setSidebarInventoryOpen(menuName === 'inventory');
    setSidebarReportsOpen(menuName === 'reports');
    setSidebarHROpen(menuName === 'hr');
    setSidebarSecurityOpen(menuName === 'security');
  };

  // Define menu structure for easier management
  const menuStructure = {
    dashboard: { icon: LayoutDashboard, label: 'Dashboard' },
    sales: { icon: ShoppingCart, label: 'Sales' },
    products: { 
      icon: Package, 
      label: 'Products',
      submenus: [
        { id: 'products', label: 'All Products' },
        { id: 'CreateProductsPage', label: 'Create Products' },
        { id: 'CreateBrand', label: 'Create Brand' },
        { id: 'createCategory', label: 'Create Category' },
        { id: 'returns', label: 'Return' },
      ]
    },
    inventory: { 
      icon: Warehouse, 
      label: 'Inventory',
      submenus: [
        { id: 'currentStock', label: 'Current Stock' },
        { id: 'expiryDamage', label: 'Expiry & Damage' },
      ]
    },
    purchase: { icon: ShoppingCart, label: 'Purchase' },
    reports: { 
      icon: FileText, 
      label: 'Reports',
      submenus: [
        { id: 'SalesReports', label: 'Sales Reports' },
        { id: 'ProfitLoss', label: 'Profit & Loss' },
        { id: 'BestProducts', label: 'Best Products' },
        { id: 'LowQuantity', label: 'Low Quantity' },
        { id: 'DateOver', label: 'Date Over' },
        { id: 'stockReport', label: 'Stock Report' },
        { id: 'stockMovements', label: 'Stock Movements' },
        { id: 'Templates', label: 'Templates' },
      ]
    },
    hr: { 
      icon: Users, 
      label: 'HR',
      submenus: [
        { id: 'EmployeeList', label: 'Employee List' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'leave', label: 'Leave' },
      ]
    },
    security: { 
      icon: Shield, 
      label: 'Security',
      submenus: [
        { id: 'MyProfile', label: 'My Profile' },
        { id: 'UserList', label: 'User List' },
      ]
    },
  };

  const isMenuActive = (menuKey) => {
    if (menuKey === selectedTopMenu) return true;
    const menu = menuStructure[menuKey];
    if (menu?.submenus) {
      return menu.submenus.some(submenu => submenu.id === activeMenu);
    }
    return activeMenu === menuKey;
  };

  const renderTopMenuItem = (menuKey, hasDropdown = false) => {
    const menu = menuStructure[menuKey];
    if (!menu) return null;

    if (hasDropdown) {
      const isOpen = {
        products: topProductsOpen,
        inventory: topInventoryOpen,
        reports: topReportsOpen,
        hr: topHROpen,
        security: topSecurityOpen,
      }[menuKey];

      const setOpen = {
        products: setTopProductsOpen,
        inventory: setTopInventoryOpen,
        reports: setTopReportsOpen,
        hr: setTopHROpen,
        security: setTopSecurityOpen,
      }[menuKey];

      return (
        <div className="relative" key={menuKey}>
          <button
            onClick={() => {
              handleTopMenuClick(menuKey);
              setOpen(!isOpen);
            }}
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
              isMenuActive(menuKey) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {menu.label}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && menu.submenus && (
            <div className="absolute mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
              {menu.submenus.map((submenu) => (
                <button
                  key={submenu.id}
                  onClick={() => handleMenuClick(submenu.id)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeMenu === submenu.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {submenu.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={menuKey}
        onClick={() => {
          handleTopMenuClick(menuKey);
          handleMenuClick(menuKey);
        }}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          isMenuActive(menuKey) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {menu.label}
      </button>
    );
  };

  const renderSidebarMenuItem = (menuKey) => {
    const menu = menuStructure[menuKey];
    if (!menu) return null;

    // Only show the menu if it's the selected top menu
    if (selectedTopMenu !== menuKey) return null;

    const Icon = menu.icon;
    const hasSubmenus = menu.submenus && menu.submenus.length > 0;
    
    const isOpen = {
      products: sidebarProductsOpen,
      inventory: sidebarInventoryOpen,
      reports: sidebarReportsOpen,
      create: sidebarCreateOpen,
      hr: sidebarHROpen,
      security: sidebarSecurityOpen,
    }[menuKey] || false;

    if (hasSubmenus) {
      return (
        <div key={menuKey}>
          <button
            onClick={() => {
              const setOpen = {
                products: setSidebarProductsOpen,
                inventory: setSidebarInventoryOpen,
                reports: setSidebarReportsOpen,
                hr: setSidebarHROpen,
                security: setSidebarSecurityOpen,
              }[menuKey];
              setOpen(!isOpen);
            }}
            className={`w-full flex items-center justify-between rounded-lg py-3 px-1 transition-colors ${
              isOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center">
              <Icon className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">{menu.label}</span>}
            </span>
            {sidebarOpen && (
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            )}
          </button>
          {isOpen && sidebarOpen && menu.submenus && (
            <ul className="ml-8 mt-1 space-y-1">
              {menu.submenus.map((submenu) => (
                <li key={submenu.id}>
                  <button
                    onClick={() => handleMenuClick(submenu.id)}
                    className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                      activeMenu === submenu.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {submenu.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <button
        key={menuKey}
        onClick={() => handleMenuClick(menuKey)}
        className={`w-full flex items-center rounded-lg py-3 pl-1 ${
          activeMenu === menuKey
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Icon className="h-5 w-5" />
        {sidebarOpen && <span className="ml-3">{menu.label}</span>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-30">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Inventory</h1>
            </div>

            {/* Top Menu Items */}
            <div className="hidden lg:flex space-x-4">
              {renderTopMenuItem('dashboard')}
              {renderTopMenuItem('sales')}
              {renderTopMenuItem('products', true)}
              {renderTopMenuItem('inventory', true)}
              {renderTopMenuItem('purchase')}
              {renderTopMenuItem('reports', true)}
              {renderTopMenuItem('hr', true)}
              {renderTopMenuItem('security', true)}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 bottom-0 left-0 bg-white shadow-lg border-r z-40 transition-all duration-300
    ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-16'}
    lg:translate-x-0
        `}
      >
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            {sidebarOpen && <h2 className="text-lg font-semibold text-gray-800">Menu</h2>}
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 flex-1">
            {Object.keys(menuStructure).map(menuKey => renderSidebarMenuItem(menuKey))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        } ml-0`}
      >
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;