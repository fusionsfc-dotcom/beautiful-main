// ⚠️ 약침치료 — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

export const yakchimData: TreatmentDetail = {
  slug: "yakchim",
  category: "korean",

  topLabel: "면역력을 깨우고, 암 치료를 돕는",
  title: "약침치료",
  subtitle: [
    "엄선된 한약재와 특허 기술로 만든 약침을",
    "경혈과 통증 부위에 정확하게 주입하여",
    "항암 효과를 높이고, 회복을 앞당깁니다.",
  ],
  subtitleHighlight: "항암 효과",
  heroImage: `${BASE}te_1.jpeg`,     // TODO: 실제 약침 시술 사진으로 교체
  heroVideoUrl: "",
  heroVideoLabel: "약침치료 소개 영상 보기",

  // 4개 효과 — default 모드 (제목+설명 모두 표시)
  effects: [
    {
      icon: "shield-plus",
      title: "항암 효과 극대화",
      description: ["봉독의 항암·항염 효과로", "암세포 증식 억제"],
    },
    {
      icon: "users",
      title: "면역력 개선",
      description: ["면역 세포 활성화로", "면역력 강화"],
    },
    {
      icon: "refresh-cw",
      title: "기력 향상 & 회복 촉진",
      description: ["기혈 순환 개선과 정상 세포", "회복을 도와 빠른 회복"],
    },
    {
      icon: "target",
      title: "통증 및 염증 완화",
      description: ["염증 반응을 줄이고", "통증을 효과적으로 완화"],
    },
  ],
  effectsSimpleMode: false, // 제목+설명 모두 표시

  // 3장 약침 카드 — detailed 레이아웃 + 캐러셀
  visualCardsTitle: "뷰티풀 한방병원의 약침 종류와 효과",
  visualCards: [
    {
      badge: "봉독 약침",
      title: "벌에서 추출한 봉독 성분을 정제하여",
      description: ["만든 약침입니다."],
      checkList: ["항암 효과", "면역 세포 활성화", "통증 완화"],
      image: `${BASE}yoga_s.jpeg`,   // TODO: 벌집 사진으로 교체
    },
    {
      badge: "태반 약침",
      title: "태반에서 유효 성분을 추출하여",
      description: ["정제한 약침입니다."],
      checkList: ["면역력 개선 · 기력 향상", "면역력 강화", "기력 회복", "세포 재생 촉진"],
      image: `${BASE}hero_img.jpeg`, // TODO: 세포 비주얼(붉은빛) 사진으로 교체
    },
    {
      badge: "줄기세포 유도 효과",
      title: "줄기세포 활성 인자를 함유하여",
      description: ["세포 재생을 돕는 약침입니다."],
      checkList: [
        "세포 재생 · 면역 조절",
        "줄기세포 활성 유도",
        "손상 세포 재생",
        "면역 균형 조절",
        "치료 후 회복 촉진",
      ],
      image: `${BASE}room_pa.jpeg`,  // TODO: 세포 비주얼(청록빛) 사진으로 교체
    },
  ],
  visualCardsLayout: "detailed",
  visualCardsCarousel: true,

  // 상담 CTA — 2개 버튼
  consultQuestion:
    "자연에서 찾은 귀한 약재의 힘으로,\n항암 치료의 효과를 높이고 삶의 질을 향상시켜 드립니다.",
  consultCTAs: [
    {
      type: "reservation",
      label: "약침치료 상담 예약하기",
      icon: "calendar",
      href: "/reservation",
    },
    {
      type: "video-review",
      label: "환자 후기 영상 보기",
      subtitle: "실제 치료 경험을 확인해보세요!",
      icon: "play",
      videoUrl: "", // TODO: 실제 YouTube URL 입력
    },
  ],

  // 마무리 메시지 없음 → MotivationMessage 섹션 자동 생략

  bottomBarVariant: "full",
};
