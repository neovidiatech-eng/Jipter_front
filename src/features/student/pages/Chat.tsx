import React, { useState } from "react";
import { Send, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "student" | "teacher";
  time: string;
}

export default function StudentChat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi Alex! How are you doing with the current sessions?",
      sender: "teacher",
      time: "1:36 PM",
    },
    {
      id: 2,
      text: "Hi Dr. Mitchell! I'm doing great. I have a question about the Trees and Graphs topic.",
      sender: "student",
      time: "2:06 PM",
    },
    {
      id: 3,
      text: "Sure! What would you like to know?",
      sender: "teacher",
      time: "2:36 PM",
    },
    {
      id: 4,
      text: "Could you explain the difference between BFS and DFS traversal?",
      sender: "student",
      time: "2:51 PM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "student",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className=" flex  flex-col  overflow-hidden">
      {/* Top Nav */}
      <div className="px-4 py-2">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      {/* Main Grid */}
      <div className="flex-1  grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 px-4 pb-4">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col items-center col-span-1 bg-white rounded-[24px] p-6 border shadow-sm">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-blue-500 p-1 mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=random"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-1">
            Dr. Sarah Mitchell
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 font-bold text-sm">Online</span>
          </div>

          <p className="text-slate-400 text-sm text-center mb-6">
            Python & Data Structures Specialist
          </p>
        </div>

        {/* Right Chat Area */}
        <div className="col-span-1 bg-white rounded-[24px] border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden min-h-[400px]">
          {/* Chat Header */}
          <div className="p-6 border-b border-slate-50 shrink-0">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              Chat with Instructor
            </h3>
            <p className="text-slate-400 font-bold text-sm">
              Ask questions about your curriculum
            </p>
          </div>

          {/* Messages Area */}
          <div className=" overflow-y-auto message-card p-2 space-y-3 bg-slate-50/30">
            {messages.map((msg) => {
              const isStudent = msg.sender === "student";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isStudent ? "items-end" : "items-start"} max-w-[85%] ${isStudent ? "ml-auto" : "mr-auto"}`}
                >
                  <div
                    className={`
                      px-6 py-4 rounded-[24px] text-[15px] font-medium leading-relaxed
                      ${
                        isStudent
                          ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100"
                          : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                      }
                   `}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-2 text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-50 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all"
            >
              <Smile
                size={20}
                className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-700 font-medium placeholder:text-slate-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <Paperclip
                  size={20}
                  className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:bg-slate-300 disabled:shadow-none transition-all"
                >
                  <Send size={18} fill="white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .message-card::-webkit-scrollbar {
          display: none;
        }
        .message-card {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
