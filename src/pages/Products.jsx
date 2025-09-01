import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Sample products data
  const productsData = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      category: 'Smartphones',
      brand: 'Apple',
      purchasePrice: 850,
      sellingPrice: 999,
      stockQty: 25,
      reorderLevel: 10,
      image: '/api/placeholder/50/50',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      category: 'Smartphones',
      brand: 'Samsung',
      purchasePrice: 750,
      sellingPrice: 899,
      stockQty: 15,
      reorderLevel: 12,
      image: '/api/placeholder/50/50',
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      category: 'Laptops',
      brand: 'Apple',
      purchasePrice: 1000,
      sellingPrice: 1199,
      stockQty: 8,
      reorderLevel: 5,
      image: '/api/placeholder/50/50',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'AirPods Pro',
      category: 'Accessories',
      brand: 'Apple',
      purchasePrice: 200,
      sellingPrice: 249,
      stockQty: 3,
      reorderLevel: 15,
      image: '/api/placeholder/50/50',
      status: 'Low Stock'
    },
    {
      id: 5,
      name: 'iPad Pro',
      category: 'Tablets',
      brand: 'Apple',
      purchasePrice: 900,
      sellingPrice: 1099,
      stockQty: 12,
      reorderLevel: 8,
      image: '/api/placeholder/50/50',
      status: 'In Stock'
    },
    {
      id: 6,
      name: 'Google Pixel 7',
      category: 'Smartphones',
      brand: 'Google',
      purchasePrice: 550,
      sellingPrice: 699,
      stockQty: 0,
      reorderLevel: 10,
      image: '/api/placeholder/50/50',
      status: 'Out of Stock'
    },
    {
      id: 7,
      name: 'Dell XPS 13',
      category: 'Laptops',
      brand: 'Dell',
      purchasePrice: 800,
      sellingPrice: 999,
      stockQty: 6,
      reorderLevel: 5,
      image: '/api/placeholder/50/50',
      status: 'In Stock'
    }
  ];

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        product.category.toLowerCase() === categoryFilter.toLowerCase();
      
      const matchesBrand = brandFilter === 'all' || 
        product.brand.toLowerCase() === brandFilter.toLowerCase();
      
      const getProductStatus = (prod) => {
        if (prod.stockQty === 0) return 'out-of-stock';
        if (prod.stockQty <= prod.reorderLevel) return 'low-stock';
        return 'in-stock';
      };
      
      const matchesStatus = statusFilter === 'all' || 
        getProductStatus(product) === statusFilter;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
    });
  }, [productsData, searchTerm, categoryFilter, brandFilter, statusFilter]);

  const getStatusBadge = (product) => {
    if (product.stockQty === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (product.stockQty <= product.reorderLevel) {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Low Stock</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setBrandFilter('all');
    setStatusFilter('all');
  };

  // Get unique categories and brands for filter options
  const categories = [...new Set(productsData.map(p => p.category))];
  const brands = [...new Set(productsData.map(p => p.brand))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and pricing
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Products</CardTitle>
          <CardDescription>
            Search by name, brand, or category
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Brand</Label>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stock Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {productsData.length} products
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>
            Manage your product catalog and inventory levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">IMG</span>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {product.stockQty <= product.reorderLevel && product.stockQty > 0 && (
                          <div className="flex items-center space-x-1 text-orange-600 text-xs">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Reorder needed</span>
                          </div>
                        )}
                        {product.stockQty === 0 && (
                          <div className="flex items-center space-x-1 text-red-600 text-xs">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Out of stock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.purchasePrice}</TableCell>
                  <TableCell>${product.sellingPrice}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.stockQty} units</div>
                      <div className="text-xs text-gray-500">
                        Reorder at: {product.reorderLevel}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(product)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Filtered results
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {filteredProducts.filter(p => p.stockQty <= p.reorderLevel && p.stockQty > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need reordering
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredProducts.filter(p => p.stockQty === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Urgent attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredProducts.reduce((sum, p) => sum + (p.sellingPrice * p.stockQty), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Inventory value
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;

