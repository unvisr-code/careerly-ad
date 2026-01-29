"use client";

import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/ga4";
import { useContactModal } from "@/lib/useContactModal";

export default function CTABanner() {
  const { open } = useContactModal();

  return (
    <section className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-accent to-[#F2946B] p-10 md:p-16 text-center text-white overflow-hidden grain">
          {/* Decorative circles */}
          <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mb-5">
              지금 바로 시작하세요
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              IT 전문직 10만 사용자에게 브랜드를 알릴 준비가 되셨나요?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="white"
                size="lg"
                onClick={() => {
                  trackEvent("advertise_cta_contact_click", { location: "cta_banner" });
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
                target="_blank"
                rel="noopener noreferrer"
                className="!border-white/60 !text-white hover:!bg-white/15 hover:!border-white/80"
                onClick={() => trackEvent("advertise_pdf_download_click", { location: "cta_banner" })}
              >
                소개서 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
