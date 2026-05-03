import axios from "axios";
import { baseURL } from "../consts";
import ErrorService from "../utils/ErrorService";
import i18n from "../../i18n";

const api = axios.create({
  baseURL: baseURL,
  timeout: 300000,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers ??= {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token) {
        // If token exists but we get 401, treat it as a role/permission issue as requested
        ErrorService.error(i18n.t("unauthorizedRoleError"));
      } else {
        // Handle truly unauthorized (no token) - clear storage and redirect
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        const publicPages = ["/login", "/register"];
        if (!publicPages.includes(window.location.pathname)) {
          window.location.href = "/login";
          ErrorService.error(i18n.t("sessionExpiredError"));
        }
      }
    } else if (status === 403) {
      ErrorService.error("You do not have permission to perform this action.");
    } else if (status === 404) {
      ErrorService.error("The requested resource was not found.");
    } else if (status >= 500) {
      ErrorService.error("A server error occurred. Please try again later.");
    } else {
      // Log the error
      console.error("API Error:", error);
    }


    return Promise.reject(error);
  },
);

export default api;
