import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Video, 
  MoreVertical, 
  Download, 
  Trash2,
  Play,
  ChevronRight,
  LayoutGrid,
  List,
  FileImage,
  Archive
} from 'lucide-react';
import { Button, Input } from 'antd';
import UploadContentModal from '../../../components/modals/UploadContentModal';

export default function Library() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const libraryItems = [
    { id: 1, name: 'Core_Management_01.mp4', type: 'video', size: '120 MB', date: 'Oct 24, 2023', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: 'Strategy_Guide_Draft.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 22, 2023', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: 'Team_Workflow_Diagram.png', type: 'image', size: '850 KB', date: 'Oct 21, 2023', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'Project_Assets_Bundle.zip', type: 'archive', size: '45 MB', date: 'Oct 20, 2023', thumbnail: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: 'Interview_Session_04.mp4', type: 'video', size: '210 MB', date: 'Oct 19, 2023', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=300' },
    { id: 6, name: 'Marketing_Brand_Assets.pdf', type: 'pdf', size: '12 MB', date: 'Oct 18, 2023', thumbnail: 'https://images.unsplash.com/photo-1606857521015-7f9fdf423740?auto=format&fit=crop&q=80&w=300' },
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={18} className="text-indigo-600" />;
      case 'pdf': return <FileText size={18} className="text-red-500" />;
      case 'image': return <FileImage size={18} className="text-green-500" />;
      case 'archive': return <Archive size={18} className="text-amber-500" />;
      default: return <FileText size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-90px)] bg-[#f8fafc] overflow-hidden p-8" dir="ltr">
      
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Admin <ChevronRight size={10} /> <span className="text-indigo-600">Content Library</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Library</h1>
        </div>
      
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <Input 
            prefix={<Search size={18} className="text-gray-400" />} 
            placeholder="Search for files, videos, documents..." 
            className="rounded-2xl border-gray-100 shadow-sm h-12 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* View Toggle Buttons */}
          <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm h-12">
            <button 
              onClick={() => setViewType('grid')}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${viewType === 'grid' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewType('list')}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${viewType === 'list' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>

          <Button icon={<Filter size={18} />} className="h-12 w-12 flex items-center justify-center rounded-2xl text-gray-400 border-gray-100 shadow-sm" />
        </div>
        <Button 
          type="primary" 
          icon={<Plus size={18} />} 
          className="h-12 px-6 rounded-2xl font-bold bg-indigo-600 flex items-center gap-2 text-white"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload Content
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {viewType === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {libraryItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold text-gray-700 uppercase">
                    {item.type}
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={16} />
                  </button>
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <Play size={20} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-800 truncate mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between">
                     <p className="text-[11px] font-bold text-gray-400">{item.size} • {item.date}</p>
                     <div className="flex items-center gap-2">
                       <button className="text-gray-300 hover:text-indigo-600 transition-colors"><Download size={14} /></button>
                       <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Size</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Added</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {libraryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-gray-800 truncate max-w-[300px]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-xs font-bold text-gray-500 uppercase">{item.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{item.size}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><Download size={16} /></button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all"><MoreVertical size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal - Imported Component */}
      <UploadContentModal 
        open={isUploadModalOpen} 
        onCancel={() => setIsUploadModalOpen(false)} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none;}
      `}} />
    </div>
  );
}
