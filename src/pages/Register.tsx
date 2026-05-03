import { useState } from "react";
import {
  Eye,
  EyeOff,
  Check
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ConfigProvider, DatePicker, Input, Select } from "antd";
import localeAr from 'antd/es/locale/ar_EG';
import localeEn from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import { usePlans } from "../features/admin/hooks/usePlans";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterSchema, RegisterInput } from "../lib/schemas/RegisterSchema";
import { googleRegister, register as registerService } from "../services/AuthServices";
import { GoogleLogin } from "@react-oauth/google";
import ErrorService from "../utils/ErrorService";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

export default function Register({ onRegisterSuccess }: RegisterProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const { data: plansData } = usePlans();

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(getRegisterSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      codeCountry: "+20",
      birth_date: "",
      gender: "",
      country: "",
      password: "",
      plan_id: "",
    },
  });
  console.log(errors);


  const selectedPackage = watch("plan_id");

  const countries = [
    { value: "egypt", label: t("egypt") },
    { value: "saudi", label: t("saudiArabia") },
    { value: "uae", label: t("uae") },
    { value: "kuwait", label: t("kuwait") },
  ];

  const genders = [
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
  ];

  const countryCodes = [
    { value: "+20", label: "+20", country: "مصر", countryEn: "Egypt" },
    { value: "+966", label: "+966", country: "السعودية", countryEn: "Saudi Arabia" },
    { value: "+971", label: "+971", country: "الإمارات", countryEn: "UAE" },
    { value: "+965", label: "+965", country: "الكويت", countryEn: "Kuwait" },
  ];

  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await registerService(data);
      if (result.status === 201 || result.status === 200) {
        ErrorService.success(t("registered Success"));
        // Store email for verification step
        sessionStorage.setItem("verify_email", data.email);
        navigate("/verify-account");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 12,
          colorPrimary: '#10b981',
          colorPrimaryHover: '#059669',
          controlOutline: 'rgba(16, 185, 129, 0.15)',
        },
        components: {
          Select: {
            controlHeight: 48,
            optionSelectedBg: '#ecfdf5',
            colorTextPlaceholder: '#9ca3af',
            activeBorderColor: '#6366f1',
            hoverBorderColor: "#6366f1"
          },
          Input: {
            controlHeight: 48,
            activeBorderColor: '#6366f1',
            hoverBorderColor: "#6366f1",
          },
          DatePicker: {
            cellWidth: 50,
            controlHeight: 48,
          },
        },
      }}
      locale={language === "ar" ? localeAr : localeEn}
      direction={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-3xl m-auto ">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {t("registerNewStudent")}
          </h1>
          <p className="text-gray-600">{t("joinAcademy")}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg py-8 px-5">
          <div className="text-center text-gray-400 text-sm my-4 mb-8">
            {t("registerDataToStart")}
          </div>

          <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fullName")} *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder={
                    language === "ar" ? "أحمد محمد" : "Ahmed Mohamed"
                  }
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right transition-all duration-300`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("email")} *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@example.com"
                  className={`w-full px-4 py-3 bg-gray-50 border `}
                  dir="ltr"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone and Country Code */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phoneNumber")} *
                </label>
                <div className="flex gap-2" dir="ltr">
                  <Controller
                    name="codeCountry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={countryCodes}
                        className="h-[48px] w-28"
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="tel"
                        placeholder="01069441989"
                        status={errors.phone ? "error" : ""}
                        className="flex-1 h-[48px] bg-gray-50 rounded-xl"
                      />
                    )}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone.message}</p>}
              </div>

              {/* Birth Date */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("birthDate")} *
                </label>
                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      className="px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:shadow-none h-[48px] w-full"
                      status={errors.birth_date ? "error" : ""}
                      placeholder={t("selectDate")}
                      value={value ? dayjs(value) : null}
                      onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : "")}
                    />
                  )}
                />
                {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date.message}</p>}
              </div>

              {/* Gender */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("gender")} *
                </label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder={t("selectGender")}
                      options={genders}
                      className="w-full h-[48px]"
                      status={errors.gender ? "error" : ""}
                      placement={language === "ar" ? "bottomRight" : "bottomLeft"}
                    />
                  )}
                />
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>

              {/* Country */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("country")} *
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      placeholder={t("selectCountry")}
                      options={countries}
                      className="w-full h-[48px]"
                      status={errors.country ? "error" : ""}
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  )}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>

              {/* Password */}
              <div className="text-right md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")} *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right pr-12 transition-all duration-300`}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-right text-gray-700 font-medium mb-3">
                {t("choosePackage")} *
              </label>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                {!plansData && (
                  <div className="col-span-full py-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300 animate-pulse">
                    {t("loadingPlans")}
                  </div>
                )}

                {plansData?.length === 0 && (
                  <div className="col-span-full py-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                    {t("noPlansAvailable")}
                  </div>
                )}

                {plansData?.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setValue("plan_id", pkg.id, { shouldValidate: true })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-right ${selectedPackage === pkg.id
                      ? "border-primary bg-white shadow-md scale-[1.02]"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                      }`}
                  >
                    <div className="flex items-start justify-between min-h-[60px]">
                      <div className="flex-1">
                        <div className={`font-bold text-lg mb-1 ${selectedPackage === pkg.id ? "text-primary" : "text-gray-900"}`}>
                          {language === "ar" ? pkg.name_ar : pkg.name_en}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {pkg.duration} {t("sessionsCount")} • {pkg.currency?.symbol} {pkg.price}
                        </div>
                      </div>
                      {selectedPackage === pkg.id && (
                        <div className={`${language === "ar" ? "mr-3" : "ml-3"}`}>
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.plan_id && <p className="text-red-500 text-xs mt-2 text-right">{errors.plan_id.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Check className="w-5 h-5" />
              )}
              <span>{t("registerNow")}</span>
            </button>

            <p className="text-center text-sm text-gray-500 leading-relaxed">
              {t("afterRegistration")}
            </p>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const idToken = credentialResponse.credential;
                  console.log(idToken);
                  if (idToken) {
                    try {
                      const result = await googleRegister({ idToken });
                      const token = result.data?.accessToken || result.accessToken;

                      if (token) {
                        localStorage.setItem("token", token);
                        onRegisterSuccess();
                        ErrorService.success(t('registeredSuccess'));
                        navigate("/login");
                      }
                    } catch (error) {
                      console.error("Google Login failed:", error);
                    }
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
                theme="outline"
                size="large"
                shape="circle"
                width="384px"
              />
            </div>
          </form>

        </div>
      </div>
    </ConfigProvider>
  );
}
