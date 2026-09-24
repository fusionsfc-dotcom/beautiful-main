/** 치료사례·치료후기 게시판 카테고리 (Supabase cases.category) */

export const REVIEW_CATEGORY_ID = "review" as const;

export type ClinicCaseCategoryId = "cancer";

export type CasePostCategoryId = ClinicCaseCategoryId | typeof REVIEW_CATEGORY_ID;

export const CLINIC_CASE_CATEGORIES: { id: ClinicCaseCategoryId; label: string }[] = [
  { id: "cancer", label: "암치료후기" },
];

export const CASES_TAB_CATEGORIES: { id: "all" | typeof REVIEW_CATEGORY_ID | ClinicCaseCategoryId; label: string }[] = [
  { id: "all", label: "전체" },
  ...CLINIC_CASE_CATEGORIES,
  { id: REVIEW_CATEGORY_ID, label: "기타질환후기" },
];

export function getCaseCategoryLabel(categoryId: string): string {
  if (categoryId === REVIEW_CATEGORY_ID) return "기타질환후기";
  return CLINIC_CASE_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function isReviewPost(category: string): boolean {
  return category === REVIEW_CATEGORY_ID;
}
