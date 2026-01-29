"use client";

import { useState, useId } from "react";
import { clsx } from "clsx";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  onToggle,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const headerId = `${id}-header`;
  const panelId = `${id}-panel`;

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={clsx(
      "border-b border-border/60 transition-colors duration-300",
      isOpen && "border-accent/20"
    )}>
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors cursor-pointer"
      >
        <span className={clsx(
          "text-base font-semibold transition-colors duration-300",
          isOpen ? "text-accent" : "text-text-primary group-hover:text-accent"
        )}>
          {title}
        </span>
        <div className={clsx(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
          isOpen
            ? "bg-accent text-white rotate-180"
            : "bg-bg-subtle text-text-muted group-hover:bg-accent-light group-hover:text-accent"
        )}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={clsx(
          "grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-text-secondary leading-relaxed text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
