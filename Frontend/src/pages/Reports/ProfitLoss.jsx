import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProfitLoss = () => {
  // Sample profit & loss data
  const profitLoss = [
    { category: 'Revenue', amount: 245680, type: 'income' },
    { category: 'Cost of Goods Sold', amount: 180340, type: 'expense' },
    { category: 'Operating Expenses', amount: 13110, type: 'expense' },
    { category: 'Net Profit', amount: 52230, type: 'profit' }
  ];

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ProfitLoss;