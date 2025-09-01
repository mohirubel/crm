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
  X
} from 'lucide-react';

const Layout = ({ children, activeMenu, setActiveMenu }) => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // detect screen size and set sidebar default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false); // mobile/tab default hidden
      } else {
        setSidebarOpen(true); // desktop default open
      }
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'purchase', label: 'Purchase', icon: ShoppingCart },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const handleLogout = () => logout();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleMenuClick = (id) => {
    setActiveMenu(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false); // mobile/tab -> auto close after selecting
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Inventory
              </h1>
            </div>

            {/* Desktop Menu Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                      activeMenu === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div 
  className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
  onClick={() => setActiveMenu("main-dashboard")}
>
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
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-full bg-white shadow-lg border-r z-20 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center space-x-3 transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden top-16"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Toggle Button */}
          <div className="mb-4">
            <button
              onClick={toggleSidebar}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              {sidebarOpen ? (
                <>
                  <X className="h-5 w-5 mr-2" />
                  <span>Hide Menu</span>
                </>
              ) : (
                <>
                  <Menu className="h-5 w-5 mr-2" />
                  <span>Show Menu</span>
                </>
              )}
            </button>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
