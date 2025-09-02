import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Package,
  Plus,
  CheckCircle
} from 'lucide-react';

// CreateProductsPage Component
const CreateProductsPage = ({ onProductCreate, onNavigateBack, categories = [], brands = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    reorderLevel: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.brand) {
      newErrors.brand = 'Brand is required';
    }
    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Selling price must be greater than 0';
    }
    if (parseFloat(formData.sellingPrice) <= parseFloat(formData.purchasePrice)) {
      newErrors.sellingPrice = 'Selling price must be greater than purchase price';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock quantity must be 0 or greater';
    }
    if (!formData.reorderLevel || parseInt(formData.reorderLevel) < 0) {
      newErrors.reorderLevel = 'Reorder level must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate profit margin
  const calculateProfitMargin = () => {
    const purchase = parseFloat(formData.purchasePrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    
    if (purchase === 0) return 0;
    return (((selling - purchase) / purchase) * 100).toFixed(1);
  };

  // Determine stock status
  const getStockStatus = (stock, reorderLevel) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProduct = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      purchasePrice: parseFloat(formData.purchasePrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      stock: parseInt(formData.stock),
      reorderLevel: parseInt(formData.reorderLevel),
      status: getStockStatus(parseInt(formData.stock), parseInt(formData.reorderLevel)),
      description: formData.description
    };

    // Call the parent function to add product
    if (onProductCreate) {
      onProductCreate(newProduct);
    }

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after successful submission
    resetForm();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      brand: '',
      purchasePrice: '',
      sellingPrice: '',
      stock: '',
      reorderLevel: '',
      description: ''
    });
    setErrors({});
  };

  const profitMargin = calculateProfitMargin();
  const isProfitable = profitMargin > 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
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
            <h2 className="text-3xl font-bold tracking-tight">Create Product</h2>
            <p className="text-muted-foreground">
              Add a new product to your inventory
            </p>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Product created successfully! It has been added to your inventory.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Product Information</span>
              </CardTitle>
              <CardDescription>
                Enter the basic details of your new product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        value={formData.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        placeholder="e.g., iPhone 15 Pro Max"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => handleFormChange('category', value)}
                        >
                          <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="brand">Brand *</Label>
                        <Select 
                          value={formData.brand} 
                          onValueChange={(value) => handleFormChange('brand', value)}
                        >
                          <SelectTrigger className={errors.brand ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.name}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.brand && (
                          <p className="text-sm text-red-500 mt-1">{errors.brand}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Describe the product features, specifications, or any important details..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purchasePrice">Purchase Price (BDT) *</Label>
                      <Input
                        id="purchasePrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.purchasePrice}
                        onChange={(e) => handleFormChange('purchasePrice', e.target.value)}
                        placeholder="0.00"
                        className={errors.purchasePrice ? 'border-red-500' : ''}
                      />
                      {errors.purchasePrice && (
                        <p className="text-sm text-red-500 mt-1">{errors.purchasePrice}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="sellingPrice">Selling Price (BDT) *</Label>
                      <Input
                        id="sellingPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.sellingPrice}
                        onChange={(e) => handleFormChange('sellingPrice', e.target.value)}
                        placeholder="0.00"
                        className={errors.sellingPrice ? 'border-red-500' : ''}
                      />
                      {errors.sellingPrice && (
                        <p className="text-sm text-red-500 mt-1">{errors.sellingPrice}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inventory Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Inventory Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stock">Initial Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleFormChange('stock', e.target.value)}
                        placeholder="0"
                        className={errors.stock ? 'border-red-500' : ''}
                      />
                      {errors.stock && (
                        <p className="text-sm text-red-500 mt-1">{errors.stock}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="reorderLevel">Reorder Level *</Label>
                      <Input
                        id="reorderLevel"
                        type="number"
                        min="0"
                        value={formData.reorderLevel}
                        onChange={(e) => handleFormChange('reorderLevel', e.target.value)}
                        placeholder="0"
                        className={errors.reorderLevel ? 'border-red-500' : ''}
                      />
                      {errors.reorderLevel && (
                        <p className="text-sm text-red-500 mt-1">{errors.reorderLevel}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Alert when stock falls to this level
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset Form
                  </Button>
                  <Button type="button" disabled={isSubmitting} onClick={handleSubmit} className="flex items-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Create Product</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>
                Live preview of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Product Name</Label>
                  <p className="font-medium">{formData.name || 'Enter product name'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <p className="text-sm">{formData.category || 'Select category'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Brand</Label>
                    <p className="text-sm">{formData.brand || 'Select brand'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Purchase Price</Label>
                    <p className="text-sm font-medium">
                      ৳{formData.purchasePrice ? parseFloat(formData.purchasePrice).toLocaleString() : '0.00'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Selling Price</Label>
                    <p className="text-sm font-medium">
                      ৳{formData.sellingPrice ? parseFloat(formData.sellingPrice).toLocaleString() : '0.00'}
                    </p>
                  </div>
                </div>

                {profitMargin > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <Label className="text-xs text-green-600">Profit Margin</Label>
                    <p className="text-sm font-medium text-green-700">
                      {profitMargin}% (৳{(parseFloat(formData.sellingPrice || 0) - parseFloat(formData.purchasePrice || 0)).toFixed(2)})
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Stock</Label>
                    <p className="text-sm">{formData.stock || '0'} units</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Reorder Level</Label>
                    <p className="text-sm">{formData.reorderLevel || '0'} units</p>
                  </div>
                </div>

                {formData.stock && formData.reorderLevel && (
                  <div className="p-3 rounded-lg border">
                    <Label className="text-xs text-muted-foreground">Stock Status</Label>
                    <Badge 
                      variant={
                        parseInt(formData.stock) === 0 ? 'destructive' :
                        parseInt(formData.stock) <= parseInt(formData.reorderLevel) ? 'secondary' : 
                        'default'
                      }
                      className="mt-1"
                    >
                      {getStockStatus(parseInt(formData.stock), parseInt(formData.reorderLevel))}
                    </Badge>
                  </div>
                )}

                {formData.description && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Categories</span>
                <Badge variant="outline">{categories.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Brands</span>
                <Badge variant="outline">{brands.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Form Completion</span>
                <Badge variant="outline">
                  {Math.round(
                    (Object.values(formData).filter(value => value !== '').length / 
                     Object.keys(formData).length) * 100
                  )}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProductsPage;

