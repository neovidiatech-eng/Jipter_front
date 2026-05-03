import { X, Search, Video, ChevronDown, AlertCircle, Calendar, MonitorPlay, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react';
import { SessionFormData } from '../../lib/schemas/SessionSchema';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (session: SessionFormData) => void;
}

export default function AddSessionModal({ isOpen, onClose, onAdd }: AddSessionModalProps) {
  const [schedulingMode, setSchedulingMode] = useState<'single' | 'batch'>('batch');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Thu']);
  const [meetingPlatform, setMeetingPlatform] = useState<'zoom' | 'google' | null>('zoom');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-sans">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[950px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-start justify-between bg-white">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-[14px] bg-indigo-50 flex items-center justify-center">
               <Calendar className="w-6 h-6 text-[#6366f1]" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-gray-900 leading-tight">Create New Session</h2>
               <p className="text-[13px] font-semibold text-gray-400 mt-0.5">Configure and schedule learning tracks for students.</p>
             </div>
           </div>
           <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Column - Configuration */}
          <div className="w-full md:w-[55%] p-8 bg-white overflow-y-auto">
            
            {/* Student & Instructor Selectors */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Student</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search Student..." 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Instructor</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search Instructor..." 
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Scheduling Mode Toggle */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Scheduling Mode</label>
              <div className="flex p-1 bg-gray-50 border border-gray-100 rounded-xl">
                <button 
                  onClick={() => setSchedulingMode('single')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${schedulingMode === 'single' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Single Session
                </button>
                <button 
                  onClick={() => setSchedulingMode('batch')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${schedulingMode === 'batch' ? 'bg-white text-[#6366f1] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Batch Scheduling
                </button>
              </div>
            </div>

            {/* Batch Config Card */}
            {schedulingMode === 'batch' && (
              <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-2xl p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[11px] font-bold text-indigo-900/60 mb-1.5 uppercase tracking-wider">Number of Sessions</label>
                    <input 
                      type="number" 
                      defaultValue={12}
                      className="w-full px-4 py-2.5 bg-white border border-indigo-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-indigo-900/60 mb-1.5 uppercase tracking-wider">Daily Start Time</label>
                    <input 
                      type="time" 
                      defaultValue="14:00"
                      className="w-full px-4 py-2.5 bg-white border border-indigo-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-indigo-900/60 mb-2 uppercase tracking-wider">Auto-scheduling Frequency</label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const isSelected = selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => {
                            if (isSelected) setSelectedDays(prev => prev.filter(d => d !== day));
                            else setSelectedDays(prev => [...prev, day]);
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            isSelected 
                              ? 'bg-white border-[#6366f1] text-[#6366f1] shadow-sm' 
                              : 'bg-white border-transparent text-gray-500 hover:border-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                    <button className="px-3 py-1.5 text-xs font-bold rounded-lg border border-transparent bg-white text-gray-500 hover:border-gray-200 transition-all ml-auto">
                      Custom
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Meeting Platform */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Meeting Platform</label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Apply to all</span>
                  <div className="w-7 h-4 bg-[#6366f1] rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setMeetingPlatform('zoom')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    meetingPlatform === 'zoom' 
                      ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Zoom Meet
                </button>
                <button 
                  onClick={() => setMeetingPlatform('google')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    meetingPlatform === 'google' 
                      ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MonitorPlay className="w-4 h-4" />
                  Google Meet
                </button>
              </div>
            </div>

          </div>

          {/* Right Column - Schedule Preview */}
          <div className="w-full md:w-[45%] bg-[#f8fafc] border-l border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100/50 flex items-center justify-between bg-[#f8fafc]">
              <h3 className="font-bold text-gray-900 text-sm">Schedule Preview</h3>
              <span className="px-2.5 py-1 bg-blue-100 text-[#2563eb] border border-blue-200 text-[9px] font-black rounded-full tracking-widest uppercase shadow-sm">
                12 Sessions Total
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              
              {/* Card 1 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-4 shadow-sm hover:border-gray-200 transition-all">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-gray-100/50">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Oct</span>
                  <span className="text-sm font-black text-gray-900">24</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-gray-900">Session 01 - Mathematics</h4>
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 border border-green-200 text-[8px] font-black uppercase tracking-widest rounded shadow-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-gray-400">02:00 PM - Room 402</span>
                  </div>
                </div>
              </div>

              {/* Card 2 - Conflict */}
              <div className="bg-red-50/30 border border-red-300 rounded-2xl p-3 flex gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-red-100">
                  <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Oct</span>
                  <span className="text-sm font-black text-red-600">26</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-gray-900">Session 02 - Mathematics</h4>
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
                      <AlertTriangle className="w-2.5 h-2.5" /> Clash Detected
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                       Room 402 Occupied
                    </span>
                  </div>
                  <button className="text-[10px] font-bold text-[#6366f1] hover:underline mt-1.5">
                    Relocate to Room 10B
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-4 shadow-sm hover:border-gray-200 transition-all">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-gray-100/50">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Oct</span>
                  <span className="text-sm font-black text-gray-900">31</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-gray-900">Session 03 - Mathematics</h4>
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 border border-green-200 text-[8px] font-black uppercase tracking-widest rounded shadow-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-gray-400">02:00 PM - Room 402</span>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-4 shadow-sm hover:border-gray-200 transition-all">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-gray-100/50">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nov</span>
                  <span className="text-sm font-black text-gray-900">02</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-gray-900">Session 04 - Mathematics</h4>
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 border border-green-200 text-[8px] font-black uppercase tracking-widest rounded shadow-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-gray-400">02:00 PM - Room 402</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 pb-4">
                <button className="text-[11px] font-bold text-[#6366f1] hover:underline flex items-center justify-center gap-1 w-full">
                  View 8 more sessions <ChevronDown className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
             <AlertCircle className="w-4 h-4" />
             <span className="text-[11px] font-bold">1 Conflict needs resolution</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Save Draft
            </button>
            <button 
              className="px-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              Schedule Batch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
