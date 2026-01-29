import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Careerly 광고상품 안내 | Advertise with Careerly",
  description:
    "커뮤니티 피드에서 자연스럽게 노출되는 Careerly 광고. 배너 4종 + 프로모션 게시글로 IT 전문직 타겟에게 도달하세요.",
  keywords: [
    "Careerly",
    "커리어리",
    "광고",
    "배너 광고",
    "프로모션",
    "IT 마케팅",
    "B2B 광고",
    "직장인 광고",
    "커뮤니티 광고",
  ],
  authors: [{ name: "Careerly" }],
  creator: "Careerly",
  publisher: "Careerly",
  metadataBase: new URL("https://careerly-ad.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/img_symbol-careerly.png",
    apple: "/img_symbol-careerly.png",
  },
  openGraph: {
    title: "Careerly 광고상품 안내 | IT 전문직 타겟 광고",
    description:
      "배너 4종 + 프로모션 게시글 · Sponsored 표기 준수 · 모바일/데스크톱 지원 · 커리어리 커뮤니티에서 자연스럽게 노출되는 광고 상품",
    type: "website",
    url: "https://careerly-ad.vercel.app",
    siteName: "Careerly 광고상품",
    locale: "ko_KR",
    images: [
      {
        url: "/logo.png",
        alt: "Careerly 광고상품",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careerly 광고상품 안내",
    description: "IT 전문직 타겟 광고 · 배너 4종 + 프로모션 게시글",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const isValidGA4 = GA4_ID && /^G-[A-Z0-9]+$/.test(GA4_ID);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        {isValidGA4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
