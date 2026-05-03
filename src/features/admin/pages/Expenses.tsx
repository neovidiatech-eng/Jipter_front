import { useEffect, useState } from "react";
import { useConfirm } from '../../../hooks/useConfirm';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import AddExpenseModal from "../../../components/modals/AddExpenseModal";
import ViewExpenseModal from "../../../components/modals/ViewExpenseModal";
import { Expense } from "../../../lib/schemas/ExpenseSchema";
import { ExpenseService } from "../services/ExpenseService";
import { TableSkeleton } from "../../../components/ui/CustomSkeleton";

export default function Expenses() {
  const { language } = useLanguage();
  const { confirm, ConfirmDialog } = useConfirm();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const text = {
    title: { ar: "إدارة المصروفات", en: "Expenses Management" },
    addExpense: { ar: "إضافة مصروف جديد", en: "Add New Expense" },
    search: { ar: "البحث في المصروفات...", en: "Search expenses..." },
    totalExpenses: { ar: "إجمالي المصروفات", en: "Total Expenses" },
    totalCount: { ar: "مصروف", en: "expenses" },
    description: { ar: "الوصف", en: "Description" },
    amount: { ar: "المبلغ", en: "Amount" },
    currency: { ar: "العملة", en: "Currency" },
    category: { ar: "الفئة", en: "Category" },
    date: { ar: "التاريخ", en: "Date" },
    paymentMethod: { ar: "طريقة الدفع", en: "Payment Method" },
    status: { ar: "الحالة", en: "Status" },
    actions: { ar: "الإجراءات", en: "Actions" },
    edit: { ar: "تعديل", en: "Edit" },
    delete: { ar: "حذف", en: "Delete" },
    view: { ar: "عرض", en: "View" },
    paid: { ar: "مقبول", en: "Paid" },
    pending: { ar: "معلق", en: "Pending" },
    noExpenses: { ar: "لا توجد مصروفات", en: "No expenses found" },
    confirmDelete: {
      ar: "هل أنت متأكد من حذف هذا المصروف؟",
      en: "Are you sure you want to delete this expense?",
    },
    allCategories: { ar: "كل الفئات", en: "All Categories" },
    allStatuses: { ar: "كل الحالات", en: "All Statuses" },
    salaries: { ar: "رواتب", en: "Salaries" },
    utilities: { ar: "مرافق", en: "Utilities" },
    supplies: { ar: "لوازم", en: "Supplies" },
    marketing: { ar: "تسويق", en: "Marketing" },
    general: { ar: "عام", en: "General" },
    administrative: { ar: "إدارية", en: "Administrative" },
    other: { ar: "أخرى", en: "Other" },
  };

  const categories = [
    { id: "salaries", label: text.salaries },
    { id: "utilities", label: text.utilities },
    { id: "supplies", label: text.supplies },
    { id: "marketing", label: text.marketing },
    { id: "general", label: text.general },
    { id: "administrative", label: text.administrative },
    { id: "other", label: text.other },
  ];

  const mapExpenses = (apiExpenses: any[]): Expense[] => {
    return apiExpenses.map((exp) => ({
      id: exp.id,
      description: exp.title,
      amount: exp.amount,
      currency: exp.currency?.code || "USD",
      category: "general",
      date: exp.date.split("T")[0],
      paymentMethod: exp.payment_type,
      status: exp.status,
    }));
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const data = await ExpenseService.getExpenses("paid");
        const mapped = mapExpenses(data);
        setExpenses(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleSaveExpense = (expenseData: Expense) => {
    setExpenses((prev) => {
      const exists = prev.find((e) => e.id === expenseData.id);
      if (exists) {
        return prev.map((e) => (e.id === expenseData.id ? expenseData : e));
      }
      return [expenseData, ...prev];
    });
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleDeleteExpense = async (id: string) => {
    const ok = await confirm({
      title: language === 'ar' ? 'حذف المصروف' : 'Delete Expense',
      message: text.confirmDelete[language],
    });
    if (!ok) return;
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCategoryLabel(expense.category).toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || expense.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || expense.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.label[language] : categoryId;
  };

  return (
    <div className="p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {text.title[language]}
        </h1>
        <button
          onClick={() => {
            setSelectedExpense(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">{text.addExpense[language]}</span>
        </button>
      </div>

      <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-100 rounded-xl">
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-start">
              <p className="text-sm text-gray-600 mb-1">
                {text.totalExpenses[language]}
              </p>
              <h2 className="text-4xl font-bold text-red-600">
                {totalAmount.toFixed(2)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredExpenses.length} {text.totalCount[language]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={text.search[language]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start transition-all`}
          />
        </div>

        <div className="relative">
          <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`w-full px-4 py-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start appearance-none bg-white font-medium`}
          >
            <option value="all">{text.allCategories[language]}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label[language]}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`w-full px-4 py-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start appearance-none bg-white font-medium`}
          >
            <option value="all">{text.allStatuses[language]}</option>
            <option value="paid">{text.paid[language]}</option>
            <option value="pending">{text.pending[language]}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <TableSkeleton rows={8} columns={7} />
        ) : filteredExpenses.length === 0 ? (
          <div className="p-16 text-center">
            <DollarSign className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">{text.noExpenses[language]}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.description[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.category[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.amount[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.date[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.paymentMethod[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.status[language]}
                  </th>
                  <th className="px-6 py-4 text-start text-sm font-semibold text-gray-900">
                    {text.actions[language]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-start">
                      <span className="text-sm font-medium text-gray-900">
                        {expense.description}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-start">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium badge-primary">
                        {getCategoryLabel(expense.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-start font-mono">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-red-600">
                          {expense.amount.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 uppercase">
                          {expense.currency}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-start">
                      <span className="text-sm text-gray-600">
                        {expense.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-start">
                      <span className="text-sm text-gray-600">
                        {expense.paymentMethod || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-start">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                          expense.status === "paid"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {expense.status === "paid"
                          ? text.paid[language]
                          : text.pending[language]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowViewModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary-light/10 rounded-lg transition-colors group"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors group"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddExpenseModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedExpense(null);
        }}
        onSave={handleSaveExpense}
        initialData={selectedExpense}
      />

      {showViewModal && selectedExpense && (
        <ViewExpenseModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
        />
      )}
      {ConfirmDialog}
    </div>
  );
}
