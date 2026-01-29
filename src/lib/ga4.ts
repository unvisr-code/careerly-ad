"use client";

type GA4Event =
  | "advertise_view"
  | "advertise_pdf_download_click"
  | "advertise_cta_contact_click"
  | "advertise_product_expand"
  | "advertise_form_submit"
  | "advertise_form_submit_success"
  | "advertise_form_submit_fail"
  | "advertise_form_open";

export function trackEvent(
  event: GA4Event,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}
