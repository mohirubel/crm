import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock Data
const balanceSheetData = {
  assets: [
    { name: "Cash", amount: 20000 },
    { name: "Accounts Receivable", amount: 15000 },
    { name: "Inventory", amount: 10000 },
  ],
  liabilities: [
    { name: "Accounts Payable", amount: 12000 },
    { name: "Bank Loan", amount: 8000 },
  ],
  equity: [
    { name: "Share Capital", amount: 15000 },
    { name: "Retained Earnings", amount: 10000 },
  ],
};

const profitLossData = [
  { name: "Sales", type: "Income", amount: 40000 },
  { name: "COGS", type: "Expense", amount: 15000 },
  { name: "Rent", type: "Expense", amount: 5000 },
  { name: "Salaries", type: "Expense", amount: 8000 },
];

const cashFlowData = [
  { month: "Jan", inflow: 15000, outflow: 10000 },
  { month: "Feb", inflow: 18000, outflow: 12000 },
  { month: "Mar", inflow: 20000, outflow: 15000 },
];

// Colors
const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336", "#9C27B0"];

const AccountReports = () => {
  const totalAssets = balanceSheetData.assets.reduce((a, b) => a + b.amount, 0);
  const totalLiabilities = balanceSheetData.liabilities.reduce((a, b) => a + b.amount, 0);
  const totalEquity = balanceSheetData.equity.reduce((a, b) => a + b.amount, 0);

  const totalIncome = profitLossData.filter(d => d.type === "Income").reduce((a, b) => a + b.amount, 0);
  const totalExpenses = profitLossData.filter(d => d.type === "Expense").reduce((a, b) => a + b.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Financial Reports</h2>

      {/* Balance Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>Balance Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Assets */}
            <div>
              <h3 className="font-bold mb-2">Assets</h3>
              <table className="w-full text-sm border">
                <tbody>
                  {balanceSheetData.assets.map((a, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{a.name}</td>
                      <td className="p-2 text-right">${a.amount}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="p-2">Total Assets</td>
                    <td className="p-2 text-right">${totalAssets}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Liabilities */}
            <div>
              <h3 className="font-bold mb-2">Liabilities</h3>
              <table className="w-full text-sm border">
                <tbody>
                  {balanceSheetData.liabilities.map((l, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{l.name}</td>
                      <td className="p-2 text-right">${l.amount}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="p-2">Total Liabilities</td>
                    <td className="p-2 text-right">${totalLiabilities}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Equity */}
            <div>
              <h3 className="font-bold mb-2">Equity</h3>
              <table className="w-full text-sm border">
                <tbody>
                  {balanceSheetData.equity.map((e, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{e.name}</td>
                      <td className="p-2 text-right">${e.amount}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="p-2">Total Equity</td>
                    <td className="p-2 text-right">${totalEquity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="h-64 mt-6">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "Assets", value: totalAssets },
                    { name: "Liabilities", value: totalLiabilities },
                    { name: "Equity", value: totalEquity },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Profit & Loss */}
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border mb-4">
            <tbody>
              {profitLossData.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2 text-right">
                    {row.type === "Income" ? "+" : "-"}${row.amount}
                  </td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="p-2">Net Profit</td>
                <td className="p-2 text-right">${netProfit}</td>
              </tr>
            </tbody>
          </table>

          {/* Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={profitLossData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Month</th>
                <th className="p-2 text-right">Inflow</th>
                <th className="p-2 text-right">Outflow</th>
                <th className="p-2 text-right">Net</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((c, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{c.month}</td>
                  <td className="p-2 text-right">${c.inflow}</td>
                  <td className="p-2 text-right">${c.outflow}</td>
                  <td className="p-2 text-right">${c.inflow - c.outflow}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={cashFlowData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inflow" fill="#4CAF50" />
                <Bar dataKey="outflow" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountReports;
