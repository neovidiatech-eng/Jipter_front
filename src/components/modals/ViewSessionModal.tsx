import { X, Calendar, Clock, User, GraduationCap, BookOpen, Video, MapPin, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Schedule } from '../../types/scheduales';

interface ViewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Schedule | null;
  groupedSessions?: Schedule[];
  allSessions?: Schedule[];
}

export default function ViewSessionModal({ isOpen, onClose, session, groupedSessions, allSessions = [] }: ViewSessionModalProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];



  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return { date: '', time: '' };
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { date: dateString, time: '' };
      const formattedDate = date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit', minute: '2-digit'
      });
      return { date: formattedDate, time: formattedTime };
    } catch {
      return { date: dateString, time: '' };
    }
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    if (!isNaN(start) && !isNaN(end)) {
      return Math.max(0, Math.round((end - start) / 60000));
    }
    return 0;
  };

  if (!isOpen || !session) return null;

  const { date: sessionDate, time: sessionTime } = formatDateTime(session.start_time);
  const { time: endTime } = formatDateTime(session.end_time);
  const duration = calculateDuration(session.start_time, session.end_time);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-primary">
          <h2 className="text-2xl font-bold text-white">{t('sessionDetails')}</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          <div className="space-y-6">
            {/* Session Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 text-start mb-6">{session.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('studentLabel')}</p>
                    <p className="font-semibold text-gray-900">{session.student?.user?.name || '—'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('teacherLabel')}</p>
                    <p className="font-semibold text-gray-900">{session.teacher?.user?.name || '—'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('subjectLabel')}</p>
                    <p className="font-semibold text-gray-900">{session.description || '—'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('type') || (language === 'ar' ? 'نوع الحصة' : 'Type')}</p>
                    <p className="font-semibold text-gray-900">{t(session.type?.toLowerCase() || '') || session.type || '—'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('duration')}</p>
                    <p className="font-semibold text-gray-900">{duration} {t('minutes')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('dateTime')}</p>
                    <p className="font-semibold text-gray-900">{sessionDate}</p>
                    <p className="text-sm text-gray-500" dir="ltr">{sessionTime} — {endTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('status')}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(session.status)}`}>
                      {t(session.status?.toLowerCase() || '')}
                    </span>
                  </div>
                </div>

                {/* Notification Time */}
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs text-gray-500">{t('notificationTime') || (language === 'ar' ? 'وقت التنبيه' : 'Notification Time')}</p>
                    <p className="font-semibold text-gray-900">10 {t('minutes')}</p>
                  </div>
                </div>
              </div>

              {/* Meeting Link & Recurring Info */}
              {(session.is_recurring || session.parent_recurring_id) && groupedSessions && groupedSessions.length > 1 ? (
                <div className="mt-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-start">{t('recurringSessions') || (language === 'ar' ? 'الجلسات المتكررة' : 'Recurring Sessions')} ({groupedSessions.length})</h4>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto no-scrollbar">
                    <div className="space-y-3">
                      {groupedSessions.map(s => {
                        const { date, time } = formatDateTime(s.start_time);
                        const { time: endT } = formatDateTime(s.end_time);
                        return (
                          <div
                            key={s.id}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-4" dir="rtl">
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="text-xs text-gray-500 text-start">{t('scheduledDays') || (language === 'ar' ? 'اليوم' : 'Day')}</p>
                                  <p className="font-bold text-gray-900 text-start">{t(s.day_of_week?.toLowerCase() || '') || s.day_of_week || '—'}</p>
                                </div>

                                <div className="border-r border-gray-300 pr-4">
                                  <p className="text-xs text-gray-500 text-start">{t('date') || (language === 'ar' ? 'التاريخ' : 'Date')}</p>
                                  <p className="font-medium text-gray-900 text-start">{date}</p>
                                </div>

                                <div className="border-r border-gray-300 pr-4">
                                  <p className="text-xs text-gray-500 text-start">{t('time') || (language === 'ar' ? 'الوقت' : 'Time')}</p>
                                  <p className="font-medium text-gray-900 text-start" dir="ltr">
                                    {time} - {endT}
                                  </p>
                                </div>

                                <div className="border-r border-gray-300 pr-4">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(s.status)}`}>
                                    {t(s.status?.toLowerCase() || '')}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {s.link ? (
                                  <a
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                  >
                                    <Video className="w-4 h-4" />
                                    {t('joinSession') || (language === 'ar' ? 'دخول الحصة' : 'Join Session')}
                                  </a>
                                ) : (
                                  <span className="text-sm text-gray-400">{t('noLink') || (language === 'ar' ? 'لا يوجد رابط' : 'No link')}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                session.link && (
                  <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 text-start mb-2">{t('meetingLink')}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={session.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                      >
                        <Video className="w-4 h-4" />
                        {t('openLink')}
                      </a>
                      <div className="flex-1 text-sm text-gray-600 break-all text-start" dir="ltr">
                        {session.link}
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Notes */}
              {session.notes && (
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <p className="text-xs text-gray-500">{t('notes')}</p>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-700 text-start">{session.notes}</p>
                </div>
              )}
            </div>

            {/* Other sessions by same teacher */}
            {allSessions.length > 1 && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 text-start">
                    {t('otherTeacherSessions')} ({allSessions.length})
                  </h3>
                </div>

                <div className="p-4 max-h-72 overflow-y-auto no-scrollbar">
                  <div className="space-y-3">
                    {allSessions
                      .filter(s => s.id !== session.id)
                      .map((s) => {
                        const { date, time } = formatDateTime(s.start_time);
                        const dur = calculateDuration(s.start_time, s.end_time);
                        return (
                          <div
                            key={s.id}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-4" dir="rtl">
                              <div className="flex items-center gap-4 flex-1">
                                <div>
                                  <p className="font-bold text-gray-900 text-start">{s.title}</p>
                                  <p className="text-xs text-gray-500 text-start">{s.student?.user?.name}</p>
                                </div>

                                <div className="border-r border-gray-300 pr-4">
                                  <p className="text-xs text-gray-500 text-start">{t('dateTime')}</p>
                                  <p className="font-medium text-gray-900 text-start text-sm">{date}</p>
                                  <p className="text-xs text-gray-500" dir="ltr">{time}</p>
                                </div>

                                <div className="border-r border-gray-300 pr-4">
                                  <p className="text-xs text-gray-500 text-start">{t('duration')}</p>
                                  <p className="font-medium text-gray-900 text-start text-sm">{dur} {t('minutes')}</p>
                                </div>

                                <div>
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(s.status)}`}>
                                    {t(s.status?.toLowerCase() || '')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
