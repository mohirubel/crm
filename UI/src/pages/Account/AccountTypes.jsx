import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Search, RefreshCcw, Eye } from "lucide-react";

const INITIAL_TYPE = { name: "", description: "" };
const INITIAL_HEAD = { name: "" };

export default function AccountTypes() {
  // ---------- Types & Heads ----------
  const [types, setTypes] = useState([
    {
      id: 1,
      name: "Asset",
      description: "Resources owned by the company",
      heads: [{ id: 1, name: "Current Assets" }],
    },
    {
      id: 2,
      name: "Liability",
      description: "Obligations payable",
      heads: [{ id: 2, name: "Current Liabilities" }],
    },
  ]);

  // Global incremental id for heads
  const [headCounter, setHeadCounter] = useState(3);

  // ---------- UI State ----------
  const [search, setSearch] = useState("");
  const [typeModal, setTypeModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [headModal, setHeadModal] = useState(false);

  const [editingType, setEditingType] = useState(null);
  const [editingHead, setEditingHead] = useState(null);
  const [parentType, setParentType] = useState(null);

  const [typeForm, setTypeForm] = useState(INITIAL_TYPE);
  const [headForm, setHeadForm] = useState(INITIAL_HEAD);

  // ---------- Filter ----------
  const filtered = useMemo(() => {
    return types.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [types, search]);

  // ---------- Type CRUD ----------
  const saveType = () => {
    if (!typeForm.name.trim()) return;
    if (editingType) {
      setTypes((prev) =>
        prev.map((t) =>
          t.id === editingType.id ? { ...t, ...typeForm } : t
        )
      );
    } else {
      const nextId = types.length ? Math.max(...types.map((t) => t.id)) + 1 : 1;
      setTypes((prev) => [...prev, { id: nextId, ...typeForm, heads: [] }]);
    }
    setTypeModal(false);
    setTypeForm(INITIAL_TYPE);
    setEditingType(null);
  };

  const deleteType = (id) =>
    setTypes((prev) => prev.filter((t) => t.id !== id));

  // ---------- Head CRUD ----------
  const saveHead = () => {
    if (!headForm.name.trim() || !parentType) return;
    setTypes((prev) =>
      prev.map((t) => {
        if (t.id !== parentType.id) return t;
        if (editingHead) {
          return {
            ...t,
            heads: t.heads.map((h) =>
              h.id === editingHead.id ? { ...h, name: headForm.name } : h
            ),
          };
        } else {
          const newHead = { id: headCounter, name: headForm.name };
          setHeadCounter((c) => c + 1);
          return { ...t, heads: [...t.heads, newHead] };
        }
      })
    );

    // Update the modal’s selected type immediately so UI refreshes
    setParentType((p) =>
      p
        ? {
            ...p,
            heads: editingHead
              ? p.heads.map((h) =>
                  h.id === editingHead.id ? { ...h, name: headForm.name } : h
                )
              : [...p.heads, { id: headCounter, name: headForm.name }],
          }
        : null
    );

    setHeadModal(false);
    setHeadForm(INITIAL_HEAD);
    setEditingHead(null);
  };

  const deleteHead = (typeId, headId) => {
    setTypes((prev) =>
      prev.map((t) =>
        t.id === typeId ? { ...t, heads: t.heads.filter((h) => h.id !== headId) } : t
      )
    );
    // also update currently viewed type so UI updates instantly
    setParentType((p) =>
      p ? { ...p, heads: p.heads.filter((h) => h.id !== headId) } : p
    );
  };

  // ---------- UI ----------
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase">Account Types</h2>
        <Button
          onClick={() => {
            setEditingType(null);
            setTypeForm(INITIAL_TYPE);
            setTypeModal(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Type
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9"
                placeholder="Search types..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600"
              variant="outline"
              onClick={() => setSearch("")}
            >
              <RefreshCcw className="h-4 w-4" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-1">{t.name}</td>
                  <td className="px-4 py-1">{t.description}</td>
                  <td className="px-4 py-1 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setParentType(t);
                        setViewModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingType(t);
                        setTypeForm(t);
                        setTypeModal(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteType(t.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 italic text-gray-500">
                    No types found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </CardContent>
      </Card>

      {/* ---- Type Modal ---- */}
      <Dialog open={typeModal} onOpenChange={setTypeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingType ? "Edit Type" : "Add Type"}
            </DialogTitle>
            <DialogDescription>Define account type.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <Input
              placeholder="Name"
              value={typeForm.name}
              onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={typeForm.description}
              onChange={(e) =>
                setTypeForm({ ...typeForm, description: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setTypeModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveType}>
              {editingType ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- View Heads Modal ---- */}
      <Dialog open={viewModal} onOpenChange={setViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{parentType?.name} – Heads</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 p-6">
            {parentType?.heads?.length ? (
              parentType.heads.map((h) => (
                <div
                  key={h.id}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <span>{h.name}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingHead(h);
                        setHeadForm(h);
                        setHeadModal(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteHead(parentType.id, h.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No heads yet.</p>
            )}
            <Button
              onClick={() => {
                setEditingHead(null);
                setHeadForm(INITIAL_HEAD);
                setHeadModal(true);
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Head
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Add/Edit Head Modal ---- */}
      <Dialog open={headModal} onOpenChange={setHeadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingHead ? "Edit Head" : "Add Head"}</DialogTitle>
            <DialogDescription>
              Parent Type: {parentType?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <Input
              placeholder="Head Name"
              value={headForm.name}
              onChange={(e) => setHeadForm({ ...headForm, name: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setHeadModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveHead}>
              {editingHead ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
