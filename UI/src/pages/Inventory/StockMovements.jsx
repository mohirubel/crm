import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCcw,
} from "lucide-react";

const StockMovements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movementTypeFilter, setMovementTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("all");

  const [stockMovements] = useState([
    { id: 1, productName: "iPhone 14 Pro", type: "IN", quantity: 50, reason: "Purchase Order #PO-001", date: "2024-08-28", time: "10:30 AM", reference: "PO-001", supplier: "Apple Inc." },
    { id: 2, productName: "Samsung Galaxy S23", type: "OUT", quantity: 5, reason: "Sales Transaction", date: "2024-08-28", time: "02:15 PM", reference: "SALE-456", supplier: "Customer Sale" },
    { id: 3, productName: "MacBook Air M2", type: "OUT", quantity: 2, reason: "Damage/Return", date: "2024-08-27", time: "11:45 AM", reference: "DMG-789", supplier: "Internal" },
    { id: 4, productName: "AirPods Pro", type: "IN", quantity: 20, reason: "Purchase Order #PO-002", date: "2024-08-26", time: "09:15 AM", reference: "PO-002", supplier: "Apple Inc." },
    { id: 5, productName: "iPad Pro", type: "OUT", quantity: 3, reason: "Sales Transaction", date: "2024-08-25", time: "03:30 PM", reference: "SALE-123", supplier: "Customer Sale" },
    { id: 6, productName: "Sony WH-1000XM4", type: "IN", quantity: 15, reason: "Purchase Order #PO-003", date: "2024-08-25", time: "08:00 AM", reference: "PO-003", supplier: "Sony Electronics" },
    { id: 7, productName: "Dell XPS 13", type: "OUT", quantity: 1, reason: "Employee Assignment", date: "2024-08-24", time: "01:20 PM", reference: "EMP-001", supplier: "Internal" },
    { id: 8, productName: "Apple Watch Series 8", type: "IN", quantity: 12, reason: "Purchase Order #PO-004", date: "2024-08-24", time: "10:45 AM", reference: "PO-004", supplier: "Apple Inc." },
    { id: 9, productName: "Samsung Galaxy S23", type: "OUT", quantity: 8, reason: "Bulk Sales Order", date: "2024-08-23", time: "04:15 PM", reference: "BULK-001", supplier: "Corporate Client" }
  ]);

  const filteredStockMovements = useMemo(() => {
    return stockMovements.filter((m) => {
      const s = searchTerm.toLowerCase();
      const matchesSearch =
        !s ||
        m.productName.toLowerCase().includes(s) ||
        m.reason.toLowerCase().includes(s) ||
        m.reference.toLowerCase().includes(s);
      const matchesType =
        movementTypeFilter === "all" ||
        m.type.toLowerCase() === movementTypeFilter.toLowerCase();
      const matchesDate = !dateFilter || m.date === dateFilter;
      const matchesReason =
        reasonFilter === "all" ||
        m.reason.toLowerCase().includes(reasonFilter.toLowerCase());
      return matchesSearch && matchesType && matchesDate && matchesReason;
    });
  }, [stockMovements, searchTerm, movementTypeFilter, dateFilter, reasonFilter]);

  const totalMovements = stockMovements.length;
  const stockInMovements = stockMovements.filter((m) => m.type === "IN").length;
  const stockOutMovements = stockMovements.filter((m) => m.type === "OUT").length;
  const totalStockIn = stockMovements
    .filter((m) => m.type === "IN")
    .reduce((a, m) => a + m.quantity, 0);
  const totalStockOut = stockMovements
    .filter((m) => m.type === "OUT")
    .reduce((a, m) => a + m.quantity, 0);

  const clearFilters = () => {
    setSearchTerm("");
    setMovementTypeFilter("all");
    setDateFilter("");
    setReasonFilter("all");
  };

  const getMovementBadge = (type) =>
    type === "IN" ? (
      <Badge className="bg-green-100 text-green-800 flex items-center">
        <ArrowUpCircle className="h-3 w-3 mr-1" /> Stock In
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 flex items-center">
        <ArrowDownCircle className="h-3 w-3 mr-1" /> Stock Out
      </Badge>
    );

  const getMovementIcon = (type) =>
    type === "IN" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <h2 className="font-bold tracking-tight uppercase">
          Stock Transactions
        </h2>
        {/* <p className="text-muted-foreground">
          Track all stock in/out movements
        </p> */}
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovements}</div>
            <p className="text-xs text-muted-foreground">All transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Stock In</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stockInMovements}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalStockIn} units added
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Stock Out</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stockOutMovements}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalStockOut} units removed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totalStockIn - totalStockOut >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {totalStockIn - totalStockOut >= 0 ? "+" : ""}
              {totalStockIn - totalStockOut}
            </div>
            <p className="text-xs text-muted-foreground">Net change</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={movementTypeFilter}
              onValueChange={setMovementTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reasonFilter} onValueChange={setReasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Reasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="damage">Damage/Return</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Calendar className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 w-auto"
              />
            </div>
            <div className="flex items-end">
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600"
              onClick={clearFilters}
            >
              <RefreshCcw className="h-4 w-4" />
              Clear Filter
            </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm border">
              <thead className="bg-gray-50">
                <tr className="text-[14px]">
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                  <th className="px-4 py-2 text-left">Reference</th>
                  <th className="px-4 py-2 text-left">Supplier</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredStockMovements.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-0.5 font-medium">{m.productName}</td>
                    <td className="px-4 py-0.5">{getMovementBadge(m.type)}</td>
                    <td className="px-4 py-0.5">
                      <div className="flex items-center space-x-1">
                        {getMovementIcon(m.type)}
                        <span
                          className={`font-medium ${
                            m.type === "IN" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {m.type === "IN" ? "+" : "-"}
                          {m.quantity} units
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-0.5 text-gray-500">{m.reason}</td>
                    <td className="px-4 py-0.5">
                      <Badge variant="outline">{m.reference}</Badge>
                    </td>
                    <td className="px-4 py-0.5 text-gray-500">{m.supplier}</td>
                    <td className="px-4 py-0.5 text-gray-500">{m.date}</td>
                    <td className="px-4 py-0.5 text-gray-500">{m.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStockMovements.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Activity className="h-10 w-10 mx-auto mb-2" />
              No movements found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest 5 stock movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stockMovements.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getMovementIcon(m.type)}
                  <div>
                    <p className="font-medium">{m.productName}</p>
                    <p className="text-xs text-gray-500">{m.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      m.type === "IN" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {m.type === "IN" ? "+" : "-"}
                    {m.quantity} units
                  </p>
                  <p className="text-xs text-gray-500">
                    {m.date} at {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default StockMovements;
