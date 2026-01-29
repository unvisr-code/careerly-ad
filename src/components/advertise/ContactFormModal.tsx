"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import { contactFormSchema, step1Schema, type ContactFormValues } from "@/lib/schema";
import { AD_PURPOSES, PRODUCT_OPTIONS, DURATION_OPTIONS, BUDGET_RANGES } from "@/lib/constants";
import { trackEvent } from "@/lib/ga4";
import { submitContactForm } from "@/app/advertise/actions";
import { useContactModal } from "@/lib/useContactModal";

type SubmitState = "idle" | "submitting" | "success" | "error";

const STEPS = [
  { label: "기본 정보" },
  { label: "상세 정보" },
];

/* ─── Slide transition variants ─── */
const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-50%" : "50%",
    opacity: 0,
  }),
};

/* ─── Main component ─── */
export default function ContactFormModal() {
  const { isOpen, close } = useContactModal();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      materialLater: false,
    },
  });

  const materialLater = watch("materialLater");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      trackEvent("advertise_form_open");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

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

  const handleNext = async () => {
    const valid = await trigger(["companyName", "email", "productType", "duration"]);
    if (valid) {
      setDirection(1);
      setStep(2);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleQuickSubmit = async () => {
    const values = getValues();
    const step1Result = step1Schema.safeParse(values);
    if (!step1Result.success) return;

    trackEvent("advertise_form_submit");
    setSubmitState("submitting");

    const partialData: ContactFormValues = {
      ...values,
      contactName: values.contactName || "",
      phone: values.phone || "",
      adPurpose: values.adPurpose || "",
      duration: values.duration || "",
      startDate: values.startDate || "",
      endDate: values.endDate || "",
      landingUrl: values.landingUrl || "",
    };

    const result = await submitContactForm(partialData);

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

  const handleClose = () => {
    close();
    setTimeout(() => {
      setSubmitState("idle");
      setResultMessage("");
      setStep(1);
      setDirection(0);
    }, 300);
  };

  const handleStepClick = (clicked: number) => {
    if (clicked === step) return;
    // Only allow clicking completed steps (going back)
    if (clicked < step) {
      setDirection(clicked > step ? 1 : -1);
      setStep(clicked);
    }
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl mx-4 my-4 max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.15)]"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-white/90 backdrop-blur-xl border-b border-border/40 rounded-t-3xl">
          <div>
            <h2 id="contact-modal-title" className="font-[var(--font-display)] text-xl font-black tracking-[-0.02em]">
              견적 문의
            </h2>
            <p className="text-xs text-text-muted mt-0.5">영업일 기준 1~2일 내 회신드립니다</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-bg-subtle hover:bg-bg-warm flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stepper indicator */}
        {submitState !== "success" && (
          <div className="px-8 pt-6 pb-2">
            <div className="flex items-center">
              {STEPS.map((s, index) => {
                const stepNumber = index + 1;
                const isLast = index === STEPS.length - 1;
                return (
                  <div key={s.label} className={clsx("flex items-center", !isLast && "flex-1")}>
                    <StepIndicator
                      step={stepNumber}
                      currentStep={step}
                      label={s.label}
                      onClick={() => handleStepClick(stepNumber)}
                    />
                    {!isLast && <StepConnector isComplete={step > stepNumber} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-8 py-6">
          {submitState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-black mb-3 tracking-[-0.02em]">
                문의가 접수되었습니다
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8 text-sm">{resultMessage}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => { setSubmitState("idle"); setStep(1); setDirection(0); }} size="sm">추가 문의하기</Button>
                <Button onClick={handleClose} variant="secondary" size="sm">닫기</Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              {/* Animated step content */}
              <StepContentWrapper
                currentStep={step}
                direction={direction}
              >
                {step === 1 ? (
                  <div className="space-y-8">
                    <fieldset>
                      <legend className="text-sm font-bold mb-4 flex items-center gap-2.5 text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        기본 정보
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="회사/브랜드명" required error={errors.companyName?.message}>
                          <input type="text" placeholder="커리어리 주식회사" className={inputClass(errors.companyName)} {...register("companyName")} />
                        </Field>
                        <Field label="이메일" required error={errors.email?.message}>
                          <input type="email" placeholder="ads@company.com" className={inputClass(errors.email)} {...register("email")} />
                        </Field>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <Field label="관심 상품" required error={errors.productType?.message}>
                          <select className={inputClass(errors.productType, true)} {...register("productType")}>
                            <option value="">선택해 주세요</option>
                            {PRODUCT_OPTIONS.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
                          </select>
                        </Field>
                        <Field label="집행 기간" required error={errors.duration?.message}>
                          <select className={inputClass(errors.duration, true)} {...register("duration")}>
                            <option value="">선택해 주세요</option>
                            {DURATION_OPTIONS.map((d) => (<option key={d.value} value={d.value}>{d.label}</option>))}
                          </select>
                        </Field>
                      </div>
                    </fieldset>

                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="stepper-next-btn w-full h-12 rounded-xl bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors cursor-pointer"
                      >
                        다음
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleQuickSubmit}
                        disabled={submitState === "submitting"}
                        className="text-sm text-text-muted hover:text-accent transition-colors cursor-pointer py-2"
                      >
                        {submitState === "submitting" ? "제출 중..." : "간단히 제출하기 (나머지는 메일로 안내)"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* 담당자 정보 */}
                    <fieldset>
                      <legend className="text-sm font-bold mb-4 flex items-center gap-2.5 text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        담당자 정보
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="담당자명" required error={errors.contactName?.message}>
                          <input type="text" placeholder="홍길동" className={inputClass(errors.contactName)} {...register("contactName")} />
                        </Field>
                        <Field label="연락처" error={errors.phone?.message}>
                          <input type="tel" placeholder="010-1234-5678" className={inputClass(errors.phone)} {...register("phone")} />
                        </Field>
                      </div>
                    </fieldset>

                    {/* 캠페인 정보 */}
                    <fieldset>
                      <legend className="text-sm font-bold mb-4 flex items-center gap-2.5 text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        캠페인 정보
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="광고 목적" required error={errors.adPurpose?.message}>
                          <select className={inputClass(errors.adPurpose, true)} {...register("adPurpose")}>
                            <option value="">선택해 주세요</option>
                            {AD_PURPOSES.map((p) => (<option key={p} value={p}>{p}</option>))}
                          </select>
                        </Field>
                        <Field label="예산 범위" error={errors.budgetRange?.message}>
                          <select className={inputClass(errors.budgetRange, true)} {...register("budgetRange")}>
                            <option value="">선택해 주세요 (선택)</option>
                            {BUDGET_RANGES.map((b) => (<option key={b} value={b}>{b}</option>))}
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
                      <legend className="text-sm font-bold mb-4 flex items-center gap-2.5 text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        소재 정보
                      </legend>
                      <div className="space-y-4">
                        <Field label="랜딩 URL" required error={errors.landingUrl?.message}>
                          <input type="url" placeholder="https://www.example.com/campaign" className={inputClass(errors.landingUrl)} {...register("landingUrl")} />
                        </Field>
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            id="modal-materialLater"
                            className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
                            {...register("materialLater")}
                          />
                          <label htmlFor="modal-materialLater" className="text-sm text-text-secondary cursor-pointer">
                            소재는 추후 전달하겠습니다
                          </label>
                        </div>
                        {!materialLater && (
                          <Field label="소재 링크" error={errors.materialLink?.message}>
                            <input type="url" placeholder="https://drive.google.com/..." className={inputClass(errors.materialLink)} {...register("materialLink")} />
                          </Field>
                        )}
                      </div>
                    </fieldset>

                    {/* 추가 사항 */}
                    <fieldset>
                      <legend className="text-sm font-bold mb-4 flex items-center gap-2.5 text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        추가 사항
                      </legend>
                      <Field label="추가 요청사항" error={errors.additionalNotes?.message}>
                        <textarea rows={3} placeholder="기타 요청사항이나 참고할 내용을 입력해 주세요." className={inputClass(errors.additionalNotes)} {...register("additionalNotes")} />
                      </Field>
                    </fieldset>

                    {submitState === "error" && (
                      <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-error">
                        {resultMessage}
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="stepper-back-btn shrink-0 h-12 px-6 rounded-xl border border-border/80 bg-white text-text-secondary font-bold text-sm flex items-center gap-2 hover:bg-bg-subtle transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        이전
                      </button>
                      <button
                        type="submit"
                        disabled={submitState === "submitting"}
                        className="stepper-next-btn flex-1 h-12 rounded-xl bg-accent text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors cursor-pointer disabled:opacity-60"
                      >
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
                      </button>
                    </div>
                  </div>
                )}
              </StepContentWrapper>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Step Indicator (animated circle) ─── */
function StepIndicator({
  step,
  currentStep,
  label,
  onClick,
}: {
  step: number;
  currentStep: number;
  label: string;
  onClick: () => void;
}) {
  const status = currentStep === step ? "active" : currentStep > step ? "complete" : "inactive";

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2.5 cursor-pointer transition-colors",
        status === "inactive" && "cursor-default",
      )}
    >
      <motion.div
        className="relative w-9 h-9 rounded-full flex items-center justify-center"
        animate={status}
        initial={false}
        variants={{
          inactive: { backgroundColor: "var(--color-bg-subtle)" },
          active: { backgroundColor: "var(--color-accent)" },
          complete: { backgroundColor: "var(--color-accent)" },
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {status === "complete" ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          ) : status === "active" ? (
            <motion.div
              key="dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="w-2.5 h-2.5 rounded-full bg-white"
            />
          ) : (
            <motion.span
              key="number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-bold text-text-muted"
            >
              {step}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <span
        className={clsx(
          "text-sm font-bold transition-colors duration-300 hidden sm:block",
          status === "inactive" ? "text-text-muted" : "text-text-primary",
        )}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Step Connector (animated line) ─── */
function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="flex-1 mx-3 h-[2px] rounded-full bg-border/60 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={false}
        animate={{
          width: isComplete ? "100%" : "0%",
          backgroundColor: isComplete ? "var(--color-accent)" : "transparent",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Step Content Wrapper (slide transitions) ─── */
function StepContentWrapper({
  currentStep,
  direction,
  children,
}: {
  currentStep: number;
  direction: number;
  children: ReactNode;
}) {
  const [height, setHeight] = useState<number | "auto">("auto");

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <SlideTransition
          key={currentStep}
          direction={direction}
          onHeightReady={(h) => setHeight(h)}
        >
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Slide Transition ─── */
function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode;
  direction: number;
  onHeightReady: (h: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      onHeightReady(ref.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Field wrapper ─── */
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 text-text-secondary uppercase tracking-wide">
        {label}
        {required && <span className="text-accent ml-0.5 normal-case">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-error font-medium">{error}</p>
      )}
    </div>
  );
}

function inputClass(error?: { message?: string }, isSelect?: boolean) {
  return clsx(
    "w-full rounded-xl border bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200",
    "focus:border-accent focus:ring-2 focus:ring-accent/10 focus:bg-white",
    isSelect && "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10 cursor-pointer",
    error ? "border-error" : "border-border/80"
  );
}
