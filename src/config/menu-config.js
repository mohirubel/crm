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
  // {
  //   id: 'inventory',
  //   name: 'Inventory',
  //   icon: Warehouse,
  //   component: 'Inventory',
  //   color: "bg-white text-black-800",
  //   section: "Core Applications"
  // },

  {
    id: 'CreateBrand',
    name: 'Create Brands',
    icon: FileEditIcon,
    component: 'CreateBrand',
    color: "bg-white text-black-800",
    section: "Create"
  },
  {
    id: 'createCategory',
    name: 'Create Category',
    icon: FileEditIcon,
    component: 'CreateCategory',
    color: "bg-white text-black-800",
    section: "Create"
  },
  {
    id: 'CreateProductsPage',
    name: 'Create Products',
    icon: FileEditIcon,
    component: 'CreateProductsPage',
    color: "bg-white text-black-800",
    section: "Create"
  },
  {
    id: 'UserProfile',
    name: 'User Profile',
    icon: UserCog,
    component: 'UserProfile',
    color: "bg-white text-black-800",
    section: "Access Management"
  },
  {
    id: 'AllUser',
    name: 'All User',
    icon: UsersIcon,
    component: 'AllUser',
    color: "bg-white text-black-800",
    section: "Access Management"
  },
  {
    id: 'returns',
    name: 'Returns',
    icon: RotateCcw,
    component: 'Returns',
    color: "bg-white text-black-800",
    section: "Access Management"
  },
  {
    id: 'SalesReports',
    name: 'Reports',
    icon: FileText,
    component: 'SalesReports',
    color: "bg-white text-black-800",
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
