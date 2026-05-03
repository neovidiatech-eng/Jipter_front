import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import TeacherSidebar from './TeacherSidebar';

interface TeacherDashboardLayoutProps {
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({ children }: TeacherDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-['Inter']" dir="ltr">
      <Header
        userRole="teacher"
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={isCollapsed}
      />

      <div className="flex-1 flex w-full overflow-hidden">
        <TeacherSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main className={`flex-1 min-w-0 overflow-x-hidden overflow-y-auto w-full transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
          <div className="min-h-full w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
