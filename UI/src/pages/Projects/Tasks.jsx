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

const Tasks = () => {
const [tasks, setTasks] = useState([
  {
    id: 1,
    name: 'Design Homepage',
    project: 'E-commerce Website',
    assignedTo: 'John Doe',
    startDate: '2024-07-05',
    endDate: '2024-07-20',
    dueDate: '2024-07-20',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'API Integration',
    project: 'Mobile App Development',
    assignedTo: 'Jane Smith',
    startDate: '2024-08-12',
    endDate: '2024-09-01',
    dueDate: '2024-09-01',
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Set Up Database',
    project: 'CRM System Upgrade',
    assignedTo: 'Alice Rahman',
    startDate: '2024-09-10',
    endDate: '2024-09-25',
    dueDate: '2024-09-25',
    status: 'In Progress',
  },
  {
    id: 4,
    name: 'Inventory API',
    project: 'Inventory Management',
    assignedTo: 'Mark Lee',
    startDate: '2024-10-02',
    endDate: '2024-10-18',
    dueDate: '2024-10-18',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'UI/UX Testing',
    project: 'Website Redesign',
    assignedTo: 'Sophia Khan',
    startDate: '2024-06-20',
    endDate: '2024-07-05',
    dueDate: '2024-07-05',
    status: 'Completed',
  },
  {
    id: 6,
    name: 'Chatbot Training',
    project: 'AI Chatbot',
    assignedTo: 'David Chowdhury',
    startDate: '2024-11-05',
    endDate: '2024-12-01',
    dueDate: '2024-12-01',
    status: 'Planning',
  },
  {
    id: 7,
    name: 'Data Pipeline Setup',
    project: 'Data Analytics Platform',
    assignedTo: 'Nadia Islam',
    startDate: '2024-07-25',
    endDate: '2024-08-15',
    dueDate: '2024-08-15',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Server Migration',
    project: 'Cloud Migration',
    assignedTo: 'Rahim Uddin',
    startDate: '2024-09-01',
    endDate: '2024-09-20',
    dueDate: '2024-09-20',
    status: 'On Hold',
  },
  {
    id: 9,
    name: 'SEO Optimization',
    project: 'Digital Marketing Campaign',
    assignedTo: 'Lina Das',
    startDate: '2024-09-12',
    endDate: '2024-09-30',
    dueDate: '2024-09-30',
    status: 'Pending',
  },
]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [newTask, setNewTask] = useState({
    name: '',
    project: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        searchTerm === '' ||
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        t.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const handleSaveTask = () => {
    if (!newTask.name || !newTask.project) return;

    if (editingTaskId) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId
            ? { ...t, ...newTask, dueDate: newTask.endDate }
            : t
        )
      );
    } else {
      // Add new task
      const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      setTasks((prev) => [
        ...prev,
        { id: newId, ...newTask, dueDate: newTask.endDate },
      ]);
    }

    setIsModalOpen(false);
    setEditingTaskId(null);
    setNewTask({
      name: '',
      project: '',
      assignedTo: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
    });
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setNewTask({ ...task });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold uppercase">Tasks</h2>
        </div>
        <Button onClick={() => {
          setNewTask({
      name: '',
      project: '',
      assignedTo: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
    });
          setIsModalOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className='relative'>
           <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
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
                  <th className="px-4 py-2 text-left">Task</th>
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Assigned To</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="px-4 py-0.5">{t.id}</td>
                    <td className="px-4 py-0.5 font-medium">{t.name}</td>
                    <td className="px-4 py-0.5">{t.project}</td>
                    <td className="px-4 py-0.5">{t.assignedTo}</td>
                    <td className="px-4 py-0.5">{t.dueDate}</td>
                    <td className="px-4 py-0.5">{t.status}</td>
                    <td className="px-4 py-0.5 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(t)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(t.id)}
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

      {/* Add/Edit Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTaskId ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogDescription>
              {editingTaskId ? 'Update the task details' : 'Create a new task under a project'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div>
              <Label>Task Name</Label>
              <Input
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Project</Label>
              <Input
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({ ...newTask, project: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Assigned To</Label>
              <Input
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={newTask.startDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={newTask.endDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newTask.status}
                onValueChange={(v) => setNewTask({ ...newTask, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => 
            {
             setEditingTaskId(null)
             setIsModalOpen(false)
            }
            }>
              Cancel
            </Button>
            <Button className="bg-[#2eb4f7] hover:bg-[#2eb4f7] text-primary font-semibold" onClick={handleSaveTask}>
              {editingTaskId ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
