import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  CheckCircle
} from 'lucide-react';

const Returns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refundMethodFilter, setRefundMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [stockUpdateFilter, setStockUpdateFilter] = useState('all');
  
  // Sample returns data
  const returnsData = [
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
      stockUpdated: true
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
      stockUpdated: false
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
      stockUpdated: true
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
      stockUpdated: false
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
      stockUpdated: false
    }
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
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Return</span>
        </Button>
      </div>

      {/* New Return Form */}
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
              />
            </div>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iphone14pro">iPhone 14 Pro</SelectItem>
                  <SelectItem value="galaxys23">Samsung Galaxy S23</SelectItem>
                  <SelectItem value="macbook">MacBook Air M2</SelectItem>
                  <SelectItem value="airpods">AirPods Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Return Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="1"
                min="1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Return Reason</Label>
              <Textarea
                id="reason"
                placeholder="Describe the reason for return..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="refundMethod">Refund Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="mfs">MFS</SelectItem>
                  <SelectItem value="store-credit">Store Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Process Return</Button>
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
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3" />
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
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredReturns.reduce((sum, item) => sum + item.refundAmount, 0).toLocaleString()}
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
              {filteredReturns.filter(item => item.status === 'Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Updates Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReturns.filter(item => !item.stockUpdated).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need stock update
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Returns;

