import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Pagination from '../../../components/ui/Pagination';

interface Assignment {
  id: string;
  studentName: string;
  subject: string;
  teacher: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export default function Assignments() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    status: '',
    subject: '',
    teacher: '',
    student: ''
  });
  const itemsPerPage = 10;

  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      studentName: 'Ahmed Gamal',
      subject: 'القرآن الكريم',
      teacher: 'مها محمد',
      title: 'rrr',
      description: 'rr',
      dueDate: '2026-01-12',
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'هدير عبده',
      subject: 'اللغة العربية',
      teacher: 'مها محمد',
      title: 'test',
      description: 'test',
      dueDate: '2026-01-10',
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'هدير عبده',
      subject: 'القرآن الكريم',
      teacher: 'مها محمد',
      title: 'twee',
      description: 'eee',
      dueDate: '2026-01-10',
      status: 'pending'
    },
    {
      id: '4',
      studentName: 'Ahmed Gamal',
      subject: 'القرآن الكريم',
      teacher: 'مها محمد',
      title: 'فش',
      description: 'سس',
      dueDate: '2026-01-09',
      status: 'pending'
    },
    {
      id: '5',
      studentName: 'Ahmed Gamal',
      subject: 'القرآن الكريم',
      teacher: 'مها محمد',
      title: 'drrr',
      description: 'rrrr',
      dueDate: '2026-01-08',
      status: 'pending'
    },
    {
      id: '6',
      studentName: 'هدير عبده',
      subject: 'اللغة العربية',
      teacher: 'مها محمد',
      title: 'rfr',
      description: 'rrr',
      dueDate: '2026-01-09',
      status: 'pending'
    },
    {
      id: '7',
      studentName: 'عمر',
      subject: 'نسيت',
      teacher: 'محمد عبدالرازق',
      title: 'ff',
      description: 'ff',
      dueDate: '2026-01-10',
      status: 'pending'
    },
    {
      id: '8',
      studentName: 'احمد المصري',
      subject: 'نسيت',
      teacher: 'Ahmed Ali',
      title: 'tee',
      description: 'eee',
      dueDate: '2026-01-01',
      status: 'pending'
    },
    {
      id: '9',
      studentName: 'احمد جمال',
      subject: 'القرآن الكريم',
      teacher: 'ابراهيم مسلم',
      title: 'واجب الوحدة الثالثة',
      description: 'حل الأسئلة من 1 الى 10',
      dueDate: '2025-12-30',
      status: 'pending'
    }
  ]);

  const text = {
    title: { ar: 'الواجبات', en: 'Assignments' },
    search: { ar: 'بحث بالطالب أو العنوان...', en: 'Search by student or title...' },
    addAssignment: { ar: 'إضافة واجب', en: 'Add Assignment' },
    filters: { ar: 'الفلاتر الشائعة', en: 'Common filters' },
    columnStudent: { ar: 'الطالب', en: 'Student' },
    columnSubject: { ar: 'المادة', en: 'Subject' },
    columnTeacher: { ar: 'المعلم', en: 'Teacher' },
    columnTitle: { ar: 'العنوان', en: 'Title' },
    columnDescription: { ar: 'الوصف', en: 'Description' },
    columnDueDate: { ar: 'تاريخ التسليم', en: 'Due Date' },
    columnStatus: { ar: 'الحالة', en: 'Status' },
    columnActions: { ar: 'الإجراءات', en: 'Actions' },
    pending: { ar: 'قيد الانتظار', en: 'Pending' },
    submitted: { ar: 'تم التسليم', en: 'Submitted' },
    graded: { ar: 'تم التصحيح', en: 'Graded' },
    showing: { ar: 'الصفحة', en: 'Page' },
    of: { ar: 'من', en: 'of' },
    total: { ar: 'الإجمالي', en: 'Total' },
    previous: { ar: 'السابق', en: 'Previous' },
    next: { ar: 'التالي', en: 'Next' }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch =
      assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || assignment.status === filters.status;
    const matchesSubject = !filters.subject || assignment.subject === filters.subject;
    const matchesTeacher = !filters.teacher || assignment.teacher === filters.teacher;
    const matchesStudent = !filters.student || assignment.studentName === filters.student;

    return matchesSearch && matchesStatus && matchesSubject && matchesTeacher && matchesStudent;
  });

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssignments = filteredAssignments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{text.title[language]}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={text.search[language]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start"
                dir="rtl"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              {text.filters[language]}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-start"
                dir="rtl"
              >
                <option value="">{text.columnStatus[language]}</option>
                <option value="pending">{text.pending[language]}</option>
                <option value="submitted">{text.submitted[language]}</option>
                <option value="graded">{text.graded[language]}</option>
              </select>
              <input
                type="text"
                placeholder={text.columnTeacher[language]}
                value={filters.subject}
                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-start"
                dir="rtl"
              />
              <input
                type="text"
                placeholder={text.columnSubject[language]}
                value={filters.teacher}
                onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-start"
                dir="rtl"
              />
              <input
                type="text"
                placeholder={text.columnStudent[language]}
                value={filters.student}
                onChange={(e) => setFilters({ ...filters, student: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-start"
                dir="rtl"
              />
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" dir={language === "ar" ? "rtl" : "ltr"}>
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnStudent[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnTeacher[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnSubject[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnTitle[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnDescription[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnDueDate[language]}</th>
                <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">{text.columnStatus[language]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-start text-gray-900 font-medium">{assignment.studentName}</td>
                  <td className="px-6 py-4 text-start text-gray-900">{assignment.teacher}</td>
                  <td className="px-6 py-4 text-start">
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                      {assignment.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-start text-gray-900 font-medium">{assignment.title}</td>
                  <td className="px-6 py-4 text-start text-gray-600">{assignment.description}</td>
                  <td className="px-6 py-4 text-start text-gray-600">{assignment.dueDate}</td>
                  <td className="px-6 py-4 text-start">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${assignment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : assignment.status === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                      }`}>
                      {text[assignment.status][language]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAssignments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
