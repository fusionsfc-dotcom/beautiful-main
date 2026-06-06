export type MenuItem = {
  label: string;
  href: string;
  badge?: "HOT" | "NEW";
  locked?: boolean;
  lockedText?: string;
};

export type MenuCategory = {
  id: string;
  number: number;
  title: string;
  icon: "shield" | "hospital" | "clipboard" | "person" | "calendar" | "question";
  badge?: "HOT";
  items: MenuItem[];
  defaultOpen?: boolean;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "intro",
    number: 1,
    title: "뷰티풀 소개",
    icon: "shield",
    defaultOpen: true,
    items: [
      { label: "Why 뷰티풀 (5가지 이유)", href: "/why", badge: "HOT" },
      { label: "브랜드 스토리 & 철학", href: "/intro/story" },
      { label: "의료진 소개", href: "/about#doctors" },
      { label: "둘러보기 (시설)", href: "/facilities" },
    ],
  },
  {
    id: "program",
    number: 2,
    title: "치료 프로그램",
    icon: "hospital",
    badge: "HOT",
    defaultOpen: true,
    items: [
      { label: "통합 맞춤 치료", href: "/program/integrated", badge: "NEW" },
      { label: "운동 재활 치료", href: "/program/rehab", badge: "NEW" },
      { label: "항암 식단 & 영양", href: "/program/nutrition" },
      { label: "턱관절 치료 (TBT)", href: "/program/tbt", badge: "NEW" },
    ],
  },
  {
    id: "review",
    number: 3,
    title: "치료 후기",
    icon: "clipboard",
    badge: "HOT",
    defaultOpen: true,
    items: [
      { label: "자필 후기", href: "/cases?tab=review" },
      { label: "영상 후기", href: "/columns?tab=videos" },
    ],
  },
  {
    id: "cancer-rehab",
    number: 4,
    title: "암 재활 프로그램",
    icon: "person",
    items: [
      { label: "위암 / 폐암 / 유방암 / 기타 암", href: "/cancer/types" },
      { label: "프로그램 소개", href: "/cancer/intro" },
    ],
  },
  {
    id: "info",
    number: 5,
    title: "암 정보",
    icon: "calendar",
    items: [
      { label: "영상 (유튜브)", href: "/columns?tab=videos" },
      { label: "의료 칼럼", href: "/columns?tab=columns" },
    ],
  },
  {
    id: "faq",
    number: 6,
    title: "자주 묻는 질문 (FAQ)",
    icon: "question",
    items: [
      { label: "자주하는 질문", href: "/columns?tab=faq" },
    ],
  },
];
