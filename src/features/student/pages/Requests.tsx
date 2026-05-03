import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';

interface StudentRequest {
  id: string;
  type: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  reply?: string;
}

export default function StudentRequests() {
  const { i18n } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';

  const [requests, setRequests] = useState<StudentRequest[]>([
    {
      id: 'REQ-001',
      type: isRtl ? 'تأجيل حصة' : 'Postpone Session',
      date: '2023-11-15',
      status: 'approved',
      reason: isRtl ? 'ظروف عائلية طارئة تمنعني من الحضور هذا الأسبوع.' : 'Family emergency preventing me from attending this week.',
      reply: isRtl ? 'تم التأجيل بنجاح. سيتم تعويض الحصة لاحقاً.' : 'Postponed successfully. The session will be compensated later.'
    },
    {
      id: 'REQ-002',
      type: isRtl ? 'طلب إجازة' : 'Leave Request',
      date: '2023-12-01',
      status: 'pending',
      reason: isRtl ? 'أحتاج إلى إجازة لمدة 3 أيام للراحة.' : 'I need a 3-day leave for rest.'
    },
    {
      id: 'REQ-003',
      type: isRtl ? 'تغيير موعد' : 'Change Schedule',
      date: '2023-10-20',
      status: 'rejected',
      reason: isRtl ? 'أريد تغيير موعد الحصة إلى يوم الأربعاء.' : 'I want to change the session to Wednesday.',
      reply: isRtl ? 'عذراً، يوم الأربعاء محجوز بالكامل للمدرس.' : 'Sorry, Wednesday is fully booked for the teacher.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequestType, setNewRequestType] = useState(isRtl ? 'تأجيل حصة' : 'Postpone Session');
  const [newRequestReason, setNewRequestReason] = useState('');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestReason.trim()) return;

    const newReq: StudentRequest = {
      id: `REQ-00${requests.length + 4}`,
      type: newRequestType,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      reason: newRequestReason
    };

    setRequests([newReq, ...requests]);
    setNewRequestReason('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: StudentRequest['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {isRtl ? 'مقبول' : 'Approved'}
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {isRtl ? 'مرفوض' : 'Rejected'}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isRtl ? 'قيد الانتظار' : 'Pending'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{isRtl ? 'الطلبات' : 'Requests'}</h1>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:opacity-90 shadow-sm hover:shadow-md"
          style={{ backgroundColor: settings.primaryColor }}
        >
          <Plus className="w-5 h-5" />
          {isRtl ? 'تقديم طلب جديد' : 'Submit New Request'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${settings.primaryColor}15`, color: settings.primaryColor }}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{request.type}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {isRtl ? 'رقم الطلب:' : 'Request ID:'} {request.id} • {request.date}
                    </p>
                  </div>
                </div>
                {getStatusBadge(request.status)}
              </div>
              
              <div className="pl-0 sm:pr-14 sm:pl-14">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {isRtl ? 'التفاصيل:' : 'Details:'} <span className="font-normal text-gray-600">{request.reason}</span>
                  </p>
                  {request.reply && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {isRtl ? 'رد الإدارة:' : 'Admin Reply:'} <span className="font-normal text-gray-600">{request.reply}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {requests.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>{isRtl ? 'لا توجد طلبات سابقة' : 'No previous requests found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center" style={{ backgroundColor: settings.primaryColor }}>
              <h2 className="text-lg font-bold text-white">{isRtl ? 'تقديم طلب جديد' : 'Submit New Request'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateRequest} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {isRtl ? 'نوع الطلب' : 'Request Type'}
                  </label>
                  <select 
                    value={newRequestType}
                    onChange={(e) => setNewRequestType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    required
                  >
                    <option value={isRtl ? 'تأجيل حصة' : 'Postpone Session'}>{isRtl ? 'تأجيل حصة' : 'Postpone Session'}</option>
                    <option value={isRtl ? 'طلب إجازة' : 'Leave Request'}>{isRtl ? 'طلب إجازة' : 'Leave Request'}</option>
                    <option value={isRtl ? 'تغيير موعد' : 'Change Schedule'}>{isRtl ? 'تغيير موعد' : 'Change Schedule'}</option>
                    <option value={isRtl ? 'طلب آخر' : 'Other'}>{isRtl ? 'طلب آخر' : 'Other'}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {isRtl ? 'التفاصيل / السبب' : 'Details / Reason'}
                  </label>
                  <textarea 
                    value={newRequestReason}
                    onChange={(e) => setNewRequestReason(e.target.value)}
                    rows={4}
                    placeholder={isRtl ? 'اكتب تفاصيل طلبك هنا...' : 'Write your request details here...'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {isRtl ? 'إرسال الطلب' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
