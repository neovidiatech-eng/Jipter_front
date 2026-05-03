import { X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { teacherDashboardRoutes } from "./teacherDashboardRoutes.tsx";

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function TeacherSidebar({
  isOpen,
  onClose,
  isCollapsed,
}: TeacherSidebarProps) {
  const resolvePath = (path: string) => {
    if (path === "") return "/teacher-dashboard";
    return `/teacher-dashboard/${path}`;
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-50 lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-72"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header with Logo and Close Button */}
        <div
          className={`p-8 transition-all ${isCollapsed ? "px-4 flex justify-center" : "flex items-center justify-between"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold font-['Outfit'] tracking-tight text-[#1e293b]">
                JUPITER
              </span>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-slate-50 rounded-md text-slate-400"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Menu Items from teacherDashboardRoutes */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {teacherDashboardRoutes.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={resolvePath(item.path)}
                end={item.path === ""}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-4 ${isCollapsed ? "justify-center px-0" : "px-5"} py-3.5 rounded-xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-[#2563eb] text-white shadow-xl shadow-blue-500/25"
                      : "text-slate-400 hover:bg-blue-50/50 hover:text-[#2563eb]"
                  }
                `}
              >
                {Icon && (
                  <Icon
                    size={19}
                    className={`${isCollapsed ? "" : "shrink-0"}`}
                  />
                )}
                {!isCollapsed && (
                  <span className="text-sm font-bold tracking-wide">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout at Bottom */}
        <div className="p-6 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all group"
          >
            <LogOut size={19} />
            {!isCollapsed && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
