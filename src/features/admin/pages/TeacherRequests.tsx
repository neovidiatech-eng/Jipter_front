import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Eye, Calendar, User } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import CustomSelect from '../../../components/ui/CustomSelect';

type RequestStatus = 'pending' | 'approved' | 'rejected';
type RequestType = 'leave' | 'permission' | 'sick' | 'vacation' | 'other';

interface TeacherRequest {
  id: string;
  teacherName: string;
  teacherSubject: string;
  type: RequestType;
  fromDate: string;
  toDate: string;
  reason: string;
  status: RequestStatus;
  submittedAt: string;
  sessionCount: number;
}

const INITIAL_REQUESTS: TeacherRequest[] = [
  {
    id: '1',
    teacherName: 'Ahmed Ali',
    teacherSubject: 'القرآن الكريم',
    type: 'vacation',
    fromDate: '2026-03-10',
    toDate: '2026-03-14',
    reason: 'إجازة سنوية مستحقة',
    status: 'pending',
    submittedAt: '2026-03-02',
    sessionCount: 3
  },
  {
    id: '2',
    teacherName: 'محمد عبدالباري',
    teacherSubject: 'حساب، تفسير',
    type: 'sick',
    fromDate: '2026-03-05',
    toDate: '2026-03-06',
    reason: 'إجازة مرضية - وثيقة طبية مرفقة',
    status: 'pending',
    submittedAt: '2026-03-01',
    sessionCount: 2
  },
  {
    id: '3',
    teacherName: 'سارة أحمد',
    teacherSubject: 'الكيمياء',
    type: 'permission',
    fromDate: '2026-03-03',
    toDate: '2026-03-03',
    reason: 'موعد شخصي - تأجيل الحصص',
    status: 'approved',
    submittedAt: '2026-02-28',
    sessionCount: 1
  },
  {
    id: '4',
    teacherName: 'أحمد محمد',
    teacherSubject: 'الفيزياء',
    type: 'leave',
    fromDate: '2026-02-20',
    toDate: '2026-02-21',
    reason: 'ظروف عائلية طارئة',
    status: 'rejected',
    submittedAt: '2026-02-19',
    sessionCount: 4
  }
];

const REQUEST_TYPES: Record<RequestType, { ar: string; en: string; color: string }> = {
  leave: { ar: 'استئذان', en: 'Leave', color: 'bg-yellow-100 text-yellow-700' },
  permission: { ar: 'إذن', en: 'Permission', color: 'badge-primary' },
  sick: { ar: 'إجازة مرضية', en: 'Sick Leave', color: 'bg-red-100 text-red-700' },
  vacation: { ar: 'إجازة سنوية', en: 'Vacation', color: 'bg-green-100 text-green-700' },
  other: { ar: 'أخرى', en: 'Other', color: 'bg-gray-100 text-gray-700' }
};

export default function TeacherRequests() {
  const { language } = useLanguage();
  const [requests, setRequests] = useState<TeacherRequest[]>(INITIAL_REQUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | RequestStatus>('all');
  const [filterType, setFilterType] = useState<'all' | RequestType>('all');
  const [selectedRequest, setSelectedRequest] = useState<TeacherRequest | null>(null);

  const filtered = requests.filter(r => {
    const matchSearch = r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchType = filterType === 'all' || r.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    if (selectedRequest?.id === id) setSelectedRequest(prev => prev ? { ...prev, status: 'approved' } : null);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    if (selectedRequest?.id === id) setSelectedRequest(prev => prev ? { ...prev, status: 'rejected' } : null);
  };

  const getStatusBadge = (status: RequestStatus) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'approved') return 'bg-green-100 text-green-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusLabel = (status: RequestStatus) => {
    const labels = {
      pending: { ar: 'معلق', en: 'Pending' },
      approved: { ar: 'مقبول', en: 'Approved' },
      rejected: { ar: 'مرفوض', en: 'Rejected' }
    };
    return labels[status][language];
  };

const statusFilterOptions = [
  { value: 'all', label: language === 'ar' ? 'كل الحالات' : 'All Statuses' },
  { value: 'pending', label: language === 'ar' ? 'معلق' : 'Pending' },
  { value: 'approved', label: language === 'ar' ? 'مقبول' : 'Approved' },
  { value: 'rejected', label: language === 'ar' ? 'مرفوض' : 'Rejected' },
];

const typeFilterOptions = [
  { value: 'all', label: language === 'ar' ? 'كل الأنواع' : 'All Types' },
  ...(Object.keys(REQUEST_TYPES) as RequestType[]).map((t) => ({
    value: t,
    label: REQUEST_TYPES[t][language],
  })),
];

  return (
    <div className="p-6 space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{language === 'ar' ? 'طلبات المعلمين' : 'Teacher Requests'}</h1>
          <p className="text-gray-500 text-sm mt-1">{language === 'ar' ? 'إجازات، استئذانات، وطلبات أخرى' : 'Leaves, permissions, and other requests'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'بانتظار المراجعة' : 'Pending'}</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مقبولة' : 'Approved'}</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-xl">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'مرفوضة' : 'Rejected'}</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث باسم المعلم...' : 'Search teacher name...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary text-start"
          />
        </div>
         
       <CustomSelect
    value={filterStatus}
    options={statusFilterOptions}
    onChange={(val) => setFilterStatus(val as 'all' | RequestStatus)}
  />

  <CustomSelect
    value={filterType}
    options={typeFilterOptions}
    onChange={(val) => setFilterType(val as 'all' | RequestType)}
  />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{language === 'ar' ? 'لا توجد طلبات' : 'No requests found'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'المعلم' : 'Teacher'}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'نوع الطلب' : 'Type'}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'الفترة' : 'Period'}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'الحصص المتأثرة' : 'Affected Sessions'}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{request.teacherName}</p>
                          <p className="text-xs text-gray-400">{request.teacherSubject}</p>
                        </div>
                        <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${REQUEST_TYPES[request.type].color}`}>
                        {REQUEST_TYPES[request.type][language]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-start">
                      <p className="text-sm text-gray-900">{request.fromDate}</p>
                      {request.fromDate !== request.toDate && (
                        <p className="text-xs text-gray-400">{language === 'ar' ? 'حتى' : 'to'} {request.toDate}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-start">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                        <Calendar className="w-3 h-3" />
                        {request.sessionCount} {language === 'ar' ? 'حصة' : 'sessions'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          title={language === 'ar' ? 'عرض' : 'View'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title={language === 'ar' ? 'قبول' : 'Approve'}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={language === 'ar' ? 'رفض' : 'Reject'}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedRequest(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
              <h2 className="text-lg font-bold text-gray-900">{language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 justify-start">
                <div className="text-start">
                  <p className="font-bold text-gray-900 text-lg">{selectedRequest.teacherName}</p>
                  <p className="text-sm text-gray-500">{selectedRequest.teacherSubject}</p>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-start">
                  <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'نوع الطلب' : 'Type'}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${REQUEST_TYPES[selectedRequest.type].color}`}>
                    {REQUEST_TYPES[selectedRequest.type][language]}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-start">
                  <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الحالة' : 'Status'}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedRequest.status)}`}>
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-start">
                  <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'من تاريخ' : 'From'}</p>
                  <p className="font-medium text-gray-900 text-sm">{selectedRequest.fromDate}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-start">
                  <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'إلى تاريخ' : 'To'}</p>
                  <p className="font-medium text-gray-900 text-sm">{selectedRequest.toDate}</p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-start">
                <p className="text-xs text-orange-600 mb-1">{language === 'ar' ? 'الحصص المتأثرة' : 'Affected Sessions'}</p>
                <p className="font-bold text-orange-700 text-xl">{selectedRequest.sessionCount} {language === 'ar' ? 'حصة' : 'sessions'}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-start">
                <p className="text-xs text-gray-500 mb-2">{language === 'ar' ? 'السبب' : 'Reason'}</p>
                <p className="text-gray-800 text-sm">{selectedRequest.reason}</p>
              </div>

              {selectedRequest.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { handleReject(selectedRequest.id); setSelectedRequest(null); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 font-medium transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    {language === 'ar' ? 'رفض' : 'Reject'}
                  </button>
                  <button
                    onClick={() => { handleApprove(selectedRequest.id); setSelectedRequest(null); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {language === 'ar' ? 'قبول' : 'Approve'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
