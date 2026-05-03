import { message } from "antd";

/**
 * Centeralized service for handling and displaying error messages to the user.
 */
class ErrorService {
  /**
   * Display a success message toast.
   * @param content Message to display
   */
  static success(content: string) {
    message.success(content);
  }

  /**
   * Display an error message toast.
   * @param content Message to display
   */
  static error(content: string) {
    message.error(content);
  }

  /**
   * Display a warning message toast.
   * @param content Message to display
   */
  static warning(content: string) {
    message.warning(content);
  }

  /**
   * Parse an error object (from Axios or elsewhere) and return a human-readable message.
   * @param error The error object to parse
   * @returns A string representing the error message
   */
  static parseErrorMessage(error: any): string {
    if (typeof error === 'string') return error;

    // Axios error handling
    if (error?.response?.data) {
      const data = error.response.data;
      if (typeof data === 'string') return data;
      if (data.errors && Array.isArray(data.errors)) {
        const detail = data.errors.join(' | ');
        return data.message ? `${data.message}: ${detail}` : detail;
      }
    }

    if (error?.message) return error.message;

    return "An unknown error occurred. Please try again.";
  }

  /**
   * Handle and display an error automatically.
   * @param error The error object to handle
   */
  static handleError(error: any) {
    const message = this.parseErrorMessage(error);
    this.error(message);
  }
}

export default ErrorService;
