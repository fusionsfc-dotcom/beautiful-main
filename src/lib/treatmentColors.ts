import type { TreatmentCategory } from "../types/treatment";

export const categoryColors: Record<
  TreatmentCategory,
  { main: string; bg: string; label: string }
> = {
  korean:  { main: "#9A856D", bg: "#F5EFE6", label: "한방" },
  western: { main: "#9A856D", bg: "#EFE7DC", label: "양방" },
  dental:  { main: "#6A5542", bg: "#D8CDBE", label: "치과" },
};

export const getCategoryColor = (category: TreatmentCategory) =>
  categoryColors[category];
