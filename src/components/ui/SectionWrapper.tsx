"use client";

import { clsx } from "clsx";
import { useReveal } from "@/lib/useReveal";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  reveal?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  wide = false,
  reveal = true,
}: SectionWrapperProps) {
  const ref = useReveal();

  return (
    <section
      id={id}
      ref={reveal ? ref : undefined}
      className={clsx(
        "px-5 md:px-8 py-20 md:py-32",
        wide ? "max-w-7xl" : "max-w-6xl",
        "mx-auto w-full",
        className
      )}
    >
      {children}
    </section>
  );
}
