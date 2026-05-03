import React, { useState } from "react";
import { ArrowLeft, Play, Download, Filter, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoModal from "../../../../components/modals/VideoModal";

// Mock Data
const videosData = [
  {
    id: 1,
    name: "Python Fundamentals - Session 1",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 23, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
  {
    id: 2,
    name: "Python Fundamentals - Session 2",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 24, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
  {
    id: 3,
    name: "Python Fundamentals - Session 3",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 25, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
  {
    id: 4,
    name: "Python Fundamentals - Session 4",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 26, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
  {
    id: 5,
    name: "Python Fundamentals - Session 5",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 27, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
  {
    id: 6,
    name: "Python Fundamentals - Session 6",
    level: "Silver",
    subject: "Python Fundamentals",
    date: "Sep 28, 2025",
    duration: "1:30:00",
    status: "Completed",
  },
];

export default function RecordedVideos() {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoName, setSelectedVideoName] = useState("");

  const handleWatchVideo = (name: string) => {
    setSelectedVideoName(name);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 p-6 md:p-10 max-w-7xl mx-auto">
      {/* Top Back Nav */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Recorded Videos</h1>
          <p className="text-slate-500 font-medium mt-1">80 videos available</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            All Levels
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videosData.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group"
          >
            {/* Thumbnail */}
            <div
              className="w-full aspect-[16/9] bg-[#2563eb] flex items-center justify-center cursor-pointer relative overflow-hidden"
              onClick={() => handleWatchVideo(video.name)}
            >
              <div className="absolute inset-0 bg-blue-700/0 group-hover:bg-blue-700/20 transition-colors duration-300"></div>
              <Play
                size={64}
                className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                strokeWidth={1}
              />
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  {video.status}
                </span>
                <span className="text-slate-400 text-sm font-semibold">
                  {video.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                {video.name}
              </h3>

              <div className="text-sm font-medium text-slate-500 mb-6">
                {video.level} • {video.subject}
                <div className="mt-1">{video.date}</div>
              </div>

              {/* Actions Footer */}
              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => handleWatchVideo(video.name)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm shadow-blue-200"
                >
                  <Play size={16} />
                  Watch
                </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        sessionName={selectedVideoName}
      />
    </div>
  );
}
