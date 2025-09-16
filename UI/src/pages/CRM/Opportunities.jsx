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
  value: "",
  stage: "Prospecting",
  closingDate: "",
  notes: "",
};

const Opportunities = () => {
const [opps, setOpps] = useState([
  { id: 1, customer: "ABC Ltd", value: 20000, stage: "Prospecting" },
  { id: 2, customer: "XYZ Corp", value: 50000, stage: "Negotiation" },
  { id: 3, customer: "Global Traders", value: 35000, stage: "Proposal" },
  { id: 4, customer: "Delta Enterprises", value: 45000, stage: "Qualified" },
  { id: 5, customer: "Sunrise Solutions", value: 60000, stage: "Closed Won" },
  { id: 6, customer: "Prime Industries", value: 40000, stage: "Closed Lost" },
]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔍 Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All");

  const resetForm = () => { 
    setFormData(INITIAL_FORM); 
    setSelected(null); 
  };

  const handleSave = () => {
    if (!formData.customer || !formData.value) return;
    if (selected) {
      setOpps(prev => prev.map(o => o.id === selected.id ? { ...o, ...formData } : o));
    } else {
      const newId = opps.length + 1;
      setOpps(prev => [...prev, { id: newId, ...formData }]);
    }
    setIsModalOpen(false); 
    resetForm();
  };

  const openEdit = (opp) => { 
    setSelected(opp); 
    setFormData(opp); 
    setIsModalOpen(true); 
  };
  const handleDelete = (id) => setOpps(prev => prev.filter(o => o.id !== id));

  // 📌 Apply search & filter
  const filteredOpps = useMemo(() => {
    return opps.filter((o) => {
      const query = searchQuery.toLowerCase();

      // formatted Opp ID like O-001
      const oppId = `O-${String(o.id).padStart(3, "0")}`.toLowerCase();

      const matchesSearch =
        o.customer.toLowerCase().includes(query) ||
        String(o.value).includes(query) ||
        String(o.id).includes(query) ||
        oppId.includes(query);

      const matchesStage =
        stageFilter === "All" || o.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [opps, searchQuery, stageFilter]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold uppercase">Opportunities</h2>
        </div>
        <Button onClick={() => {
          resetForm();
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-1" /> Add Opportunity
        </Button>
      </div>

      {/* 🔍 Search & Filter Section */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                id="search"
                placeholder="Search by Opp ID, Customer, or Value..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                id="stage"
                className="border p-2 rounded w-full"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option>Prospecting</option>
                <option>Qualified</option>
                <option>Proposal</option>
                <option>Negotiation</option>
                <option>Closed Won</option>
                <option>Closed Lost</option>
              </select>
            </div>
            {/* Clear Filters button */}
          <div className="flex justify-start items-end">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStageFilter("All");
              }}
            >
            <RefreshCcw className="h-4 w-4" />  Clear Filters
            </Button>
          </div>
          </div>

          
        </CardContent>
      </Card>

      {/* 📋 Opportunities Table */}
      <Card>
        <CardContent>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Opp ID</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">Stage</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpps.length > 0 ? (
                filteredOpps.map(o => (
                  <tr key={o.id} className="border-t">
                    <td className="p-2">O-{String(o.id).padStart(3,"0")}</td>
                    <td className="p-2">{o.customer}</td>
                    <td className="p-2">${o.value}</td>
                    <td className="p-2">{o.stage}</td>
                    <td className="p-2 flex gap-2 justify-center">
                      <Button size="sm" variant="outline" onClick={()=>openEdit(o)}>
                        <Pencil className="h-4 w-4"/>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={()=>handleDelete(o.id)}>
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No opportunities found
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
            <DialogTitle>{selected ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
            <DialogDescription>Fill in the opportunity details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <Label>Customer</Label>
            <Input 
              value={formData.customer} 
              onChange={(e)=>setFormData({...formData, customer: e.target.value})}
            />
            <Label>Expected Value</Label>
            <Input 
              type="number" 
              value={formData.value} 
              onChange={(e)=>setFormData({...formData, value: e.target.value})}
            />
            <Label>Stage</Label>
            <select 
              className="border p-2 rounded" 
              value={formData.stage} 
              onChange={(e)=>setFormData({...formData, stage: e.target.value})}
            >
              <option>Prospecting</option>
              <option>Qualified</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
            </select>
            <Label>Closing Date</Label>
            <Input 
              type="date" 
              value={formData.closingDate} 
              onChange={(e)=>setFormData({...formData, closingDate: e.target.value})}
            />
            <Label>Notes</Label>
            <Input 
              value={formData.notes} 
              onChange={(e)=>setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{selected ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Opportunities;
