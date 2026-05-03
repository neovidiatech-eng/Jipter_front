import { useState, useMemo } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Search, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSessions } from '../../../contexts/SessionsContext';
import ViewTransactionModal from '../../../components/modals/ViewTransactionModal';
import { TransactionFormData } from '../../../lib/schemas/TransactionSchema';
import AddTransactionModal from '../../../components/modals/AddTransactionModal';
import { useConfirm } from '../../../hooks/useConfirm';

export interface Transaction {
  id: string;
  type: 'income' | 'teacher_expense';
  studentName?: string;
  teacherName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  date: string;
  status: 'completed' | 'pending';
  notes?: string;
  sessionCount?: number;
  sessionDuration?: number;
  ratePerHour?: number;
}

const CURRENCIES = [
  { code: 'SAR', symbol: 'ر.س', rate: 1 },
  { code: 'EGP', symbol: 'ج.م', rate: 0.11 },
  { code: 'USD', symbol: '$', rate: 3.75 }
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    studentName: 'Ahmed Qandil',
    teacherName: 'Ahmed Qandil',
    amount: 170,
    currency: 'EGP',
    paymentMethod: 'بطاقة',
    date: '2026-01-01',
    status: 'pending'
  },
  {
    id: '2',
    type: 'income',
    studentName: 'Ahmed Gamal',
    teacherName: 'Ahmed Gamal',
    amount: 125,
    currency: 'SAR',
    paymentMethod: 'بطاقة',
    date: '2026-01-01',
    status: 'completed'
  },
  {
    id: '3',
    type: 'income',
    studentName: 'هدير عبده',
    teacherName: 'Mohammed',
    amount: 250,
    currency: 'SAR',
    paymentMethod: 'بطاقة',
    date: '2025-12-31',
    status: 'completed'
  },
  {
    id: '4',
    type: 'income',
    studentName: 'alaa ahmed',
    teacherName: 'Mahmoud',
    amount: 125,
    currency: 'SAR',
    paymentMethod: 'بطاقة',
    date: '2025-12-27',
    status: 'completed'
  },
  {
    id: '5',
    type: 'income',
    studentName: 'mohamed ahmed',
    teacherName: 'Mohammed',
    amount: 100,
    currency: 'SAR',
    paymentMethod: 'بطاقة',
    date: '2025-12-27',
    status: 'completed'
  }
];

export default function Transactions() {
  const { language } = useLanguage();
  const { sessions } = useSessions();
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('SAR');
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const { confirm, ConfirmDialog } = useConfirm();
 

  const text = {
    title: { ar: 'المعاملات المالية', en: 'Financial Transactions' },
    addTransaction: { ar: 'إضافة معاملة', en: 'Add Transaction' },
    search: { ar: 'بحث في المعاملات...', en: 'Search transactions...' },
    totalRevenue: { ar: 'إجمالي الإيرادات', en: 'Total Revenue' },
    totalExpenses: { ar: 'إجمالي المصاريف', en: 'Total Expenses' },
    netProfit: { ar: 'صافي الربح', en: 'Net Profit' },
    pendingTransactions: { ar: 'المعاملات المعلقة', en: 'Pending Transactions' },
    completedTransactions: { ar: 'المعاملات المكتملة', en: 'Completed Transactions' },
    type: { ar: 'النوع', en: 'Type' },
    student: { ar: 'الطالب', en: 'Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    amount: { ar: 'المبلغ', en: 'Amount' },
    paymentMethod: { ar: 'طريقة الدفع', en: 'Payment Method' },
    date: { ar: 'التاريخ', en: 'Date' },
    status: { ar: 'الحالة', en: 'Status' },
    actions: { ar: 'الإجراءات', en: 'Actions' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    pending: { ar: 'معلق', en: 'Pending' },
    income: { ar: 'إيراد', en: 'Income' },
    teacher_expense: { ar: 'مصروف معلم', en: 'Teacher Expense' },
    allStatuses: { ar: 'كل الحالات', en: 'All Statuses' },
    allTypes: { ar: 'كل الأنواع', en: 'All Types' },
    currency: { ar: 'العملة', en: 'Currency' },
    changeCurrency: { ar: 'تغيير العملة', en: 'Change Currency' },
    externalExpenses: { ar: 'المصروفات الخارجية', en: 'External Expenses' },
    internalExpenses: { ar: 'مصروفات المعلمين', en: 'Teacher Expenses' },
    noTransactions: { ar: 'لا توجد معاملات', en: 'No transactions found' },
    confirmDelete: { ar: 'هل أنت متأكد من حذف هذه المعاملة؟', en: 'Are you sure you want to delete this transaction?' }
  };

  const getExchangeRate = (fromCurrency: string, toCurrency: string): number => {
    const from = CURRENCIES.find(c => c.code === fromCurrency);
    const to = CURRENCIES.find(c => c.code === toCurrency);
    if (!from || !to) return 1;
    return from.rate / to.rate;
  };

  const convertAmount = (amount: number, fromCurrency: string): number => {
    const rate = getExchangeRate(fromCurrency, selectedCurrency);
    return amount * rate;
  };

  const teacherExpenses = useMemo(() => {
    const teacherSessions: { [key: string]: { count: number; duration: number; teacher: string } } = {};

    sessions.forEach(session => {
      const key = session.teacherName;
      if (!teacherSessions[key]) {
        teacherSessions[key] = { count: 0, duration: 60, teacher: session.teacherName };
      }
      teacherSessions[key].count++;
    });

    return Object.values(teacherSessions).map((ts, idx) => ({
      id: `teacher-${idx}`,
      type: 'teacher_expense' as const,
      teacherName: ts.teacher,
      sessionCount: ts.count,
      sessionDuration: ts.duration,
      ratePerHour: 50,
      amount: ts.count * (ts.duration / 60) * 50,
      currency: 'EGP',
      paymentMethod: '-',
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const
    }));
  }, [sessions]);

  const allTransactions = useMemo(() => {
    return [...transactions, ...teacherExpenses];
  }, [transactions, teacherExpenses]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      const matchesSearch =
        t.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allTransactions, searchQuery, filterStatus, filterType]);

  const stats = useMemo(() => {
    const incomeTransactions = allTransactions.filter(t => t.type === 'income');
    const expenseTransactions = allTransactions.filter(t => t.type === 'teacher_expense');

    const totalIncome = incomeTransactions.reduce((sum, t) => {
      return sum + convertAmount(t.amount, t.currency);
    }, 0);

    const totalTeacherExpenses = expenseTransactions.reduce((sum, t) => {
      return sum + convertAmount(t.amount, t.currency);
    }, 0);

    const externalExpensesTotal = 1150;
    const externalExpensesConverted = convertAmount(externalExpensesTotal, 'SAR');

    const totalExpenses = totalTeacherExpenses + externalExpensesConverted;
    const netProfit = totalIncome - totalExpenses;

    const pendingCount = allTransactions.filter(t => t.status === 'pending').length;
    const completedCount = allTransactions.filter(t => t.status === 'completed').length;

    return { totalIncome, totalExpenses, netProfit, pendingCount, completedCount, totalTeacherExpenses, externalExpensesConverted };
  }, [allTransactions, selectedCurrency]);

  const getCurrencySymbol = (code: string) => {
    return CURRENCIES.find(c => c.code === code)?.symbol || code;
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: language === 'ar' ? 'حذف معاملة' : 'Delete Transaction',
      message: text.confirmDelete[language],
    });
    if (confirmed) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

const handleOpenAddModal = () => {
  setSelectedTransaction(null); 
  setIsModalOpen(true);
};

const handleEdit = (transaction: Transaction) => {
  setSelectedTransaction(transaction);
  setIsModalOpen(true);
};



const handleSaveTransaction = (data: TransactionFormData) => {
  const transactionData = {
    ...data,
    paymentMethod: data.paymentMethod ?? '',
    studentName: data.studentName ?? '',
    notes: data.notes ?? '',
    sessionCount: data.sessionCount ?? 0,
    sessionDuration: data.sessionDuration ?? 60,
    ratePerHour: data.ratePerHour ?? 0,
  };

  if (selectedTransaction) {
    setTransactions(prev =>
      prev.map(t =>
        t.id === selectedTransaction.id
          ? { ...transactionData, id: selectedTransaction.id } as Transaction
          : t
      )
    );
  } else {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }

  setIsModalOpen(false);
  setSelectedTransaction(null);
};

  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowViewModal(true);
  };

  const profitPercentage = stats.totalIncome > 0 ? ((stats.netProfit / stats.totalIncome) * 100).toFixed(1) : '0.0';
  const currentSymbol = getCurrencySymbol(selectedCurrency);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{text.title[language]}</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl bg-white">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent border-none outline-none"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
              ))}
            </select>
          </div>
         <button
  onClick={handleOpenAddModal} 
  className="flex items-center gap-2 px-5 py-2.5 btn-primary text-white rounded-xl transition-colors"
>
  <Plus className="w-5 h-5" />
  <span className="font-medium">{text.addTransaction[language]}</span>
</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">{text.totalRevenue[language]}</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.totalIncome.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">{currentSymbol}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm text-gray-600">{text.totalExpenses[language]}</p>
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.totalExpenses.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">{currentSymbol}</p>
        </div>

        <div className={`rounded-2xl p-5 border shadow-sm ${stats.netProfit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stats.netProfit >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
              <DollarSign className={`w-5 h-5 ${stats.netProfit >= 0 ? 'text-primary' : 'text-red-600'}`} />
            </div>
            <p className="text-sm text-gray-600">{text.netProfit[language]}</p>
          </div>
          <p className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-primary' : 'text-red-600'}`}>
            {stats.netProfit.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {currentSymbol} — <span className={stats.netProfit >= 0 ? 'text-primary font-semibold' : 'text-red-600 font-semibold'}>{profitPercentage}%</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">{text.completedTransactions[language]}</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completedCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">{text.pendingTransactions[language]}</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">{text.totalRevenue[language]}</p>
          <p className="text-xl font-bold text-green-600">{stats.totalIncome.toFixed(2)} {currentSymbol}</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-sm text-gray-500 mb-1">{text.internalExpenses[language]}</p>
          <p className="text-xl font-bold text-orange-500">{stats.totalTeacherExpenses.toFixed(2)} {currentSymbol}</p>
          <p className="text-xs text-gray-400">+</p>
          <p className="text-sm text-gray-500">{text.externalExpenses[language]}</p>
          <p className="text-lg font-bold text-red-500">{stats.externalExpensesConverted.toFixed(2)} {currentSymbol}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">{text.netProfit[language]}</p>
          <p className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-primary' : 'text-red-600'}`}>
            {stats.netProfit.toFixed(2)} {currentSymbol}
          </p>
          <p className={`text-sm font-semibold ${stats.netProfit >= 0 ? 'text-primary' : 'text-red-500'}`}>
            {profitPercentage}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={text.search[language]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary text-start bg-white appearance-none"
          >
            <option value="all">{text.allTypes[language]}</option>
            <option value="income">{text.income[language]}</option>
            <option value="teacher_expense">{text.teacher_expense[language]}</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary text-start bg-white appearance-none"
          >
            <option value="all">{text.allStatuses[language]}</option>
            <option value="completed">{text.completed[language]}</option>
            <option value="pending">{text.pending[language]}</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{text.noTransactions[language]}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full" dir={language === "ar" ? "rtl" : "ltr"}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.type[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.student[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.amount[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.paymentMethod[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.date[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.status[language]}</th>
                  <th className="px-5 py-4 text-start text-sm font-semibold text-gray-800">{text.actions[language]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <span className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-700' : 'text-orange-700'}`}>
                          {transaction.type === 'income' ? text.income[language] : text.teacher_expense[language]}
                        </span>
                        <span className="text-lg">{transaction.type === 'income' ? '💰' : '👨‍🏫'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-start">
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.type === 'income' ? transaction.studentName : transaction.teacherName}
                      </span>
                      {transaction.type === 'teacher_expense' && transaction.sessionCount && (
                        <p className="text-xs text-gray-400">{transaction.sessionCount} حصة × {transaction.sessionDuration === 60 ? '60' : '30'} دقيقة</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-start">
                      <div className="flex items-center gap-1 justify-start">
                        <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-orange-600'}`}>
                          {convertAmount(transaction.amount, transaction.currency).toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">{currentSymbol}</span>
                      </div>
                      {transaction.currency !== selectedCurrency && (
                        <p className="text-xs text-gray-400 text-start">{transaction.amount} {transaction.currency}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-start">
                      <span className="text-sm text-gray-700">{transaction.paymentMethod || '-'}</span>
                    </td>
                    <td className="px-5 py-4 text-start">
                      <span className="text-sm text-gray-900">{transaction.date}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {transaction.status === 'completed' ? text.completed[language] : text.pending[language]}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-start">
                        <button
                          onClick={() => handleView(transaction)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!transaction.id.startsWith('teacher-') && (
                          <>
                            <button
                              onClick={() => handleEdit(transaction)}
                              className="p-2 icon-btn-primary rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(transaction.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

     <AddTransactionModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }}
  onSave={handleSaveTransaction}
  currencies={CURRENCIES}
  editingTransaction={selectedTransaction} 
/>


      {showViewModal && selectedTransaction && (
        <ViewTransactionModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setSelectedTransaction(null); }}
          transaction={selectedTransaction}
          currencies={CURRENCIES}
          selectedCurrency={selectedCurrency}
        />
      )}
      {ConfirmDialog}
    </div>
  );
}
