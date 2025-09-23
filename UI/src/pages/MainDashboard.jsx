import React from "react";
import {
  User,
  ChevronDown,
  LogOut,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  ShoppingBag,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuConfig } from "../config/menu-config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MainDashboard = () => {
  // Sample data from Dashboard component
  const todaysSales = 15420;
  const monthlySales = 245680;
  const totalSales = 245680;
  const profit = 45230;
  const loss = 2340;
  const totalEmployees = 145;

  // Sample bar chart data for daily sales and profit
  const salesData = [
    { day: "Mon", sales: 12400, profit: 8100 },
    { day: "Tue", sales: 13200, profit: 8800 },
    { day: "Wed", sales: 11800, profit: 7600 },
    { day: "Thu", sales: 14600, profit: 9200 },
    { day: "Fri", sales: 15420, profit: 9800 },
    { day: "Sat", sales: 16800, profit: 10500 },
    { day: "Sun", sales: 13900, profit: 8900 },
  ];

  const topProducts = [
    { name: "iPhone 14 Pro", sales: 45, revenue: 44950 },
    { name: "Samsung Galaxy S23", sales: 32, revenue: 31680 },
    { name: "MacBook Air M2", sales: 18, revenue: 21600 },
    { name: "iPad Pro", sales: 25, revenue: 19975 },
    { name: "AirPods Pro", sales: 28, revenue: 6720 },
  ];

  const lowStockAlerts = [
    { name: "iPhone 14 Pro", stock: 5, reorderLevel: 10 },
    { name: "AirPods Pro", stock: 3, reorderLevel: 15 },
    { name: "Apple Watch Series 8", stock: 7, reorderLevel: 12 },
    { name: "Samsung Galaxy S23", stock: 4, reorderLevel: 8 },
    { name: "MacBook Air M2", stock: 6, reorderLevel: 10 },
  ];

  // New data for additional sections
  const absentEmployees = [
    { name: "John Smith", department: "Sales", reason: "Sick Leave" },
    {
      name: "Sarah Johnson",
      department: "Marketing",
      reason: "Personal Leave",
    },
    { name: "Mike Davis", department: "IT", reason: "Medical Leave" },
    { name: "Emily Brown", department: "HR", reason: "Vacation" },
    { name: "David Wilson", department: "Finance", reason: "Sick Leave" },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Alice Cooper",
      amount: 1299,
      status: "Processing",
    },
    { id: "ORD-002", customer: "Bob Miller", amount: 899, status: "Shipped" },
    { id: "ORD-003", customer: "Carol White", amount: 2199, status: "Pending" },
    { id: "ORD-004", customer: "Daniel Lee", amount: 599, status: "Delivered" },
    {
      id: "ORD-005",
      customer: "Eva Green",
      amount: 1599,
      status: "Processing",
    },
  ];

  const attendanceData = [
    { day: "Mon", present: 45, absent: 5, late: 3 },
    { day: "Tue", present: 47, absent: 3, late: 2 },
    { day: "Wed", present: 46, absent: 4, late: 1 },
    { day: "Thu", present: 48, absent: 2, late: 4 },
    { day: "Fri", present: 44, absent: 6, late: 2 },
    { day: "Sat", present: 42, absent: 8, late: 1 },
    { day: "Sun", present: 40, absent: 10, late: 0 },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const { logout, user } = useAuth();

  const handleLogout = () => logout();
  const navigate = useNavigate();

  const onMenuClick = (id) => {
    navigate(`/${id}`);
  };

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
              <span className="text-gray-600 text-2xl font-medium">ERP</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="ml-auto sm:ml-0 mr-2 sm:mr-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={user?.avatarUrl || ""}
                        alt={user?.name}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48 mt-2 mr-2">
                  <DropdownMenuLabel className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{user?.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4 text-gray-500" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
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
                    <p className="text-sm font-medium">Today's Sales</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${todaysSales.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </Card>

              <Card className="p-3 bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Profit</p>
                    <p className="text-lg font-bold text-green-600">
                      ${profit.toLocaleString()}
                    </p>
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
                    `${value.toLocaleString()}`,
                    name === "sales" ? "Sales" : "Profit",
                  ]}
                />
                <Bar dataKey="sales" fill="#3b82f6" name="sales" />
                <Bar dataKey="profit" fill="#10b981" name="profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>

          {/* Attendance Today */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="p-3 bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg mb-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Employees
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  +5 new hires this month
                </p>
              </div>
            </Card>
            <Card className="p-3 bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg mb-6">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-sm">Attendance Today</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">138/145</p>
                <p className="text-sm text-gray-600">95.2% attendance rate</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* New Bottom Section - All Cards in One Row */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-20">
        {/* Employee Absent List */}
        <Card className="bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <UserX className="h-4 w-4 mr-2 text-red-500" />
              Absent Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {absentEmployees.slice(0, 5).map((employee, index) => (
                <div key={index} className="flex flex-col text-xs">
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-gray-500">{employee.department}</p>
                  <p className="text-red-500 text-xs">{employee.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentOrders.slice(0, 5).map((order, index) => (
                <div key={index} className="flex flex-col text-xs">
                  <div className="flex justify-between">
                    <p className="font-medium">{order.id}</p>
                    <p className="font-medium">${order.amount}</p>
                  </div>
                  <p className="text-gray-500">{order.customer}</p>
                  <span
                    className={`text-xs px-2 py-1 w-fit rounded-md border ${getStatusBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Sales & Monthly */}
        <Card className="bg-[oklch(0.91_0_0/0)] shadow-none rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Today's Sales</p>
                <p className="text-lg font-bold text-blue-600">
                  ${todaysSales.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Monthly Sales</p>
                <p className="text-lg font-bold text-green-600">
                  ${monthlySales.toLocaleString()}
                </p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">Growth</p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-sm text-green-600">+15.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div
                  key={index}
                  className="flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-500">{product.sales} units</p>
                  </div>
                  <p className="font-medium">
                    ${product.revenue.toLocaleString()}
                  </p>
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
                <div
                  key={index}
                  className="flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-500">
                      Reorder: {product.reorderLevel}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 border border-red-200 rounded">
                    {product.stock} left
                  </span>
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
