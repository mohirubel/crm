import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Minus, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Package,
  Calendar
} from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [movementTypeFilter, setMovementTypeFilter] = useState('all');
  const [damageTypeFilter, setDamageTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Sample current stock data
  const currentStock = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      currentStock: 25,
      reorderLevel: 10,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Smartphones',
      currentStock: 15,
      reorderLevel: 12,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Accessories',
      currentStock: 3,
      reorderLevel: 15,
      lastUpdated: '2024-08-27',
      status: 'Low Stock'
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      category: 'Laptops',
      currentStock: 8,
      reorderLevel: 5,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 5,
      name: 'iPad Pro',
      category: 'Tablets',
      currentStock: 2,
      reorderLevel: 8,
      lastUpdated: '2024-08-26',
      status: 'Low Stock'
    }
  ];

  // Sample stock movements
  const stockMovements = [
    {
      id: 1,
      productName: 'iPhone 14 Pro',
      type: 'IN',
      quantity: 50,
      reason: 'Purchase Order #PO-001',
      date: '2024-08-28',
      time: '10:30 AM'
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S23',
      type: 'OUT',
      quantity: 5,
      reason: 'Sales Transaction',
      date: '2024-08-28',
      time: '02:15 PM'
    },
    {
      id: 3,
      productName: 'MacBook Air M2',
      type: 'OUT',
      quantity: 2,
      reason: 'Damage/Return',
      date: '2024-08-27',
      time: '11:45 AM'
    },
    {
      id: 4,
      productName: 'AirPods Pro',
      type: 'IN',
      quantity: 20,
      reason: 'Purchase Order #PO-002',
      date: '2024-08-26',
      time: '09:15 AM'
    },
    {
      id: 5,
      productName: 'iPad Pro',
      type: 'OUT',
      quantity: 3,
      reason: 'Sales Transaction',
      date: '2024-08-25',
      time: '03:30 PM'
    }
  ];

  // Sample expiry/damage data
  const expiryDamage = [
    {
      id: 1,
      productName: 'iPhone 13 Pro',
      type: 'Damage',
      quantity: 2,
      reason: 'Water damage during transport',
      date: '2024-08-26',
      cost: 1800
    },
    {
      id: 2,
      productName: 'Samsung Charger',
      type: 'Expiry',
      quantity: 10,
      reason: 'Warranty expired',
      date: '2024-08-25',
      cost: 250
    },
    {
      id: 3,
      productName: 'MacBook Pro',
      type: 'Damage',
      quantity: 1,
      reason: 'Screen damage',
      date: '2024-08-24',
      cost: 2500
    },
    {
      id: 4,
      productName: 'USB Cable',
      type: 'Expiry',
      quantity: 25,
      reason: 'Product recall',
      date: '2024-08-23',
      cost: 125
    }
  ];

  // Filter logic for current stock
  const filteredCurrentStock = useMemo(() => {
    return currentStock.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        item.category.toLowerCase() === categoryFilter.toLowerCase();
      
      const matchesStatus = statusFilter === 'all' || 
        item.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [currentStock, searchTerm, categoryFilter, statusFilter]);

  // Filter logic for stock movements
  const filteredStockMovements = useMemo(() => {
    return stockMovements.filter(movement => {
      const matchesSearch = searchTerm === '' || 
        movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = movementTypeFilter === 'all' || 
        movement.type.toLowerCase() === movementTypeFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || movement.date === dateFilter;
      
      return matchesSearch && matchesType && matchesDate;
    });
  }, [stockMovements, searchTerm, movementTypeFilter, dateFilter]);

  // Filter logic for expiry/damage
  const filteredExpiryDamage = useMemo(() => {
    return expiryDamage.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = damageTypeFilter === 'all' || 
        item.type.toLowerCase() === damageTypeFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || item.date === dateFilter;
      
      return matchesSearch && matchesType && matchesDate;
    });
  }, [expiryDamage, searchTerm, damageTypeFilter, dateFilter]);

  const getStatusBadge = (item) => {
    if (item.currentStock <= item.reorderLevel) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>;
    }
  };

  const getMovementIcon = (type) => {
    return type === 'IN' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setMovementTypeFilter('all');
    setDamageTypeFilter('all');
    setDateFilter('');
  };

  // Get unique categories
  const categories = [...new Set(currentStock.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">
            Track stock levels, movements, and manage inventory
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Stock In</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Minus className="h-4 w-4" />
            <span>Stock Out</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current-stock" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current-stock">Current Stock</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          <TabsTrigger value="expiry-damage">Expiry/Damage</TabsTrigger>
          <TabsTrigger value="reports">Low Stock Report</TabsTrigger>
        </TabsList>

        <TabsContent value="current-stock" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Current Stock</CardTitle>
              <CardDescription>
                Search by product name or category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredCurrentStock.length} of {currentStock.length} items
              </div>
            </CardContent>
          </Card>

          {/* Current Stock Table */}
          <Card>
            <CardHeader>
              <CardTitle>Current Stock Levels</CardTitle>
              <CardDescription>
                Monitor your current inventory levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCurrentStock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>{item.currentStock} units</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.reorderLevel} units</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>{getStatusBadge(item)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredCurrentStock.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No stock items found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          {/* Search and Filters for Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Stock Movements</CardTitle>
              <CardDescription>
                Search by product name or movement reason
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
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
              <CardTitle>Stock Movements</CardTitle>
              <CardDescription>
                Track all stock in and out movements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.productName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getMovementIcon(movement.type)}
                          <span>{movement.type === 'IN' ? 'Stock In' : 'Stock Out'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{movement.quantity} units</TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredStockMovements.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No stock movements found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiry-damage" className="space-y-4">
          {/* Search and Filters for Expiry/Damage */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Expiry/Damage</CardTitle>
              <CardDescription>
                Search by product name or damage reason
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search-damage">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search-damage"
                      placeholder="Search damage/expiry..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={damageTypeFilter} onValueChange={setDamageTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="damage">Damage</SelectItem>
                      <SelectItem value="expiry">Expiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredExpiryDamage.length} of {expiryDamage.length} items
              </div>
            </CardContent>
          </Card>

          {/* Expiry/Damage Table */}
          <Card>
            <CardHeader>
              <CardTitle>Expiry & Damage Report</CardTitle>
              <CardDescription>
                Track expired and damaged inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Cost Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpiryDamage.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>
                        <Badge variant={item.type === 'Damage' ? 'destructive' : 'secondary'}>
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.quantity} units</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-medium text-red-600">${item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredExpiryDamage.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No expiry/damage records found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* Low Stock Report */}
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Report</CardTitle>
              <CardDescription>
                Products that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Shortage</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStock
                    .filter(item => item.currentStock <= item.reorderLevel)
                    .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.currentStock} units</TableCell>
                      <TableCell>{item.reorderLevel} units</TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {item.reorderLevel - item.currentStock} units
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;

