// GEO 모니터링 쿼리 목록 — btful.co.kr
// 2026-04-26 v2: "암요양병원" 중심 재설계 (30개)

export const QUERIES = [
  // === [location] 지역 검색 — 7개 ===
  { text: "국립암센터 근처 암요양병원 추천",           category: "location" as const, primary: true  },
  { text: "파주 암요양병원 어디가 좋아",               category: "location" as const, primary: true  },
  { text: "일산 고양 암요양병원",                     category: "location" as const, primary: true  },
  { text: "경기 북부 암요양병원",                     category: "location" as const                 },
  { text: "국립암센터 환자 입원 가능한 요양병원",        category: "location" as const                 },
  { text: "파주 요양병원 추천",                       category: "location" as const                 },
  { text: "국립암센터 가까운 암 요양시설",              category: "location" as const                 },

  // === [treatment] 치료 키워드 — 6개 ===
  { text: "통합 암 면역 회복 요양병원",               category: "treatment" as const, primary: true  },
  { text: "암 환자 면역 치료 어디",                   category: "treatment" as const                 },
  { text: "수술 후 회복 좋은 요양병원",               category: "treatment" as const                 },
  { text: "항암치료 부작용 관리 요양병원",             category: "treatment" as const                 },
  { text: "방사선치료 후 면역 회복",                  category: "treatment" as const                 },
  { text: "암 환자 한약 처방 가능한 요양병원",         category: "treatment" as const                 },

  // === [condition] 암종별 — 7개 ===
  { text: "유방암 환자 요양병원",                     category: "condition" as const                 },
  { text: "자궁암 요양병원 추천",                     category: "condition" as const                 },
  { text: "난소암 환자 입원 요양",                    category: "condition" as const                 },
  { text: "위암 수술 후 요양병원",                    category: "condition" as const                 },
  { text: "폐암 환자 면역 회복 요양",                 category: "condition" as const                 },
  { text: "간암 환자 요양병원",                       category: "condition" as const                 },
  { text: "대장암 수술 후 요양",                      category: "condition" as const                 },

  // === [patient_language] 환자·보호자 구어체 — 5개 ===
  { text: "엄마 암인데 요양병원 어디 좋아요",          category: "patient_language" as const          },
  { text: "암 환자 입원 보호자도 같이 가능한 곳",       category: "patient_language" as const          },
  { text: "항암하면서 한방 같이 받을 수 있는 병원",     category: "patient_language" as const          },
  { text: "암 진단 후 요양병원 가야 하나",             category: "patient_language" as const          },
  { text: "유방암 항암 후 어디서 회복",               category: "patient_language" as const          },

  // === [comparison] 비교·개념 검색 — 3개 ===
  { text: "암요양병원과 한방병원 차이",               category: "comparison" as const                },
  { text: "통합치료 가능한 요양병원",                 category: "comparison" as const                },
  { text: "양방 한방 같이 보는 암 요양병원",           category: "comparison" as const                },

  // === [brand] 브랜드 직접 검색 — 2개 ===
  { text: "뷰티풀한방병원",                          category: "brand" as const, primary: true      },
  { text: "뷰티풀한방병원 이형석",                   category: "brand" as const                     },
] as const;

export type QueryCategory =
  | "location"
  | "treatment"
  | "condition"
  | "patient_language"
  | "comparison"
  | "brand";

export const TARGET_HOSPITAL = {
  name: "뷰티풀한방병원",
  aliases: ["뷰티풀 한방병원", "뷰티풀한방", "btful"],
  domain: "btful.co.kr",
  director: "이형석",
} as const;
