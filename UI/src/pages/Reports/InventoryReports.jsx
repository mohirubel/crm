import React, { useState } from 'react';
import { AlertTriangle, Package, TrendingDown, RefreshCw } from 'lucide-react';

const InventoryReports = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'AirPods Pro',
      currentStock: 3,
      reorderLevel: 15,
      status: 'Critical'
    },
    {
      id: 2,
      name: 'Apple Watch Series 8',
      currentStock: 7,
      reorderLevel: 12,
      status: 'Low'
    },
    {
      id: 3,
      name: 'iPhone 13 Pro',
      currentStock: 9,
      reorderLevel: 10,
      status: 'Low'
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      currentStock: 15,
      reorderLevel: 8,
      status: 'Good'
    },
    {
      id: 5,
      name: 'iPad Pro 11"',
      currentStock: 2,
      reorderLevel: 10,
      status: 'Critical'
    }
  ]);

  const [activeTab, setActiveTab] = useState('low-stock');

  const lowStockProducts = products.filter(product => 
    product.currentStock <= product.reorderLevel
  );

  const criticalProducts = products.filter(product => 
    product.status === 'Critical'
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Critical') return <AlertTriangle className="w-4 h-4" />;
    if (status === 'Low') return <TrendingDown className="w-4 h-4" />;
    return <Package className="w-4 h-4" />;
  };

  const handleReorder = (productName) => {
    alert(`Reorder initiated for ${productName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Reports</h1>
          <p className="text-gray-600">Monitor stock levels and manage low stock alerts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingDown className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Items</p>
                <p className="text-2xl font-bold text-red-600">{criticalProducts.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('low-stock')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'low-stock'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Low Stock Report
              </button>
              <button
                onClick={() => setActiveTab('all-stock')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all-stock'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Stock Levels
              </button>
            </nav>
          </div>

          {/* Low Stock Alert */}
          {activeTab === 'low-stock' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Low Quantity Report</h2>
              </div>
              <p className="text-gray-600 mb-6">Products with low stock levels</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.currentStock} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.reorderLevel} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleReorder(product.name)}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Reorder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* All Stock Levels */}
          {activeTab === 'all-stock' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">All Stock Levels</h2>
              <p className="text-gray-600 mb-6">Complete inventory overview</p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Ratio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.currentStock} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.reorderLevel} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  product.status === 'Critical' ? 'bg-red-500' :
                                  product.status === 'Low' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{
                                  width: `${Math.min(100, (product.currentStock / (product.reorderLevel * 2)) * 100)}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.round((product.currentStock / product.reorderLevel) * 100)}%
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

export default InventoryReports;