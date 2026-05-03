import React from "react";
import {
  Users,
  MessageSquare,
  Heart,
  TrendingUp,
  Smile,
  Send,
} from "lucide-react";

export default function CommunityPage() {
  const stats = [
    { label: "Active Members", value: "342", icon: Users, color: "blue" },
    {
      label: "Discussions",
      value: "1,248",
      icon: MessageSquare,
      color: "purple",
    },
    { label: "Helpful Posts", value: "856", icon: Heart, color: "pink" },
    { label: "This Week", value: "+48", icon: TrendingUp, color: "green" },
  ];

  const sidebarChats = [
    { id: 1, name: "Sarah Johnson", posts: "196 posts", rank: "#1" },
    { id: 2, name: "Mike Chen", posts: "142 posts", rank: "#2" },
    { id: 3, name: "Emma Davis", posts: "128 posts", rank: "#3" },
  ];

  return (
    <div className="animate-fade-in max-w-[1600px] mx-auto pb-12 p-7">
      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-['Inter']">
          Instructor Community
        </h1>
        <p className="text-slate-400 font-medium">
          Connect, share, and learn with fellow instructors
        </p>
      </header>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl border border-gray-100/50 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`p-3 rounded-2xl ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-500"
                    : stat.color === "purple"
                      ? "bg-purple-50 text-purple-500"
                      : stat.color === "pink"
                        ? "bg-pink-50 text-pink-500"
                        : "bg-green-50 text-green-500"
                }`}
              >
                <stat.icon size={22} />
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col h-[700px] bg-white rounded-3xl border border-gray-100/50 shadow-sm overflow-hidden content-chat pt-8">
          <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
            {/* Incoming Message Example */}
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-500 text-xs shrink-0 border-2 border-white shadow-sm mt-1 uppercase italic">
                JM
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-800">
                    Jennifer Martinez
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">
                    Student
                  </span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl rounded-tl-none text-slate-600 font-medium leading-relaxed shadow-sm">
                  Just finished an amazing session on async/await in JavaScript!
                  My students grasped the concept much faster when I used
                  real-world examples like API calls. What teaching methods work
                  best for you when explaining asynchronous programming?
                </div>
              </div>
            </div>

            {/* Outgoing Message Example */}
            <div className="flex flex-col items-end gap-2 ml-auto max-w-[85%]">
              <div className="flex items-center gap-3 mr-1 mb-1">
                <span className="text-sm font-bold text-slate-800">
                  Muhamed Ali
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">
                  Instructor
                </span>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-500 text-xs shrink-0 border-2 border-white shadow-sm uppercase italic">
                  MA
                </div>
              </div>
              <div className="bg-[#f8faff] p-6 rounded-3xl rounded-tr-none text-slate-600 font-medium leading-relaxed shadow-sm">
                Just finished an amazing session on async/await in JavaScript!
                My students grasped the concept much faster when I used
                real-world examples like API calls. What teaching methods work
                best for you when explaining asynchronous programming?
              </div>
            </div>

            {/* Additional Bubble if needed... */}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-slate-50">
            <div className="relative flex justify-center items-center">
              <Smile className="inline-block text-gray-400 hover:text-gray-600 cursor-pointer mr-2 " />
              <input
                type="text"
                placeholder="Type Message ...."
                className="w-full px-8 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium italic"
              />
              <Send className="inline-block text-blue-600 hover:text-blue-400 cursor-pointer ml-2" />
            </div>
          </div>
        </div>

        {/* Students Sidebar */}
        <div className="h-[700px] bg-white rounded-3xl border border-gray-100/50 shadow-sm p-8 flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-8 h-fit">
            Students Chat
          </h3>
          <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
            {sidebarChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs font-black w-6 ${chat.id === 1 ? "text-orange-400" : chat.id === 2 ? "text-blue-400" : "text-orange-600"}`}
                  >
                    {chat.rank}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {chat.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {chat.posts}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
