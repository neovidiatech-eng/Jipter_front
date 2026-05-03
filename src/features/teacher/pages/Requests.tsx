import {
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  ChevronRight,
  Calendar,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

const RequestCard = ({
  title,
  date,
  desc,
  status,
  priority,
  color,
  type,
  iconColor,
}: any) => {
  const Icon =
    type === "Technical"
      ? AlertCircle
      : type === "Vacation"
        ? Calendar
        : type === "Reschedule"
          ? RefreshCcw
          : type === "Sick Leave"
            ? Calendar
            : Clock;

  return (
    <div className="bg-white p-8 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all ">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-xl bg-${iconColor}-50 flex items-center justify-center text-${iconColor}-500`}
          >
            <Icon size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-xs font-bold text-slate-300">{date}</p>
          </div>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            status === "Pending"
              ? "bg-yellow-100 text-orange-500"
              : status === "Approved"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed">
        {desc}
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`px-4 py-1 border border-${color}-100 bg-${color}-100 rounded-lg text-[10px] font-black text-${color}-500 uppercase tracking-widest bg-${color}-50/30`}
        >
          {priority}
        </span>
        {status === "Pending" && (
          <button className="text-slate-500 hover:text-blue-600 text-[13px] font-bold transition-all flex items-center gap-1">
            View Details
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default function TeacherRequests() {
  const stats = [
    { label: "Vacation", value: 15, color: "bg-blue-500" },
    { label: "Sick Leave", value: 30, color: "bg-pink-500" },
    { label: "Excuse", value: 1, color: "bg-amber-400" },
    { label: "Emergency", value: 1, color: "bg-red-500" },
    { label: "Resign", value: 1, color: "bg-purple-500" },
  ];

  const statusCards = [
    { label: "Pending", count: 2, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Approved", count: 2, color: "text-green-500", bg: "bg-green-50" },
    { label: "Rejected", count: 1, color: "text-red-500", bg: "bg-red-50" },
    { label: "Total", count: 5, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="animate-fade-in max-w-[1600px] mx-auto pb-12 p-7">
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-['Inter']">
            Requests
          </h1>
          <p className="text-slate-400 font-medium">
            Manage leave, reschedule, and issue requests
          </p>
        </div>
        <button className="flex items-center gap-2 w-[150px] h-[45px] bg-[#2563eb] text-white px-6 py-2.5 rounded-full text-[12px] font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          <Plus size={18} strokeWidth={3} />
          New Request
        </button>
      </header>

      {/* Circle Stats Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-12 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <div
              className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-black/5`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Status Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statusCards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all"
          >
            <div>
              <p className="text-sm font-bold text-slate-400 mb-1">
                {card.label}
              </p>
              <h3 className={`text-3xl font-black ${card.color}`}>
                {card.count}
              </h3>
            </div>
            <div
              className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}
            >
              {card.label === "Pending" && (
                <Clock className="text-amber-500" size={20} />
              )}
              {card.label === "Approved" && (
                <CheckCircle2 className="text-green-500" size={20} />
              )}
              {card.label === "Rejected" && (
                <XCircle className="text-red-500" size={20} />
              )}
              {card.label === "Total" && (
                <ChevronRight className="text-blue-500" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pending Requests Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Pending Requests
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestCard
            title="Personal Leave Request"
            date="Mar 1, 2026"
            desc="Need to take a day off for family matters"
            status="Pending"
            priority="MEDIUM Priority"
            color="blue"
            type="Vacation"
            iconColor="blue"
          />
          <RequestCard
            title="Technical Issue with Video"
            date="Feb 22, 2026"
            desc="Unable to access recorded session from Feb 20"
            status="Pending"
            priority="HIGH Priority"
            color="red"
            type="Technical"
            iconColor="amber"
          />
        </div>
      </section>

      {/* Request History Section */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Request History
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestCard
            title="Reschedule Python Session"
            date="Feb 20, 2026"
            desc="Request to move the session from 2 PM to 4 PM"
            status="Approved"
            priority="HIGH Priority"
            color="red"
            type="Reschedule"
            iconColor="purple"
          />
          <RequestCard
            title="Medical Leave"
            date="Feb 20, 2026"
            desc="Scheduled doctor's appointment"
            status="Approved"
            priority="HIGH Priority"
            color="red"
            type="Sick Leave"
            iconColor="blue"
          />
          <RequestCard
            title="Reschedule React Workshop"
            date="Mar 1, 2026"
            desc="Conflict with another commitment"
            status="Rejected"
            priority="LOW Priority"
            color="gray"
            type="Reschedule"
            iconColor="purple"
          />
        </div>
      </section>
    </div>
  );
}
