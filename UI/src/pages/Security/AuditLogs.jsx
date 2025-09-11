import React, { useState } from 'react';
import { Calendar, User, Activity, MapPin, Search, Filter, Download, Eye, Clock, Shield, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuditLogs = () => {
  // Sample audit logs data
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      date: '2024-09-09 14:30:15',
      user: 'John Smith',
      userId: 'user_001',
      action: 'Login',
      actionType: 'authentication',
      description: 'User successfully logged into the system',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 2,
      date: '2024-09-09 14:25:42',
      user: 'Sarah Johnson',
      userId: 'user_002',
      action: 'Create User',
      actionType: 'user_management',
      description: 'Created new user account for Mike Wilson',
      ipAddress: '10.0.1.25',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      status: 'success'
    },
    {
      id: 3,
      date: '2024-09-09 14:20:18',
      user: 'Admin User',
      userId: 'admin_001',
      action: 'Update Role',
      actionType: 'role_management',
      description: 'Modified permissions for Manager role',
      ipAddress: '172.16.0.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 4,
      date: '2024-09-09 14:15:30',
      user: 'Jane Doe',
      userId: 'user_003',
      action: 'Failed Login',
      actionType: 'authentication',
      description: 'Failed login attempt - Invalid credentials',
      ipAddress: '203.0.113.50',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
      status: 'failed'
    },
    {
      id: 5,
      date: '2024-09-09 14:10:05',
      user: 'System',
      userId: 'system',
      action: 'Password Reset',
      actionType: 'security',
      description: 'Password reset email sent to user@example.com',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      status: 'success'
    },
    {
      id: 6,
      date: '2024-09-09 14:05:22',
      user: 'Mike Wilson',
      userId: 'user_004',
      action: 'Delete Report',
      actionType: 'data_management',
      description: 'Deleted monthly sales report for August 2024',
      ipAddress: '192.168.1.150',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      status: 'warning'
    },
    {
      id: 7,
      date: '2024-09-09 13:58:45',
      user: 'Emma Davis',
      userId: 'user_005',
      action: 'Export Data',
      actionType: 'data_management',
      description: 'Exported user database to CSV format',
      ipAddress: '10.0.2.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 8,
      date: '2024-09-09 13:52:10',
      user: 'Unknown',
      userId: null,
      action: 'Unauthorized Access',
      actionType: 'security',
      description: 'Attempted access to admin panel without proper authentication',
      ipAddress: '198.51.100.25',
      userAgent: 'curl/7.68.0',
      status: 'blocked'
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionTypeFilter, setActionTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Modal state
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get action type icon and color
  const getActionTypeInfo = (actionType) => {
    const types = {
      authentication: { icon: Shield, color: 'blue', bg: 'bg-blue-100', text: 'text-blue-800' },
      user_management: { icon: User, color: 'green', bg: 'bg-green-100', text: 'text-green-800' },
      role_management: { icon: Shield, color: 'purple', bg: 'bg-purple-100', text: 'text-purple-800' },
      security: { icon: AlertCircle, color: 'orange', bg: 'bg-orange-100', text: 'text-orange-800' },
      data_management: { icon: Activity, color: 'indigo', bg: 'bg-indigo-100', text: 'text-indigo-800' }
    };
    return types[actionType] || { icon: Activity, color: 'gray', bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    const statuses = {
      success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      failed: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
      warning: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      blocked: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' }
    };
    return statuses[status] || { icon: CheckCircle, color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesActionType = actionTypeFilter === 'all' || log.actionType === actionTypeFilter;
    
    return matchesSearch && matchesStatus && matchesActionType;
  });

  // Get stats
  const totalLogs = auditLogs.length;
  const failedAttempts = auditLogs.filter(log => log.status === 'failed').length;
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))].length;
  const todaysLogs = auditLogs.filter(log => log.date.startsWith('2024-09-09')).length;

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  // Handle view details
  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
              <p className="text-gray-600 mt-2">Monitor system activities and user actions</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
              <Button variant="outline" className="inline-flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{totalLogs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
                <p className="text-2xl font-bold text-gray-900">{failedAttempts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Activity</p>
                <p className="text-2xl font-bold text-gray-900">{todaysLogs}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none "
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
              <option value="blocked">Blocked</option>
            </select>

            {/* Action Type Filter */}
            <select
              value={actionTypeFilter}
              onChange={(e) => setActionTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
            >
              <option value="all">All Actions</option>
              <option value="authentication">Authentication</option>
              <option value="user_management">User Management</option>
              <option value="role_management">Role Management</option>
              <option value="security">Security</option>
              <option value="data_management">Data Management</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Activity Log</h2>
              <span className="text-sm text-gray-500">
                Showing {filteredLogs.length} of {totalLogs} entries
              </span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => {
                    const actionInfo = getActionTypeInfo(log.actionType);
                    const statusInfo = getStatusInfo(log.status);
                    const ActionIcon = actionInfo.icon;
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {formatDate(log.date)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {getRelativeTime(log.date)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{log.user}</div>
                              {log.userId && (
                                <div className="text-xs text-gray-500 font-mono">ID: {log.userId}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded ${actionInfo.bg}`}>
                              <ActionIcon className={`h-4 w-4 ${actionInfo.text.replace('text-', 'text-').replace('-800', '-600')}`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{log.action}</div>
                              <div className="text-xs text-gray-500 max-w-xs">{log.description}</div>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${actionInfo.bg} ${actionInfo.text}`}>
                                {log.actionType.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm font-mono text-gray-900">{log.ipAddress}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <StatusIcon className={`h-4 w-4 mr-2 ${statusInfo.color}`} />
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusInfo.bg} ${statusInfo.color}`}>
                              {log.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                            title="View Details"
                            onClick={() => handleViewDetails(log)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredLogs.map((log) => {
              const actionInfo = getActionTypeInfo(log.actionType);
              const statusInfo = getStatusInfo(log.status);
              const ActionIcon = actionInfo.icon;
              const StatusIcon = statusInfo.icon;

              return (
                <div key={log.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${actionInfo.bg}`}>
                        <ActionIcon className={`h-4 w-4 ${actionInfo.text.replace('text-', 'text-').replace('-800', '-600')}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{log.action}</h3>
                        <p className="text-xs text-gray-500">{log.user}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <StatusIcon className={`h-4 w-4 mr-1 ${statusInfo.color}`} />
                        <span className={`text-xs font-medium capitalize ${statusInfo.color}`}>
                          {log.status}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handleViewDetails(log)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{log.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(log.date)}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {log.ipAddress}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${actionInfo.bg} ${actionInfo.text}`}>
                      {log.actionType.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No audit logs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || actionTypeFilter !== 'all' 
                  ? 'Try adjusting your search or filters.' 
                  : 'System activities will appear here.'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {/* {filteredLogs.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, filteredLogs.length)}</span> of{' '}
                  <span className="font-medium">{filteredLogs.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <Button variant="outline" className="rounded-l-md">Previous</Button>
                  <Button variant="outline" className="bg-blue-50 border-blue-500 text-blue-600">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline" className="rounded-r-md">Next</Button>
                </nav>
              </div>
            </div>
          </div>
        )} */}
        
        {/* Details Modal */}
        {isModalOpen && selectedLog && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={closeModal}>
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="mt-3">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Audit Log Details</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(selectedLog.date)}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                        <div className="flex items-center text-sm text-gray-900">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedLog.user}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                        <div className="text-sm text-gray-900 font-mono">
                          {selectedLog.userId || 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                        <div className="text-sm font-medium text-gray-900">
                          {selectedLog.action}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                        <div className="flex items-center">
                          {(() => {
                            const actionInfo = getActionTypeInfo(selectedLog.actionType);
                            const ActionIcon = actionInfo.icon;
                            return (
                              <>
                                <div className={`p-1 rounded mr-2 ${actionInfo.bg}`}>
                                  <ActionIcon className={`h-3 w-3 ${actionInfo.text.replace('text-', 'text-').replace('-800', '-600')}`} />
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${actionInfo.bg} ${actionInfo.text}`}>
                                  {selectedLog.actionType.replace('_', ' ')}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <div className="flex items-center">
                          {(() => {
                            const statusInfo = getStatusInfo(selectedLog.status);
                            const StatusIcon = statusInfo.icon;
                            return (
                              <>
                                <StatusIcon className={`h-4 w-4 mr-2 ${statusInfo.color}`} />
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusInfo.bg} ${statusInfo.color}`}>
                                  {selectedLog.status}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {selectedLog.description}
                    </div>
                  </div>
                  
                  {/* Technical Details */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Technical Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                            {selectedLog.ipAddress}
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Log ID</label>
                        <div className="text-sm text-gray-900 font-mono">
                          #{selectedLog.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">User Agent</label>
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md font-mono break-all">
                        {selectedLog.userAgent}
                      </div>
                    </div>
                  </div>
                  
                  {/* Time Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Logged {getRelativeTime(selectedLog.date)}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t">
                  <Button variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;