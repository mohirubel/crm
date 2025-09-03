import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  AlertTriangle, 
  Calendar,
  DollarSign,
  Package,
  FileX,
  Trash2,
  Plus
} from 'lucide-react';

const ExpiryDamage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [damageTypeFilter, setDamageTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [costRangeFilter, setCostRangeFilter] = useState('all');
  
  // Modal states
  const [isAddDamageModalOpen, setIsAddDamageModalOpen] = useState(false);
  
  // Form states
  const [damageFormData, setDamageFormData] = useState({
    productName: '',
    type: 'Damage',
    quantity: 1,
    reason: '',
    cost: 0
  });

  // Sample expiry/damage data with more entries
  const [expiryDamage, setExpiryDamage] = useState([
    {
      id: 1,
      productName: 'iPhone 13 Pro',
      type: 'Damage',
      quantity: 2,
      reason: 'Water damage during transport',
      date: '2024-08-26',
      cost: 1800,
      status: 'Reported',
      category: 'Smartphones'
    },
    {
      id: 2,
      productName: 'Samsung Charger',
      type: 'Expiry',
      quantity: 10,
      reason: 'Warranty expired',
      date: '2024-08-25',
      cost: 250,
      status: 'Disposed',
      category: 'Accessories'
    },
    {
      id: 3,
      productName: 'MacBook Pro',
      type: 'Damage',
      quantity: 1,
      reason: 'Screen damage',
      date: '2024-08-24',
      cost: 2500,
      status: 'Under Review',
      category: 'Laptops'
    },
    {
      id: 4,
      productName: 'USB Cable',
      type: 'Expiry',
      quantity: 25,
      reason: 'Product recall',
      date: '2024-08-23',
      cost: 125,
      status: 'Disposed',
      category: 'Accessories'
    },
    {
      id: 5,
      productName: 'iPad Air',
      type: 'Damage',
      quantity: 1,
      reason: 'Dropped by customer, cracked screen',
      date: '2024-08-22',
      cost: 800,
      status: 'Insurance Claim',
      category: 'Tablets'
    },
    {
      id: 6,
      productName: 'AirPods Pro',
      type: 'Expiry',
      quantity: 5,
      reason: 'Battery degradation beyond repair',
      date: '2024-08-21',
      cost: 1000,
      status: 'Disposed',
      category: 'Accessories'
    },
    {
      id: 7,
      productName: 'Samsung Galaxy S22',
      type: 'Damage',
      quantity: 3,
      reason: 'Manufacturing defect',
      date: '2024-08-20',
      cost: 2100,
      status: 'Warranty Replacement',
      category: 'Smartphones'
    },
    {
      id: 8,
      productName: 'Dell Monitor',
      type: 'Damage',
      quantity: 2,
      reason: 'Dead pixels',
      date: '2024-08-19',
      cost: 600,
      status: 'Reported',
      category: 'Accessories'
    }
  ]);

  const filteredExpiryDamage = useMemo(() => {
    return expiryDamage.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = damageTypeFilter === 'all' || 
        item.type.toLowerCase() === damageTypeFilter.toLowerCase();
      
      const matchesDate = dateFilter === '' || item.date === dateFilter;
      
      const matchesCostRange = costRangeFilter === 'all' || 
        (costRangeFilter === 'low' && item.cost < 500) ||
        (costRangeFilter === 'medium' && item.cost >= 500 && item.cost < 1500) ||
        (costRangeFilter === 'high' && item.cost >= 1500);
      
      return matchesSearch && matchesType && matchesDate && matchesCostRange;
    });
  }, [expiryDamage, searchTerm, damageTypeFilter, dateFilter, costRangeFilter]);

  // Handle form changes
  const handleFormChange = (field, value) => {
    setDamageFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle adding new damage/expiry
  const handleAddDamage = () => {
    const newItem = {
      id: expiryDamage.length + 1,
      ...damageFormData,
      date: new Date().toISOString().split('T')[0],
      status: 'Reported',
      category: 'General',
      cost: parseFloat(damageFormData.cost)
    };
    
    setExpiryDamage(prev => [newItem, ...prev]);
    setIsAddDamageModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDamageFormData({
      productName: '',
      type: 'Damage',
      quantity: 1,
      reason: '',
      cost: 0
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDamageTypeFilter('all');
    setDateFilter('');
    setCostRangeFilter('all');
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Reported': 'bg-yellow-100 text-yellow-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      'Disposed': 'bg-gray-100 text-gray-800',
      'Insurance Claim': 'bg-purple-100 text-purple-800',
      'Warranty Replacement': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    return type === 'Damage' ? (
      <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Damage
      </Badge>
    ) : (
      <Badge variant="secondary">
        <FileX className="h-3 w-3 mr-1" />
        Expiry
      </Badge>
    );
  };

  // Calculate summary stats
  const totalItems = expiryDamage.length;
  const damageItems = expiryDamage.filter(item => item.type === 'Damage').length;
  const expiryItems = expiryDamage.filter(item => item.type === 'Expiry').length;
  const totalCost = expiryDamage.reduce((total, item) => total + item.cost, 0);
  const totalQuantity = expiryDamage.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expiry & Damage Management</h2>
          <p className="text-muted-foreground">
            Track expired products and damaged inventory items
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => setIsAddDamageModalOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Add Entry</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Total entries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Damage Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{damageItems}</div>
            <p className="text-xs text-muted-foreground">Damaged products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiry Items</CardTitle>
            <FileX className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{expiryItems}</div>
            <p className="text-xs text-muted-foreground">Expired products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Financial impact</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Affected</CardTitle>
            <Trash2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
            <p className="text-xs text-muted-foreground">Total units lost</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Expiry/Damage</CardTitle>
          <CardDescription>Search by product name, reason, or category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search-damage">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search-damage"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={damageTypeFilter} onValueChange={setDamageTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="damage">Damage</SelectItem>
                  <SelectItem value="expiry">Expiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cost Range</Label>
              <Select value={costRangeFilter} onValueChange={setCostRangeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="low">Under $500</SelectItem>
                  <SelectItem value="medium">$500 - $1500</SelectItem>
                  <SelectItem value="high">Over $1500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredExpiryDamage.length} of {expiryDamage.length} items
          </div>
        </CardContent>
      </Card>

      {/* Expiry/Damage Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expiry & Damage Records</CardTitle>
          <CardDescription>Detailed tracking of expired and damaged products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpiryDamage.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>{item.quantity} units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">${item.cost.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredExpiryDamage.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No items found</p>
              <p>No expiry or damage items found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown by Type</CardTitle>
            <CardDescription>Financial impact analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Damage', 'Expiry'].map(type => {
                const typeItems = expiryDamage.filter(item => item.type === type);
                const typeCost = typeItems.reduce((sum, item) => sum + item.cost, 0);
                const percentage = totalCost > 0 ? ((typeCost / totalCost) * 100).toFixed(1) : 0;
                
                return (
                  <div key={type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {type === 'Damage' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <FileX className="h-5 w-5 text-orange-500" />
                      )}
                      <div>
                        <p className="font-medium">{type}</p>
                        <p className="text-sm text-gray-500">{typeItems.length} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${typeCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent High-Cost Items</CardTitle>
            <CardDescription>Items with significant financial impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiryDamage
                .sort((a, b) => b.cost - a.cost)
                .slice(0, 5)
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">{item.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">${item.cost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Damage/Expiry Modal */}
      <Dialog open={isAddDamageModalOpen} onOpenChange={setIsAddDamageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expiry/Damage Entry</DialogTitle>
            <DialogDescription>Record a new expired or damaged product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input 
                id="product-name" 
                value={damageFormData.productName}
                onChange={(e) => handleFormChange('productName', e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select 
                value={damageFormData.type}
                onValueChange={(value) => handleFormChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Damage">Damage</SelectItem>
                  <SelectItem value="Expiry">Expiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                value={damageFormData.quantity}
                onChange={(e) => handleFormChange('quantity', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Input 
                id="reason" 
                value={damageFormData.reason}
                onChange={(e) => handleFormChange('reason', e.target.value)}
                placeholder="Describe the reason for damage/expiry"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Cost Impact ($)</Label>
              <Input 
                id="cost" 
                type="number" 
                min="0" 
                step="0.01"
                value={damageFormData.cost}
                onChange={(e) => handleFormChange('cost', e.target.value)}
                placeholder="Financial impact"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDamageModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDamage}>Add Entry</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpiryDamage;