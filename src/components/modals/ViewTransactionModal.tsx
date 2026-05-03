import { X, DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Transaction } from '../../pages/Transactions';

interface ViewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  currencies: { code: string; symbol: string; rate: number }[];
  selectedCurrency: string;
}

export default function ViewTransactionModal({ isOpen, onClose, transaction, currencies, selectedCurrency }: ViewTransactionModalProps) {
  const { language } = useLanguage();

  const text = {
    title: { ar: 'تفاصيل المعاملة', en: 'Transaction Details' },
    type: { ar: 'النوع', en: 'Type' },
    income: { ar: 'إيراد', en: 'Income' },
    teacher_expense: { ar: 'مصروف معلم', en: 'Teacher Expense' },
    student: { ar: 'الطالب', en: 'Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    amount: { ar: 'المبلغ', en: 'Amount' },
    currency: { ar: 'العملة', en: 'Currency' },
    paymentMethod: { ar: 'طريقة الدفع', en: 'Payment Method' },
    date: { ar: 'التاريخ', en: 'Date' },
    status: { ar: 'الحالة', en: 'Status' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    pending: { ar: 'معلق', en: 'Pending' },
    notes: { ar: 'ملاحظات', en: 'Notes' },
    sessionCount: { ar: 'عدد الحصص', en: 'Sessions' },
    sessionDuration: { ar: 'مدة الحصة', en: 'Session Duration' },
    ratePerHour: { ar: 'سعر الساعة', en: 'Rate/Hour' },
    convertedAmount: { ar: 'المبلغ المحوّل', en: 'Converted Amount' },
    close: { ar: 'إغلاق', en: 'Close' },
    minute: { ar: 'دقيقة', en: 'min' }
  };

  const getExchangeRate = (fromCurrency: string, toCurrency: string): number => {
    const from = currencies.find(c => c.code === fromCurrency);
    const to = currencies.find(c => c.code === toCurrency);
    if (!from || !to) return 1;
    return from.rate / to.rate;
  };

  const convertedAmount = transaction.amount * getExchangeRate(transaction.currency, selectedCurrency);
  const currentSymbol = currencies.find(c => c.code === selectedCurrency)?.symbol || selectedCurrency;
  const originalSymbol = currencies.find(c => c.code === transaction.currency)?.symbol || transaction.currency;

  if (!isOpen) return null;

  const isIncome = transaction.type === 'income';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className={`sticky top-0 px-6 py-5 flex items-center justify-between rounded-t-2xl ${isIncome ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-amber-600'
          } text-white`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              {isIncome ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">{text.title[language]}</h2>
              <p className="text-sm opacity-80">{isIncome ? text.income[language] : text.teacher_expense[language]}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className={`rounded-xl p-5 text-center ${isIncome ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
            <p className="text-sm text-gray-600 mb-2">{text.amount[language]}</p>
            <p className={`text-5xl font-bold ${isIncome ? 'text-green-600' : 'text-orange-600'}`}>
              {transaction.amount.toFixed(2)} <span className="text-2xl">{originalSymbol}</span>
            </p>
            {transaction.currency !== selectedCurrency && (
              <p className="text-sm text-gray-500 mt-2">
                {text.convertedAmount[language]}: <span className="font-semibold">{convertedAmount.toFixed(2)} {currentSymbol}</span>
              </p>
            )}
            <span className={`inline-flex mt-3 px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
              {transaction.status === 'completed' ? text.completed[language] : text.pending[language]}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isIncome && transaction.studentName && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{text.student[language]}</p>
                </div>
                <p className="font-semibold text-gray-900">{transaction.studentName}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{text.teacher[language]}</p>
              </div>
              <p className="font-semibold text-gray-900">{transaction.teacherName}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{text.date[language]}</p>
              </div>
              <p className="font-semibold text-gray-900">{transaction.date}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{text.paymentMethod[language]}</p>
              </div>
              <p className="font-semibold text-gray-900">{transaction.paymentMethod || '-'}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-600">{text.currency[language]}</p>
              </div>
              <p className="font-semibold text-gray-900">{originalSymbol} ({transaction.currency})</p>
            </div>
          </div>

          {transaction.type === 'teacher_expense' && transaction.sessionCount && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-3 text-start">{language === 'ar' ? 'تفاصيل الحساب' : 'Calculation Details'}</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500">{text.sessionCount[language]}</p>
                  <p className="font-bold text-gray-900 text-lg">{transaction.sessionCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{text.sessionDuration[language]}</p>
                  <p className="font-bold text-gray-900 text-lg">{transaction.sessionDuration} {text.minute[language]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{text.ratePerHour[language]}</p>
                  <p className="font-bold text-gray-900 text-lg">{transaction.ratePerHour}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200 text-center text-sm text-blue-700">
                {transaction.sessionCount} × ({transaction.sessionDuration}/60) × {transaction.ratePerHour} = {transaction.amount.toFixed(2)} {originalSymbol}
              </div>
            </div>
          )}

          {transaction.notes && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">{text.notes[language]}</p>
              <p className="text-gray-900">{transaction.notes}</p>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 font-medium"
            >
              {text.close[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
