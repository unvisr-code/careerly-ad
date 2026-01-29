"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/ga4";
import { useContactModal } from "@/lib/useContactModal";

export default function HeroSection() {
  const { open } = useContactModal();

  useEffect(() => {
    trackEvent("advertise_view");
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center hero-gradient grain overflow-hidden">
      {/* Decorative mesh */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-accent/[0.04] blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bg-subtle/50 blur-3xl" />

      {/* Floating dots */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent/20 animate-[float-slow_6s_ease-in-out_infinite]" />
      <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-accent/15 animate-[float-slow_8s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-[30%] left-[40%] w-2.5 h-2.5 rounded-full bg-accent/20 animate-[float-slow_7s_ease-in-out_infinite_2s]" />

      <div className="relative z-10 mx-auto max-w-6xl w-full px-5 md:px-8 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-border/60 px-4 py-1.5 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-text-secondary tracking-wide">
                IT 전문직 커뮤니티 광고 플랫폼
              </span>
            </div>

            <h1 className="font-[var(--font-display)] text-[2.75rem] sm:text-5xl lg:text-[3.75rem] font-black leading-[1.08] tracking-[-0.03em]">
              10만 IT 전문직이
              <br />
              매일 보는 피드에
              <br />
              <span className="gradient-text">브랜드를 노출</span>하세요
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0">
              커뮤니티 피드에 자연스럽게 배치되는
              <br className="hidden sm:block" />
              Careerly만의 네이티브 광고 솔루션
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => {
                  trackEvent("advertise_cta_contact_click", { location: "hero" });
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
                onClick={() => trackEvent("advertise_pdf_download_click", { location: "hero" })}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                소개서 다운로드
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-text-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span className="text-xs font-medium">200+ 광고주</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-2 text-text-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium">95% 재집행률</span>
              </div>
            </div>
          </div>

          {/* Hero visual — Careerly feed mockup */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-sm">
              {/* Feed container */}
              <div className="relative z-10 rounded-2xl bg-white border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden animate-[float-slow_6s_ease-in-out_infinite]">
                {/* Feed header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-white">
                  <span className="text-xs font-bold text-text-primary tracking-wide">Careerly Feed</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-accent/60" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                  </div>
                </div>

                {/* Feed item 1 — organic post */}
                <div className="px-5 py-4 border-b border-border/30">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">JK</div>
                    <div>
                      <span className="text-xs font-semibold text-text-primary block leading-tight">김재현</span>
                      <span className="text-[10px] text-text-muted">시니어 백엔드 개발자 · 3시간 전</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-bg-subtle mb-1.5" />
                  <div className="h-2.5 w-4/5 rounded-full bg-bg-subtle" />
                </div>

                {/* Feed item 2 — Sponsored banner */}
                <div className="px-5 py-4 border-b border-border/30 bg-accent-subtle/30">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-[#F2946B] flex items-center justify-center text-white text-[10px] font-bold">Ad</div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-text-primary block leading-tight">TechCorp</span>
                      <span className="text-[10px] text-text-muted">Sponsored</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 h-20 mb-3 flex items-center justify-center border border-accent/10">
                    <div className="text-center">
                      <div className="text-xs font-bold text-accent mb-0.5">지금 가입하면 첫 달 무료!</div>
                      <div className="text-[10px] text-text-muted">개발자 성장 플랫폼</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                        42
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>
                        8
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-accent">자세히 보기 →</span>
                  </div>
                </div>

                {/* Feed item 3 — organic post */}
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">YS</div>
                    <div>
                      <span className="text-xs font-semibold text-text-primary block leading-tight">이윤서</span>
                      <span className="text-[10px] text-text-muted">프로덕트 디자이너 · 5시간 전</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-bg-subtle mb-1.5" />
                  <div className="h-2.5 w-3/5 rounded-full bg-bg-subtle" />
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -top-4 -right-4 z-20 rounded-xl bg-white border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-3 animate-[float-medium_8s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">CTR 4.2%</span>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-6 z-20 rounded-xl bg-white border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-3 animate-[float-medium_7s_ease-in-out_infinite_2s]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">10만+ 도달</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
