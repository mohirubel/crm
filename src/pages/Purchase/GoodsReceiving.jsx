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
import { Plus, Pencil, Trash2, PackageCheck } from "lucide-react";

// Initial form structure
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
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedGRN, setSelectedGRN] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedGRN(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add GRN
  const handleAddGRN = () => {
    if (!formData.supplier || !formData.date || !formData.receivedItems) return;
    const newId = grns.length + 1;
    const newGRN = {
  id: newId,
  grnNo: `GRN-${String(newId).padStart(3, "0")}`,
  supplier: formData.supplier,
  date: formData.date,
  linkedPO: formData.linkedPO,
  items: formData.receivedItems, // 👈 FIX
  qty: formData.qty,
  notes: formData.notes,
  status: formData.status,
};
    setGrns((prev) => [...prev, newGRN]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit GRN
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

  // Delete GRN
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Goods Receiving</h2>
          <p className="text-muted-foreground">
            Manage incoming goods and supplier deliveries
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> <span>Add GRN</span>
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total GRNs</CardTitle>
            <PackageCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grns.length}</div>
            <p className="text-xs text-muted-foreground">
              Recorded goods receipts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Goods Receiving Notes</CardTitle>
          <CardDescription>All recorded GRNs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">GRN No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grns.map((grn) => (
                  <tr key={grn.id}>
                    <td className="px-6 py-4">{grn.grnNo}</td>
                    <td className="px-6 py-4">{grn.supplier}</td>
                    <td className="px-6 py-4">{grn.date}</td>
                    <td className="px-6 py-4">{grn.items}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          grn.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {grn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
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
        <DialogContent className="max-w-lg">
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
              <Label>Notes</Label>
              <Input
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
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
              onClick={isEditModalOpen ? handleEditGRN : handleAddGRN}
            >
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
