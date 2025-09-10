import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Filter, Edit, Trash2, Eye, X, Check, Clock, AlertCircle } from 'lucide-react';

const LeaveManagement = () => {
  const [selectedView, setSelectedView] = useState('list'); // 'list', 'form'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLeaveType, setFilterLeaveType] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingLeave, setViewingLeave] = useState(null);
  const [editingLeave, setEditingLeave] = useState(null);

  // Sample employees
  const employees = [
    { id: 1, name: 'Ahmed Karim', employeeId: 'EMP001', department: 'IT Department' },
    { id: 2, name: 'Fatima Khan', employeeId: 'EMP002', department: 'HR Department' },
    { id: 3, name: 'Mohammad Rahim', employeeId: 'EMP003', department: 'Accounts' },
    { id: 4, name: 'Ayesha Begum', employeeId: 'EMP004', department: 'Marketing' },
    { id: 5, name: 'Rashidul Islam', employeeId: 'EMP005', department: 'Sales' },
    { id: 6, name: 'Salma Akter', employeeId: 'EMP006', department: 'Operations' },
  ];

  // Leave types
  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Emergency Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Casual Leave',
    'Study Leave'
  ];

  // Form state
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending'
  });

  // Leave applications state
  const [leaveApplications, setLeaveApplications] = useState([]);

  // Generate sample leave applications
  useEffect(() => {
    const sampleLeaves = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Ahmed Karim',
        empId: 'EMP001',
        leaveType: 'Annual Leave',
        startDate: '2024-09-15',
        endDate: '2024-09-20',
        reason: 'Family vacation',
        status: 'Approved',
        appliedDate: '2024-09-05',
        approvedBy: 'HR Manager',
        days: 6
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Fatima Khan',
        empId: 'EMP002',
        leaveType: 'Sick Leave',
        startDate: '2024-09-10',
        endDate: '2024-09-12',
        reason: 'Medical treatment',
        status: 'Pending',
        appliedDate: '2024-09-08',
        approvedBy: '',
        days: 3
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Mohammad Rahim',
        empId: 'EMP003',
        leaveType: 'Emergency Leave',
        startDate: '2024-09-08',
        endDate: '2024-09-09',
        reason: 'Family emergency',
        status: 'Rejected',
        appliedDate: '2024-09-07',
        approvedBy: 'Department Head',
        days: 2
      },
      {
        id: 4,
        employeeId: 4,
        employeeName: 'Ayesha Begum',
        empId: 'EMP004',
        leaveType: 'Casual Leave',
        startDate: '2024-09-25',
        endDate: '2024-09-25',
        reason: 'Personal work',
        status: 'Approved',
        appliedDate: '2024-09-20',
        approvedBy: 'Team Lead',
        days: 1
      }
    ];
    setLeaveApplications(sampleLeaves);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const employee = employees.find(emp => emp.id === parseInt(formData.employeeId));
    if (!employee) return;

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      id: leaveApplications.length + 1,
      employeeId: employee.id,
      employeeName: employee.name,
      empId: employee.employeeId,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: formData.status,
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: formData.status === 'Approved' ? 'System' : '',
      days: days
    };

    if (editingLeave) {
      // Update existing leave
      setLeaveApplications(prev => 
        prev.map(leave => leave.id === editingLeave.id ? { ...newLeave, id: editingLeave.id } : leave)
      );
      setEditingLeave(null);
    } else {
      // Add new leave
      setLeaveApplications(prev => [...prev, newLeave]);
    }

    // Reset form
    setFormData({
      employeeId: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'Pending'
    });

    setSelectedView('list');
  };

  const handleEdit = (leave) => {
    setEditingLeave(leave);
    setFormData({
      employeeId: leave.employeeId.toString(),
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    });
    setSelectedView('form');
  };

  const handleDelete = (leaveId) => {
    if (window.confirm('Are you sure you want to delete this leave application?')) {
      setLeaveApplications(prev => prev.filter(leave => leave.id !== leaveId));
    }
  };

  const handleStatusUpdate = (leaveId, newStatus) => {
    setLeaveApplications(prev =>
      prev.map(leave => 
        leave.id === leaveId 
          ? { ...leave, status: newStatus, approvedBy: newStatus === 'Approved' ? 'System' : '' }
          : leave
      )
    );
  };

  const filteredLeaves = leaveApplications.filter(leave => {
    const matchesSearch = leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || leave.status === filterStatus;
    const matchesLeaveType = filterLeaveType === 'all' || leave.leaveType === filterLeaveType;
    
    return matchesSearch && matchesStatus && matchesLeaveType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <Check size={12} />;
      case 'Rejected': return <X size={12} />;
      case 'Pending': return <Clock size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
                <p className="text-gray-600">Manage employee leave applications and approvals</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedView('list');
                    setEditingLeave(null);
                    setFormData({
                      employeeId: '',
                      leaveType: '',
                      startDate: '',
                      endDate: '',
                      reason: '',
                      status: 'Pending'
                    });
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedView === 'list' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  View Applications
                </button>
                <button
                  onClick={() => {
                    setSelectedView('form');
                    setEditingLeave(null);
                    setFormData({
                      employeeId: '',
                      leaveType: '',
                      startDate: '',
                      endDate: '',
                      reason: '',
                      status: 'Pending'
                    });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                    selectedView === 'form' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Plus size={16} />
                  New Application
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leaveApplications.length}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {leaveApplications.filter(leave => leave.status === 'Approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {leaveApplications.filter(leave => leave.status === 'Pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {leaveApplications.filter(leave => leave.status === 'Rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        {selectedView === 'list' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Leave Applications</h2>
                  <p className="text-gray-600 text-sm">Manage and review employee leave requests</p>
                </div>
                <div className="flex gap-4 py-2">
                  <div className="flex relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm "
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm "
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select
                    value={filterLeaveType}
                    onChange={(e) => setFilterLeaveType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm "
                  >
                    <option value="all">All Types</option>
                    {leaveTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                          <div className="text-sm text-gray-500">{leave.empId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {leave.days}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                          {getStatusIcon(leave.status)}
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setViewingLeave(leave);
                              setShowViewModal(true);
                            }}
                            className="p-2 border rounded-md hover:bg-gray-100 text-green-600"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(leave)}
                            className="p-2 border rounded-md hover:bg-gray-100 text-blue-600"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(leave.id)}
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                          {leave.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(leave.id, 'Approved')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
              Showing {filteredLeaves.length} of {leaveApplications.length} applications
            </div>
          </div>
        )}

        {selectedView === 'form' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingLeave ? 'Edit Leave Application' : 'New Leave Application'}
              </h2>
              <p className="text-gray-600 text-sm">
                {editingLeave ? 'Update leave application details' : 'Fill in the details for leave application'}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md "
                  >
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} ({employee.employeeId})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md "
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md "
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                    min={formData.startDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md "
                  />
                </div>

                {/* Approval Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md "
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Days Calculation Display */}
                {formData.startDate && formData.endDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Days
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                      {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                    </div>
                  </div>
                )}
              </div>

              {/* Reason */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                  rows={4}
                  placeholder="Please provide the reason for leave..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md "
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedView('list')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingLeave ? 'Update Application' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View Leave Modal */}
        {showViewModal && viewingLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Leave Application Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
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

export default LeaveManagement;