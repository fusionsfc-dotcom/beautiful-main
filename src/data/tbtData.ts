export type TbtBenefit = {
  icon: "ear" | "shoulder" | "moon-star" | "stomach";
  label: string;
};

export type TbtTreatment = {
  name: string;
  subname?: string;
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/tbt/*.jpg) */
  image: string;
  description: string[];
};

export type ClinicalEffect = {
  text: string[];
};

export const tbtBenefits: TbtBenefit[] = [
  { icon: "ear",       label: "이명 / 어지럼 개선" },
  { icon: "shoulder",  label: "전신 통증 완화" },
  { icon: "moon-star", label: "불면증 개선" },
  { icon: "stomach",   label: "소화·변비 개선" },
];

export const anatomyConnections = [
  "두개골 연결",
  "신경계 연결",
  "경추 연결",
  "근육 연결",
];

// TODO: 실제 사진으로 교체 필요
const IMG_BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const tbtTreatments: TbtTreatment[] = [
  {
    name: "TBA",
    subname: "(기성품 교정장치)",
    image: `${IMG_BASE}clinic/tbt_1.png`,
    description: [
      "기성품 교정장치를 사용하여 턱관절의 부담을 줄이고",
      "기본 균형을 빠르게 회복합니다.",
    ],
  },
  {
    name: "CBA",
    subname: "(개인 맞춤형 교정장치)",
    image: `${IMG_BASE}clinic/tbt_2.png`,
    description: [
      "개인별 구강 구조와 턱관절 상태에 맞춘 맞춤형 교정장치로",
      "정밀하게 턱관절 위치를 교정합니다.",
    ],
  },
  {
    name: "추나요법",
    subname: "(경추추나)",
    image: `${IMG_BASE}clinic/tbt_3.png`,
    description: [
      "경추(목) 추나요법을 통해 턱관절의 긴장과 비정상적인 구조를",
      "교정하고 전신 균형을 함께 회복합니다.",
    ],
  },
];

export const clinicalEffects: ClinicalEffect[] = [
  { text: ["면역 저하로 인한", "전신 증상이 개선되었습니다."] },
  { text: ["항암 부작용으로 생긴", "통증과 불면감이 감소했습니다."] },
  { text: ["수면의 질이 좋아지고", "피로감이 줄어들었습니다."] },
  { text: ["소화 기능과 장운동이", "개선되었습니다."] },
];

/** TBT 히어로 영상 (새 창) */
export const TBT_VIDEO_LINK = "https://youtu.be/psZYB1PjlfU?si=nMrjL_N0P-LgeJkA";

export const TBT_HERO_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/t_1.png";

/** TODO: 실제 손하트 이미지로 교체 */
export const TBT_HEART_HANDS_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png";
