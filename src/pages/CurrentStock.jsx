import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  Minus, 
  Search, 
  Package
} from 'lucide-react';

const CurrentStock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal states
  const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Form states
  const [stockFormData, setStockFormData] = useState({
    productId: '',
    quantity: 1,
    reason: ''
  });

  // Sample current stock data with state management
  const [currentStock, setCurrentStock] = useState([
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
    },
    {
      id: 6,
      name: 'Apple Watch Series 8',
      category: 'Wearables',
      currentStock: 12,
      reorderLevel: 6,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 7,
      name: 'Sony WH-1000XM4',
      category: 'Accessories',
      currentStock: 4,
      reorderLevel: 10,
      lastUpdated: '2024-08-27',
      status: 'Low Stock'
    },
    {
      id: 8,
      name: 'Dell XPS 13',
      category: 'Laptops',
      currentStock: 6,
      reorderLevel: 3,
      lastUpdated: '2024-08-28',
      status: 'Good'
    }
  ]);

  // Sample stock movements for adding new movements
  const [stockMovements, setStockMovements] = useState([
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
    }
  ]);

  const categories = [...new Set(currentStock.map(item => item.category))];

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

  const getStatusBadge = (item) => {
    if (item.currentStock <= item.reorderLevel) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>;
    }
  };

  // Handle stock form changes
  const handleStockFormChange = (field, value) => {
    setStockFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle stock in
  const handleStockIn = () => {
    const product = currentStock.find(p => p.id === parseInt(stockFormData.productId));
    if (!product) return;

    const updatedStock = currentStock.map(p => 
      p.id === product.id ? { 
        ...p, 
        currentStock: p.currentStock + parseInt(stockFormData.quantity),
        lastUpdated: new Date().toISOString().split('T')[0]
      } : p
    );
    setCurrentStock(updatedStock);

    const newMovement = {
      id: stockMovements.length + 1,
      productName: product.name,
      type: 'IN',
      quantity: parseInt(stockFormData.quantity),
      reason: stockFormData.reason || 'Manual Stock In',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString()
    };
    setStockMovements(prev => [newMovement, ...prev]);

    setIsStockInModalOpen(false);
    resetStockForm();
  };

  // Handle stock out
  const handleStockOut = () => {
    const product = currentStock.find(p => p.id === parseInt(stockFormData.productId));
    if (!product || product.currentStock < parseInt(stockFormData.quantity)) return;

    const updatedStock = currentStock.map(p => 
      p.id === product.id ? { 
        ...p, 
        currentStock: p.currentStock - parseInt(stockFormData.quantity),
        lastUpdated: new Date().toISOString().split('T')[0]
      } : p
    );
    setCurrentStock(updatedStock);

    const newMovement = {
      id: stockMovements.length + 1,
      productName: product.name,
      type: 'OUT',
      quantity: parseInt(stockFormData.quantity),
      reason: stockFormData.reason || 'Manual Stock Out',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString()
    };
    setStockMovements(prev => [newMovement, ...prev]);

    setIsStockOutModalOpen(false);
    resetStockForm();
  };

  // Reset stock form
  const resetStockForm = () => {
    setStockFormData({ productId: '', quantity: 1, reason: '' });
    setSelectedProduct(null);
  };

  // Open stock in modal
  const openStockInModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockInModalOpen(true);
  };

  // Open stock out modal
  const openStockOutModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockOutModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  // Calculate summary stats
  const totalItems = currentStock.length;
  const lowStockItems = currentStock.filter(item => item.currentStock <= item.reorderLevel).length;
  const totalStockValue = currentStock.reduce((total, item) => total + item.currentStock, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Current Stock Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage your current inventory levels
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => openStockInModal()}>
            <Plus className="h-4 w-4" />
            <span>Stock In</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => openStockOutModal()}>
            <Minus className="h-4 w-4" />
            <span>Stock Out</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Products in inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Units</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStockValue}</div>
            <p className="text-xs text-muted-foreground">Units in stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Current Stock</CardTitle>
          <CardDescription>Search by product name or category</CardDescription>
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
          <CardDescription>Monitor your current inventory levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCurrentStock.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>{item.currentStock} units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.reorderLevel} units</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openStockInModal(item)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openStockOutModal(item)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCurrentStock.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No stock items found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock In Modal */}
      <Dialog open={isStockInModalOpen} onOpenChange={setIsStockInModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock In</DialogTitle>
            <DialogDescription>Add new stock to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product">Product</Label>
              <Select 
                value={stockFormData.productId}
                onValueChange={(value) => handleStockFormChange('productId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} (Current: {product.currentStock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                value={stockFormData.quantity}
                onChange={(e) => handleStockFormChange('quantity', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Input 
                id="reason" 
                value={stockFormData.reason}
                onChange={(e) => handleStockFormChange('reason', e.target.value)}
                placeholder="e.g., Purchase Order #PO-003"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockInModalOpen(false)}>Cancel</Button>
            <Button onClick={handleStockIn}>Add Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Out Modal */}
      <Dialog open={isStockOutModalOpen} onOpenChange={setIsStockOutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Out</DialogTitle>
            <DialogDescription>Remove stock from your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-out">Product</Label>
              <Select 
                value={stockFormData.productId}
                onValueChange={(value) => handleStockFormChange('productId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} (Available: {product.currentStock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity-out">Quantity</Label>
              <Input 
                id="quantity-out" 
                type="number" 
                min="1" 
                value={stockFormData.quantity}
                onChange={(e) => handleStockFormChange('quantity', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason-out">Reason (Optional)</Label>
              <Input 
                id="reason-out" 
                value={stockFormData.reason}
                onChange={(e) => handleStockFormChange('reason', e.target.value)}
                placeholder="e.g., Sales Transaction, Damage"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockOutModalOpen(false)}>Cancel</Button>
            <Button onClick={handleStockOut}>Remove Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentStock;