import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  Smartphone,
  FileText,
  Truck,
  Package,
  Trash2,
  Edit,
  CheckCircle,
  Clock
} from 'lucide-react';

const Purchase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal states
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false);
  
  // Form states
  const [purchaseFormData, setPurchaseFormData] = useState({
    supplier: '',
    deliveryDate: '',
    paymentMethod: '',
    notes: ''
  });
  
  const [purchaseItems, setPurchaseItems] = useState([
    { id: 1, name: '', qty: 1, cost: 0, total: 0 }
  ]);
  
  // Sample purchase orders data with state management
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1,
      poNumber: 'PO-001',
      supplier: 'Apple Inc.',
      totalItems: 3,
      totalAmount: 85000,
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      date: '2024-08-28',
      deliveryDate: '2024-08-30'
    },
    {
      id: 2,
      poNumber: 'PO-002',
      supplier: 'Samsung Electronics',
      totalItems: 2,
      totalAmount: 45000,
      paymentMethod: 'Card',
      status: 'Pending',
      date: '2024-08-27',
      deliveryDate: '2024-08-29'
    },
    {
      id: 3,
      poNumber: 'PO-003',
      supplier: 'Tech Distributors Ltd',
      totalItems: 5,
      totalAmount: 125000,
      paymentMethod: 'Cash',
      status: 'In Transit',
      date: '2024-08-26',
      deliveryDate: '2024-08-31'
    },
    {
      id: 4,
      poNumber: 'PO-004',
      supplier: 'Apple Inc.',
      totalItems: 2,
      totalAmount: 65000,
      paymentMethod: 'Credit',
      status: 'Pending',
      date: '2024-08-25',
      deliveryDate: '2024-08-28'
    },
    {
      id: 5,
      poNumber: 'PO-005',
      supplier: 'Samsung Electronics',
      totalItems: 4,
      totalAmount: 95000,
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      date: '2024-08-24',
      deliveryDate: '2024-08-27'
    }
  ]);

  // Sample suppliers data
  const suppliers = [
    { id: 1, name: 'Apple Inc.', contact: '+1-800-APL-CARE', email: 'orders@apple.com' },
    { id: 2, name: 'Samsung Electronics', contact: '+1-800-SAM-SUNG', email: 'b2b@samsung.com' },
    { id: 3, name: 'Tech Distributors Ltd', contact: '+1-555-TECH-123', email: 'sales@techdist.com' },
    { id: 4, name: 'Global Electronics', contact: '+1-555-GLOBAL-1', email: 'purchase@global.com' }
  ];

  // Filter and search logic
  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSupplier = supplierFilter === 'all' || 
        order.supplier.toLowerCase().includes(supplierFilter.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        order.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase();
      
      const matchesPaymentMethod = paymentMethodFilter === 'all' || 
        order.paymentMethod.toLowerCase().replace(' ', '-') === paymentMethodFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || order.date === dateFilter;
      
      return matchesSearch && matchesSupplier && matchesStatus && matchesPaymentMethod && matchesDate;
    });
  }, [purchaseOrders, searchTerm, supplierFilter, statusFilter, paymentMethodFilter, dateFilter]);

  // Handle form changes
  const handleFormChange = (field, value) => {
    setPurchaseFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle purchase item changes
  const updatePurchaseItem = (id, field, value) => {
    setPurchaseItems(purchaseItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'qty' || field === 'cost') {
          updatedItem.total = updatedItem.qty * updatedItem.cost;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  // Add new purchase item
  const addPurchaseItem = () => {
    const newItem = {
      id: Math.max(...purchaseItems.map(item => item.id)) + 1,
      name: '',
      qty: 1,
      cost: 0,
      total: 0
    };
    setPurchaseItems([...purchaseItems, newItem]);
  };

  // Remove purchase item
  const removePurchaseItem = (id) => {
    if (purchaseItems.length > 1) {
      setPurchaseItems(purchaseItems.filter(item => item.id !== id));
    }
  };

  // Calculate total purchase amount
  const getTotalPurchaseAmount = () => {
    return purchaseItems.reduce((sum, item) => sum + item.total, 0);
  };

  // Generate PO number
  const generatePONumber = () => {
    const maxPO = Math.max(...purchaseOrders.map(po => parseInt(po.poNumber.split('-')[1])));
    return `PO-${String(maxPO + 1).padStart(3, '0')}`;
  };

  // Create purchase order
  const handleCreatePurchaseOrder = () => {
    const validItems = purchaseItems.filter(item => item.name && item.qty > 0 && item.cost > 0);
    
    if (!purchaseFormData.supplier || validItems.length === 0) {
      alert('Please select a supplier and add at least one valid item.');
      return;
    }

    const newPurchaseOrder = {
      id: Math.max(...purchaseOrders.map(po => po.id)) + 1,
      poNumber: generatePONumber(),
      supplier: purchaseFormData.supplier,
      totalItems: validItems.length,
      totalAmount: getTotalPurchaseAmount(),
      paymentMethod: purchaseFormData.paymentMethod || 'Cash',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: purchaseFormData.deliveryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setPurchaseOrders(prev => [newPurchaseOrder, ...prev]);
    
    // Reset form
    resetPurchaseForm();
    alert(`Purchase Order ${newPurchaseOrder.poNumber} created successfully!`);
  };

  // Handle new purchase order modal
  const handleNewPurchaseOrder = () => {
    resetPurchaseForm();
    setIsNewPurchaseModalOpen(true);
  };

  // Create purchase order from modal
  const handleCreateFromModal = () => {
    handleCreatePurchaseOrder();
    setIsNewPurchaseModalOpen(false);
  };

  // Reset purchase form
  const resetPurchaseForm = () => {
    setPurchaseFormData({
      supplier: '',
      deliveryDate: '',
      paymentMethod: '',
      notes: ''
    });
    setPurchaseItems([{ id: 1, name: '', qty: 1, cost: 0, total: 0 }]);
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Card':
        return <CreditCard className="h-4 w-4" />;
      case 'Cash':
        return <Banknote className="h-4 w-4" />;
      case 'Bank Transfer':
        return <Smartphone className="h-4 w-4" />;
      case 'Credit':
        return <FileText className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'In Transit':
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <Truck className="h-3 w-3 mr-1" />
            In Transit
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSupplierFilter('all');
    setStatusFilter('all');
    setPaymentMethodFilter('all');
    setDateFilter('');
  };

  // Get unique suppliers for filter
  const uniqueSuppliers = [...new Set(purchaseOrders.map(order => order.supplier))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purchase Management</h2>
          <p className="text-muted-foreground">
            Manage suppliers and purchase orders
          </p>
        </div>
        <Dialog open={isNewPurchaseModalOpen} onOpenChange={setIsNewPurchaseModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2" onClick={handleNewPurchaseOrder}>
              <Plus className="h-4 w-4" />
              <span>New Purchase Order</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Purchase Order</DialogTitle>
              <DialogDescription>
                Create a new purchase order for suppliers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="modalSupplier">Supplier</Label>
                  <Select value={purchaseFormData.supplier} onValueChange={(value) => handleFormChange('supplier', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modalDeliveryDate">Expected Delivery</Label>
                  <Input
                    id="modalDeliveryDate"
                    type="date"
                    value={purchaseFormData.deliveryDate}
                    onChange={(e) => handleFormChange('deliveryDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modalPaymentMethod">Payment Method</Label>
                  <Select value={purchaseFormData.paymentMethod} onValueChange={(value) => handleFormChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Purchase Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Purchase Items</h3>
                  <Button variant="outline" onClick={addPurchaseItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            placeholder="Enter item name"
                            value={item.name}
                            onChange={(e) => updatePurchaseItem(item.id, 'name', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updatePurchaseItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.cost}
                            onChange={(e) => updatePurchaseItem(item.id, 'cost', parseFloat(e.target.value) || 0)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">${item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removePurchaseItem(item.id)}
                            disabled={purchaseItems.length === 1}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-lg font-medium">
                    Total Purchase Amount: ${getTotalPurchaseAmount().toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="modalNotes">Notes (Optional)</Label>
                <Textarea
                  id="modalNotes"
                  value={purchaseFormData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Additional notes for this purchase order..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewPurchaseModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFromModal}>
                Create Purchase Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Create Purchase Order */}
      <Card>
        <CardHeader>
          <CardTitle>Create Purchase Order</CardTitle>
          <CardDescription>
            Create a new purchase order for suppliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Select value={purchaseFormData.supplier} onValueChange={(value) => handleFormChange('supplier', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryDate">Expected Delivery</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={purchaseFormData.deliveryDate}
                onChange={(e) => handleFormChange('deliveryDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={purchaseFormData.paymentMethod} onValueChange={(value) => handleFormChange('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Purchase Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Purchase Items</h3>
              <Button variant="outline" onClick={addPurchaseItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        placeholder="Enter item name"
                        value={item.name}
                        onChange={(e) => updatePurchaseItem(item.id, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updatePurchaseItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.cost}
                        onChange={(e) => updatePurchaseItem(item.id, 'cost', parseFloat(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removePurchaseItem(item.id)}
                        disabled={purchaseItems.length === 1}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-lg font-medium">
                Total Purchase Amount: ${getTotalPurchaseAmount().toFixed(2)}
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={resetPurchaseForm}>Reset</Button>
                <Button onClick={handleCreatePurchaseOrder}>Create Purchase Order</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Purchase Orders</CardTitle>
          <CardDescription>
            Search by PO number or supplier name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Supplier</Label>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {uniqueSuppliers.map(supplier => (
                    <SelectItem key={supplier} value={supplier.toLowerCase()}>
                      {supplier}
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
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
            Showing {filteredPurchaseOrders.length} of {purchaseOrders.length} purchase orders
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            View and manage all purchase orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{order.poNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span>{order.totalItems} items</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(order.paymentMethod)}
                      <span>{order.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button className="text-blue-600 hover:text-blue-700" variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button className="text-gray-600 hover:text-gray-700" variant="outline" size="sm">
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPurchaseOrders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No purchase orders found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPurchaseOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Filtered results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredPurchaseOrders.filter(order => order.status === 'Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredPurchaseOrders.filter(order => order.status === 'In Transit').length}
            </div>
            <p className="text-xs text-muted-foreground">
              On the way
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredPurchaseOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total purchase value
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Purchase;

