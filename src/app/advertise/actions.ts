"use server";

import { contactFormSchema, step1Schema, type ContactFormValues } from "@/lib/schema";
import { sendSlackNotification } from "@/lib/slack";
import type { FormState } from "@/types/advertise";

export async function submitContactForm(
  data: ContactFormValues
): Promise<FormState> {
  // Honeypot check
  if (data.website) {
    // Silently reject spam
    return { success: true, message: "문의가 정상적으로 접수되었습니다." };
  }

  // Check if this is a partial (Step 1 only) submission
  const isPartial = !data.contactName && !data.adPurpose && !data.startDate;

  if (isPartial) {
    // Validate only step 1 fields
    const step1Result = step1Schema.safeParse(data);
    if (!step1Result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of step1Result.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
      return {
        success: false,
        message: "입력값을 확인해 주세요.",
        errors: fieldErrors,
      };
    }

    try {
      console.log("[AdLead] Partial submission (Step 1):", JSON.stringify(step1Result.data, null, 2));
      await sendSlackNotification(data);
      return {
        success: true,
        message:
          "간단 문의가 접수되었습니다. 담당자가 이메일로 상세 내용을 안내드리겠습니다.",
      };
    } catch (error) {
      console.error("[AdLead] Partial submission failed:", error);
      return {
        success: false,
        message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }
  }

  // Full server-side validation
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return {
      success: false,
      message: "입력값을 확인해 주세요.",
      errors: fieldErrors,
    };
  }

  try {
    // Log the submission
    console.log("[AdLead] New submission:", JSON.stringify(result.data, null, 2));

    // Send Slack notification
    await sendSlackNotification(result.data);

    return {
      success: true,
      message:
        "문의가 정상적으로 접수되었습니다. 영업일 기준 1~2일 내 담당자가 회신드리겠습니다.",
    };
  } catch (error) {
    console.error("[AdLead] Submission failed:", error);
    return {
      success: false,
      message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
