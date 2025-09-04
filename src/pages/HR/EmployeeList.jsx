import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, Upload, X } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      name: "John Smith",
      position: "Software Engineer",
      joinDate: "2023-01-15",
      salary: "$75,000"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      name: "Mike Davis",
      position: "Project Manager",
      joinDate: "2022-11-08",
      salary: "$80,000"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      name: "Emily Wilson",
      position: "Marketing Specialist",
      joinDate: "2023-06-12",
      salary: "$55,000"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      name: "David Brown",
      position: "DevOps Engineer",
      joinDate: "2023-02-28",
      salary: "$85,000"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    joinDate: '',
    salary: '',
    image: ''
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

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.joinDate && newEmployee.salary) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        image: newEmployee.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', position: '', joinDate: '', salary: '', image: '' });
      setShowAddForm(false);
    }
  };

  const handleEditEmployee = () => {
    if (selectedEmployee && selectedEmployee.name && selectedEmployee.position && selectedEmployee.joinDate && selectedEmployee.salary) {
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
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

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
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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
    <div className="min-h-screen bg-gray-50 p-6">
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
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Employee
            </button>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Search & Filter Employees</h2>
          <p className="text-gray-600 text-sm mb-4">Search by employee name or position</p>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Employee List</h2>
            <p className="text-gray-600 text-sm">View and manage your employee records</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
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
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(employee.joinDate)}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.salary}</div>
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewEmployee(employee)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(employee)}
                          className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                          title="Edit Employee"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <ImageUploadSection 
                  currentImage={newEmployee.image}
                  onImageUpload={(file) => handleImageUpload(file, false)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    placeholder="Enter position"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                    placeholder="e.g., $75,000"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddEmployee}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add Employee
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Employee</h3>
                <button 
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <ImageUploadSection 
                  currentImage={selectedEmployee.image}
                  onImageUpload={(file) => handleImageUpload(file, true)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedEmployee.name}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedEmployee.position}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, position: e.target.value})}
                    placeholder="Enter position"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedEmployee.joinDate}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, joinDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedEmployee.salary}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, salary: e.target.value})}
                    placeholder="e.g., $75,000"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditEmployee}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
                <p className="text-gray-600">{selectedEmployee.position}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                  <span className="text-sm text-gray-900">#{selectedEmployee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Join Date:</span>
                  <span className="text-sm text-gray-900">{formatDate(selectedEmployee.joinDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Salary:</span>
                  <span className="text-sm text-gray-900 font-medium">{selectedEmployee.salary}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
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