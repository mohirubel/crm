import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, RotateCcw, FileText,
  BarChart3, Users, ClipboardList, Activity, Edit, ImageIcon, Box, Trash2
} from 'lucide-react';

// This file manages all application menus
export const menuConfig = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    component: 'Dashboard', // Component to render
    color: "bg-blue-100 text-blue-800",
    section: "Core Applications"
  },
  {
    id: 'purchase',
    name: 'Purchase',
    icon: ShoppingCart,
    component: 'Purchase',
    color: "bg-green-100 text-green-800",
    section: "Core Applications"
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: ShoppingCart,
    component: 'Sales',
    color: "bg-indigo-100 text-indigo-800",
    section: "Core Applications"
  },
  {
    id: 'products',
    name: 'Products',
    icon: Package,
    component: 'Products',
    color: "bg-purple-100 text-purple-800",
    section: "Core Applications"
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Warehouse,
    component: 'Inventory',
    color: "bg-yellow-100 text-yellow-800",
    section: "Core Applications"
  },
  {
    id: 'returns',
    name: 'Returns',
    icon: RotateCcw,
    component: 'Returns',
    color: "bg-red-100 text-red-800",
    section: "Core Applications"
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: FileText,
    component: 'Reports',
    color: "bg-teal-100 text-teal-800",
    section: "Core Applications"
  },
  // You can easily add new menus here
  // Example:
  // {
  //   id: 'settings',
  //   name: 'Settings',
  //   icon: Settings,
  //   component: 'Settings',
  //   color: "bg-gray-100 text-gray-800",
  //   section: "Administration"
  // },
];
