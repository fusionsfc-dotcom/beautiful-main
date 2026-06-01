// ⚠️ 맞춤 구강 케어 — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const customOralData: TreatmentDetail = {
  slug: "custom-oral",
  category: "dental",

  topLabel: "환자 상태에 맞춘 1:1 구강 케어",  // TODO
  title: "맞춤 구강 케어",
  subtitle: [
    "환자 상태에 맞춰",
    "치료 전·중·후 구강 관리를 진행합니다.",
  ],
  subtitleHighlight: "치료 전·중·후",
  heroImage: `${BASE}clinic/c_3.jpeg`,
  heroVideoUrl: "",
  heroVideoLabel: "맞춤 구강 케어 안내 영상",

  effects: [
    { icon: "shield-plus", title: "단계별 관리",  description: ["치료 전·중·후 각 단계에", "맞는 관리를 제공합니다."] },
    { icon: "heart",       title: "개인화 케어",  description: ["개인의 구강 상태를 분석해", "최적의 케어를 설계합니다."] },
    { icon: "activity",    title: "지속 모니터링", description: ["치료 기간 내내 구강 상태를", "지속적으로 관찰합니다."] },
  ],
  effectsConclusion: "맞춤 관리로 치료 기간 내내 구강 건강을 지킵니다.",  // TODO

  visualCardsTitle: "맞춤 구강 케어가 주는 효과",  // TODO
  visualCards: [
    { number: "01", title: "단계별 관리",  subtitle: "치료 전·중·후",     image: `${BASE}yoga_s.jpeg` },
    { number: "02", title: "개인화",      subtitle: "상태 맞춤 설계",     image: `${BASE}te_1.jpeg` },
    { number: "03", title: "지속 케어",   subtitle: "꾸준한 모니터링",    image: `${BASE}room_pa.jpeg` },
  ],

  consultQuestion: "나만의 맞춤 구강 케어가 궁금하신가요?",  // TODO

  closingMessage: ["내 몸에 맞는 케어가", "회복을 더 빠르게 합니다."],  // TODO
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,  // TODO
};
