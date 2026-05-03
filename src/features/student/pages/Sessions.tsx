import { useState, useEffect } from 'react';
import { Search, ChevronLeft, CheckCircle2, Play, FileText, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Schedule } from '../../../types/scheduales';
import { useUserSessions } from '../../../hooks/useSessions';
import { TableSkeleton } from '../../../components/ui/CustomSkeleton';

export default function Sessions() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: allSchedules, isLoading } = useUserSessions(debouncedSearch);

  const scheduleData = allSchedules?.data || [];
  
  // Filtering logic to show only sessions (similar to original)
  const displaySchedules: Schedule[] = [];
  const seenParents = new Set<string>();

  scheduleData.forEach((schedule: Schedule) => {
    if (schedule.parent_recurring_id) {
      if (!seenParents.has(schedule.parent_recurring_id)) {
        seenParents.add(schedule.parent_recurring_id);
        displaySchedules.push(schedule);
      }
    } else {
      displaySchedules.push(schedule);
    }
  });

  const formatDateTime = (dateString: string) => {
    if (!dateString) return { date: '', time: '' };
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { date: dateString, time: '' };
      return {
        date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      };
    } catch (e) {
      return { date: dateString, time: '' };
    }
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return "0:00:00";
    try {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      const diff = Math.max(0, end - start);
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
    } catch (e) {
      return "1:30:00";
    }
  };

  const completedCount = displaySchedules.filter(s => s.status?.toLowerCase() === 'completed').length;
  const totalCount = displaySchedules.length;

  if (isLoading) {
    return <div className="p-8"><TableSkeleton rows={5} columns={1} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-['Inter']">
      {/* Header Section */}
      <div className="space-y-4">
        <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Data Structures</h1>
            <p className="text-lg text-slate-500 font-medium tracking-wide">Master essential data structures</p>
          </div>
          <div className="text-right space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
            <div className="text-2xl font-black text-slate-800 tracking-tighter">
              {completedCount} <span className="text-slate-300">/</span> {totalCount}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - Optional but good for UX since it was in original */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search sessions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-[#2563eb] transition-all text-sm font-medium"
        />
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {displaySchedules.map((session, index) => {
          const status = session.status?.toLowerCase() || 'pending';
          const isCompleted = status === 'completed';
          const isPending = status === 'pending' || status === 'scheduled' || status === 'planned';
          const isLocked = !isCompleted && !isPending;
          
          const { date } = formatDateTime(session.start_time);
          const duration = calculateDuration(session.start_time, session.end_time);

          return (
            <div 
              key={session.id}
              className={`bg-white rounded-[24px] border border-slate-50 p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 group ${isLocked ? 'opacity-70' : ''}`}
            >
              {/* Status Icon */}
              <div className="shrink-0">
                {isCompleted ? (
                   <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={26} strokeWidth={2.5} />
                   </div>
                ) : isPending ? (
                   <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 font-black text-xl">
                      {index + 1}
                   </div>
                ) : (
                   <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xl">
                      {index + 1}
                   </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-[#2563eb] transition-colors truncate">
                  {session.title || `Data Structures - Session ${index + 1}`}
                </h3>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-slate-100 rounded-md flex items-center justify-center">
                        <FileText size={10} />
                      </div>
                      <span>{date}</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-slate-200" />
                   <span>Duration: {duration}</span>
                </div>
              </div>

              {/* Actions & Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                {/* Badge */}
                {isCompleted ? (
                   <span className="px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-600 text-[13px] font-bold tracking-tight">Completed</span>
                ) : isPending ? (
                   <span className="px-5 py-2.5 rounded-full bg-amber-50 text-amber-600 text-[13px] font-bold tracking-tight">Pending</span>
                ) : (
                   <span className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-500 text-[13px] font-bold tracking-tight">Locked</span>
                )}

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                   {isCompleted ? (
                      <>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2563eb] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap">
                          <Play size={16} fill="currentColor" />
                          Watch Video
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-600 px-7 py-3 rounded-full text-sm font-bold hover:bg-slate-100 transition-all border border-slate-100 active:scale-95 whitespace-nowrap">
                          <FileText size={16} />
                          PDF
                        </button>
                      </>
                   ) : isPending ? (
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-400 px-7 py-3 rounded-full text-sm font-bold border border-slate-100 cursor-not-allowed whitespace-nowrap">
                        <FileText size={16} />
                        Upcoming
                      </button>
                   ) : (
                      <>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-300 px-7 py-3 rounded-full text-sm font-bold border border-slate-100 cursor-not-allowed whitespace-nowrap">
                          <Lock size={16} />
                          Locked
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-slate-300 px-7 py-3 rounded-full text-sm font-bold border border-slate-100 cursor-not-allowed whitespace-nowrap">
                          <Lock size={16} />
                          Locked
                        </button>
                      </>
                   )}
                </div>
              </div>
            </div>
          );
        })}

        {displaySchedules.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-50 p-12 text-center space-y-4 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
               <FileText size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">No sessions found</h3>
              <p className="text-slate-400 font-medium">Your schedule is currently empty</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
