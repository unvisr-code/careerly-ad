"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/ga4";
import { useContactModal } from "@/lib/useContactModal";

export default function MobileStickyBar() {
  const { open, isOpen: modalOpen } = useContactModal();
  const [visible, setVisible] = useState(false);
  const rafId = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setVisible(scrollPercent > 0.4);
        rafId.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (modalOpen) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-border/60 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-text-primary truncate">IT 전문직 10만 커뮤니티</p>
          <p className="text-[10px] text-text-muted truncate">맞춤 견적을 받아보세요</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            trackEvent("advertise_cta_contact_click", { location: "sticky_bar" });
            open();
          }}
        >
          견적 문의
        </Button>
        <a
          href="/Careerly_광고상품_소개서.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
          onClick={() => trackEvent("advertise_pdf_download_click", { location: "sticky_bar" })}
        >
          소개서
        </a>
      </div>
    </div>
  );
}
