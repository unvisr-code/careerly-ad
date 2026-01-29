import type { Product, FAQItem, ValueProp } from "@/types/advertise";

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "커뮤니티 피드 기반",
    description:
      "개발자·디자이너·PM 등 IT 전문직 사용자가 매일 방문하는 피드에 노출됩니다.",
    icon: "feed",
  },
  {
    title: "자연스러운 삽입",
    description:
      "피드 콘텐츠 사이에 배치되어 사용자 경험을 해치지 않으면서 높은 주목도를 얻습니다.",
    icon: "blend",
  },
  {
    title: "명확한 광고 표기",
    description:
      "모든 광고에 Sponsored 표기를 적용하여 사용자 신뢰와 브랜드 가치를 동시에 지킵니다.",
    icon: "badge",
  },
  {
    title: "모바일 + 데스크톱",
    description:
      "반응형 배너와 게시글로 모바일·데스크톱 모두에서 최적화된 경험을 제공합니다.",
    icon: "devices",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "image",
    type: "banner",
    variant: "image",
    name: "Image Banner",
    tagline: "단순 이미지 클릭형 배너. 브랜딩·이벤트·채용·서비스 소개에 적합",
    description:
      "이미지 중심의 배너로 제품·서비스의 비주얼을 강조합니다. 브랜딩·이벤트·채용·서비스 소개에 적합합니다.",
    details: [
      "이미지 중심 노출 (Banner Basic)",
      "제품·서비스 비주얼 강조",
      "높은 브랜드 회상률",
      "앱 설치·런칭에 최적",
    ],
    fields: ["메인 이미지 (필수)", "랜딩 URL (HTTPS 필수)", "타이틀 (선택)", "설명 (선택)", "CTA 텍스트 (선택)"],
    exampleCopy: "새로운 디자인 툴, 지금 만나보세요",
    pricing: [
      { period: "1주", price: "25만원" },
      { period: "2주", price: "45만원" },
      { period: "4주", price: "80만원" },
    ],
  },
  {
    id: "native",
    type: "banner",
    variant: "native",
    name: "Native Banner",
    tagline: "피드 카드와 유사한 네이티브 형태. 채용·콘텐츠 기반 자연스러운 노출",
    description:
      "피드의 일반 게시글과 거의 동일한 형태로 노출되어 가장 높은 참여율을 기대할 수 있습니다. 커뮤니티 맥락에 맞춘 자연스러운 메시지에 적합합니다.",
    details: [
      "피드 게시글과 동일한 형태 (Banner Basic)",
      "가장 높은 참여율",
      "자연스러운 사용자 경험",
      "인게이지먼트 중심 캠페인에 최적",
    ],
    fields: ["타이틀 (20~35자 권장)", "설명 (40~80자 권장)", "CTA 텍스트 (4~10자)", "랜딩 URL (HTTPS 필수)", "이미지 (선택)"],
    exampleCopy: "시니어 백엔드 엔지니어가 말하는 커리어 전환 스토리",
    pricing: [
      { period: "1주", price: "25만원" },
      { period: "2주", price: "45만원" },
      { period: "4주", price: "80만원" },
    ],
  },
  {
    id: "card",
    type: "banner",
    variant: "card",
    name: "Card Banner",
    tagline: "카드형(이미지+텍스트+CTA) 구조. 교육·세미나·콘텐츠 마케팅에 적합",
    description:
      "피드 카드와 유사한 UI로 콘텐츠 흐름에 자연스럽게 녹아듭니다. 클릭 전 메시지 전달이 중요한 광고(교육·세미나·콘텐츠)에 적합합니다.",
    details: [
      "카드 형태 UI 배치 (Banner Plus)",
      "콘텐츠 흐름에 자연스러운 노출",
      "이미지 + 텍스트 + CTA 구조",
      "정보 전달·콘텐츠 마케팅에 최적",
    ],
    fields: ["타이틀 (20~35자 권장)", "설명 (40~80자 권장)", "CTA 텍스트 (4~10자)", "랜딩 URL (HTTPS 필수)", "썸네일 이미지 (권장)"],
    exampleCopy: "2026 개발자 채용 트렌드 리포트 무료 다운로드",
    pricing: [
      { period: "1주", price: "30만원" },
      { period: "2주", price: "54만원" },
      { period: "4주", price: "96만원" },
    ],
  },
  {
    id: "strip",
    type: "banner",
    variant: "strip",
    name: "Strip Banner",
    tagline: "가로형 그라디언트 배너. 프로모션·캠페인·이벤트·채용 하이라이트에 최적",
    description:
      "풀 너비의 가로형 배너로 피드 내 시각적 임팩트가 가장 큰 형태입니다. 프로모션·캠페인·기간 한정 이벤트·채용 공고 하이라이트에 적합합니다.",
    details: [
      "풀 너비 가로형 그라디언트 배너 (Banner Plus)",
      "피드 상단 영역 노출 (기본 position 2~8)",
      "높은 가시성과 클릭률",
      "배경 이미지 적용 가능",
    ],
    fields: ["타이틀 (20~35자 권장)", "설명 (선택)", "CTA 텍스트 (4~10자)", "랜딩 URL (HTTPS 필수)", "배너 이미지 (선택)"],
    exampleCopy: "지금 가입하면 첫 달 무료! 개발자 성장 플랫폼 →",
    pricing: [
      { period: "1주", price: "30만원" },
      { period: "2주", price: "54만원" },
      { period: "4주", price: "96만원" },
    ],
  },
  {
    id: "promoted_post",
    type: "promoted_post",
    name: "Promoted Post",
    tagline: "일반 게시글 형태의 Sponsored 콘텐츠. 스토리텔링·가이드·후기·채용에 최적",
    description:
      "일반 게시글 카드 형태로 노출되며 feedType='Sponsored'로 렌더링됩니다. 상세한 메시지 전달(서비스 설명·가이드·후기·채용·콘텐츠)에 적합합니다.",
    details: [
      "게시글 형태로 작성 (마크다운/HTML 지원)",
      "댓글·좋아요 등 인터랙션 가능",
      "콘텐츠 가치 전달 + 전환 유도",
      "채용 홍보·기술 블로그·이벤트에 최적",
    ],
    fields: ["게시글 제목 (권장)", "게시글 본문 (마크다운/HTML)", "이미지 (선택)", "작성자 표기 (브랜드명/프로필)", "랜딩 URL (선택)"],
    exampleCopy: "우리 팀이 MSA로 전환한 이유와 그 과정에서 배운 것들",
    pricing: [
      { period: "1주", price: "40만원" },
      { period: "2주", price: "72만원" },
      { period: "4주", price: "128만원" },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "광고 집행까지 얼마나 걸리나요?",
    answer:
      "결제 완료 후 소재 접수(집행 D-5 영업일 권장) → 심사(D-3 내 1차 피드백) → 세팅·QA(D-1) → 집행 시작 순서로 진행됩니다. 소재 확정 후 영업일 기준 3~5일 내 집행이 가능합니다.",
  },
  {
    question: "가격은 어떻게 되나요?",
    answer:
      "Banner Basic(Image/Native)은 1주 25만원, 2주 45만원, 4주 80만원입니다. Banner Plus(Card/Strip)는 1주 30만원, 2주 54만원, 4주 96만원입니다. Promoted Post는 1주 40만원, 2주 72만원, 4주 128만원입니다. 장기 집행 시 8주 이상 계약 시 10% 할인이 적용됩니다. 모든 가격은 VAT 별도입니다.",
  },
  {
    question: "집행 중 소재 변경이 가능한가요?",
    answer:
      "기본 1회 무상 교체가 포함되어 있습니다. 2회 이상 변경 시 추가 소재 등록 옵션(+10만원/종)이 적용됩니다. 오타·링크 오류 등 긴급 변경은 운영팀 재량으로 우선 반영 후 사후 검수합니다.",
  },
  {
    question: "광고 성과 리포팅은 어떻게 받나요?",
    answer:
      "기본 제공 지표는 노출(imp)·클릭(click)·CTR입니다. 캠페인 종료 후 5영업일 내 CSV/스냅샷 리포트를 이메일로 전달합니다. 주간 리포트(+10만원/주)나 중간 점검 콜(+10만원/회) 옵션도 이용 가능합니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "캠페인 시작 전 취소 시 전액 환불됩니다(제작비/대행비 발생 시 실비 공제). 진행 중 취소 시 잔여 기간 일할 정산 후 환불됩니다. 단, 광고주의 랜딩/서버 오류로 인한 전환 저하나 정책 위반으로 인한 집행 중단(광고주 귀책)은 환불 불가합니다.",
  },
  {
    question: "배너와 프로모션 게시글을 동시에 집행할 수 있나요?",
    answer:
      "가능합니다. 동일 기간 Banner + Promoted Post를 함께 집행하실 수 있으며, 견적 문의 시 번들 패키지를 요청하시면 할인 혜택을 받으실 수 있습니다.",
  },
  {
    question: "추가 옵션에는 어떤 것이 있나요?",
    answer:
      "프리미엄 구간(+15만원/주), 추가 소재 등록(+10만원/종), A/B 테스트(+15만원), 배너 소재 제작 대행(+20만원/종), 프로모션 소재 제작 대행(+35만원/건) 등의 옵션을 선택하실 수 있습니다.",
  },
  {
    question: "긴급 집행이 가능한가요?",
    answer:
      "집행 시작 D-2 영업일 이내 요청 시 긴급 집행이 가능하며, 기본 가격의 20% 할증이 적용됩니다. 소재가 확정된 상태여야 합니다.",
  },
];

export const AD_PURPOSES = [
  "브랜딩/인지도",
  "채용 홍보",
  "이벤트/웨비나",
  "서비스 전환(가입/설치)",
  "콘텐츠 마케팅",
  "기타",
];

export const PRODUCT_OPTIONS = [
  { value: "image", label: "Image Banner — Basic (1주 25만원~)" },
  { value: "native", label: "Native Banner — Basic (1주 25만원~)" },
  { value: "card", label: "Card Banner — Plus (1주 30만원~)" },
  { value: "strip", label: "Strip Banner — Plus (1주 30만원~)" },
  { value: "promoted_post", label: "Promoted Post (1주 40만원~)" },
  { value: "bundle", label: "Bundle: Banner + Promoted Post (문의 시 할인)" },
];

export const DURATION_OPTIONS = [
  { value: "1주", label: "1주" },
  { value: "2주", label: "2주" },
  { value: "4주", label: "4주" },
  { value: "8주 이상", label: "8주 이상 (장기 할인)" },
  { value: "미정", label: "미정 (상담 희망)" },
];

export const BUDGET_RANGES = [
  "50만원 미만",
  "50만원 ~ 100만원",
  "100만원 ~ 200만원",
  "200만원 ~ 500만원",
  "500만원 이상",
  "미정 (상담 희망)",
];
