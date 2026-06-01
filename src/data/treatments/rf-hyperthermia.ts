// ⚠️ 고주파온열치료 — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const rfHyperthermiaData: TreatmentDetail = {
  slug: "rf-hyperthermia",
  category: "western",

  topLabel: "암 조직 주변 온도를 높이는 양방 통합 치료",
  title: "뷰티풀 고주파온열치료",
  subtitle: [
    "고주파 에너지로 암 조직 주변",
    "온도를 높여 면역 반응을 활성화합니다.",
  ],
  subtitleHighlight: "면역 반응을 활성화",
  heroImage: `${BASE}room_tr/onco.jpg`,
  heroVideoUrl: "",
  heroVideoLabel: "고주파온열치료 안내 영상",

  effects: [
    { icon: "activity", title: "암세포 성장 억제", description: ["암 조직 주변 온도를 높여", "성장 환경을 억제합니다."] },
    { icon: "shield-plus", title: "면역 활성화", description: ["면역 반응을 자극해", "항암 치료 효과를 보조합니다."] },
    { icon: "heart", title: "통증 완화", description: ["치료 중 불편을 줄이며", "회복을 돕습니다."] },
  ],
  effectsConclusion: "고주파 온열로 면역과 치료 반응을 높입니다.",

  visualCardsTitle: "고주파온열치료가 주는 효과",
  visualCards: [
    { number: "01", title: "암 억제", subtitle: "성장 환경 억제", image: `${BASE}room_tr/onco.jpg` },
    { number: "02", title: "면역 활성", subtitle: "항암 효과 보조", image: `${BASE}clinic_onco.jpeg` },
    { number: "03", title: "맞춤 프로토콜", subtitle: "환자 상태별 적용", image: `${BASE}te_1.jpeg` },
  ],

  consultQuestion: "고주파온열치료가 나에게 적합한지 궁금하신가요?",

  closingMessage: ["온열이 만드는 변화가", "치료의 힘을 키웁니다."],
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,
};
