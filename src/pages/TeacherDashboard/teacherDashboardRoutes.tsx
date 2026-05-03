import { lazy } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Users
} from 'lucide-react';
import { RouteConfig } from '../../components/constants/dashboardRoutes';

// Lazy Loading Page Components
const ClassesPage = lazy(() => import('../../features/teacher/pages/Classes'));
const LMSContent = lazy(() => import('../../features/teacher/pages/LMSContent'));
const RequestsPage = lazy(() => import('../../features/teacher/pages/Requests'));
const PoliciesPage = lazy(() => import('../../features/teacher/pages/Policies'));
const ReportsPage = lazy(() => import('../../features/teacher/pages/Reports'));
const HelpPage = lazy(() => import('../../features/teacher/pages/Help'));
const CommunityPage = lazy(() => import('../../features/teacher/pages/Community'));

export const teacherDashboardRoutes: RouteConfig[] = [
  {
    id: 'classes',
    label: 'Classes',
    icon: LayoutDashboard,
    path: '', 
    element: <ClassesPage />,
  },
  {
    id: 'lms',
    label: 'LMS',
    icon: BookOpen,
    path: 'courses',
    element: <LMSContent />,
  },
  {
    id: 'requests',
    label: 'Requests',
    icon: MessageSquare,
    path: 'requests',
    element: <RequestsPage />,
  },
  {
    id: 'policies',
    label: 'Policies',
    icon: ShieldCheck,
    path: 'policies',
    element: <PoliciesPage />,
  },
  {
    id: 'reports',
    label: 'Weekly Reports',
    icon: BarChart3,
    path: 'reports',
    element: <ReportsPage />,
  },
  {
    id: 'help',
    label: 'Support',
    icon: HelpCircle,
    path: 'help_center',
    element: <HelpPage />,
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    path: 'community_hub',
    element: <CommunityPage />,
  },
];
