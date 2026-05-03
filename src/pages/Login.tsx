import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, getLoginSchema } from "../lib/schemas/LoginSchema";
import { login, googleLogin } from "../services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import { CustomCheckbox } from "../components/ui/CustomCheckbox";
import { GoogleLogin } from "@react-oauth/google";
import ErrorService from "../utils/ErrorService";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const { email, password, rememberMe } = data;

    try {
      const result = await login({ email, password });

      const token = result.data?.accessToken || result.accessToken;

      if (token) {
        // clear old
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // save token
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        const role = result.data?.role || result.role;
        localStorage.setItem("role", role);

        // navigation حسب role
        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (role === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/dashboard");
        }

        onLoginSuccess();
        ErrorService.success(t("loginSuccess"));
      }
    } catch (error) {
      console.error("Login failed:", error);
      ErrorService.error(t("loginFailed"));
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {t("login")}
        </h1>
        <p className="text-gray-600">{t("joinAcademy")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-right text-gray-700 font-medium mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-right"
            placeholder="admin@admin.com"
            dir="ltr"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-right text-gray-700 font-medium mb-2">
            {t("password")}
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl pr-12"
              dir={language === "ar" ? "rtl" : "ltr"}
              placeholder="********"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${
                language === "ar" ? "left" : "right"
              }-4 top-1/2 -translate-y-1/2 text-gray-400`}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-primary font-medium"
          >
            {t("forgotPassword")}
          </Link>

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                checked={field.value ?? false}
                onChange={field.onChange}
                label={t("rememberMe")}
              />
            )}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-xl py-4 flex items-center justify-center gap-2"
        >
          <span>{t("login")}</span>
          <ArrowIcon className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-500">{t("or")}</p>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (res) => {
              const idToken = res.credential;

              if (idToken) {
                try {
                  const result = await googleLogin({
                    idToken,
                    provider: "google",
                  });

                  const token =
                    result.data?.accessToken || result.accessToken;

                  if (token) {
                    localStorage.setItem("token", token);
                    onLoginSuccess();
                    ErrorService.success(t("loginSuccess"));
                    navigate("/student-dashboard");
                  }
                } catch (error) {
                  console.error("Google Login failed:", error);
                }
              }
            }}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </form>
    </div>
  );
}