import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface SessionData {
  id: string;
  sessionName: string;
  studentName: string;
  teacherName: string;
  subject: string;
  day: string;
  date: string;
  time: string;
  endTime: string;
  meetingLink?: string;
}

interface CountdownHold {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
}

interface SessionsContextType {
  sessions: SessionData[];
  addSession: (session: SessionData) => void;
  addMultipleSessions: (sessions: SessionData[]) => void;
  updateSession: (id: string, updatedData: Partial<SessionData>) => void;
  deleteSession: (id: string) => void;
  countdown: CountdownHold;
  isSessionReady: boolean;
}

const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<SessionData[]>([
    {
      id: '1',
      sessionName: 'حصة - الإثنين',
      studentName: 'ابراهيم مسلم',
      teacherName: 'Ahmed Qandil',
      subject: 'القرآن الكريم',
      day: 'الإثنين',
      date: '2026-03-01',
      time: '12:00 PM',
      endTime: '01:00 PM',
      meetingLink: 'https://zoom.us/j/123456789'
    }
    // ... rest of sessions (kept for context)
  ]);

  // Target time: Let's set it to be 2 hours, 14 minutes and 28 seconds from now for the demo
  // Or a fixed date. Let's use a fixed future date for consistent countdown
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    date.setMinutes(date.getMinutes() + 14);
    date.setSeconds(date.getSeconds() + 28);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      setTimeLeft(Math.max(0, distance));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const countdown = useMemo(() => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      days: d.toString().padStart(2, '0'),
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
      totalSeconds
    };
  }, [timeLeft]);

  const isSessionReady = countdown.totalSeconds <= 0;

  const addSession = (session: SessionData) => {
    setSessions(prev => [...prev, session]);
  };

  const addMultipleSessions = (newSessions: SessionData[]) => {
    setSessions(prev => [...prev, ...newSessions]);
  };

  const updateSession = (id: string, updatedData: Partial<SessionData>) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id ? { ...session, ...updatedData } : session
      )
    );
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  return (
    <SessionsContext.Provider
      value={{
        sessions,
        addSession,
        addMultipleSessions,
        updateSession,
        deleteSession,
        countdown,
        isSessionReady
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionsContext);
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionsProvider');
  }
  return context;
}
