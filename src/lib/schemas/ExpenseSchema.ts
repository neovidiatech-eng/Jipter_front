import { z } from "zod";

type TFunc = (key: string, options?: any) => string;

export const getExpenseCategoryEnum = () => z.enum([
  'salaries', 
  'utilities', 
  'supplies', 
  'marketing', 
  'general', 
  'administrative', 
  'other'
]);

export const getExpenseStatusEnum = () => z.enum(['paid', 'pending']);

export const getExpenseSchema = (t: TFunc) => z.object({
  description: z
    .string()
    .min(3, t("validation.min", { count: 3 }))
    .max(200, t("validation.max", { count: 200 })),
    
  amount: z.coerce
    .number()
    .min(0.01, t("validation.required")),
    
  currency: z.string().min(1, t("validation.required")),
  
  category: getExpenseCategoryEnum(),
  
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: t("validation.required"),
  }),
  
  paymentMethod: z.string().optional().or(z.literal('')),
  
  status: getExpenseStatusEnum().default('pending'),
});

export type ExpenseFormData = z.infer<ReturnType<typeof getExpenseSchema>>;

export interface Expense extends ExpenseFormData {
  id: string;
  createdAt?: string;
}