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
import { Plus, Pencil, Trash2 } from "lucide-react";

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
    { id: 2, name: "Jane Smith", contact: "+880123456789", status: "Contacted" },
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Leads</h2>
          <p className="text-muted-foreground">Manage your customer leads</p>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-1" /> Add Lead
        </Button>
      </div>

      {/* 🔍 Search & Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find leads quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Filter by Status</Label>
              <select
                id="status"
                className="border p-2 rounded w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 📋 Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead List</CardTitle>
          <CardDescription>All captured leads</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Lead ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="p-2">
                      L-{String(lead.id).padStart(3, "0")}
                    </td>
                    <td className="p-2">{lead.name}</td>
                    <td className="p-2">{lead.contact}</td>
                    <td className="p-2">{lead.status}</td>
                    <td className="p-2 flex gap-2 justify-center">
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
        </CardContent>
      </Card>

      {/* ➕ Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? "Edit Lead" : "Add Lead"}</DialogTitle>
            <DialogDescription>Fill in the lead details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
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
              className="border p-2 rounded"
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
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selected ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
