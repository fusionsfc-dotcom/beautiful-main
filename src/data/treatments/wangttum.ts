// ⚠️ 왕뜸 — 시안 기반 정확한 데이터
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const wangttumData: TreatmentDetail = {
  slug: "wangttum",
  category: "korean",

  topLabel: "임독맥을 깨우는 전신 온열 치료",
  title: "뷰티풀 약뜸",
  subtitle: [
    "체온을 올리고 면역력을 높여",
    "항암 치료를 버틸 수 있는 몸을 만듭니다.",
  ],
  subtitleHighlight: "면역력을 높여",
  heroImage: `${BASE}clinic/dd.jpg`,
  heroVideoUrl: "",
  heroVideoLabel: "약뜸 치료 과정 영상 보기",

  effects: [
    {
      icon: "thermometer",
      title: "체온 상승",
      description: ["자연열로 체온을 올려", "신진대사를 촉진합니다."],
    },
    {
      icon: "shield-plus",
      title: "면역력 강화",
      description: ["면역 기능을 활성화하여", "회복력을 높입니다."],
    },
    {
      icon: "activity",
      title: "임독맥 자극",
      description: ["등과 배를 동시에 자극해", "전신 순환을 깨웁니다."],
    },
  ],
  effectsConclusion: "전신 순환을 깨워 회복력을 끌어올립니다.",

  visualCardsTitle: "약뜸이 주는 놀라운 효과",
  visualCards: [
    {
      number: "01",
      title: "면역력 강화",
      subtitle: "면역 기능 활성화",
      image: `${BASE}clinic/dd_care/dd_1.png`,
    },
    {
      number: "02",
      title: "체온 상승",
      subtitle: "혈액순환 개선",
      image: `${BASE}clinic/dd_care/dd_2.png`,
    },
    {
      number: "03",
      title: "통증 완화",
      subtitle: "근육 이완 및 회복",
      image: `${BASE}clinic/dd_care/dd_3.png`,
    },
  ],

  consultQuestion: "지금 내 몸 상태에 맞는 약뜸이 궁금하신가요?",

  closingMessage: [
    "항암 치료를 끝까지 이어가기 위해",
    "지금 체력을 만들어야 합니다.",
  ],
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,   // TODO: 왕뜸 시술실 사진으로 교체
};
