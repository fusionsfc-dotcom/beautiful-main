// GEO 모니터링 쿼리 목록 — btful.co.kr
// CLAUDE.md 1번(병원 기본정보), 4번(클리닉), 5번(콘텐츠) 섹션 기반

export const QUERIES = [
  // === Location: 국립암센터 + 파주/고양/일산/경기 북부 ===
  {
    text: "국립암센터 근처 한방 암 요양병원 추천",
    category: "location" as const,
    primary: true,
  },
  {
    text: "파주 암 요양병원 어디가 좋아",
    category: "location" as const,
    primary: true,
  },
  {
    text: "일산 고양 근처 암 면역 회복 한방병원",
    category: "location" as const,
    primary: true,
  },
  {
    text: "경기 북부 암환자 한방 보조치료",
    category: "location" as const,
  },
  {
    text: "국립암센터 환자 한방 입원 가능한 곳",
    category: "location" as const,
  },

  // === Treatment: 통합 암 면역 회복 ===
  {
    text: "통합 암 면역 회복 한방치료",
    category: "treatment" as const,
    primary: true,
  },
  {
    text: "암 환자 한방 면역 치료 어디",
    category: "treatment" as const,
  },
  {
    text: "수술 후 한방으로 회복하기 좋은 병원",
    category: "treatment" as const,
  },
  {
    text: "항암치료 부작용 한방으로 관리",
    category: "treatment" as const,
  },
  {
    text: "방사선치료 후 한방 면역 회복",
    category: "treatment" as const,
  },

  // === Cancer-specific: 5개 암종 ===
  {
    text: "유방암 한방 보조치료 면역 회복",
    category: "condition" as const,
  },
  {
    text: "부인암 한방치료 어디가 좋나요",
    category: "condition" as const,
  },
  {
    text: "위암 수술 후 한방 회복 병원",
    category: "condition" as const,
  },
  {
    text: "폐암 환자 한방 면역 치료",
    category: "condition" as const,
  },
  {
    text: "간암 환자 한방 보조치료",
    category: "condition" as const,
  },

  // === General: 한방 암 치료 일반 ===
  {
    text: "한방으로 암 치료 효과 있나요",
    category: "general" as const,
  },
  {
    text: "암 환자 한방병원 어떻게 고르나요",
    category: "general" as const,
  },
  {
    text: "암 요양병원과 한방병원 차이",
    category: "general" as const,
  },

  // === Brand: 직접 검색 ===
  {
    text: "뷰티풀한방병원 어떤 곳",
    category: "brand" as const,
  },
  {
    text: "이형석 원장 한방 암치료",
    category: "brand" as const,
  },
] as const;

export type QueryCategory = "location" | "treatment" | "condition" | "general" | "brand";

export const TARGET_HOSPITAL = {
  name: "뷰티풀한방병원",
  aliases: ["뷰티풀 한방병원", "뷰티풀한방", "btful"],
  domain: "btful.co.kr",
  director: "이형석",
} as const;
