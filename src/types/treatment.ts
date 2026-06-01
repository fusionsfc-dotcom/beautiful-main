export type TreatmentCategory = "korean" | "western" | "dental";

/** 단계별 스토리텔링 섹션 (치과 페이지 등) */
export type StepStorySection = {
  number: string;
  title: string;
  bullets: string[];
  image?: string;
  imageAlt?: string;
  /** 이미지 위치, 기본 "right" */
  imagePosition?: "left" | "right";
};

/** 병원 특별함 아이콘 항목 */
export type SpecialFeature = {
  icon: string;
  /** 2줄 표시 가능 */
  title: string[];
};

export type TreatmentEffect = {
  icon: string;
  title: string;
  /** 없으면 simpleMode에서 제목만 표시 */
  description?: string[];
};

export type TreatmentVisualCard = {
  /** 없으면 번호 뱃지 미표시 (침 치료 등) */
  number?: string;
  /** 카드 상단 라벨 배너 (예: "봉독 약침") */
  badge?: string;
  title: string;
  /** 한 줄 부제 */
  subtitle?: string;
  /** 설명 문장 (약침치료 등) */
  description?: string[];
  /** 체크리스트 항목 (약침치료 등) */
  checkList?: string[];
  image: string;
};

export type ConsultCTA = {
  type: "phone" | "kakao" | "naver-talk" | "reservation" | "video-review";
  label: string;
  subtitle?: string;
  icon: string;
  href?: string;
  /** type이 video-review일 때 모달에 사용 */
  videoUrl?: string;
};

export type TreatmentDetail = {
  slug: string;
  category: TreatmentCategory;

  // 히어로
  topLabel: string;
  title: string;
  /** 타이틀 아래 작은 부제 (예: "(조선침법)") */
  titleSubLine?: string;
  subtitle: string[];
  subtitleHighlight: string;
  heroImage: string;
  heroVideoUrl?: string;
  heroVideoLabel: string;

  // 효과 (3개 또는 4개)
  effects: TreatmentEffect[];
  /** 없으면 하단 강조 박스 생략 */
  effectsConclusion?: string;
  /** true면 아이콘+제목만 표시, description 생략 */
  effectsSimpleMode?: boolean;
  /** true이거나 effects가 빈 배열이면 효과 바 섹션 전체 생략 */
  hideEffectsBar?: boolean;

  // 비주얼 카드
  visualCardsTitle: string;
  visualCards: TreatmentVisualCard[];
  /** true면 embla 캐러셀 동작, 기본값 false */
  visualCardsCarousel?: boolean;
  /**
   * "default"  — 왕뜸·뇌신경뜸: 번호뱃지+사진+제목+부제
   * "grid6"    — 침 치료: 6장 2×3 정사각 사진+라벨
   * "detailed" — 약침치료: 라벨배너+사진+제목+설명+체크리스트
   */
  visualCardsLayout?: "default" | "grid6" | "detailed";

  // 상담
  consultQuestion: string;
  /** 있으면 ConsultBoxWithCTAs, 없으면 ConsultBoxSimple */
  consultCTAs?: ConsultCTA[];

  // 마무리 (선택 — 없으면 섹션 생략)
  closingMessage?: string[];
  closingSubMessage?: string;
  closingImage?: string;

  // 단계별 스토리텔링 (치과 페이지 등)
  stepSections?: StepStorySection[];
  /** 특별함 섹션 타이틀 */
  specialFeaturesTitle?: string;
  specialFeatures?: SpecialFeature[];

  /**
   * 상담 박스 변형:
   * "simple"       — 기본 (전화+톡톡 버튼)
   * "with-ctas"    — consultCTAs 배열로 버튼 구성
   * "message-box"  — 좌측 메시지 + 우측 1버튼 (치과 페이지)
   */
  consultBoxVariant?: "simple" | "with-ctas" | "message-box";
  /** consultBoxVariant: "message-box"일 때 좌측 문구 */
  consultMessage?: string[];

  /**
   * 하단 액션바:
   * "simple4"    — 기본 4분할 (BottomActionBar4)
   * "full"       — 협진 안내+3분할+보조3링크 (BottomActionBarFull)
   * "integrated" — 협진박스(좌)+3분할(우)+보조3링크 (BottomActionBarIntegrated)
   */
  bottomBarVariant?: "simple4" | "full" | "integrated";
};
