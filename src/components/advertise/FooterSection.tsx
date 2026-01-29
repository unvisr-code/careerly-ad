"use client";

import Image from "next/image";
import { useContactModal } from "@/lib/useContactModal";

export default function FooterSection() {
  const { open } = useContactModal();

  return (
    <footer className="border-t border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <Image
              src="/logo.png"
              alt="Careerly"
              width={120}
              height={28}
              className="h-6 w-auto mb-4"
            />
            <p className="text-sm text-text-muted max-w-xs leading-relaxed">
              IT 전문직 커뮤니티에서 만나는
              <br />
              프리미엄 광고 플랫폼
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">문의</h4>
              <a
                href="mailto:careerly@careerly.co.kr"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                careerly@careerly.co.kr
              </a>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">정책</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#policy" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    광고 정책
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">바로가기</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#products" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    상품 라인업
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={open}
                    className="text-sm text-text-secondary hover:text-accent transition-colors cursor-pointer"
                  >
                    견적 문의
                  </button>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Careerly. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Made for IT professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
