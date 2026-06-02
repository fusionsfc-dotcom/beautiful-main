/** 치료사례·치료후기 게시판 카테고리 (Supabase cases.category) */

export const REVIEW_CATEGORY_ID = "review" as const;

export type ClinicCaseCategoryId =
  | "cancer"
  | "post_surgery"
  | "chemotherapy"
  | "radiation";

export type CasePostCategoryId = ClinicCaseCategoryId | typeof REVIEW_CATEGORY_ID;

export const CLINIC_CASE_CATEGORIES: { id: ClinicCaseCategoryId; label: string }[] = [
  { id: "cancer", label: "뷰티풀 암케어" },
  { id: "post_surgery", label: "수술 후 회복케어" },
  { id: "chemotherapy", label: "항암치료 환자 케어" },
  { id: "radiation", label: "방사선치료 환자 케어" },
];

export const CASES_TAB_CATEGORIES: { id: "all" | typeof REVIEW_CATEGORY_ID | ClinicCaseCategoryId; label: string }[] = [
  { id: "all", label: "전체" },
  { id: REVIEW_CATEGORY_ID, label: "치료후기" },
  ...CLINIC_CASE_CATEGORIES,
];

export function getCaseCategoryLabel(categoryId: string): string {
  if (categoryId === REVIEW_CATEGORY_ID) return "치료후기";
  return CLINIC_CASE_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function isReviewPost(category: string): boolean {
  return category === REVIEW_CATEGORY_ID;
}
