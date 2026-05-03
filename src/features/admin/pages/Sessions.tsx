import { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, Edit, ExternalLink, MoreVertical, ChevronDown, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchSchedules, useCreateSchedule, useCreateRecurringSchedule, useUpdateSchedule, useDeleteSchedule, useDeleteGroupedSchedule } from '../hooks/useSchedules';
import AddSessionModal from '../../../components/modals/AddSessionModal';
import AddMultipleSessionsModal from '../../../components/modals/AddMultipleSessionsModal';
import ViewSessionModal from '../../../components/modals/ViewSessionModal';
import EditSessionModal from '../../../components/modals/EditSessionModal';
import ConfirmModal from '../../../components/modals/ConfirmModal';
import { Schedule, UpdateSchedulePayload } from '../../../types/scheduales';
import { SessionFormData, MultipleSessionsPayload } from '../../../lib/schemas/SessionSchema';
import { useSubjects } from '../hooks/useSubjects';
import { Subject } from '../../../types/subject';
import { Table, Tag, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export default function Sessions() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddMultipleModal, setShowAddMultipleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Schedule | null>(null);
  const [groupedSessions, setGroupedSessions] = useState<Schedule[]>([]);
  const [sessionToDelete, setSessionToDelete] = useState<Schedule | null>(null);

  const createSchedule = useCreateSchedule();
  const createRecurringSchedule = useCreateRecurringSchedule();
  const updateSchedule = useUpdateSchedule();
  const deleteSchedule = useDeleteSchedule();
  const deleteGroupedSchedule = useDeleteGroupedSchedule();

  const handleUpdateSession = async (id: string, data: UpdateSchedulePayload) => {
    try {
      await updateSchedule.mutateAsync({ id, data });
      setShowEditModal(false);
      setSelectedSession(null);
    } catch (error) {
      console.error('Update session failed:', error);
    }
  };

  const handleDeleteSession = (session: Schedule) => {
    setSessionToDelete(session);
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;
    try {
      if (sessionToDelete.is_recurring) {
        await deleteGroupedSchedule.mutateAsync(sessionToDelete.parent_recurring_id || sessionToDelete.id);
      } else {
        await deleteSchedule.mutateAsync(sessionToDelete.id);
      }
      setSessionToDelete(null);
    } catch (error) {
      console.error('Delete session failed:', error);
    }
  };

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

  const handleAddMultipleSessions = async (data: MultipleSessionsPayload) => {
    const { formData, sessions } = data;
    try {
      await createRecurringSchedule.mutateAsync({
        studentId: formData.student,
        teacherId: formData.teacher,
        subject_id: formData.subject,
        title: formData.title,
        description: formData.description || '',
        link: formData.meetingLink || '',
        notes: formData.notes || '',
        startTime: sessions[0]?.time || '00:00',
        days: data.selectedDays,
        startDate: formData.monthYear ? `${formData.monthYear}-01` : new Date().toISOString().split('T')[0],
        endDate: formData.monthYear ? `${formData.monthYear}-28` : new Date().toISOString().split('T')[0],
        notification_Time: formData.notification_Time || '10',
        type: formData.type
      });
      setShowAddMultipleModal(false);
    } catch (error) {
      console.error('Add multiple sessions failed:', error);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      setDebouncedSearch(searchTerm);
    } else {
      setDebouncedSearch("");
    }
  }, [searchTerm]);

  const { data: searchResults } = useSearchSchedules(debouncedSearch);

  const itemsPerPage = 5;
  const scheduleData: Schedule[] = searchResults?.data?.schedule ?? [];

  const groupedSchedules: Schedule[] = [];
  const seenParents = new Set<string>();

  scheduleData.forEach((schedule: Schedule) => {
    if (schedule.parent_recurring_id) {
      if (!seenParents.has(schedule.parent_recurring_id)) {
        seenParents.add(schedule.parent_recurring_id);
        groupedSchedules.push(schedule);
      }
    } else {
      groupedSchedules.push(schedule);
    }
  });

  const totalItems = groupedSchedules.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displaySchedules = groupedSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return { date: '', time: '' };
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { date: dateString, time: '' };
      const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const endDate = new Date(date.getTime() + 60 * 60 * 1000);
      const endFormattedTime = endDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return { date: formattedDate, time: `${formattedTime} - ${endFormattedTime}` };
    } catch (e) {
      return { date: dateString, time: '' };
    }
  };

  const { data: subjects } = useSubjects();
  const dynamicsubjects = subjects?.subjects || [];

  const getSubjectName = (session: Schedule) => {
    if (session.subject) {
      return language === 'ar' ? session.subject.name_ar : session.subject.name_en;
    }
    const subject = dynamicsubjects.find((s: Subject) => s.id === session.subjectId);
    return subject ? (language === 'ar' ? subject.name_ar : subject.name_en) : 'Subject';
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarStyle = (name: string) => {
    const styles = [
      'bg-indigo-100 text-indigo-600',
      'bg-fuchsia-100 text-fuchsia-600',
      'bg-amber-100 text-amber-600',
      'bg-blue-100 text-blue-600',
      'bg-emerald-100 text-emerald-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return styles[hash % styles.length];
  };

  const getBadgeStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
      case 'planned':
      case 'upcoming': return 'bg-blue-50 text-blue-600 font-bold';
      case 'completed': return 'bg-green-50 text-green-600 font-bold';
      case 'missed':
      case 'cancelled': return 'bg-red-50 text-red-600 font-bold';
      case 'rescheduled': return 'bg-amber-50 text-amber-600 font-bold';
      default: return 'bg-gray-50 text-gray-600 font-bold';
    }
  };

  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      render: (_: any, record: Schedule) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${getAvatarStyle(record.student?.user?.name || '')}`}>
            {getInitials(record.student?.user?.name || "")}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{record.student?.user?.name || "Unknown"}</div>
            <div className="text-[11px] font-bold text-gray-400 mt-0.5">
              {getSubjectName(record)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Instructor",
      render: (_: any, record: Schedule) => (
        <div className="flex items-center gap-3">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.teacher?.user?.name || 'T')}&background=f3f4f6&color=4b5563`} alt="Instructor" className="w-8 h-8 rounded-full object-cover border border-gray-100" />
          <span className="text-sm font-bold text-gray-800">{record.teacher?.user?.name || "Unknown"}</span>
        </div>
      ),
    },
    {
      title: "Date & Time",
      render: (_: any, record: Schedule) => {
        const { date, time } = formatDateTime(record.start_time);
        const isRescheduled = record.status?.toLowerCase() === 'rescheduled';
        return (
          <div className="flex flex-col">
            <span className={`text-sm font-bold ${isRescheduled ? 'text-[#6366f1]' : 'text-gray-900'}`}>{isRescheduled ? 'Rescheduled' : date}</span>
            <span className="text-[11px] font-bold text-gray-400 mt-0.5" dir="ltr">{isRescheduled ? date : time}</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      render: (_: any, record: Schedule) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] tracking-widest uppercase ${getBadgeStyle(record.status || 'upcoming')}`}>
          {record.status || 'UPCOMING'}
        </span>
      ),
    },
    {
      title: "Meeting Details",
      render: (_: any, record: Schedule) => {
        const isCompleted = record.status?.toLowerCase() === 'completed';
        return (
          <div className="flex items-center gap-1.5">
            {record.link ? (
              <a href={record.link} target="_blank" rel="noreferrer" className="text-sm text-[#6366f1] font-bold hover:underline flex items-center gap-1.5">
                {record.link.includes('zoom') ? 'Join Zoom' : record.link.includes('meet') ? 'Google Meet' : 'Join Link'}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-sm font-bold text-gray-400">
                {isCompleted ? 'Session Archive' : 'Link Pending'}
              </span>
            )}
          </div>
        );
      }
    },
    {
      title: "Actions",
      align: "right" as const,
      render: (_: any, record: Schedule) => {
        const items = [
          {
            key: "view",
            label: <span className="flex items-center gap-2 text-xs font-bold text-gray-700"><Eye className="w-3.5 h-3.5" /> View</span>,
            onClick: () => {
              setGroupedSessions([record]);
              setSelectedSession(record);
              setShowViewModal(true);
            },
          },
          {
            key: "edit",
            label: <span className="flex items-center gap-2 text-xs font-bold text-gray-700"><Edit className="w-3.5 h-3.5" /> Edit</span>,
            onClick: () => {
              setSelectedSession(record);
              setShowEditModal(true);
            },
          },
          {
            key: "delete",
            label: <span className="flex items-center gap-2 text-xs font-bold text-red-600"><Trash2 className="w-3.5 h-3.5" /> Delete</span>,
            danger: true,
            onClick: () => handleDeleteSession(record),
          },
        ];

        return (
          <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto p-2" dir="ltr">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">

        {/* Page Title & Create Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sessions Management</h1>
            <p className="text-gray-500 text-sm font-medium">Manage and monitor academic interactions across all cohorts.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
        
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-full transition-colors font-bold text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Session
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student, instructor, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative">
               <select className="appearance-none pl-5 pr-10 py-2.5 bg-gray-50 border-none rounded-full text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                 <option>All Statuses</option>
               </select>
               <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
             </div>
             <div className="relative">
               <select className="appearance-none pl-5 pr-10 py-2.5 bg-gray-50 border-none rounded-full text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                 <option>This Week</option>
               </select>
               <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
             </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table 
            columns={columns} 
            dataSource={displaySchedules} 
            rowKey="id" 
            pagination={false} 
            className="w-full min-w-[900px]"
            rowClassName="hover:bg-gray-50/50 transition-colors group cursor-pointer"
          />
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-bold ml-2">
            Showing {(currentPage - 1) * itemsPerPage + (totalItems > 0 ? 1 : 0)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} sessions
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  currentPage === i + 1 ? 'bg-[#6366f1] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide scrollbar for the table */
        .ant-table-content::-webkit-scrollbar,
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .ant-table-content, .overflow-x-auto {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Style dropdown menu items */
        .ant-dropdown-menu .ant-dropdown-menu-item {
          font-size: 12px !important;
          font-weight: 700 !important;
          color: #333 !important;
        }
        
        /* Make Ant Design table header match the design */
        .ant-table-thead > tr > th {
          background-color: white !important;
          color: #9ca3af !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          border-bottom: 1px solid #f9fafb !important;
          border-top: 1px solid #f9fafb !important;
          padding: 16px 24px !important;
        }
        
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9fafb !important;
          padding: 16px 24px !important;
        }
      `}} />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mt-8 pb-20">
        
        {/* Instructor Availability Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-base">Instructor Availability</h3>
            <a href="#" className="text-xs text-[#6366f1] font-bold hover:underline">View Calendar</a>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">SC</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">Available from 2:00 PM</p>
                </div>
              </div>
              <button className="px-5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                Assign
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">MT</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Prof. Marcus Thorne</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">In Session (Ends 3:30 PM)</p>
                </div>
              </div>
              <span className="text-[11px] tracking-wider uppercase font-bold text-red-500 mr-2">Busy</span>
            </div>
          </div>
        </div>

        {/* Admin Notification Card */}
        <div className="bg-[#6366f1] rounded-[24px] shadow-sm p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          {/* Subtle decoration */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-[20%] translate-y-[20%]">
             <div className="w-64 h-64 border-[24px] border-white rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[24px] border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-white" />
              <h3 className="font-bold text-base">Admin Notification</h3>
            </div>
            <p className="text-indigo-50 text-sm font-medium leading-relaxed max-w-[85%]">
              3 students have missed multiple sessions this week. This could indicate a risk of churn or academic difficulty. Consider sending a batch reminder or checking in.
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <button className="px-6 py-2.5 bg-white text-[#6366f1] text-xs font-bold rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Review Attendance
            </button>
          </div>
        </div>
      </div>

      <AddSessionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSession}
      />

      <AddMultipleSessionsModal
        isOpen={showAddMultipleModal}
        onClose={() => setShowAddMultipleModal(false)}
        onAdd={handleAddMultipleSessions}
      />

      <ViewSessionModal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false); setSelectedSession(null); setGroupedSessions([]); }}
        session={selectedSession}
        groupedSessions={groupedSessions}
      />

      <EditSessionModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setSelectedSession(null); }}
        session={selectedSession}
        onSave={handleUpdateSession}
      />

      <ConfirmModal
        isOpen={!!sessionToDelete}
        onClose={() => setSessionToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
