import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Printer, CreditCard, Banknote, Smartphone, Eye, Edit } from 'lucide-react';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Sample sales data
  const salesData = [
    {
      id: 1,
      invoiceNumber: 'INV-1001',
      productName: 'iPhone 14 Pro',
      image: '/api/placeholder/50/50',
      quantity: 2,
      unitPrice: 999,
      discount: 50,
      paymentMethod: 'Card',
      total: 1948,
      status: 'Completed',
      customer: 'John Doe',
      date: '2024-08-28'
    },
    {
      id: 2,
      invoiceNumber: 'INV-1002',
      productName: 'Samsung Galaxy S23',
      image: '/api/placeholder/50/50',
      quantity: 1,
      unitPrice: 899,
      discount: 0,
      paymentMethod: 'Cash',
      total: 899,
      status: 'Completed',
      customer: 'Jane Smith',
      date: '2024-08-28'
    },
    {
      id: 3,
      invoiceNumber: 'INV-1003',
      productName: 'MacBook Air M2',
      image: '/api/placeholder/50/50',
      quantity: 1,
      unitPrice: 1199,
      discount: 100,
      paymentMethod: 'MFS',
      total: 1099,
      status: 'Pending',
      customer: 'Mike Johnson',
      date: '2024-08-27'
    },
    {
      id: 4,
      invoiceNumber: 'INV-1004',
      productName: 'AirPods Pro',
      image: '/api/placeholder/50/50',
      quantity: 3,
      unitPrice: 249,
      discount: 25,
      paymentMethod: 'Card',
      total: 722,
      status: 'Completed',
      customer: 'Sarah Wilson',
      date: '2024-08-27'
    },
    {
      id: 5,
      invoiceNumber: 'INV-1005',
      productName: 'iPad Pro',
      image: '/api/placeholder/50/50',
      quantity: 1,
      unitPrice: 1099,
      discount: 0,
      paymentMethod: 'Cash',
      total: 1099,
      status: 'Refunded',
      customer: 'David Brown',
      date: '2024-08-26'
    }
  ];

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

  const getPaymentIcon = (method) => {
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
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Sale</span>
        </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
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
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">IMG</span>
                      </div>
                      <span className="font-medium">{sale.productName}</span>
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
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentIcon(sale.paymentMethod)}
                      <span>{sale.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${sale.total}</TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default Sales;

