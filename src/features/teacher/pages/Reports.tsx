import React from "react";
import { Calendar, BarChart3, ChevronRight, Info, Send, Save   } from "lucide-react";

export default function ReportsPage() {
  const previousReports = [
    { date: "Feb 10 - Feb 16", status: "Submitted" },
    { date: "Feb 3 - Feb 9", status: "Submitted" },
    { date: "Jan 27 - Feb 2", status: "Submitted" },
  ];

  return (
    <div className="animate-fade-in max-w-[1600px] mx-auto pb-12 p-7">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-['Inter']">
          Weekly Reports
        </h1>
        <p className="text-slate-400 font-medium">
          Submit your weekly teaching performance and feedback
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Main Form Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              Report Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Week Starting
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Select date"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-slate-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Week Ending
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Select date"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-slate-600"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-8">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Total Classes Conducted
                </label>
                <input
                  type="number"
                  placeholder="12"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none transition-all font-medium text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Students Taught
                </label>
                <input
                  type="number"
                  placeholder="18"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none transition-all font-medium text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Average Session Duration (mins)
                </label>
                <input
                  type="number"
                  placeholder="55"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none transition-all font-medium text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Materials Uploaded
                </label>
                <input
                  type="number"
                  placeholder="8"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none transition-all font-medium text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Teaching Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide a summary of topics covered, teaching methods used, and overall progress..."
                  className="w-full p-6 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-slate-600 resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Student Progress & Highlights
                </label>
                <textarea
                  rows={4}
                  placeholder="Highlight notable student achievements, improvements, or areas needing attention..."
                  className="w-full p-6 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-slate-600 resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 ml-1">
                  Challenges Faced
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe any challenges encountered during the week..."
                  className="w-full p-6 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium text-slate-600 resize-none"
                />
              </div>
            </div>

            <div className="mt-12 flex gap-4 justify-end ">
              <button className=" flex flex-row items-center justify-center bg-[#2563eb] text-white px-12 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all h-[45px] w-[70%] text-[12px] lg:text-[15px] ">
                <Send className="inline-block mr-1" size={20} />
                Submit Report
              </button>
              <button className="flex flex-row items-center justify-center bg-[#F8FAFC] text-black px-1 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:bg-gray-200 transition-all h-[45px] w-[30%] text-[10px] lg:text-[15px] ">
                <Save className="inline-block mr-1" size={20}/>
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
          {/* This Week Stats */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">This Week</h3>
            <div className="space-y-5">
              {[
                { label: "Classes", val: 12, color: "text-blue-500" },
                { label: "Students", val: 18, color: "text-purple-500" },
                { label: "Hours", val: 11, color: "text-green-500" },
                { label: "Materials", val: 8, color: "text-orange-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-bold text-slate-400">
                    {item.label}
                  </span>
                  <span className={`text-lg font-black ${item.color}`}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Reports */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Previous Reports
            </h3>
            <div className="space-y-4">
              {previousReports.map((report, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50/50 border border-slate-50 rounded-2xl flex justify-between items-center group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-1">
                      {report.date}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
                      {report.status}
                    </span>
                  </div>
                  <button className="text-[11px] font-bold text-slate-500 group-hover:text-blue-600 flex items-center gap-1 transition-all">
                    View
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-[#E3EAF9] p-8 rounded-3xl border border-blue-100/30">
            <div className="flex items-center gap-3 text-blue-700 font-bold mb-4">
              <Info size={20} />
              <h4>Report Guidelines</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Submit reports by end of each week",
                "Be specific about student progress",
                "Include measurable outcomes",
                "Note any technical issues",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] font-medium text-blue-600/70"
                >
                  <span className="text-blue-400">•</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
