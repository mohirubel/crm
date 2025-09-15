import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Plus,
  Pencil,
  Trash2,
  Search,
  RefreshCcw,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

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
    {
      id: 3,
      name: "Selina Akter",
      email: "selina@example.com",
      phone: "+8801854321987",
      address: "Sylhet, Bangladesh",
      creditLimit: 40000,
    },
    {
      id: 4,
      name: "Abdul Hannan",
      email: "hannan@example.com",
      phone: "+8801722334455",
      address: "Rajshahi, Bangladesh",
      creditLimit: 25000,
    },
    {
      id: 5,
      name: "Mitu Sultana",
      email: "mitu@example.com",
      phone: "+8801966778899",
      address: "Khulna, Bangladesh",
      creditLimit: 35000,
    },
    {
      id: 6,
      name: "Jahangir Alam",
      email: "jahangir@example.com",
      phone: "+8801711122233",
      address: "Barishal, Bangladesh",
      creditLimit: 45000,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [creditFilter, setCreditFilter] = useState("all");

  // sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // modal states
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

  const creditOptions = [
    { value: "all", label: "All Credit" },
    { value: "high", label: "High (≥ 40k)" },
    { value: "medium", label: "Medium (20k–40k)" },
    { value: "low", label: "Low (< 20k)" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Add
  const handleAddCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    const newId = customers.length + 1;
    setCustomers((prev) => [...prev, { id: newId, ...formData }]);
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

  const clearFilters = () => {
    setSearchTerm("");
    setCreditFilter("all");
  };

  useEffect(()=> {
    handleSort("id")
  },[])

  // Filter & Sort
  const filteredCustomers = useMemo(() => {
    let data = customers.filter((c) => {
      const matchesSearch =
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

    if (sortConfig.key) {
      data = [...data].sort((a, b) => {
        const aVal = a[sortConfig.key]?.toString().toLowerCase();
        const bVal = b[sortConfig.key]?.toString().toLowerCase();
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [customers, searchTerm, creditFilter, sortConfig]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold tracking-tight uppercase">Customers</h2>
        <Button
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
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search name, email or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between w-full"
                >
                  {
                    creditOptions.find((opt) => opt.value === creditFilter)
                      ?.label
                  }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="p-0 w-[var(--radix-popover-trigger-width)]"
              >
                <Command>
                  <CommandInput placeholder="Search credit" />
                  <CommandEmpty>No credit option found.</CommandEmpty>
                  <CommandGroup>
                    {creditOptions.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        onSelect={() => setCreditFilter(opt.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            creditFilter === opt.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

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
                <tr className="text-[14px]">
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    ID
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("phone")}
                  >
                    Phone
                    {sortConfig.key === "phone" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    Email
                    {sortConfig.key === "email" &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-[2px]">{c.id}</td>
                    <td className="px-4 py-[2px]">{c.name}</td>
                    <td className="px-4 py-[2px]">{c.phone}</td>
                    <td className="px-4 py-[2px]">{c.email}</td>
                    <td className="px-4 py-[2px]">
                      <div className="flex justify-center space-x-2">
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
            {filteredCustomers.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No customers found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 p-6">
            <div className="grid">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
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
            <Button variant="destructive" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold"
              onClick={handleAddCustomer}
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 p-6">
            <div className="grid">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
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
            <Button variant="destructive" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold" onClick={handleEditCustomer}>Save Changes</Button>
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
          <DialogFooter className="border-t-0">
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
