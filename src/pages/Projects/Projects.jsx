import React, { useState, useMemo } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

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
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

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

  const handleAddProject = () => {
    if (!newProject.name || !newProject.client) return;
    const newId = projects.length + 1;
    setProjects((prev) => [
      ...prev,
      { id: newId, ...newProject, budget: parseFloat(newProject.budget) || 0 },
    ]);
    setIsAddProjectModalOpen(false);
    setNewProject({
      name: '',
      client: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'Planning',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Button onClick={() => setIsAddProjectModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Projects</CardTitle>
          <CardDescription>Filter by name, client or status</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Search</Label>
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label>Status</Label>
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
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Start - End</th>
                  <th className="px-4 py-2 text-left">Budget</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2">{p.client}</td>
                    <td className="px-4 py-2">{p.status}</td>
                    <td className="px-4 py-2">
                      {p.startDate} → {p.endDate}
                    </td>
                    <td className="px-4 py-2">${p.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Project Modal */}
      <Dialog open={isAddProjectModalOpen} onOpenChange={setIsAddProjectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Create a new project</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
            </div>
            <div>
              <Label>Client</Label>
              <Input value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="date" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} />
            </div>
            <div>
              <Label>Budget</Label>
              <Input type="number" value={newProject.budget} onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={newProject.status} onValueChange={(v) => setNewProject({ ...newProject, status: v })}>
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
            <Button variant="outline" onClick={() => setIsAddProjectModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProject}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;