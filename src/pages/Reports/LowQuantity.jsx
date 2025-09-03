import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';

const LowQuantity = () => {
  // Sample low quantity products
  const lowQtyProducts = [
    { name: 'AirPods Pro', currentStock: 3, reorderLevel: 15, status: 'Critical' },
    { name: 'Apple Watch Series 8', currentStock: 7, reorderLevel: 12, status: 'Low' },
    { name: 'iPhone 13 Pro', currentStock: 9, reorderLevel: 10, status: 'Low' }
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default LowQuantity;