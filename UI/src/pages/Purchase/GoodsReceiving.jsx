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
import { Plus, Pencil, Trash2, PackageCheck, Search, RefreshCcw } from "lucide-react";

const INITIAL_FORM = {
  supplier: "",
  date: "",
  linkedPO: "",
  receivedItems: "",
  qty: "",
  notes: "",
  status: "Pending",
};

const GoodsReceiving = () => {
  const [grns, setGrns] = useState([
  {
    id: 1,
    grnNo: "GRN-001",
    supplier: "ABC Supplies Ltd.",
    date: "2025-09-05",
    items: "Laptop, Mouse",
    qty: 12,
    notes: "Delivered in good condition",
    status: "Completed",
    linkedPO: "PO-101",
  },
  {
    id: 2,
    grnNo: "GRN-002",
    supplier: "XYZ Traders",
    date: "2025-09-07",
    items: "Office Chairs",
    qty: 20,
    notes: "Minor scratches",
    status: "Pending",
    linkedPO: "PO-102",
  },
  {
    id: 3,
    grnNo: "GRN-003",
    supplier: "Global Importers",
    date: "2025-09-08",
    items: "Printers",
    qty: 5,
    notes: "Packed securely",
    status: "Completed",
    linkedPO: "PO-103",
  },
  {
    id: 4,
    grnNo: "GRN-004",
    supplier: "Delta Distributors",
    date: "2025-09-09",
    items: "Desks",
    qty: 15,
    notes: "2 desks slightly damaged",
    status: "Pending",
    linkedPO: "PO-104",
  },
  {
    id: 5,
    grnNo: "GRN-005",
    supplier: "Sunrise Enterprises",
    date: "2025-09-10",
    items: "Projectors",
    qty: 3,
    notes: "Delivered late",
    status: "Completed",
    linkedPO: "PO-105",
  }
]);


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedGRN, setSelectedGRN] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔍 Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedGRN(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ➕ Add GRN
  const handleAddGRN = () => {
    if (!formData.supplier || !formData.date || !formData.receivedItems) return;
    const newId = grns.length + 1;
    const newGRN = {
      id: newId,
      grnNo: `GRN-${String(newId).padStart(3, "0")}`,
      supplier: formData.supplier,
      date: formData.date,
      linkedPO: formData.linkedPO,
      items: formData.receivedItems,
      qty: formData.qty,
      notes: formData.notes,
      status: formData.status,
    };
    setGrns((prev) => [...prev, newGRN]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // ✏️ Edit GRN
  const openEditModal = (grn) => {
    setSelectedGRN(grn);
    setIsEditModalOpen(true);
    setFormData({
      supplier: grn.supplier,
      date: grn.date,
      linkedPO: grn.linkedPO,
      receivedItems: grn.items,
      qty: grn.qty,
      notes: grn.notes,
      status: grn.status,
    });
  };

  const handleEditGRN = () => {
    if (!selectedGRN) return;
    setGrns((prev) =>
      prev.map((g) =>
        g.id === selectedGRN.id ? { ...g, ...formData, items: formData.receivedItems } : g
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // 🗑️ Delete GRN
  const openDeleteModal = (grn) => {
    setSelectedGRN(grn);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteGRN = () => {
    if (!selectedGRN) return;
    setGrns((prev) => prev.filter((g) => g.id !== selectedGRN.id));
    setIsDeleteModalOpen(false);
    resetForm();
  };

  // ✅ Filtering logic
  const filteredGRNs = useMemo(() => {
    return grns.filter((grn) => {
      const matchesSearch =
        searchTerm === "" ||
        grn.grnNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grn.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grn.date.includes(searchTerm) ||
        grn.items.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        grn.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [grns, searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold tracking-tight uppercase">Goods Receiving</h2>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> <span>Add GRN</span>
        </Button>
      </div>

      {/* 🔍 Search & Filter */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search GRNs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
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
              <Button className="bg-yellow-500 hover:bg-yellow-600" variant="outline" onClick={clearFilters}>
               <RefreshCcw className="h-4 w-4" /> Clear Filters
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
                  <th className="px-4 py-2 text-left">GRN No</th>
                  <th className="px-4 py-2 text-left">Supplier</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Items</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGRNs.map((grn) => (
                  <tr key={grn.id}>
                    <td className="px-4 py-0.5">{grn.grnNo}</td>
                    <td className="px-4 py-0.5">{grn.supplier}</td>
                    <td className="px-4 py-0.5">{grn.date}</td>
                    <td className="px-4 py-0.5">{grn.items}</td>
                    <td className="px-4 py-0.5">
                      <span
                        className={`px-2 py-[1px] rounded-full text-xs ${
                          grn.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {grn.status}
                      </span>
                    </td>
                    <td className="px-6 py-0.5">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(grn)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteModal(grn)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredGRNs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No GRNs found.
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
        {isEditModalOpen ? "Edit GRN" : "Add Goods Receiving Note"}
      </DialogTitle>
      <DialogDescription>
        {isEditModalOpen
          ? "Update goods receiving details."
          : "Enter details for a new GRN."}
      </DialogDescription>
    </DialogHeader>

    {/* Two Column Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
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

      <div>
        <Label>Linked PO</Label>
        <Input
          value={formData.linkedPO}
          onChange={(e) => handleInputChange("linkedPO", e.target.value)}
        />
      </div>
      <div>
        <Label>Received Items</Label>
        <Input
          value={formData.receivedItems}
          onChange={(e) => handleInputChange("receivedItems", e.target.value)}
        />
      </div>

      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={formData.qty}
          onChange={(e) => handleInputChange("qty", e.target.value)}
        />
      </div>
      <div>
        <Label>Status</Label>
        <select
          className="w-full border rounded-md p-2"
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Full-width notes field */}
      <div className="md:col-span-2">
        <Label>Notes</Label>
        <Input
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
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
      <Button className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold" onClick={isEditModalOpen ? handleEditGRN : handleAddGRN}>
        {isEditModalOpen ? "Save Changes" : "Add GRN"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete GRN</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedGRN?.grnNo}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGRN}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoodsReceiving;
