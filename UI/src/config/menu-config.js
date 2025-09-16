import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, RotateCcw, FileText,
  BarChart3, Users, ClipboardList, Activity, Edit, ImageIcon, Box, Trash2,
  UserCog,
  UsersIcon,
  FileEditIcon,
  SettingsIcon,
  User2Icon,
  BadgePoundSterling,
  UserCheck2Icon,
  UserCheck2,
  Trello,
  BrickWallFire,
  TrelloIcon,
  LucideShieldCheck,
  PackageCheckIcon
} from 'lucide-react';

// This file manages all application menus
export const menuConfig = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    component: 'Dashboard', // Component to render
    color: "bg-white text-black-800",
    section: " "
  },
  {
    id: 'employee-list',
    name: 'HR',
    icon: UserCog,
    component: 'EmployeeList',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'current-stock',
    name: 'Inventory',
    icon: Warehouse,
    component: 'currentStock',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'customers',
    name: 'Sales',
    icon: ShoppingCart,
    component: 'Sales',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'suppliers',
    name: 'Purchase',
    icon: ShoppingCart,
    component: 'Purchase',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'chart-of-accounts',
    name: 'Account',
    icon: BadgePoundSterling,
    component: 'Account',
    color: "bg-white text-black-800",
    section: "  "
  },
  // {
  //   id: 'products',
  //   name: 'Products',
  //   icon: PackageCheckIcon,
  //   component: 'Products',
  //   color: "bg-white text-black-800",
  //   section: "  "
  // },
  {
    id: 'leads',
    name: 'CRM',
    icon: BrickWallFire,
    component: 'CRM',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: TrelloIcon,
    component: 'Projects',
    color: "bg-white text-black-800",
    section: "  "
  },
  {
    id: 'reports/sales-reports',
    name: 'Reports',
    icon: FileText,
    component: 'SalesReports',
    color: "bg-white text-black-800",
    section: "   "
  },
  {
    id: 'my-profile',
    name: 'Security',
    icon: LucideShieldCheck,
    component: 'MyProfile',
    color: "bg-white text-black-800",
    section: "   "
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
