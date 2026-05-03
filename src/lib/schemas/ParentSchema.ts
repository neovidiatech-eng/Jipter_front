import { z } from 'zod';

type TFunc = (key: string, options?: any) => string;

export const getParentSchema = (t: TFunc) => z.object({
  name: z.string().min(3, t("validation.min", { count: 3 })),
  email: z.string().email(t("validation.email")),
  phone: z.string().min(8, t("validation.min", { count: 8 })),
  username: z.string().min(5, t("validation.min", { count: 5 })),
  password: z.string().min(6, t("validation.min", { count: 6 })),
  numberOfChildren: z.coerce.number().min(0),
  studentNames: z.array(z.string()).min(1, t("validation.required"))
});

export type ParentFormData = z.infer<ReturnType<typeof getParentSchema>>;