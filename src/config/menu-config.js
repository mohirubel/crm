import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, RotateCcw, FileText,
  BarChart3, Users, ClipboardList, Activity, Edit, ImageIcon, Box, Trash2,
  UserCog,
  UsersIcon,
  FileEditIcon
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
    color: "bg-purple-100 text-purple-800",
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
    color: "bg-indigo-100 text-indigo-800",
    section: "Core Applications"
  },

  {
    id: 'CreateBrand',
    name: 'New Brand',
    icon: FileEditIcon,
    component: 'CreateBrand',
    color: "bg-teal-100 text-teal-800",
    section: "Create Component"
  },
  {
    id: 'createCategory',
    name: 'Create Category',
    icon: FileEditIcon,
    component: 'CreateCategory',
    color: "bg-teal-100 text-teal-800",
    section: "Create Component"
  },
  {
    id: 'CreateProductsPage',
    name: 'Add Products',
    icon: FileEditIcon,
    component: 'CreateProductsPage',
    color: "bg-teal-100 text-teal-800",
    section: "Create Component"
  },
  {
    id: 'UserProfile',
    name: 'User Profile',
    icon: UserCog,
    component: 'UserProfile',
    color: "bg-green-100 text-green-800",
    section: "Access Management"
  },
  {
    id: 'AllUser',
    name: 'All User',
    icon: UsersIcon,
    component: 'AllUser',
    color: "bg-green-100 text-green-800",
    section: "Access Management"
  },
  {
    id: 'returns',
    name: 'Returns',
    icon: RotateCcw,
    component: 'Returns',
    color: "bg-green-100 text-green-800",
    section: "Access Management"
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: FileText,
    component: 'Reports',
    color: "bg-green-100 text-green-800",
    section: "Access Management"
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
