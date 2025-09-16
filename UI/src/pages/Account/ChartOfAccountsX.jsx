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
import { Plus, Pencil, Trash2, Search, ChevronsUpDown, RefreshCcw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const INITIAL_FORM = {
  code: "",
  name: "",
  type: "Asset",
  parent: "",
};

const ChartOfAccounts = () => {
const [accounts, setAccounts] = useState([
  { id: 1, code: "1001", name: "Cash", type: "Asset", parent: "" },
  { id: 2, code: "2001", name: "Accounts Payable", type: "Liability", parent: "" },
  { id: 3, code: "3001", name: "Sales Revenue", type: "Income", parent: "" },
  { id: 4, code: "4001", name: "Rent Expense", type: "Expense", parent: "" },
  { id: 5, code: "1002", name: "Bank", type: "Asset", parent: "" },
  { id: 6, code: "1003", name: "Accounts Receivable", type: "Asset", parent: "" },
  { id: 7, code: "4002", name: "Utilities Expense", type: "Expense", parent: "" },
  { id: 8, code: "4003", name: "Salary Expense", type: "Expense", parent: "" },
  { id: 9, code: "3002", name: "Service Revenue", type: "Income", parent: "" },
  { id: 10, code: "2002", name: "Taxes Payable", type: "Liability", parent: "" },
  { id: 11, code: "5001", name: "Owner's Equity", type: "Equity", parent: "" },
]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 🔍 Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filtered accounts list
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const matchesSearch =
        searchTerm === "" ||
        acc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "all" || acc.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [accounts, searchTerm, typeFilter]);

  const resetForm = () => { setFormData(INITIAL_FORM); setSelected(null); };

  const handleSave = () => {
    if (!formData.code || !formData.name) return;
    if (selected) {
      setAccounts((prev) =>
        prev.map((a) => (a.id === selected.id ? { ...a, ...formData } : a))
      );
    } else {
      const newId = accounts.length + 1;
      setAccounts((prev) => [...prev, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (acc) => {
    setAccounts((prev) => prev.filter((a) => a.id !== acc.id));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase">Chart of Accounts</h2>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Account
        </Button>
      </div>

      {/* 🔍 Search & Filter */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search accounts"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter by Type (Searchable) */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {typeFilter !== "all" ? typeFilter : "All Types"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search type..." />
                    <CommandEmpty>No type found.</CommandEmpty>
                    <CommandGroup>
                      {["all", "Asset", "Liability", "Expense", "Income"].map((type) => (
                        <CommandItem
                          key={type}
                          onSelect={() => setTypeFilter(type)}
                        >
                          {type === "all" ? "All Types" : type}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button className="bg-yellow-500 hover:bg-yellow-600" variant="outline" onClick={clearFilters}> <RefreshCcw className="h-4 w-4" /> Clear Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 text-sm border">
            <thead className="bg-gray-50">
              <tr className="text-[14px]">
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Parent</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td className="px-4 py-0.5">{acc.code}</td>
                  <td className="px-4 py-0.5">{acc.name}</td>
                  <td className="px-4 py-0.5">{acc.type}</td>
                  <td className="px-4 py-0.5">{acc.parent}</td>
                  <td className="px-4 py-0.5 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelected(acc); setFormData(acc); setIsModalOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(acc)}>
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
            <DialogTitle>{selected ? "Edit Account" : "Add Account"}</DialogTitle>
            <DialogDescription>Fill in account details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <Label>Code</Label>
            <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
            <Label>Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <Label>Type</Label>
            <select
              className="border rounded px-2 text-sm h-[27px]"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
            <Label>Parent Account</Label>

            {/* 🔍 Searchable Parent Select */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {formData.parent
                    ? accounts.find((a) => a.code === formData.parent)?.name
                    : "Select parent account..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search account..." />
                  <CommandEmpty>No account found.</CommandEmpty>
                  <CommandGroup>
                    {accounts.map((acc) => (
                      <CommandItem
                        key={acc.id}
                        onSelect={() => setFormData({ ...formData, parent: acc.code })}
                      >
                        {acc.code} - {acc.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold" onClick={handleSave}>{selected ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChartOfAccounts;
