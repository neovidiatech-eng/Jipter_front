export type Currency = {
  id: string;
  name_en: string;
  name_ar: string;
  symbol: string;
  code: string;
};

export type Plan = {
  id: string;
  name_en: string;
  name_ar: string;
  description: string;
  price: string | number;
  duration: number;
  sessionsCount: number;
  features: string[];
  currencyId: string;
  active: boolean;
  bestSeller: boolean;
  currency?: Currency;
  createdAt: string;
  updatedAt: string;
};

export type PlansResponse = {
  message: string;
  status: number;
  data: Plan[];
};

export type PlanResponse = {
  message: string;
  status: number;
  data: Plan;
};
