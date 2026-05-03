import React, { useState } from 'react';
import { Search, Filter, ChevronRight, CheckCircle2, X, Send, MoreVertical, ChevronDown } from 'lucide-react';
import { Table } from 'antd';

const mockRequests = [
  {
    id: '1',
    user: 'Addison Reed',
    userId: '#3458',
    type: 'Reschedule Session',
    date: 'Oct 24, 2023',
    priority: 'Medium',
    status: 'Pending',
    avatar: 'https://ui-avatars.com/api/?name=Addison+Reed&background=e0e7ff&color=4f46e5'
  },
  {
    id: '2',
    user: 'Marcus Aurelius',
    userId: '#5920',
    type: 'Course Cancellation',
    date: 'Oct 23, 2023',
    priority: 'High',
    status: 'Pending',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Aurelius&background=fce7f3&color=db2777'
  },
  {
    id: '3',
    user: 'Elena Smith',
    userId: '#4421',
    type: 'Missed Session',
    date: 'Oct 22, 2023',
    priority: 'Low',
    status: 'Approved',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Smith&background=dcfce7&color=16a34a'
  },
  {
    id: '4',
    user: 'Thomas Knight',
    userId: '#1193',
    type: 'Room Change',
    date: 'Oct 21, 2023',
    priority: 'Low',
    status: 'Approved',
    avatar: 'https://ui-avatars.com/api/?name=Thomas+Knight&background=fef3c7&color=d97706'
  }
];

export default function Requests() {
  const [activeTab, setActiveTab] = useState('student');
  const [selectedRequest, setSelectedRequest] = useState(mockRequests[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper styles
  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Pending': return 'text-amber-500';
      case 'Approved': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const columns = [
    {
      title: 'USER',
      dataIndex: 'user',
      key: 'user',
      render: (_: any, req: any) => (
        <div className="flex items-center gap-3">
          <img src={req.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-100 shadow-sm" />
          <div>
            <div className="text-sm font-bold text-gray-900">{req.user}</div>
            <div className="text-[10px] font-bold text-gray-400">{req.userId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{text}</span>,
    },
    {
      title: 'DATE SUBMITTED',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span className="text-[13px] font-bold text-gray-500 whitespace-nowrap">{text}</span>,
    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => (
        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md whitespace-nowrap ${getPriorityStyle(text)}`}>
          {text}
        </span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(text).replace('text-', 'bg-')}`}></div>
          <span className={`text-xs font-bold ${getStatusStyle(text)}`}>{text}</span>
        </div>
      ),
    },
    {
      title: 'ACTION',
      key: 'action',
      align: 'center' as const,
      render: (_: any, req: any) => (
        selectedRequest.id === req.id && isSidebarOpen ? (
          <span className="text-[10px] font-bold text-[#6366f1] tracking-widest uppercase">SELECTED</span>
        ) : (
          <button className="p-1 text-gray-400 hover:text-[#6366f1] rounded-full hover:bg-indigo-50 transition-colors inline-flex">
            <ChevronRight className="w-5 h-5" />
          </button>
        )
      ),
    },
  ];

  return (
    <div className="flex h-[calc(100vh-90px)] bg-[#f8fafc] overflow-hidden" dir="ltr">
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'mr-[400px]' : ''}`}>
        
        <div className="px-6 pt-6 pb-0 flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="mb-3 flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Requests Management</h1>
            <p className="text-sm font-medium text-gray-500">Review and handle all student and instructor administrative actions.</p>
          </div>

          <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 pt-4 border-b border-gray-100 flex items-center justify-between">
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab('student')}
                  className={`text-sm font-bold pb-4 -mb-[1px] border-b-2 transition-all ${activeTab === 'student' ? 'text-[#6366f1] border-[#6366f1]' : 'text-gray-400 border-transparent hover:text-gray-700'}`}
                >
                  Student Requests
                </button>
                <button 
                  onClick={() => setActiveTab('instructor')}
                  className={`text-sm font-bold pb-4 -mb-[1px] border-b-2 transition-all ${activeTab === 'instructor' ? 'text-[#6366f1] border-[#6366f1]' : 'text-gray-400 border-transparent hover:text-gray-700'}`}
                >
                  Instructor Requests
                </button>
              </div>

              <div className="flex items-center gap-3 pb-3">
                <div className="relative">
                  <select className="appearance-none pl-4 pr-8 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 cursor-pointer">
                    <option>Review All</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="appearance-none pl-4 pr-8 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 cursor-pointer">
                    <option>Last 30 Days</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <Table 
                columns={columns} 
                dataSource={mockRequests} 
                rowKey="id" 
                pagination={false} 
                className="w-full"
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedRequest(record);
                    setIsSidebarOpen(true);
                  },
                })}
                rowClassName={(record) => 
                  `hover:bg-gray-50/50 cursor-pointer transition-colors ${selectedRequest.id === record.id && isSidebarOpen ? 'bg-indigo-50/30' : ''}`
                }
              />
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
              .ant-table-thead > tr > th {
                background-color: white !important;
                color: #9ca3af !important;
                font-size: 10px !important;
                font-weight: 700 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.1em !important;
                border-bottom: 1px solid #f3f4f6 !important;
                padding: 16px 24px !important;
                white-space: nowrap !important;
              }
              .ant-table-tbody > tr > td {
                border-bottom: 1px solid #f9fafb !important;
                padding: 16px 24px !important;
              }
              /* Selected row border logic using pseudo element to avoid layout shift */
              .ant-table-tbody > tr.bg-indigo-50\\/30 > td:first-child {
                position: relative;
              }
              .ant-table-tbody > tr.bg-indigo-50\\/30 > td:first-child::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background-color: #6366f1;
              }
            `}} />

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-2xl">
              <span className="text-xs font-bold text-gray-400">Showing 1-4 of 24 records</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Previous</button>
                <button className="w-7 h-7 flex items-center justify-center text-xs font-bold text-white bg-[#6366f1] rounded-lg shadow-sm">1</button>
                <button className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">2</button>
                <button className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">3</button>
                <button className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Next</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Sidebar (Details) */}
      <div className={`fixed right-0 top-[90px] h-[calc(100vh-90px)] w-[400px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 z-30 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-gray-900">Request Details</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img src={selectedRequest.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-gray-100 shadow-sm" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">{selectedRequest.user}</h3>
              <p className="text-xs font-bold text-gray-400 mt-0.5">Student ID {selectedRequest.userId}</p>
            </div>
          </div>
          
          <div className="inline-flex px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
            Subject: <span className="ml-1 text-gray-900">{selectedRequest.type}</span>
          </div>

          {/* Message Box */}
          <div className="relative mt-2">
            <div className="absolute left-4 -top-4 text-5xl text-gray-200 font-serif leading-none h-4 overflow-visible select-none">"</div>
            <div className="bg-gray-50/80 rounded-2xl p-5 pt-7 text-sm font-semibold text-gray-600 leading-relaxed border border-gray-100/80 shadow-inner">
              I have secured a full-time internship starting next month which conflicts with my current evening schedule. I would like to cancel my enrollment for this semester if they don't...
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm">
             <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Original Slot</div>
                  <div className="text-xs font-bold text-gray-900">22 Oct, 04:00 PM</div>
                </div>
                <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded bg-red-50 text-red-600`}>High Priority</span>
             </div>
             <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500">Conflict check:</span>
                <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No conflicts found
                </span>
             </div>
          </div>

          {/* Admin Message */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-900 mb-2">Message Administrator (Send To):</label>
            <div className="relative">
              <textarea 
                className="w-full bg-white border border-gray-200 rounded-xl p-4 pr-12 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all resize-none h-28 shadow-sm placeholder:text-gray-400"
                defaultValue="We can try finding available slots first. But since it's an internship causing a great impact to this..."
              ></textarea>
              <button className="absolute right-3 bottom-3 p-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] shadow-sm transition-colors flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex gap-3 bg-white">
          <button className="flex-1 py-3 text-xs font-bold text-white bg-[#10b981] hover:bg-[#059669] rounded-xl shadow-sm transition-colors">
            Approve
          </button>
          <button className="flex-1 py-3 text-xs font-bold text-red-500 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-colors shadow-sm">
            Reject
          </button>
        </div>

      </div>

    </div>
  );
}
