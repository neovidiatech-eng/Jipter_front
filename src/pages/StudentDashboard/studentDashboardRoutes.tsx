import { lazy, ReactNode } from "react";
import {
  Home,
  BookOpen,
  PlayCircle,
  Play,
  Calendar,
  FileText,
  ClipboardList,
  User,
  MessageSquare,
  Send,
} from "lucide-react";

export interface StudentRouteConfig {
  id: string;
  label: string;
  icon?: any;
  path: string;
  fullPath?: string;
  element?: ReactNode;
  subItems?: StudentRouteConfig[];
}

// --- Lazy Loading Page Components for Student from Features ---
const SessionsPage = lazy(
  () => import("../../features/student/pages/Sessions"),
);
const AgendaPage = lazy(() => import("../../features/student/pages/Agenda"));
const ExamsPage = lazy(() => import("../../features/student/pages/Exams"));
const AssignmentsPage = lazy(
  () => import("../../features/student/pages/Assignments"),
);
const ProfilePage = lazy(() => import("../../features/student/pages/Profile"));
const LMSCoursesPage = lazy(
  () => import("../../features/student/pages/LMSCourses/LMSCourses"),
);
const ChatPage = lazy(() => import("../../features/student/pages/Chat"));
const RequestsPage = lazy(
  () => import("../../features/student/pages/Requests"),
);
const RescheduleSession = lazy(
  () => import("../../features/student/pages/RescheduleSession"),
);
const Levels = lazy(
  () => import("../../features/student/pages/Materials/Levels"),
);
const CurriculumDetails = lazy(
  () => import("../../features/student/pages/Materials/CurriculumDetails"),
);
const RecordedVideos = lazy(
  () => import("../../features/student/pages/Materials/RecordedVideos"),
);

export const studentDashboardRoutes: StudentRouteConfig[] = [
  {
    id: "student-home",
    label: "sidebar_dashboard",
    icon: Home,
    path: "",
  },
  {
    id: "student-lms",
    label: "sidebar_lms",
    icon: PlayCircle,
    path: "lms",
    subItems: [
      {
        id: "student-lms-courses",
        label: "sidebar_courses",
        icon: Play,
        path: "lms-courses",
        element: <LMSCoursesPage />,
      },
    ],
  },
  {
    id: "student-content",
    label: "sidebar_academic_content",
    icon: BookOpen,
    path: "content",
    subItems: [
      {
        id: "student-sessions",
        label: "sidebar_sessions",
        icon: Play,
        path: "sessions",
        element: <SessionsPage />,
      },
      {
        id: "student-agenda",
        label: "sidebar_agenda",
        icon: Calendar,
        path: "agenda",
        element: <AgendaPage />,
      },
      {
        id: "student-exams",
        label: "sidebar_exams",
        icon: FileText,
        path: "exams",
        element: <ExamsPage />,
      },
      {
        id: "student-assignments",
        label: "sidebar_assignments",
        icon: ClipboardList,
        path: "assignments",
        element: <AssignmentsPage />,
      },
    ],
  },
  {
    id: "student-profile",
    label: "sidebar_profile",
    icon: User,
    path: "profile",
    element: <ProfilePage />,
  },
  {
    id: "student-chat",
    label: "sidebar_chat",
    icon: MessageSquare,
    path: "chat",
    element: <ChatPage />,
  },
  {
    id: "student-requests",
    label: "sidebar_student_requests",
    icon: Send,
    path: "requests",
    element: <RequestsPage />,
  },
  {
    id: "student-reschedule",
    label: "Reschedule Session",
    path: "reschedule",
    element: <RescheduleSession />,
  },
  {
    id: "student-levels",
    label: "Levels",
    path: "Materials/Levels",
    element: <Levels />,
  },
  {
    id: "student-curriculum-details",
    label: "Curriculum Details",
    path: "Materials/Levels/:curriculumId",
    element: <CurriculumDetails />,
  },
  {
    id: "student-recorded-videos",
    label: "Recorded Videos",
    path: "recorded-videos",
    element: <RecordedVideos />,
  },
];
