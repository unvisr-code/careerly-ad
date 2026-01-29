"use client";

import { useReveal } from "@/lib/useReveal";

const STATS = [
  { value: "100K+", label: "IT 전문직 사용자", desc: "개발자, 디자이너, PM 등" },
  { value: "200+", label: "광고주 파트너", desc: "스타트업부터 대기업까지" },
  { value: "95%", label: "재집행률", desc: "높은 광고 만족도" },
  { value: "4.2%", label: "평균 CTR", desc: "업계 평균 대비 3배" },
];

export default function StatsSection() {
  const ref = useReveal();

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="stagger-children grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border/60">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:px-8">
              <div className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-[-0.04em] gradient-text leading-none">
                {stat.value}
              </div>
              <div className="mt-3 text-sm font-semibold text-text-primary">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
