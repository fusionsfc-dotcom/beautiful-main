import { Link } from "react-router";
import { ChevronRight, Check, Activity, Shield, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
/** 클리닉 페이지 히어로 배경 이미지 */
const CLINICS_HERO_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/headdocimg.png";
/** 임시: Vercel 링크테스트용 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
/** 암환자 통합 면역 치료 클리닉 카드 이미지 */
const CANCER_IMMUNE_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg";
/** 이명·난청·어지럼증·두통 클리닉 카드 이미지 */
const TINNITUS_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/te_2.png";
/** 척추·관절 통증 클리닉 카드 이미지 */
const SPINE_JOINT_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/1533a480-19c6-4888-a70a-5f635655c966.jpg";

// 클리닉 메뉴 메인 페이지 - 컴팩트 카드 형식 v3.0
export default function Clinics() {
  console.log("🎨 Compact Clinics Design Loaded - v3.0");
  return (
    <div className="min-h-[100dvh] bg-white">
      {/* 1️⃣ 상단 선언 섹션 (진료 철학) */}
      <PhilosophySection />

      {/* 2️⃣ 4대 핵심 클리닉 섹션 - 컴팩트 그리드 */}
      <ClinicsSection />

      {/* 3️⃣ 공통 적용 원리 섹션 */}
      <PrinciplesSection />
    </div>
  );
}

// 1️⃣ 상단 선언 섹션
function PhilosophySection() {
  const keywords = [
    { icon: Shield, label: "자율신경 안정화" },
    { icon: Activity, label: "신경 통로 복원" },
    { icon: Lightbulb, label: "구조적 압박 해소" }
  ];

  return (
    <section className="relative py-20 px-5 overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={CLINICS_HERO_IMAGE_URL}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3E5266] opacity-50" />
      </div>

      <div className="relative z-10 max-w-screen-lg mx-auto text-center">
        <h1 className="mb-6 text-white leading-tight">
          일상을 되찾는 회복의 시작
        </h1>
        
        <p className="text-white/95 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          뷰티풀한방병원은<br />
          암, 파킨슨병, 중풍과 같은 중증 질환의 회복 치료부터<br />
          이명, 난청, 어지럼증, 두통처럼<br />
          일상을 오래도록 불편하게 만드는 난치성 증상까지<br />
          뇌신경계 기반의 통합 재활 치료를 제공합니다.
        </p>

        {/* 하단 키워드 */}
        <div className="flex flex-wrap justify-center gap-4">
          {keywords.map((keyword, index) => {
            const Icon = keyword.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full border border-[#E91E7A]/30 shadow-lg"
              >
                <Icon className="w-5 h-5 text-[#E91E7A]" />
                <span className="text-[#3E5266] font-medium">{keyword.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 2️⃣ 4대 핵심 클리닉 섹션 - 컴팩트 그리드 형식
function ClinicsSection() {
  const clinics = [
    {
      id: "cancer-immune",
      title: "암환자 통합 면역 치료",
      headline: "항암을 멈추지 않도록 돕는 병원",
      description: "항암 부작용 관리와 자율신경 정화를 통해 치료 순응도를 높이고 회복 기반을 유지합니다.",
      goals: ["통증 관리", "수면 개선", "체력 유지"],
      image: CANCER_IMMUNE_CLINIC_IMAGE_URL
    },
    {
      id: "tinnitus-headache",
      title: "이명·난청·어지럼증·두통 클리닉",
      headline: "원인을 찾는 치료",
      description: "신경 압박과 구조적 불균형을 분석하여 증상의 근본 원인에 접근합니다.",
      goals: ["증상 빈도 감소", "강도 완화", "재발 관리"],
      image: TINNITUS_CLINIC_IMAGE_URL
    },
    {
      id: "spine-joint",
      title: "척추·관절 통증 클리닉",
      headline: "통증이 아닌 구조를 치료합니다",
      description: "전신 정렬과 신경 압박 해소를 통해 기능 회복과 재발 방지를 목표로 합니다.",
      goals: ["통증 완화", "체형 균형", "움직임 회복"],
      image: SPINE_JOINT_CLINIC_IMAGE_URL
    }
  ];

  return (
    <section className="py-16 px-5">
      <div className="max-w-screen-xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <h2 className="text-[#3E5266] mb-3">3대 전문 클리닉</h2>
          <p className="text-[#6B7D8C] text-base">
            각 클리닉별 전문화된 치료 프로토콜을 확인하세요
          </p>
        </div>

        {/* 컴팩트 그리드 - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {clinics.map((clinic, index) => (
            <ClinicCard key={clinic.id} clinic={clinic} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 컴팩트 클리닉 카드 컴포넌트
function ClinicCard({ 
  clinic, 
  index 
}: { 
  clinic: {
    id: string;
    title: string;
    headline: string;
    description: string;
    goals: string[];
    image: string;
  };
  index: number;
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#E91E7A] hover:shadow-xl transition-all duration-300">
      {/* 이미지 영역 - 작게 */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={clinic.image}
          alt={clinic.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 번호 배지 */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-[#E91E7A] rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-6">
        {/* 클리닉 타이틀 */}
        <h3 className="text-[#3E5266] font-bold text-lg mb-2 leading-tight">
          {clinic.title}
        </h3>

        {/* 헤드라인 */}
        <p className="text-[#E91E7A] font-medium text-sm mb-3">
          {clinic.headline}
        </p>

        {/* 설명 - 간결하게 */}
        <p className="text-[#6B7D8C] text-sm leading-relaxed mb-4 line-clamp-2">
          {clinic.description}
        </p>

        {/* 핵심 목표 - 컴팩트하게 */}
        <div className="flex flex-wrap gap-2 mb-5">
          {clinic.goals.map((goal, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#F8F9FA] text-[#6B7D8C] rounded-full text-xs"
            >
              <Check className="w-3 h-3 text-[#E91E7A]" />
              {goal}
            </span>
          ))}
        </div>

        {/* 자세히 보기 버튼 */}
        <Link
          to={`/clinics/${clinic.id}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#E91E7A] text-white rounded-lg hover:bg-[#d11a6d] transition-colors text-sm font-medium group-hover:gap-3"
        >
          <span>자세히 보기</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// 3️⃣ 공통 적용 원리 섹션
function PrinciplesSection() {
  const principles = [
    {
      number: "01",
      title: "자율신경 안정화",
      description: "스트레스 반응을 조절하고 신체 회복 기능을 활성화합니다"
    },
    {
      number: "02",
      title: "뇌혈류 및 신경 통로 복원",
      description: "산소와 영양 공급을 개선하여 신경 재생을 촉진합니다"
    },
    {
      number: "03",
      title: "신경 압박 해소",
      description: "구조적 불균형을 교정하여 통증과 기능 저하를 개선합니다"
    }
  ];

  return (
    <section className="py-20 px-5 bg-gradient-to-br from-[#F8F9FA] to-white">
      <div className="max-w-screen-lg mx-auto">
        {/* 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-[#3E5266] mb-4">
            질환은 달라도,<br />
            회복의 원리는 같습니다.
          </h2>
          <div className="w-16 h-1 bg-[#E91E7A] mx-auto rounded-full"></div>
        </div>

        {/* 3단 구조 다이어그램 */}
        <div className="space-y-6 mb-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-[#E91E7A] transition-all shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                {/* 번호 */}
                <div className="flex-shrink-0 w-14 h-14 bg-[#E91E7A] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{principle.number}</span>
                </div>

                {/* 내용 */}
                <div className="flex-1">
                  <h3 className="text-[#3E5266] mb-2">{principle.title}</h3>
                  <p className="text-[#6B7D8C] leading-relaxed">{principle.description}</p>
                </div>
              </div>

              {/* 화살표 (마지막 항목 제외) */}
              {index < principles.length - 1 && (
                <div className="flex justify-center mt-4">
                  <svg className="w-6 h-6 text-[#E91E7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 하단 문구 */}
        <div className="text-center p-6 bg-white rounded-xl border border-[#E91E7A]/20">
          <p className="text-[#6B7D8C] font-medium">
            이 원리는 모든 클리닉에 적용됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}