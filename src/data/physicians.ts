export interface EducationItem {
  text: string;
}

export interface MembershipItem {
  text: string;
}

export interface CareerItem {
  text: string;
}

export interface PaperItem {
  year: number;
  text: string;
}

export interface PhysicianData {
  id: string;
  name: string;
  honorificPrefix?: string;
  jobTitle: string;
  schemaJobTitle: string;
  qualifications: string[];
  imageUrl: string;
  imageAlt: string;
  education: EducationItem[];
  memberships: MembershipItem[];
  career: CareerItem[];
  papers?: PaperItem[];
}

export const PHYSICIANS: PhysicianData[] = [
  {
    id: "lee-hyungseok",
    name: "이형석",
    honorificPrefix: "병원장",
    jobTitle: "한의사",
    schemaJobTitle: "한의사",
    qualifications: ["한의학 박사 (면역학)", "한의학 석사"],
    imageUrl:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc_ceo.jpeg",
    imageAlt: "이형석 병원장",
    education: [
      { text: "경희대학교 한의과대학 졸업" },
      { text: "경희대학교 한의학 박사(면역학)" },
      { text: "경희대학교 한의원 석사" },
      { text: "경희대학교 대학원 동서의학과 외래교수" },
      { text: "노아자연학교 이사장" },
      { text: "예장생활협동조합 교육이사" },
    ],
    memberships: [],
    career: [
      { text: "전) 효소앤한의원 원장" },
      { text: "전) 경희대성의원 원장" },
    ],
    papers: [
      {
        year: 2008,
        text: "The bark of Betula platyphylla var. japonica inhibits the development of atopic dermatitis-like skin lesions in NC/Nga mice J Ethnopharmacol",
      },
      {
        year: 2008,
        text: "Inhibitory Effects of Saururus chinensis (LOUR.) BAILL on the Development of Atopic Dermatitis-Like Skin Lesions in NC/Nga Mice(Pharmacology) Biol Pharm Bull",
      },
      {
        year: 2006,
        text: "Inhibitory effects of Rumex japonicus Houtt. on the development of atopic dermatitis-like skin lesions in NC/Nga mice. Br J Dermatol",
      },
    ],
  },
  {
    id: "ko-eunsang",
    name: "고은상",
    jobTitle: "한의사",
    schemaJobTitle: "한의사",
    qualifications: ["한의학 박사 (경희대학교)", "미국 응용근신경학 전문의"],
    imageUrl:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc2.png",
    imageAlt: "고은상 한의사",
    education: [
      { text: "경희대학교 한의학과 졸업" },
      { text: "경희대학교 대학원 동서의학과 한의학 석사" },
      { text: "경희대학교 대학원 동서의학과 박사" },
      { text: "동수원 한방병원 내과 전문수련의" },
    ],
    memberships: [
      { text: "추나학회 정직원" },
      { text: "미국 응용근신경학 전문의" },
      { text: "미국 응용근신경학회 임상강사" },
      { text: "한국 응용근신경학회 총무이사" },
      { text: "한의기능영양학회 기술이사" },
    ],
    career: [{ text: "전) 가산의료재단 광동병원 센터장" }],
  },
  {
    id: "jang-youngseop",
    name: "장영섭",
    jobTitle: "의사 (일반외과 전문의)",
    schemaJobTitle: "일반외과 전문의",
    qualifications: ["일반외과 전문의", "일본 소화의과대학 의학박사"],
    imageUrl:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc3.png",
    imageAlt: "장영섭 의사",
    education: [
      { text: "전남대학교 의과대학 졸업" },
      { text: "전주예수병원 일반외과 수료" },
      { text: "일반외과 전문의 자격증 취득" },
      { text: "육군 군의관 소령 예편" },
      { text: "서울시 의사회 의무이사" },
      { text: "일본 소화의과대학 의학박사 취득" },
      { text: "대한임상노인학회 평생회원" },
      { text: "IMS 회원 및 자격증 취득" },
      { text: "치매특별등급 연수교육 수료" },
    ],
    memberships: [],
    career: [
      { text: "전) 경기도 고양시 일산동구 일산로 123 뷰티풀한방병원 개원" },
      { text: "전) 경남 밀양시 영남종합병원 일반외과 및 응급실 실장" },
      { text: "전) 인천시 영종도 화림요양병원 양방원장" },
      { text: "전) 김포시 김포청심실버요양병원 원장" },
      { text: "전) 인천 계양 경의병원 원장" },
    ],
  },
  {
    id: "lee-harim",
    name: "이하림",
    jobTitle: "치과의사 (보건복지부인증 통합치의학과 전문의)",
    schemaJobTitle: "통합치의학과 전문의",
    qualifications: ["보건복지부인증 통합치의학과 전문의"],
    imageUrl:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc4.png",
    imageAlt: "이하림 치과의사",
    education: [
      { text: "이화여자대학교 졸업" },
      { text: "원광대학교 치과대학 졸업" },
      { text: "고려대학교 임상치의학대학원 교정학과 석사" },
      { text: "대한치과교정학회 회원" },
      { text: "연세대학교 Orthodontic Mini Residency Course 수료" },
      { text: "Dr.Kosujin Clinical Orthodontic Course 수료" },
      { text: "Mini-Tube Appliance Orthodontic Course 수료" },
    ],
    memberships: [],
    career: [
      { text: "전) 분당형치과 교정과장" },
      { text: "전) 강북디자인치과 교정과장" },
      { text: "전) 선한치과 교정대표원장" },
      { text: "부평치과 디지털해피스치과 교정과장" },
    ],
  },
];

export function toPhysicianJsonLd(p: PhysicianData) {
  return {
    "@type": "Physician",
    name: p.name,
    ...(p.honorificPrefix ? { honorificPrefix: p.honorificPrefix } : {}),
    jobTitle: p.schemaJobTitle,
    description: p.qualifications.join(", "),
    alumniOf: p.education
      .filter((e) => /졸업|박사|석사/.test(e.text))
      .map((e) => ({
        "@type": "EducationalOrganization",
        name: e.text,
      })),
    image: p.imageUrl,
    worksFor: { "@id": "https://www.btful.co.kr/#hospital" },
  };
}
