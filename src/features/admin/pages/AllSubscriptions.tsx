import { useEffect, useState } from "react";
import { Search, Edit, Trash2, Eye, CreditCard } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import Pagination from "../../../components/ui/Pagination";
import ViewSubscriptionDetailsModal from "../../../components/modals/ViewSubscriptionDetailsModal";
import EditSubscriptionModal from "../../../components/modals/EditSubscriptionModal";
import CustomSelect from "../../../components/ui/CustomSelect";
import { TableSkeleton } from "../../../components/ui/CustomSkeleton";
import {
  deleteSubscriptionRequest,
  getSubscriptionRequests,
} from "../services/subscriptionRequestServices";
import { useConfirm } from "../../../hooks/useConfirm";

interface Subscription {
  id: string;
  studentName: string;
  planName: string;
  planPrice: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
  sessionsRemaining: number;
  totalSessions: number;
}

export default function AllSubscriptions() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "expired" | "cancelled"
  >("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { confirm, ConfirmDialog } = useConfirm();
  const itemsPerPage = 10;

  const text = {
    title: { ar: "كل الاشتراكات", en: "All Subscriptions" },
    search: {
      ar: "بحث عن اسم الطالب أو الخطة...",
      en: "Search for student name or plan...",
    },
    filter: { ar: "تصفية", en: "Filter" },
    all: { ar: "الكل", en: "All" },
    active: { ar: "نشط", en: "Active" },
    expired: { ar: "منتهي", en: "Expired" },
    cancelled: { ar: "ملغي", en: "Cancelled" },
    studentName: { ar: "اسم الطالب", en: "Student Name" },
    plan: { ar: "الخطة", en: "Plan" },
    price: { ar: "السعر", en: "Price" },
    sessionsCount: { ar: "عدد الحصص", en: "Sessions Count" },
    session: { ar: "حصة", en: "session" },
    startDate: { ar: "تاريخ البدء", en: "Start Date" },
    endDate: { ar: "تاريخ الانتهاء", en: "End Date" },
    status: { ar: "الحالة", en: "Status" },
    progress: { ar: "التقدم", en: "Progress" },
    actions: { ar: "الإجراءات", en: "Actions" },
    edit: { ar: "تعديل", en: "Edit" },
    delete: { ar: "حذف", en: "Delete" },
    view: { ar: "عرض", en: "View" },
    noSubscriptions: { ar: "لا توجد اشتراكات", en: "No subscriptions found" },
    showing: { ar: "عرض", en: "Showing" },
    of: { ar: "من", en: "of" },
    subscriptions: { ar: "اشتراك", en: "subscriptions" },
    sessions: { ar: "حصة", en: "sessions" },
    confirmDelete: {
      ar: "هل أنت متأكد من حذف هذا الاشتراك؟",
      en: "Are you sure you want to delete this subscription?",
    },
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const mapSubscriptionToUI = (item: any): Subscription => {
    return {
      id: item.id,
      studentName: item.user?.name || "—",
      planName: item.plan?.name_ar || item.plan?.name_en || "—",
      planPrice: `${item.plan?.price || 0} $`,
      startDate: item.createdAt?.split("T")[0] || "",
      endDate: "",
      status: mapStatus(item.status),
      sessionsRemaining: item.plan?.hours || 0,
      totalSessions: item.plan?.hours || 0,
    };
  };

  const mapStatus = (status: string): "active" | "expired" | "cancelled" => {
    switch (status) {
      case "approved":
        return "active";
      case "pending":
        return "active";
      case "rejected":
        return "cancelled";
      default:
        return "expired";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getSubscriptionRequests();
        const formatted = data.map((item: any) => mapSubscriptionToUI(item));
        setSubscriptions(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      subscription.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "expired":
        return "bg-red-50 text-red-700 border-red-200";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const calculateProgress = (remaining: number, total: number) => {
    const used = total - remaining;
    return (used / total) * 100;
  };

  const handleView = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowViewModal(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowEditModal(true);
  };

  const handleSave = (updatedSubscription: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub,
      ),
    );
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: language === "ar" ? "حذف اشتراك" : "Delete Subscription",
      message: text.confirmDelete[language],
    });
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteSubscriptionRequest(id);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {text.title[language]}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={text.search[language]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right transition-all"
            />
          </div>
          <div className="w-full md:w-[220px]">
            <CustomSelect
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(
                  value as "all" | "active" | "expired" | "cancelled",
                )
              }
              options={[
                { value: "all", label: text.all[language] },
                { value: "active", label: text.active[language] },
                { value: "expired", label: text.expired[language] },
                { value: "cancelled", label: text.cancelled[language] },
              ]}
              placeholder={text.filter[language]}
            />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={itemsPerPage} columns={9} />
        ) : paginatedSubscriptions.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {text.noSubscriptions[language]}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" dir={language === "ar" ? "rtl" : "ltr"}>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.studentName[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.plan[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.price[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.sessionsCount[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.startDate[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.endDate[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.status[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.progress[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.actions[language]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSubscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-start text-sm font-medium text-gray-900">
                      {subscription.studentName}
                    </td>
                    <td className="px-4 py-4 text-start text-sm text-gray-900">
                      {subscription.planName}
                    </td>
                    <td className="px-4 py-4 text-start text-sm font-semibold text-gray-900">
                      {subscription.planPrice}
                    </td>
                    <td className="px-4 py-4 text-start text-sm text-gray-900">
                      <span className="font-semibold">
                        {subscription.totalSessions}
                      </span>{" "}
                      {text.session[language]}
                    </td>
                    <td className="px-4 py-4 text-start text-sm text-gray-900">
                      {subscription.startDate}
                    </td>
                    <td className="px-4 py-4 text-start text-sm text-gray-900">
                      {subscription.endDate}
                    </td>
                    <td className="px-4 py-4 text-start">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                          subscription.status
                        )}`}
                      >
                        {text[subscription.status][language]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            {subscription.sessionsRemaining}/
                            {subscription.totalSessions}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="progress-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${calculateProgress(
                                subscription.sessionsRemaining,
                                subscription.totalSessions
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => handleView(subscription)}
                          className="p-2 icon-btn-primary rounded-lg transition-colors group"
                          title={text.view[language]}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(subscription)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
                          title={text.edit[language]}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          disabled={deletingId === subscription.id}
                          onClick={() => handleDelete(subscription.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 group"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && paginatedSubscriptions.length > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredSubscriptions.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {selectedSubscription && (
        <>
          <ViewSubscriptionDetailsModal
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedSubscription(null);
            }}
            subscription={selectedSubscription}
          />
          <EditSubscriptionModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedSubscription(null);
            }}
            subscription={selectedSubscription}
            onSave={handleSave}
          />
        </>
      )}
      {ConfirmDialog}
    </div>
  );
}
