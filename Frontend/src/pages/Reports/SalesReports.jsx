import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp } from 'lucide-react';

const SalesReports = () => {
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

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default SalesReports;