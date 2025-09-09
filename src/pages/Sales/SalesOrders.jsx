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
import { Plus, Pencil, Trash2, Search } from "lucide-react";

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
            [field]: field === "qty" || field === "price" ? Number(value || 0) : value,
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
      items: order.items ? order.items.map((it) => ({ ...it })) : [{ item: "", qty: 1, price: 0 }],
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Orders</h2>
          <p className="text-muted-foreground">Manage customer sales orders</p>
        </div>
        <Button variant="outline" onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" /> <span>Add Order</span>
        </Button>
      </div>

      {/* Search & Filter */}
      {/* <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search by customer or order no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <select
          className="border rounded p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div> */}

            <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find customers easily</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
          placeholder="Search by customer or order no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm px-8"
        />
              </div>
            </div>

            {/* Credit Limit Filter */}
            <div>
              <Label>Credit Limit</Label>
        <select
          className="border rounded p-2"
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
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>All customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Order No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">{order.orderNo}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4">${order.total}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openEditModal(order)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => openDeleteModal(order)}>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? "Edit Order" : "Add New Order"}</DialogTitle>
            <DialogDescription>
              {isEditModalOpen
                ? "Update order details."
                : "Enter details to create a new order."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Customer</Label>
              <Input
                value={formData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            {/* Items */}
            <div>
              <Label>Items</Label>
              {formData.items.map((it, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Item"
                    value={it.item}
                    onChange={(e) => handleItemChange(idx, "item", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={it.qty}
                    onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={it.price}
                    onChange={(e) => handleItemChange(idx, "price", e.target.value)}
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
              <Button variant="outline" size="sm" onClick={addItemRow}>
                + Add Item
              </Button>
            </div>

            <div>
              <Label>Discount</Label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
              />
            </div>
            <div>
              <Label>Tax</Label>
              <Input
                type="number"
                value={formData.tax}
                onChange={(e) => handleInputChange("tax", e.target.value)}
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input type="number" value={formData.total} readOnly />
            </div>
            <div>
              <Label>Status</Label>
              <select
                className="border rounded p-2 w-full"
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
            <Button onClick={isEditModalOpen ? handleEditOrder : handleAddOrder}>
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
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
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
