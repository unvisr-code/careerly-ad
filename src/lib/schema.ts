import { z } from "zod";

export const contactFormSchema = z
  .object({
    companyName: z.string().min(1, "회사/브랜드명을 입력해 주세요."),
    contactName: z.string().min(1, "담당자명을 입력해 주세요."),
    email: z.string().email("올바른 이메일 형식을 입력해 주세요."),
    phone: z.string().optional(),
    adPurpose: z.string().min(1, "광고 목적을 선택해 주세요."),
    productType: z.string().min(1, "희망 상품을 선택해 주세요."),
    duration: z.string().min(1, "집행 기간을 선택해 주세요."),
    startDate: z.string().min(1, "집행 시작일을 입력해 주세요."),
    endDate: z.string().min(1, "집행 종료일을 입력해 주세요."),
    landingUrl: z.string().url("올바른 URL 형식을 입력해 주세요. (https://...)"),
    materialLink: z
      .string()
      .url("올바른 URL 형식을 입력해 주세요.")
      .optional()
      .or(z.literal("")),
    materialLater: z.boolean().default(false),
    budgetRange: z.string().optional(),
    additionalNotes: z.string().optional(),
    // honeypot field - should be empty
    website: z.string().max(0, "").optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "종료일은 시작일 이후여야 합니다.",
      path: ["endDate"],
    }
  );

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Step 1 partial schema for quick submit (company + email + product only)
export const step1Schema = z.object({
  companyName: z.string().min(1, "회사/브랜드명을 입력해 주세요."),
  email: z.string().email("올바른 이메일 형식을 입력해 주세요."),
  productType: z.string().min(1, "희망 상품을 선택해 주세요."),
  duration: z.string().min(1, "집행 기간을 선택해 주세요."),
});
