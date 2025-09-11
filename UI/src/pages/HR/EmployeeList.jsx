import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, Upload, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      department: "Engineering",
      designation: "Software Engineer",
      joiningDate: "2023-01-15",
      salary: "$75,000",
      status: "Active",
      cv: ""
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      name: "Mike Davis",
      email: "mike.davis@company.com",
      phone: "+1 (555) 234-5678",
      department: "Management",
      designation: "Project Manager",
      joiningDate: "2022-11-08",
      salary: "$80,000",
      status: "Active",
      cv: ""
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      name: "Emily Wilson",
      email: "emily.wilson@company.com",
      phone: "+1 (555) 345-6789",
      department: "Marketing",
      designation: "Marketing Specialist",
      joiningDate: "2023-06-12",
      salary: "$55,000",
      status: "Active",
      cv: ""
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      name: "David Brown",
      email: "david.brown@company.com",
      phone: "+1 (555) 456-7890",
      department: "Engineering",
      designation: "DevOps Engineer",
      joiningDate: "2023-02-28",
      salary: "$85,000",
      status: "Inactive",
      cv: ""
    }
  ]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: '',
    salary: '',
    status: 'Active',
    image: '',
    cv: ''
  });

  const handleImageUpload = (file, isEdit = false) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEdit && selectedEmployee) {
          setSelectedEmployee({...selectedEmployee, image: e.target.result});
        } else {
          setNewEmployee({...newEmployee, image: e.target.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (file, isEdit = false) => {
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const cvData = {
          name: file.name,
          data: e.target.result,
          size: file.size
        };
        if (isEdit && selectedEmployee) {
          setSelectedEmployee({...selectedEmployee, cv: cvData});
        } else {
          setNewEmployee({...newEmployee, cv: cvData});
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleCVDownload = (cvData) => {
    if (cvData && cvData.data) {
      const link = document.createElement('a');
      link.href = cvData.data;
      link.download = cvData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department && newEmployee.designation && newEmployee.joiningDate && newEmployee.salary) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        image: newEmployee.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', email: '', phone: '', department: '', designation: '', joiningDate: '', salary: '', status: 'Active', image: '', cv: '' });
      setShowAddForm(false);
    }
  };

  const handleEditEmployee = () => {
    if (selectedEmployee && selectedEmployee.name && selectedEmployee.email && selectedEmployee.phone && selectedEmployee.department && selectedEmployee.designation && selectedEmployee.joiningDate && selectedEmployee.salary) {
      setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? selectedEmployee : emp));
      setShowEditForm(false);
      setSelectedEmployee(null);
    }
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee({...employee});
    setShowEditForm(true);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === 'Active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const CVUploadSection = ({ currentCV, onCVUpload, label = "Upload CV" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {currentCV && (
          <div 
            className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => handleCVDownload(currentCV)}
          >
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">{currentCV.name}</p>
              <p className="text-xs text-blue-600">{(currentCV.size / 1024).toFixed(1)} KB • Click to download</p>
            </div>
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => onCVUpload(e.target.files[0])}
            className="hidden"
            id="cv-upload"
          />
          <label
            htmlFor="cv-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose CV (PDF)
          </label>
          <p className="text-xs text-gray-500 mt-1">PDF files only, up to 5MB</p>
        </div>
      </div>
    </div>
  );

  const ImageUploadSection = ({ currentImage, onImageUpload, label = "Employee Photo" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {currentImage && (
          <div className="relative">
            <img
              src={currentImage}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageUpload(e.target.files[0])}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Photo
          </label>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 5MB</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees</h1>
              <p className="text-gray-600">Manage your employee records and information</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Employee
            </button>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Search & Filter Employees</h2>
          <p className="text-gray-600 text-sm mb-4">Search by employee name, department or designation</p>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Employee List</h2>
            <p className="text-gray-600 text-sm">View and manage your employee records</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-1 whitespace-nowrap">
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{employee.id}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.designation}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <span className={getStatusBadge(employee.status)}>{employee.status}</span>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewEmployee(employee)}
                          className="p-2 border rounded-md hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-green-600" />
                        </button>

                        <button
                          onClick={() => handleEditClick(employee)}
                          className="p-2 border rounded-md hover:bg-gray-100"
                          title="Edit Employee"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="p-2 border rounded-md hover:bg-gray-100"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{employee.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Employee Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ImageUploadSection 
                  currentImage={newEmployee.image}
                  onImageUpload={(file) => handleImageUpload(file, false)}
                />

                <CVUploadSection 
                  currentCV={newEmployee.cv}
                  onCVUpload={(file) => handleCVUpload(file, false)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.joiningDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joiningDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                    placeholder="e.g., $75,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newEmployee.status}
                    onChange={(e) => setNewEmployee({...newEmployee, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddEmployee}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Add Employee
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Modal */}
        {showEditForm && selectedEmployee && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Employee</h3>
                <button 
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ImageUploadSection 
                  currentImage={selectedEmployee.image}
                  onImageUpload={(file) => handleImageUpload(file, true)}
                />

                <CVUploadSection 
                  currentCV={selectedEmployee.cv}
                  onCVUpload={(file) => handleCVUpload(file, true)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.name}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.email}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.phone}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.department}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.designation}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, designation: e.target.value})}
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.joiningDate}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, joiningDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.salary}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, salary: e.target.value})}
                    placeholder="e.g., $75,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedEmployee.status}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditEmployee}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Employee Modal */}
        {showViewModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Employee Details</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <img
                  src={selectedEmployee.image}
                  alt={selectedEmployee.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200"
                />
                <h4 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h4>
                <p className="text-gray-600">{selectedEmployee.designation}</p>
                <span className={`inline-block mt-2 ${getStatusBadge(selectedEmployee.status)}`}>
                  {selectedEmployee.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                  <span className="text-sm text-gray-900">#{selectedEmployee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Phone:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Department:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Joining Date:</span>
                  <span className="text-sm text-gray-900">{formatDate(selectedEmployee.joiningDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Salary:</span>
                  <span className="text-sm text-gray-900 font-medium">{selectedEmployee.salary}</span>
                </div>
                {selectedEmployee.cv && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">CV:</span>
                    <button
                      onClick={() => handleCVDownload(selectedEmployee.cv)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>📄 {selectedEmployee.cv.name}</span>
                      <span className="text-xs">(Download)</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && employeeToDelete && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Employee</h3>
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete "{employeeToDelete.name}"? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employeeToDelete.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;