import { ArrowLeft, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CurriculumCard from "../../components/CurriculumCard";

// Mock Data matching the design
const curriculums = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Learn the basics of Python programming",
    totalSessions: 12,
    completedSessions: 5,
    currentSession: 6,
    startSessionNumber: 1,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Data Structures",
    description: "Master essential data structures",
    totalSessions: 12,
    completedSessions: 8,
    currentSession: 18, // Represents the current active session globally
    startSessionNumber: 13,
    status: "In Progress",
  },
  {
    id: 3,
    title: "Algorithms Basics",
    description: "Understand fundamental algorithms",
    totalSessions: 12,
    completedSessions: 0,
    currentSession: null,
    startSessionNumber: 25,
    status: "Not Started",
  },
  {
    id: 4,
    title: "Web Development Intro",
    description: "Introduction to building web applications",
    totalSessions: 12,
    completedSessions: 0,
    currentSession: null,
    startSessionNumber: 37,
    status: "Not Started",
  },
];

export default function Levels() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-6 md:p-10 max-w-7xl mx-auto">
      {/* Top Back Nav */}
      <div>
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>

      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Award className="w-12 h-12 text-blue-500 fill-blue-100" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Silver Level</h1>
            <p className="text-slate-500 font-medium mt-1">4 Curriculums • 45% Complete</p>
          </div>
        </div>
        
        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full w-[45%]"></div>
        </div>
      </div>

      {/* Curriculums Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {curriculums.map((curr) => (
          <CurriculumCard
            key={curr.id}
            id={curr.id}
            title={curr.title}
            description={curr.description}
            totalSessions={curr.totalSessions}
            completedSessions={curr.completedSessions}
            currentSession={curr.currentSession}
            startSessionNumber={curr.startSessionNumber}
            status={curr.status}
            onClick={() => navigate(`/student-dashboard/Materials/Levels/${curr.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
