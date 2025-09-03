import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DateOver = () => {
  // Sample expired products
  const expiredProducts = [
    { name: 'Samsung Charger', quantity: 10, expiryDate: '2024-08-25', cost: 250 },
    { name: 'Phone Cases', quantity: 25, expiryDate: '2024-08-20', cost: 125 },
    { name: 'Screen Protectors', quantity: 15, expiryDate: '2024-08-15', cost: 75 }
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default DateOver;