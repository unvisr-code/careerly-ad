"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const ADVERTISER_LOGOS = [
  "토스", "카카오", "라인", "쿠팡", "배달의민족", "당근",
  "네이버", "SK텔레콤",
];

const TESTIMONIALS = [
  {
    company: "테크스타트업 A",
    role: "마케팅 리드",
    quote: "개발자 채용 광고를 여러 채널에 집행해봤지만, 커리어리에서의 CTR이 가장 높았습니다. IT 전문직 타겟팅이 정확해서 전환 품질도 뛰어났어요.",
    result: "CTR 5.1% 달성",
  },
  {
    company: "SaaS 기업 B",
    role: "그로스 매니저",
    quote: "네이티브 배너로 서비스 런칭을 알렸는데, 피드에 자연스럽게 노출되어 사용자 반응이 매우 좋았습니다.",
    result: "가입 전환율 3.2%",
  },
  {
    company: "교육 플랫폼 C",
    role: "퍼포먼스 마케터",
    quote: "Promoted Post로 기술 콘텐츠를 발행했더니 댓글과 공유가 활발하게 이루어졌습니다. 자연스러운 브랜딩 효과가 인상적이었어요.",
    result: "참여율 4.8%",
  },
];

const CASE_BADGES = [
  "OO기업 CTR 5.1% 달성",
  "채용 광고 전환 비용 40% 절감",
  "SaaS 런칭 캠페인 10만 도달",
  "Promoted Post 참여율 업계 평균 3배",
];

export default function SocialProofSection() {
  return (
    <SectionWrapper className="bg-bg-secondary overflow-hidden">
      <div className="text-center mb-16 reveal">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
          Trusted By
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mb-5">
          200+ 광고주가 <span className="gradient-text">신뢰합니다</span>
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
          국내 대표 IT 기업부터 스타트업까지, 커리어리를 통해 IT 전문직에게 도달하고 있습니다.
        </p>
      </div>

      {/* Logo marquee */}
      <div className="relative mb-16 reveal">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-secondary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-secondary to-transparent z-10" />
        <div className="marquee-container overflow-hidden">
          <div className="marquee-track flex gap-12 items-center">
            {[...ADVERTISER_LOGOS, ...ADVERTISER_LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="shrink-0 h-12 px-8 rounded-xl bg-white border border-border/60 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <span className="text-sm font-bold text-text-secondary whitespace-nowrap tracking-wide">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.company}
            className="card-glow group rounded-2xl bg-white border border-border/60 p-7 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              {/* Result badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-light text-accent text-xs font-bold px-3 py-1 mb-4">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                {t.result}
              </div>

              {/* Quote */}
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{t.company[0]}</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-text-primary block">{t.company}</span>
                  <span className="text-xs text-text-muted">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mini case study badges */}
      <div className="flex flex-wrap justify-center gap-3 reveal">
        {CASE_BADGES.map((badge) => (
          <div
            key={badge}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-border/60 px-4 py-2 text-sm font-medium text-text-secondary shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {badge}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
