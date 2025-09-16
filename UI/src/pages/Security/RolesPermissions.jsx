import React, { useState } from 'react';
import { Edit, Plus, Trash2, Save, X, Users, Shield, FileText, Settings, CreditCard, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const RolesPermissions = () => {
  // Sample roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      permissions: ['users', 'roles', 'reports', 'settings', 'billing', 'analytics', 'notifications']
    },
    {
      id: 2,
      name: 'Manager',
      permissions: ['users', 'reports', 'settings', 'analytics']
    },
    {
      id: 3,
      name: 'Employee',
      permissions: ['reports', 'notifications']
    },
    {
      id: 4,
      name: 'Viewer',
      permissions: ['reports']
    }
  ]);

  // Available modules/permissions
  const availableModules = [
    { id: 'users', name: 'User Management', icon: Users, description: 'Create, edit, and manage user accounts' },
    { id: 'roles', name: 'Role Management', icon: Shield, description: 'Manage roles and permissions' },
    { id: 'reports', name: 'Reports', icon: FileText, description: 'View and generate reports' },
    { id: 'settings', name: 'System Settings', icon: Settings, description: 'Configure system settings' },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard, description: 'Manage billing and payment information' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, description: 'Access analytics and insights' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Manage notification settings' }
  ];

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    permissions: []
  });

  // Loading and validation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle adding new role
  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({ name: '', permissions: [] });
    setErrors({});
    setShowForm(true);
  };

  // Handle editing existing role
  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      permissions: [...role.permissions]
    });
    setErrors({});
    setShowForm(true);
  };

  // Handle deleting role
  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Role name must be at least 2 characters';
    } else if (roles.some(role => 
      role.name.toLowerCase() === formData.name.trim().toLowerCase() && 
      role.id !== editingRole?.id
    )) {
      newErrors.name = 'Role name already exists';
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: formData.name.trim(), permissions: formData.permissions }
          : role
      ));
    } else {
      // Add new role
      const newRole = {
        id: Math.max(...roles.map(r => r.id), 0) + 1,
        name: formData.name.trim(),
        permissions: formData.permissions
      };
      setRoles([...roles, newRole]);
    }

    setIsSubmitting(false);
    handleCancel();
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', permissions: [] });
    setEditingRole(null);
    setErrors({});
    setIsSubmitting(false);
  };

  // Handle permission checkbox change
  const handlePermissionChange = (moduleId, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, moduleId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== moduleId)
      }));
    }
    
    // Clear permission error if user selects at least one
    if (errors.permissions && (checked || formData.permissions.length > 1)) {
      setErrors(prev => ({ ...prev, permissions: undefined }));
    }
  };

  // Get module information by ID
  const getModuleInfo = (moduleId) => {
    return availableModules.find(m => m.id === moduleId);
  };

  // Handle select all permissions
  const handleSelectAllPermissions = () => {
    const allModuleIds = availableModules.map(m => m.id);
    setFormData(prev => ({ ...prev, permissions: allModuleIds }));
    setErrors(prev => ({ ...prev, permissions: undefined }));
  };

  // Handle clear all permissions
  const handleClearAllPermissions = () => {
    setFormData(prev => ({ ...prev, permissions: [] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto ">
        {/* Header */}
        <div className="mb-[12px]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold tracking-tight uppercase">Roles & Permissions</h1>
              {/* <p className="text-gray-600 mt-2">Manage user roles and their access permissions</p> */}
            </div>
            <button
              onClick={handleAddRole}
              className="bg-black text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-[12px] hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Role
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3 h-[max-content]">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Modules</p>
                <p className="text-2xl font-bold text-gray-900">{availableModules.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Most Privileged</p>
                <p className="text-lg font-bold text-gray-900">
                  {roles.reduce((max, role) => role.permissions.length > max.permissions.length ? role : max, roles[0])?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Table */}
      <Card>
         <CardContent>
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">
                      Role ID
                    </th>
                    <th className="px-4 py-2 text-left">
                      Role Name
                    </th>
                    <th className="px-4 py-2 text-left">
                      Assigned Permissions
                    </th>
                    <th className="px-4 py-2 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-4 py-[2px] whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          #{role.id.toString().padStart(3, '0')}
                        </span>
                      </td>
                      <td className="px-4 py-[2px] whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{role.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-[2px]">
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission) => {
                            const moduleInfo = getModuleInfo(permission);
                            const IconComponent = moduleInfo?.icon || Settings;
                            return (
                              <span
                                key={permission}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                                title={moduleInfo?.description}
                              >
                                <IconComponent className="w-3 h-3 mr-1" />
                                {moduleInfo?.name || permission}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-[2px] whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{role.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteRole(role.id)}
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

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {roles.map((role) => (
              <div key={role.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                      <p className="text-xs text-gray-500">ID: #{role.id.toString().padStart(3, '0')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => handleEditRole(role)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{role.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteRole(role.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => {
                    const moduleInfo = getModuleInfo(permission);
                    const IconComponent = moduleInfo?.icon || Settings;
                    return (
                      <span
                        key={permission}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {moduleInfo?.name || permission}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {roles.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new role.</p>
              <div className="mt-6">
                <button
                  onClick={handleAddRole}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </button>
              </div>
            </div>
          )}
          </div>
        </CardContent>
      </Card>
        

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto border w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-lg rounded-md bg-white max-w-md">
              {/* Modal Header */}
              <div className="bg-gray-50 border-b p-6 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingRole ? 'Edit Role' : 'Add New Role'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                {/* Role Name Field */}
                <div className="mb-6">
                  <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    id="roleName"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) {
                        setErrors(prev => ({ ...prev, name: undefined }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter role name (e.g., Manager, Admin, Editor)"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Permissions Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Module Access Permissions *
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={handleSelectAllPermissions}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                        disabled={isSubmitting}
                      >
                        Select All
                      </button>
                      <span className="text-xs text-gray-400">|</span>
                      <button
                        type="button"
                        onClick={handleClearAllPermissions}
                        className="text-xs text-red-600 hover:text-red-800 underline"
                        disabled={isSubmitting}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className={`border rounded-md p-4 max-h-80 overflow-y-auto ${
                    errors.permissions ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="grid grid-cols-1 gap-4">
                      {availableModules.map((module) => {
                        const IconComponent = module.icon;
                        const isChecked = formData.permissions.includes(module.id);
                        
                        return (
                          <div key={module.id} className="relative">
                            <label className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => handlePermissionChange(module.id, e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                disabled={isSubmitting}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <IconComponent className="w-5 h-5 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-900">
                                    {module.name}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {module.description}
                                </p>
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {errors.permissions && (
                    <p className="mt-2 text-sm text-red-600">{errors.permissions}</p>
                  )}

                  <div className="mt-3 text-xs text-gray-500">
                    Selected: {formData.permissions.length} of {availableModules.length} modules
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingRole ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingRole ? 'Update Role' : 'Create Role'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPermissions;