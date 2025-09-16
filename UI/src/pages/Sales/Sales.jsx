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
  Printer,
  Eye,
  Edit,
  X
} from 'lucide-react';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    paymentMethod: '',
    customer: '',
    notes: ''
  });
  
  // Sample sales data with state management
  const [salesData, setSalesData] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-1001',
      productName: 'iPhone 14 Pro',
      productImage: 'IMG',
      quantity: 2,
      unitPrice: 999,
      discount: 50,
      total: 1948,
      paymentMethod: 'Card',
      status: 'Completed',
      date: '2024-08-28',
      customer: 'John Doe',
      notes: 'Customer requested express delivery'
    },
    {
      id: 2,
      invoiceNumber: 'INV-1002',
      productName: 'Samsung Galaxy S23',
      productImage: 'IMG',
      quantity: 1,
      unitPrice: 899,
      discount: 0,
      total: 899,
      paymentMethod: 'Cash',
      status: 'Completed',
      date: '2024-08-28',
      customer: 'Jane Smith',
      notes: 'Regular customer'
    },
    {
      id: 3,
      invoiceNumber: 'INV-1003',
      productName: 'MacBook Air M2',
      productImage: 'IMG',
      quantity: 1,
      unitPrice: 1299,
      discount: 100,
      total: 1199,
      paymentMethod: 'MFS',
      status: 'Pending',
      date: '2024-08-27',
      customer: 'Mike Johnson',
      notes: 'Waiting for payment confirmation'
    },
    {
      id: 4,
      invoiceNumber: 'INV-1004',
      productName: 'AirPods Pro',
      productImage: 'IMG',
      quantity: 3,
      unitPrice: 249,
      discount: 25,
      total: 722,
      paymentMethod: 'Card',
      status: 'Completed',
      date: '2024-08-27',
      customer: 'Sarah Wilson',
      notes: 'Bulk purchase discount applied'
    },
    {
      id: 5,
      invoiceNumber: 'INV-1005',
      productName: 'iPad Pro',
      productImage: 'IMG',
      quantity: 1,
      unitPrice: 1099,
      discount: 0,
      total: 1099,
      paymentMethod: 'Cash',
      status: 'Refunded',
      date: '2024-08-26',
      customer: 'David Brown',
      notes: 'Product returned due to defect'
    }
  ]);

  // Filter and search logic
  const filteredSales = useMemo(() => {
    return salesData.filter(sale => {
      const matchesSearch = searchTerm === '' || 
        sale.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPayment = paymentFilter === 'all' || 
        sale.paymentMethod.toLowerCase() === paymentFilter.toLowerCase();
      
      const matchesStatus = statusFilter === 'all' || 
        sale.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || sale.date === dateFilter;
      
      return matchesSearch && matchesPayment && matchesStatus && matchesDate;
    });
  }, [salesData, searchTerm, paymentFilter, statusFilter, dateFilter]);

  // Generate new invoice number
  const generateInvoiceNumber = () => {
    const maxId = Math.max(...salesData.map(sale => sale.id));
    return `INV-${(1000 + maxId + 1)}`;
  };

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = formData.quantity * formData.unitPrice;
    return subtotal - formData.discount;
  };

  // Add new sale
  const handleAddSale = () => {
    const newSale = {
      id: Math.max(...salesData.map(sale => sale.id)) + 1,
      invoiceNumber: generateInvoiceNumber(),
      productName: formData.productName,
      productImage: 'IMG',
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      discount: parseFloat(formData.discount),
      total: calculateTotal(),
      paymentMethod: formData.paymentMethod,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      customer: formData.customer,
      notes: formData.notes
    };

    setSalesData(prev => [newSale, ...prev]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit sale
  const handleEditSale = () => {
    const updatedSale = {
      ...selectedSale,
      productName: formData.productName,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      discount: parseFloat(formData.discount),
      total: calculateTotal(),
      paymentMethod: formData.paymentMethod,
      customer: formData.customer,
      notes: formData.notes
    };

    setSalesData(prev => prev.map(sale => 
      sale.id === selectedSale.id ? updatedSale : sale
    ));
    setIsEditModalOpen(false);
    resetForm();
    setSelectedSale(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      productName: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      paymentMethod: '',
      customer: '',
      notes: ''
    });
  };

  // Open edit modal
  const openEditModal = (sale) => {
    setSelectedSale(sale);
    setFormData({
      productName: sale.productName,
      quantity: sale.quantity,
      unitPrice: sale.unitPrice,
      discount: sale.discount,
      paymentMethod: sale.paymentMethod,
      customer: sale.customer,
      notes: sale.notes
    });
    setIsEditModalOpen(true);
  };

  // Open view modal
  const openViewModal = (sale) => {
    setSelectedSale(sale);
    setIsViewModalOpen(true);
  };

  // Print functionality
  const handlePrint = (sale) => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${sale.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .table th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 18px; }
            .footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sales Invoice</h1>
            <h2>${sale.invoiceNumber}</h2>
          </div>
          
          <div class="invoice-details">
            <p><strong>Date:</strong> ${sale.date}</p>
            <p><strong>Customer:</strong> ${sale.customer}</p>
            <p><strong>Payment Method:</strong> ${sale.paymentMethod}</p>
            <p><strong>Status:</strong> ${sale.status}</p>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.unitPrice}</td>
                <td>$${sale.discount}</td>
                <td>$${sale.total}</td>
              </tr>
            </tbody>
          </table>

          <div class="total">
            <p>Total Amount: $${sale.total}</p>
          </div>

          ${sale.notes ? `<div><p><strong>Notes:</strong> ${sale.notes}</p></div>` : ''}

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Card':
        return <CreditCard className="h-4 w-4" />;
      case 'Cash':
        return <Banknote className="h-4 w-4" />;
      case 'MFS':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Pending</Badge>;
      case 'Refunded':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPaymentFilter('all');
    setStatusFilter('all');
    setDateFilter('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
          <p className="text-muted-foreground">
            Manage your sales transactions and generate invoices
          </p>
        </div>
        <div className='flex gap-x-2'>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Sale</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sale</DialogTitle>
              <DialogDescription>
                Create a new sales transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleFormChange('productName', e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleFormChange('quantity', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="unitPrice">Unit Price</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => handleFormChange('unitPrice', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => handleFormChange('discount', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleFormChange('paymentMethod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="MFS">MFS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleFormChange('customer', e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Total Amount</Label>
                <div className="text-lg font-bold">${calculateTotal().toFixed(2)}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSale} disabled={!formData.productName || !formData.customer || !formData.paymentMethod}>
                Add Sale
              </Button>
            </DialogFooter>
          </DialogContent>
         </Dialog>
         <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Sales</CardTitle>
          <CardDescription>
            Search by invoice number, product name, or customer name
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
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="mfs">MFS</SelectItem>
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input 
                type="date" 
                value={dateFilter}
                className="w-auto"
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            {/* <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div> */}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredSales.length} of {salesData.length} sales
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            View and manage your sales transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.invoiceNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                        {sale.productImage}
                      </div>
                      <span>{sale.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>${sale.unitPrice}</TableCell>
                  <TableCell>
                    {sale.discount > 0 ? (
                      <Badge variant="secondary">${sale.discount}</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">${sale.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(sale.paymentMethod)}
                      <span>{sale.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                      className="text-teal-600 hover:text-teal-700"                       
                        variant="outline" 
                        size="sm"
                        onClick={() => openViewModal(sale)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                      className="text-opal-600 hover:text-opal-700"
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrint(sale)}
                      >
                        <Printer className="h-3 w-3" />
                      </Button>
                      <Button 
                      className="text-blue-600 hover:text-blue-700"
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditModal(sale)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sales found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Sale</DialogTitle>
            <DialogDescription>
              Update sales transaction details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editProductName">Product Name</Label>
              <Input
                id="editProductName"
                value={formData.productName}
                onChange={(e) => handleFormChange('productName', e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="editQuantity">Quantity</Label>
                <Input
                  id="editQuantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="editUnitPrice">Unit Price</Label>
                <Input
                  id="editUnitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleFormChange('unitPrice', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editDiscount">Discount</Label>
              <Input
                id="editDiscount"
                type="number"
                min="0"
                step="0.01"
                value={formData.discount}
                onChange={(e) => handleFormChange('discount', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editPaymentMethod">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleFormChange('paymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="MFS">MFS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editCustomer">Customer Name</Label>
              <Input
                id="editCustomer"
                value={formData.customer}
                onChange={(e) => handleFormChange('customer', e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editNotes">Notes (Optional)</Label>
              <Textarea
                id="editNotes"
                value={formData.notes}
                onChange={(e) => handleFormChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Total Amount</Label>
              <div className="text-lg font-bold">${calculateTotal().toFixed(2)}</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSale}>
              Update Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sale Details</DialogTitle>
            <DialogDescription>
              View complete sales transaction information
            </DialogDescription>
          </DialogHeader>
          {selectedSale && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Invoice Number</Label>
                  <p className="text-lg font-semibold">{selectedSale.invoiceNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Date</Label>
                  <p className="text-lg">{selectedSale.date}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-500">Product Information</Label>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Product:</span> {selectedSale.productName}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedSale.quantity}</p>
                  <p><span className="font-medium">Unit Price:</span> ${selectedSale.unitPrice}</p>
                  <p><span className="font-medium">Discount:</span> ${selectedSale.discount}</p>
                  <p><span className="font-medium text-lg">Total:</span> <span className="text-lg font-bold">${selectedSale.total}</span></p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-500">Payment & Customer</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Payment Method:</span>
                    {getPaymentMethodIcon(selectedSale.paymentMethod)}
                    <span>{selectedSale.paymentMethod}</span>
                  </div>
                  <p><span className="font-medium">Customer:</span> {selectedSale.customer}</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Status:</span>
                    {getStatusBadge(selectedSale.status)}
                  </div>
                </div>
              </div>

              {selectedSale.notes && (
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium text-gray-500">Notes</Label>
                  <p className="mt-2 text-sm bg-gray-50 p-3 rounded">{selectedSale.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedSale && handlePrint(selectedSale)}>
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredSales.length}</div>
            <p className="text-xs text-muted-foreground">
              Filtered results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredSales.reduce((sum, sale) => sum + sale.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From filtered sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredSales.length > 0 ? Math.round(filteredSales.reduce((sum, sale) => sum + sale.total, 0) / filteredSales.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Average value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Smartphone className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSales.filter(sale => sale.status === 'Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;

