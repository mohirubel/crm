import React, { useState } from 'react';
import { Users, DollarSign, Clock, AlertCircle, CheckCircle, XCircle, Calendar } from 'lucide-react';

const HRReports = () => {
  const [employees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Software Engineer',
      department: 'Engineering',
      email: 'sarah.j@company.com',
      salary: 75000,
      status: 'Active',
      attendanceRate: 95,
      lastPayroll: '2024-08-31',
      workingDays: 22,
      presentDays: 21,
      absentDays: 1,
      leaveDays: 0
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      department: 'Product',
      email: 'michael.c@company.com',
      salary: 85000,
      status: 'Active',
      attendanceRate: 88,
      lastPayroll: '2024-08-31',
      workingDays: 22,
      presentDays: 19,
      absentDays: 2,
      leaveDays: 1
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      department: 'Design',
      email: 'emily.r@company.com',
      salary: 68000,
      status: 'On Leave',
      attendanceRate: 78,
      lastPayroll: '2024-08-31',
      workingDays: 22,
      presentDays: 17,
      absentDays: 1,
      leaveDays: 4
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'Sales Manager',
      department: 'Sales',
      email: 'david.k@company.com',
      salary: 72000,
      status: 'Active',
      attendanceRate: 92,
      lastPayroll: '2024-08-31',
      workingDays: 22,
      presentDays: 20,
      absentDays: 2,
      leaveDays: 0
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'HR Specialist',
      department: 'Human Resources',
      email: 'lisa.t@company.com',
      salary: 65000,
      status: 'Active',
      attendanceRate: 98,
      lastPayroll: '2024-08-31',
      workingDays: 22,
      presentDays: 22,
      absentDays: 0,
      leaveDays: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState('employee-list');

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageAttendance = employees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const employeesOnLeave = employees.filter(emp => emp.status === 'On Leave').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />;
      case 'On Leave':
        return <Clock className="w-4 h-4" />;
      case 'Inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAttendanceColor = (rate) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Reports</h1>
          <p className="text-gray-600">Manage employees, payroll, and attendance tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalSalary / 12)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-orange-600">{averageAttendance.toFixed(1)}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('employee-list')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'employee-list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Employee List
              </button>
              <button
                onClick={() => setActiveTab('payroll')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payroll'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payroll Summary
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'attendance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Attendance Summary
              </button>
            </nav>
          </div>

          {/* Employee List */}
          {activeTab === 'employee-list' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Employee Directory</h2>
              </div>
              <p className="text-gray-600 mb-6">Complete list of all employees</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{employee.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                            {getStatusIcon(employee.status)}
                            {employee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payroll Summary */}
          {activeTab === 'payroll' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">Payroll Summary</h2>
              </div>
              <p className="text-gray-600 mb-6">Employee salary and compensation details</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Salary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Pay
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Payroll
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(employee.salary)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(employee.salary / 12)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{employee.lastPayroll}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payroll Summary */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Annual Payroll</h3>
                  <p className="text-2xl font-bold text-purple-700">{formatCurrency(totalSalary)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Average Salary</h3>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(totalSalary / employees.length)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Monthly Payroll</h3>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(totalSalary / 12)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Summary */}
          {activeTab === 'attendance' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Attendance Summary</h2>
              </div>
              <p className="text-gray-600 mb-6">Employee attendance tracking and statistics</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Working Days
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Present Days
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Absent Days
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Days
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.workingDays}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-green-600 font-medium">{employee.presentDays}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-red-600 font-medium">{employee.absentDays}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-yellow-600 font-medium">{employee.leaveDays}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  employee.attendanceRate >= 95 ? 'bg-green-500' :
                                  employee.attendanceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${employee.attendanceRate}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getAttendanceColor(employee.attendanceRate)}`}>
                              {employee.attendanceRate}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRReports;