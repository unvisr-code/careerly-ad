"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the container and any children with reveal classes
    const revealEls = el.querySelectorAll(".reveal, .reveal-scale, .stagger-children");
    revealEls.forEach((child) => observer.observe(child));
    if (el.classList.contains("reveal") || el.classList.contains("reveal-scale") || el.classList.contains("stagger-children")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
