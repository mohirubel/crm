import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, X, DollarSign, Users, Calculator, Download, Calendar, Filter, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const EmployeeSalaryList = () => {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      department: "Engineering",
      presentDays: 22,
      basicSalary: 75000,
      advanceLoan: 5000,
      deduction: 2000,
      bonus: 3000,
      netSalary: 71000,
      date: "2024-01-15",
      month: "January",
      year: 2024
    },
    {
      id: 2,
      employeeName: "Mike Davis",
      department: "Management",
      presentDays: 20,
      basicSalary: 80000,
      advanceLoan: 0,
      deduction: 1500,
      bonus: 5000,
      netSalary: 83500,
      date: "2024-01-15",
      month: "January",
      year: 2024
    },
    {
      id: 3,
      employeeName: "Emily Wilson",
      department: "Marketing",
      presentDays: 24,
      basicSalary: 55000,
      advanceLoan: 3000,
      deduction: 1000,
      bonus: 2000,
      netSalary: 53000,
      date: "2024-02-15",
      month: "February",
      year: 2024
    },
    {
      id: 4,
      employeeName: "David Brown",
      department: "Engineering",
      presentDays: 18,
      basicSalary: 85000,
      advanceLoan: 8000,
      deduction: 2500,
      bonus: 1000,
      netSalary: 75500,
      date: "2024-02-15",
      month: "February",
      year: 2024
    },
    {
      id: 5,
      employeeName: "Sarah Johnson",
      department: "HR",
      presentDays: 23,
      basicSalary: 60000,
      advanceLoan: 2000,
      deduction: 800,
      bonus: 2500,
      netSalary: 59700,
      date: "2024-03-15",
      month: "March",
      year: 2024
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'monthly', 'yearly'
  const [newSalary, setNewSalary] = useState({
    employeeName: '',
    department: '',
    presentDays: '',
    basicSalary: '',
    advanceLoan: '',
    deduction: '',
    bonus: '',
    netSalary: '',
    date: new Date().toISOString().split('T')[0]
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [...new Set(salaries.map(sal => sal.year))].sort((a, b) => b - a);

  const calculateNetSalary = (basic, advance, deduction, bonus) => {
    const basicAmount = parseFloat(basic) || 0;
    const advanceAmount = parseFloat(advance) || 0;
    const deductionAmount = parseFloat(deduction) || 0;
    const bonusAmount = parseFloat(bonus) || 0;
    
    return basicAmount - advanceAmount - deductionAmount + bonusAmount;
  };

  const getMonthYearFromDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return { month, year };
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit && selectedSalary) {
      const updated = { ...selectedSalary, [field]: value };
      
      if (field === 'date') {
        const { month, year } = getMonthYearFromDate(value);
        updated.month = month;
        updated.year = year;
      }
      
      if (['basicSalary', 'advanceLoan', 'deduction', 'bonus'].includes(field)) {
        updated.netSalary = calculateNetSalary(
          updated.basicSalary,
          updated.advanceLoan,
          updated.deduction,
          updated.bonus
        );
      }
      setSelectedSalary(updated);
    } else {
      const updated = { ...newSalary, [field]: value };
      
      if (field === 'date') {
        const { month, year } = getMonthYearFromDate(value);
        updated.month = month;
        updated.year = year;
      }
      
      if (['basicSalary', 'advanceLoan', 'deduction', 'bonus'].includes(field)) {
        updated.netSalary = calculateNetSalary(
          updated.basicSalary,
          updated.advanceLoan,
          updated.deduction,
          updated.bonus
        );
      }
      setNewSalary(updated);
    }
  };

  const handleAddSalary = () => {
    if (newSalary.employeeName && newSalary.department && newSalary.presentDays && newSalary.basicSalary) {
      const { month, year } = getMonthYearFromDate(newSalary.date);
      const salary = {
        id: salaries.length + 1,
        ...newSalary,
        basicSalary: parseFloat(newSalary.basicSalary) || 0,
        advanceLoan: parseFloat(newSalary.advanceLoan) || 0,
        deduction: parseFloat(newSalary.deduction) || 0,
        bonus: parseFloat(newSalary.bonus) || 0,
        presentDays: parseInt(newSalary.presentDays) || 0,
        netSalary: calculateNetSalary(newSalary.basicSalary, newSalary.advanceLoan, newSalary.deduction, newSalary.bonus),
        month,
        year
      };
      setSalaries([...salaries, salary]);
      setNewSalary({
        employeeName: '',
        department: '',
        presentDays: '',
        basicSalary: '',
        advanceLoan: '',
        deduction: '',
        bonus: '',
        netSalary: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const handleEditSalary = () => {
    if (selectedSalary && selectedSalary.employeeName && selectedSalary.department) {
      const { month, year } = getMonthYearFromDate(selectedSalary.date);
      const updatedSalary = {
        ...selectedSalary,
        basicSalary: parseFloat(selectedSalary.basicSalary) || 0,
        advanceLoan: parseFloat(selectedSalary.advanceLoan) || 0,
        deduction: parseFloat(selectedSalary.deduction) || 0,
        bonus: parseFloat(selectedSalary.bonus) || 0,
        presentDays: parseInt(selectedSalary.presentDays) || 0,
        netSalary: calculateNetSalary(selectedSalary.basicSalary, selectedSalary.advanceLoan, selectedSalary.deduction, selectedSalary.bonus),
        month,
        year
      };
      setSalaries(salaries.map(sal => sal.id === selectedSalary.id ? updatedSalary : sal));
      setShowEditForm(false);
      setSelectedSalary(null);
    }
  };

  const handleDeleteSalary = (id) => {
    setSalaries(salaries.filter(sal => sal.id !== id));
  };

  const handleViewSalary = (salary) => {
    setSelectedSalary(salary);
    setShowViewModal(true);
  };

  const handleEditClick = (salary) => {
    setSelectedSalary({...salary});
    setShowEditForm(true);
  };

  const getFilteredSalaries = () => {
    let filtered = salaries.filter(salary =>
      salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (viewMode === 'monthly' && selectedMonth) {
      filtered = filtered.filter(salary => salary.month === selectedMonth);
    }

    if (viewMode === 'yearly' && selectedYear) {
      filtered = filtered.filter(salary => salary.year === parseInt(selectedYear));
    }

    if (viewMode === 'monthly' && selectedMonth && selectedYear) {
      filtered = filtered.filter(salary => 
        salary.month === selectedMonth && salary.year === parseInt(selectedYear)
      );
    }

    return filtered;
  };

  const filteredSalaries = getFilteredSalaries();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalStats = () => {
    const totalBasic = filteredSalaries.reduce((sum, sal) => sum + sal.basicSalary, 0);
    const totalNet = filteredSalaries.reduce((sum, sal) => sum + sal.netSalary, 0);
    const totalAdvance = filteredSalaries.reduce((sum, sal) => sum + sal.advanceLoan, 0);
    const totalBonus = filteredSalaries.reduce((sum, sal) => sum + sal.bonus, 0);
    const totalDeduction = filteredSalaries.reduce((sum, sal) => sum + sal.deduction, 0);
    return { totalBasic, totalNet, totalAdvance, totalBonus, totalDeduction };
  };

  const stats = getTotalStats();

  const downloadCSV = () => {
    const headers = ['ID', 'Employee Name', 'Department', 'Date', 'Month', 'Year', 'Present Days', 'Basic Salary', 'Advance Loan', 'Deduction', 'Bonus', 'Net Salary'];
    const csvContent = [
      headers.join(','),
      ...filteredSalaries.map(salary => [
        salary.id,
        `"${salary.employeeName}"`,
        `"${salary.department}"`,
        salary.date,
        `"${salary.month}"`,
        salary.year,
        salary.presentDays,
        salary.basicSalary,
        salary.advanceLoan,
        salary.deduction,
        salary.bonus,
        salary.netSalary
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary_report_${viewMode}_${selectedMonth || ''}_${selectedYear || new Date().getFullYear()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const title = viewMode === 'monthly' ? `Monthly Salary Report - ${selectedMonth} ${selectedYear}` : 
                  viewMode === 'yearly' ? `Yearly Salary Report - ${selectedYear}` : 
                  'All Salary Records';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f5f5f5; }
            .currency { text-align: right; }
            .total-row { background-color: #e8f4f8; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="stats">
            <div class="stat">
              <h3>Total Employees</h3>
              <p>${filteredSalaries.length}</p>
            </div>
            <div class="stat">
              <h3>Total Basic Salary</h3>
              <p>${formatCurrency(stats.totalBasic)}</p>
            </div>
            <div class="stat">
              <h3>Total Net Salary</h3>
              <p>${formatCurrency(stats.totalNet)}</p>
            </div>
            <div class="stat">
              <h3>Total Advance</h3>
              <p>${formatCurrency(stats.totalAdvance)}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Present Days</th>
                <th>Basic Salary</th>
                <th>Advance Loan</th>
                <th>Deduction</th>
                <th>Bonus</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSalaries.map(salary => `
                <tr>
                  <td>#${salary.id}</td>
                  <td>${salary.employeeName}</td>
                  <td>${salary.department}</td>
                  <td>${salary.date}</td>
                  <td>${salary.presentDays} days</td>
                  <td class="currency">${formatCurrency(salary.basicSalary)}</td>
                  <td class="currency">${formatCurrency(salary.advanceLoan)}</td>
                  <td class="currency">${formatCurrency(salary.deduction)}</td>
                  <td class="currency">${formatCurrency(salary.bonus)}</td>
                  <td class="currency">${formatCurrency(salary.netSalary)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="5">TOTAL</td>
                <td class="currency">${formatCurrency(stats.totalBasic)}</td>
                <td class="currency">${formatCurrency(stats.totalAdvance)}</td>
                <td class="currency">${formatCurrency(stats.totalDeduction)}</td>
                <td class="currency">${formatCurrency(stats.totalBonus)}</td>
                <td class="currency">${formatCurrency(stats.totalNet)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-auto">
        {/* Header */}
        <div className="mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-bold text-gray-900 mb-2">Employee Salary Management</h1>
              {/* <p className="text-gray-600">Manage employee salaries, bonuses, and deductions with monthly/yearly views</p> */}
            </div>
            {/* <button
              onClick={() => setShowAddForm(true)}
              className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Salary Record
            </button> */}
          </div>
        </div>

        {/* View Mode & Download Section */}
        <div className="bg-white rounded-lg shadow-sm mb-3">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">View Mode:</span>
              </div>
              <select
                className="pl-1 pr-3 py-1 border border-gray-300 rounded-xl text-sm"
                value={viewMode}
                onChange={(e) => {
                  setViewMode(e.target.value);
                  setSelectedMonth('');
                  setSelectedYear('');
                }}
              >
                <option value="all">All Records</option>
                <option value="monthly">Monthly View</option>
                <option value="yearly">Yearly View</option>
              </select>

              {viewMode === 'monthly' && (
                <>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg "
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg "
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </>
              )}

              {viewMode === 'yearly' && (
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg "
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* <button
                onClick={downloadCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button> */}
              <button
                onClick={downloadPDF}
                className="bg-black text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-[12px] hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3 h-[max-content]">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{filteredSalaries.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Basic Salary</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBasic)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Net Salary</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalNet)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Advance</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAdvance)}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-3">
         <div class="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex gap-4 py-2">
            <div className="flex-1">
              <div className="flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
                     <Button
                       onClick={() => {
                         setSearchTerm('');
                        //  setFilterStatus('all');
                        //  setFilterLeaveType('all');
             
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

        {/* Salary List */}
        <div className="bg-white rounded-xl shadow-sm border">

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Employee Name</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Present Days</th>
                  <th className="px-4 py-2 text-left">Basic Salary</th>
                  <th className="px-4 py-2 text-left">Advance Loan</th>
                  <th className="px-4 py-2 text-left">Deduction</th>
                  <th className="px-4 py-2 text-left">Bonus</th>
                  <th className="px-4 py-2 text-left">Net Salary</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSalaries.map((salary) => (
                  <tr key={salary.id} className="hover:bg-gray-50">
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{salary.id}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{salary.employeeName}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm text-gray-900">{salary.department}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm text-gray-900">{salary.date}</div>
                      <div className="text-xs text-gray-500">{salary.month} {salary.year}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm text-gray-900">{salary.presentDays} days</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{formatCurrency(salary.basicSalary)}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-red-600">{formatCurrency(salary.advanceLoan)}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-red-600">{formatCurrency(salary.deduction)}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{formatCurrency(salary.bonus)}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(salary.netSalary)}</div>
                    </td>
                    <td className="px-4 py-[2px] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewSalary(salary)}
                          className="p-1 border rounded-md hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-green-600" />
                        </button>

                        <button
                          onClick={() => handleEditClick(salary)}
                          className="p-1 border rounded-md hover:bg-gray-100"
                          title="Edit Salary"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="p-1 border rounded-md hover:bg-gray-100"
                              title="Delete Salary"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Salary Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete salary record for "{salary.employeeName}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteSalary(salary.id)}
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

        {/* Add Salary Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Salary Record</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
                  <input
                    type="number"
                    min="0"
                    max="31"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.presentDays}
                    onChange={(e) => handleInputChange('presentDays', e.target.value)}
                    placeholder="Enter present days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.basicSalary}
                    onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                    placeholder="Enter basic salary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Loan</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.advanceLoan}
                    onChange={(e) => handleInputChange('advanceLoan', e.target.value)}
                    placeholder="Enter advance loan amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deduction</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.deduction}
                    onChange={(e) => handleInputChange('deduction', e.target.value)}
                    placeholder="Enter deduction amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={newSalary.bonus}
                    onChange={(e) => handleInputChange('bonus', e.target.value)}
                    placeholder="Enter bonus amount"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-100"
                    value={formatCurrency(newSalary.netSalary || 0)}
                    readOnly
                    placeholder="Calculated automatically"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated: Basic - Advance - Deduction + Bonus</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddSalary}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Add Salary Record
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

        {/* Edit Salary Modal */}
        {showEditForm && selectedSalary && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Salary Record</h3>
                <button 
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value, true)}
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.department}
                    onChange={(e) => handleInputChange('department', e.target.value, true)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.date}
                    onChange={(e) => handleInputChange('date', e.target.value, true)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
                  <input
                    type="number"
                    min="0"
                    max="31"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.presentDays}
                    onChange={(e) => handleInputChange('presentDays', e.target.value, true)}
                    placeholder="Enter present days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.basicSalary}
                    onChange={(e) => handleInputChange('basicSalary', e.target.value, true)}
                    placeholder="Enter basic salary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Loan</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.advanceLoan}
                    onChange={(e) => handleInputChange('advanceLoan', e.target.value, true)}
                    placeholder="Enter advance loan amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deduction</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.deduction}
                    onChange={(e) => handleInputChange('deduction', e.target.value, true)}
                    placeholder="Enter deduction amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                    value={selectedSalary.bonus}
                    onChange={(e) => handleInputChange('bonus', e.target.value, true)}
                    placeholder="Enter bonus amount"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Salary</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-100"
                    value={formatCurrency(selectedSalary.netSalary || 0)}
                    readOnly
                    placeholder="Calculated automatically"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated: Basic - Advance - Deduction + Bonus</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditSalary}
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

        {/* View Salary Modal */}
        {showViewModal && selectedSalary && (
          <div className="fixed inset-0 bg-black/25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Salary Details</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedSalary.employeeName}</h4>
                <p className="text-gray-600">{selectedSalary.department}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedSalary.month} {selectedSalary.year}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                    <span className="text-sm text-gray-900 font-medium">#{selectedSalary.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">Date:</span>
                    <span className="text-sm text-gray-900 font-medium">{selectedSalary.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Present Days:</span>
                    <span className="text-sm text-gray-900 font-medium">{selectedSalary.presentDays} days</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-green-800 mb-2">Income</h5>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Basic Salary:</span>
                    <span className="text-sm text-green-700 font-medium">{formatCurrency(selectedSalary.basicSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Bonus:</span>
                    <span className="text-sm text-green-700 font-medium">{formatCurrency(selectedSalary.bonus)}</span>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-red-800 mb-2">Deductions</h5>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Advance Loan:</span>
                    <span className="text-sm text-red-700 font-medium">{formatCurrency(selectedSalary.advanceLoan)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Other Deductions:</span>
                    <span className="text-sm text-red-700 font-medium">{formatCurrency(selectedSalary.deduction)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-800">Net Salary:</span>
                    <span className="text-lg font-bold text-blue-800">{formatCurrency(selectedSalary.netSalary)}</span>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default EmployeeSalaryList;