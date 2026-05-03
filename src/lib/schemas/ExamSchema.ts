import { z } from 'zod';

type TFunc = (key: string, options?: any) => string;

export const getExamSchema = (t: TFunc) => z.object({
  title: z.string().min(3, t("validation.min", { count: 3 })),
  subject: z.string().min(1, t("validation.required")),
  teacher: z.string().min(1, t("validation.required")),
  studentName: z.string().min(1, t("validation.required")),
  dueDate: z.string().min(1, t("validation.required")),
  duration: z.coerce.string().min(1, t("validation.required")), 
  grade: z.coerce.number().min(0).max(1000),
  status: z.enum(['upcoming', 'completed']),
});

export type ExamFormData = z.infer<ReturnType<typeof getExamSchema>>;