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
import { Plus, Pencil, Trash2, Building2, Search, RefreshCcw } from "lucide-react";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  paymentTerms: "",
};

const Suppliers = () => {
const [suppliers, setSuppliers] = useState([
  {
    id: 1,
    name: "ABC Supplies Ltd.",
    phone: "01711111111",
    email: "abc@supplies.com",
    address: "Dhaka, Bangladesh",
    paymentTerms: "Net 30",
  },
  {
    id: 2,
    name: "XYZ Traders",
    phone: "01822222222",
    email: "xyz@traders.com",
    address: "Chittagong, Bangladesh",
    paymentTerms: "Advance",
  },
  {
    id: 3,
    name: "Global Importers",
    phone: "01933333333",
    email: "contact@globalimporters.com",
    address: "Khulna, Bangladesh",
    paymentTerms: "Net 15",
  },
  {
    id: 4,
    name: "Delta Distributors",
    phone: "01644444444",
    email: "info@deltadistributors.com",
    address: "Sylhet, Bangladesh",
    paymentTerms: "Net 45",
  },
  {
    id: 5,
    name: "Sunrise Enterprises",
    phone: "01555555555",
    email: "sales@sunrise.com",
    address: "Rajshahi, Bangladesh",
    paymentTerms: "Cash on Delivery",
  },
  {
    id: 6,
    name: "Prime Wholesalers",
    phone: "01766666666",
    email: "prime@wholesalers.com",
    address: "Barisal, Bangladesh",
    paymentTerms: "Net 60",
  },
]);


  // 🔎 Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedSupplier(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add
  const handleAddSupplier = () => {
    if (!formData.name || !formData.phone || !formData.email) return;
    const newId = suppliers.length + 1;
    const newSupplier = { id: newId, ...formData };

    setSuppliers((prev) => [...prev, newSupplier]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit
  const openEditModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsAddModalOpen(false);
    setIsEditModalOpen(true);

    setFormData({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
      paymentTerms: supplier.paymentTerms || "",
    });
  };

  const handleEditSupplier = () => {
    if (!selectedSupplier) return;
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === selectedSupplier.id ? { ...s, ...formData } : s
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete
  const openDeleteModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSupplier = () => {
    if (!selectedSupplier) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== selectedSupplier.id));
    setIsDeleteModalOpen(false);
    resetForm();
  };

  // Add modal always reset form
  const handleOpenAddModal = () => {
    resetForm();
    setIsEditModalOpen(false);
    setIsAddModalOpen(true);
  };

  // 🧹 Clear search
  const clearFilters = () => {
    setSearchTerm("");
  };

  // 📌 Apply search filter
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold tracking-tight uppercase">Suppliers</h2>
        </div>
        <Button onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" /> <span>Add Supplier</span>
        </Button>
      </div>

      {/* 🔎 Search & Filter */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search suppliers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="bg-yellow-500 hover:bg-yellow-600" variant="outline" onClick={clearFilters}>
                <RefreshCcw className="h-4 w-4" /> Clear Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr className="text-[14px]">
                  <th className="px-4 py-2 text-left">Supplier ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="px-4 py-0.5">{supplier.id}</td>
                    <td className="px-4 py-0.5">{supplier.name}</td>
                    <td className="px-4 py-0.5">{supplier.phone}</td>
                    <td className="px-4 py-0.5">{supplier.email}</td>
                    <td className="px-4 py-0.5">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(supplier)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteModal(supplier)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSuppliers.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No suppliers found.
              </p>
            )}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditModalOpen ? "Edit Supplier" : "Add New Supplier"}
            </DialogTitle>
            <DialogDescription>
              {isEditModalOpen
                ? "Update supplier details."
                : "Enter details to register a new supplier."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div>
              <Label>Payment Terms</Label>
              <Input
                value={formData.paymentTerms}
                onChange={(e) =>
                  handleInputChange("paymentTerms", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
             className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold"
              onClick={isEditModalOpen ? handleEditSupplier : handleAddSupplier}
            >
              {isEditModalOpen ? "Save Changes" : "Add Supplier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedSupplier?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSupplier}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
