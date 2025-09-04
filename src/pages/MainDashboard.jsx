import React from 'react';
import { User, ChevronDown, LogOut, DollarSign, TrendingUp, TrendingDown, Package, AlertTriangle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { menuConfig } from '../config/menu-config';

const MainDashboard = ({ onMenuClick }) => {
  const { logout } = useAuth();

  // Sample data from Dashboard component
  const todaysSales = 15420;
  const totalSales = 245680;
  const profit = 45230;
  const loss = 2340;
  
  // Sample bar chart data for daily sales and profit
  const salesData = [
    { day: 'Mon', sales: 12400, profit: 8100 },
    { day: 'Tue', sales: 13200, profit: 8800 },
    { day: 'Wed', sales: 11800, profit: 7600 },
    { day: 'Thu', sales: 14600, profit: 9200 },
    { day: 'Fri', sales: 15420, profit: 9800 },
    { day: 'Sat', sales: 16800, profit: 10500 },
    { day: 'Sun', sales: 13900, profit: 8900 }
  ];
  
  const topProducts = [
    { name: 'iPhone 14 Pro', sales: 45, revenue: 44950 },
    { name: 'Samsung Galaxy S23', sales: 32, revenue: 31680 },
    { name: 'MacBook Air M2', sales: 18, revenue: 21600 },
    { name: 'iPad Pro', sales: 25, revenue: 19975 },
    { name: 'AirPods Pro', sales: 28, revenue: 6720 }
  ];

  const lowStockAlerts = [
    { name: 'iPhone 14 Pro', stock: 5, reorderLevel: 10 },
    { name: 'AirPods Pro', stock: 3, reorderLevel: 15 },
    { name: 'Apple Watch Series 8', stock: 7, reorderLevel: 12 },
    { name: 'Samsung Galaxy S23', stock: 4, reorderLevel: 8 },
    { name: 'MacBook Air M2', stock: 6, reorderLevel: 10 }
  ];

  // Group menus by section from menuConfig
  const applicationSections = menuConfig.reduce((acc, app) => {
    const section = app.section || "Other";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(app);
    return acc;
  }, {});

  const AppTile = ({ app }) => {
    const Icon = app.icon;
    return (
      <div
        onClick={() => onMenuClick(app.id)}
        className={`${app.color} p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 min-h-[80px] flex flex-row gap-3 justify-start items-center`}
      >
        <div className="bg-green-100 p-4 rounded">
          <Icon size={20} />
        </div>
        <div className="text-sm font-medium">{app.name}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2">
                <div className="w-4 h-4 bg-white rounded-full relative">
                  <div className="absolute inset-0 bg-red-600 rounded-full transform rotate-45 scale-75"></div>
                </div>
              </div>
              <span className="text-gray-600 text-2xl font-medium">
                bhsale
              </span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 cursor-pointer flex items-center gap-1" onClick={logout}>
              <LogOut className="w-4 h-4" /> Log Out
            </span>
            <span className="text-gray-300">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-gray-800"
            >
              <User className="w-4 h-4 mr-1" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
  {/* Menu Section */}
  <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-10 lg:ml-[50px]">
    {/* <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
        Applications
      </h2>
      <p className="text-gray-600 text-sm sm:text-base">
        Select an application to manage your business
      </p>
    </div> */}

    {Object.entries(applicationSections).map(([title, apps]) => (
      <div key={title} className="mb-6">
        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mb-3">
          {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {apps.map((app) => (
            <AppTile key={app.id} app={app} />
          ))}
        </div>
      </div>
    ))}
  </div>

  {/* Dashboard Section */}
  <div className="w-full lg:w-2/5 border-gray-200 p-4 sm:p-6 lg:mr-[50px]">
    <div className="grid gap-3 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="p-3 bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Today's Sales</p>
              <p className="text-lg font-bold text-blue-600">${todaysSales.toLocaleString()}</p>
            </div>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-3 bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Profit</p>
              <p className="text-lg font-bold text-green-600">${profit.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </Card>
      </div>
    </div>

    {/* Chart */}
    <CardHeader className="pb-2">
      <CardTitle className="text-sm">Weekly Sales & Profit</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip 
            formatter={(value, name) => [
              `$${value.toLocaleString()}`, 
              name === 'sales' ? 'Sales' : 'Profit'
            ]}
          />
          <Bar dataKey="sales" fill="#3b82f6" name="sales" />
          <Bar dataKey="profit" fill="#10b981" name="profit" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>

    
  </div>
</div>
<div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 px-20">
  {/* Top Products */}
  <Card className="bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm flex items-center">
        <Package className="h-4 w-4 mr-2" />
        Top Products
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {topProducts.slice(0, 5).map((product, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-500">{product.sales} units</p>
            </div>
            <p className="font-medium">${product.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>

  {/* Low Stock Alerts */}
  <Card className="bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
        Low Stock Alerts
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {lowStockAlerts.slice(0, 5).map((product, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-500">Reorder: {product.reorderLevel}</p>
            </div>
            <Badge variant="destructive" className="text-xs px-2 py-1">
              {product.stock} left
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>

    </div>
  );
};

export default MainDashboard;