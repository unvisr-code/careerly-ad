"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { useContactModal } from "@/lib/useContactModal";
import { trackEvent } from "@/lib/ga4";

const NAV_LINKS = [
  { label: "상품", href: "#products" },
  { label: "정책", href: "#policy" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = () => {
    trackEvent("advertise_cta_contact_click", { location: "navbar" });
    open();
    setMenuOpen(false);
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 py-4">
        <a href="#" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Careerly"
            width={100}
            height={24}
            className="h-5 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleContactClick}
            className="rounded-full bg-gradient-to-r from-accent to-[#F2946B] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(237,102,83,0.25)] hover:shadow-[0_4px_20px_rgba(237,102,83,0.35)] transition-all duration-300 cursor-pointer"
          >
            견적 문의
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={clsx(
            "absolute h-[2px] w-5 bg-text-primary rounded-full transition-all duration-300",
            menuOpen ? "rotate-45" : "-translate-y-1.5"
          )} />
          <span className={clsx(
            "absolute h-[2px] w-5 bg-text-primary rounded-full transition-all duration-300",
            menuOpen ? "opacity-0" : "opacity-100"
          )} />
          <span className={clsx(
            "absolute h-[2px] w-5 bg-text-primary rounded-full transition-all duration-300",
            menuOpen ? "-rotate-45" : "translate-y-1.5"
          )} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-6 pt-2 flex flex-col gap-1 bg-white/90 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-text-secondary hover:text-text-primary py-3 px-3 rounded-xl hover:bg-bg-subtle transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleContactClick}
            className="mt-2 rounded-full bg-gradient-to-r from-accent to-[#F2946B] px-6 py-3 text-sm font-semibold text-white text-center shadow-[0_2px_12px_rgba(237,102,83,0.25)] cursor-pointer"
          >
            견적 문의
          </button>
        </div>
      </div>
    </nav>
  );
}
