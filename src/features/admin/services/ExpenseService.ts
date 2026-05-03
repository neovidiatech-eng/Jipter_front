import api from "../../../lib/axios";

export const ExpenseService = {
  getExpenses: async (status?: string) => {
    const response = await api.get(
      `/finances/expenses${status ? `?status=${status}` : ""}`,
    );

    return response.data.data.expenses;
  },
};
