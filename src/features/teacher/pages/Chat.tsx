import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MoreVertical, Search, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'student';
  timestamp: string;
}

interface ChatStudent {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
}

export default function TeacherChat() {
  const { i18n } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: isRtl ? 'السلام عليكم يا أستاذ.' : 'Hello teacher.', sender: 'student', timestamp: '10:00 AM' },
    { id: '2', text: isRtl ? 'وعليكم السلام، كيف حالك؟' : 'Hello, how are you?', sender: 'me', timestamp: '10:05 AM' },
    { id: '3', text: isRtl ? 'لدي سؤال بخصوص الواجب الأخير، هل يمكنك توضيح السؤال الثاني؟' : 'I have a question about the last assignment, can you clarify the second question?', sender: 'student', timestamp: '10:15 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const studentsList: ChatStudent[] = [
    { id: 'STU-001', name: isRtl ? 'أحمد محمد' : 'Ahmed Mohamed', lastMessage: isRtl ? 'لدي سؤال...' : 'I have a question...', unreadCount: 1 },
    { id: 'STU-002', name: isRtl ? 'سارة محمود' : 'Sarah Mahmoud', lastMessage: isRtl ? 'شكراً لك' : 'Thank you', unreadCount: 0 },
    { id: 'STU-003', name: isRtl ? 'عمر خالد' : 'Omar Khaled', lastMessage: isRtl ? 'متى موعد الحصة؟' : 'When is the session?', unreadCount: 3 },
  ];
  
  const [selectedStudent, setSelectedStudent] = useState<ChatStudent>(studentsList[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    scrollToBottom();
  };

  return (
    <div className="h-[calc(100vh-120px)] animate-fade-in flex flex-col md:flex-row gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar for Students List */}
      <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-1/3 md:h-full shrink-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={isRtl ? 'بحث في المحادثات...' : 'Search chats...'}
              className={`block w-full ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              style={{ '--tw-ring-color': settings.primaryColor } as any}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {studentsList.map(student => (
            <div 
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`p-4 border-b border-gray-50 flex items-center gap-3 cursor-pointer transition-colors ${selectedStudent.id === student.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  {student.name.substring(0,2)}
                </div>
                {student.unreadCount > 0 && (
                  <div className={`absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center font-bold`} style={{ backgroundColor: settings.primaryColor }}>
                    {student.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{student.name}</h4>
                <p className="text-sm text-gray-500 truncate">{student.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-2/3 md:h-full relative">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: settings.primaryColor }}>
              {selectedStudent.name.substring(0,1)}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{selectedStudent.name}</h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                 {isRtl ? 'متصل الآن' : 'Online'}
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.02\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}>
          {messages.map((message) => {
            const isMe = message.sender === 'me';
            return (
              <div key={message.id} className={`flex flex-col ${isMe ? (isRtl ? 'items-end' : 'items-end') : (isRtl ? 'items-start' : 'items-start')}`}>
                <div 
                  className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm relative ${
                    isMe 
                      ? 'text-white rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }`}
                  style={isMe ? { backgroundColor: settings.primaryColor } : {}}
                >
                  <p className="leading-relaxed text-sm">{message.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 text-[11px] text-gray-400 ${isRtl ? 'mr-1' : 'ml-1'}`}>
                  <span>{message.timestamp}</span>
                  {isMe && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Type your message...'}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              style={{ '--tw-ring-color': settings.primaryColor } as any}
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''} ${!isRtl ? 'ml-1' : 'mr-1'}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
