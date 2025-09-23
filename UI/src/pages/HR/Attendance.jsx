import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle, Search, Download, Eye, Filter, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmployeeAttendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedView, setSelectedView] = useState('mark'); // 'mark', 'view', 'monthly'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showEditPresentDaysModal, setShowEditPresentDaysModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editPresentDays, setEditPresentDays] = useState(0);

  // Sample employee data
  const [employees] = useState([
    { 
      id: 1, 
      name: 'Ahmed Karim', 
      employeeId: 'EMP001', 
      department: 'IT Department', 
      position: 'Software Engineer'
    },
    { 
      id: 2, 
      name: 'Fatima Khan', 
      employeeId: 'EMP002', 
      department: 'HR Department', 
      position: 'HR Manager'
    },
    { 
      id: 3, 
      name: 'Mohammad Rahim', 
      employeeId: 'EMP003', 
      department: 'Accounts', 
      position: 'Accountant'
    },
    { 
      id: 4, 
      name: 'Ayesha Begum', 
      employeeId: 'EMP004', 
      department: 'Marketing', 
      position: 'Marketing Executive'
    },
    { 
      id: 5, 
      name: 'Rashidul Islam', 
      employeeId: 'EMP005', 
      department: 'Sales', 
      position: 'Sales Manager'
    },
    { 
      id: 6, 
      name: 'Salma Akter', 
      employeeId: 'EMP006', 
      department: 'Operations', 
      position: 'Operations Coordinator'
    },
  ]);

  // Monthly present days storage
  const [monthlyPresentDays, setMonthlyPresentDays] = useState({});

  const handleUpdateAttendance = (newStatus) => {
    if (!selectedRecord) return;
    const statusValue = newStatus === 'Present' ? true : false;
    markAttendance(selectedRecord.employee.id, statusValue, selectedRecord.date);
    setShowEditModal(false);
    setSelectedRecord(null);
  };

  const handleEditPresentDays = (employee) => {
    const [year, month] = selectedMonth.split('-');
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    
    const employeeWithTotalDays = {
      ...employee,
      totalDays: daysInMonth
    };
    
    setEditingEmployee(employeeWithTotalDays);
    
    const monthKey = `${employee.id}-${selectedMonth}`;
    const currentPresentDays = monthlyPresentDays[monthKey] !== undefined ? monthlyPresentDays[monthKey] : employee.presentDays;
    setEditPresentDays(currentPresentDays);
    setShowEditPresentDaysModal(true);
  };

  const handleUpdatePresentDays = () => {
    if (!editingEmployee) return;
    const monthKey = `${editingEmployee.id}-${selectedMonth}`;
    setMonthlyPresentDays(prev => ({
      ...prev,
      [monthKey]: editPresentDays
    }));
    setShowEditPresentDaysModal(false);
    setEditingEmployee(null);
    setEditPresentDays(0);
  };
  
  const [attendance, setAttendance] = useState({});
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // Initialize attendance for current date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!attendance[today]) {
      const initialAttendance = {};
      employees.forEach(employee => {
        initialAttendance[employee.id] = null;
      });
      setAttendance(prev => ({ ...prev, [today]: initialAttendance }));
    }
  }, [employees]);

  // Generate sample attendance history (90 days)
  useEffect(() => {
    const history = [];
    const dates = [];
    for (let i = 89; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    dates.forEach(date => {
      employees.forEach(employee => {
        history.push({
          date,
          employeeId: employee.id,
          employeeName: employee.name,
          empId: employee.employeeId,
          status: Math.random() > 0.15 ? 'Present' : 'Absent',
        });
      });
    });

    setAttendanceHistory(history);
  }, [employees]);

  const markAttendance = (employeeId, status) => {
    setAttendance(prev => ({
      ...prev,
      [currentDate]: {
        ...prev[currentDate],
        [employeeId]: status
      }
    }));
  };

  const getAttendanceStats = () => {
    const todayAttendance = attendance[currentDate] || {};
    const present = Object.values(todayAttendance).filter(status => status === true).length;
    const absent = Object.values(todayAttendance).filter(status => status === false).length;
    const notMarked = employees.length - present - absent;
    
    return { present, absent, notMarked, total: employees.length };
  };

  const getMonthlyAttendance = () => {
    const [year, month] = selectedMonth.split('-');
    // Get actual days in the selected month
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    
    const monthData = attendanceHistory.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() === parseInt(year) && 
             recordDate.getMonth() === parseInt(month) - 1;
    });

    const employeeStats = employees.map(employee => {
      const employeeRecords = monthData.filter(record => record.employeeId === employee.id);
      const defaultPresentDays = employeeRecords.filter(record => record.status === 'Present').length;
      
      // Check if there's a manually edited present days value
      const monthKey = `${employee.id}-${selectedMonth}`;
      const presentDays = monthlyPresentDays[monthKey] !== undefined ? monthlyPresentDays[monthKey] : defaultPresentDays;
      
      const totalDays = daysInMonth; // Use actual days in month
      const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

      return {
        ...employee,
        presentDays,
        totalDays,
        percentage
      };
    });

    return employeeStats;
  };

  const getYearlyAttendance = () => {
    const yearData = attendanceHistory.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() === parseInt(selectedYear);
    });

    const monthlyStats = {};
    for (let month = 1; month <= 12; month++) {
      const monthName = new Date(selectedYear, month - 1).toLocaleString('en', { month: 'long' });
      const monthRecords = yearData.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === month - 1;
      });

      const employeeStats = employees.map(employee => {
        const employeeRecords = monthRecords.filter(record => record.employeeId === employee.id);
        const presentDays = employeeRecords.filter(record => record.status === 'Present').length;
        const totalDays = employeeRecords.length;
        const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

        return {
          ...employee,
          presentDays,
          totalDays,
          percentage
        };
      });

      monthlyStats[monthName] = employeeStats;
    }

    return monthlyStats;
  };

  const downloadMonthlyReport = () => {
    const monthlyData = getMonthlyAttendance();
    const csvContent = [
      ['Employee ID', 'Name', 'Department', 'Position', 'Present Days', 'Total Days', 'Attendance %'].join(','),
      ...monthlyData.map(emp => [
        emp.employeeId,
        emp.name,
        emp.department,
        emp.position,
        emp.presentDays,
        emp.totalDays,
        emp.percentage + '%'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${selectedMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadYearlyReport = () => {
    const yearlyData = getYearlyAttendance();
    let csvContent = ['Employee ID', 'Name', 'Department'];
    
    // Add month headers
    Object.keys(yearlyData).forEach(month => {
      csvContent.push(month + ' %');
    });
    csvContent = [csvContent.join(',')];

    // Add employee data
    employees.forEach(employee => {
      let row = [employee.employeeId, employee.name, employee.department];
      Object.values(yearlyData).forEach(monthData => {
        const empData = monthData.find(emp => emp.id === employee.id);
        row.push(empData ? empData.percentage + '%' : '0%');
      });
      csvContent.push(row.join(','));
    });

    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const todayAttendance = attendance[currentDate] || {};
    const employeeStatus = todayAttendance[employee.id];
    
    if (filterStatus === 'present') return matchesSearch && employeeStatus === true;
    if (filterStatus === 'absent') return matchesSearch && employeeStatus === false;
    
    return matchesSearch;
  });

  const stats = getAttendanceStats();

  return (
    <div className="space-y-3">
      <div className="mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold text-gray-900">Attendance</h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-[12px]"
                />
                <button
                  onClick={() => setSelectedView('mark')}
                  className={`px-3 py-1 text-[12px] font-medium border border-gray-300 rounded-md text-gray-700 ${
                    selectedView === 'mark' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Mark Attendance
                </button>
                {/* <button
                  onClick={() => setSelectedView('view')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedView === 'view' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  View Records
                </button> */}
                <button
                  onClick={() => setSelectedView('monthly')}
                  className={`px-3 py-1 text-[12px] font-medium border border-gray-300 rounded-md ${
                    selectedView === 'monthly' 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Reports
                </button>
              </div>
            </div>
          </div>
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-3">
          

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 p-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-600">Present Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-600">Absent Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.notMarked}</div>
              <div className="text-sm text-gray-600">Not Marked</div>
            </div>
          </div>
        </div>
        
          <div className="bg-white rounded-lg shadow-sm mb-3">
              <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="flex gap-4 py-2">
                  <div className="flex relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-1 pr-3 py-1 border border-gray-300 rounded-xl text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                  <div className="flex items-end">
                                       <Button
                                         onClick={() => {
                                           setSearchTerm('');
                                           setFilterStatus('all');
                               
                                         }}
                                         className="bg-yellow-500 hover:bg-yellow-600"
                                       >
                                         <RefreshCcw className="h-4 w-4" />
                                         Clear Filters
                                       </Button>
                  </div>
                </div>
              </div>
            </div>
          
        

        {selectedView === 'mark' && (
          <div className="">
            

          <Card>
           <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Employee</th>
                    <th className="px-4 py-2 text-left">Department</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => {
                    const todayAttendance = attendance[currentDate] || {};
                    const employeeStatus = todayAttendance[employee.id];

                    return (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-[2px] whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center">
                          {employeeStatus === true && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-md">
                              Present
                            </span>
                          )}
                          {employeeStatus === false && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-md">
                              Absent
                            </span>
                          )}
                          {employeeStatus === null && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-md">
                              Not Marked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => markAttendance(employee.id, true)}
                              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                employeeStatus === true
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => markAttendance(employee.id, false)}
                              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                employeeStatus === false
                                  ? 'bg-red-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
           </CardContent>
          </Card>
            <div className="px-6 py-3 border-t border-gray-200 text-sm text-gray-500 bg-white rounded-lg shadow-sm mt-3">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>
        )}

        {selectedView === 'view' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
                  <p className="text-gray-600 text-sm">View attendance records for {new Date(currentDate).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={downloadMonthlyReport}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Employee</th>
                    <th className="px-4 py-2 text-left">Department</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => {
                    const todayAttendance = attendance[currentDate] || {};
                    const employeeStatus = todayAttendance[employee.id];

                    return (
                      <tr key={employee.id}>
                        <td className="px-4 py-[2px] whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center">
                          {employeeStatus === true && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-md">
                              Present
                            </span>
                          )}
                          {employeeStatus === false && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-md">
                              Absent
                            </span>
                          )}
                          {employeeStatus === null && (
                            <span className="inline-flex px-2 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-md">
                              Not Marked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center text-sm text-gray-900">
                          {new Date(currentDate).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'monthly' && (
          <div className="space-y-6">
            {/* Monthly Report */}
            <div className="bg-white rounded-lg shadow-sm mb-3 p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-gray-900">Monthly Attendance Report</h2>
                    <p className="text-gray-600 text-sm">View monthly attendance statistics</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-[12px]"
                    />
                    <button
                      onClick={downloadMonthlyReport}
                      className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1 border border-gray-300 rounded-md text-[12px] hover:bg-gray-800 transition-colors"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
          <Card>
           <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Employee</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-center">Present Days</th>
                      <th className="px-4 py-2 text-center">Total Days</th>
                      <th className="px-4 py-2 text-center">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getMonthlyAttendance().map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-4 py-[2px] whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center">
                          <button
                            onClick={() => handleEditPresentDays(employee)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline cursor-pointer bg-blue-50 px-2 py-1 rounded"
                          >
                            ✏️ {employee.presentDays}
                          </button>
                        </td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center text-sm text-gray-900">{employee.totalDays}</td>
                        <td className="px-4 py-[2px] whitespace-nowrap text-center">
                          <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-md ${
                            employee.percentage >= 90 ? 'bg-green-100 text-green-800' :
                            employee.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {employee.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
           </CardContent>
          </Card>

            {/* Yearly Report */}
            <div className="bg-white rounded-lg shadow-sm mb-3 p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-gray-900">Yearly Attendance Report</h2>
                    <p className="text-gray-600 text-sm">View yearly attendance statistics by month</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-[12px]"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                    <button
                      onClick={downloadYearlyReport}
                      className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1 border border-gray-300 rounded-md text-[12px] hover:bg-gray-800 transition-colors"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
          <Card>
           <CardContent>  
            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm border text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm tracking-wider">Employee</th>
                      <th className="px-4 py-2 text-left text-sm  tracking-wider">Dept</th>
                      {Object.keys(getYearlyAttendance()).map(month => (
                        <th key={month} className="px-4 py-2 text-center text-sm uppercase tracking-wider">
                          {month.slice(0, 3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => {
                      const yearlyData = getYearlyAttendance();
                      return (
                        <tr key={employee.id}>
                          <td className="px-4 py-[2px] whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.employeeId}</div>
                            </div>
                          </td>
                          <td className="px-4 py-[2px] whitespace-nowrap text-sm text-gray-900">{employee.department.split(' ')[0]}</td>
                          {Object.values(yearlyData).map((monthData, index) => {
                            const empData = monthData.find(emp => emp.id === employee.id);
                            const percentage = empData ? empData.percentage : 0;
                            return (
                              <td key={index} className="px-4 py-[2px] whitespace-nowrap text-center">
                                <span className={`inline-flex px-1.5 py-0.5 text-sm font-medium rounded ${
                                  percentage >= 90 ? 'bg-green-100 text-green-800' :
                                  percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {percentage}%
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
           </CardContent>
          </Card>
          </div>
        )}

        {/* Edit Present Days Modal */}
        {showEditPresentDaysModal && editingEmployee && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md min-w-full divide-y divide-gray-200 text-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Present Days</h3>
                <button
                  onClick={() => setShowEditPresentDaysModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{editingEmployee.name}</h4>
                  <p className="text-sm text-gray-600">{editingEmployee.employeeId}</p>
                  <p className="text-sm text-gray-500">
                    Month: {new Date(selectedMonth + '-01').toLocaleDateString('en', { month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Present Days (out of {editingEmployee.totalDays} days)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={editingEmployee.totalDays}
                      value={editPresentDays}
                      onChange={(e) => setEditPresentDays(parseInt(e.target.value) || 0)}
                      className="min-w-full divide-y divide-gray-200 text-sm border px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Attendance Percentage: {editingEmployee.totalDays > 0 ? Math.round((editPresentDays / editingEmployee.totalDays) * 100) : 0}%
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditPresentDaysModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePresentDays}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Attendance Modal */}
        {showEditModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md min-w-full divide-y divide-gray-200 text-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Attendance</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{selectedRecord.employee.name}</h4>
                  <p className="text-sm text-gray-600">{selectedRecord.employee.employeeId}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(selectedRecord.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Current Status: 
                    <span className={`ml-2 inline-flex px-2 py-1 text-sm font-medium rounded-md ${
                      selectedRecord.currentStatus === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedRecord.currentStatus}
                    </span>
                  </p>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Update Status:</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateAttendance('Present')}
                        className={`font-bold text-gray-900 ${
                          selectedRecord.currentStatus === 'Present'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        Mark Present
                      </button>
                      <button
                        onClick={() => handleUpdateAttendance('Absent')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          selectedRecord.currentStatus === 'Absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        Mark Absent
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
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

export default EmployeeAttendance;