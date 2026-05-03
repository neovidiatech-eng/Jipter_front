import { X, Clock, Link as LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Schedule } from '../../types/scheduales';
import CustomSelect from '../ui/CustomSelect';

interface EditSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Schedule | null;
  onSave: (id: string, data: any) => void;
}

export default function EditSessionModal({ isOpen, onClose, session, onSave }: EditSessionModalProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    notes: '',
    status: '',
    start_time: '',
    end_time: '',
    type: 'full' as 'full' | 'half',
    notification_Time: '10',
  });

  useEffect(() => {
    if (session && isOpen) {
      const startDate = session.start_time ? new Date(session.start_time) : null;
      const endDate = session.end_time ? new Date(session.end_time) : null;
      setFormData({
        title: session.title || '',
        description: session.description || '',
        link: session.link || '',
        notes: session.notes || '',
        status: session.status || 'scheduled',
        start_time: startDate ? startDate.toISOString().slice(0, 16) : '',
        end_time: endDate ? endDate.toISOString().slice(0, 16) : '',
        type: (session.type as 'full' | 'half') || 'full',
        notification_Time: '10',
      });
    }
  }, [session, isOpen]);

  if (!isOpen || !session) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(session.id, {
      title: formData.title,
      description: formData.description,
      link: formData.link,
      notes: formData.notes,
      status: formData.status,
      start_time: formData.start_time ? new Date(formData.start_time).toISOString() : session.start_time,
      type: formData.type,
      notification_Time: formData.notification_Time,
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-primary p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{t('editSession')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-6 space-y-6">
            {/* Read-only info */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 text-start mb-3">{t('sessionInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-start">
                  <p className="text-xs text-gray-500">{t('studentLabel')}</p>
                  <p className="font-semibold text-gray-900">{session.student?.user?.name || '—'}</p>
                </div>
                <div className="text-start">
                  <p className="text-xs text-gray-500">{t('teacherLabel')}</p>
                  <p className="font-semibold text-gray-900">{session.teacher?.user?.name || '—'}</p>
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="space-y-4">
              {/* Title */}
              <div className="text-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('sessionTitleLabel')} *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start"
                />
              </div>

              {/* Description */}
              <div className="text-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start resize-none"
                />
              </div>

              {/* Status & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('status')}</label>
                  <CustomSelect
                    value={formData.status}
                    onChange={(val) => handleChange('status', val as string)}
                    options={[
                      { value: 'scheduled', label: t('scheduled') },
                      { value: 'completed', label: t('completed') },
                      { value: 'cancelled', label: t('cancelled') },
                    ]}
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('type')}</label>
                  <CustomSelect
                    value={formData.type}
                    onChange={(val) => handleChange('type', val as string)}
                    options={[
                      { value: 'full', label: language === 'ar' ? 'كاملة' : 'Full' },
                      { value: 'half', label: language === 'ar' ? 'نصف' : 'Half' },
                    ]}
                  />
                </div>
              </div>

              {/* Start Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline ml-2" />
                    {t('startTime')}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) => handleChange('start_time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    dir="ltr"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline ml-2" />
                    {t('endTime')}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => handleChange('end_time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Meeting Link */}
              <div className="text-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline ml-2" />
                  {t('meetingLink')}
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleChange('link', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  dir="ltr"
                  placeholder="https://zoom.us/..."
                />
              </div>

              {/* Notes */}
              <div className="text-start">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('notes')}</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-colors"
            >
              {t('saveChanges')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
