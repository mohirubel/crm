import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BestProducts = () => {
  // Sample best products data
  const bestProducts = [
    { name: 'iPhone 14 Pro', sales: 145, revenue: 144855, profit: 21728 },
    { name: 'Samsung Galaxy S23', sales: 98, revenue: 88102, profit: 14658 },
    { name: 'MacBook Air M2', sales: 67, revenue: 80333, profit: 13355 },
    { name: 'iPad Pro', sales: 89, revenue: 71111, profit: 12444 }
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default BestProducts;