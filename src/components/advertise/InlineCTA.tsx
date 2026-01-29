"use client";

import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/ga4";
import { useContactModal } from "@/lib/useContactModal";

export default function InlineCTA() {
  const { open } = useContactModal();

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-[#F2946B] py-12 md:py-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-white tracking-[-0.02em] mb-4">
            이 상품이 마음에 드셨나요?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            맞춤 견적을 받아보세요. 캠페인 목적에 맞는 최적의 상품 조합을 추천드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="white"
              size="lg"
              onClick={() => {
                trackEvent("advertise_cta_contact_click", { location: "inline" });
                open();
              }}
            >
              견적 문의하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button
              href="/Careerly_광고상품_소개서.pdf"
              variant="secondary"
              size="lg"
              className="!border-white/60 !text-white hover:!bg-white/15 hover:!border-white/80"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("advertise_pdf_download_click", { location: "inline" })}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              소개서 다운로드
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
