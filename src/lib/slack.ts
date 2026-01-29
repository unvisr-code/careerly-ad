import type { ContactFormValues } from "./schema";

export async function sendSlackNotification(data: ContactFormValues) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[Slack] Webhook URL not configured, skipping notification.");
    return;
  }

  const text = [
    `:incoming_envelope: *새 광고 문의가 접수되었습니다*`,
    ``,
    `*회사/브랜드:* ${data.companyName}`,
    `*담당자:* ${data.contactName}`,
    `*이메일:* ${data.email}`,
    data.phone ? `*연락처:* ${data.phone}` : null,
    `*광고 목적:* ${data.adPurpose}`,
    `*희망 상품:* ${data.productType}`,
    data.duration ? `*집행 기간:* ${data.duration}` : null,
    `*집행 일정:* ${data.startDate} ~ ${data.endDate}`,
    `*랜딩 URL:* ${data.landingUrl}`,
    data.materialLink ? `*소재 링크:* ${data.materialLink}` : null,
    data.materialLater ? `*소재:* 추후 전달 예정` : null,
    data.budgetRange ? `*예산 범위:* ${data.budgetRange}` : null,
    data.additionalNotes ? `*추가 요청:* ${data.additionalNotes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    console.error("[Slack] Notification failed:", error);
  }
}
