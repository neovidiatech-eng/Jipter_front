import { z } from "zod";

type TFunc = (key: string, options?: any) => string;

export const getCourseSchema = (t: TFunc) => z.object({
  title: z.string().min(3, t("validation.min", { count: 3 })),
  category: z.string().min(1, t("validation.required")),
  levelId: z.number().min(1, t("validation.required")),
  attachments: z.array(z.any()),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailFile: z.any().nullable(),
  thumbnailPreview: z.string(),
});

export type CourseFormData = z.infer<ReturnType<typeof getCourseSchema>>;