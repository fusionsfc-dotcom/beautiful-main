// ⚠️ 미슬토 — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const alnovaData: TreatmentDetail = {
  slug: "alnova",
  category: "western",

  topLabel: "암세포 억제 환경을 만드는 면역 조절",  // TODO
  title: "뷰티풀 미슬토",
  subtitle: [
    "면역 조절을 통해",
    "암세포 억제 환경을 만듭니다.",
  ],
  subtitleHighlight: "암세포 억제 환경을",
  heroImage: `${BASE}clinic/misl.png`,
  heroVideoUrl: "",
  heroVideoLabel: "미슬토 치료 안내 영상",

  effects: [
    { icon: "shield-plus", title: "면역 조절",  description: ["과도한 염증 반응을 줄여", "균형 잡힌 면역을 만듭니다."] },
    { icon: "activity",    title: "암 억제",    description: ["암세포 억제 환경을 조성해", "재발 위험을 낮춥니다."] },
    { icon: "heart",       title: "안전성",     description: ["부작용을 최소화하며", "치료를 지속할 수 있습니다."] },
  ],
  effectsConclusion: "면역을 조절해 암 억제 환경을 만들어갑니다.",  // TODO

  visualCardsTitle: "미슬토가 주는 효과",  // TODO
  visualCards: [
    { number: "01", title: "면역 균형",  subtitle: "과도한 반응 조절",  image: `${BASE}yoga_s.jpeg` },
    { number: "02", title: "암 억제",    subtitle: "억제 환경 조성",    image: `${BASE}te_1.jpeg` },
    { number: "03", title: "안전 치료", subtitle: "부작용 최소화",      image: `${BASE}room_pa.jpeg` },
  ],

  consultQuestion: "미슬토 치료가 나에게 필요한지 궁금하신가요?",  // TODO

  closingMessage: ["균형 잡힌 면역이", "회복의 열쇠입니다."],  // TODO
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,  // TODO
};
