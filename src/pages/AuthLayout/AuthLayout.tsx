import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const AuthLayout = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isAuthTab = isLogin || isRegister;

  return (
    <div
      className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 py-12"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-3xl">
        {/*  common  */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{t("academyName")}</h1>
          <p className="text-lg text-gray-600 mb-2">{t("academySubtitle")}</p>
          <p className="text-sm text-gray-500">{t("academyDescription")}</p>
        </div>

        {!isAuthTab && (
          <div className="flex justify-start mb-4 max-w-fit">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium group"
            >
              <ArrowLeft
                className={`w-4 h-4 transition-transform ${language === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              />
              <span>{t("backToLogin")}</span>
            </button>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs  */}
          {isAuthTab && (
            <div className="flex border-b border-gray-200 p-2 gap-2 bg-white">
              <button
                onClick={() => navigate("/login")}
                className={`flex-1 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 ${isLogin
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {t("login")}
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`flex-1 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 ${isRegister
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {language === "ar" ? "تسجيل طالب جديد " : "Register New Student"}
              </button>
            </div>
          )}

          {/* Login or Register */}
          <div className="p-8">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-400">
          {t("footerText")}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;