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
import { Warehouse, Plus, Pencil, Trash2, Search } from "lucide-react";

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

  const totalWarehouses = warehouses.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Warehouses</h2>
          <p className="text-muted-foreground">
            Manage your warehouse locations and details
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Warehouse</span>
        </Button>
      </div>

      {/* 🔎 Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search Warehouses</CardTitle>
          <CardDescription>Search by name, address, or contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
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
              <Button variant="outline" onClick={clearFilters}>
                Clear Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse List</CardTitle>
          <CardDescription>
            All warehouse locations and contacts
          </CardDescription>
        </CardHeader>
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
            <DialogDescription>
              Create a new warehouse entry with details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
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
            <Button onClick={handleAddWarehouse}>Add Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Warehouse</DialogTitle>
            <DialogDescription>
              Update the details of this warehouse.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
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
