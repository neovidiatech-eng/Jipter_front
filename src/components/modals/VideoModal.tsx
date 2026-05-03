import React from "react";
import { createPortal } from "react-dom";
import { Download, Play, X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionName: string;
}

export default function VideoModal({ isOpen, onClose, sessionName }: VideoModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">{sessionName}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Placeholder */}
        <div className="p-6">
          <div className="w-full aspect-video bg-[#0B1120] rounded-xl flex flex-col items-center justify-center text-slate-400 gap-4">
            <Play size={64} className="text-slate-500 hover:text-white hover:scale-110 transition-all cursor-pointer" />
            <span className="font-medium">Video Player Placeholder</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
