import Header from '../../components/layout/Header';

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'teacher' | 'student';
  userName?: string;
  userEmail?: string;
}

export default function StudentDashboardLayout({
  children,
  userRole = 'student',
}: StudentDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-['Inter']" dir="ltr">
      <Header
        userRole={userRole}
      />

      <div className="flex-1 w-full overflow-hidden">
        <main className="overflow-x-hidden overflow-y-auto w-full transition-all duration-300">
          <div className="min-h-full w-full">
             <div className="p-4 md:px-4 ">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
