export type ProgramFeatureIcon =
  | "leaf"
  | "muscle"
  | "person"
  | "check"
  | "smile"
  | "happy"
  | "dumbbell"
  | "clipboard"
  | "shield"
  | "runner"
  | "balance"
  | "heart-hand"
  | "smile-face";

export type ProgramFeature = {
  icon: ProgramFeatureIcon;
  title: string;
  subtitle?: string;
};

export type RehabProgram = {
  number: string;
  name: string;
  subname?: string;
  /** TODO: 실제 사진으로 교체 필요 (/public/images/redesign/rehab-card-0N.jpg) */
  image: string;
  videoUrl?: string;
  features: ProgramFeature[];
};

// 실제 사진이 없으므로 기존 Supabase 이미지로 임시 대체
// TODO: 각 이미지 실제 사진으로 교체 필요
const PLACEHOLDER =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
const ROOM_IMG =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room_pa.jpeg";
const CEO_IMG =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png";
const LOCA_IMG =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/loca.jpeg";

export const rehabPrograms: RehabProgram[] = [
  {
    number: "01",
    name: "트램폴린 재활 운동",
    subname: "(리바운딩)",
    image: PLACEHOLDER,
    features: [
      {
        icon: "leaf",
        title: "림프 순환 촉진",
        subtitle: "부종 완화 & 면역력 향상",
      },
      {
        icon: "muscle",
        title: "근육량 증가",
        subtitle: "체력 강화 & 면역력 도움",
      },
    ],
  },
  {
    number: "02",
    name: "항암 필라테스",
    image: ROOM_IMG,
    features: [
      { icon: "person", title: "자세 교정" },
      { icon: "heart-hand", title: "코어 강화" },
      { icon: "smile", title: "통증 완화" },
      { icon: "smile-face", title: "피로 감소" },
    ],
  },
  {
    number: "03",
    name: "1:1 맞춤 재활 운동",
    subname: "(필라테스 & PT)",
    image: CEO_IMG,
    features: [
      { icon: "person", title: "1:1 맞춤 프로그램" },
      { icon: "dumbbell", title: "근력 강화 & 체력 향상" },
      { icon: "clipboard", title: "단계별 운동 계획" },
      { icon: "shield", title: "안전한 운동 관리" },
    ],
  },
  {
    number: "04",
    name: "매직테니스 재활 운동",
    image: LOCA_IMG,
    features: [
      { icon: "runner", title: "전신 활동 증가" },
      { icon: "balance", title: "근력·균형 향상" },
      { icon: "heart-hand", title: "활용력 개선" },
      { icon: "smile-face", title: "스트레스 해소" },
    ],
  },
];
