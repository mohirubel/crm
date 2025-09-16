import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

const initialData = [
  { id: 1, type: "Asset", head: "Current Assets", name: "Cash", balance: 15000 },
  { id: 2, type: "Asset", head: "Current Assets", name: "Accounts Receivable", balance: 8500 },
  { id: 3, type: "Asset", head: "Current Assets", name: "Inventory", balance: 12000 },
  { id: 4, type: "Asset", head: "Current Assets", name: "Prepaid Expenses", balance: 2000 },
  { id: 5, type: "Asset", head: "Non-Current Assets", name: "Property, Plant & Equipment", balance: 60000 },
  { id: 6, type: "Liability", head: "Current Liabilities", name: "Accounts Payable", balance: 7000 },
  { id: 7, type: "Liability", head: "Current Liabilities", name: "Salaries Payable", balance: 3000 },
  { id: 8, type: "Liability", head: "Non-Current Liabilities", name: "Long-Term Loans", balance: 20000 },
  { id: 9, type: "Equity", head: "Equity", name: "Owner's Capital", balance: 50000 },
  { id: 10, type: "Revenue", head: "Sales Revenue", name: "Domestic Sales", balance: 40000 },
  { id: 11, type: "Expense", head: "Operating Expenses", name: "Salaries & Wages", balance: 20000 },
  { id: 12, type: "Expense", head: "Operating Expenses", name: "Rent Expense", balance: 5000 },
  { id: 13, type: "Revenue", head: "Other Income", name: "Dividend income", balance: 34000 },
];

export default function ChartOfAccountsNested() {
  // Group by type -> head -> accounts
  const grouped = initialData.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = {};
    if (!acc[item.type][item.head]) acc[item.type][item.head] = [];
    acc[item.type][item.head].push(item);
    return acc;
  }, {});

  const typeKeys = Object.keys(grouped);

  // ✅ First type open by default, others closed
  const [openTypes, setOpenTypes] = useState(
    typeKeys.length ? { [typeKeys[0]]: true } : {}
  );
  const [openHeads, setOpenHeads] = useState({});

  const toggleType = (type) =>
    setOpenTypes((p) => ({ ...p, [type]: !p[type] }));

  const toggleHead = (type, head) =>
    setOpenHeads((p) => {
      const key = `${type}||${head}`;
      return { ...p, [key]: !p[key] };
    });

  return (
    <div className="space-y-4">
      <h2 className="font-bold uppercase">Chart of Accounts</h2>

      {typeKeys.map((type) => (
        <Card className="p-0" key={type}>
          <CardContent className="p-0">
            {/* Type header */}
            <button
              onClick={() => toggleType(type)}
              className="w-full text-[14px] flex justify-between items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <span className="font-semibold text-gray-800">{type}</span>
              {openTypes[type] ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {/* Show heads only if this type is open */}
            {openTypes[type] && (
              <div>
                {Object.entries(grouped[type]).map(([head, accounts]) => {
                  const headKey = `${type}||${head}`;
                  const subtotal = accounts.reduce(
                    (s, a) => s + (a.balance || 0),
                    0
                  );

                  return (
                    <div key={headKey} className="border-t">
                      {/* Head row */}
                      <div className="flex items-center justify-between px-4 py-2 bg-white">
                        <button
                          onClick={() => toggleHead(type, head)}
                          className="flex text-[14px] items-center gap-2 cursor-pointer"
                        >
                          {openHeads[headKey] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-medium">{head}</span>
                        </button>

                        <div className="text-sm text-gray-600">
                          Subtotal: {subtotal.toLocaleString()}
                        </div>
                      </div>

                      {/* Accounts table */}
                      {openHeads[headKey] && (
                        <table className="min-w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left">Account Name</th>
                              <th className="px-4 py-2 text-right">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {accounts.map((acc) => (
                              <tr key={acc.id}>
                                <td className="px-4 py-2">{acc.name}</td>
                                <td className="px-4 py-2 text-right">
                                  {Number(acc.balance).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
