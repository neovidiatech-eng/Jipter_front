import { BookOpen, Check } from "lucide-react";

export interface CurriculumCardProps {
  id: number | string;
  title: string;
  description: string;
  totalSessions: number;
  completedSessions: number;
  currentSession: number | null;
  startSessionNumber: number;
  status: string;
  onClick?: () => void;
}

export default function CurriculumCard({
  id,
  title,
  description,
  totalSessions,
  completedSessions,
  currentSession,
  startSessionNumber,
  status,
  onClick,
}: CurriculumCardProps) {
  const progressPercentage = Math.round(
    (completedSessions / totalSessions) * 100
  );

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm transition-shadow ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      {/* Card Header */}
      <div className="flex gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-200">
          {id}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      {/* Sessions Tracker */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: totalSessions }).map((_, idx) => {
          const sessionNum = startSessionNumber + idx;
          let isCompleted = false;
          let isCurrent = false;

          if (completedSessions > idx) {
            isCompleted = true;
          } else if (sessionNum === currentSession) {
            isCurrent = true;
          }

          if (isCompleted) {
            return (
              <div
                key={idx}
                className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"
              >
                <Check size={16} strokeWidth={3} />
              </div>
            );
          }

          if (isCurrent) {
            return (
              <div
                key={idx}
                className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm"
              >
                {sessionNum}
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm"
            >
              {sessionNum}
            </div>
          );
        })}
      </div>

      {/* Card Progress */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-slate-500">
            {completedSessions} of {totalSessions} sessions completed
          </span>
          <span className="text-slate-800">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-2">
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold ${
            status === "In Progress"
              ? "bg-blue-50 text-blue-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {status}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-sm">
          <BookOpen size={16} />
          <span>{totalSessions} Sessions</span>
        </div>
      </div>
    </div>
  );
}
