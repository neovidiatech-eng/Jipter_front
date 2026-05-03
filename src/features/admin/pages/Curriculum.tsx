import { useState } from 'react';
import { 
  ChevronRight, 
  Plus, 
  Play, 
  FileText, 
  Video, 
  Download, 
  Eye, 
  Edit3, 
  Layers,
  Equal,
  GripVertical,
  ChevronDown,
  MoreVertical,
  Earth
} from 'lucide-react';
import { Collapse, Switch, Button } from 'antd';

const { Panel } = Collapse;

const DOT = () => (
<div className='flex flex-col items-center justify-center'>
  <div className='w-1 h-1 rounded-full bg-gray-400'></div>
</div>  
  )

export default function Curriculum() {
  const [activeLevel, setActiveLevel] = useState(['1']);
  const [selectedLessonId, setSelectedLessonId] = useState('lesson-04');

  return (
    <div className="flex flex-col h-[calc(100vh-90px)] bg-[#f8fafc] overflow-hidden p-8" dir="ltr">
      
      {/* Top Header - Now at the very top */}
      <div className="mb-8 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Curriculum <ChevronRight size={10} /> <span className="text-indigo-600">Shelf management</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Curriculum Shelf</h1>
        </div>
        <Button icon={<Plus size={16} />} className="rounded-xl font-bold text-gray-600 border-gray-200">Add Level</Button>
      </div>

      <div className="flex-1 flex overflow-hidden gap-6">
        
        {/* Left Sidebar */}
        <div className="w-[350px] flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Collapse
              activeKey={activeLevel}
              onChange={(key) => setActiveLevel(key as string[])}
              ghost
              expandIconPosition="end"
              expandIcon={({ isActive }) => 
                isActive ? <MoreVertical size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />
              }
              className="curriculum-collapse"
            >
              <Panel 
                header={
                  <div className="flex items-center gap-3">
                    <GripVertical  size={18} className="text-gray-400" />
                    <span className="font-semibold text-gray-800">Level 1: Fundamentals</span>
                  </div>
                } 
                key="1"
              >
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="px-2 flex flex-row items-center gap-2">
                      <Equal size={20} className="scale-x-[1.5] text-gray-300"/> 
                      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Module 01: Core Concepts</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between p-3 rounded-xl cursor-pointer" onClick={() => setSelectedLessonId('lesson-04')}>
                        <div className="flex items-center gap-3">
                          <Equal size={20} className={`scale-x-[1.5] transition-colors ${selectedLessonId === 'lesson-04' ? 'text-[#6B38D4]' : 'text-gray-300'}`}/> 
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold transition-colors ${selectedLessonId === 'lesson-04' ? 'text-[#6B38D4]' : 'text-gray-700'}`}>Lesson 04: Basics</span>
                            {selectedLessonId === 'lesson-04' && (
                              <div className="flex flex-row items-center gap-2 mt-1"> 
                                <span className="text-[10px] text-gray-400">VIDEO</span>
                                <DOT/>
                                <span className="text-[10px] text-gray-400">PDF</span>
                                <DOT/>  
                                <span className="text-[10px] text-gray-400">LIVE</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Switch size="small" checked={selectedLessonId === 'lesson-04'} onChange={() => setSelectedLessonId('lesson-04')} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent cursor-pointer" onClick={() => setSelectedLessonId('lesson-05')}>
                        <div className="flex items-center gap-3">
                          <Equal size={20} className={`scale-x-[1.5] transition-colors ${selectedLessonId === 'lesson-05' ? 'text-[#6B38D4]' : 'text-gray-300'}`}/> 
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold transition-colors ${selectedLessonId === 'lesson-05' ? 'text-[#6B38D4]' : 'text-gray-700'}`}>Lesson 05: Intermediate Flow</span>
                            {selectedLessonId === 'lesson-05' && (
                              <div className="flex flex-row items-center gap-2 mt-1"> 
                                <span className="text-[10px] text-gray-400">VIDEO</span>
                                <DOT/>
                                <span className="text-[10px] text-gray-400">PDF</span>
                                <DOT/>
                                <span className="text-[10px] text-gray-400">LIVE</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Switch size="small" checked={selectedLessonId === 'lesson-05'} onChange={() => setSelectedLessonId('lesson-05')} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="px-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Module 02: Introduction</span>
                    </div>
                    <button className="w-full py-3 rounded-xl border border-dashed border-gray-200 text-gray-400 text-xs hover:border-indigo-300 hover:text-indigo-600 transition-all">
                      + Add Module
                    </button>
                  </div>
                </div>
              </Panel>

              <Panel 
                header={
                  <div className="flex items-center gap-3">
                    <GripVertical size={18} className="text-gray-400" />
                    <span className="font-bold text-gray-400">Level 2 Advanced</span>
                  </div>
                } 
                key="2"
              ></Panel>
            </Collapse>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Lesson Card */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            
            {/* Lesson Header */}
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-2">Current Lesson</span>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedLessonId === 'lesson-04' ? 'Lesson 04: Basics of Management' : 'Lesson 05: Intermediate Flow'}
                </h2>
                <p className="text-[11px] font-bold text-gray-400">Last Update: Oct 24, 2023 | Admin: Sarah Chen</p>
              </div>
              <div className="flex items-center gap-3">
                <Button icon={<Edit3 size={16} />} className="rounded-xl font-bold text-gray-600">Edit Content</Button>
                <Button type="primary" className="rounded-xl font-bold bg-indigo-600">Save Changes</Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
              
            {/* Video Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Video size={16} className="text-red-600" />
                    <span className="text-sm font-bold">Video Content</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {selectedLessonId === 'lesson-04' ? 'MP4 - 1080p - 120MB' : 'MP4 - 4K - 450MB'}
                  </span>
                </div>
                <div className="relative aspect-video rounded-2xl bg-gray-900 overflow-hidden shadow-lg group cursor-pointer">
                  <img 
                    src={selectedLessonId === 'lesson-04' 
                      ? "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                      : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                    } 
                    alt="Video" 
                    className="w-full h-full object-cover opacity-50" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={28} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80">
                    <span className="text-xs font-bold">12:45 / 24:00</span>
                    <div className="w-1/2 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-[45%] h-full bg-indigo-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Materials and Live Session */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* Materials */}
                <div className="p-6 rounded-2xl border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg text-[#4648D4] flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <span className="font-bold text-gray-800">Materials</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">
                      {selectedLessonId === 'lesson-04' ? '1.2 MB' : '3.5 MB'}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                       <img 
                         src={selectedLessonId === 'lesson-04'
                           ? "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=100"
                           : "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=100"
                         } 
                         alt="Doc" 
                         className="w-full h-full object-cover" 
                       />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        {selectedLessonId === 'lesson-04' ? 'Management_Fundamentals_Guide.pdf' : 'Advanced_Flow_Structure.pdf'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400">Uploaded 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button block icon={<Eye size={14} />} className="rounded-xl font-bold text-xs">View Full</Button>
                    <Button block icon={<Download size={14} />} className="rounded-xl font-bold text-xs text-black">Download</Button>
                  </div>
                </div>

                {/* Live Session */}
                <div className="p-6 rounded-2xl border border-[#ddd6fe] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#6B38D4]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <Video size={22} />
                      </div>
                      <span className="font-bold text-black">Live Session</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  </div>
                  <div className="text-center py-2">
                    <p className="text-xs font-bold text-gray-600">Synchronous Q&A Session scheduled for Level 1 students.</p>
                  </div>

                  <div className="flex items-center justify-center rounded-xl h-11 gap-2 bg-[#6B38D4] text-white">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <Video size={22} />
                      </div>
                      <span className="font-bold">Launch Zoom Session</span>
                    </div>
                  
                  <div className="text-center py-2">
                    <p className="text-[10px] font-bold text-gray-400">Meeting ID :884-293-1022</p>
                  </div>
                </div>
              </div>

              {/* Visibility Bar */}
              <div className="p-6 rounded-2xl bg-[#F4F7FF] border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4648D4] border border-gray-100">
                    <Earth size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#555498]">Visibility & Status</h4>
                    <p className="text-[10px] font-bold text-[#7C76DB] mt-1">Control which tiers of students can see this lesson on their dashboard.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#4648D4] uppercase tracking-widest">Published</span>
                  <Switch className="visibility-switch" defaultChecked />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .curriculum-collapse .ant-collapse-header { padding: 12px 16px !important; }
        .curriculum-collapse .ant-collapse-content-box { padding: 0 16px 16px !important; }
        .no-scrollbar::-webkit-scrollbar { display: none;}
        .ant-switch-checked {
          background-color: #6B38D4 !important;
        }
        .visibility-switch.ant-switch-checked {
          background-color: #4648D4 !important;
        }
      `}} />
    </div>
  );
}
