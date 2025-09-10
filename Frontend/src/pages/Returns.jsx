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
  RotateCcw, 
  CreditCard, 
  Banknote, 
  Smartphone,
  FileText,
  AlertCircle,
  CheckCircle,
  Eye,
  DollarSign
} from 'lucide-react';

const Returns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refundMethodFilter, setRefundMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [stockUpdateFilter, setStockUpdateFilter] = useState('all');
  
  // Modal states
  const [isNewReturnModalOpen, setIsNewReturnModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  
  // Form states
  const [returnFormData, setReturnFormData] = useState({
    originalInvoice: '',
    productName: '',
    quantity: 1,
    reason: '',
    refundMethod: '',
    refundAmount: 0
  });
  
  // Sample returns data with state management
  const [returnsData, setReturnsData] = useState([
    {
      id: 1,
      returnInvoice: 'RET-001',
      originalInvoice: 'INV-1234',
      productName: 'iPhone 14 Pro',
      quantity: 1,
      reason: 'Defective product',
      refundMethod: 'Card',
      refundAmount: 999,
      status: 'Processed',
      date: '2024-08-28',
      stockUpdated: true,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      processedBy: 'Admin',
      notes: 'Screen flickering issue reported by customer'
    },
    {
      id: 2,
      returnInvoice: 'RET-002',
      originalInvoice: 'INV-1235',
      productName: 'Samsung Galaxy S23',
      quantity: 1,
      reason: 'Customer changed mind',
      refundMethod: 'Cash',
      refundAmount: 899,
      status: 'Pending',
      date: '2024-08-28',
      stockUpdated: false,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      processedBy: '',
      notes: 'Customer requested return within 7 days'
    },
    {
      id: 3,
      returnInvoice: 'RET-003',
      originalInvoice: 'INV-1236',
      productName: 'AirPods Pro',
      quantity: 2,
      reason: 'Wrong item ordered',
      refundMethod: 'MFS',
      refundAmount: 498,
      status: 'Processed',
      date: '2024-08-27',
      stockUpdated: true,
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      processedBy: 'Admin',
      notes: 'Customer ordered AirPods Max but received Pro'
    },
    {
      id: 4,
      returnInvoice: 'RET-004',
      originalInvoice: 'INV-1237',
      productName: 'MacBook Air M2',
      quantity: 1,
      reason: 'Screen damage',
      refundMethod: 'Card',
      refundAmount: 1199,
      status: 'Rejected',
      date: '2024-08-26',
      stockUpdated: false,
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      processedBy: 'Manager',
      notes: 'Damage appears to be user-caused, not manufacturing defect'
    },
    {
      id: 5,
      returnInvoice: 'RET-005',
      originalInvoice: 'INV-1238',
      productName: 'iPad Pro',
      quantity: 1,
      reason: 'Not as described',
      refundMethod: 'Store Credit',
      refundAmount: 1099,
      status: 'Pending',
      date: '2024-08-25',
      stockUpdated: false,
      customerName: 'David Brown',
      customerEmail: 'david@example.com',
      processedBy: '',
      notes: 'Customer expected different storage capacity'
    }
  ]);

  // Sample products for dropdown
  const products = [
    { name: 'iPhone 14 Pro', price: 999 },
    { name: 'Samsung Galaxy S23', price: 899 },
    { name: 'MacBook Air M2', price: 1199 },
    { name: 'AirPods Pro', price: 249 },
    { name: 'iPad Pro', price: 1099 }
  ];

  // Filter and search logic
  const filteredReturns = useMemo(() => {
    return returnsData.filter(returnItem => {
      const matchesSearch = searchTerm === '' || 
        returnItem.returnInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.originalInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        returnItem.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesRefundMethod = refundMethodFilter === 'all' || 
        returnItem.refundMethod.toLowerCase().replace(' ', '-') === refundMethodFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || returnItem.date === dateFilter;
      
      const matchesStockUpdate = stockUpdateFilter === 'all' || 
        (stockUpdateFilter === 'updated' && returnItem.stockUpdated) ||
        (stockUpdateFilter === 'pending' && !returnItem.stockUpdated);
      
      return matchesSearch && matchesStatus && matchesRefundMethod && matchesDate && matchesStockUpdate;
    });
  }, [returnsData, searchTerm, statusFilter, refundMethodFilter, dateFilter, stockUpdateFilter]);

  // Handle form changes
  const handleFormChange = (field, value) => {
    setReturnFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-calculate refund amount when product is selected
    if (field === 'productName') {
      const product = products.find(p => p.name === value);
      if (product) {
        setReturnFormData(prev => ({
          ...prev,
          refundAmount: product.price * prev.quantity
        }));
      }
    }
    
    // Recalculate refund amount when quantity changes
    if (field === 'quantity') {
      const product = products.find(p => p.name === returnFormData.productName);
      if (product) {
        setReturnFormData(prev => ({
          ...prev,
          refundAmount: product.price * parseInt(value)
        }));
      }
    }
  };

  // Generate return invoice number
  const generateReturnInvoice = () => {
    const maxReturn = Math.max(...returnsData.map(ret => parseInt(ret.returnInvoice.split('-')[1])));
    return `RET-${String(maxReturn + 1).padStart(3, '0')}`;
  };

  // Process new return
  const handleProcessReturn = () => {
    if (!returnFormData.originalInvoice || !returnFormData.productName || !returnFormData.reason || !returnFormData.refundMethod) {
      alert('Please fill in all required fields.');
      return;
    }

    const newReturn = {
      id: Math.max(...returnsData.map(ret => ret.id)) + 1,
      returnInvoice: generateReturnInvoice(),
      originalInvoice: returnFormData.originalInvoice,
      productName: returnFormData.productName,
      quantity: parseInt(returnFormData.quantity),
      reason: returnFormData.reason,
      refundMethod: returnFormData.refundMethod,
      refundAmount: returnFormData.refundAmount,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      stockUpdated: false,
      customerName: 'New Customer',
      customerEmail: 'customer@example.com',
      processedBy: '',
      notes: returnFormData.reason
    };

    setReturnsData(prev => [newReturn, ...prev]);
    resetReturnForm();
    alert(`Return ${newReturn.returnInvoice} created successfully!`);
  };

  // Handle new return modal
  const handleNewReturn = () => {
    resetReturnForm();
    setIsNewReturnModalOpen(true);
  };

  // Process return from modal
  const handleProcessFromModal = () => {
    handleProcessReturn();
    setIsNewReturnModalOpen(false);
  };

  // Reset return form
  const resetReturnForm = () => {
    setReturnFormData({
      originalInvoice: '',
      productName: '',
      quantity: 1,
      reason: '',
      refundMethod: '',
      refundAmount: 0
    });
  };

  // View return details
  const handleViewDetails = (returnItem) => {
    setSelectedReturn(returnItem);
    setIsViewDetailsModalOpen(true);
  };

  const getRefundMethodIcon = (method) => {
    switch (method) {
      case 'Card':
        return <CreditCard className="h-4 w-4" />;
      case 'Cash':
        return <Banknote className="h-4 w-4" />;
      case 'MFS':
        return <Smartphone className="h-4 w-4" />;
      case 'Store Credit':
        return <FileText className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Processed
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setRefundMethodFilter('all');
    setDateFilter('');
    setStockUpdateFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Returns / Refunds</h2>
          <p className="text-muted-foreground">
            Manage product returns and process refunds
          </p>
        </div>
        <Dialog open={isNewReturnModalOpen} onOpenChange={setIsNewReturnModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2" onClick={handleNewReturn}>
              <Plus className="h-4 w-4" />
              <span>New Return</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Process New Return</DialogTitle>
              <DialogDescription>
                Create a new return request and process refund
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalOriginalInvoice">Original Invoice Number</Label>
                  <Input
                    id="modalOriginalInvoice"
                    placeholder="INV-1234"
                    value={returnFormData.originalInvoice}
                    onChange={(e) => handleFormChange('originalInvoice', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modalProductName">Product Name</Label>
                  <Select value={returnFormData.productName} onValueChange={(value) => handleFormChange('productName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.name} value={product.name}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalQuantity">Return Quantity</Label>
                  <Input
                    id="modalQuantity"
                    type="number"
                    min="1"
                    value={returnFormData.quantity}
                    onChange={(e) => handleFormChange('quantity', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modalRefundMethod">Refund Method</Label>
                  <Select value={returnFormData.refundMethod} onValueChange={(value) => handleFormChange('refundMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="MFS">MFS</SelectItem>
                      <SelectItem value="Store Credit">Store Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modalReason">Return Reason</Label>
                <Textarea
                  id="modalReason"
                  placeholder="Describe the reason for return..."
                  value={returnFormData.reason}
                  onChange={(e) => handleFormChange('reason', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Refund Amount</Label>
                <div className="text-2xl font-bold text-green-600">${returnFormData.refundAmount}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewReturnModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProcessFromModal}>
                Process Return
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Process New Return Form */}
      <Card>
        <CardHeader>
          <CardTitle>Process New Return</CardTitle>
          <CardDescription>
            Create a new return request and process refund
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="originalInvoice">Original Invoice Number</Label>
              <Input
                id="originalInvoice"
                placeholder="INV-1234"
                value={returnFormData.originalInvoice}
                onChange={(e) => handleFormChange('originalInvoice', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Select value={returnFormData.productName} onValueChange={(value) => handleFormChange('productName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.name} value={product.name}>
                      {product.name} - ${product.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Return Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={returnFormData.quantity}
                onChange={(e) => handleFormChange('quantity', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Return Reason</Label>
              <Textarea
                id="reason"
                placeholder="Describe the reason for return..."
                className="min-h-[80px]"
                value={returnFormData.reason}
                onChange={(e) => handleFormChange('reason', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="refundMethod">Refund Method</Label>
              <Select value={returnFormData.refundMethod} onValueChange={(value) => handleFormChange('refundMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="MFS">MFS</SelectItem>
                  <SelectItem value="Store Credit">Store Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-medium">
              Refund Amount: <span className="text-green-600">${returnFormData.refundAmount}</span>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={resetReturnForm}>Reset</Button>
              <Button onClick={handleProcessReturn}>Process Return</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Returns</CardTitle>
          <CardDescription>
            Search by invoice number, product name, or reason
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
                  placeholder="Search returns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Refund Method</Label>
              <Select value={refundMethodFilter} onValueChange={setRefundMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="mfs">MFS</SelectItem>
                  <SelectItem value="store-credit">Store Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stock Update</Label>
              <Select value={stockUpdateFilter} onValueChange={setStockUpdateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Updates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Updates</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
            Showing {filteredReturns.length} of {returnsData.length} returns
          </div>
        </CardContent>
      </Card>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Returns History</CardTitle>
          <CardDescription>
            View and manage all return requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Invoice</TableHead>
                <TableHead>Original Invoice</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Refund Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock Update</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>{returnItem.returnInvoice}</span>
                    </div>
                  </TableCell>
                  <TableCell>{returnItem.originalInvoice}</TableCell>
                  <TableCell>{returnItem.productName}</TableCell>
                  <TableCell>{returnItem.quantity}</TableCell>
                  <TableCell>
                    <div className="max-w-32 truncate" title={returnItem.reason}>
                      {returnItem.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRefundMethodIcon(returnItem.refundMethod)}
                      <span>{returnItem.refundMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${returnItem.refundAmount}</TableCell>
                  <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                  <TableCell>
                    {returnItem.stockUpdated ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Updated
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{returnItem.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button className="text-teal-600 hover:text-teal-700" variant="outline" size="sm" onClick={() => handleViewDetails(returnItem)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button className="text-blue-600 hover:text-blue-700" variant="outline" size="sm">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredReturns.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No returns found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={isViewDetailsModalOpen} onOpenChange={setIsViewDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
            <DialogDescription>
              Complete information about this return request
            </DialogDescription>
          </DialogHeader>
          {selectedReturn && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Return Invoice</Label>
                  <div className="text-lg font-semibold">{selectedReturn.returnInvoice}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Original Invoice</Label>
                  <div className="text-lg font-semibold">{selectedReturn.originalInvoice}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Product</Label>
                  <div className="text-lg">{selectedReturn.productName}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Quantity</Label>
                  <div className="text-lg">{selectedReturn.quantity} units</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Customer</Label>
                  <div className="text-lg">{selectedReturn.customerName}</div>
                  <div className="text-sm text-gray-500">{selectedReturn.customerEmail}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Return Date</Label>
                  <div className="text-lg">{selectedReturn.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Refund Method</Label>
                  <div className="flex items-center space-x-2 text-lg">
                    {getRefundMethodIcon(selectedReturn.refundMethod)}
                    <span>{selectedReturn.refundMethod}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Refund Amount</Label>
                  <div className="text-lg font-semibold text-green-600">${selectedReturn.refundAmount}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedReturn.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Stock Update</Label>
                  <div className="mt-1">
                    {selectedReturn.stockUpdated ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Updated
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Return Reason</Label>
                <div className="text-lg mt-1">{selectedReturn.reason}</div>
              </div>

              {selectedReturn.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Additional Notes</Label>
                  <div className="text-lg mt-1">{selectedReturn.notes}</div>
                </div>
              )}

              {selectedReturn.processedBy && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Processed By</Label>
                  <div className="text-lg mt-1">{selectedReturn.processedBy}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReturns.length}</div>
            <p className="text-xs text-muted-foreground">
              Filtered results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredReturns.reduce((sum, ret) => sum + ret.refundAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total refunded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReturns.filter(ret => ret.status === 'Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Updates</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReturns.filter(ret => ret.stockUpdated).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Stock updated
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Returns;

