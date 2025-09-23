import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  FileText,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  Users,
  Shield,
  BadgePoundSterling,
  ChartColumn,
  CircleCheckBig,
  Grid2x2,
} from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Layout = () => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Separate states
  const [openTopMenus, setOpenTopMenus] = useState({}); // controls top dropdowns
  const [openSidebarMenus, setOpenSidebarMenus] = useState({}); // controls sidebar groups (open/closed)
  const topMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close TOP dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topMenuRef.current && !topMenuRef.current.contains(event.target)) {
        setOpenTopMenus({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => logout();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Menu structure
  const menuStructure = {
    dashboard: {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
        hr: {
      icon: Users,
      label: "HR",
      rootPath: "/employee-list",
      submenus: [
        { path: "/employee-list", label: "Employee List" },
        { path: "/attendance", label: "Attendance" },
        { path: "/LeaveManagement", label: "Leave Management" },
        { path: "/EmployeeSalaryList", label: "Employee Salary List" },
      ],
    },
        inventory: {
      icon: Warehouse,
      label: "Inventory",
      rootPath: "/current-stock",
      submenus: [
        { path: "/current-stock", label: "Products Stock" },
        { path: "/stock-transactions", label: "Stock Transactions" },
        { path: "/warehouses", label: "Warehouses" },
        // { path: "/expiry-damage", label: "Expiry & Damage" },
        // { path: "/stock-report", label: "Stock Report" },
      ],
    },
    sales: {
      icon: ShoppingCart,
      label: "Sales",
      rootPath: "/customers",
      submenus: [
        // { path: "/sales", label: "Sales" },
        { path: "/customers", label: "Customers" },
        { path: "/sales-orders", label: "Sales Orders" },
        { path: "/invoices", label: "Invoices" },
      ],
    },
    // products: {
    //   icon: Package,
    //   label: "Products",
    //   rootPath: "/products",
    //   submenus: [
    //     { path: "/products", label: "All Products" },
    //     { path: "/create-product", label: "Create Products" },
    //     { path: "/create-brand", label: "Create Brand" },
    //     { path: "/create-category", label: "Create Category" },
    //     { path: "/returns", label: "Return" },
    //   ],
    // },
    purchase: {
      icon: ShoppingCart,
      label: "Purchase",
      rootPath: "/suppliers",
      submenus: [
        // { path: "/purchase", label: "Products Stock" },
        { path: "/suppliers", label: "Suppliers" },
        { path: "/purchase-orders", label: "Purchase Orders" },
        { path: "/goods-receiving", label: "Goods Receiving" },
      ],
    },
    account: {
      icon: BadgePoundSterling,
      label: "Account",
      rootPath: "/chart-of-accounts",
      submenus: [
        { path: "/chart-of-accounts", label: "Chart Of Accounts" },
        { path: "/account-types", label: "Account Types" },
        { path: "/journal-entries", label: "Journal Entries" },
        { path: "/payments-receipts", label: "Payments Receipts" },
        { path: "/account-reports", label: "Reports" },
      ],
    },
    crm: {
      icon: ChartColumn,
      label: "CRM",
      rootPath: "/leads",
      submenus: [
        { path: "/leads", label: "Leads" },
        { path: "/opportunities", label: "Opportunities" },
        { path: "/support-tickets", label: "Support Tickets" },
      ],
    },
    projects: {
      icon: CircleCheckBig,
      label: "Projects",
      rootPath: "/projects",
      submenus: [
        { path: "/projects", label: "Projects" },
        { path: "/tasks", label: "Tasks" },
      ],
    },
    reports: {
      icon: FileText,
      label: "Reports",
      rootPath: "/reports/sales-reports",
      submenus: [
        { path: "/reports/sales-reports", label: "Sales Reports" },
        { path: "/reports/profit-loss", label: "Profit & Loss" },
        { path: "/reports/best-products", label: "Best Products" },
        { path: "/reports/InventoryReports", label: "Inventory Reports" },
        { path: "/reports/date-over", label: "Date Over" },
        { path: "/reports/templates", label: "Templates" },
        { path: "/reports/HRReports", label: "HR Reports" },
        { path: "/reports/FinanceReports", label: "Finance Reports" },
      ],
    },
    security: {
      icon: Shield,
      label: "Security",
      rootPath: "/my-profile",
      submenus: [
        { path: "/my-profile", label: "My Profile" },
        { path: "/user-list", label: "User List" },
        { path: "/Security/RolesPermissions", label: "Roles & Permissions" },
        { path: "/Security/AuditLogs", label: "Audit Logs" },
      ],
    },
  };

  const currentPath = location.pathname;

  // Get current top-level menu key for sidebar
  const getCurrentMenuKey = () => {
    for (const [key, menu] of Object.entries(menuStructure)) {
      if (menu.path && menu.path === currentPath) return key;
      if (menu.submenus) {
        const match = menu.submenus.find(
          (submenu) => submenu.path === currentPath
        );
        if (match) return key;
      }
    }
    return null;
  };
  const currentMenuKey = getCurrentMenuKey();
  const isActivePath = (path) => location.pathname === path;

  // ---------- Fix: ensure top menus close correctly ----------
  const handleTopMenuClick = (menuKey, menu) => {
    // if it has submenus -> toggle it but ensure only one top menu open at a time
    if (menu.submenus) {
      setOpenTopMenus((prev) => {
        const currentlyOpen = !!prev[menuKey];
        // if currently open -> close all; otherwise open only this
        return currentlyOpen ? {} : { [menuKey]: true };
      });
      if (menu.rootPath) {
        navigate(menu.rootPath);
      }
    } else if (menu.path) {
      // If it's a direct link (no submenu), close any open top dropdowns and navigate
      setOpenTopMenus({});
      navigate(menu.path);
    }
  };

  // Helper to navigate and also close top dropdowns
  const navigateAndCloseTop = (path) => {
    setOpenTopMenus({});
    navigate(path);
  };
  
  // Render top menu
  const renderTopMenuItem = (menuKey) => {
    const menu = menuStructure[menuKey];
    if (!menu) return null;

    const hasDropdown = !!menu.submenus;

    return (
      <div className="relative " key={menuKey}>
        <button
          onClick={() => handleTopMenuClick(menuKey, menu)}
          className={`px-2 py-2 cursor-pointer rounded-md text-sm font-medium flex items-center ${
            isActivePath(menu.path)
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {menu.label}
          {hasDropdown && (
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                openTopMenus[menuKey] ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {openTopMenus[menuKey] && hasDropdown && (
          <div className="absolute mt-2 w-44 bg-white shadow-lg border rounded-md z-50">
            {menu.submenus.map((submenu) => (
              <button
                key={submenu.path}
                onClick={() => navigateAndCloseTop(submenu.path)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  isActivePath(submenu.path)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {submenu.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render sidebar menu (current group only)
  const renderSidebarMenuItem = (menuKey) => {
    const menu = menuStructure[menuKey];
    if (!menu) return null;

    const Icon = menu.icon;
    const hasSubmenus = !!menu.submenus;

    // sidebar menus open by default unless user toggled
    const isOpen = openSidebarMenus[menuKey] ?? true;

    const toggleMenu = () => {
      setOpenSidebarMenus((prev) => ({ ...prev, [menuKey]: !isOpen }));
    };

    if (hasSubmenus) {
      return (
        <div key={menuKey}>
          <button
            onClick={toggleMenu}
            className={`w-full flex items-center justify-between cursor-pointer rounded-lg p-2 transition-colors ${
              isOpen
                ? "bg-gray-100 text-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center">
              <Icon className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">{menu.label}</span>}
            </span>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {isOpen && sidebarOpen && menu.submenus && (
            <ul className="ml-3 mt-2 space-y-1">
              {menu.submenus.map((submenu) => (
                <li key={submenu.path}>
                  <button
                    onClick={() => {
                      // navigate; top menus should close when navigating via sidebar too
                      setOpenTopMenus({});
                      navigate(submenu.path);
                    }}
                    className={`w-full text-left p-2 rounded-md text-sm cursor-pointer ${
                      isActivePath(submenu.path)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {submenu.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <button
        key={menuKey}
        onClick={() => {
          setOpenTopMenus({}); // close any top dropdowns
          navigate(menu.path);
        }}
        className={`w-full flex items-center rounded-lg p-2 ${
          isActivePath(menu.path)
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        <Icon className="h-5 w-5" />
        {sidebarOpen && <span className="ml-3">{menu.label}</span>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-30">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setOpenTopMenus({});
                navigate("/");
              }}
            >
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Grid2x2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl min-w-24 font-bold text-gray-900 capitalize">
                {currentMenuKey}
              </h1>
            </div>

            {/* Top Menu Items */}
            <div className="hidden lg:flex space-x-3.5 2xl:space-x-4" ref={topMenuRef}>
              {Object.keys(menuStructure).map(renderTopMenuItem)}
            </div>

            {/* User Menu */}
            <div className="ml-auto sm:ml-0 mr-2 sm:mr-0">
              {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={user?.avatarUrl || ""}
                        alt={user?.name}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48 mt-2 mr-2">
                  <DropdownMenuLabel className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{user?.name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4 text-gray-500" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-0 left-0 bg-white shadow-lg border-r z-40 transition-all duration-300
        ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-16"
        } lg:translate-x-0`}
      >
        <div className="p-3 flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            {sidebarOpen && (
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            )}
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sidebar Items */}
          <nav className="space-y-2 flex-1">
            {currentMenuKey && renderSidebarMenuItem(currentMenuKey)}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Main Content */}
      <main
        className={`pt-20 p-6 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        } ml-0`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
