import { ArrowLeft, Check, Play, Download, Lock, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import VideoModal from "../../../../components/modals/VideoModal";

// Mock Data
const sessionsData = [
  { id: 4, name: "Python Fundamentals - Session 4", date: "Sep 26, 2025", duration: "1:30:00", status: "Completed" },
  { id: 5, name: "Python Fundamentals - Session 5", date: "Sep 27, 2025", duration: "1:30:00", status: "Completed" },
  { id: 6, name: "Python Fundamentals - Session 6", date: "Sep 28, 2025", duration: "1:30:00", status: "Pending" },
  { id: 7, name: "Python Fundamentals - Session 7", date: "Sep 29, 2025", duration: "1:30:00", status: "Locked" },
  { id: 8, name: "Python Fundamentals - Session 8", date: "Sep 30, 2025", duration: "1:30:00", status: "Locked" },
  { id: 9, name: "Python Fundamentals - Session 9", date: "Oct 1, 2025", duration: "1:30:00", status: "Locked" },
  { id: 10, name: "Python Fundamentals - Session 10", date: "Oct 2, 2025", duration: "1:30:00", status: "Locked" },
  { id: 11, name: "Python Fundamentals - Session 11", date: "Oct 3, 2025", duration: "1:30:00", status: "Locked" },
  { id: 12, name: "Python Fundamentals - Session 12", date: "Oct 4, 2025", duration: "1:30:00", status: "Locked" },
];

export default function CurriculumDetails() {
  const navigate = useNavigate();
  const { curriculumId } = useParams();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoName, setSelectedVideoName] = useState("");

  // In a real app, you'd fetch curriculum data based on ID
  const curriculumTitle = curriculumId === "1" ? "Python Fundamentals" : `Curriculum ${curriculumId}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 p-6 md:p-10 max-w-7xl mx-auto">
      {/* Top Back Nav */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Levels
        </button>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-800 mb-8">{curriculumTitle}</h1>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessionsData.map((session) => {
          const isCompleted = session.status === "Completed";
          const isPending = session.status === "Pending";
          const isLocked = session.status === "Locked";

          return (
            <div 
              key={session.id}
              className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 md:gap-6">
                {/* Session Icon/Number */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                  isCompleted ? "bg-green-100 text-green-600" :
                  isPending ? "bg-amber-100 text-amber-600" :
                  "bg-slate-50 border border-slate-200 text-slate-500"
                }`}>
                  {isCompleted ? <Check strokeWidth={3} size={20} /> : session.id}
                </div>

                {/* Session Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{session.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1 font-medium">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{session.date}</span>
                    <span className="px-1 text-slate-300">•</span>
                    <span>Duration: {session.duration}</span>
                  </div>
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Badge */}
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  isCompleted ? "bg-green-100 text-green-700" :
                  isPending ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {session.status}
                </span>

                {/* Actions */}
                {isCompleted && (
                  <>
                    <button 
                      onClick={() => {
                        setSelectedVideoName(session.name);
                        setIsVideoModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm shadow-blue-200"
                    >
                      <Play size={16} fill="currentColor" />
                      Watch Video
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                      <Download size={16} />
                      PDF
                    </button>
                  </>
                )}

                {isPending && (
                  <button className="flex items-center gap-2 bg-slate-100 text-slate-400 px-4 py-2 rounded-xl text-sm font-bold cursor-not-allowed">
                    <Calendar size={16} />
                    Upcoming
                  </button>
                )}

                {isLocked && (
                  <button className="flex items-center gap-2 bg-slate-100 text-slate-400 px-4 py-2 rounded-xl text-sm font-bold cursor-not-allowed">
                    <Lock size={16} />
                    Locked
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        sessionName={selectedVideoName} 
      />
    </div>
  );
}
