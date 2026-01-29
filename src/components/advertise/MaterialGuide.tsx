"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const GUIDE_ITEMS = [
  { label: "타이틀", value: "30~40자 이내 권장", icon: "T" },
  { label: "설명", value: "50~100자 이내 권장 (상품에 따라 상이)", icon: "A" },
  { label: "CTA 텍스트", value: "10자 이내 (예: 자세히 보기, 지금 신청)", icon: "→" },
  { label: "랜딩 URL", value: "HTTPS 필수 · UTM 파라미터 포함 권장", icon: "🔗" },
  { label: "이미지", value: "고해상도 권장 · 상품별 사이즈 안내 별도 제공", icon: "◻" },
  { label: "개인정보", value: "랜딩 페이지에 개인정보 처리방침 링크 필수", icon: "🛡" },
];

export default function MaterialGuide() {
  return (
    <SectionWrapper className="bg-bg-warm">
      <div className="text-center mb-16 reveal">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
          Creative Guide
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em]">
          소재 <span className="gradient-text">가이드</span>
        </h2>
      </div>

      <div className="stagger-children max-w-3xl mx-auto space-y-3">
        {GUIDE_ITEMS.map((item) => (
          <div
            key={item.label}
            className="card-glow flex items-center gap-5 rounded-2xl bg-white border border-border/60 px-6 py-5"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0 text-sm font-bold">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-text-primary block">{item.label}</span>
              <span className="text-sm text-text-secondary">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center reveal">
        <a
          href="/careerly-ad-guide-v4.pdf"
          download="Careerly_Ad_Guide_v4.pdf"
          aria-label="광고 소재 가이드 PDF 다운로드 (159KB)"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-glow"
        >
          <span aria-hidden="true">📥</span>
          <span>광고 소재 가이드 다운로드 (PDF, 159KB)</span>
        </a>
      </div>
    </SectionWrapper>
  );
}
