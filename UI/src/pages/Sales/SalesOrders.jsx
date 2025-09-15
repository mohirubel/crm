import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search, RefreshCcw } from "lucide-react";

const INITIAL_FORM = {
  customer: "",
  date: "",
  items: [{ item: "", qty: 1, price: 0 }],
  discount: 0,
  tax: 0,
  total: 0,
  status: "Pending",
};

const SalesOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNo: "SO-001",
      customer: "Rahim Uddin",
      date: "2025-09-01",
      status: "Completed",
      total: 5000,
      items: [{ item: "Product A", qty: 2, price: 2000 }],
      discount: 0,
      tax: 500,
    },
    {
      id: 2,
      orderNo: "SO-002",
      customer: "Karim Ahmed",
      date: "2025-09-03",
      status: "Pending",
      total: 8000,
      items: [{ item: "Product B", qty: 4, price: 2000 }],
      discount: 0,
      tax: 0,
    },
    {
      id: 3,
      orderNo: "SO-003",
      customer: "Sumaiya Akter",
      date: "2025-09-05",
      status: "Completed",
      total: 12000,
      items: [
        { item: "Product C", qty: 3, price: 3000 },
        { item: "Product A", qty: 1, price: 3000 },
      ],
      discount: 500,
      tax: 800,
    },
    {
      id: 4,
      orderNo: "SO-004",
      customer: "Imran Hossain",
      date: "2025-09-07",
      status: "Cancelled",
      total: 4000,
      items: [{ item: "Product D", qty: 2, price: 2000 }],
      discount: 0,
      tax: 0,
    },
    {
      id: 5,
      orderNo: "SO-005",
      customer: "Nusrat Jahan",
      date: "2025-09-09",
      status: "Completed",
      total: 15000,
      items: [{ item: "Product E", qty: 5, price: 2500 }],
      discount: 1000,
      tax: 1200,
    },
    {
      id: 6,
      orderNo: "SO-006",
      customer: "Abdullah Al Mamun",
      date: "2025-09-11",
      status: "Pending",
      total: 6000,
      items: [{ item: "Product F", qty: 2, price: 3000 }],
      discount: 0,
      tax: 0,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedOrder(null);
  };

  const calculateTotal = (
    items = formData.items,
    discount = formData.discount,
    tax = formData.tax
  ) => {
    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.qty || 0) * Number(i.price || 0),
      0
    );
    const total = subtotal - Number(discount || 0) + Number(tax || 0);
    setFormData((prev) => ({ ...prev, total }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (["discount", "tax"].includes(field)) {
      calculateTotal(
        formData.items,
        field === "discount" ? Number(value) : formData.discount,
        field === "tax" ? Number(value) : formData.tax
      );
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((it, i) =>
      i === index
        ? {
            ...it,
            [field]:
              field === "qty" || field === "price" ? Number(value || 0) : value,
          }
        : it
    );
    setFormData((prev) => ({ ...prev, items: updatedItems }));
    calculateTotal(updatedItems, formData.discount, formData.tax);
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { item: "", qty: 1, price: 0 }],
    }));
  };

  const removeItemRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
    calculateTotal(updatedItems, formData.discount, formData.tax);
  };

  // Add
  const handleAddOrder = () => {
    if (!formData.customer || !formData.date) return;
    const newId = orders.length + 1;
    const orderNo = `SO-${String(newId).padStart(3, "0")}`;
    const newOrder = { id: newId, orderNo, ...formData };

    setOrders((prev) => [...prev, newOrder]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsAddModalOpen(false);
    setIsEditModalOpen(true);

    setFormData({
      customer: order.customer || "",
      date: order.date || "",
      items: order.items
        ? order.items.map((it) => ({ ...it }))
        : [{ item: "", qty: 1, price: 0 }],
      discount: order.discount || 0,
      tax: order.tax || 0,
      total: order.total || 0,
      status: order.status || "Pending",
    });
  };

  const handleEditOrder = () => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, ...formData } : o))
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete
  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOrder = () => {
    if (!selectedOrder) return;
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setIsDeleteModalOpen(false);
    resetForm();
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsEditModalOpen(false);
    setIsAddModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold tracking-tight uppercase">
            Sales Orders
          </h2>
        </div>
        <Button onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" /> <span>Add Order</span>
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer or order no"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm px-8"
                />
              </div>
            </div>

            {/* Credit Limit Filter */}
            <div>
              <select
                className="border rounded px-2 w-full h-[27px] text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                variant="outline"
                onClick={clearFilters}
              >
                <RefreshCcw className="h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr  className="text-[14px]">
                  <th className="px-4 py-2 text-left">Order No</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-0.5">{order.orderNo}</td>
                      <td className="px-4 py-0.5">{order.customer}</td>
                      <td className="px-4 py-0.5">{order.date}</td>
                      <td className="px-4 py-0.5">{order.status}</td>
                      <td className="px-4 py-0.5">${order.total}</td>
                      <td className="px-4 py-0.5">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(order)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDeleteModal(order)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={(val) => {
          if (!val) {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {isEditModalOpen ? "Edit Order" : "Add New Order"}
            </DialogTitle>
            <DialogDescription>
              {isEditModalOpen
                ? "Update order details."
                : "Enter details to create a new order."}
            </DialogDescription>
          </DialogHeader>

          {/* Two column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 p-6">
            <div>
              <Label>Customer</Label>
              <Input
                className="mb-2"
                value={formData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input
                className="mb-2"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            {/* Full-width Items Section */}
            <div className="md:col-span-2">
              <Label>Items</Label>
              {formData.items.map((it, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
                  <Input
                    className="mb-2 flex-1"
                    placeholder="Item"
                    value={it.item}
                    onChange={(e) =>
                      handleItemChange(idx, "item", e.target.value)
                    }
                  />
                  <Input
                    className="mb-2 w-28"
                    type="number"
                    placeholder="Qty"
                    value={it.qty}
                    onChange={(e) =>
                      handleItemChange(idx, "qty", e.target.value)
                    }
                  />
                  <Input
                    className="mb-2 w-32"
                    type="number"
                    placeholder="Price"
                    value={it.price}
                    onChange={(e) =>
                      handleItemChange(idx, "price", e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItemRow(idx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mb-2"
                variant="outline"
                size="sm"
                onClick={addItemRow}
              >
                + Add Item
              </Button>
            </div>

            <div>
              <Label>Discount</Label>
              <Input
                className="mb-2"
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
              />
            </div>

            <div>
              <Label>Tax</Label>
              <Input
                className="mb-2"
                type="number"
                value={formData.tax}
                onChange={(e) => handleInputChange("tax", e.target.value)}
              />
            </div>

            <div>
              <Label>Total</Label>
              <Input
                className="mb-2"
                type="number"
                value={formData.total}
                readOnly
              />
            </div>

            <div>
              <Label>Status</Label>
              <select
                className="border rounded px-2 w-full mb-2 h-[27px] text-sm"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditModalOpen ? handleEditOrder : handleAddOrder}
            >
              {isEditModalOpen ? "Save Changes" : "Add Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedOrder?.orderNo}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesOrders;
