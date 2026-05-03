import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../contexts/SettingsContext';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Clock, Wallet, ArrowUpRight, X,
  BookOpen, Users, Star, ShieldCheck, FileText, Send
} from 'lucide-react';
import ErrorService from '../../../utils/ErrorService';

// Internal Withdrawal Modal Component
function WithdrawalModal({ isOpen, onClose, balance, onWithdraw, isRtl, settings }: any) {
  const [amount, setAmount] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      ErrorService.error(isRtl ? 'يرجى إدخال مبلغ صالح' : 'Please enter a valid amount');
      return;
    }
    if (numAmount > balance) {
      ErrorService.error(isRtl ? 'المبلغ يتجاوز الرصيد الحالي' : 'Amount exceeds current balance');
      return;
    }
    onWithdraw(numAmount);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{isRtl ? 'طلب سحب رصيد' : 'Withdrawal Request'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRtl ? 'المبلغ المطلوب سحبه' : 'Amount to withdraw'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold text-lg"
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {isRtl ? 'الرصيد المتاح:' : 'Available Balance:'} <span className="font-bold text-gray-900">${balance.toLocaleString()}</span>
            </p>
          </div>

          <button 
            type="submit"
            className="w-full py-3 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ backgroundColor: settings.primaryColor }}
          >
            <Send className="w-5 h-5" />
            {isRtl ? 'إرسال الطلب' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function TeacherProfile() {
  const { i18n } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  
  // Teacher Personal Info
  const teacherInfo = {
    name: isRtl ? 'أ. محمد الأحمدي' : 'Mr. Mohamed El-Ahmady',
    email: 'teacher@lms.com',
    phone: '+20 100 123 4567',
    joinDate: '2022-09-15',
    title: isRtl ? 'معلم أول لغة عربية' : 'Senior Arabic Teacher',
    id: 'TCH-2023-01',
    country: isRtl ? 'مصر' : 'Egypt',
    rating: 4.9,
    experience: isRtl ? '10 سنوات خبرة' : '10 Years Experience',
  };

  // Financial Stats
  const financialInfo = {
    pendingBalance: 1250,
    totalWithdrawn: 5400,
    transactions: [
      { id: 1, type: isRtl ? 'تحويل بنكي' : 'Bank Transfer', amount: 2100, date: '2023-10-01', status: 'completed' },
      { id: 2, type: isRtl ? 'تسوية أرباح حصص' : 'Session Earnings', amount: 800, date: '2023-09-25', status: 'completed' },
    ]
  };

  // Quick Stats
  const stats = [
    { label: isRtl ? 'الكورسات' : 'Courses', value: '4', icon: BookOpen },
    { label: isRtl ? 'الطلاب' : 'Students', value: '145', icon: Users },
    { label: isRtl ? 'ساعات التدريس' : 'Teaching Hours', value: '120+', icon: Clock },
  ];

  const handleWithdraw = (amount: number) => {
    ErrorService.success(isRtl ? `تم إرسال طلب سحب مبلغ $${amount} بنجاح` : `Withdrawal request for $${amount} submitted successfully`);
    setIsWithdrawModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{isRtl ? 'الملف الشخصي' : 'Profile'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Teacher Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1">
          <div 
            className="h-24 bg-gradient-to-r" 
            style={{ backgroundImage: `linear-gradient(to right, ${settings.primaryColor}, ${settings.accentColor})` }}
          />
          <div className="px-6 pb-6 relative">
            <div className="flex justify-center -mt-12 mb-4">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-md">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {teacherInfo.name.includes('أ. ') ? teacherInfo.name.split('أ. ')[1].charAt(0) : teacherInfo.name.charAt(0)}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{teacherInfo.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{teacherInfo.title}</p>
              
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-800">{teacherInfo.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{teacherInfo.experience}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">{teacherInfo.id}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm truncate">{teacherInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{teacherInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm" dir="ltr">{teacherInfo.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{teacherInfo.country}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          
          {/* Financial Balance Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Wallet className="w-6 h-6" style={{ color: settings.primaryColor }} />
                {isRtl ? 'الرصيد والحساب' : 'Financial Balance'}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="px-4 py-2 text-white rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {isRtl ? 'طلب سحب رصيد' : 'Withdrawal Request'}
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-bold border border-gray-200 transition-colors">
                  {isRtl ? 'التاريخ' : 'History'}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 mb-8 text-center relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-sm text-gray-500 mb-2">{isRtl ? 'الرصيد المستحق (هذا الشهر)' : 'Pending Balance (This Month)'}</p>
                 <h2 className="text-5xl font-black mb-0" style={{ color: settings.primaryColor }}>
                   ${financialInfo.pendingBalance.toLocaleString()}
                 </h2>
               </div>
               {/* Decorative elements */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 opacity-20"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 opacity-30" style={{ backgroundColor: settings.primaryColor + '20' }}></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4">{isRtl ? 'أحدث المعاملات' : 'Recent Transactions'}</h3>
              {financialInfo.transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 1000 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {tx.amount > 1000 ? <ArrowUpRight className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{tx.type}</p>
                      <p className="text-xs text-gray-500" dir="ltr">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.amount > 1000 ? 'text-green-600' : 'text-gray-900'}`}>
                    +${tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: settings.primaryColor + '10', color: settings.primaryColor }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <WithdrawalModal 
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        balance={financialInfo.pendingBalance}
        onWithdraw={handleWithdraw}
        isRtl={isRtl}
        settings={settings}
      />
    </div>
  );
}
