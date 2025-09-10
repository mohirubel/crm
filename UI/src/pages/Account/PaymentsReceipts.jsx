import React, { useState, useMemo } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const INITIAL_FORM = {
  type: "Cash",
  date: "",
  amount: 0,
  refInvoice: "",
  notes: "",
};

const PaymentsReceipts = () => {
  const [payments, setPayments] = useState([
    { id: 1, paymentId: "PAY-001", type: "Cash", amount: 2000, date: "2025-09-02", refInvoice: "INV-001", notes: "Customer payment" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔎 Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const resetForm = () => { setFormData(INITIAL_FORM); setSelected(null); };

  const handleSave = () => {
    if (!formData.date || !formData.amount) return;
    if (selected) {
      setPayments((prev) =>
        prev.map((p) => (p.id === selected.id ? { ...p, ...formData } : p))
      );
    } else {
      const newId = payments.length + 1;
      setPayments((prev) => [
        ...prev,
        { id: newId, paymentId: `PAY-${String(newId).padStart(3, "0")}`, ...formData },
      ]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (payment) => {
    setPayments((prev) => prev.filter((p) => p.id !== payment.id));
  };

  // 🔎 Filtering logic
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        searchTerm === "" ||
        p.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.refInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.notes.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" || p.type.toLowerCase() === typeFilter.toLowerCase();

      const matchesDate =
        (!fromDate || new Date(p.date) >= new Date(fromDate)) &&
        (!toDate || new Date(p.date) <= new Date(toDate));

      return matchesSearch && matchesType && matchesDate;
    });
  }, [payments, searchTerm, typeFilter, fromDate, toDate]);

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Payments / Receipts</h2>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Payment
        </Button>
      </div>

      {/* 🔎 Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Search payments or filter by type/date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Payment Type</Label>
              <select
                className="border rounded p-2 w-full"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            <div>
              <Label>From Date</Label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>

            <div>
              <Label>To Date</Label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* 📑 Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Manage payments and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Ref No</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.paymentId}</td>
                  <td className="px-6 py-4">{p.type}</td>
                  <td className="px-6 py-4">{p.amount}</td>
                  <td className="px-6 py-4">{p.date}</td>
                  <td className="px-6 py-4">{p.refInvoice}</td>
                  <td className="px-6 py-4">{p.notes}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelected(p); setFormData(p); setIsModalOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? "Edit Payment" : "Add Payment"}</DialogTitle>
            <DialogDescription>Fill in payment details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Payment Type</Label>
            <select
              className="border rounded p-2"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
            </select>
            <Label>Date</Label>
            <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            <Label>Amount</Label>
            <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            <Label>Reference Invoice</Label>
            <Input value={formData.refInvoice} onChange={(e) => setFormData({ ...formData, refInvoice: e.target.value })} />
            <Label>Notes</Label>
            <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{selected ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsReceipts;
