// ⚠️ 뷰티풀 대형 효소찜질센터 — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";
const HJ_CENTER = `${BASE}01_hj_center/`;

export const yosoJjimjilData: TreatmentDetail = {
  slug: "yoso-jjimjil",
  category: "korean",

  topLabel: "항암 치료를 돕는 자연 치유력 강화",
  title: "뷰티풀 대형\n효소찜질센터",
  subtitle: [
    "해독, 체온올리기로 면역력 상승.",
    "항암력 극대화",
  ],
  subtitleHighlight: "항암력 극대화",
  heroImage: `${BASE}clinic/hou.png`,
  heroVideoUrl: "https://youtu.be/-2FE8w8q13I",
  heroVideoLabel: "효소찜질 소개 영상 보기",
  heroVideoNewWindow: true,

  // 효과 바 섹션 전체 생략
  hideEffectsBar: true,
  effects: [],

  // 6장 비주얼 카드 — grid6 레이아웃
  visualCardsTitle: "효소찜질이 항암 치료에 좋은 이유",
  visualCards: [
    { title: "해독 작용 강화",          image: `${HJ_CENTER}hj_1.png` },
    { title: "체온 상승 & 혈액순환",    image: `${HJ_CENTER}hj_2.png` },
    { title: "면역력 증진",             image: `${HJ_CENTER}hj_3.png` },
    { title: "부작용 완화 & 피로 회복", image: `${HJ_CENTER}hj_4.png` },
    { title: "심신 안정 & 스트레스 완화", image: `${HJ_CENTER}hj_5.png` },
    { title: "항암 치료 효과 극대화",   image: `${HJ_CENTER}hj_6.png` },
  ],
  visualCardsLayout: "grid6",

  // 상담 박스 — 좌 메시지 + 우 2버튼
  consultBoxVariant: "message-box",
  consultMessage: [
    "작은 변화가 큰 회복을 만듭니다.",
    "효소찜질로 면역력을 높이고,",
    "항암 치료의 여정을 함께합니다.",
  ],
  consultQuestion: "",
  consultCTAs: [
    {
      type: "reservation",
      label: "효소찜질 프로그램 상담 예약하기",
      icon: "calendar",
      href: "/reservation",
    },
    {
      type: "video-review",
      label: "효소찜질 실제 체험 영상 보기",
      subtitle: "생생한 체험 후기를 확인해보세요!",
      icon: "play",
      videoUrl: "", // TODO: 실제 YouTube URL 입력
    },
  ],

  // 마무리 메시지 없음

  bottomBarVariant: "full",
};
