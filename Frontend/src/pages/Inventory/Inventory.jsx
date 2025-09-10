// import React, { useState, useMemo } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { 
//   Plus, 
//   Minus, 
//   Search, 
//   AlertTriangle, 
//   TrendingUp, 
//   TrendingDown,
//   Package,
//   Calendar
// } from 'lucide-react';

// const Inventory = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [movementTypeFilter, setMovementTypeFilter] = useState('all');
//   const [damageTypeFilter, setDamageTypeFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('');
  
//   // Modal states
//   const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
//   const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   // Form states
//   const [stockFormData, setStockFormData] = useState({
//     productId: '',
//     quantity: 1,
//     reason: ''
//   });

//   // Sample current stock data with state management
//   const [currentStock, setCurrentStock] = useState([
//     {
//       id: 1,
//       name: 'iPhone 14 Pro',
//       category: 'Smartphones',
//       currentStock: 25,
//       reorderLevel: 10,
//       lastUpdated: '2024-08-28',
//       status: 'Good'
//     },
//     {
//       id: 2,
//       name: 'Samsung Galaxy S23',
//       category: 'Smartphones',
//       currentStock: 15,
//       reorderLevel: 12,
//       lastUpdated: '2024-08-28',
//       status: 'Good'
//     },
//     {
//       id: 3,
//       name: 'AirPods Pro',
//       category: 'Accessories',
//       currentStock: 3,
//       reorderLevel: 15,
//       lastUpdated: '2024-08-27',
//       status: 'Low Stock'
//     },
//     {
//       id: 4,
//       name: 'MacBook Air M2',
//       category: 'Laptops',
//       currentStock: 8,
//       reorderLevel: 5,
//       lastUpdated: '2024-08-28',
//       status: 'Good'
//     },
//     {
//       id: 5,
//       name: 'iPad Pro',
//       category: 'Tablets',
//       currentStock: 2,
//       reorderLevel: 8,
//       lastUpdated: '2024-08-26',
//       status: 'Low Stock'
//     }
//   ]);

//   // Sample stock movements with state management
//   const [stockMovements, setStockMovements] = useState([
//     {
//       id: 1,
//       productName: 'iPhone 14 Pro',
//       type: 'IN',
//       quantity: 50,
//       reason: 'Purchase Order #PO-001',
//       date: '2024-08-28',
//       time: '10:30 AM'
//     },
//     {
//       id: 2,
//       productName: 'Samsung Galaxy S23',
//       type: 'OUT',
//       quantity: 5,
//       reason: 'Sales Transaction',
//       date: '2024-08-28',
//       time: '02:15 PM'
//     },
//     {
//       id: 3,
//       productName: 'MacBook Air M2',
//       type: 'OUT',
//       quantity: 2,
//       reason: 'Damage/Return',
//       date: '2024-08-27',
//       time: '11:45 AM'
//     },
//     {
//       id: 4,
//       productName: 'AirPods Pro',
//       type: 'IN',
//       quantity: 20,
//       reason: 'Purchase Order #PO-002',
//       date: '2024-08-26',
//       time: '09:15 AM'
//     },
//     {
//       id: 5,
//       productName: 'iPad Pro',
//       type: 'OUT',
//       quantity: 3,
//       reason: 'Sales Transaction',
//       date: '2024-08-25',
//       time: '03:30 PM'
//     }
//   ]);

//   // Sample expiry/damage data
//   const expiryDamage = [
//     {
//       id: 1,
//       productName: 'iPhone 13 Pro',
//       type: 'Damage',
//       quantity: 2,
//       reason: 'Water damage during transport',
//       date: '2024-08-26',
//       cost: 1800
//     },
//     {
//       id: 2,
//       productName: 'Samsung Charger',
//       type: 'Expiry',
//       quantity: 10,
//       reason: 'Warranty expired',
//       date: '2024-08-25',
//       cost: 250
//     },
//     {
//       id: 3,
//       productName: 'MacBook Pro',
//       type: 'Damage',
//       quantity: 1,
//       reason: 'Screen damage',
//       date: '2024-08-24',
//       cost: 2500
//     },
//     {
//       id: 4,
//       productName: 'USB Cable',
//       type: 'Expiry',
//       quantity: 25,
//       reason: 'Product recall',
//       date: '2024-08-23',
//       cost: 125
//     }
//   ];

//   // Filter logic for current stock
//   const filteredCurrentStock = useMemo(() => {
//     return currentStock.filter(item => {
//       const matchesSearch = searchTerm === '' || 
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesCategory = categoryFilter === 'all' || 
//         item.category.toLowerCase() === categoryFilter.toLowerCase();
      
//       const matchesStatus = statusFilter === 'all' || 
//         item.status.toLowerCase().replace(' ', '-') === statusFilter.toLowerCase();
      
//       return matchesSearch && matchesCategory && matchesStatus;
//     });
//   }, [currentStock, searchTerm, categoryFilter, statusFilter]);

//   // Filter logic for stock movements
//   const filteredStockMovements = useMemo(() => {
//     return stockMovements.filter(movement => {
//       const matchesSearch = searchTerm === '' || 
//         movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesType = movementTypeFilter === 'all' || 
//         movement.type.toLowerCase() === movementTypeFilter.toLowerCase();
      
//       const matchesDate = dateFilter === '' || movement.date === dateFilter;
      
//       return matchesSearch && matchesType && matchesDate;
//     });
//   }, [stockMovements, searchTerm, movementTypeFilter, dateFilter]);

//   // Filter logic for expiry/damage
//   const filteredExpiryDamage = useMemo(() => {
//     return expiryDamage.filter(item => {
//       const matchesSearch = searchTerm === '' || 
//         item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesType = damageTypeFilter === 'all' || 
//         item.type.toLowerCase() === damageTypeFilter.toLowerCase();
      
//       const matchesDate = dateFilter === '' || item.date === dateFilter;
      
//       return matchesSearch && matchesType && matchesDate;
//     });
//   }, [expiryDamage, searchTerm, damageTypeFilter, dateFilter]);

//   // Handle stock form changes
//   const handleStockFormChange = (field, value) => {
//     setStockFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Handle stock in
//   const handleStockIn = () => {
//     const product = currentStock.find(p => p.id === parseInt(stockFormData.productId));
//     if (!product) return;

//     const updatedStock = currentStock.map(p => 
//       p.id === product.id ? { ...p, currentStock: p.currentStock + parseInt(stockFormData.quantity) } : p
//     );
//     setCurrentStock(updatedStock);

//     const newMovement = {
//       id: stockMovements.length + 1,
//       productName: product.name,
//       type: 'IN',
//       quantity: parseInt(stockFormData.quantity),
//       reason: stockFormData.reason || 'Manual Stock In',
//       date: new Date().toISOString().split('T')[0],
//       time: new Date().toLocaleTimeString()
//     };
//     setStockMovements(prev => [newMovement, ...prev]);

//     setIsStockInModalOpen(false);
//     resetStockForm();
//   };

//   // Handle stock out
//   const handleStockOut = () => {
//     const product = currentStock.find(p => p.id === parseInt(stockFormData.productId));
//     if (!product) return;

//     const updatedStock = currentStock.map(p => 
//       p.id === product.id ? { ...p, currentStock: p.currentStock - parseInt(stockFormData.quantity) } : p
//     );
//     setCurrentStock(updatedStock);

//     const newMovement = {
//       id: stockMovements.length + 1,
//       productName: product.name,
//       type: 'OUT',
//       quantity: parseInt(stockFormData.quantity),
//       reason: stockFormData.reason || 'Manual Stock Out',
//       date: new Date().toISOString().split('T')[0],
//       time: new Date().toLocaleTimeString()
//     };
//     setStockMovements(prev => [newMovement, ...prev]);

//     setIsStockOutModalOpen(false);
//     resetStockForm();
//   };

//   // Reset stock form
//   const resetStockForm = () => {
//     setStockFormData({ productId: '', quantity: 1, reason: '' });
//     setSelectedProduct(null);
//   };

//   // Open stock in modal
//   const openStockInModal = (product = null) => {
//     if (product) {
//       setSelectedProduct(product);
//       setStockFormData({ ...stockFormData, productId: product.id });
//     }
//     setIsStockInModalOpen(true);
//   };

//   // Open stock out modal
//   const openStockOutModal = (product = null) => {
//     if (product) {
//       setSelectedProduct(product);
//       setStockFormData({ ...stockFormData, productId: product.id });
//     }
//     setIsStockOutModalOpen(true);
//   };

//   const getStatusBadge = (item) => {
//     if (item.currentStock <= item.reorderLevel) {
//       return <Badge variant="destructive">Low Stock</Badge>;
//     } else {
//       return <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>;
//     }
//   };

//   const getMovementIcon = (type) => {
//     return type === 'IN' ? (
//       <TrendingUp className="h-4 w-4 text-green-600" />
//     ) : (
//       <TrendingDown className="h-4 w-4 text-red-600" />
//     );
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setCategoryFilter('all');
//     setStatusFilter('all');
//     setMovementTypeFilter('all');
//     setDamageTypeFilter('all');
//     setDateFilter('');
//   };

//   // Get unique categories
//   const categories = [...new Set(currentStock.map(item => item.category))];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
//           <p className="text-muted-foreground">
//             Track stock levels, movements, and manage inventory
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline" className="flex items-center space-x-2" onClick={() => openStockInModal()}>
//             <Plus className="h-4 w-4" />
//             <span>Stock In</span>
//           </Button>
//           <Button variant="outline" className="flex items-center space-x-2" onClick={() => openStockOutModal()}>
//             <Minus className="h-4 w-4" />
//             <span>Stock Out</span>
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="current-stock" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="current-stock">Current Stock</TabsTrigger>
//           <TabsTrigger value="movements">Stock Movements</TabsTrigger>
//           <TabsTrigger value="expiry-damage">Expiry/Damage</TabsTrigger>
//           <TabsTrigger value="reports">Low Stock Report</TabsTrigger>
//         </TabsList>

//         <TabsContent value="current-stock" className="space-y-4">
//           {/* Search and Filters */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Search & Filter Current Stock</CardTitle>
//               <CardDescription>
//                 Search by product name or category
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <Label htmlFor="search">Search</Label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="search"
//                       placeholder="Search products..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Category</Label>
//                   <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="All Categories" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Categories</SelectItem>
//                       {categories.map(category => (
//                         <SelectItem key={category} value={category.toLowerCase()}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label>Status</Label>
//                   <Select value={statusFilter} onValueChange={setStatusFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="All Status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Status</SelectItem>
//                       <SelectItem value="good">Good</SelectItem>
//                       <SelectItem value="low-stock">Low Stock</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex items-end">
//                   <Button variant="outline" onClick={clearFilters}>
//                     Clear Filters
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-4 text-sm text-muted-foreground">
//                 Showing {filteredCurrentStock.length} of {currentStock.length} items
//               </div>
//             </CardContent>
//           </Card>

//           {/* Current Stock Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Current Stock Levels</CardTitle>
//               <CardDescription>
//                 Monitor your current inventory levels
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Current Stock</TableHead>
//                     <TableHead>Reorder Level</TableHead>
//                     <TableHead>Last Updated</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredCurrentStock.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell className="font-medium">{item.name}</TableCell>
//                       <TableCell>{item.category}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center space-x-2">
//                           <Package className="h-4 w-4 text-gray-400" />
//                           <span>{item.currentStock} units</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{item.reorderLevel} units</TableCell>
//                       <TableCell>{item.lastUpdated}</TableCell>
//                       <TableCell>{getStatusBadge(item)}</TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button variant="outline" size="sm" onClick={() => openStockInModal(item)}>
//                             <Plus className="h-3 w-3" />
//                           </Button>
//                           <Button variant="outline" size="sm" onClick={() => openStockOutModal(item)}>
//                             <Minus className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               {filteredCurrentStock.length === 0 && (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No stock items found matching your criteria
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="movements" className="space-y-4">
//           {/* Search and Filters for Movements */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Search & Filter Stock Movements</CardTitle>
//               <CardDescription>
//                 Search by product name or movement reason
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <Label htmlFor="search-movements">Search</Label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="search-movements"
//                       placeholder="Search movements..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Movement Type</Label>
//                   <Select value={movementTypeFilter} onValueChange={setMovementTypeFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="All Types" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Types</SelectItem>
//                       <SelectItem value="in">Stock In</SelectItem>
//                       <SelectItem value="out">Stock Out</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label>Date</Label>
//                   <Input 
//                     type="date" 
//                     value={dateFilter}
//                     onChange={(e) => setDateFilter(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <Button variant="outline" onClick={clearFilters}>
//                     Clear Filters
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-4 text-sm text-muted-foreground">
//                 Showing {filteredStockMovements.length} of {stockMovements.length} movements
//               </div>
//             </CardContent>
//           </Card>

//           {/* Stock Movements Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Stock Movements</CardTitle>
//               <CardDescription>
//                 Track all stock in and out movements
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Reason</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Time</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredStockMovements.map((movement) => (
//                     <TableRow key={movement.id}>
//                       <TableCell className="font-medium">{movement.productName}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center space-x-2">
//                           {getMovementIcon(movement.type)}
//                           <span>{movement.type}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{movement.quantity} units</TableCell>
//                       <TableCell>{movement.reason}</TableCell>
//                       <TableCell>{movement.date}</TableCell>
//                       <TableCell>{movement.time}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               {filteredStockMovements.length === 0 && (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No movements found matching your criteria
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="expiry-damage" className="space-y-4">
//           {/* Search and Filters for Expiry/Damage */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Search & Filter Expiry/Damage</CardTitle>
//               <CardDescription>
//                 Search by product name or reason
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <Label htmlFor="search-damage">Search</Label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="search-damage"
//                       placeholder="Search items..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Type</Label>
//                   <Select value={damageTypeFilter} onValueChange={setDamageTypeFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="All Types" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Types</SelectItem>
//                       <SelectItem value="damage">Damage</SelectItem>
//                       <SelectItem value="expiry">Expiry</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label>Date</Label>
//                   <Input 
//                     type="date" 
//                     value={dateFilter}
//                     onChange={(e) => setDateFilter(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <Button variant="outline" onClick={clearFilters}>
//                     Clear Filters
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-4 text-sm text-muted-foreground">
//                 Showing {filteredExpiryDamage.length} of {expiryDamage.length} items
//               </div>
//             </CardContent>
//           </Card>

//           {/* Expiry/Damage Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Expiry & Damage</CardTitle>
//               <CardDescription>
//                 Track expired or damaged products
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Reason</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Cost</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredExpiryDamage.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell className="font-medium">{item.productName}</TableCell>
//                       <TableCell>
//                         <Badge variant={item.type === 'Damage' ? 'destructive' : 'secondary'}>
//                           {item.type}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{item.quantity} units</TableCell>
//                       <TableCell>{item.reason}</TableCell>
//                       <TableCell>{item.date}</TableCell>
//                       <TableCell>${item.cost}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//               {filteredExpiryDamage.length === 0 && (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No expiry or damage items found
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="reports" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Low Stock Report</CardTitle>
//               <CardDescription>
//                 Products that need reordering
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Current Stock</TableHead>
//                     <TableHead>Reorder Level</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {currentStock.filter(item => item.currentStock <= item.reorderLevel).map(item => (
//                     <TableRow key={item.id}>
//                       <TableCell className="font-medium">{item.name}</TableCell>
//                       <TableCell>{item.category}</TableCell>
//                       <TableCell>{item.currentStock} units</TableCell>
//                       <TableCell>{item.reorderLevel} units</TableCell>
//                       <TableCell>{getStatusBadge(item)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Stock In Modal */}
//       <Dialog open={isStockInModalOpen} onOpenChange={setIsStockInModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Stock In</DialogTitle>
//             <DialogDescription>Add new stock to your inventory.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="product">Product</Label>
//               <Select 
//                 value={stockFormData.productId}
//                 onValueChange={(value) => handleStockFormChange('productId', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {currentStock.map(product => (
//                     <SelectItem key={product.id} value={product.id.toString()}>
//                       {product.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="quantity">Quantity</Label>
//               <Input 
//                 id="quantity" 
//                 type="number" 
//                 min="1" 
//                 value={stockFormData.quantity}
//                 onChange={(e) => handleStockFormChange('quantity', e.target.value)}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="reason">Reason (Optional)</Label>
//               <Input 
//                 id="reason" 
//                 value={stockFormData.reason}
//                 onChange={(e) => handleStockFormChange('reason', e.target.value)}
//                 placeholder="e.g., Purchase Order #PO-003"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsStockInModalOpen(false)}>Cancel</Button>
//             <Button onClick={handleStockIn}>Add Stock</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Stock Out Modal */}
//       <Dialog open={isStockOutModalOpen} onOpenChange={setIsStockOutModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Stock Out</DialogTitle>
//             <DialogDescription>Remove stock from your inventory.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="product-out">Product</Label>
//               <Select 
//                 value={stockFormData.productId}
//                 onValueChange={(value) => handleStockFormChange('productId', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {currentStock.map(product => (
//                     <SelectItem key={product.id} value={product.id.toString()}>
//                       {product.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="quantity-out">Quantity</Label>
//               <Input 
//                 id="quantity-out" 
//                 type="number" 
//                 min="1" 
//                 value={stockFormData.quantity}
//                 onChange={(e) => handleStockFormChange('quantity', e.target.value)}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="reason-out">Reason (Optional)</Label>
//               <Input 
//                 id="reason-out" 
//                 value={stockFormData.reason}
//                 onChange={(e) => handleStockFormChange('reason', e.target.value)}
//                 placeholder="e.g., Sales Transaction, Damage"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsStockOutModalOpen(false)}>Cancel</Button>
//             <Button onClick={handleStockOut}>Remove Stock</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Inventory;

