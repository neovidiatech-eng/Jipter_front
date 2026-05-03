import { useState, } from 'react';
import { PlayCircle, Plus, Search, BookOpen, MoreVertical, Edit, Trash2, Eye, Layers } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Course, Level, LevelColorOption } from '../../../../types/lmsCourses';
import CourseViewer from '../../../../components/features/LMS/CourseViewer';
import CourseModal from '../../../../components/modals/CourseModal';
import LevelsModal from '../../../../components/modals/ShowLevelModal';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CourseFormData, getCourseSchema } from '../../../../lib/schemas/CourseSchema';



const subjectCategories = ['الكل', 'رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية', 'فيزياء', 'كيمياء', 'أحياء', 'تاريخ', 'جغرافيا', 'تربية إسلامية'];
const levelColorOptions: LevelColorOption[] = [
  { label: 'green', value: 'bg-green-100 text-green-700' },
  { label: 'blue', value: 'bg-blue-100 text-blue-700' },
  { label: 'red', value: 'bg-red-100 text-red-700' },
  { label: 'yellow', value: 'bg-yellow-100 text-yellow-700' },
  { label: 'orange', value: 'bg-orange-100 text-orange-700' },
];

export const defaultLevels: Level[] = [
  { id: 1, name: 'مبتدئ', color: 'bg-green-100 text-green-700' },
  { id: 2, name: 'متوسط', color: 'bg-yellow-100 text-yellow-700' },
  { id: 3, name: 'متقدم', color: 'bg-red-100 text-red-700' },
];

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'أساسيات الرياضيات',
    description: 'كورس شامل في أساسيات الرياضيات يغطي الجبر والهندسة والحساب',
    category: 'رياضيات',
    levelId: 1,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/6256258/pexels-photo-6256258.jpeg?auto=compress&cs=tinysrgb&w=400',
    attachments: [],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'الفيزياء المتقدمة',
    description: 'دراسة متعمقة في مفاهيم الفيزياء الكلاسيكية والحديثة',
    category: 'فيزياء',
    levelId: 3,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    attachments: [],
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    title: 'اللغة العربية والإملاء',
    description: 'تعلم قواعد اللغة العربية والإملاء الصحيح للمراحل الابتدائية',
    category: 'لغة عربية',
    levelId: 1,
    videoUrl: '',
    thumbnailUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    attachments: [],
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    title: 'الكيمياء العضوية',
    description: 'مقدمة في الكيمياء العضوية وأهم المركبات والتفاعلات الكيميائية',
    category: 'كيمياء',
    levelId: 2,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: '',
    attachments: [],
    createdAt: '2024-03-05'
  },
];

export function getVideoEmbed(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

export function getYoutubeThumbnail(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
}

// function formatFileSize(bytes: number): string {
//   if (bytes < 1024) return bytes + ' B';
//   if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//   return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
// }

// function getFileIcon(type: string) {
//   if (type.startsWith('image/')) return Image;
//   if (type === 'application/pdf') return FileText;
//   return File;
// }
// let attachFileId = 1;

export default function LMSCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [levels, setLevels] = useState<Level[]>(defaultLevels);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);

  const [showLevelsModal, setShowLevelsModal] = useState(false);
  const [newLevelName, setNewLevelName] = useState('');
  const [newLevelColor, setNewLevelColor] = useState(levelColorOptions[0].value);

  const [nextId, setNextId] = useState(mockCourses.length + 1);
  const { t, language } = useLanguage()
  const methods = useForm<CourseFormData>({
    resolver: zodResolver(getCourseSchema(t)),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      levelId: 1,
      videoUrl: '',
      thumbnailFile: null,
      thumbnailPreview: '',
      attachments: [],
    } as CourseFormData,
  });

  const { reset } = methods;

  const location = useLocation();
  const isStudent = location.pathname.includes('/student-dashboard') || location.pathname.includes('/teacher-dashboard');


  const filtered = courses.filter(c => {
    const matchSearch = c.title.includes(search) || c.description.includes(search);
    const matchCategory = selectedCategory === 'الكل' || c.category === selectedCategory;
    const matchLevel = selectedLevelId === null || c.levelId === selectedLevelId;
    return matchSearch && matchCategory && matchLevel;
  });

  const getLevelById = (id: number) => levels.find(l => l.id === id);

  const getDisplayThumbnail = (course: Course) => {
    if (course.thumbnailUrl) return course.thumbnailUrl;
    if (course.videoUrl) return getYoutubeThumbnail(course.videoUrl);
    return null;
  };

  const handleDelete = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  const openAdd = () => {
    reset({
      title: '',
      description: '',
      category: 'رياضيات',
      levelId: levels[0]?.id ?? 1,
      videoUrl: '',
      attachments: [],
      thumbnailPreview: ''
    });
    setShowAddModal(true);
  };

  const openEdit = (course: Course) => {
    reset({
      title: course.title,
      description: course.description,
      category: course.category,
      levelId: course.levelId,
      videoUrl: course.videoUrl,
      thumbnailFile: null,
      thumbnailPreview: course.thumbnailUrl,
      attachments: [...course.attachments],
    });
    setEditCourse(course);
    setOpenMenuId(null);
  };

  const onAddSubmit = (data: CourseFormData) => {
    const newCourse: Course = {
      id: nextId,
      title: data.title,
      description: data.description || '',
      category: data.category,
      levelId: data.levelId,
      videoUrl: data.videoUrl || '',
      thumbnailUrl: data.thumbnailPreview || '',
      attachments: data.attachments || [],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setCourses(prev => [...prev, newCourse]);
    setNextId(n => n + 1);
    setShowAddModal(false);
    reset();
  };
  const onEditSubmit = (data: CourseFormData) => {
    if (!editCourse) return;

    setCourses(prev => prev.map(c => c.id === editCourse.id ? {
      ...c,
      title: data.title,
      description: data.description || '',
      category: data.category,
      levelId: data.levelId,
      videoUrl: data.videoUrl || '',
      thumbnailUrl: data.thumbnailPreview || c.thumbnailUrl,
      attachments: data.attachments || [],
    } : c));

    setEditCourse(null);
    reset();
  }
  const handleAddLevel = () => {
    if (!newLevelName.trim()) return;
    const newId = Math.max(0, ...levels.map(l => l.id)) + 1;
    setLevels(prev => [...prev, { id: newId, name: newLevelName.trim(), color: newLevelColor }]);
    setNewLevelName('');
    setNewLevelColor(levelColorOptions[0].value);
  };

  const handleDeleteLevel = (id: number) => {
    setLevels(prev => prev.filter(l => l.id !== id));
  };

  if (viewCourse) {
    return (
      <CourseViewer
        course={viewCourse}
        levels={levels}
        onBack={() => setViewCourse(null)}
      />
    );
  }

  const isRtl = language === 'ar';
  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('courses_title')} </h1>
          <p className="text-gray-500 text-sm mt-1">{t('courses_subtitle')}</p>
        </div>
        {!isStudent && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowLevelsModal(true)}
              className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
            >
              <Layers className="w-4 h-4" />
              {t('courses_manage_levels')}
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 btn-primary text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm"
            >
              <Plus className="w-4 h-4" />
              {t('courses_add')}
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: t('courses_total'), value: courses.length, color: 'bg-primary-light text-white', icon: BookOpen },
          { label: t('courses_levels'), value: levels.length, color: 'bg-green-50 text-green-600', icon: Layers },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`inline-flex p-2 rounded-lg ${s.color} mb-2`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('courses_search_placeholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {subjectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'btn-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {levels.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedLevelId(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedLevelId === null ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {t('courses_all_levels')}
            </button>
            {levels.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLevelId(selectedLevelId === l.id ? null : l.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedLevelId === l.id ? l.color + ' ring-2 ring-offset-1 ring-gray-400' : l.color + ' opacity-60 hover:opacity-100'
                  }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} </p>
        < div className="flex gap-1 bg-gray-100 rounded-lg p-1" >
          <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>شبكة</button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>قائمة</button>
        </div>
      </div>

      {/* Grid View */}
      {
        viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(course => {
              const level = getLevelById(course.levelId);
              const thumb = getDisplayThumbnail(course);
              return (
                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                  {/* Thumbnail */}
                  <div
                    className="relative h-44 overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setViewCourse(course)}
                  >
                    {thumb ? (
                      <img src={thumb} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-light">
                        <BookOpen className="w-12 h-12 text-primary opacity-30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {course.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Actions menu */}
                    {!isStudent && (
                      <div className="absolute top-3 left-3" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                          className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-700" />
                        </button>
                        {openMenuId === course.id && (
                          <div className="absolute left-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 z-10 min-w-[140px]">
                            <button onClick={() => { setViewCourse(course); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4" /> {t('courses_view')}
                            </button>
                            <button onClick={() => openEdit(course)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Edit className="w-4 h-4" /> {t('courses_edit')}
                            </button>
                            <button onClick={() => handleDelete(course.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" /> {t('courses_delete')}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary-light text-white px-2 py-1 rounded-full font-medium">{course.category}</span>
                      {level && <span className={`text-xs px-2 py-1 rounded-full font-medium ${level.color}`}>{level.name}</span>}
                      {course.attachments.length > 0 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{course.attachments.length} {t('file')}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-start">{course.title}</h3>
                    {course.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 text-start mb-3">{course.description}</p>
                    )}
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setViewCourse(course)}
                        className="w-full flex items-center justify-center gap-2 bg-primary-light hover:opacity-80 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        {t('courses_view')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      }

      {/* List View */}
      {
        viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-start px-4 py-3 text-xs font-semibold text-gray-600">{t('courses_table_course')}</th>
                  <th className="text-start px-4 py-3 text-xs font-semibold text-gray-600">{t('courses_table_subject')}</th>
                  <th className="text-start px-4 py-3 text-xs font-semibold text-gray-600">{t('courses_table_level')}</th>
                  <th className="text-start px-4 py-3 text-xs font-semibold text-gray-600">{t('courses_table_files')}</th>
                  {!isStudent && <th className="text-start px-4 py-3 text-xs font-semibold text-gray-600">{t('courses_table_actions')}</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(course => {
                  const level = getLevelById(course.levelId);
                  const thumb = getDisplayThumbnail(course);
                  return (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {thumb ? (
                            <img src={thumb} alt={course.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{course.title}</p>
                            {course.description && <p className="text-xs text-gray-400 line-clamp-1">{course.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-primary-light text-white px-2 py-1 rounded-full">{course.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        {level && <span className={`text-xs px-2 py-1 rounded-full ${level.color}`}>{level.name}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">{course.attachments.length} {t('file')} </span>
                      </td>
                      {!isStudent && (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setViewCourse(course)} className="p-1.5 icon-btn-primary rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => openEdit(course)} className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(course.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>{t('courses_empty')}</p>
              </div>
            )}
          </div>
        )
      }

      {
        filtered.length === 0 && viewMode === 'grid' && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium"> {t('courses_empty')} </p>
            <p className="text-sm mt-1"> {t('courses_filter')} </p>
          </div>
        )
      }
      <CourseModal
        isOpen={showAddModal || !!editCourse}
        onClose={() => {
          setShowAddModal(false);
          setEditCourse(null);
        }}
        onSubmit={editCourse ? onEditSubmit : onAddSubmit}
        course={editCourse}
        levels={levels}
        subjectCategories={subjectCategories}
      />

      {/* Levels Modal */}
      <LevelsModal
        isOpen={showLevelsModal}
        onClose={() => setShowLevelsModal(false)}
        levels={levels}
        handleDeleteLevel={handleDeleteLevel}
        newLevelName={newLevelName}
        setNewLevelName={setNewLevelName}
        newLevelColor={newLevelColor}
        setNewLevelColor={setNewLevelColor}
        levelColorOptions={levelColorOptions}
        handleAddLevel={handleAddLevel}
      />
    </div >
  );
}

