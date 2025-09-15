import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Minus,
  Search,
  Package,
  RefreshCcw,
  BadgePlus,
} from "lucide-react";

const CurrentStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal states
  const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Stock form state
  const [stockFormData, setStockFormData] = useState({
    productId: "",
    quantity: 1,
    reason: "",
  });

  // New product form state
  const [newProduct, setNewProduct] = useState({
    productCode: "",
    name: "",
    category: "",
    unit: "",
    costPrice: "",
    sellingPrice: "",
    reorderLevel: "",
    currentStock: 0,
  });

  // Current stock data
  const [currentStock, setCurrentStock] = useState([
    {
      id: 1,
      productCode: "IP14P",
      name: "iPhone 14 Pro",
      category: "Smartphones",
      unit: "pcs",
      costPrice: 950,
      sellingPrice: 1200,
      currentStock: 25,
      reorderLevel: 10,
      lastUpdated: "2024-08-28",
      status: "Good",
    },
    {
      id: 2,
      productCode: "SGS23",
      name: "Samsung Galaxy S23",
      category: "Smartphones",
      unit: "pcs",
      costPrice: 800,
      sellingPrice: 1050,
      currentStock: 15,
      reorderLevel: 12,
      lastUpdated: "2024-08-28",
      status: "Good",
    },
    {
      id: 3,
      productCode: "APPRO",
      name: "AirPods Pro",
      category: "Accessories",
      unit: "pcs",
      costPrice: 150,
      sellingPrice: 250,
      currentStock: 3,
      reorderLevel: 15,
      lastUpdated: "2024-08-27",
      status: "Low Stock",
    },
    // --- New products below ---
    {
      id: 4,
      productCode: "MBP16",
      name: 'MacBook Pro 16"',
      category: "Laptops",
      unit: "pcs",
      costPrice: 2100,
      sellingPrice: 2600,
      currentStock: 7,
      reorderLevel: 5,
      lastUpdated: "2024-08-29",
      status: "Good",
    },
    {
      id: 5,
      productCode: "IPD11",
      name: 'iPad Pro 11"',
      category: "Tablets",
      unit: "pcs",
      costPrice: 750,
      sellingPrice: 950,
      currentStock: 12,
      reorderLevel: 8,
      lastUpdated: "2024-08-30",
      status: "Good",
    },
    {
      id: 6,
      productCode: "SONYWH1000",
      name: "Sony WH-1000XM5",
      category: "Headphones",
      unit: "pcs",
      costPrice: 280,
      sellingPrice: 400,
      currentStock: 5,
      reorderLevel: 6,
      lastUpdated: "2024-08-30",
      status: "Low Stock",
    },
  ]);

  // Stock movements
  const [stockMovements, setStockMovements] = useState([]);

  const categories = [...new Set(currentStock.map((item) => item.category))];

  const filteredCurrentStock = useMemo(() => {
    return currentStock.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        item.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase().replace(" ", "-") ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [currentStock, searchTerm, categoryFilter, statusFilter]);

  const getStatusBadge = (item) => {
    if (item.currentStock <= item.reorderLevel) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Good
        </Badge>
      );
    }
  };

  // Handle stock form changes
  const handleStockFormChange = (field, value) => {
    setStockFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle stock in
  const handleStockIn = () => {
    const product = currentStock.find(
      (p) => p.id === parseInt(stockFormData.productId)
    );
    if (!product) return;

    const updatedStock = currentStock.map((p) =>
      p.id === product.id
        ? {
            ...p,
            currentStock: p.currentStock + parseInt(stockFormData.quantity),
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : p
    );
    setCurrentStock(updatedStock);

    setIsStockInModalOpen(false);
    resetStockForm();
  };

  // Handle stock out
  const handleStockOut = () => {
    const product = currentStock.find(
      (p) => p.id === parseInt(stockFormData.productId)
    );
    if (!product || product.currentStock < parseInt(stockFormData.quantity))
      return;

    const updatedStock = currentStock.map((p) =>
      p.id === product.id
        ? {
            ...p,
            currentStock: p.currentStock - parseInt(stockFormData.quantity),
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : p
    );
    setCurrentStock(updatedStock);

    setIsStockOutModalOpen(false);
    resetStockForm();
  };

  // Reset stock form
  const resetStockForm = () => {
    setStockFormData({ productId: "", quantity: 1, reason: "" });
    setSelectedProduct(null);
  };

  // Open stock modals
  const openStockInModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockInModalOpen(true);
  };

  const openStockOutModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setStockFormData({ ...stockFormData, productId: product.id.toString() });
    }
    setIsStockOutModalOpen(true);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  // Add new product
  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.productCode) return;

    const newId = currentStock.length + 1;
    const product = {
      id: newId,
      ...newProduct,
      costPrice: parseFloat(newProduct.costPrice) || 0,
      sellingPrice: parseFloat(newProduct.sellingPrice) || 0,
      reorderLevel: parseInt(newProduct.reorderLevel) || 0,
      currentStock: parseInt(newProduct.currentStock) || 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "Good",
    };

    setCurrentStock((prev) => [...prev, product]);
    setIsAddProductModalOpen(false);
    setNewProduct({
      productCode: "",
      name: "",
      category: "",
      unit: "",
      costPrice: "",
      sellingPrice: "",
      reorderLevel: "",
      currentStock: 0,
    });
  };

  // Summary
  const totalItems = currentStock.length;
  const lowStockItems = currentStock.filter(
    (item) => item.currentStock <= item.reorderLevel
  ).length;
  const totalStockValue = currentStock.reduce(
    (total, item) => total + item.currentStock,
    0
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold tracking-tight uppercase">
            Products
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-[#161717]"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
          <Button variant="outline" onClick={() => openStockInModal()}>
            <Plus className="h-4 w-4" />
            <span>Stock In</span>
          </Button>
          <Button variant="outline" onClick={() => openStockOutModal()}>
            <Minus className="h-4 w-4" />
            <span>Stock Out</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              {/* <Label htmlFor="search">Search</Label> */}
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
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
              {/* <Label>Category</Label> */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              {/* <Label>Status</Label> */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                variant="outline"
                onClick={clearFilters}
              >
                <RefreshCcw className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr className="text-[14px]">
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Selling Price</th>
                  <th className="px-4 py-2 text-left">Current Stock</th>
                  <th className="px-4 py-2 text-left">Reorder Level</th>
                  <th className="px-4 py-2 text-left">Last Updated</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCurrentStock.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-0.5">{item.productCode}</td>
                    <td className="px-4 py-0.5">{item.name}</td>
                    <td className="px-4 py-0.5">{item.category}</td>
                    <td className="px-4 py-0.5">${item.sellingPrice}</td>
                    <td className="px-4 py-0.5">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="px-4 py-0.5">{item.reorderLevel}</td>
                    <td className="px-4 py-0.5">{item.lastUpdated}</td>
                    <td className="px-4 py-0.5">{getStatusBadge(item)}</td>
                    <td className="px-4 py-0.5">
                      <div className="flex justify-center space-x-2">
                        <Button
                          className=""
                          variant="outline"
                          size="sm"
                          onClick={() => openStockInModal(item)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openStockOutModal(item)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog
        open={isAddProductModalOpen}
        onOpenChange={setIsAddProductModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          {/* Two-column grid for fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 p-6">
            <div>
              <Label>Code</Label>
              <Input
                className="mb-2"
                value={newProduct.productCode}
                onChange={(e) =>
                  handleNewProductChange("productCode", e.target.value)
                }
              />
            </div>

            <div className="grid">
              <Label>Name</Label>
              <Input
                className="mb-2"
                value={newProduct.name}
                onChange={(e) => handleNewProductChange("name", e.target.value)}
              />
            </div>

            <div className="grid">
              <Label>Category</Label>
              <Input
                className="mb-2"
                value={newProduct.category}
                onChange={(e) =>
                  handleNewProductChange("category", e.target.value)
                }
              />
            </div>

            <div className="grid">
              <Label>Unit</Label>
              <Input
                className="mb-2"
                value={newProduct.unit}
                onChange={(e) => handleNewProductChange("unit", e.target.value)}
                placeholder="pcs, box, kg"
              />
            </div>

            <div className="grid">
              <Label>Cost Price</Label>
              <Input
                className="mb-2"
                type="number"
                value={newProduct.costPrice}
                onChange={(e) =>
                  handleNewProductChange("costPrice", e.target.value)
                }
              />
            </div>

            <div className="grid">
              <Label>Selling Price</Label>
              <Input
                className="mb-2"
                type="number"
                value={newProduct.sellingPrice}
                onChange={(e) =>
                  handleNewProductChange("sellingPrice", e.target.value)
                }
              />
            </div>

            <div className="grid md:col-span-2">
              <Label>Min Stock</Label>
              <Input
                type="number"
                value={newProduct.reorderLevel}
                onChange={(e) =>
                  handleNewProductChange("reorderLevel", e.target.value)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddProductModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-[#333] font-semibold"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock In Modal */}
      <Dialog open={isStockInModalOpen} onOpenChange={setIsStockInModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock In</DialogTitle>
            <DialogDescription>Add stock to a product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select
                value={stockFormData.productId}
                onValueChange={(v) => handleStockFormChange("productId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.productCode} - {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={stockFormData.quantity}
                onChange={(e) =>
                  handleStockFormChange("quantity", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStockInModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStockIn}>Add Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Out Modal */}
      <Dialog open={isStockOutModalOpen} onOpenChange={setIsStockOutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Out</DialogTitle>
            <DialogDescription>Remove stock from a product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select
                value={stockFormData.productId}
                onValueChange={(v) => handleStockFormChange("productId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {currentStock.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.productCode} - {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={stockFormData.quantity}
                onChange={(e) =>
                  handleStockFormChange("quantity", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStockOutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStockOut}>Remove Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentStock;
