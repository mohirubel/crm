import React, { useState, useMemo } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, RefreshCcw, Search } from 'lucide-react';

const Projects = () => {
const [projects, setProjects] = useState([
  {
    id: 1,
    name: 'E-commerce Website',
    client: 'ABC Ltd.',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    budget: 50000,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'XYZ Corp.',
    startDate: '2024-08-10',
    endDate: '2025-01-15',
    budget: 30000,
    status: 'Planning',
  },
  {
    id: 3,
    name: 'CRM System Upgrade',
    client: 'Global Tech',
    startDate: '2024-09-05',
    endDate: '2025-02-28',
    budget: 45000,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Inventory Management',
    client: 'Retail Hub',
    startDate: '2024-10-01',
    endDate: '2025-03-30',
    budget: 25000,
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Website Redesign',
    client: 'Bright Media',
    startDate: '2024-06-15',
    endDate: '2024-11-20',
    budget: 15000,
    status: 'Completed',
  },
  {
    id: 6,
    name: 'AI Chatbot',
    client: 'NextGen Solutions',
    startDate: '2024-11-01',
    endDate: '2025-04-30',
    budget: 40000,
    status: 'Planning',
  },
  {
    id: 7,
    name: 'Data Analytics Platform',
    client: 'Insight Co.',
    startDate: '2024-07-20',
    endDate: '2025-01-31',
    budget: 60000,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Cloud Migration',
    client: 'Skyline Ltd.',
    startDate: '2024-08-25',
    endDate: '2025-02-10',
    budget: 35000,
    status: 'On Hold',
  },
  {
    id: 9,
    name: 'Digital Marketing Campaign',
    client: 'MarketPro',
    startDate: '2024-09-10',
    endDate: '2024-12-15',
    budget: 12000,
    status: 'Active',
  },
]);


  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'Planning',
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        p.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const handleSaveProject = () => {
    if (!newProject.name || !newProject.client) return;

    if (editingProjectId) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProjectId
            ? { ...p, ...newProject, budget: parseFloat(newProject.budget) || 0 }
            : p
        )
      );
    } else {
      // Add new project
      const newId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects((prev) => [
        ...prev,
        { id: newId, ...newProject, budget: parseFloat(newProject.budget) || 0 },
      ]);
    }

    setIsModalOpen(false);
    setEditingProjectId(null);
    setNewProject({
      name: '',
      client: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'Planning',
    });
  };

  const handleEdit = (project) => {
    setEditingProjectId(project.id);
    setNewProject({ ...project, budget: project.budget.toString() });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold uppercase">Projects</h2>
        </div>
        <Button onClick={() => {
          setNewProject({
      name: '',
      client: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'Planning',
    });
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className='relative'>
          <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="bg-yellow-500 hover:bg-yellow-600" variant="outline" onClick={resetFilters}>
             <RefreshCcw className="h-4 w-4" /> Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr className='text-[14px]'>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Start - End</th>
                  <th className="px-4 py-2 text-left">Budget</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-0.5">{p.id}</td>
                    <td className="px-4 py-0.5 font-medium">{p.name}</td>
                    <td className="px-4 py-0.5">{p.client}</td>
                    <td className="px-4 py-0.5">{p.status}</td>
                    <td className="px-4 py-0.5">
                      {p.startDate} → {p.endDate}
                    </td>
                    <td className="px-4 py-0.5">${p.budget}</td>
                    <td className="px-4 py-0.5 justify-center flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(p)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProjectId ? 'Edit Project' : 'Add Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProjectId ? 'Update the project details' : 'Create a new project'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div>
              <Label>Name</Label>
              <Input
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Client</Label>
              <Input
                value={newProject.client}
                onChange={(e) =>
                  setNewProject({ ...newProject, client: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={newProject.startDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={newProject.endDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Budget</Label>
              <Input
                type="number"
                value={newProject.budget}
                onChange={(e) =>
                  setNewProject({ ...newProject, budget: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newProject.status}
                onValueChange={(v) => setNewProject({ ...newProject, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => 
             {
              setEditingProjectId(null)
             setIsModalOpen(false)
             }
             }>
              Cancel
            </Button>
            <Button className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold" onClick={handleSaveProject}>
              {editingProjectId ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
