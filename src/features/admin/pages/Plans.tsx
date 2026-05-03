import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Package, CheckCircle } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import AddPlanModal from "../../../components/modals/AddPlanModal";
import ViewPlanModal from "../../../components/modals/ViewPlanModal";
import { deletePlans, getPlans, updatePlan } from "../services/PlansServices";
import { useConfirm } from "../../../hooks/useConfirm";
type CurrencyCode =
  | "EGP"
  | "USD"
  | "EUR"
  | "GBP"
  | "SAR"
  | "AED"
  | "KWD"
  | "QAR";
interface Plan {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  currency: CurrencyCode;
  duration: number;
  sessionsCount: number;
  features: string[];
  isPopular: boolean;
  status: "active" | "inactive";
}

export default function Plans() {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { confirm, ConfirmDialog } = useConfirm();

  const text = {
    title: { ar: "خطط الاشتراك", en: "Subscription Plans" },
    addPlan: { ar: "إضافة خطة", en: "Add Plan" },
    edit: { ar: "تعديل", en: "Edit" },
    delete: { ar: "حذف", en: "Delete" },
    view: { ar: "عرض", en: "View" },
    active: { ar: "نشط", en: "Active" },
    inactive: { ar: "غير نشط", en: "Inactive" },
    popular: { ar: "الأكثر شعبية", en: "Most Popular" },
    sessions: { ar: "حصة", en: "sessions" },
    month: { ar: "شهر", en: "month" },
    noPlans: { ar: "لا توجد خطط", en: "No plans found" },
    planDetails: { ar: "تفاصيل الخطة", en: "Plan Details" },
    features: { ar: "المميزات", en: "Features" },
    price: { ar: "السعر", en: "Price" },
    duration: { ar: "المدة", en: "Duration" },
    confirmDelete: {
      ar: "هل أنت متأكد من حذف هذه الخطة؟",
      en: "Are you sure you want to delete this plan?",
    },
  };

  // const [plans, setPlans] = useState<Plan[]>([
  //   {
  //     id: '1',
  //     name: 'الباقة الأساسية',
  //     nameEn: 'Basic Plan',
  //     description: 'خطة مثالية للمبتدئين',
  //     price: 500,
  //     currency: 'EGP',
  //     duration: 1,
  //     sessionsCount: 12,
  // features: [
  //   '12 حصة شهرياً',
  //   'دعم فني على مدار الساعة',
  //   'وصول للمواد التعليمية',
  //   'تقارير الأداء الأسبوعية'
  // ],
  //     isPopular: false,
  //     status: 'active'
  //   },
  //   {
  //     id: '2',
  //     name: 'الباقة المتقدمة',
  //     nameEn: 'Advanced Plan',
  //     description: 'خطة شاملة مع مزايا إضافية',
  //     price: 800,
  //     currency: 'EGP',
  //     duration: 1,
  //     sessionsCount: 20,
  //     features: [
  //       '20 حصة شهرياً',
  //       'دعم فني على مدار الساعة',
  //       'وصول للمواد التعليمية',
  //       'تقارير الأداء اليومية',
  //       'حصص إضافية مجانية',
  //       'متابعة شخصية'
  //     ],
  //     isPopular: true,
  //     status: 'active'
  //   },
  //   {
  //     id: '3',
  //     name: 'الباقة البريميوم',
  //     nameEn: 'Premium Plan',
  //     description: 'أفضل خطة لأقصى استفادة',
  //     price: 1200,
  //     currency: 'EGP',
  //     duration: 1,
  //     sessionsCount: 30,
  //     features: [
  //       '30 حصة شهرياً',
  //       'دعم فني على مدار الساعة',
  //       'وصول للمواد التعليمية',
  //       'تقارير الأداء اليومية',
  //       'حصص إضافية مجانية',
  //       'متابعة شخصية',
  //       'ورش عمل حصرية',
  //       'أولوية في الحجز'
  //     ],
  //     isPopular: false,
  //     status: 'active'
  //   }
  // ]);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();

        // const formatted = data.map((item: any) => ({
        //   id: item.id,
        //   name: item.name_ar,
        //   nameEn: item.name_en,
        //   description: "",
        //   price: Number(item.price),
        //   currency: item.currency?.code || "EGP",
        //   duration: item.duration,
        //   sessionsCount: 0,
        //   features: [],
        //   isPopular: item.bestSeller,
        //   status: item.active ? "active" : "inactive",
        // }));
        const formatted = data.map((item: any) => ({
          id: item.id,

          name: item.name_ar,
          nameEn: item.name_en,

          description: item.description || "",

          price: Number(item.price),

          currency: item.currency?.code || "EGP",

          duration: item.duration,

          sessionsCount: item.hours || 0,

          features: item.features || [],

          isPopular: item.bestSeller,
          status: (item.active ? "active" : "inactive") as "active" | "inactive",
        }));
        setPlans(formatted);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlans();
  }, []);

  const handleOpenAdd = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  const handleViewPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowViewModal(true);
  };

  // const handleSavePlan = (planData: Omit<Plan, "id"> & { id?: string }) => {
  //   if (planData.id) {
  //     setPlans((prev) =>
  //       prev.map((p) => (p.id === planData.id ? (planData as Plan) : p)),
  //     );
  //   } else {
  //     const newPlan: Plan = {
  //       ...planData,
  //       id: Math.random().toString(36).substr(2, 9),
  //     };
  //     setPlans((prev) => [...prev, newPlan]);
  //   }
  //   setIsModalOpen(false);
  //   setSelectedPlan(null);
  // };

  const handleSavePlan = async (
    planData: Omit<Plan, "id"> & { id?: string },
  ) => {
    try {
      if (planData.id) {
        await updatePlan(planData.id, {
          name_ar: planData.name,
          name_en: planData.nameEn,
          price: Number(planData.price),
          duration: Number(planData.duration),
          hours: Number(planData.sessionsCount),
          active: planData.status === "active",
          bestSeller: planData.isPopular,
          features: planData.features,
        });

        setPlans((prev) =>
          prev.map((p) => (p.id === planData.id ? (planData as Plan) : p)),
        );
      } else {
        const newPlan: Plan = {
          ...planData,
          id: Math.random().toString(36).substr(2, 9),
        };
        setPlans((prev) => [...prev, newPlan]);
      }

      setIsModalOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePlan = async (id: string) => {
    const confirmed = await confirm({
      title: language === "ar" ? "حذف خطة" : "Delete Plan",
      message: text.confirmDelete[language],
    });
    if (!confirmed) return;

    try {
      await deletePlans(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {text.title[language]}
        </h1>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          {text.addPlan[language]}
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{text.noPlans[language]}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-xl ${
                plan.isPopular
                  ? "border-blue-500 ring-4 ring-blue-100"
                  : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 rounded-t-2xl font-bold text-sm">
                  {text.popular[language]}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 text-start">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {language === "ar" ? plan.name : plan.nameEn}
                    </h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      plan.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {text[plan.status][language]}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <div className="text-start">
                      <div className="text-gray-600">{plan.currency}</div>
                      <div className="text-sm text-gray-500">
                        /{text.month[language]}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    {plan.sessionsCount} {text.sessions[language]}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 text-start">
                    {text.features[language]}
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-start"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 flex-1">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleViewPlan(plan)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 btn-primary text-white rounded-xl transition-colors text-sm font-medium"
                    title={text.view[language]}
                  >
                    <Eye className="w-4 h-4" />
                    {text.view[language]}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="p-2.5 text-green-600 hover:bg-green-50 rounded-xl transition-colors border border-green-200"
                    title={text.edit[language]}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
                    title={text.delete[language]}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddPlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlan(null);
        }}
        onSave={handleSavePlan}
        initialData={selectedPlan}
      />

      {selectedPlan && (
        <>
          <ViewPlanModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedPlan(null);
            }}
            plan={selectedPlan}
          />
        </>
      )}
      {ConfirmDialog}
    </div>
  );
}
