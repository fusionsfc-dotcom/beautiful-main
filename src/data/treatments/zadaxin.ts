// ⚠️ 싸이모실 알파1 — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const zadaxinData: TreatmentDetail = {
  slug: "zadaxin",
  category: "western",

  topLabel: "면역세포를 깨우는 항암 면역 주사",  // TODO
  title: "뷰티풀 싸이모실 알파1",
  subtitle: [
    "면역세포를 활성화해",
    "항암 치료 반응을 높입니다.",
  ],
  subtitleHighlight: "면역세포를 활성화해",
  heroImage: `${BASE}clinic_onco.jpeg`,  // TODO: 실제 싸이모실 알파1 사진
  heroVideoUrl: "",
  heroVideoLabel: "싸이모실 알파1 치료 안내 영상",

  effects: [
    { icon: "shield-plus", title: "면역 활성화", description: ["T세포와 NK세포를 자극해", "항암 면역 반응을 높입니다."] },
    { icon: "activity",    title: "치료 반응 향상", description: ["항암 치료의 효과를", "극대화하도록 돕습니다."] },
    { icon: "heart",       title: "회복력 지원", description: ["치료 중 저하된 면역을", "빠르게 회복시킵니다."] },
  ],
  effectsConclusion: "면역 체계를 강화해 항암 치료 효과를 높입니다.",  // TODO

  visualCardsTitle: "싸이모실 알파1이 주는 효과",  // TODO
  visualCards: [
    { number: "01", title: "면역 활성",  subtitle: "T세포 NK세포 강화",    image: `${BASE}yoga_s.jpeg` },
    { number: "02", title: "치료 효과",  subtitle: "항암 반응 극대화",     image: `${BASE}te_1.jpeg` },
    { number: "03", title: "체력 회복", subtitle: "면역 저하 방지",        image: `${BASE}room_pa.jpeg` },
  ],

  consultQuestion: "싸이모실 알파1 치료가 나에게 적합한지 궁금하신가요?",  // TODO

  closingMessage: ["면역이 버텨주면", "치료도 끝까지 이어갑니다."],  // TODO
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,  // TODO
};
