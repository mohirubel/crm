import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  FolderPlus, 
  Edit,
  Trash2,
  User,
  ChevronDown,
  ArrowLeft,
  Tag,
  Package
} from 'lucide-react';

const CreateCategory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Categories state
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Smartphones', 
      description: 'Mobile phones and accessories',
      productCount: 3,
      createdDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Laptops', 
      description: 'Portable computers and notebooks',
      productCount: 2,
      createdDate: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Tablets', 
      description: 'Tablet devices and iPad',
      productCount: 1,
      createdDate: '2024-01-08'
    },
    { 
      id: 4, 
      name: 'Accessories', 
      description: 'Electronic accessories and peripherals',
      productCount: 1,
      createdDate: '2024-01-05'
    },
    { 
      id: 5, 
      name: 'Wearables', 
      description: 'Smart watches and fitness trackers',
      productCount: 0,
      createdDate: '2024-01-03'
    }
  ]);
  
  // Form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setCategoryForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new category
  const handleAddCategory = () => {
    const newCategory = {
      id: Math.max(...categories.map(cat => cat.id)) + 1,
      name: categoryForm.name,
      description: categoryForm.description,
      productCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setCategories(prev => [newCategory, ...prev]);
    setCategoryForm({ name: '', description: '' });
    setIsAddModalOpen(false);
  };

  // Edit category
  const handleEditCategory = () => {
    const updatedCategory = {
      ...selectedCategory,
      name: categoryForm.name,
      description: categoryForm.description
    };

    setCategories(prev => prev.map(category => 
      category.id === selectedCategory.id ? updatedCategory : category
    ));
    
    setIsEditModalOpen(false);
    setCategoryForm({ name: '', description: '' });
    setSelectedCategory(null);
  };

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description
    });
    setIsEditModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setCategoryForm({ name: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 cursor-pointer">
              Log Out
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">bhsale</span>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
              <User className="w-4 h-4 mr-1" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <FolderPlus className="h-8 w-8 mr-3 text-indigo-600" />
              Create Category
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and organize your product categories
            </p>
          </div>
          
          {/* Add Category Button */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                <span>Add New Category</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category for better organization
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={categoryForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="e.g., Electronics, Clothing, Books"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoryDescription">Description</Label>
                  <Textarea
                    id="categoryDescription"
                    value={categoryForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Brief description of this category..."
                    rows={3}
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
                  onClick={handleAddCategory} 
                  disabled={!categoryForm.name.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Search Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Showing {filteredCategories.length} of {categories.length} categories
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Category Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{categories.length}</div>
                  <div className="text-sm text-muted-foreground">Total Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Products</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Categories List
            </CardTitle>
            <CardDescription>
              Manage your product categories and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white rounded-lg border">
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
                  <div>Category Name</div>
                  <div>Description</div>
                  <div>Products</div>
                  <div>Created Date</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FolderPlus className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-xs text-gray-500">ID: {category.id}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate">
                            {category.description || 'No description provided'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {category.productCount} items
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-600">
                          {new Date(category.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge 
                          variant={category.productCount > 0 ? "default" : "secondary"}
                          className={category.productCount > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {category.productCount > 0 ? 'Active' : 'Empty'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(category)}
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
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{category.name}"? 
                                {category.productCount > 0 && (
                                  <span className="text-red-600 font-medium">
                                    {" "}This category has {category.productCount} products associated with it.
                                  </span>
                                )}
                                {" "}This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Category
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <FolderPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'No categories match your search criteria.' : 'Get started by creating your first category.'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Category
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
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update category information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editCategoryName">Category Name *</Label>
                <Input
                  id="editCategoryName"
                  value={categoryForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editCategoryDescription">Description</Label>
                <Textarea
                  id="editCategoryDescription"
                  value={categoryForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Category description..."
                  rows={3}
                />
              </div>
              {selectedCategory && (
                <div className="grid gap-2">
                  <Label>Category Info</Label>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <div>Products: {selectedCategory.productCount} items</div>
                    <div>Created: {new Date(selectedCategory.createdDate).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
                setSelectedCategory(null);
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handleEditCategory}
                disabled={!categoryForm.name.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <FolderPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                {categories.filter(cat => cat.productCount > 0).length} active categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
              <Tag className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {categories.filter(cat => cat.productCount > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Categories with products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empty Categories</CardTitle>
              <Package className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {categories.filter(cat => cat.productCount === 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Categories without products
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Helper functions
//   function handleDeleteCategory(categoryId) {
//     setCategories(prev => prev.filter(category => category.id !== categoryId));
//   }

//   function openEditModal(category) {
//     setSelectedCategory(category);
//     setCategoryForm({
//       name: category.name,
//       description: category.description
//     });
//     setIsEditModalOpen(true);
//   }
};

export default CreateCategory;