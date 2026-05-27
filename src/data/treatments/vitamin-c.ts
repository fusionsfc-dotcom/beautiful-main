// ⚠️ 고농도 비타민 C — placeholder 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const vitaminCData: TreatmentDetail = {
  slug: "vitamin-c",
  category: "western",

  topLabel: "산화 스트레스를 줄이는 항암 수액",  // TODO
  title: "뷰티풀 고농도 비타민 C",
  subtitle: [
    "산화 스트레스를 조절해",
    "암세포 억제와 회복을 돕습니다.",
  ],
  subtitleHighlight: "암세포 억제와",
  heroImage: `${BASE}headdocimg.png`,  // TODO: 실제 비타민 C 수액 사진
  heroVideoUrl: "",
  heroVideoLabel: "고농도 비타민 C 안내 영상",

  effects: [
    { icon: "droplets",    title: "산화 스트레스 감소", description: ["세포 손상을 유발하는", "산화 스트레스를 줄여줍니다."] },
    { icon: "shield-plus", title: "항암 보조",          description: ["암세포 억제에 도움을 주는", "환경을 만들어갑니다."] },
    { icon: "heart",       title: "피로 회복",          description: ["항암 부작용으로 인한", "피로를 빠르게 회복합니다."] },
  ],
  effectsConclusion: "산화 스트레스를 줄여 회복과 치료 효과를 높입니다.",  // TODO

  visualCardsTitle: "고농도 비타민 C가 주는 효과",  // TODO
  visualCards: [
    { number: "01", title: "항산화",    subtitle: "세포 보호",        image: `${BASE}yoga_s.jpeg` },
    { number: "02", title: "항암 보조", subtitle: "암세포 억제 보조", image: `${BASE}te_1.jpeg` },
    { number: "03", title: "피로 개선", subtitle: "에너지 회복",      image: `${BASE}room_pa.jpeg` },
  ],

  consultQuestion: "고농도 비타민 C 치료가 궁금하신가요?",  // TODO

  closingMessage: ["세포가 건강해지면", "회복이 더 빨라집니다."],  // TODO
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,  // TODO
};
