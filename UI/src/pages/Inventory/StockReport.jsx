import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Package,
  TrendingDown,
  BarChart3,
  FileText,
  Download,
  Calendar,
  Search,
  Filter
} from 'lucide-react';

const StockReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [reportType, setReportType] = useState('low-stock');

  // Sample current stock data (same as CurrentStock component)
  const [currentStock] = useState([
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      currentStock: 25,
      reorderLevel: 10,
      lastUpdated: '2024-08-28',
      status: 'Good',
      unitCost: 999,
      supplier: 'Apple Inc.',
      leadTime: 7
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Smartphones',
      currentStock: 15,
      reorderLevel: 12,
      lastUpdated: '2024-08-28',
      status: 'Good',
      unitCost: 899,
      supplier: 'Samsung Electronics',
      leadTime: 5
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Accessories',
      currentStock: 3,
      reorderLevel: 15,
      lastUpdated: '2024-08-27',
      status: 'Low Stock',
      unitCost: 249,
      supplier: 'Apple Inc.',
      leadTime: 3
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      category: 'Laptops',
      currentStock: 8,
      reorderLevel: 5,
      lastUpdated: '2024-08-28',
      status: 'Good',
      unitCost: 1199,
      supplier: 'Apple Inc.',
      leadTime: 10
    },
    {
      id: 5,
      name: 'iPad Pro',
      category: 'Tablets',
      currentStock: 2,
      reorderLevel: 8,
      lastUpdated: '2024-08-26',
      status: 'Low Stock',
      unitCost: 1099,
      supplier: 'Apple Inc.',
      leadTime: 7
    },
    {
      id: 6,
      name: 'Apple Watch Series 8',
      category: 'Wearables',
      currentStock: 12,
      reorderLevel: 6,
      lastUpdated: '2024-08-28',
      status: 'Good',
      unitCost: 399,
      supplier: 'Apple Inc.',
      leadTime: 5
    },
    {
      id: 7,
      name: 'Sony WH-1000XM4',
      category: 'Accessories',
      currentStock: 4,
      reorderLevel: 10,
      lastUpdated: '2024-08-27',
      status: 'Low Stock',
      unitCost: 349,
      supplier: 'Sony Electronics',
      leadTime: 14
    },
    {
      id: 8,
      name: 'Dell XPS 13',
      category: 'Laptops',
      currentStock: 6,
      reorderLevel: 3,
      lastUpdated: '2024-08-28',
      status: 'Good',
      unitCost: 1299,
      supplier: 'Dell Technologies',
      leadTime: 12
    },
    {
      id: 9,
      name: 'Nintendo Switch',
      category: 'Gaming',
      currentStock: 1,
      reorderLevel: 8,
      lastUpdated: '2024-08-25',
      status: 'Low Stock',
      unitCost: 299,
      supplier: 'Nintendo',
      leadTime: 21
    },
    {
      id: 10,
      name: 'PlayStation 5',
      category: 'Gaming',
      currentStock: 0,
      reorderLevel: 5,
      lastUpdated: '2024-08-24',
      status: 'Out of Stock',
      unitCost: 499,
      supplier: 'Sony Interactive',
      leadTime: 30
    }
  ]);

  const categories = [...new Set(currentStock.map(item => item.category))];

  // Calculate priority based on shortage and lead time
  const getItemPriority = (item) => {
    const shortage = Math.max(0, item.reorderLevel - item.currentStock);
    const daysUntilCritical = Math.floor(item.currentStock / (item.reorderLevel / 30)); // Rough calculation
    
    if (item.currentStock === 0) return 'Critical';
    if (shortage > 10 || daysUntilCritical < 3) return 'High';
    if (shortage > 5 || daysUntilCritical < 7) return 'Medium';
    if (shortage > 0) return 'Low';
    return 'Good';
  };

  // Filter stock based on report type
  const getReportData = () => {
    let baseData = currentStock;
    
    switch (reportType) {
      case 'low-stock':
        baseData = currentStock.filter(item => item.currentStock <= item.reorderLevel);
        break;
      case 'out-of-stock':
        baseData = currentStock.filter(item => item.currentStock === 0);
        break;
      case 'overstocked':
        baseData = currentStock.filter(item => item.currentStock > item.reorderLevel * 3);
        break;
      case 'all-items':
      default:
        baseData = currentStock;
        break;
    }

    return baseData.filter(item => {
      const priority = getItemPriority(item);
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        item.category.toLowerCase() === categoryFilter.toLowerCase();
      
      const matchesPriority = priorityFilter === 'all' || 
        priority.toLowerCase() === priorityFilter.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesPriority;
    });
  };

  const filteredData = getReportData();

  const getStatusBadge = (item) => {
    if (item.currentStock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (item.currentStock <= item.reorderLevel) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else if (item.currentStock > item.reorderLevel * 3) {
      return <Badge className="bg-blue-100 text-blue-800">Overstocked</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-blue-100 text-blue-800 border-blue-200',
      'Good': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <Badge className={priorityColors[priority] || 'bg-gray-100 text-gray-800'}>
        {priority}
      </Badge>
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriorityFilter('all');
  };

  // Calculate summary statistics
  const lowStockItems = currentStock.filter(item => item.currentStock <= item.reorderLevel);
  const outOfStockItems = currentStock.filter(item => item.currentStock === 0);
  const criticalItems = currentStock.filter(item => getItemPriority(item) === 'Critical');
  const totalReorderValue = lowStockItems.reduce((total, item) => {
    const shortage = Math.max(0, item.reorderLevel - item.currentStock);
    return total + (shortage * item.unitCost);
  }, 0);

  // Export functionality
  const exportReport = () => {
    const csvContent = [
      ['Product Name', 'Category', 'Current Stock', 'Reorder Level', 'Status', 'Priority', 'Unit Cost', 'Shortage', 'Reorder Value', 'Supplier', 'Lead Time'],
      ...filteredData.map(item => {
        const priority = getItemPriority(item);
        const shortage = Math.max(0, item.reorderLevel - item.currentStock);
        const reorderValue = shortage * item.unitCost;
        return [
          item.name,
          item.category,
          item.currentStock,
          item.reorderLevel,
          item.currentStock === 0 ? 'Out of Stock' : item.currentStock <= item.reorderLevel ? 'Low Stock' : 'Good',
          priority,
          `$${item.unitCost}`,
          shortage,
          `$${reorderValue}`,
          item.supplier,
          `${item.leadTime} days`
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-report-${reportType}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive inventory reports and reorder recommendations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={exportReport}>
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Items need reordering</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{outOfStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Priority</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{criticalItems.length}</div>
            <p className="text-xs text-muted-foreground">High priority items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reorder Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalReorderValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Estimated cost to restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Configure your inventory report settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-stock">Low Stock Report</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock Report</SelectItem>
                  <SelectItem value="overstocked">Overstocked Items</SelectItem>
                  <SelectItem value="all-items">All Items Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="search-report">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search-report"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} items • Generated on {new Date().toLocaleDateString()}
            </div>
            <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{reportType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
          </CardTitle>
          <CardDescription>
            Detailed inventory analysis with reorder recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shortage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => {
                  const priority = getItemPriority(item);
                  const shortage = Math.max(0, item.reorderLevel - item.currentStock);
                  const reorderValue = shortage * item.unitCost;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(priority)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={reorderValue > 0 ? 'font-medium' : 'text-gray-400'}>
                          ${reorderValue.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.leadTime} days</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No items found</p>
              <p>No items match your current report criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reorder Recommendations */}
      {reportType === 'low-stock' && lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reorder Recommendations</CardTitle>
            <CardDescription>Suggested purchase orders based on current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData
                .filter(item => item.currentStock <= item.reorderLevel)
                .sort((a, b) => {
                  const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
                  const aPriority = getItemPriority(a);
                  const bPriority = getItemPriority(b);
                  return priorityOrder[aPriority] - priorityOrder[bPriority];
                })
                .map(item => {
                  const shortage = Math.max(0, item.reorderLevel - item.currentStock);
                  const recommendedOrder = Math.max(shortage, Math.ceil(item.reorderLevel * 0.5)); // Order at least 50% above reorder level
                  const orderValue = recommendedOrder * item.unitCost;
                  const priority = getItemPriority(item);
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getPriorityBadge(priority)}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Current: {item.currentStock} | Reorder Level: {item.reorderLevel} | Lead Time: {item.leadTime} days
                          </p>
                          <p className="text-sm text-gray-500">Supplier: {item.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">Recommended Order</p>
                            <p className="font-medium">{recommendedOrder} units</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Estimated Cost</p>
                            <p className="font-medium">${orderValue.toLocaleString()}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Create PO
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Status by Category</CardTitle>
            <CardDescription>Inventory health across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map(category => {
                const categoryItems = currentStock.filter(item => item.category === category);
                const lowStockInCategory = categoryItems.filter(item => item.currentStock <= item.reorderLevel).length;
                const totalInCategory = categoryItems.length;
                const healthPercentage = ((totalInCategory - lowStockInCategory) / totalInCategory * 100).toFixed(1);
                
                return (
                  <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{category}</p>
                      <p className="text-sm text-gray-500">{totalInCategory} items total</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${healthPercentage >= 80 ? 'bg-green-500' : healthPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${healthPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{healthPercentage}%</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {lowStockInCategory} low stock
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Suppliers by Risk</CardTitle>
            <CardDescription>Suppliers with most low-stock items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...new Set(currentStock.map(item => item.supplier))]
                .map(supplier => {
                  const supplierItems = currentStock.filter(item => item.supplier === supplier);
                  const lowStockItems = supplierItems.filter(item => item.currentStock <= item.reorderLevel);
                  const totalValue = lowStockItems.reduce((sum, item) => {
                    const shortage = Math.max(0, item.reorderLevel - item.currentStock);
                    return sum + (shortage * item.unitCost);
                  }, 0);
                  
                  return {
                    supplier,
                    lowStockCount: lowStockItems.length,
                    totalItems: supplierItems.length,
                    totalValue,
                    avgLeadTime: Math.round(supplierItems.reduce((sum, item) => sum + item.leadTime, 0) / supplierItems.length)
                  };
                })
                .sort((a, b) => b.lowStockCount - a.lowStockCount)
                .slice(0, 5)
                .map(supplier => (
                  <div key={supplier.supplier} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{supplier.supplier}</p>
                      <p className="text-sm text-gray-500">
                        {supplier.totalItems} items • Avg lead time: {supplier.avgLeadTime} days
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">{supplier.lowStockCount} low stock</p>
                      <p className="text-sm text-gray-500">${supplier.totalValue.toLocaleString()} reorder</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common inventory management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
              <Download className="h-5 w-5" />
              <span>Export All Reports</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
              <FileText className="h-5 w-5" />
              <span>Generate Purchase Orders</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
              <Calendar className="h-5 w-5" />
              <span>Schedule Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockReport;