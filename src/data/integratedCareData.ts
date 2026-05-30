export type TreatmentTheme = "korean" | "western" | "dental";

export type Treatment = {
  name: string;
  icon: string;
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/integrated/*.jpg) */
  image: string;
  description: string[];
  /** 상세 페이지 slug — /program/integrated/:slug */
  slug: string;
  /** false면 카드 링크 비활성 (기본 true) */
  linked?: boolean;
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
  korean:  { main: "#9A856D", bg: "#F5EFE6", dot: "#9A856D", text: "한방" },
  western: { main: "#9A856D", bg: "#EFE7DC", dot: "#9A856D", text: "양방" },
  dental:  { main: "#6A5542", bg: "#D8CDBE", dot: "#6A5542", text: "치과" },
};

// 실제 사진이 없으므로 기존 Supabase 이미지로 임시 대체
// TODO: 각 이미지 실제 사진으로 교체 필요
const IMG = {
  k1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/han_c.png",
  k2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/han_c2.png",
  k3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/dd.jpg",
  k4: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/han_DD.png",
  k5: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/hou_re.jpeg",
  w1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/Cymo.png",
  w2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/misl.png",
  w3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/c.png",
  w4: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room_tr/onco.jpg",
  d1: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/cl_1.jpeg",
  d2: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/c_2.jpeg",
  d3: "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/c_3.jpeg",
};

export const koreanTreatments: TreatmentGroup = {
  theme: "korean",
  badgeLabel: "한방 치료",
  title: "몸의 회복을 만드는 한방 치료",
  subtitle: "체력·면역·순환을 회복시켜 치료를 버틸 수 있는 몸을 만듭니다.",
  treatments: [
    { name: "침 치료",   icon: "syringe", image: IMG.k1, slug: "chim",    description: ["기혈 순환을 회복시켜", "통증 완화와 면역 회복을 돕습니다."] },
    { name: "면역 약침", icon: "syringe", image: IMG.k2, slug: "yakchim", description: ["면역 기능을 끌어올려", "회복력을 높이고 염증을 조절합니다."] },
    { name: "약뜸",      icon: "flame",   image: IMG.k3, slug: "wangttum",          description: ["강한 온열 자극으로", "체력을 끌어올리고 회복 속도를 높입니다."] },
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
    { name: "싸이모실 알파1", icon: "shield", image: IMG.w1, slug: "zadaxin", description: ["면역세포를 활성화해", "항암 치료 반응을 높입니다."] },
    { name: "미슬토",       icon: "shield",   image: IMG.w2, slug: "alnova",    description: ["면역 조절을 통해", "암세포 억제 환경을 만듭니다."] },
    { name: "고농도 비타민 C", icon: "droplet", image: IMG.w3, slug: "vitamin-c", description: ["산화 스트레스를 조절해", "암세포 억제와 회복을 돕습니다."] },
    { name: "고주파온열치료", icon: "thermometer", image: IMG.w4, slug: "rf-hyperthermia", description: ["고주파 에너지로 암 조직 주변", "온도를 높여 면역 반응을 활성화합니다."] },
  ],
};

export const dentalCares: TreatmentGroup = {
  theme: "dental",
  badgeLabel: "치과 관리",
  title: "항암 치료 중 꼭 필요한 구강 관리",
  subtitle: "구강 상태 관리는 치료 지속과 회복에 매우 중요합니다.",
  treatments: [
    { name: "구강 관리",    icon: "tooth",       image: IMG.d1, slug: "oral-care",              description: ["구강 염증과 통증을 줄여", "치료를 안정적으로", "이어갈 수 있도록 돕습니다."] },
    { name: "감염 예방 관리", icon: "tooth-shield", image: IMG.d2, slug: "infection-prevention", linked: false, description: ["면역이 떨어진 상태에서", "구강 감염을 예방하는", "것이 중요합니다."] },
    { name: "맞춤 구강 케어", icon: "user-check",   image: IMG.d3, slug: "custom-oral",          linked: false, description: ["환자 상태에 맞춰", "치료 전·중·후 구강 관리를", "진행합니다."] },
  ],
};
