import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Search, GraduationCap, Mail, Phone, BookOpen, Clock } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';

interface StudentData {
  id: string;
  name: string;
  grade: string;
  enrolledCourses: number;
  completedSessions: number;
  totalSessions: number;
  email: string;
  phone: string;
  lastActive: string;
}

export default function TeacherStudents() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for teacher's students
  const students: StudentData[] = [
    {
      id: 'STU-001',
      name: isRtl ? 'أحمد محمد' : 'Ahmed Mohamed',
      grade: isRtl ? 'الصف الأول الثانوي' : '1st Secondary',
      enrolledCourses: 3,
      completedSessions: 12,
      totalSessions: 20,
      email: 'ahmed@example.com',
      phone: '+201012345678',
      lastActive: '2023-10-25'
    },
    {
      id: 'STU-002',
      name: isRtl ? 'سارة محمود' : 'Sarah Mahmoud',
      grade: isRtl ? 'الصف الثاني الثانوي' : '2nd Secondary',
      enrolledCourses: 2,
      completedSessions: 8,
      totalSessions: 15,
      email: 'sarah@example.com',
      phone: '+201098765432',
      lastActive: '2023-10-24'
    },
    {
      id: 'STU-003',
      name: isRtl ? 'عمر خالد' : 'Omar Khaled',
      grade: isRtl ? 'الصف الثالث الإعدادي' : '3rd Preparatory',
      enrolledCourses: 4,
      completedSessions: 20,
      totalSessions: 24,
      email: 'omar@example.com',
      phone: '+201055556666',
      lastActive: '2023-10-21'
    }
  ];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6" style={{ color: settings.primaryColor }} />
          {isRtl ? 'طلابي' : 'My Students'}
        </h1>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isRtl ? 'بحث باسم الطالب...' : 'Search by student name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`block w-full ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all sm:text-sm`}
            style={{ '--tw-ring-color': settings.primaryColor } as any}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg" style={{ color: settings.primaryColor }}>
                  {student.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 truncate max-w-[150px]" title={student.name}>{student.name}</h3>
                  <p className="text-xs text-gray-500">{student.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4 opacity-70" />
                <span>{student.grade}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 opacity-70" />
                <span className="truncate" title={student.email}>{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 opacity-70" />
                <span dir="ltr">{student.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center p-2 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-xs font-medium">{isRtl ? 'الكورسات' : 'Courses'}</span>
                </div>
                <span className="font-bold text-gray-900">{student.enrolledCourses}</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">{isRtl ? 'الحصص' : 'Sessions'}</span>
                </div>
                <span className="font-bold text-gray-900">{student.completedSessions}/{student.totalSessions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">{isRtl ? 'لم يتم العثور على طلاب' : 'No students found'}</h3>
          <p className="text-gray-500">
            {isRtl ? 'جرب البحث باسم آخر.' : 'Try searching with a different name.'}
          </p>
        </div>
      )}
    </div>
  );
}
