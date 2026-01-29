"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { AccordionItem } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-16 reveal">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-4 block">
          FAQ
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em]">
          자주 묻는 <span className="gradient-text">질문</span>
        </h2>
      </div>
      <div className="reveal max-w-3xl mx-auto rounded-3xl bg-white border border-border/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] px-8 md:px-10 py-2">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.question} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </div>
    </SectionWrapper>
  );
}
