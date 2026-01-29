"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: "피드 내 노출",
    desc: "커뮤니티 피드 콘텐츠 사이에 자연스럽게 배치됩니다. 광고 간 최소 6개 콘텐츠 간격을 유지하여 사용자 경험을 보호합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
      </svg>
    ),
    title: "노출 위치",
    desc: "기본 position 2~8 범위에서 서버가 최적 위치를 계산하여 삽입합니다. 상단 구간 강화 옵션으로 상위 노출도 가능합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    title: "클릭 동작",
    desc: "광고 클릭 시 새 탭(외부 브라우저)에서 랜딩 URL이 열립니다. UTM 파라미터 포함 URL을 권장하며, 클릭 및 노출 데이터가 리포트에 반영됩니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "품질 보호",
    desc: "세션당 최대 1개 광고 노출, 동시 집행 최대 3개 캠페인으로 사용자 경험을 보호합니다. 기본 제공 지표는 노출·클릭·CTR이며, 종료 후 리포트를 제공합니다.",
  },
];

export default function ExposureSection() {
  return (
    <SectionWrapper>
      <div className="text-center mb-16 reveal">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
          How it works
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em]">
          노출 및 <span className="gradient-text">운영 방식</span>
        </h2>
      </div>

      <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="card-glow group rounded-2xl bg-white border border-border/60 p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="text-5xl font-black text-bg-subtle font-[var(--font-display)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-[-0.01em]">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
