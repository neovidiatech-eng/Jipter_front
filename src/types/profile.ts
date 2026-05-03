export interface ProfileUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  provider: string;
  googleId: string | null;
  createdAt: string;
  code_country: string;
  status: string;
}

export interface ProfilePlan {
  id: string;
  name_en: string;
  name_ar: string;
  description: string;
  price: string;
  duration: number;
  sessionsCount: number;
  features: string[];
}

export interface ProfileData {
  id: string;
  user_id: string;
  birth_date: string;
  gender: 'male' | 'female';
  active: boolean;
  createdAt: string;
  updatedAt: string;
  sessions: number;
  sessions_attended: number;
  sessions_remaining: number;
  planId: string;
  country: string;
  status: string;
  user: ProfileUser;
  schedules: any[];
  plan: ProfilePlan;
}

export interface StudentProfileResponse {
  message: string;
  status: number;
  data: ProfileData;
}
