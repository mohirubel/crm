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
import { Users, Plus, Pencil, Trash2, Search } from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahim Uddin",
      email: "rahim@example.com",
      phone: "+8801712345678",
      address: "Dhaka, Bangladesh",
      creditLimit: 50000,
    },
    {
      id: 2,
      name: "Karim Ahmed",
      email: "karim@example.com",
      phone: "+8801998765432",
      address: "Chattogram, Bangladesh",
      creditLimit: 30000,
    },
  ]);

  // Modal & form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    creditLimit: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add Customer
  const handleAddCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    const newId = customers.length + 1;
    const newCustomer = { id: newId, ...formData };
    setCustomers((prev) => [...prev, newCustomer]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit
  const openEditModal = (cust) => {
    setSelectedCustomer(cust);
    setFormData({
      name: cust.name,
      email: cust.email,
      phone: cust.phone,
      address: cust.address,
      creditLimit: cust.creditLimit,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCustomer = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id ? { ...c, ...formData } : c
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete
  const openDeleteModal = (cust) => {
    setSelectedCustomer(cust);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCustomer = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      creditLimit: "",
    });
    setSelectedCustomer(null);
  };

  // Summary
  const totalCustomers = customers.length;

  // — Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [creditFilter, setCreditFilter] = useState("all");

  // Filtering logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        searchTerm === "" ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCredit = true;
      if (creditFilter === "high") matchesCredit = c.creditLimit >= 40000;
      else if (creditFilter === "medium")
        matchesCredit = c.creditLimit >= 20000 && c.creditLimit < 40000;
      else if (creditFilter === "low") matchesCredit = c.creditLimit < 20000;

      return matchesSearch && matchesCredit;
    });
  }, [customers, searchTerm, creditFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setCreditFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage customer information and details
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </Button>
      </div>

      {/* Search & Filter */}
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
                  placeholder="Search name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Credit Limit Filter */}
            <div>
              <Label>Credit Limit</Label>
              <select
                className="border rounded p-2 w-full"
                value={creditFilter}
                onChange={(e) => setCreditFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="high">High (≥ 40k)</option>
                <option value="medium">Medium (20k–40k)</option>
                <option value="low">Low (&lt; 20k)</option>
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

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>All registered customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td className="px-6 py-4">{c.id}</td>
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4">{c.phone}</td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(c)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteModal(c)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter customer details to register.
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
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
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
              <Label>Credit Limit</Label>
              <Input
                type="number"
                value={formData.creditLimit}
                onChange={(e) =>
                  handleInputChange("creditLimit", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update customer details.</DialogDescription>
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
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
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
              <Label>Credit Limit</Label>
              <Input
                type="number"
                value={formData.creditLimit}
                onChange={(e) =>
                  handleInputChange("creditLimit", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedCustomer?.name}</span>? This
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
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
