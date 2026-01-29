"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/schema";
import { AD_PURPOSES, PRODUCT_OPTIONS, BUDGET_RANGES } from "@/lib/constants";
import { trackEvent } from "@/lib/ga4";
import { submitContactForm } from "@/app/advertise/actions";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [resultMessage, setResultMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      materialLater: false,
    },
  });

  const materialLater = watch("materialLater");

  const onSubmit = async (data: ContactFormValues) => {
    trackEvent("advertise_form_submit");
    setSubmitState("submitting");

    const result = await submitContactForm(data);

    if (result.success) {
      trackEvent("advertise_form_submit_success");
      setSubmitState("success");
      setResultMessage(result.message);
      reset();
    } else {
      trackEvent("advertise_form_submit_fail");
      setSubmitState("error");
      setResultMessage(result.message);
    }
  };

  if (submitState === "success") {
    return (
      <SectionWrapper id="contact" className="bg-bg-warm">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-[#ECFDF5] mx-auto mb-8 flex items-center justify-center">
            <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-[var(--font-display)] text-3xl font-black mb-4 tracking-[-0.02em]">
            문의가 접수되었습니다
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8">{resultMessage}</p>
          <Button onClick={() => setSubmitState("idle")}>추가 문의하기</Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="contact" className="bg-bg-warm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-3xl" />

      <div className="relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mb-5">
            견적 <span className="gradient-text">문의하기</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            아래 양식을 작성해 주시면 영업일 기준 1~2일 내 담당자가 회신드립니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="reveal max-w-3xl mx-auto"
          noValidate
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="rounded-3xl bg-white border border-border/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-8 md:p-10 space-y-10">
            {/* 회사 정보 */}
            <fieldset>
              <legend className="text-base font-bold mb-6 flex items-center gap-3 tracking-[-0.01em]">
                <span className="h-[3px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
                회사 정보
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="회사/브랜드명" required error={errors.companyName?.message}>
                  <input type="text" placeholder="커리어리 주식회사" className={inputClass(errors.companyName)} {...register("companyName")} />
                </Field>
                <Field label="담당자명" required error={errors.contactName?.message}>
                  <input type="text" placeholder="홍길동" className={inputClass(errors.contactName)} {...register("contactName")} />
                </Field>
                <Field label="이메일" required error={errors.email?.message}>
                  <input type="email" placeholder="ads@company.com" className={inputClass(errors.email)} {...register("email")} />
                </Field>
                <Field label="연락처" error={errors.phone?.message}>
                  <input type="tel" placeholder="010-1234-5678" className={inputClass(errors.phone)} {...register("phone")} />
                </Field>
              </div>
            </fieldset>

            {/* 캠페인 정보 */}
            <fieldset>
              <legend className="text-base font-bold mb-6 flex items-center gap-3 tracking-[-0.01em]">
                <span className="h-[3px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
                캠페인 정보
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="광고 목적" required error={errors.adPurpose?.message}>
                  <select className={inputClass(errors.adPurpose)} {...register("adPurpose")}>
                    <option value="">선택해 주세요</option>
                    {AD_PURPOSES.map((p) => (<option key={p} value={p}>{p}</option>))}
                  </select>
                </Field>
                <Field label="희망 상품" required error={errors.productType?.message}>
                  <select className={inputClass(errors.productType)} {...register("productType")}>
                    <option value="">선택해 주세요</option>
                    {PRODUCT_OPTIONS.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                  </select>
                </Field>
                <Field label="집행 시작일" required error={errors.startDate?.message}>
                  <input type="date" className={inputClass(errors.startDate)} {...register("startDate")} />
                </Field>
                <Field label="집행 종료일" required error={errors.endDate?.message}>
                  <input type="date" className={inputClass(errors.endDate)} {...register("endDate")} />
                </Field>
              </div>
            </fieldset>

            {/* 소재 정보 */}
            <fieldset>
              <legend className="text-base font-bold mb-6 flex items-center gap-3 tracking-[-0.01em]">
                <span className="h-[3px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
                소재 정보
              </legend>
              <div className="space-y-5">
                <Field label="랜딩 URL" required error={errors.landingUrl?.message}>
                  <input type="url" placeholder="https://www.example.com/campaign" className={inputClass(errors.landingUrl)} {...register("landingUrl")} />
                </Field>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="materialLater"
                    className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
                    {...register("materialLater")}
                  />
                  <label htmlFor="materialLater" className="text-sm text-text-secondary cursor-pointer">
                    소재는 추후 전달하겠습니다
                  </label>
                </div>

                {!materialLater && (
                  <Field label="소재 링크" error={errors.materialLink?.message}>
                    <input type="url" placeholder="https://drive.google.com/... (이미지/파일 링크)" className={inputClass(errors.materialLink)} {...register("materialLink")} />
                  </Field>
                )}
              </div>
            </fieldset>

            {/* 추가 사항 */}
            <fieldset>
              <legend className="text-base font-bold mb-6 flex items-center gap-3 tracking-[-0.01em]">
                <span className="h-[3px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
                추가 사항
              </legend>
              <div className="space-y-5">
                <Field label="예산 범위" error={errors.budgetRange?.message}>
                  <select className={inputClass(errors.budgetRange)} {...register("budgetRange")}>
                    <option value="">선택해 주세요 (선택)</option>
                    {BUDGET_RANGES.map((b) => (<option key={b} value={b}>{b}</option>))}
                  </select>
                </Field>
                <Field label="추가 요청사항" error={errors.additionalNotes?.message}>
                  <textarea rows={4} placeholder="기타 요청사항이나 참고할 내용을 입력해 주세요." className={inputClass(errors.additionalNotes)} {...register("additionalNotes")} />
                </Field>
              </div>
            </fieldset>

            {submitState === "error" && (
              <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-error">
                {resultMessage}
              </div>
            )}

            <div className="pt-2 text-center">
              <Button type="submit" size="lg" disabled={submitState === "submitting"}>
                {submitState === "submitting" ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    제출 중...
                  </>
                ) : (
                  <>
                    견적 문의 제출하기
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-text-primary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-error font-medium">{error}</p>
      )}
    </div>
  );
}

function inputClass(error?: { message?: string }) {
  return clsx(
    "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300",
    "focus:border-accent focus:ring-2 focus:ring-accent/10 focus:shadow-[0_0_0_4px_rgba(237,102,83,0.06)]",
    error ? "border-error" : "border-border"
  );
}
