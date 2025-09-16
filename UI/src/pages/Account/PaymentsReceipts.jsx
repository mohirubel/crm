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
import { Plus, Pencil, Trash2, Search, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_FORM = {
  type: "Cash",
  date: "",
  amount: 0,
  refInvoice: "",
  notes: "",
};

const PaymentsReceipts = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      paymentId: "PAY-001",
      type: "Cash",
      amount: 2000,
      date: "2025-09-02",
      refInvoice: "INV-001",
      notes: "Customer payment",
    },
    {
      id: 2,
      paymentId: "PAY-002",
      type: "Card",
      amount: 3500,
      date: "2025-09-04",
      refInvoice: "INV-002",
      notes: "Online order",
    },
    {
      id: 3,
      paymentId: "PAY-003",
      type: "Bank",
      amount: 1500,
      date: "2025-09-05",
      refInvoice: "INV-003",
      notes: "Wire transfer",
    },
    {
      id: 4,
      paymentId: "PAY-004",
      type: "Cash",
      amount: 4200,
      date: "2025-09-06",
      refInvoice: "INV-004",
      notes: "In-store payment",
    },
    {
      id: 5,
      paymentId: "PAY-005",
      type: "Cheque",
      amount: 2800,
      date: "2025-09-07",
      refInvoice: "INV-005",
      notes: "Cheque deposit",
    },
    {
      id: 6,
      paymentId: "PAY-006",
      type: "Mobile",
      amount: 5000,
      date: "2025-09-08",
      refInvoice: "INV-006",
      notes: "Mobile wallet",
    },
    {
      id: 7,
      paymentId: "PAY-007",
      type: "Credit",
      amount: 3100,
      date: "2025-09-09",
      refInvoice: "INV-007",
      notes: "Credit card settlement",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔎 Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelected(null);
  };

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
        {
          id: newId,
          paymentId: `PAY-${String(newId).padStart(3, "0")}`,
          ...formData,
        },
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

      const matchesType =
        typeFilter === "all" ||
        p.type.toLowerCase() === typeFilter.toLowerCase();

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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase">Payments Receipts</h2>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add Payment
        </Button>
      </div>

      {/* 🔎 Search & Filter */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                className="w-auto"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <Input
                className="w-auto"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="flex justify-start items-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                variant="outline"
                onClick={clearFilters}
              >
                {" "}
                <RefreshCcw className="h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📑 Payments Table */}
      <Card>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 text-sm border">
            <thead className="bg-gray-50">
              <tr className="text-[14px]">
                <th className="px-4 py-2 text-left">Payment ID</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Ref No</th>
                <th className="px-4 py-2 text-left">Notes</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-0.5">{p.paymentId}</td>
                  <td className="px-4 py-0.5">{p.type}</td>
                  <td className="px-4 py-0.5">{p.amount}</td>
                  <td className="px-4 py-0.5">{p.date}</td>
                  <td className="px-4 py-0.5">{p.refInvoice}</td>
                  <td className="px-4 py-0.5">{p.notes}</td>
                  <td className="px-4 py-0.5 justify-center flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelected(p);
                        setFormData(p);
                        setIsModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p)}
                    >
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
            <DialogTitle>
              {selected ? "Edit Payment" : "Add Payment"}
            </DialogTitle>
            <DialogDescription>Fill in payment details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <Label>Payment Type</Label>
            <select
              className="border rounded px-2 text-sm h-[27px]"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
            </select>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <Label>Amount</Label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
            <Label>Reference Invoice</Label>
            <Input
              value={formData.refInvoice}
              onChange={(e) =>
                setFormData({ ...formData, refInvoice: e.target.value })
              }
            />
            <Label>Notes</Label>
            <Input
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold"
              onClick={handleSave}
            >
              {selected ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsReceipts;
