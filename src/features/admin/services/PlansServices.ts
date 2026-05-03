import api from "../../../lib/axios";
import { Plan } from "../../../types/plan";

// get plans
export const getPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get("/subscription/plans");
    const data = response.data.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error("Get plans failed:", error);
    throw error;
  }
};

//delete plans
export const deletePlans = async (id: string) => {
  try {
    const res = await api.delete(`/subscription/plans/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export interface UpdatePlanPayload {
  name_ar?: string;
  name_en?: string;
  price?: number;
  duration?: number;
  hours?: number;
  active?: boolean;
  bestSeller?: boolean;
  features?: string[];
}

// update plan
export const updatePlan = async (id: string, data: UpdatePlanPayload) => {
  try {
    const res = await api.patch(`/subscription/plans/${id}`, data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Update plan failed:", error);
    throw error;
  }
};
