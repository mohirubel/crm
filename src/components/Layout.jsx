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
} from 'lucide-react';

const Layout = ({ children, activeMenu, setActiveMenu }) => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Separate state for top menu dropdowns
  const [topInventoryOpen, setTopInventoryOpen] = useState(false);
  const [topReportsOpen, setTopReportsOpen] = useState(false);
  const [topCreateOpen, setTopCreateOpen] = useState(false);
  
  // Separate state for sidebar dropdowns
  const [sidebarInventoryOpen, setSidebarInventoryOpen] = useState(false);
  const [sidebarReportsOpen, setSidebarReportsOpen] = useState(false);
  const [sidebarCreateOpen, setSidebarCreateOpen] = useState(false);

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
    // Close all dropdowns when a menu item is clicked
    setTopInventoryOpen(false);
    setTopReportsOpen(false);
    setTopCreateOpen(false);
    // setSidebarInventoryOpen(false);
    // setSidebarReportsOpen(false);
    // setSidebarCreateOpen(false);
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
              {/* Dashboard */}
              <button
                onClick={() => handleMenuClick('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeMenu === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>

              {/* Sales */}
              <button
                onClick={() => handleMenuClick('sales')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeMenu === 'sales' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Sales
              </button>

              {/* Products */}
              <button
                onClick={() => handleMenuClick('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeMenu === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Products
              </button>

              {/* Inventory Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTopInventoryOpen(!topInventoryOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    activeMenu.startsWith('currentStock') ||
                    activeMenu.startsWith('stockMovements') ||
                    activeMenu.startsWith('expiryDamage') ||
                    activeMenu.startsWith('stockReport')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Inventory
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${topInventoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {topInventoryOpen && (
                  <div className="absolute mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
                    <button
                      onClick={() => handleMenuClick('currentStock')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'currentStock' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Current Stock
                    </button>                  
                    <button
                      onClick={() => handleMenuClick('expiryDamage')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'expiryDamage' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Expiry & Damage
                    </button>                 
                  </div>
                )}
              </div>

              {/* Purchase */}
              <button
                onClick={() => handleMenuClick('purchase')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeMenu === 'purchase' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Purchase
              </button>

              {/* Returns */}
              <button
                onClick={() => handleMenuClick('returns')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeMenu === 'returns' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Returns
              </button>

              {/* Top Reports Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTopReportsOpen(!topReportsOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    activeMenu === 'SalesReports' ||
                    activeMenu === 'ProfitLoss' ||
                    activeMenu === 'BestProducts' ||
                    activeMenu === 'LowQuantity' ||
                    activeMenu === 'DateOver' ||
                    activeMenu === 'Templates'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Reports
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${topReportsOpen ? 'rotate-180' : ''}`} />
                </button>
                {topReportsOpen && (
                  <div className="absolute mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
                    <button
                      onClick={() => handleMenuClick('SalesReports')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'SalesReports' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Sales Reports
                    </button>
                    <button
                      onClick={() => handleMenuClick('ProfitLoss')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'ProfitLoss' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Profit & Loss
                    </button>
                    <button
                      onClick={() => handleMenuClick('BestProducts')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'BestProducts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Best Products
                    </button>
                    <button
                      onClick={() => handleMenuClick('LowQuantity')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'LowQuantity' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Low Quantity
                    </button>
                    <button
                      onClick={() => handleMenuClick('DateOver')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'DateOver' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Date Over
                    </button>
                    <button
                      onClick={() => handleMenuClick('stockReport')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'stockReport' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Stock Report
                    </button>
                    <button
                      onClick={() => handleMenuClick('stockMovements')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'stockMovements' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Stock Movements
                    </button>
                    <button
                      onClick={() => handleMenuClick('Templates')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'Templates' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Templates
                    </button>
                  </div>
                )}
              </div>

              {/* Top Create Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTopCreateOpen(!topCreateOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    activeMenu === 'CreateProductsPage' ||
                    activeMenu === 'createCategory' ||
                    activeMenu === 'CreateBrand'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Create
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${topCreateOpen ? 'rotate-180' : ''}`} />
                </button>
                {topCreateOpen && (
                  <div className="absolute mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
                    <button
                      onClick={() => handleMenuClick('CreateProductsPage')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'CreateProductsPage' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Create Products
                    </button>
                    <button
                      onClick={() => handleMenuClick('createCategory')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'createCategory' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Create Category
                    </button>
                    <button
                      onClick={() => handleMenuClick('CreateBrand')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeMenu === 'CreateBrand' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Create Brand
                    </button>
                  </div>
                )}
              </div>
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
            {/* Dashboard */}
            <button
              onClick={() => handleMenuClick('dashboard')}
              className={`w-full flex items-center rounded-lg py-3 pl-1 ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>

            {/* Sales */}
            <button
              onClick={() => handleMenuClick('sales')}
              className={`w-full flex items-center rounded-lg py-3 pl-1 ${
                activeMenu === 'sales'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Sales</span>}
            </button>

            {/* Products */}
            <button
              onClick={() => handleMenuClick('products')}
              className={`w-full flex items-center rounded-lg py-3 pl-1 ${
                activeMenu === 'products'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Package className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Products</span>}
            </button>

            {/* Sidebar Inventory with dropdown */}
            <div>
              <button
                onClick={() => setSidebarInventoryOpen(!sidebarInventoryOpen)}
                className={`w-full flex items-center justify-between rounded-lg py-3 px-1 transition-colors ${
                  sidebarInventoryOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <Warehouse className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">Inventory</span>}
                </span>
                {sidebarOpen && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${sidebarInventoryOpen ? 'rotate-180' : ''}`} />
                )}
              </button>
              {sidebarInventoryOpen && sidebarOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <button
                      onClick={() => handleMenuClick('currentStock')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'currentStock'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Current Stock
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('expiryDamage')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'expiryDamage'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Expiry & Damage
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Purchase */}
            <button
              onClick={() => handleMenuClick('purchase')}
              className={`w-full flex items-center rounded-lg py-3 pl-1 ${
                activeMenu === 'purchase'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Purchase</span>}
            </button>

            {/* Returns */}
            <button
              onClick={() => handleMenuClick('returns')}
              className={`w-full flex items-center rounded-lg py-3 pl-1 ${
                activeMenu === 'returns'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <RotateCcw className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Returns</span>}
            </button>

            {/* Sidebar Reports with dropdown */}
            <div>
              <button
                onClick={() => setSidebarReportsOpen(!sidebarReportsOpen)}
                className={`w-full flex items-center justify-between rounded-lg py-3 px-1 transition-colors ${
                  sidebarReportsOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <FileText className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">Reports</span>}
                </span>
                {sidebarOpen && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      sidebarReportsOpen ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
            
              {sidebarReportsOpen && sidebarOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <button
                      onClick={() => handleMenuClick('SalesReports')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'SalesReports'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Sales Reports
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('ProfitLoss')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'ProfitLoss'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Profit & Loss
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('BestProducts')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'BestProducts'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Best Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('LowQuantity')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'LowQuantity'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Low Quantity
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('stockReport')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'stockReport'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Stock Report
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('stockMovements')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'stockMovements'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Stock Movements
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('DateOver')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'DateOver'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Date Over
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('Templates')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'Templates'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Templates
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Sidebar Create Menu */}
            <div>
              <button
                onClick={() => setSidebarCreateOpen(!sidebarCreateOpen)}
                className={`w-full flex items-center justify-between rounded-lg py-3 px-1 transition-colors ${
                  sidebarCreateOpen ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <FileEditIcon className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">Create</span>}
                </span>
                {sidebarOpen && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sidebarCreateOpen ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {sidebarCreateOpen && sidebarOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <button
                      onClick={() => handleMenuClick('CreateProductsPage')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'CreateProductsPage'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Create Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('createCategory')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'createCategory'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Create Category
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('CreateBrand')}
                      className={`w-full text-left py-2 px-2 rounded-md text-sm ${
                        activeMenu === 'CreateBrand'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Create Brand
                    </button>
                  </li>
                </ul>
              )}
            </div>
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