// ⚠️ 뇌신경뜸 — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const noeshinkyungTtumData: TreatmentDetail = {
  slug: "noeshinkyung-ttum",
  category: "korean",

  topLabel: "뇌신경뜸은 뇌와 신경을 깨우고,",
  title: "뇌신경뜸",
  subtitle: [
    "뇌와 신경을 자극하여 전신의 기혈순환을 촉진하고",
    "건강을 되찾아 드립니다.",
  ],
  subtitleHighlight: "기혈순환",
  heroImage: `${BASE}clinic/han_DD.png`,
  heroVideoUrl: "",
  heroVideoLabel: "뇌신경뜸 소개 영상 보기",

  // 4개 효과 — TreatmentEffectsBar가 자동으로 2×2 그리드 처리
  effects: [
    {
      icon: "brain",
      title: "뇌와 신경 자극",
      description: ["머리 주요 혈자리를 자극해", "뇌 기능 활성화"],
    },
    {
      icon: "clock",
      title: "한 부위당 1시간 내외",
      description: ["향이 약 1시간 동안 태워져", "깊은 온열 효과 제공"],
    },
    {
      icon: "activity",
      title: "전신 순환 활성화",
      description: ["머리뿐 아니라 전신에도 작용해", "기혈 순환 촉진"],
    },
    {
      icon: "shield-plus",
      title: "면역력 & 자연치유력 강화",
      description: ["자연치유력을 높여 몸의 균형과", "면역력을 강화"],
    },
  ],
  // effectsConclusion 없음 — 하단 강조 텍스트 자동 생략

  visualCardsTitle: "뇌신경뜸이 주는 놀라운 효과",
  visualCards: [
    {
      number: "01",
      title: "뇌 기능 활성화",
      subtitle: "뇌 혈류 개선 및 신경세포 활성화로\n기억력과 집중력 향상",
      image: `${BASE}clinic/dd_care/dd2_1.jpeg`,
    },
    {
      number: "02",
      title: "스트레스 & 불면 개선",
      subtitle: "긴장 완화 및 자율신경 안정으로\n스트레스 해소와 숙면 도움",
      image: `${BASE}clinic/dd_care/dd2_2.jpeg`,
    },
    {
      number: "03",
      title: "면역력 향상",
      subtitle: "면역 세포 활성화 및\n자연치유력 강화",
      image: `${BASE}clinic/dd_care/dd2_3.jpeg`,
    },
  ],
  visualCardsCarousel: true,  // 캐러셀 모드 활성화

  consultQuestion: "지금 내 몸 상태에 맞는 뇌신경뜸이 궁금하신가요?",

  closingMessage: [
    "깊은 열이 뇌와 신경을 깨우고,",
    "당신의 건강한 삶을 되찾아 드립니다.",
  ],
  closingSubMessage: "뷰티풀 한방병원이 함께 하겠습니다.",
  closingImage: `${BASE}loca.jpeg`,   // TODO: 시술실 사진으로 교체

  bottomBarVariant: "full",  // 협진 안내 + 3분할 + 보조 3링크
};
