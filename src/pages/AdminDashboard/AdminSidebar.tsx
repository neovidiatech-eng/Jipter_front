import { 
  X, 
  LogOut, 
  LayoutDashboard, 
  UserPlus, 
  PlayCircle, 
  BookOpen, 
  FolderOpen, 
  Settings, 
  PlusCircle, 
  HelpCircle  
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import { adminDashboardRoutes } from './adminDashboardRoutes';
import { useTranslation } from 'react-i18next';
import SidebarToggle from '../../components/layout/SidebarToggle';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function AdminSidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const { settings } = useSettings();
  const [expandedItems, setExpandedItems] = useState<string[]>(['users']);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full bg-white border-${language === 'ar' ? 'l' : 'r'} border-gray-200 ${isCollapsed ? 'w-20' : 'w-72'} transform transition-all duration-300 z-50 lg:translate-x-0 ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'
          }`}
      >
        {/* Toggle Button for Desktop */}
        <div className="hidden lg:block">
          <SidebarToggle 
            isCollapsed={isCollapsed} 
            onToggle={() => setIsCollapsed(!isCollapsed)} 
          />
        </div>

        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className={`p-6 mb-2 flex items-center gap-3 transition-all ${isCollapsed ? 'px-4 justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-[#2a286b] flex items-center justify-center shrink-0 shadow-sm relative">
            <div className="absolute w-3 h-3 border-2 border-white rounded-[4px] top-2 left-2"></div>
            <div className="absolute w-3 h-3 border-2 border-white rounded-[4px] bottom-2 right-2"></div>
          </div>
          <div className={`text-left transition-all duration-300 ${isCollapsed ? 'opacity-0 invisible w-0' : 'opacity-100'}`}>
            <h2 className="text-xl font-black text-gray-900 tracking-tight whitespace-nowrap">EduAdmin Pro</h2>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col h-[calc(100vh-100px)]">
          <nav className="p-4 flex-1 overflow-y-auto no-scrollbar">
            <div className="space-y-2">
              <NavLink
                to="/dashboard"
                end
                onClick={onClose}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                  ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                `}
                title={isCollapsed ? "Dashboard" : ''}
              >
                <LayoutDashboard className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && <span className={`text-sm flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>Dashboard</span>}
              </NavLink>
              <NavLink
                              to="/dashboard/students"
                              onClick={onClose}
                              className={({ isActive }) => `
                                w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                                ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                              `}
                              title={isCollapsed ? "Sessions" : ''}
                            >
                              <PlayCircle className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
                              {!isCollapsed && <span className={`text-sm flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>Sessions</span>}
              </NavLink>

               <NavLink
                to="/dashboard/curriculum"
                onClick={onClose}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                  ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                `}
                title={isCollapsed ? "Curriculum" : ''}
              >
                <BookOpen className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && <span className={`text-sm flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>Curriculum</span>}
              </NavLink>
              <NavLink
                to="/dashboard/requests"
                onClick={onClose}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                  ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                `}
                title={isCollapsed ? "Requests" : ''}
              >
                <UserPlus className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && <span className={`text-sm flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>Requests</span>}
              </NavLink>

              

             

              <NavLink
                to="/dashboard/library"
                onClick={onClose}
                className={({ isActive }) => `
                  w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                  ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                `}
                title={isCollapsed ? "Library" : ''}
              >
                <FolderOpen className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && <span className={`text-sm flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>Library</span>}
              </NavLink>
            </div>
          </nav>

          {/* Sidebar Footer Section */}
          <div className="p-4 mt-auto space-y-2 border-t border-gray-100">
            {/* Add New Resource Button */}
            <button 
              className={`w-full flex items-center gap-4 py-3.5 rounded-xl font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all shadow-md shadow-indigo-100 ${isCollapsed ? 'justify-center px-2' : 'px-5'}`}
              title={isCollapsed ? "Add New Resource" : ''}
            >
              <PlusCircle className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">Add new resource</span>}
            </button>

            {/* Settings */}
            <NavLink
              to="/dashboard/settings"
              onClick={onClose}
              className={({ isActive }) => `
                w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
              `}
              title={isCollapsed ? "Settings" : ''}
            >
              <Settings className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="text-sm">Settings</span>}
            </NavLink>

            {/* Support */}
            <NavLink
              to="/dashboard/support"
              onClick={onClose}
              className={({ isActive }) => `
                w-full flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-5'} py-3.5 rounded-xl font-bold transition-all
                ${isActive ? 'bg-[#f0f4ff] text-[#2563eb]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
              `}
              title={isCollapsed ? "Support" : ''}
            >
              <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="text-sm">Support</span>}
            </NavLink>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-4 py-3.5 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all mt-2 ${isCollapsed ? 'justify-center px-2' : 'px-5'}`}
              title={isCollapsed ? t('logout') : ''}
            >
              <LogOut className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="text-sm">{t('logout')}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
