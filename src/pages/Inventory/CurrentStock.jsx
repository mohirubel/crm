import React, { useState, useMemo } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Plus, Minus, Search, Package } from 'lucide-react';

const CurrentStock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Stock form state
  const [stockFormData, setStockFormData] = useState({
    productId: '',
    quantity: 1,
    reason: ''
  });

  // New product form state
  const [newProduct, setNewProduct] = useState({
    productCode: '',
    name: '',
    category: '',
    unit: '',
    costPrice: '',
    sellingPrice: '',
    reorderLevel: '',
    currentStock: 0,
  });

  // Current stock data
  const [currentStock, setCurrentStock] = useState([
    {
      id: 1,
      productCode: 'IP14P',
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      unit: 'pcs',
      costPrice: 950,
      sellingPrice: 1200,
      currentStock: 25,
      reorderLevel: 10,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 2,
      productCode: 'SGS23',
      name: 'Samsung Galaxy S23',
      category: 'Smartphones',
      unit: 'pcs',
      costPrice: 800,
      sellingPrice: 1050,
      currentStock: 15,
      reorderLevel: 12,
      lastUpdated: '2024-08-28',
      status: 'Good'
    },
    {
      id: 3,
      productCode: 'APPRO',
      name: 'AirPods Pro',
      category: 'Accessories',
      unit: 'pcs',
      costPrice: 150,
      sellingPrice: 250,
      currentStock: 3,
      reorderLevel: 15,
      lastUpdated: '2024-08-27',
      status: 'Low Stock'
    }
  ]);

  // Stock movements
  const [stockMovements, setStockMovements] = useState([]);

  const categories = [...new Set(currentStock.map(item => item.category))];

  const filteredCurrentStock = useMemo(() => {
    return currentStock.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productCode.toLowerCase().includes(searchTerm.toLowerCase());
      
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
    setStockFormData(prev => ({ ...prev, [field]: value }));
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

    setIsStockOutModalOpen(false);
    resetStockForm();
  };

  // Reset stock form
  const resetStockForm = () => {
    setStockFormData({ productId: '', quantity: 1, reason: '' });
    setSelectedProduct(null);
  };

  // Open stock modals
  const openStockInModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockInModalOpen(true);
  };

  const openStockOutModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockOutModalOpen(true);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  // Add new product
  const handleNewProductChange = (field, value) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.productCode) return;

    const newId = currentStock.length + 1;
    const product = {
      id: newId,
      ...newProduct,
      costPrice: parseFloat(newProduct.costPrice) || 0,
      sellingPrice: parseFloat(newProduct.sellingPrice) || 0,
      reorderLevel: parseInt(newProduct.reorderLevel) || 0,
      currentStock: parseInt(newProduct.currentStock) || 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Good'
    };

    setCurrentStock(prev => [...prev, product]);
    setIsAddProductModalOpen(false);
    setNewProduct({
      productCode: '',
      name: '',
      category: '',
      unit: '',
      costPrice: '',
      sellingPrice: '',
      reorderLevel: '',
      currentStock: 0,
    });
  };

  // Summary
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
          <Button variant="outline" onClick={() => setIsAddProductModalOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
          <Button variant="outline" onClick={() => openStockInModal()}>
            <Plus className="h-4 w-4" />
            <span>Stock In</span>
          </Button>
          <Button variant="outline" onClick={() => openStockOutModal()}>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Current Stock</CardTitle>
          <CardDescription>Search by product code, name, or category</CardDescription>
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
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Stock Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCurrentStock.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.productCode}</td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">${item.sellingPrice}</td>
                    <td className="px-6 py-4">{item.currentStock} {item.unit}</td>
                    <td className="px-6 py-4">{item.reorderLevel}</td>
                    <td className="px-6 py-4">{item.lastUpdated}</td>
                    <td className="px-6 py-4">{getStatusBadge(item)}</td>
                    <td className="px-6 py-4">
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
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Create a new product in your inventory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Code</Label>
              <Input value={newProduct.productCode} onChange={(e) => handleNewProductChange('productCode', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={newProduct.name} onChange={(e) => handleNewProductChange('name', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input value={newProduct.category} onChange={(e) => handleNewProductChange('category', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Unit</Label>
              <Input value={newProduct.unit} onChange={(e) => handleNewProductChange('unit', e.target.value)} placeholder="pcs, box, kg" />
            </div>
            <div className="grid gap-2">
              <Label>Cost Price</Label>
              <Input type="number" value={newProduct.costPrice} onChange={(e) => handleNewProductChange('costPrice', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Selling Price</Label>
              <Input type="number" value={newProduct.sellingPrice} onChange={(e) => handleNewProductChange('sellingPrice', e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Min Stock</Label>
              <Input type="number" value={newProduct.reorderLevel} onChange={(e) => handleNewProductChange('reorderLevel', e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock In Modal */}
      <Dialog open={isStockInModalOpen} onOpenChange={setIsStockInModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock In</DialogTitle>
            <DialogDescription>Add stock to a product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select value={stockFormData.productId} onValueChange={(v) => handleStockFormChange('productId', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.productCode} - {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <Input type="number" value={stockFormData.quantity} onChange={(e) => handleStockFormChange('quantity', e.target.value)} />
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
            <DialogDescription>Remove stock from a product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select value={stockFormData.productId} onValueChange={(v) => handleStockFormChange('productId', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.productCode} - {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <Input type="number" value={stockFormData.quantity} onChange={(e) => handleStockFormChange('quantity', e.target.value)} />
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
