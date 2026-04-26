const HOSPITAL_URL = "https://www.btful.co.kr";

export const CANCER_CONDITIONS = [
  {
    id: "breast-cancer",
    name: "유방암",
    alternateName: "Breast Cancer",
    description:
      "유방 조직에서 발생하는 악성 종양. 뷰티풀한방병원에서 수술·항암·방사선 치료 후 면역 회복 및 부작용 완화 한방 통합 케어를 제공합니다.",
    url: `${HOSPITAL_URL}/clinics/cancer-specific-care#breast-cancer`,
  },
  {
    id: "gynecologic-cancer",
    name: "부인암 (자궁·난소암)",
    alternateName: "Gynecologic Cancer",
    description:
      "자궁경부암, 자궁내막암, 난소암 등 여성 생식기 악성 종양. 항암·방사선 치료 후 여성 호르몬 균형 및 면역 회복 한방 케어.",
    url: `${HOSPITAL_URL}/clinics/cancer-specific-care#gynecologic-cancer`,
  },
  {
    id: "gastric-cancer",
    name: "위암",
    alternateName: "Gastric Cancer",
    description:
      "위 점막에서 발생하는 악성 종양. 위 절제술 후 소화기능 회복, 영양 관리, 면역 증진을 위한 한방 통합 케어.",
    url: `${HOSPITAL_URL}/clinics/cancer-specific-care#gastric-cancer`,
  },
  {
    id: "lung-cancer",
    name: "폐암",
    alternateName: "Lung Cancer",
    description:
      "폐에서 발생하는 악성 종양. 항암·방사선 치료 중 폐 기능 보호, 호흡기 부작용 완화, 면역력 유지를 위한 한방 케어.",
    url: `${HOSPITAL_URL}/clinics/cancer-specific-care#lung-cancer`,
  },
  {
    id: "liver-cancer",
    name: "간암",
    alternateName: "Liver Cancer (Hepatocellular Carcinoma)",
    description:
      "간에서 발생하는 악성 종양. 간 기능 보호, 황달·복수 등 합병증 관리, 면역 증진을 위한 한방 통합 케어.",
    url: `${HOSPITAL_URL}/clinics/cancer-specific-care#liver-cancer`,
  },
];

export function makeCancerConditionsJsonLd() {
  return CANCER_CONDITIONS.map((c) => ({
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: c.name,
    alternateName: c.alternateName,
    description: c.description,
    url: c.url,
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: "한방 통합 면역 회복 치료",
      description:
        "한약 처방, 침구 치료, 고주파 온열 치료, 영양 관리를 통한 암 치료 후 면역 회복",
      provider: { "@id": "https://www.btful.co.kr/#hospital" },
    },
  }));
}
