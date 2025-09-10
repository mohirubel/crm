import React, { useState } from 'react';
import { Calculator, BookOpen, TrendingUp, TrendingDown, DollarSign, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

const FinanceReports = () => {
  const [trialBalanceData] = useState([
    {
      id: 1,
      accountCode: '1001',
      accountName: 'Cash in Bank',
      accountType: 'Asset',
      debit: 125000,
      credit: 0
    },
    {
      id: 2,
      accountCode: '1002',
      accountName: 'Accounts Receivable',
      accountType: 'Asset',
      debit: 85000,
      credit: 0
    },
    {
      id: 3,
      accountCode: '1003',
      accountName: 'Inventory',
      accountType: 'Asset',
      debit: 45000,
      credit: 0
    },
    {
      id: 4,
      accountCode: '2001',
      accountName: 'Accounts Payable',
      accountType: 'Liability',
      debit: 0,
      credit: 35000
    },
    {
      id: 5,
      accountCode: '2002',
      accountName: 'Bank Loan',
      accountType: 'Liability',
      debit: 0,
      credit: 50000
    },
    {
      id: 6,
      accountCode: '3001',
      accountName: 'Owner\'s Equity',
      accountType: 'Equity',
      debit: 0,
      credit: 100000
    },
    {
      id: 7,
      accountCode: '4001',
      accountName: 'Sales Revenue',
      accountType: 'Revenue',
      debit: 0,
      credit: 180000
    },
    {
      id: 8,
      accountCode: '5001',
      accountName: 'Cost of Goods Sold',
      accountType: 'Expense',
      debit: 90000,
      credit: 0
    },
    {
      id: 9,
      accountCode: '5002',
      accountName: 'Rent Expense',
      accountType: 'Expense',
      debit: 24000,
      credit: 0
    },
    {
      id: 10,
      accountCode: '5003',
      accountName: 'Salaries Expense',
      accountType: 'Expense',
      debit: 96000,
      credit: 0
    }
  ]);

  const [ledgerData] = useState([
    {
      id: 1,
      date: '2024-09-01',
      account: 'Cash in Bank',
      description: 'Initial deposit',
      reference: 'JV001',
      debit: 125000,
      credit: 0,
      balance: 125000
    },
    {
      id: 2,
      date: '2024-09-02',
      account: 'Sales Revenue',
      description: 'Sales for September',
      reference: 'INV001',
      debit: 0,
      credit: 25000,
      balance: 25000
    },
    {
      id: 3,
      date: '2024-09-03',
      account: 'Accounts Receivable',
      description: 'Credit sales',
      reference: 'INV002',
      debit: 15000,
      credit: 0,
      balance: 15000
    },
    {
      id: 4,
      date: '2024-09-04',
      account: 'Rent Expense',
      description: 'Monthly rent payment',
      reference: 'PAY001',
      debit: 2000,
      credit: 0,
      balance: 2000
    },
    {
      id: 5,
      date: '2024-09-05',
      account: 'Salaries Expense',
      description: 'Employee salaries',
      reference: 'PAY002',
      debit: 8000,
      credit: 0,
      balance: 8000
    },
    {
      id: 6,
      date: '2024-09-06',
      account: 'Accounts Payable',
      description: 'Supplier payment',
      reference: 'BILL001',
      debit: 0,
      credit: 5000,
      balance: 5000
    }
  ]);

  const [cashFlowData] = useState([
    {
      id: 1,
      category: 'Operating Activities',
      items: [
        { description: 'Cash received from customers', amount: 180000, type: 'inflow' },
        { description: 'Cash paid to suppliers', amount: -90000, type: 'outflow' },
        { description: 'Cash paid for salaries', amount: -96000, type: 'outflow' },
        { description: 'Cash paid for rent', amount: -24000, type: 'outflow' },
        { description: 'Net cash from operating activities', amount: -30000, type: 'net', isSubtotal: true }
      ]
    },
    {
      id: 2,
      category: 'Investing Activities',
      items: [
        { description: 'Purchase of equipment', amount: -25000, type: 'outflow' },
        { description: 'Sale of old equipment', amount: 5000, type: 'inflow' },
        { description: 'Net cash from investing activities', amount: -20000, type: 'net', isSubtotal: true }
      ]
    },
    {
      id: 3,
      category: 'Financing Activities',
      items: [
        { description: 'Bank loan received', amount: 50000, type: 'inflow' },
        { description: 'Owner\'s investment', amount: 100000, type: 'inflow' },
        { description: 'Loan repayment', amount: -10000, type: 'outflow' },
        { description: 'Net cash from financing activities', amount: 140000, type: 'net', isSubtotal: true }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('trial-balance');

  const totalDebits = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  
  const netCashFlow = cashFlowData.reduce((sum, category) => {
    const categoryNet = category.items.find(item => item.isSubtotal);
    return sum + (categoryNet ? categoryNet.amount : 0);
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Asset':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Liability':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Equity':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Revenue':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expense':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCashFlowIcon = (type) => {
    switch (type) {
      case 'inflow':
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'outflow':
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCashFlowColor = (type, amount) => {
    if (type === 'net') {
      return amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
    }
    return type === 'inflow' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance Reports</h1>
          <p className="text-gray-600">Monitor financial performance and accounting records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Debits</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalDebits)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCredits)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netCashFlow >= 0 ? '+' : ''}{formatCurrency(netCashFlow)}
                </p>
              </div>
              <div className={`${netCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
                <DollarSign className={`w-6 h-6 ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance Check</p>
                <p className={`text-2xl font-bold ${totalDebits === totalCredits ? 'text-green-600' : 'text-red-600'}`}>
                  {totalDebits === totalCredits ? 'Balanced' : 'Unbalanced'}
                </p>
              </div>
              <div className={`${totalDebits === totalCredits ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
                {totalDebits === totalCredits ? 
                  <Calculator className="w-6 h-6 text-green-600" /> :
                  <AlertCircle className="w-6 h-6 text-red-600" />
                }
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('trial-balance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'trial-balance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Trial Balance
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ledger'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                General Ledger
              </button>
              <button
                onClick={() => setActiveTab('cash-flow')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cash-flow'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cash Flow Statement
              </button>
            </nav>
          </div>

          {/* Trial Balance */}
          {activeTab === 'trial-balance' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Trial Balance</h2>
              </div>
              <p className="text-gray-600 mb-6">Summary of all account balances to verify accounting equation</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Type
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trialBalanceData.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{account.accountCode}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{account.accountName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getAccountTypeColor(account.accountType)}`}>
                            {account.accountType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {account.debit > 0 ? formatCurrency(account.debit) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {account.credit > 0 ? formatCurrency(account.credit) : '-'}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="3">
                        <div className="text-sm font-bold text-gray-900">TOTAL</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-blue-600">{formatCurrency(totalDebits)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-green-600">{formatCurrency(totalCredits)}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* General Ledger */}
          {activeTab === 'ledger' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">General Ledger</h2>
              </div>
              <p className="text-gray-600 mb-6">Detailed record of all financial transactions</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ledgerData.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{entry.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{entry.account}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{entry.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{entry.reference}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(entry.balance)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cash Flow Statement */}
          {activeTab === 'cash-flow' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Cash Flow Statement</h2>
              </div>
              <p className="text-gray-600 mb-6">Cash inflows and outflows by activity category</p>

              <div className="space-y-8">
                {cashFlowData.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, index) => (
                        <div key={index} className={`flex justify-between items-center ${item.isSubtotal ? 'border-t pt-3 mt-3' : ''}`}>
                          <div className="flex items-center gap-2">
                            {!item.isSubtotal && getCashFlowIcon(item.type)}
                            <span className={`text-sm ${item.isSubtotal ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {item.description}
                            </span>
                          </div>
                          <span className={`text-sm ${item.isSubtotal ? 'font-bold' : 'font-medium'} ${getCashFlowColor(item.type, item.amount)}`}>
                            {item.amount >= 0 && !item.isSubtotal ? '+' : ''}
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Net Cash Flow */}
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-blue-900">Net Change in Cash</h3>
                    <span className={`text-xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netCashFlow >= 0 ? '+' : ''}{formatCurrency(netCashFlow)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceReports;