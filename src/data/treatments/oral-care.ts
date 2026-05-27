// ⚠️ 항암 치과 구강관리 — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const oralCareData: TreatmentDetail = {
  slug: "oral-care",
  category: "dental",

  topLabel: "항암 치료의 시작과 끝",
  title: "항암 치과\n구강관리",
  subtitle: [
    "항암 치료 전·중·후 구강 상태를",
    "체계적으로 관리하여 구강 합병증을 예방하고",
    "치료의 효과와 삶의 질을 높여드립니다.",
  ],
  subtitleHighlight: "구강 합병증을 예방하고",
  heroImage: `${BASE}ceo_re.png`,    // TODO: 치과 진료 사진으로 교체
  heroVideoUrl: "",
  heroVideoLabel: "구강 관리 소개 영상 보기",

  // 4개 효과 — default 모드 (제목+설명)
  effects: [
    {
      icon: "shield-alert",
      title: "염증 예방",
      description: ["구강 내 세균 관리로", "구강염 예방"],
    },
    {
      icon: "tooth",
      title: "통증 완화",
      description: ["구강 통증과 불편함을", "줄여 삶의 질 향상"],
    },
    {
      icon: "shield-plus",
      title: "감염 관리",
      description: ["감염 위험을 낮추어", "안전한 치료 환경 유지"],
    },
    {
      icon: "heart",
      title: "치료 지속 지원",
      description: ["구강 건강을 지켜", "항암 치료 지속에 도움"],
    },
  ],

  // 비주얼 카드 없음 — stepSections로 대체
  visualCardsTitle: "",
  visualCards: [],

  // 단계별 스토리텔링
  stepSections: [
    {
      number: "01",
      title: "항암 치료 중 구강 문제",
      bullets: [
        "구강 염증 및 구내염",
        "잇몸 출혈 및 통증",
        "구강 건조증",
        "치아 우식 및 감염 위험 증가",
      ],
      image: `${BASE}yoga_s.jpeg`,   // TODO: 구강 통증 환자 사진으로 교체
      imageAlt: "구강 통증을 호소하는 환자",
      imagePosition: "right",
    },
    {
      number: "02",
      title: "체계적인 구강 관리의 중요성",
      bullets: [
        "통증 감소로 식사와 영양 섭취 개선",
        "감염 예방으로 합병증 위험 감소",
        "치료 중단 없이 계획대로 치료 진행",
      ],
      image: `${BASE}headdocimg.png`, // TODO: 치과 의사 진료 사진으로 교체
      imageAlt: "치과 의사의 환자 진료",
      imagePosition: "right",
    },
  ],

  // 특별함 4개 아이콘 (03 섹션으로 표시)
  specialFeaturesTitle: "뷰티풀 한방병원 × 치과 특별함",
  specialFeatures: [
    { icon: "tooth",         title: ["항암 환자 경험이", "풍부한 치과 협진"] },
    { icon: "scan-face",     title: ["개인별 구강 상태", "정밀 평가"] },
    { icon: "shield-plus",   title: ["치료 단계별", "맞춤 관리"] },
    { icon: "heart",         title: ["안전하고 편안한", "치료 환경"] },
  ],

  // 상담 박스 — 좌 메시지 + 우 1버튼
  consultBoxVariant: "message-box",
  consultMessage: [
    "작은 구강 문제가 치료 전체에",
    "영향을 줄 수 있습니다.",
    "지금부터 관리하면, 더 편안하게",
    "치료를 이어갈 수 있습니다.",
  ],
  consultQuestion: "",
  consultCTAs: [
    {
      type: "reservation",
      label: "구강 관리 상담 예약하기",
      icon: "calendar",
      href: "/reservation",
    },
  ],

  // 마무리 없음
  bottomBarVariant: "integrated",
};
