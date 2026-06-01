// ⚠️ 감염 예방 관리 — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const infectionPreventionData: TreatmentDetail = {
  slug: "infection-prevention",
  category: "dental",

  topLabel: "면역 저하 시 구강 감염을 미리 막는 관리",  // TODO
  title: "감염 예방 관리",
  subtitle: [
    "면역이 떨어진 상태에서",
    "구강 감염을 예방하는 것이 중요합니다.",
  ],
  subtitleHighlight: "구강 감염을 예방하는",
  heroImage: `${BASE}clinic/c_2.jpeg`,
  heroVideoUrl: "",
  heroVideoLabel: "감염 예방 관리 안내 영상",

  effects: [
    { icon: "shield-plus", title: "감염 차단",  description: ["구강 내 세균 번식을 억제해", "감염 위험을 낮춥니다."] },
    { icon: "activity",    title: "조기 발견",  description: ["감염 징후를 조기에 발견해", "빠르게 대처합니다."] },
    { icon: "heart",       title: "면역 보호",  description: ["약해진 면역을 고려한", "안전한 관리를 진행합니다."] },
  ],
  effectsConclusion: "감염을 미리 막아 치료의 흐름을 보호합니다.",  // TODO

  visualCardsTitle: "감염 예방 관리가 주는 효과",  // TODO
  visualCards: [
    { number: "01", title: "감염 예방",  subtitle: "세균 억제",         image: `${BASE}yoga_s.jpeg` },
    { number: "02", title: "조기 대응", subtitle: "징후 빠른 발견",     image: `${BASE}te_1.jpeg` },
    { number: "03", title: "면역 보호", subtitle: "안전한 구강 케어",    image: `${BASE}room_pa.jpeg` },
  ],

  consultQuestion: "항암 중 감염이 걱정되시나요?",  // TODO

  closingMessage: ["예방이 치료보다", "훨씬 중요합니다."],  // TODO
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}headdocimg.png`,  // TODO
};
