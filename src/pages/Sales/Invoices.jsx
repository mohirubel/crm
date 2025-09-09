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
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";

const INITIAL_FORM = {
  customer: "",
  date: "",
  orderRef: "",
  items: [{ item: "", qty: 1, price: 0 }],
  tax: 0,
  total: 0,
  paymentTerms: "",
  status: "Pending",
};

const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: "INV-001",
      customer: "Rahim Uddin",
      date: "2025-09-01",
      amount: 5000,
      status: "Paid",
      orderRef: "SO-001",
      items: [{ item: "Product A", qty: 2, price: 2000 }],
      tax: 500,
      total: 5000,
      paymentTerms: "Net 30",
    },
    {
      id: 2,
      invoiceNo: "INV-002",
      customer: "Karim Ahmed",
      date: "2025-09-03",
      amount: 8000,
      status: "Pending",
      orderRef: "SO-002",
      items: [{ item: "Product B", qty: 4, price: 2000 }],
      tax: 0,
      total: 8000,
      paymentTerms: "Net 15",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // calculate total based on passed items and tax (avoid stale state)
  const calculateTotal = (items = formData.items, tax = formData.tax) => {
    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.qty || 0) * Number(i.price || 0),
      0
    );
    const total = subtotal + Number(tax || 0);
    setFormData((prev) => ({ ...prev, total }));
  };

  // Generic input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "tax") {
      // recalc using updated tax
      calculateTotal(formData.items, Number(value || 0));
    }
  };

  // Item changes
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
    calculateTotal(updatedItems, formData.tax);
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
    calculateTotal(updatedItems, formData.tax);
  };

  // Reset form to initial blank state
  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelectedInvoice(null);
  };

  // Add Invoice
  const handleAddInvoice = () => {
    if (!formData.customer || !formData.date) return;

    const newId = invoices.length + 1;
    const invoiceNo = `INV-${String(newId).padStart(3, "0")}`;
    const invoice = { id: newId, invoiceNo, amount: formData.total, ...formData };

    setInvoices((prev) => [...prev, invoice]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Open Edit Modal - populate form with invoice data
  const openEditModal = (invoice) => {
    setSelectedInvoice(invoice);
    // ensure add modal is closed
    setIsAddModalOpen(false);
    setIsEditModalOpen(true);

    setFormData({
      customer: invoice.customer || "",
      date: invoice.date || "",
      orderRef: invoice.orderRef || "",
      items: invoice.items ? invoice.items.map(it => ({ ...it })) : [{ item: "", qty: 1, price: 0 }],
      tax: invoice.tax || 0,
      total: invoice.total || 0,
      paymentTerms: invoice.paymentTerms || "",
      status: invoice.status || "Pending",
    });
  };

  const handleEditInvoice = () => {
    if (!selectedInvoice) return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selectedInvoice.id
          ? { ...inv, ...formData, amount: formData.total }
          : inv
      )
    );
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete
  const openDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteInvoice = () => {
    if (!selectedInvoice) return;
    setInvoices((prev) => prev.filter((inv) => inv.id !== selectedInvoice.id));
    setIsDeleteModalOpen(false);
    setSelectedInvoice(null);
  };

  // When opening the Add modal, make sure form is reset (this avoids the edit data showing)
  const handleOpenAddModal = () => {
    resetForm();
    setIsEditModalOpen(false);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage sales invoices and payments</p>
        </div>
        <Button variant="outline" onClick={handleOpenAddModal}>
          <Plus className="h-4 w-4" />
          <span>Add Invoice</span>
        </Button>
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>All generated invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="px-6 py-4">{inv.invoiceNo}</td>
                    <td className="px-6 py-4">{inv.customer}</td>
                    <td className="px-6 py-4">{inv.date}</td>
                    <td className="px-6 py-4">${inv.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          inv.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEditModal(inv)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => openDeleteModal(inv)}>
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

      {/* Add/Edit Modal (shared) */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={(val) => {
          if (!val) {
            // close both modes and reset to avoid leftover data
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? "Edit Invoice" : "Add New Invoice"}</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? "Update invoice details." : "Enter invoice details to create."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Customer</Label>
              <Input value={formData.customer} onChange={(e) => handleInputChange("customer", e.target.value)} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />
            </div>
            <div>
              <Label>Order Ref</Label>
              <Input value={formData.orderRef} onChange={(e) => handleInputChange("orderRef", e.target.value)} />
            </div>

            {/* Items */}
            <div>
              <Label>Items</Label>
              {formData.items.map((it, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input placeholder="Item" value={it.item} onChange={(e) => handleItemChange(idx, "item", e.target.value)} />
                  <Input type="number" placeholder="Qty" value={it.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} />
                  <Input type="number" placeholder="Price" value={it.price} onChange={(e) => handleItemChange(idx, "price", e.target.value)} />
                  <Button variant="destructive" size="sm" onClick={() => removeItemRow(idx)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addItemRow}>
                + Add Item
              </Button>
            </div>

            <div>
              <Label>Tax</Label>
              <Input type="number" value={formData.tax} onChange={(e) => handleInputChange("tax", e.target.value)} />
            </div>
            <div>
              <Label>Total</Label>
              <Input type="number" value={formData.total} readOnly />
            </div>
            <div>
              <Label>Payment Terms</Label>
              <Input value={formData.paymentTerms} onChange={(e) => handleInputChange("paymentTerms", e.target.value)} />
            </div>
            <div>
              <Label>Status</Label>
              <select className="border rounded p-2 w-full" value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={isEditModalOpen ? handleEditInvoice : handleAddInvoice}>
              {isEditModalOpen ? "Save Changes" : "Add Invoice"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedInvoice?.invoiceNo}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteInvoice}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;
