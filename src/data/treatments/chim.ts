// ⚠️ 침 치료 (조선침법) — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const chimData: TreatmentDetail = {
  slug: "chim",
  category: "korean",

  topLabel: "",
  title: "침 치료",
  subtitle: [],
  subtitleHighlight: "",
  heroImage: `${BASE}clinic/han_c.png`,
  heroVideoUrl: "",
  heroVideoLabel: "침치료 소개 영상 보기",

  // 4개 효과 — simpleMode: 아이콘 + 제목만
  effects: [
    { icon: "shield-plus",    title: "항암 부작용 관리 특화" },
    { icon: "crown",          title: "궁중 비전 침법" },
    { icon: "heart",          title: "자연치유력 강화" },
    { icon: "activity",       title: "전신 균형 회복" },
  ],
  effectsSimpleMode: true,

  // 6장 비주얼 카드 — grid6 레이아웃
  visualCardsTitle: "항암 환자를 위한 침치료 효과",
  visualCards: [
    { title: "소화불량 개선", image: `${BASE}clinic/cim/c_1.png` },
    { title: "불면증 개선", image: `${BASE}clinic/cim/c_2.png` },
    { title: "변비 개선", image: `${BASE}clinic/cim/c_3.png` },
    { title: "전신 통증 완화", image: `${BASE}clinic/cim/c_4.png` },
    { title: "무기력 개선", image: `${BASE}clinic/cim/c_5.png` },
    { title: "수족증후군 개선", image: `${BASE}clinic/cim/c_6.png` },
  ],
  visualCardsLayout: "grid6",

  // 상담 CTA — 2개 버튼
  consultQuestion:
    "조선 어의의 지혜로 당신의 건강을 지켜드립니다.\n항암 치료의 효과를 높이고 삶의 질을 향상시키세요.",
  consultCTAs: [
    {
      type: "reservation",
      label: "침치료 상담 예약하기",
      icon: "calendar",
      href: "/reservation",
    },
    {
      type: "video-review",
      label: "환자 후기 영상 보기",
      subtitle: "실제 치료 경험을 확인해보세요!",
      icon: "play",
      videoUrl: "", // TODO: 실제 YouTube URL 입력
    },
  ],

  // 마무리 메시지 없음 → MotivationMessage 섹션 자동 생략

  bottomBarVariant: "full",
};
