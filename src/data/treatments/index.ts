import type { TreatmentDetail } from "../../types/treatment";
import { wangttumData } from "./wangttum";
import { chimData } from "./chim"; // 조선침법 상세 페이지
import { yakchimData } from "./yakchim";
import { zadaxinData } from "./zadaxin";
import { alnovaData } from "./alnova";
import { vitaminCData } from "./vitamin-c";
import { oralCareData } from "./oral-care";
import { infectionPreventionData } from "./infection-prevention";
import { customOralData } from "./custom-oral";
import { noeshinkyungTtumData } from "./noeshinkyung-ttum";
import { yosoJjimjilData } from "./yoso-jjimjil";

export const treatmentDataMap: Record<string, TreatmentDetail> = {
  "wangttum":              wangttumData,
  "noeshinkyung-ttum":     noeshinkyungTtumData,
  "chim":                  chimData,
  "yakchim":               yakchimData,
  "zadaxin":               zadaxinData,
  "alnova":                alnovaData,
  "vitamin-c":             vitaminCData,
  "oral-care":             oralCareData,
  "infection-prevention":  infectionPreventionData,
  "custom-oral":           customOralData,
  "yoso-jjimjil":         yosoJjimjilData,
};

export const getTreatmentBySlug = (slug: string): TreatmentDetail | null =>
  treatmentDataMap[slug] ?? null;
