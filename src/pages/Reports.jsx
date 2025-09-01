import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  FileText,
  Printer
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('today');
  
  // Sample daily sales data
  const dailySales = [
    { date: '2024-08-28', sales: 15420, transactions: 45, profit: 3240 },
    { date: '2024-08-27', sales: 12350, transactions: 38, profit: 2890 },
    { date: '2024-08-26', sales: 18900, transactions: 52, profit: 4120 },
    { date: '2024-08-25', sales: 14200, transactions: 41, profit: 3050 }
  ];

  // Sample monthly sales data
  const monthlySales = [
    { month: 'August 2024', sales: 245680, transactions: 1250, profit: 52340 },
    { month: 'July 2024', sales: 198450, transactions: 1120, profit: 41230 },
    { month: 'June 2024', sales: 223100, transactions: 1340, profit: 48900 }
  ];

  // Sample profit & loss data
  const profitLoss = [
    { category: 'Revenue', amount: 245680, type: 'income' },
    { category: 'Cost of Goods Sold', amount: 180340, type: 'expense' },
    { category: 'Operating Expenses', amount: 13110, type: 'expense' },
    { category: 'Net Profit', amount: 52230, type: 'profit' }
  ];

  // Sample best products data
  const bestProducts = [
    { name: 'iPhone 14 Pro', sales: 145, revenue: 144855, profit: 21728 },
    { name: 'Samsung Galaxy S23', sales: 98, revenue: 88102, profit: 14658 },
    { name: 'MacBook Air M2', sales: 67, revenue: 80333, profit: 13355 },
    { name: 'iPad Pro', sales: 89, revenue: 71111, profit: 12444 }
  ];

  // Sample low quantity products
  const lowQtyProducts = [
    { name: 'AirPods Pro', currentStock: 3, reorderLevel: 15, status: 'Critical' },
    { name: 'Apple Watch Series 8', currentStock: 7, reorderLevel: 12, status: 'Low' },
    { name: 'iPhone 13 Pro', currentStock: 9, reorderLevel: 10, status: 'Low' }
  ];

  // Sample expired products
  const expiredProducts = [
    { name: 'Samsung Charger', quantity: 10, expiryDate: '2024-08-25', cost: 250 },
    { name: 'Phone Cases', quantity: 25, expiryDate: '2024-08-20', cost: 125 },
    { name: 'Screen Protectors', quantity: 15, expiryDate: '2024-08-15', cost: 75 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and view comprehensive business reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="best-products">Best Products</TabsTrigger>
          <TabsTrigger value="low-qty">Low Quantity</TabsTrigger>
          <TabsTrigger value="expired">Date Over</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          {/* Date Range Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Report Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>From Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>To Date</Label>
                  <Input type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Sales Report */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Report</CardTitle>
              <CardDescription>
                Daily sales performance overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Avg. Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailySales.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>${day.sales.toLocaleString()}</TableCell>
                      <TableCell>{day.transactions}</TableCell>
                      <TableCell className="text-green-600">${day.profit.toLocaleString()}</TableCell>
                      <TableCell>${Math.round(day.sales / day.transactions)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Monthly Sales Report */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Report</CardTitle>
              <CardDescription>
                Monthly sales performance overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlySales.map((month, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell>${month.sales.toLocaleString()}</TableCell>
                      <TableCell>{month.transactions}</TableCell>
                      <TableCell className="text-green-600">${month.profit.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>+8.2%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>
                Financial performance overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLoss.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell className={
                        item.type === 'income' ? 'text-green-600' : 
                        item.type === 'expense' ? 'text-red-600' : 
                        'text-blue-600 font-bold'
                      }>
                        ${item.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {item.type === 'profit' ? (
                          <Badge variant="default">21.3%</Badge>
                        ) : (
                          <span className="text-gray-500">
                            {Math.round((item.amount / 245680) * 100)}%
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Selling Products</CardTitle>
              <CardDescription>
                Top performing products by sales and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Profit Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sales} units</TableCell>
                      <TableCell>${product.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">${product.profit.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {Math.round((product.profit / product.revenue) * 100)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-qty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Low Quantity Report</span>
              </CardTitle>
              <CardDescription>
                Products with low stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowQtyProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.currentStock} units</TableCell>
                      <TableCell>{product.reorderLevel} units</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'Critical' ? 'destructive' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expired Products Report</CardTitle>
              <CardDescription>
                Products that have passed their expiry date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Cost Impact</TableHead>
                    <TableHead>Days Overdue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiredProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.quantity} units</TableCell>
                      <TableCell>{product.expiryDate}</TableCell>
                      <TableCell className="text-red-600">${product.cost}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {Math.floor((new Date() - new Date(product.expiryDate)) / (1000 * 60 * 60 * 24))} days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receipt & Invoice Templates</CardTitle>
              <CardDescription>
                Manage your receipt and invoice templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Receipt Template</CardTitle>
                    <CardDescription>
                      Standard receipt format for sales transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Preview Template
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Invoice Template</CardTitle>
                    <CardDescription>
                      Professional invoice format for business transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Preview Template
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

