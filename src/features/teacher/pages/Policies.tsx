import React from 'react';
import { Shield, Clock, FileText, AlertCircle } from 'lucide-react';

export default function PoliciesPage() {
  const policies = [
    {
      title: 'Teaching Standards',
      desc: 'Guidelines for maintaining high-quality teaching standards and professional conduct.',
      update: 'Last updated: Feb 1, 2026',
      icon: Shield,
      color: 'blue',
    },
    {
      title: 'Attendance Policy',
      desc: 'Requirements for session attendance, punctuality, and procedures for absences.',
      update: 'Last updated: Jan 15, 2026',
      icon: Clock,
      color: 'green',
    },
    {
      title: 'Content Guidelines',
      desc: 'Standards for creating and sharing educational content and materials.',
      update: 'Last updated: Jan 20, 2026',
      icon: FileText,
      color: 'purple',
    },
    {
      title: 'Code of Conduct',
      desc: 'Professional behavior expectations and ethical guidelines for instructors.',
      update: 'Last updated: Dec 10, 2025',
      icon: AlertCircle,
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const map: any = {
      blue: 'bg-blue-50 text-blue-500',
      green: 'bg-green-50 text-green-500',
      purple: 'bg-purple-50 text-purple-500',
      orange: 'bg-orange-50 text-orange-500',
    };
    return map[color] || map.blue;
  };

  return (
    <div className="animate-fade-in max-w-[1600px] mx-auto pb-12 p-7">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-['Inter']">Policies & Guidelines</h1>
        <p className="text-slate-400 font-medium">Review important policies and teaching guidelines</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {policies.map((policy, i) => {
          const Icon = policy.icon;
          return (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all group">
              <div className="flex gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${getColorClasses(policy.color)}`}>
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{policy.title}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">
                    {policy.desc}
                  </p>
                  <p className="text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                    {policy.update}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Notice Banner */}
      <div className="bg-[#E3EAF9] border border-[#E3EAF9] rounded-3xl p-8 sm:p-10">
        <h4 className="text-blue-700 font-bold text-lg mb-2">Important Notice</h4>
        <p className="text-blue-600/70 text-sm font-medium leading-relaxed">
          All instructors are required to review and acknowledge these policies. Please ensure you're familiar with the latest updates. For questions or clarifications, contact the admin team.
        </p>
      </div>
    </div>
  );
}