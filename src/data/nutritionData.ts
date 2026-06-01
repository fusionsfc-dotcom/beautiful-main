export type CoreValue = {
  icon: string;
  title: string;
  description: string[];
};

export type CheckItem = {
  text: string[];
};

export type SpecialItem = {
  icon: string;
  title: string;
  description: string[];
};

export type HandwrittenReview = {
  content: string[];
  category: string;
  rotate?: number;
};

export type CompostStep = {
  number: number;
  name: string;
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/nutrition/compost-*.jpg) */
  image: string;
};

// TODO: 실제 사진으로 교체 필요
const IMG_BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const NUTRITION_HERO_IMAGE = `${IMG_BASE}te_1.jpeg`;
export const GARDEN_THUMB_IMAGE = `${IMG_BASE}food/food_1%20(1).jpeg`;
export const NUTRITION_VIDEO_URL = "https://www.youtube.com/embed/S02XMoB8jGk";

export const GARDEN_IMAGES = [
  `${IMG_BASE}food/food_1.jpeg`,
  `${IMG_BASE}food/food_2.jpeg`,
  `${IMG_BASE}food/food_3.jpeg`,
  `${IMG_BASE}food/food_4.jpeg`,
];

export const coreValues: CoreValue[] = [
  {
    icon: "shield-plus",
    title: "면역력 강화",
    description: ["면역 세포 활성화에 도움을 주어", "감염 예방과 회복을 돕습니다."],
  },
  {
    icon: "intestine",
    title: "소화 기능 개선",
    description: ["위장 부담을 줄이고 소화를 도와", "영양 흡수율을 높입니다."],
  },
  {
    icon: "dumbbell",
    title: "체력 및 근력 유지",
    description: ["필요한 영양을 충분히 공급하여", "체력과 근육 손실을 최소화합니다."],
  },
  {
    icon: "leaf",
    title: "항산화·항염 효과",
    description: ["항산화 식품으로 염증을 완화하고", "세포 손상을 줄여줍니다."],
  },
];

export const gardenChecks: CheckItem[] = [
  { text: ["직접 재배하여", "농약 없이 안심"] },
  { text: ["제철에 수확하여", "신선함과 영양이 풍부"] },
  { text: ["유기농 퇴비 사용으로", "자연 영양을 그대로"] },
  { text: ["매일 아침 신선한 채소를", "식단에 바로 사용"] },
];

export const specialItems: SpecialItem[] = [
  {
    icon: "clipboard-check",
    title: "한의사·영양사 협진",
    description: ["치료와 영양을 함께", "고려한 맞춤 설계"],
  },
  {
    icon: "leaf",
    title: "신선한 제철 식재료",
    description: ["유기농·무농약 위주의", "안전한 식재료 사용"],
  },
  {
    icon: "user",
    title: "자연·저염·저지방 조리",
    description: ["자극을 줄이고 영양은", "높이는 건강 조리법"],
  },
  {
    icon: "heart-handshake",
    title: "정성 가득한 한 끼",
    description: ["치유와 위로가 되는", "마음까지 담은 식단"],
  },
];

export const handwrittenReviews: HandwrittenReview[] = [
  {
    content: ["항암 중 입맛이", "없었는데 식단을 바꾸고", "조금씩 힘이 생겼어요.", "정말 감사합니다."],
    category: "체력 회복",
    rotate: -1.5,
  },
  {
    content: ["소화가 잘 되고", "부담 없이 잘 먹을 수", "있어서 치료에", "집중할 수 있었어요."],
    category: "소화 개선",
    rotate: 1,
  },
  {
    content: ["식단 하나로 몸이", "편안해지고 마음도", "따뜻해져서 힘들 때", "큰 도움이 되었습니다."],
    category: "입맛 회복",
    rotate: -0.8,
  },
  {
    content: ["신선한 재료 덕분에", "안심하고 먹을 수 있어", "가족도 함께 만족하고", "있습니다."],
    category: "가족 만족",
    rotate: 1.5,
  },
];

export const compostSteps: CompostStep[] = [
  { number: 1, name: "퇴비 재료 투입", image: `${IMG_BASE}food/food11_1.jpeg` },
  { number: 2, name: "포크레인 교반 작업", image: `${IMG_BASE}food/food11_2.jpeg` },
  { number: 3, name: "발효 및 숙성", image: `${IMG_BASE}food/food11_3.jpeg` },
  { number: 4, name: "건강한 토양 완성", image: `${IMG_BASE}food/food11_4.jpeg` },
];
