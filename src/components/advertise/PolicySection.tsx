"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const POLICIES = [
  {
    title: "금지 업종 및 콘텐츠",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    items: [
      "도박, 성인, 불법 금융, 무기 관련 업종",
      "허위/과장 광고, 사행성 콘텐츠",
      "개인정보를 과도하게 수집하는 랜딩",
      "커뮤니티 가이드라인 위반 콘텐츠",
    ],
  },
  {
    title: "Sponsored 표기",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
    items: [
      "모든 광고에 'Sponsored' 라벨 자동 적용",
      "광고주가 표기를 제거/변경 불가",
      "Promoted Post는 feedType='Sponsored'로 노출",
    ],
  },
  {
    title: "랜딩 페이지 제한",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
    items: [
      "HTTP(비암호화) 랜딩 허용 불가 (HTTPS 필수)",
      "팝업/리다이렉트 과도한 랜딩은 심사 반려",
      "개인정보 처리방침 없는 수집 페이지 불가",
    ],
  },
];

export default function PolicySection() {
  return (
    <SectionWrapper id="policy">
      <div className="text-center mb-16 reveal">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
          Policy
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em]">
          정책 <span className="gradient-text">요약</span>
        </h2>
      </div>

      <div className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-5">
        {POLICIES.map((policy) => (
          <div
            key={policy.title}
            className="card-glow group rounded-2xl bg-white border border-border/60 p-7 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center mb-5">
                {policy.icon}
              </div>
              <h3 className="text-base font-bold mb-4 tracking-[-0.01em]">{policy.title}</h3>
              <ul className="space-y-2.5">
                {policy.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
