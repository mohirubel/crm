import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, RefreshCcw, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_FORM = {
  name: "",
  contact: "",
  source: "",
  status: "New",
  notes: "",
};

const Leads = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", contact: "john@example.com", status: "New" },
    {
      id: 2,
      name: "Jane Smith",
      contact: "+880123456789",
      status: "Contacted",
    },
    {
      id: 3,
      name: "Rahim Uddin",
      contact: "rahim@example.com",
      status: "Qualified",
    },
    { id: 4, name: "Karim Ahmed", contact: "+8801712345678", status: "New" },
    {
      id: 5,
      name: "Sumaiya Akter",
      contact: "sumaiya@example.com",
      status: "Contacted",
    },
    { id: 6, name: "Imran Hossain", contact: "+8801998765432", status: "Lost" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSelected(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.contact) return;

    if (selected) {
      setLeads((prev) =>
        prev.map((l) => (l.id === selected.id ? { ...l, ...formData } : l))
      );
    } else {
      const newId = leads.length + 1;
      setLeads((prev) => [...prev, { id: newId, ...formData }]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const openEdit = (lead) => {
    setSelected(lead);
    setFormData(lead);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  // Derived leads with search & filter applied
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = searchQuery.toLowerCase();

      const leadId = `L-${String(lead.id).padStart(3, "0")}`.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.contact.toLowerCase().includes(query) ||
        String(lead.id).includes(query) ||
        leadId.includes(query);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold uppercase">Leads</h2>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Lead
        </Button>
      </div>

      {/* 🔍 Search & Filter Section */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by name or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600"
                variant="outline"
                onClick={handleClearFilters}
              >
                <RefreshCcw className="h-4 w-4" /> Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📋 Leads Table */}
      <Card>
        <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr className="text-[14px]">
                <th className="px-4 py-2 text-left">Lead ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="px-4 py-0.5">
                      L-{String(lead.id).padStart(3, "0")}
                    </td>
                    <td className="px-4 py-0.5">{lead.name}</td>
                    <td className="px-4 py-0.5">{lead.contact}</td>
                    <td className="px-4 py-0.5">{lead.status}</td>
                    <td className="px-4 py-0.5 flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(lead)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </CardContent>
      </Card>

      {/* ➕ Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? "Edit Lead" : "Add Lead"}</DialogTitle>
            <DialogDescription>Fill in the lead details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 p-6">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Label>Contact Info</Label>
            <Input
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <Label>Source</Label>
            <Input
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
            />
            <Label>Status</Label>
            <select
              className="border px-2 text-sm h-[27px] rounded"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
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

export default Leads;
