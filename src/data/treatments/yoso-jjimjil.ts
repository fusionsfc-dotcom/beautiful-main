// ⚠️ 뷰티풀 대형 효소찜질센터 — 시안 기반 데이터. 의료팀 검수 후 최종 확정 필요.
import type { TreatmentDetail } from "../../types/treatment";

const BASE = "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

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
  heroImage: `${BASE}te_1.jpeg`,     // TODO: 효소찜질 시술 사진으로 교체
  heroVideoUrl: "",
  heroVideoLabel: "",                // 빈 문자열 → 히어로 플레이 버튼 숨김

  // 효과 바 섹션 전체 생략
  hideEffectsBar: true,
  effects: [],

  // 6장 비주얼 카드 — grid6 레이아웃
  visualCardsTitle: "효소찜질이 항암 치료에 좋은 이유",
  visualCards: [
    { title: "해독 작용 강화",          image: `${BASE}yoga_s.jpeg`   }, // TODO: 분자 비주얼
    { title: "체온 상승 & 혈액순환",    image: `${BASE}hero_img.jpeg` }, // TODO: 열·혈류 비주얼
    { title: "면역력 증진",             image: `${BASE}te_1.jpeg`     }, // TODO: 편안한 여성
    { title: "부작용 완화 & 피로 회복", image: `${BASE}room_pa.jpeg`  }, // TODO: 손 위 발광체
    { title: "심신 안정 & 스트레스 완화", image: `${BASE}loca.jpeg`   }, // TODO: 손 하트
    { title: "항암 치료 효과 극대화",   image: `${BASE}ceo_re.png`    }, // TODO: 방패+면역세포
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
