export type TreatmentTheme = "korean" | "western" | "dental";

export type Treatment = {
  name: string;
  icon: string;
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/integrated/*.jpg) */
  image: string;
  description: string[];
  /** 상세 페이지 slug — /program/integrated/:slug */
  slug: string;
};

export type TreatmentGroup = {
  theme: TreatmentTheme;
  badgeLabel: string;
  title: string;
  subtitle: string;
  treatments: Treatment[];
};

export const themeColors: Record<
  TreatmentTheme,
  { main: string; bg: string; dot: string; text: string }
> = {
  korean:  { main: "#2D7A3E", bg: "#E8F3EB", dot: "#2D7A3E", text: "한방" },
  western: { main: "#2D5BA0", bg: "#E5EDF7", dot: "#2D5BA0", text: "양방" },
  dental:  { main: "#5D3FA0", bg: "#EBE5F5", dot: "#5D3FA0", text: "치과" },
};

// 실제 사진이 없으므로 기존 Supabase 이미지로 임시 대체
// TODO: 각 이미지 실제 사진으로 교체 필요
const IMG = {
  k1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg",
  k2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/hero_img.jpeg",
  k3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg",
  k4: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg",  // TODO: 뇌신경뜸 실제 사진으로 교체
  k5: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg",  // TODO: 효소찜질 실제 사진으로 교체
  w1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg",
  w2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/1533a480-19c6-4888-a70a-5f635655c966.jpg",
  w3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/headdocimg.png",
  d1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room_pa.jpeg",
  d2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/loca.jpeg",
  d3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png",
};

export const koreanTreatments: TreatmentGroup = {
  theme: "korean",
  badgeLabel: "한방 치료",
  title: "몸의 회복을 만드는 한방 치료",
  subtitle: "체력·면역·순환을 회복시켜 치료를 버틸 수 있는 몸을 만듭니다.",
  treatments: [
    { name: "침 치료",   icon: "syringe", image: IMG.k1, slug: "chim",    description: ["기혈 순환을 회복시켜", "통증 완화와 면역 회복을 돕습니다."] },
    { name: "면역 약침", icon: "syringe", image: IMG.k2, slug: "yakchim", description: ["면역 기능을 끌어올려", "회복력을 높이고 염증을 조절합니다."] },
    { name: "왕뜸",      icon: "flame",   image: IMG.k3, slug: "wangttum",          description: ["강한 온열 자극으로", "체력을 끌어올리고 회복 속도를 높입니다."] },
    { name: "뇌신경뜸",   icon: "brain",        image: IMG.k4, slug: "noeshinkyung-ttum", description: ["뇌와 신경을 자극하여", "전신의 기혈순환을 촉진합니다."] },
    { name: "효소찜질센터", icon: "thermometer", image: IMG.k5, slug: "yoso-jjimjil",      description: ["해독과 체온 상승으로", "면역력을 끌어올립니다."] },
  ],
};

export const westernTreatments: TreatmentGroup = {
  theme: "western",
  badgeLabel: "양방 치료",
  title: "치료 효과를 높이는 양방 치료",
  subtitle: "면역을 강화하고 치료 반응을 높이는 중요한 치료입니다.",
  treatments: [
    { name: "자닥신",       icon: "shield",   image: IMG.w1, slug: "zadaxin",   description: ["면역세포를 활성화해", "항암 치료 반응을 높입니다."] },
    { name: "알노바",       icon: "shield",   image: IMG.w2, slug: "alnova",    description: ["면역 조절을 통해", "암세포 억제 환경을 만듭니다."] },
    { name: "고농도 비타민 C", icon: "droplet", image: IMG.w3, slug: "vitamin-c", description: ["산화 스트레스를 조절해", "암세포 억제와 회복을 돕습니다."] },
  ],
};

export const dentalCares: TreatmentGroup = {
  theme: "dental",
  badgeLabel: "치과 관리",
  title: "항암 치료 중 꼭 필요한 구강 관리",
  subtitle: "구강 상태 관리는 치료 지속과 회복에 매우 중요합니다.",
  treatments: [
    { name: "구강 관리",    icon: "tooth",       image: IMG.d1, slug: "oral-care",              description: ["구강 염증과 통증을 줄여", "치료를 안정적으로", "이어갈 수 있도록 돕습니다."] },
    { name: "감염 예방 관리", icon: "tooth-shield", image: IMG.d2, slug: "infection-prevention", description: ["면역이 떨어진 상태에서", "구강 감염을 예방하는", "것이 중요합니다."] },
    { name: "맞춤 구강 케어", icon: "user-check",   image: IMG.d3, slug: "custom-oral",          description: ["환자 상태에 맞춰", "치료 전·중·후 구강 관리를", "진행합니다."] },
  ],
};
