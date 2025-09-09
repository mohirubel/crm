import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

const StockMovements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movementTypeFilter, setMovementTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('all');

  // Sample stock movements with state management
  const [stockMovements] = useState([
    {
      id: 1,
      productName: 'iPhone 14 Pro',
      type: 'IN',
      quantity: 50,
      reason: 'Purchase Order #PO-001',
      date: '2024-08-28',
      time: '10:30 AM',
      reference: 'PO-001',
      supplier: 'Apple Inc.'
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S23',
      type: 'OUT',
      quantity: 5,
      reason: 'Sales Transaction',
      date: '2024-08-28',
      time: '02:15 PM',
      reference: 'SALE-456',
      supplier: 'Customer Sale'
    },
    {
      id: 3,
      productName: 'MacBook Air M2',
      type: 'OUT',
      quantity: 2,
      reason: 'Damage/Return',
      date: '2024-08-27',
      time: '11:45 AM',
      reference: 'DMG-789',
      supplier: 'Internal'
    },
    {
      id: 4,
      productName: 'AirPods Pro',
      type: 'IN',
      quantity: 20,
      reason: 'Purchase Order #PO-002',
      date: '2024-08-26',
      time: '09:15 AM',
      reference: 'PO-002',
      supplier: 'Apple Inc.'
    },
    {
      id: 5,
      productName: 'iPad Pro',
      type: 'OUT',
      quantity: 3,
      reason: 'Sales Transaction',
      date: '2024-08-25',
      time: '03:30 PM',
      reference: 'SALE-123',
      supplier: 'Customer Sale'
    },
    {
      id: 6,
      productName: 'Sony WH-1000XM4',
      type: 'IN',
      quantity: 15,
      reason: 'Purchase Order #PO-003',
      date: '2024-08-25',
      time: '08:00 AM',
      reference: 'PO-003',
      supplier: 'Sony Electronics'
    },
    {
      id: 7,
      productName: 'Dell XPS 13',
      type: 'OUT',
      quantity: 1,
      reason: 'Employee Assignment',
      date: '2024-08-24',
      time: '01:20 PM',
      reference: 'EMP-001',
      supplier: 'Internal'
    },
    {
      id: 8,
      productName: 'Apple Watch Series 8',
      type: 'IN',
      quantity: 12,
      reason: 'Purchase Order #PO-004',
      date: '2024-08-24',
      time: '10:45 AM',
      reference: 'PO-004',
      supplier: 'Apple Inc.'
    },
    {
      id: 9,
      productName: 'Samsung Galaxy S23',
      type: 'OUT',
      quantity: 8,
      reason: 'Bulk Sales Order',
      date: '2024-08-23',
      time: '04:15 PM',
      reference: 'BULK-001',
      supplier: 'Corporate Client'
    },
    {
      id: 10,
      productName: 'MacBook Air M2',
      type: 'IN',
      quantity: 6,
      reason: 'Purchase Order #PO-005',
      date: '2024-08-23',
      time: '09:30 AM',
      reference: 'PO-005',
      supplier: 'Apple Inc.'
    }
  ]);

  // Get unique reasons for filter
  const reasons = [...new Set(stockMovements.map(movement => movement.reason.split(' ')[0]))];

  const filteredStockMovements = useMemo(() => {
    return stockMovements.filter(movement => {
      const matchesSearch = searchTerm === '' || 
        movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = movementTypeFilter === 'all' || 
        movement.type.toLowerCase() === movementTypeFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || movement.date === dateFilter;
      
      const matchesReason = reasonFilter === 'all' || 
        movement.reason.toLowerCase().includes(reasonFilter.toLowerCase());
      
      return matchesSearch && matchesType && matchesDate && matchesReason;
    });
  }, [stockMovements, searchTerm, movementTypeFilter, dateFilter, reasonFilter]);

  const getMovementIcon = (type) => {
    return type === 'IN' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getMovementBadge = (type) => {
    return type === 'IN' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <ArrowUpCircle className="h-3 w-3 mr-1" />
        Stock In
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800">
        <ArrowDownCircle className="h-3 w-3 mr-1" />
        Stock Out
      </Badge>
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMovementTypeFilter('all');
    setDateFilter('');
    setReasonFilter('all');
  };

  // Calculate summary stats
  const totalMovements = stockMovements.length;
  const stockInMovements = stockMovements.filter(movement => movement.type === 'IN').length;
  const stockOutMovements = stockMovements.filter(movement => movement.type === 'OUT').length;
  const totalStockIn = stockMovements.filter(movement => movement.type === 'IN').reduce((total, movement) => total + movement.quantity, 0);
  const totalStockOut = stockMovements.filter(movement => movement.type === 'OUT').reduce((total, movement) => total + movement.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Transactions</h2>
          <p className="text-muted-foreground">
            Track all stock in and out movements with detailed records
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movements</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovements}</div>
            <p className="text-xs text-muted-foreground">All transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock In</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stockInMovements}</div>
            <p className="text-xs text-muted-foreground">{totalStockIn} units added</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Out</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stockOutMovements}</div>
            <p className="text-xs text-muted-foreground">{totalStockOut} units removed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Movement</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalStockIn - totalStockOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalStockIn - totalStockOut > 0 ? '+' : ''}{totalStockIn - totalStockOut}
            </div>
            <p className="text-xs text-muted-foreground">Net units change</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Stock Movements</CardTitle>
          <CardDescription>Search by product name, reason, or reference number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search-movements">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search-movements"
                  placeholder="Search movements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Movement Type</Label>
              <Select value={movementTypeFilter} onValueChange={setMovementTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in">Stock In</SelectItem>
                  <SelectItem value="out">Stock Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Reason Type</Label>
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Reasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="purchase">Purchase Orders</SelectItem>
                  <SelectItem value="sales">Sales Transactions</SelectItem>
                  <SelectItem value="damage">Damage/Returns</SelectItem>
                  <SelectItem value="employee">Employee Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredStockMovements.length} of {stockMovements.length} movements
          </div>
        </CardContent>
      </Card>

      {/* Stock Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Movement History</CardTitle>
          <CardDescription>Detailed record of all stock movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier/Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStockMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{movement.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getMovementBadge(movement.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getMovementIcon(movement.type)}
                        <span className={movement.type === 'IN' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {movement.type === 'IN' ? '+' : '-'}{movement.quantity} units
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{movement.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{movement.reference}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{movement.supplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{movement.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{movement.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStockMovements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No movements found</p>
              <p>No movements found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Summary</CardTitle>
          <CardDescription>Quick overview of recent stock movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockMovements.slice(0, 5).map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getMovementIcon(movement.type)}
                  <div>
                    <p className="font-medium">{movement.productName}</p>
                    <p className="text-sm text-gray-500">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${movement.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                    {movement.type === 'IN' ? '+' : '-'}{movement.quantity} units
                  </p>
                  <p className="text-sm text-gray-500">{movement.date} at {movement.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockMovements;