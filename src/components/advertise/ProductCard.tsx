"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { trackEvent } from "@/lib/ga4";
import type { Product, BannerVariant } from "@/types/advertise";

function BannerPreview({ variant, type }: { variant?: BannerVariant; type: string }) {
  if (type === "promoted_post") {
    return (
      <div className="rounded-xl bg-bg-subtle border border-border/40 p-3 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-violet-600" />
          <div>
            <div className="h-2 w-16 rounded-full bg-border" />
            <div className="h-1.5 w-10 rounded-full bg-border/60 mt-1" />
          </div>
          <span className="ml-auto text-[8px] font-semibold text-accent bg-accent-light rounded px-1.5 py-0.5">Sponsored</span>
        </div>
        <div className="h-2 w-full rounded-full bg-border/60 mb-1" />
        <div className="h-2 w-4/5 rounded-full bg-border/60 mb-1" />
        <div className="h-2 w-3/5 rounded-full bg-border/60" />
      </div>
    );
  }

  if (variant === "strip") {
    return (
      <div className="rounded-xl bg-bg-subtle border border-border/40 p-3 mb-5">
        <div className="rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 h-10 flex items-center justify-between px-3 border border-accent/10">
          <div>
            <div className="h-2 w-24 rounded-full bg-accent/20 mb-1" />
            <div className="h-1.5 w-16 rounded-full bg-accent/10" />
          </div>
          <div className="h-5 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-[7px] font-bold text-accent">CTA</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div className="rounded-xl bg-bg-subtle border border-border/40 p-3 mb-5">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 h-16 flex items-center justify-center border border-blue-100/50">
          <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>
        <div className="mt-2 h-2 w-20 rounded-full bg-border/60" />
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="rounded-xl bg-bg-subtle border border-border/40 p-3 mb-5">
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-100/50 shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-2 w-24 rounded-full bg-border mb-1.5" />
            <div className="h-1.5 w-full rounded-full bg-border/60 mb-1" />
            <div className="h-1.5 w-3/4 rounded-full bg-border/60" />
          </div>
        </div>
      </div>
    );
  }

  // native
  return (
    <div className="rounded-xl bg-bg-subtle border border-border/40 p-3 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
        <div className="h-2 w-20 rounded-full bg-border" />
        <span className="ml-auto text-[8px] font-semibold text-accent bg-accent-light rounded px-1.5 py-0.5">Sponsored</span>
      </div>
      <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 h-12 mb-2 border border-amber-100/50" />
      <div className="h-2 w-full rounded-full bg-border/60 mb-1" />
      <div className="h-2 w-2/3 rounded-full bg-border/60" />
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-glow group rounded-2xl border border-border/60 bg-white overflow-hidden relative">
      {/* Hover accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-[#F2946B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-7">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-light rounded-full px-3 py-1 mb-3">
              <span className="w-1 h-1 rounded-full bg-accent" />
              {product.type === "promoted_post"
                ? "Promoted Post"
                : product.variant === "image" || product.variant === "native"
                  ? `Basic · ${product.variant}`
                  : `Plus · ${product.variant}`}
            </span>
            <h3 className="text-xl font-bold tracking-[-0.02em]">{product.name}</h3>
          </div>
        </div>

        <BannerPreview variant={product.variant} type={product.type} />

        <p className="text-text-secondary text-sm leading-relaxed mb-4">{product.tagline}</p>

        {/* Pricing */}
        {product.pricing && (
          <div className="flex gap-2 mb-5">
            {product.pricing.map((p) => (
              <div key={p.period} className="flex-1 rounded-lg bg-bg-subtle border border-border/40 px-3 py-2 text-center">
                <span className="text-[10px] font-semibold text-text-muted uppercase block">{p.period}</span>
                <span className="text-sm font-bold text-text-primary">{p.price}</span>
              </div>
            ))}
          </div>
        )}

        <AccordionItem
          title="상세 정보 보기"
          onToggle={(isOpen) => {
            if (isOpen) {
              trackEvent("advertise_product_expand", { variant: product.id });
            }
          }}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">{product.description}</p>

            <div>
              <h4 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-accent rounded-full" />
                특징
              </h4>
              <ul className="space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="text-sm text-text-secondary flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-accent rounded-full" />
                제출 항목
              </h4>
              <div className="rounded-xl bg-bg-warm p-4 space-y-2">
                {product.fields.map((f) => (
                  <div key={f} className="text-sm text-text-secondary flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {product.exampleCopy && (
              <div className="rounded-xl bg-bg-subtle p-4 border-l-[3px] border-accent/40">
                <p className="text-xs text-text-muted mb-1.5 font-semibold uppercase tracking-wide">카피 예시</p>
                <p className="text-sm italic text-text-secondary leading-relaxed">
                  &ldquo;{product.exampleCopy}&rdquo;
                </p>
              </div>
            )}
          </div>
        </AccordionItem>
      </div>
    </div>
  );
}
