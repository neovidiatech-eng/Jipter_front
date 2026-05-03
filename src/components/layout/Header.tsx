import { Bell, LogOut, Menu, Play, Search, Command, ChevronDown, HelpCircle, Plus, MessageSquare } from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";
import { useSessions } from "../../contexts/SessionsContext";
import React, { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../../features/student/hooks/useProfile";
import { useCreateSchedule } from "../../features/admin/hooks/useSchedules";
import { SessionFormData } from "../../lib/schemas/SessionSchema";
import AddSessionModal from "../modals/AddSessionModal";

interface HeaderProps {
  onMenuClick?: () => void;
  userRole: "admin" | "teacher" | "student";
  userName?: string;
  userEmail?: string;
  isCollapsed?: boolean;
}

// صغير reusable component
const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-sm md:text-xl font-black leading-none text-slate-800">
      {value}
    </span>
    <span className="text-[7px] md:text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
      {label}
    </span>
  </div>
);



export default function Header({
  onMenuClick,
  userRole,
  userName,
  userEmail,
  isCollapsed,
}: HeaderProps) {
  const { settings } = useSettings();
  const { countdown, isSessionReady } = useSessions();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: profileResponse, isLoading, isError } = useProfile();

  const [showAddModal, setShowAddModal] = useState(false);
  const createSchedule = useCreateSchedule();

  const handleAddSession = async (data: SessionFormData) => {
    try {
      await createSchedule.mutateAsync({
        studentId: data.student,
        teacherId: data.teacher,
        subject_id: data.subject,
        title: data.title,
        description: data.description || '',
        link: data.meetingLink || '',
        notes: data.notes || '',
        start_time: `${data.sessionDate}T${data.startTime}:00.000Z`,
        type: data.type,
        notification_Time: data.notification_Time
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Add session failed:', error);
    }
  };

  const profileData = profileResponse?.data;

  // تحسين الأداء بدل function عادية
  const marginClass = useMemo(() => {
    if (userRole === "student") return "";
    return isCollapsed ? "lg:ml-20" : "lg:ml-72";
  }, [userRole, isCollapsed]);

  const isStudent = userRole === "student";
  const isTeacherOrStudent = userRole === "teacher" || isStudent;
  const navigate = useNavigate();
  const location = useLocation();
  const isSessionsPage = location.pathname.includes("/sessions");
  const isCurriculumPage = location.pathname.includes("/curriculum");

  const studentInfo = {
    name: profileData?.user?.name || "---",
    plan: profileData?.plan?.name_en || "Free Plan",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.user?.name || "U")}&background=random`,
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  return (
    <header
      className={`bg-white sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 ${marginClass}`}
    >
      <div
        className={`flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-3 md:py-0 md:h-[90px] gap-3 md:gap-0 ${isStudent ? "grid grid-cols-4" : ""}`}
      >
        {/* 1. حاوية اللوجو */}
        <div
          className={`flex items-center relative hover: cursor-pointer ${isStudent ? "col-span-1" : ""}`}
          onClick={() => navigate("/")}
        >
          {isStudent && (
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col items-center justify-center p-2 bg-[#2049BF] rounded-[12px] w-[39px] h-[39px]">
                <span className="text-white text-xl font-bold">J</span>
              </div>
              <span className="text-black text-xl font-bold">Jupiter</span>
            </div>
          )}

          {!isStudent && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* 2. حاوية الوقت وزر الانضمام */}
        <div
          className={`flex items-center justify-center gap-4 md:gap-12 ${isStudent ? "col-span-2" : "flex-1"}`}
        >
          {isTeacherOrStudent && (
            <div className="flex items-center gap-4 md:gap-12 min-w-0">
              <div className="flex items-center gap-2 md:gap-4 bg-slate-50/80 px-4 md:px-6 py-2 md:py-3 rounded-[20px] border border-slate-100">
                <span className="hidden sm:inline-block text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap mr-2">
                  Next Session:
                </span>
                <div className="flex gap-4 md:gap-8 items-center">
                  <TimeBox value={countdown.days} label="Days" />
                  <Separator />
                  <TimeBox value={countdown.hours} label="Hours" />
                  <Separator />
                  <TimeBox value={countdown.minutes} label="Min" />
                </div>
              </div>

              <button
                disabled={!isSessionReady}
                className={`hidden md:flex items-center gap-2 px-4 md:px-8 py-2 md:py-3.5 rounded-2xl text-[10px] md:text-sm font-bold whitespace-nowrap transition-all ${
                  isSessionReady
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-[#f1f5f9] text-slate-400 cursor-not-allowed"
                }`}
              >
                <Play size={16} fill="currentColor" />
                {isSessionReady ? "Join Now" : "Join Session"}
              </button>
            </div>
          )}

          {!isTeacherOrStudent && (
            <div className="flex w-full items-center pl-4">
              {isSessionsPage || isCurriculumPage ? (
                <div className="flex w-full items-center gap-8 pl-4 h-[90px]">
                  <div className="flex items-center h-full gap-8">
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap h-full flex items-center border-b-[3px] border-transparent hover:border-gray-300 transition-colors pt-1">Overview</button>
                    <button className="text-sm font-bold text-[#6366f1] border-b-[3px] border-[#6366f1] whitespace-nowrap h-full flex items-center pt-1">Batch List</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap h-full flex items-center border-b-[3px] border-transparent hover:border-gray-300 transition-colors pt-1">Conflicts</button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center gap-12 pl-4">
                  {/* Search Bar */}
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search resources, students, or services..." 
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all text-left"
                      dir="ltr"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Command className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">K</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="hidden xl:flex items-center gap-8">
                    <a href="#" className="text-sm font-bold text-gray-900">Directory</a>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Reports</a>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Archive</a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. حاوية البروفايل */}
        <div
          className={`flex items-center gap-2 md:gap-8 ${isStudent ? "col-span-1 justify-end" : ""}`}
        >
          {isTeacherOrStudent && (
            <>
              <button className="md:hidden flex items-center gap-2 bg-[#f1f5f9] text-slate-400 px-4 py-2 rounded-xl text-[10px] font-bold cursor-not-allowed">
                <Play size={14} fill="currentColor" />
                Join
              </button>
              <DesktopProfile navigate={navigate} studentName={studentInfo.name} studentPlan={studentInfo.plan} studentAvatar={studentInfo.avatar} />
              {isStudent && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-500 rounded-2xl hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              )}
            </>
          )}

          {!isTeacherOrStudent && (
            <div className="flex items-center gap-6">
              {/* Right Side Actions */}
              {!isSessionsPage && (
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 text-[#5e5ce6] text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg leading-none">+</span> Create Session
                </button>
              )}
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-500" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <MessageSquare className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-100">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-bold text-gray-900 leading-none">{userName || 'User'}</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">{userRole}</p>
                </div>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'U')}&background=1e1b4b&color=fff`} alt="User" className="w-10 h-10 rounded-full object-cover" />
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      <AddSessionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSession}
      />
    </header>
  );
}

const Separator = () => (
  <span className="text-slate-300 font-bold text-xs md:text-lg mb-1 md:mb-4">
    :
  </span>
);

const MenuItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-slate-600">
    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-bold">{label}</span>
  </button>
);

const DesktopProfile = ({
  className = "",
  navigate,
  studentName,
  studentPlan,
  studentAvatar,
}: {
  className?: string;
  navigate: any;
  studentName: string;
  studentPlan: string;
  studentAvatar: string;
}) => (
  <div className={`hidden md:flex items-center gap-4 ${className}`}>
    <button className="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#2563eb] hover:bg-blue-50 transition-all border border-slate-100 relative">
      <Bell size={20} />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
    </button>

    <div
      className="flex items-center gap-3 pl-2 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all"
      onClick={() => navigate("/student-dashboard/profile")}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100">
         <img
                src={studentAvatar}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
      </div>
      <div className="flex ">
        <div className="text-right hidden xl:block">
          <p className="text-sm font-bold text-slate-800 leading-none">
            {studentName}
          </p>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
            {studentPlan}
          </p>
        </div>
      </div>
    </div>
  </div>
);
