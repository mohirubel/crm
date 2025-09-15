import React, { useState, useMemo } from "react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, RefreshCcw } from "lucide-react";

const INITIAL_FORM = {
  customer: "",
  issue: "",
  issueType: "",
  priority: "Medium",
  assignedTo: "",
  status: "Open",
};

const SupportTickets = () => {
  const [tickets, setTickets] = useState([
  { id: 1, customer: "John Doe", issue: "Login not working", status: "Open", priority: "High" },
  { id: 2, customer: "Jane Smith", issue: "Payment issue", status: "Closed", priority: "Medium" },
  { id: 3, customer: "Rahim Uddin", issue: "Account locked", status: "In Progress", priority: "High" },
  { id: 4, customer: "Karim Ahmed", issue: "Unable to generate report", status: "Open", priority: "Low" },
  { id: 5, customer: "Sumaiya Akter", issue: "Error on checkout", status: "Resolved", priority: "Medium" },
  { id: 6, customer: "Imran Hossain", issue: "Page loading slowly", status: "Open", priority: "Low" },
]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔍 Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const resetForm = () => { setFormData(INITIAL_FORM); setSelected(null); };

  const handleSave = () => {
    if (!formData.customer || !formData.issue) return;
    if (selected) {
      setTickets(prev => prev.map(t => t.id === selected.id ? { ...t, ...formData } : t));
    } else {
      const newId = tickets.length + 1;
      setTickets(prev => [...prev, { id: newId, ...formData }]);
    }
    setIsModalOpen(false); resetForm();
  };

  const openEdit = (ticket) => { setSelected(ticket); setFormData(ticket); setIsModalOpen(true); };
  const handleDelete = (id) => setTickets(prev => prev.filter(t => t.id !== id));

  // 📌 Apply search & filters
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const query = searchQuery.toLowerCase();

      // formatted Ticket ID like T-001
      const ticketId = `T-${String(t.id).padStart(3, "0")}`.toLowerCase();

      const matchesSearch =
        t.customer.toLowerCase().includes(query) ||
        t.issue.toLowerCase().includes(query) ||
        ticketId.includes(query) ||
        String(t.id).includes(query);

      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold uppercase">Support Tickets</h2>
        </div>
        <Button onClick={() => {
          resetForm()
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-1"/> Add Ticket
        </Button>
      </div>

      {/* 🔍 Search & Filter Section */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                id="search"
                placeholder="Search by Ticket No or Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                id="status"
                className="border px-2 rounded w-full text-sm h-[27px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <select
                id="priority"
                className="border px-2 rounded w-full text-sm h-[27px]"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            {/* Clear Filters Button */}
          <div className="flex justify-start items-end">
            <Button
             className="bg-yellow-500 hover:bg-yellow-600"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setPriorityFilter("All");
              }}
            >
             <RefreshCcw className="h-4 w-4" /> Clear Filters
            </Button>
          </div>
          </div>

          
        </CardContent>
      </Card>

      {/* 📋 Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets List</CardTitle>
          <CardDescription>All customer support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Ticket No</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Issue</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map(t => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">T-{String(t.id).padStart(3,"0")}</td>
                    <td className="p-2">{t.customer}</td>
                    <td className="p-2">{t.issue}</td>
                    <td className="p-2">{t.status}</td>
                    <td className="p-2">{t.priority}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <Button size="sm" variant="outline" onClick={()=>openEdit(t)}><Pencil className="h-4 w-4"/></Button>
                      <Button size="sm" variant="destructive" onClick={()=>handleDelete(t.id)}><Trash2 className="h-4 w-4"/></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ➕ Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>{selected ? "Edit Ticket" : "Add Ticket"}</DialogTitle>
      <DialogDescription>Fill in the ticket details</DialogDescription>
    </DialogHeader>

    {/* Two-column grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <div>
        <Label>Customer</Label>
        <Input
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
        />
      </div>
      <div>
        <Label>Issue</Label>
        <Input
          value={formData.issue}
          onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
        />
      </div>

      <div>
        <Label>Issue Type</Label>
        <Input
          value={formData.issueType}
          onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
        />
      </div>
      <div>
        <Label>Priority</Label>
        <select
          className="border px-2 rounded w-full text-sm h-[27px]"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div>
        <Label>Assigned To</Label>
        <Input
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
        />
      </div>
      <div>
        <Label>Status</Label>
        <select
          className="border px-2 rounded w-full text-sm h-[27px]"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>{selected ? "Save" : "Add"}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default SupportTickets;
