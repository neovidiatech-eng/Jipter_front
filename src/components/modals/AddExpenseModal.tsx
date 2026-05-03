import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Expense, ExpenseFormData, getExpenseSchema } from '../../lib/schemas/ExpenseSchema';
import { Resolver, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '../ui/CustomSelect';
import DatePickerField from '../ui/DatePickerField';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  initialData?: Expense | null;
}

export default function AddExpenseModal({ isOpen, onClose, onSave, initialData }: AddExpenseModalProps) {
  const { language, t } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(getExpenseSchema(t)) as Resolver<ExpenseFormData>,
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      currency: 'SAR',
      category: 'general'
    }
  });

  const text = {
    title: { ar: 'إضافة مصروف جديد', en: 'Add New Expense' },
    description: { ar: 'الوصف', en: 'Description' },
    descriptionPlaceholder: { ar: 'أدخل الوصف', en: 'Enter description' },
    amount: { ar: 'المبلغ', en: 'Amount' },
    currency: { ar: 'العملة', en: 'Currency' },
    category: { ar: 'الفئة', en: 'Category' },
    date: { ar: 'التاريخ', en: 'Date' },
    paymentMethod: { ar: 'طريقة الدفع', en: 'Payment Method' },
    paymentMethodPlaceholder: { ar: 'أدخل طريقة الدفع', en: 'Enter payment method' },
    status: { ar: 'الحالة', en: 'Status' },
    paid: { ar: 'مقبول', en: 'Paid' },
    pending: { ar: 'معلق', en: 'Pending' },
    save: { ar: 'إضافة', en: 'Add' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    salaries: { ar: 'رواتب', en: 'Salaries' },
    utilities: { ar: 'مرافق', en: 'Utilities' },
    supplies: { ar: 'لوازم', en: 'Supplies' },
    marketing: { ar: 'تسويق', en: 'Marketing' },
    general: { ar: 'عام', en: 'General' },
    administrative: { ar: 'إدارية', en: 'Administrative' },
    other: { ar: 'أخرى', en: 'Other' }
  };

  const categories = [
    { id: 'salaries', label: text.salaries },
    { id: 'utilities', label: text.utilities },
    { id: 'supplies', label: text.supplies },
    { id: 'marketing', label: text.marketing },
    { id: 'general', label: text.general },
    { id: 'administrative', label: text.administrative },
    { id: 'other', label: text.other }
  ];

  const currencies = [
    { code: 'SAR', symbol: 'ر.س' },
    { code: 'EGP', symbol: 'ج.م' },
    { code: 'USD', symbol: '$' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          description: '', amount: 0, currency: 'SAR', category: 'general',
          date: new Date().toISOString().split('T')[0], status: 'pending'
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: ExpenseFormData) => {
    onSave({ ...data, id: initialData?.id || Date.now().toString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-primary border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">{text.title[language]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
              {text.description[language]} *
            </label>
            <input
              {...register("description")}
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 ${errors.description ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                {text.category[language]} *
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={categories.map(cat => ({
                      value: cat.id,
                      label: cat.label[language]
                    }))}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                {text.currency[language]} *
              </label>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={currencies.map(curr => ({
                      value: curr.code,
                      label: curr.symbol
                    }))}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
              {text.amount[language]} *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              placeholder="0.00"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 ${errors.amount ? 'border-red-500' : 'border-gray-300 focus:ring-primary'}`}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePickerField
                  label={`${text.date[language]} *`}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.date?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.paymentMethod[language]}</label>
            <input
              type="text"
              {...register("paymentMethod")}
              placeholder={text.paymentMethodPlaceholder[language]}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{text.status[language]} *</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={[
                    { value: 'pending', label: text.pending[language] },
                    { value: 'paid', label: text.paid[language] }
                  ]}
                />
              )}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>{text.save[language]}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
