import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
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
import { Search, Plus, Pencil, Trash2, RefreshCcw } from "lucide-react";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Central Warehouse",
      address: "123 Main Street, Dhaka",
      contact: "+8801712345678",
    },
    {
      id: 2,
      name: "Branch Warehouse",
      address: "45 Park Road, Chattogram",
      contact: "+8801998765432",
    },
  ]);

  // 🔎 Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add warehouse
  const handleAddWarehouse = () => {
    if (!formData.name || !formData.address) return;

    const newId = warehouses.length + 1;
    const warehouse = {
      id: newId,
      ...formData,
    };

    setWarehouses((prev) => [...prev, warehouse]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Open edit modal
  const openEditModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      address: warehouse.address,
      contact: warehouse.contact,
    });
    setIsEditModalOpen(true);
  };

  // Save edit
  const handleEditWarehouse = () => {
    if (!formData.name || !formData.address) return;

    setWarehouses((prev) =>
      prev.map((w) =>
        w.id === selectedWarehouse.id ? { ...w, ...formData } : w
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // Open delete modal
  const openDeleteModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleDeleteWarehouse = () => {
    setWarehouses((prev) => prev.filter((w) => w.id !== selectedWarehouse.id));
    setIsDeleteModalOpen(false);
    setSelectedWarehouse(null);
  };

  const resetForm = () => {
    setFormData({ name: "", address: "", contact: "" });
    setSelectedWarehouse(null);
  };

  // 🧹 Clear search
  const clearFilters = () => {
    setSearchTerm("");
  };

  // 📌 Apply search filter
  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(
      (wh) =>
        wh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wh.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wh.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [warehouses, searchTerm]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight uppercase">
            Warehouses
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-[#161717]"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Warehouse</span>
          </Button>
        </div>
      </div>

      {/* 🔎 Search */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search warehouses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Contact</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWarehouses.map((wh) => (
                  <tr key={wh.id}>
                    <td className="px-4 py-2">{wh.id}</td>
                    <td className="px-4 py-2 font-medium">{wh.name}</td>
                    <td className="px-4 py-2">{wh.address}</td>
                    <td className="px-4 py-2">{wh.contact}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(wh)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteModal(wh)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredWarehouses.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No warehouses found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Warehouse</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="grid">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Contact</Label>
              <Input
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-[#333] font-semibold"
              onClick={handleAddWarehouse}
            >
              Add Warehouse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Warehouse</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 py-4 gap-4">
            <div className="grid">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Contact</Label>
              <Input
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditWarehouse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Warehouse</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedWarehouse?.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWarehouse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Warehouses;
