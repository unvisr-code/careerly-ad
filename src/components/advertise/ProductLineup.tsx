"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/lib/constants";

const GUIDE_ITEMS = [
  { label: "타이틀", value: "20~35자 권장 (핵심 메시지를 명확하게)", icon: "T" },
  { label: "설명", value: "40~80자 권장 (상품에 따라 상이, Card/Native/Promoted Post)", icon: "A" },
  { label: "CTA 텍스트", value: "4~10자 (예: 자세히 보기, 지금 신청, 무료 체험)", icon: "→" },
  { label: "랜딩 URL", value: "HTTPS 필수 · UTM 파라미터 포함 권장", icon: "🔗" },
  { label: "이미지", value: "고해상도 권장 · Image Banner는 메인 이미지 필수", icon: "◻" },
  { label: "개인정보", value: "랜딩 페이지에 개인정보 처리방침 링크 필수", icon: "🛡" },
];

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
      "금융/투자 수익 과장 표현 (원금 보장, 확정 수익 등)",
      "의료/건강 효능 과장 표현",
      "타사 비방 또는 비교 광고 (근거 없는 경우)",
      "허위 채용 공고 또는 사행성 콘텐츠",
      "개인정보를 과도하게 수집하는 랜딩",
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
    title: "랜딩 페이지 및 심사",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
    items: [
      "HTTPS 필수 (HTTP 랜딩 불가)",
      "팝업/리다이렉트 과도한 랜딩은 심사 반려",
      "성인 인증·결제 강제·다운로드 강제 페이지 제한",
      "개인정보 처리방침 없는 수집 페이지 불가",
      "심사 기준 미충족 시 D-3 내 1차 피드백 전달",
    ],
  },
];

type InfoTab = "guide" | "policy";

export default function ProductLineup() {
  const bannersBasic = PRODUCTS.filter((p) => p.type === "banner" && (p.variant === "image" || p.variant === "native"));
  const bannersPlus = PRODUCTS.filter((p) => p.type === "banner" && (p.variant === "card" || p.variant === "strip"));
  const promoted = PRODUCTS.filter((p) => p.type === "promoted_post");
  const sponsorship = PRODUCTS.filter((p) => p.type === "sponsorship");
  const [activeTab, setActiveTab] = useState<InfoTab>("guide");

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#policy") {
        setActiveTab("policy");
      }
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <SectionWrapper id="products" className="bg-bg-warm relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl -z-0" />

      <div className="relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
            Products
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mb-5">
            광고 <span className="gradient-text">상품 라인업</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            목적에 맞는 상품을 선택하세요. 배너 4종과 프로모션 게시글로
            다양한 캠페인을 실행할 수 있습니다.
          </p>
        </div>

        <div className="mb-14">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6 flex items-center gap-3 reveal">
            <span className="h-[2px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
            Banner Basic — Image / Native
          </h3>
          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-5">
            {bannersBasic.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6 flex items-center gap-3 reveal">
            <span className="h-[2px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
            Banner Plus — Card / Strip
          </h3>
          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-5">
            {bannersPlus.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6 flex items-center gap-3 reveal">
            <span className="h-[2px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
            Promoted Post
          </h3>
          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-5">
            {promoted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6 flex items-center gap-3 reveal">
            <span className="h-[2px] w-8 bg-gradient-to-r from-accent to-[#F2946B] rounded-full" />
            Sponsorship — Premium Package
          </h3>
          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-5">
            {sponsorship.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Integrated Guide & Policy tabs */}
        <div id="policy" className="reveal scroll-mt-24">
          <div className="border-b border-border/60 mb-8">
            <div className="flex gap-0">
              <button
                type="button"
                onClick={() => setActiveTab("guide")}
                className={`px-6 py-3 text-sm font-bold transition-colors relative cursor-pointer ${
                  activeTab === "guide"
                    ? "text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                소재 가이드
                {activeTab === "guide" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-[#F2946B]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("policy")}
                className={`px-6 py-3 text-sm font-bold transition-colors relative cursor-pointer ${
                  activeTab === "policy"
                    ? "text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                광고 정책
                {activeTab === "policy" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-[#F2946B]" />
                )}
              </button>
            </div>
          </div>

          {activeTab === "guide" && (
            <>
              <div className="max-w-3xl mx-auto space-y-3">
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

              <div className="mt-12 text-center">
                <a
                  href="/careerly-ad-guide-v5.pdf"
                  download="Careerly_Ad_Guide_v5.pdf"
                  aria-label="광고 소재 가이드 PDF 다운로드 (115KB)"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-glow"
                >
                  <span aria-hidden="true">📥</span>
                  <span>광고 소재 가이드 다운로드 (PDF, 115KB)</span>
                </a>
              </div>
            </>
          )}

          {activeTab === "policy" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
