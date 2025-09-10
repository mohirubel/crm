import React, { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Package, Search } from "lucide-react";

const INITIAL_FORM = {
  supplier: "",
  date: "",
  items: [{ item: "", qty: 1, price: 0 }],
  total: 0,
  status: "Pending",
};

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      poNo: "PO-001",
      supplier: "ABC Supplies Ltd.",
      date: "2025-09-02",
      status: "Completed",
      total: 4000,
      items: [{ item: "Raw Material A", qty: 10, price: 300 }],
    },
    {
      id: 2,
      poNo: "PO-002",
      supplier: "XYZ Traders",
      date: "2025-09-05",
      status: "Pending",
      total: 2500,
      items: [{ item: "Packaging Box", qty: 50, price: 50 }],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔍 Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedOrder(null);
  };

  const calculateTotal = (items = formData.items) => {
    const total = items.reduce(
      (sum, i) => sum + Number(i.qty || 0) * Number(i.price || 0),
      0
    );
    setFormData((prev) => ({ ...prev, total }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    calculateTotal(updatedItems);
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
    calculateTotal(updatedItems);
  };

  // ➕ Add
  const handleAddOrder = () => {
    if (!formData.supplier || !formData.date) return;
    const newId = orders.length + 1;
    const poNo = `PO-${String(newId).padStart(3, "0")}`;
    const newOrder = { id: newId, poNo, ...formData };

    setOrders((prev) => [...prev, newOrder]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // ✏️ Edit
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsAddModalOpen(false);
    setIsEditModalOpen(true);

    setFormData({
      supplier: order.supplier || "",
      date: order.date || "",
      items: order.items
        ? order.items.map((it) => ({ ...it }))
        : [{ item: "", qty: 1, price: 0 }],
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

  // 🗑️ Delete
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

  // ✅ Filtering logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchTerm === "" ||
        order.poNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purchase Orders</h2>
          <p className="text-muted-foreground">Manage supplier purchase orders</p>
        </div>
        <Button variant="outline" onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" /> <span>Add Order</span>
        </Button>
      </div>
      
      {/* 🔍 Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Orders</CardTitle>
          <CardDescription>
            Search by PO number, supplier, or date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          <CardDescription>All supplier purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    PO No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4">{order.poNo}</td>
                    <td className="px-6 py-4">{order.supplier}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-6 py-4">${order.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
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
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No orders found.
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
            <DialogTitle>
              {isEditModalOpen ? "Edit Order" : "Add New Order"}
            </DialogTitle>
            <DialogDescription>
              {isEditModalOpen
                ? "Update purchase order details."
                : "Enter details to create a new purchase order."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Supplier</Label>
              <Input
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
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
              <Button variant="outline" size="sm" onClick={addItemRow}>
                + Add Item
              </Button>
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
              <span className="font-bold">{selectedOrder?.poNo}</span>?
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

export default PurchaseOrders;
