export type CareItem = {
  icon: string;
  title: string;
  description: string[];
};

export type JourneyStage = {
  number: string;
  title: string[];
  subtitle: string[];
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/story/*.jpg) */
  image: string;
  imageAlt: string;
  cares: CareItem[];
  footerIcon: string;
  footerMessage: string[];
};

export type CoreValue = {
  icon: string;
  title: string;
  subtitle: string;
};

// TODO: 실제 사진으로 교체 필요
const IMG_BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const STORY_HERO_IMAGE = `${IMG_BASE}room_pa.jpeg`;

export const coreValues: CoreValue[] = [
  { icon: "shield-plus",    title: "전문 의료진",    subtitle: "27년 암 치료 경험" },
  { icon: "bowl-leaf",      title: "맞춤 항암 식단", subtitle: "면역·영양 관리" },
  { icon: "heart-handshake", title: "통합 케어",     subtitle: "마음까지 돌보는 케어" },
];

export const journeyStages: JourneyStage[] = [
  {
    number: "01",
    title: ["암 진단은", "끝이 아닌 시작입니다"],
    subtitle: [
      "지금부터 바꿀 수 있는 것이 많습니다.",
      "생활을 바꾸면 결과도 달라집니다.",
    ],
    image: `${IMG_BASE}yoga_s.jpeg`,
    imageAlt: "자연 속에서 희망을 느끼는 환자",
    cares: [
      {
        icon: "utensils",
        title: "생활습관 교정",
        description: ["작은 습관의 변화가", "회복의 시작이 됩니다."],
      },
      {
        icon: "bowl-leaf",
        title: "식단 개선",
        description: ["면역력을 높이는 식단이", "몸을 회복시킵니다."],
      },
      {
        icon: "footprints",
        title: "운동 습관",
        description: ["몸의 기능을 회복하고", "건강한 삶을 만듭니다."],
      },
    ],
    footerIcon: "heart",
    footerMessage: [
      "몸·마음·생활이 바뀌면 치료의 결과가 달라집니다.",
      "우리는 삶의 방향을 함께 설계하고, 변화를 돕습니다.",
    ],
  },
  {
    number: "02",
    title: ["항암 치료가", "힘들까 봐 걱정됩니다"],
    subtitle: ["부작용은 줄이고,", "치료는 이어갈 수 있도록 돕겠습니다."],
    image: `${IMG_BASE}te_1.jpeg`,
    imageAlt: "치료 중에도 평온한 일상",
    cares: [
      {
        icon: "droplets",
        title: "부작용 관리",
        description: ["불편함을 줄이고", "치료를 지속할 수", "있도록 돕습니다."],
      },
      {
        icon: "shield-plus",
        title: "면역력 강화",
        description: ["면역력을 높여", "치료 효과를", "높입니다."],
      },
      {
        icon: "dumbbell",
        title: "체력 유지",
        description: ["체력을 지키고", "회복 속도를", "끌어올립니다."],
      },
      {
        icon: "heart",
        title: "마음 안정",
        description: ["불안과 우울을 줄이고", "마음을 안정시킵니다."],
      },
    ],
    footerIcon: "heart",
    footerMessage: [
      "힘든 항암, 덜 힘들게 끝까지 이어갈 수 있도록 함께합니다.",
      "포기하지 않고 치료를 지속할 수 있도록 최선을 다하겠습니다.",
    ],
  },
  {
    number: "03",
    title: ["재발은 두려움이 아닌", "관리의 문제입니다"],
    subtitle: [
      "불안에 머무르지 않도록,",
      "체계적인 관리 시스템으로 바꾸겠습니다.",
    ],
    image: `${IMG_BASE}hero_img.jpeg`,
    imageAlt: "자연 속에서 함께하는 노부부의 평온",
    cares: [
      {
        icon: "shield-plus",
        title: "면역 관리",
        description: ["면역 균형을 유지해", "재발 위험을 낮춥니다."],
      },
      {
        icon: "clipboard-check",
        title: "정기 모니터링",
        description: ["작은 변화를 놓치지 않고", "빠르게 대응합니다."],
      },
      {
        icon: "leaf",
        title: "생활 습관 개선",
        description: ["식단, 운동, 수면까지", "지속 가능한 습관을", "만들어갑니다."],
      },
    ],
    footerIcon: "shield-check",
    footerMessage: [
      "재발은 피할 수 없는 것이 아니라 관리할 수 있는 영역입니다.",
      "지속적인 관리로 안심하고 일상을 누리실 수 있도록 돕겠습니다.",
    ],
  },
];
