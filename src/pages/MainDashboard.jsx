import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { menuConfig } from '../config/menu-config';

const MainDashboard = ({ onMenuClick }) => {
  const { logout } = useAuth();

  // Group menus by section from menuConfig
  const applicationSections = menuConfig.reduce((acc, app) => {
    const section = app.section || "Other";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(app);
    return acc;
  }, {});

  const AppTile = ({ app }) => {
    const Icon = app.icon;
    return (
      <div
        onClick={() => onMenuClick(app.id)}
        className={`${app.color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 min-h-[80px] flex flex-col justify-center items-center`}
      >
        <div className="mb-2"><Icon size={22} /></div>
        <div className="text-sm font-medium text-center">{app.name}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-xl font-bold">bhsale</span>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className="text-sm text-gray-600 cursor-pointer"
              onClick={logout}
            >
              Log Out
            </span>
            <span className="text-gray-300">|</span>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
              <User className="w-4 h-4 mr-1" />
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        {Object.entries(applicationSections).map(([title, apps]) => (
          <div key={title} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {apps.map((app) => (
                <AppTile key={app.id} app={app} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MainDashboard;
