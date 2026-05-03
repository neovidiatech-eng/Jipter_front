import { ArrowRight, Download, FileText, Image, File, BookOpen, Tag, Layers } from 'lucide-react';
import { AttachedFile, Course, Level } from '../../../types/lmsCourses';
import { getVideoEmbed, getYoutubeThumbnail } from '../../../features/admin/pages/LMSCourses/LMSCourses';

interface Props {
  course: Course;
  levels: Level[];
  onBack: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return Image;
  if (type === 'application/pdf') return FileText;
  return File;
}

function FileCard({ att }: { att: AttachedFile }) {
  const Icon = getFileIcon(att.type);
  return (
    <a
      href={att.url}
      download={att.name}
      className="flex items-center gap-3 bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm rounded-xl p-3 transition-all group"
    >
      <div className="p-2.5 bg-blue-50 group-hover:bg-blue-100 rounded-xl transition-colors flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0 text-start">
        <p className="text-sm font-medium text-gray-800 truncate">{att.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatFileSize(att.size)}</p>
      </div>
      <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
    </a>
  );
}

export default function CourseViewer({ course, levels, onBack }: Props) {
  const level = levels.find(l => l.id === course.levelId);
  const embedUrl = getVideoEmbed(course.videoUrl);
  const ytThumb = course.videoUrl ? getYoutubeThumbnail(course.videoUrl) : null;
  const displayThumb = course.thumbnailUrl || ytThumb;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          رجوع للكورسات
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          {level && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${level.color}`}>{level.name}</span>
          )}
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{course.category}</span>
        </div>
      </div>

      {/* Video player */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
        {embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={course.title}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : displayThumb ? (
          <div className="relative">
            <img src={displayThumb} alt={course.title} className="w-full max-h-[480px] object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-5">
                <BookOpen className="w-10 h-10 text-white/80" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
              <BookOpen className="w-14 h-14 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">لا يوجد فيديو لهذا الكورس</p>
            </div>
          </div>
        )}
      </div>

      {/* Content below video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 text-start mb-3">{course.title}</h1>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              {level && (
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gray-400" />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${level.color}`}>{level.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{course.category}</span>
              </div>
              <span className="text-xs text-gray-400">{course.createdAt}</span>
            </div>

            {course.description ? (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-2 text-start">الوصف</h2>
                <p className="text-gray-600 text-sm leading-relaxed text-start">{course.description}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-start">لا يوجد وصف لهذا الكورس</p>
            )}
          </div>

          {/* Video link if not embeddable */}
          {course.videoUrl && !embedUrl && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 text-start">رابط الفيديو</h2>
              <a
                href={course.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm bg-blue-50 hover:bg-blue-100 px-4 py-3 rounded-xl transition-colors"
                dir="ltr"
              >
                <span className="break-all flex-1">{course.videoUrl}</span>
              </a>
            </div>
          )}
        </div>

        {/* Attachments sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 text-start flex items-center justify-end gap-2">
              <span>الملفات المرفقة</span>
              {course.attachments.length > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {course.attachments.length}
                </span>
              )}
            </h2>

            {course.attachments.length > 0 ? (
              <div className="space-y-2">
                {course.attachments.map(att => (
                  <FileCard key={att.id} att={att} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <File className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">لا توجد ملفات مرفقة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
