import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  ShoppingBag,
  Users,
  UserCheck,
  CreditCard,
  Receipt,
  Bell,
  BarChart3,
  PieChart,
  Star,
  Award,
  XCircle   // 🔹 add this
} from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const Dashboard = () => {
  // Sample data - in real app, this would come from API
  const todaysSales = 15420;
  const totalSales = 245680;
  const profit = 45230;
  const loss = 2340;
  
  const topProducts = [
  { name: 'Quran (Arabic Text)', sales: 120, revenue: 24000 },
  { name: 'Islamic Books (Hadith, Tafsir)', sales: 65, revenue: 19500 },
  { name: 'Attar (Non-alcoholic Perfume)', sales: 70, revenue: 10500 },
  { name: 'Hijab & Islamic Clothing', sales: 55, revenue: 22000 },
];


  const lowStockAlerts = [
    { name: 'iPhone 14 Pro', stock: 5, reorderLevel: 10 },
    { name: 'AirPods Pro', stock: 3, reorderLevel: 15 },
    { name: 'Apple Watch Series 8', stock: 7, reorderLevel: 12 },
  ];

  // New data for additional sections
  const salesData = [
    { name: 'Jan', value: 65000 },
    { name: 'Feb', value: 78000 },
    { name: 'Mar', value: 82000 },
    { name: 'Apr', value: 75000 },
    { name: 'May', value: 89000 },
    { name: 'Jun', value: 95000 }
  ];

  const purchaseData = [
  { name: 'Cow', value: 55000 },
  { name: 'Fish', value: 42000 },
  { name: 'Vegetables', value: 30000 },
  { name: 'Fruits', value: 27000 },
  { name: 'Dairy Products', value: 35000 },
  { name: 'Poultry', value: 22000 }
];


  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const totalEmployees = 145;
  const attendanceToday = 138;
  const attendanceRate = ((attendanceToday / totalEmployees) * 100).toFixed(1);

  const income = 125400;
  const expense = 78200;
  const netProfit = income - expense;

  // Fixed: Added missing recentOrders data
  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 1299, status: 'Completed', time: '2 min ago' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 899, status: 'Processing', time: '15 min ago' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 2499, status: 'Shipped', time: '1 hour ago' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: 599, status: 'Pending', time: '2 hours ago' }
  ];

// Employee absent data
const absentEmployees = [
  { name: 'Rahim Uddin', department: 'Accounts', daysAbsent: 3, status: 'Pending' },
  { name: 'Karim Ali', department: 'Sales', daysAbsent: 1, status: 'Approved' },
  { name: 'Mitu Akter', department: 'HR', daysAbsent: 2, status: 'Pending' },
  { name: 'Shafiq Hasan', department: 'IT', daysAbsent: 4, status: 'Rejected' },
];



  const notifications = [
    { id: 1, message: 'New order #12345 received', type: 'info', time: '5 min ago' },
    { id: 2, message: 'Payment overdue for Invoice #INV-001', type: 'warning', time: '1 hour ago' },
    { id: 3, message: 'Inventory restocked successfully', type: 'success', time: '2 hours ago' },
    { id: 4, message: 'Server maintenance scheduled for tonight', type: 'info', time: '3 hours ago' }
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-orange-500';
      case 'success': return 'bg-green-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Fixed: Added missing getStatusColor function
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getabsentEmployeesStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

  // Fixed: Added missing getTierColor function
  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
      
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todaysSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loss</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${loss.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Summary Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Sales Summary</span>
            </CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Purchase Summary Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Purchase Summary</span>
            </CardTitle>
            <CardDescription>Purchase distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={purchaseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {purchaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* HR Stats and Finance KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              +5 new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Today</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceToday}/{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceRate}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${income.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expense</CardTitle>
            <Receipt className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${expense.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Net Profit: ${netProfit.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1"><Package className="h-5 w-5 text-blue-500" />Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div  className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* <div className="bg-blue-100 p-2 rounded-lg">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div> */}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} units sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
            <CardDescription>
              Products that need restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockAlerts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Reorder level: {product.reorderLevel}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-green-500" />
              <span>Recent Orders</span>
            </CardTitle>
            <CardDescription>
              Latest customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${order.amount}</p>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-red-500" />
              <span>Employee Absent List</span>
            </CardTitle>
            <CardDescription>
              Recent absent employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {absentEmployees.map((employee, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* <div className="bg-red-100 p-2 rounded-lg">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div> */}
                    <div>
                      <p className="text-sm font-medium">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {employee.department} • {employee.daysAbsent} days absent
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${getabsentEmployeesStatusColor(employee.status)}`}>
                      {employee.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications / Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Recent alerts and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 pb-2 border-b last:border-b-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;