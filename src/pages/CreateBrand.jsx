import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Search, 
  Award, 
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';

const CreateBrand = ({ brands = [], setBrands, onNavigateBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Form state
  const [brandForm, setBrandForm] = useState({ name: '' });

  // Filter brands based on search
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleFormChange = (value) => {
    setBrandForm({ name: value });
  };

  // Add new brand
  const handleAddBrand = () => {
    const newBrand = {
      id: Math.max(...brands.map(brand => brand.id), 0) + 1,
      name: brandForm.name,
      productCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    // ✅ Only setBrands used (no duplicate add)
    setBrands(prev => [newBrand, ...prev]);

    setBrandForm({ name: '' });
    setIsAddModalOpen(false);
  };

  // Edit brand
  const handleEditBrand = () => {
    const updatedBrand = { ...selectedBrand, name: brandForm.name };

    setBrands(prev => prev.map(brand => 
      brand.id === selectedBrand.id ? updatedBrand : brand
    ));
    
    setIsEditModalOpen(false);
    setBrandForm({ name: '' });
    setSelectedBrand(null);
  };

  // Delete brand
  const handleDeleteBrand = (brandId) => {
    setBrands(prev => prev.filter(brand => brand.id !== brandId));
  };

  // Open edit modal
  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setBrandForm({ name: brand.name });
    setIsEditModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setBrandForm({ name: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            {onNavigateBack && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigateBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <Award className="h-8 w-8 mr-3 text-blue-600" />
                Create Brand
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and organize your product brands
              </p>
            </div>
          </div>
          
          {/* Add Brand Button */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Add New Brand</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Brand</DialogTitle>
                <DialogDescription>
                  Create a new brand for better product organization
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="brandName">Brand Name *</Label>
                  <Input
                    id="brandName"
                    value={brandForm.name}
                    onChange={(e) => handleFormChange(e.target.value)}
                    placeholder="e.g., Apple, Samsung"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddBrand} 
                  disabled={!brandForm.name.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Brand
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Brands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Showing {filteredBrands.length} of {brands.length} brands
            </div>
          </CardContent>
        </Card>

        {/* Brands Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Brands List
            </CardTitle>
            <CardDescription>
              Manage your product brands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white rounded-lg border">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
                  <div>Brand Name</div>
                  <div>Products</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {filteredBrands.map((brand) => (
                    <div key={brand.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{brand.name}</div>
                          <div className="text-xs text-gray-500">ID: {brand.id}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {brand.productCount} items
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Badge 
                          variant={brand.productCount > 0 ? "default" : "secondary"}
                          className={brand.productCount > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {brand.productCount > 0 ? 'Active' : 'Empty'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(brand)}
                          className="hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{brand.name}"? 
                                {brand.productCount > 0 && (
                                  <span className="text-red-600 font-medium">
                                    {" "}This brand has {brand.productCount} products.
                                  </span>
                                )}
                                {" "}This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteBrand(brand.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Brand
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {filteredBrands.length === 0 && (
                <div className="text-center py-12">
                  <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'No brands match your search criteria.' : 'Get started by creating your first brand.'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Brand
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Brand</DialogTitle>
              <DialogDescription>
                Update brand information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editBrandName">Brand Name *</Label>
                <Input
                  id="editBrandName"
                  value={brandForm.name}
                  onChange={(e) => handleFormChange(e.target.value)}
                  placeholder="Enter brand name"
                />
              </div>
              {selectedBrand && (
                <div className="grid gap-2">
                  <Label>Brand Info</Label>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <div>Products: {selectedBrand.productCount} items</div>
                    <div>Created: {new Date(selectedBrand.createdDate).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
                setSelectedBrand(null);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handleEditBrand}
                disabled={!brandForm.name.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Update Brand
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateBrand;
