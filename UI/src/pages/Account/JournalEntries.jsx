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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const INITIAL_FORM = {
  date: "",
  debitAccount: "",
  creditAccount: "",
  amount: 0,
  narration: "",
};

const JournalEntries = () => {
  const [entries, setEntries] = useState([
    { id: 1, entryNo: "JE-001", date: "2025-09-01", debit: "Cash", credit: "Sales", amount: 5000, narration: "Sales income" },
    { id: 2, entryNo: "JE-002", date: "2025-09-05", debit: "Bank", credit: "Cash", amount: 2000, narration: "Deposit" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔎 Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debitFilter, setDebitFilter] = useState("all");
  const [creditFilter, setCreditFilter] = useState("all");

  const resetForm = () => { setFormData(INITIAL_FORM); setSelected(null); };

  const handleSave = () => {
    if (!formData.date || !formData.debitAccount || !formData.creditAccount) return;
    if (selected) {
      setEntries((prev) =>
        prev.map((e) => (e.id === selected.id ? { 
          ...e, 
          date: formData.date,
          debit: formData.debitAccount,
          credit: formData.creditAccount,
          amount: formData.amount,
          narration: formData.narration
        } : e))
      );
    } else {
      const newId = entries.length + 1;
      setEntries((prev) => [
        ...prev,
        { 
          id: newId, 
          entryNo: `JE-${String(newId).padStart(3, "0")}`, 
          date: formData.date,
          debit: formData.debitAccount,
          credit: formData.creditAccount,
          amount: formData.amount,
          narration: formData.narration
        },
      ]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (entry) => {
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
  };

  // Unique accounts for dropdowns
  const debitAccounts = [...new Set(entries.map((e) => e.debit))];
  const creditAccounts = [...new Set(entries.map((e) => e.credit))];

  // 🔎 Filtering logic
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        searchTerm === "" ||
        entry.entryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDebit = debitFilter === "all" || entry.debit.toLowerCase() === debitFilter.toLowerCase();
      const matchesCredit = creditFilter === "all" || entry.credit.toLowerCase() === creditFilter.toLowerCase();

      return matchesSearch && matchesDebit && matchesCredit;
    });
  }, [entries, searchTerm, debitFilter, creditFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setDebitFilter("all");
    setCreditFilter("all");
  };

  const handleEdit = (entry) => {
    setSelected(entry);
    setFormData({
      date: entry.date,
      debitAccount: entry.debit,
      creditAccount: entry.credit,
      amount: entry.amount,
      narration: entry.narration
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Journal Entries</h2>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Entry
        </Button>
      </div>

      {/* 🔎 Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Search by entry no, narration, or filter by accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label>Debit Account</Label>
              <Select value={debitFilter} onValueChange={setDebitFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Debits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Debits</SelectItem>
                  {debitAccounts.map((acc) => (
                    <SelectItem key={acc} value={acc.toLowerCase()}>{acc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Credit Account</Label>
              <Select value={creditFilter} onValueChange={setCreditFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Credits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Credits</SelectItem>
                  {creditAccounts.map((acc) => (
                    <SelectItem key={acc} value={acc.toLowerCase()}>{acc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📑 Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Entries</CardTitle>
          <CardDescription>Manage journal entries</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Entry No</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Debit</th>
                <th className="px-4 py-2 text-left">Credit</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Narration</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-2">{entry.entryNo}</td>
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.debit}</td>
                  <td className="px-4 py-2">{entry.credit}</td>
                  <td className="px-4 py-2">{entry.amount}</td>
                  <td className="px-4 py-2">{entry.narration}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(entry)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(entry)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ➕ Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? "Edit Entry" : "Add Entry"}</DialogTitle>
            <DialogDescription>Fill in entry details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Date</Label>
            <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            <Label>Debit Account</Label>
            <Input value={formData.debitAccount} onChange={(e) => setFormData({ ...formData, debitAccount: e.target.value })} />
            <Label>Credit Account</Label>
            <Input value={formData.creditAccount} onChange={(e) => setFormData({ ...formData, creditAccount: e.target.value })} />
            <Label>Amount</Label>
            <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            <Label>Narration</Label>
            <Input value={formData.narration} onChange={(e) => setFormData({ ...formData, narration: e.target.value })} />
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

export default JournalEntries;