import React from 'react';
import {
  Download,
  Bell,
  Users,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-8 font-sans" dir="ltr">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Good Morning, Sarah</h1>
          <p className="text-sm text-gray-500">Here's what's happening in the club kit today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5e5ce6] text-white rounded-lg text-sm font-medium hover:bg-[#4b49b8] transition-colors shadow-sm">
            <Bell className="w-4 h-4" />
            Send Notification
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
              +15%
            </span>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold mb-1 tracking-wider uppercase">Total Students</p>
            <h3 className="text-2xl font-bold text-gray-900">12,642</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#5e5ce6]">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">
              Active
            </span>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold mb-1 tracking-wider uppercase">Total Instructors</p>
            <h3 className="text-2xl font-bold text-gray-900">436</h3>
          </div>
        </div>

        {/* Card 3 - Purple Background */}
        <div className="bg-[#5e5ce6] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden text-white hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100C0 100 20 80 50 80C80 80 100 60 100 60L100 0L0 0L0 100Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-semibold rounded-md">
              Attention Required
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-indigo-200 font-bold mb-1 tracking-wider uppercase">Pending Requests</p>
            <h3 className="text-2xl font-bold">34</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="" />
              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="" />
              <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="" />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold mb-1 tracking-wider uppercase">Today's Sessions</p>
            <h3 className="text-2xl font-bold text-gray-900">156</h3>
          </div>
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Line Chart Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Sessions per Day</h3>
              <p className="text-sm text-gray-500">Weekly tracking of educational engagement</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Last 7 Days
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-64 w-full relative mt-4">
            <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="800" y2="50" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#f3f4f6" strokeWidth="1" />
              
              <path 
                d="M 0,150 C 100,150 150,50 250,80 C 350,110 400,180 500,160 C 600,140 650,40 750,20 L 800,20" 
                fill="none" 
                stroke="#5e5ce6" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              
              <circle cx="250" cy="80" r="4" fill="#fff" stroke="#5e5ce6" strokeWidth="2" />
              <circle cx="500" cy="160" r="4" fill="#fff" stroke="#5e5ce6" strokeWidth="2" />
              <circle cx="750" cy="20" r="4" fill="#fff" stroke="#5e5ce6" strokeWidth="2" />
            </svg>
            
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400 -mb-6 px-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-bold text-gray-900">Active Users</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center items-end gap-6 h-32 mb-8">
              <div className="w-12 bg-blue-500 rounded-t-sm h-full shadow-sm"></div>
              <div className="w-12 bg-[#5e5ce6] rounded-t-sm h-3/4 shadow-sm"></div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Students</span>
                  <span className="font-bold text-gray-900">8,241</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Instructors</span>
                  <span className="font-bold text-gray-900">302</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#5e5ce6] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Activity Feed</h3>
            <button className="text-sm text-[#5e5ce6] font-medium hover:text-[#4b49b8] transition-colors">View All</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/100?img=4" alt="Ahmed" className="w-10 h-10 rounded-full object-cover shadow-sm" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-bold text-gray-900">Ahmed Al-Farid</span> requested a reschedule for <span className="text-[#5e5ce6] font-medium">Advanced Mathematics</span>.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  <span className="text-xs text-gray-500">2 mins ago</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/100?img=5" alt="Sara" className="w-10 h-10 rounded-full object-cover shadow-sm" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Session completed with <span className="font-bold text-gray-900">Sara Roberts</span>.
                </p>
                <p className="text-xs text-gray-500 mt-0.5">"Great session today! We also engaged in the physics module."</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-gray-500">15 mins ago</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#5e5ce6] shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-bold text-gray-900">New Instructor Onboarded:</span> Dr. Julian Moore joined the Chemistry department.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5e5ce6]"></span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* District Report Ready */}
          <div className="bg-[#2a286b] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute right-0 bottom-0 opacity-10">
              <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="50" stroke="currentColor" strokeWidth="15"/>
                <circle cx="80" cy="80" r="20" stroke="currentColor" strokeWidth="10"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 text-white">District Report Ready</h3>
              <p className="text-sm text-indigo-100/80 mb-6 leading-relaxed">
                The monthly performance audit for Q2 is now available for review and signature.
              </p>
              <button className="px-5 py-2.5 bg-white text-[#2a286b] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                Review Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Sessions</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors group">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">AP Literature Review</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Today • 2:00 PM - 3:30 PM</p>
                </div>
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors group-hover:border-gray-300 shadow-sm">
                  Join
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors group">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Organic Chemistry Lab</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Today • 4:15 PM - 5:45 PM</p>
                </div>
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors group-hover:border-gray-300 shadow-sm">
                  Join
                </button>
              </div>
            </div>
            
            <button className="w-full text-center text-sm text-gray-500 font-medium hover:text-gray-800 transition-colors mt-2">
              See Full Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


