import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, Mail, Calendar, MapPin, Phone, 
  Award, Clock, CheckCircle, RefreshCw, 
  Package, GraduationCap, Star, BookOpen, 
  ShieldCheck, ArrowLeft, Edit3
} from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';
import { useProfile } from '../hooks/useProfile';
import SubscribePlanModal from "../../../components/modals/SubscribePlanModal";
import { useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { i18n } = useTranslation();
  const { data: profileResponse, isLoading, isError } = useProfile();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const language = i18n.language.split('-')[0];
  const isRtl = language === 'ar';

  // Safe data extraction
  const profileData = profileResponse?.data;

  // Real data mapping with fallbacks
  const studentInfo = {
    name: profileData?.user?.name || "---",
    email: profileData?.user?.email || "---",
    phone: profileData?.user?.phone || profileData?.country || "---",
    birthDate: profileData?.birth_date || "---",
    age: profileData?.birth_date ? `${new Date().getFullYear() - new Date(profileData.birth_date).getFullYear()} years old` : "---",
    joinDate: profileData?.user?.createdAt ? new Date(profileData.user.createdAt).toLocaleDateString() : "---",
    country: profileData?.country || "---"
  };

  const subscriptionInfo = {
    status: profileData?.status || 'Inactive',
    planName: isRtl ? profileData?.plan?.name_ar : (profileData?.plan?.name_en || 'Free Plan'),
    totalSessions: profileData?.sessions || 0,
    sessionsUsed: profileData?.sessions_attended || 0,
    sessionsRemaining: profileData?.sessions_remaining || 0,
    expirationDate: 'August 24, 2026'
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle server error gracefully
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 p-8 bg-white rounded-3xl border border-red-100">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
           <ShieldCheck size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-800">Connection Error</h3>
          <p className="text-slate-500">The server (perfect-due.com) returned a 500 error. Please try again later.</p>
        </div>
        <button 
          onClick={() => navigate("/student-dashboard")}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-20 ">
      {/* 1. Header Navigation */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Student Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 2. Left Quick Profile Card */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center h-screen">
          <div className="relative mb-6">
            <div className="w-[160px] h-[160px] rounded-full border-4 border-blue-500 p-1.5 shadow-xl shadow-blue-100 overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${studentInfo.name.replace(/\s/g, '+')}&background=random`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-8 ">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{studentInfo.name}</h2>
            <p className="text-slate-400 font-medium">{studentInfo.email}</p>
            <div className="pt-2">
               <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                  {subscriptionInfo.planName}
               </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>

        {/* 3. Right Detailed Information Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: Personal Information */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                <p className="text-lg font-bold text-slate-700">{studentInfo.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="text-lg font-bold text-slate-700">{studentInfo.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Age</p>
                <p className="text-lg font-bold text-slate-700">{studentInfo.age}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Join Date</p>
                <p className="text-lg font-bold text-slate-700">{studentInfo.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Card: Academic Information */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">Academic Information</h3>
            <div className="space-y-6">
              {[
                { label: 'Current Level', value: subscriptionInfo.planName, icon: Award, color: 'bg-blue-50 text-blue-500' },
                { label: 'Current Curriculum', value: 'Python Fundamentals', icon: BookOpen, color: 'bg-amber-50 text-amber-500' },
                { label: 'Sessions Completed', value: `${subscriptionInfo.sessionsUsed} / ${subscriptionInfo.totalSessions}`, icon: Calendar, color: 'bg-emerald-50 text-emerald-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}>
                    <item.icon size={26} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xl font-black text-slate-800 tracking-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Subscription Details */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Subscription Details</h3>
            
            <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-100 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plan Type</p>
                <p className="text-2xl font-black text-slate-800 leading-none">{subscriptionInfo.planName}</p>
              </div>
              <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest ${profileData?.active ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                {profileData?.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sessions</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">{subscriptionInfo.totalSessions}</p>
               </div>
               <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remaining</p>
                  <p className="text-4xl font-black text-blue-600 tracking-tighter">{subscriptionInfo.sessionsRemaining}</p>
               </div>
            </div>

            <div className="bg-[#FFF9E5] p-6 rounded-[24px] border border-amber-100">
               <p className="text-xs font-bold text-amber-600/80 uppercase tracking-widest mb-1">Subscription Expires</p>
               <p className="text-xl font-bold text-amber-900">{subscriptionInfo.expirationDate}</p>
            </div>

            <button 
              onClick={() => setIsPlanModalOpen(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              Renew Subscription
            </button>
          </div>

        </div>
      </div>

      <SubscribePlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
}
