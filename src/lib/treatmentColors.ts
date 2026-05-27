import type { TreatmentCategory } from "../types/treatment";

export const categoryColors: Record<
  TreatmentCategory,
  { main: string; bg: string; label: string }
> = {
  korean:  { main: "#2D7A3E", bg: "#E8F3EB", label: "한방" },
  western: { main: "#2D5BA0", bg: "#E5EDF7", label: "양방" },
  dental:  { main: "#5D3FA0", bg: "#EBE5F5", label: "치과" },
};

export const getCategoryColor = (category: TreatmentCategory) =>
  categoryColors[category];
