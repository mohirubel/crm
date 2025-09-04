import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, RotateCcw, FileText,
  BarChart3, Users, ClipboardList, Activity, Edit, ImageIcon, Box, Trash2,
  UserCog,
  UsersIcon,
  FileEditIcon,
  SettingsIcon,
  User2Icon
} from 'lucide-react';

// This file manages all application menus
export const menuConfig = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    component: 'Dashboard', // Component to render
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'purchase',
    name: 'Purchase',
    icon: ShoppingCart,
    component: 'Purchase',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: ShoppingCart,
    component: 'Sales',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'products',
    name: 'Products',
    icon: Package,
    component: 'Products',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Warehouse,
    component: 'Inventory',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },

  {
    id: 'HR',
    name: 'HR',
    icon: UserCog,
    component: 'HR',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'SalesReports',
    name: 'Reports',
    icon: FileText,
    component: 'SalesReports',
    color: "bg-white text-black-800",
    section: "Core Applications"
  },
  {
    id: 'Security',
    name: 'Security',
    icon: SettingsIcon,
    component: 'security',
    color: "bg-white text-black-800",
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
