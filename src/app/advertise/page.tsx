import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Careerly 광고상품 안내 | Advertise with Careerly",
  description:
    "커뮤니티 피드에서 자연스럽게 노출되는 Careerly 광고. 배너 4종 + 프로모션 게시글 · Sponsored 표기 준수 · 모바일/데스크톱 지원.",
  openGraph: {
    title: "Careerly 광고상품 안내",
    description:
      "배너 4종 + 프로모션 게시글로 IT 전문직 타겟에게 도달하세요.",
    type: "website",
  },
};

export default function AdvertisePage() {
  return <ClientPage />;
}
