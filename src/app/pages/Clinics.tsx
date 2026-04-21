import { Link } from "react-router";
import { ChevronRight, Check, Shield, Activity, HeartPulse, Syringe, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../../components/seo/SEOHead";

/** 클리닉 페이지 히어로 배경 이미지 */
const CLINICS_HERO_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/headdocimg.png";

/** 뷰티풀 암케어 카드 이미지 */
const BEAUTIFUL_CANCER_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg";
/** 암별 집중케어 카드 이미지 */
const CANCER_SPECIFIC_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/dd.jpg";
/** 수술 후 회복케어 카드 이미지 */
const POST_SURGERY_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room/room2.jpg";
/** 항암치료 환자 케어 카드 이미지 */
const CHEMO_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/jj.png";
/** 방사선치료 환자 케어 카드 이미지 */
const RADIATION_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/te_2.png";

// 클리닉 메뉴 메인 페이지 - 5대 전문 암케어 클리닉
export default function Clinics() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="암 치료 클리닉 | 뷰티풀한방병원"
        description="뷰티풀한방병원의 5대 전문 암케어 클리닉. 통합 면역치료, 암종별 집중케어, 수술 후 회복, 항암·방사선 부작용 관리."
        ogUrl="https://www.btful.co.kr/clinics"
      />
      <PhilosophySection />
      <ClinicsSection />
      <PrinciplesSection />
    </div>
  );
}

function PhilosophySection() {
  const keywords = [
    { icon: Shield, label: "암환자 통합 면역치료" },
    { icon: HeartPulse, label: "수술·항암·방사선 회복" },
    { icon: Activity, label: "암종별 맞춤 케어" }
  ];

  return (
    <section className="relative py-20 px-5 overflow-hidden">
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
          암 진단과 치료 이후의 회복까지<br />
          수술·항암·방사선 치료 전 과정을 함께하며<br />
          암종별 맞춤 통합 면역 케어 프로그램을 제공합니다.
        </p>

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

function ClinicsSection() {
  const clinics = [
    {
      id: "beautiful-cancer-care",
      title: "뷰티풀 암케어",
      headline: "암 치료의 전 과정을 함께합니다",
      description: "대학병원 치료와 병행하는 한·양방 통합 면역 케어로, 진단부터 회복까지 환자의 치료 여정을 설계합니다.",
      goals: ["통합 면역치료", "맞춤 프로토콜", "회복 관리"],
      image: BEAUTIFUL_CANCER_CARE_IMAGE_URL
    },
    {
      id: "cancer-specific-care",
      title: "암별 집중케어",
      headline: "암종별 특성에 맞춘 맞춤 치료",
      description: "유방암·부인암·위대장암·폐암·간암 등 각 암종의 특성과 치료 단계에 최적화된 집중 프로그램입니다.",
      goals: ["암종별 맞춤", "단계별 관리", "재발 방지"],
      image: CANCER_SPECIFIC_CARE_IMAGE_URL
    },
    {
      id: "post-surgery-recovery",
      title: "수술 후 회복케어",
      headline: "수술 이후 빠른 회복의 시작",
      description: "수술 후 체력 저하, 통증, 부종, 상처 회복을 집중 관리하여 다음 치료로 순조롭게 이어지도록 돕습니다.",
      goals: ["체력 회복", "통증 관리", "면역 안정"],
      image: POST_SURGERY_CARE_IMAGE_URL
    },
    {
      id: "chemotherapy-care",
      title: "항암치료 환자 케어",
      headline: "항암 치료를 끝까지 받을 수 있도록",
      description: "오심·구토, 식욕 저하, 백혈구 감소, 말초신경병증 등 항암 부작용을 관리하여 치료 순응도를 높입니다.",
      goals: ["부작용 완화", "수치 관리", "체력 유지"],
      image: CHEMO_CARE_IMAGE_URL
    },
    {
      id: "radiation-care",
      title: "방사선치료 환자 케어",
      headline: "방사선 부작용을 줄이는 케어",
      description: "방사선 피부염, 점막 손상, 피로, 부종을 완화하고 치료 후 조직 회복을 돕는 맞춤 프로그램입니다.",
      goals: ["피부·점막 보호", "피로 개선", "조직 회복"],
      image: RADIATION_CARE_IMAGE_URL
    }
  ];

  return (
    <section className="py-16 px-5">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[#3E5266] mb-3">5대 전문 클리닉</h2>
          <p className="text-[#6B7D8C] text-base">
            치료 단계와 암종별로 특화된 맞춤 케어 프로그램을 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {clinics.map((clinic, index) => (
            <ClinicCard key={clinic.id} clinic={clinic} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={clinic.image}
          alt={clinic.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 w-10 h-10 bg-[#E91E7A] rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-[#3E5266] font-bold text-lg mb-2 leading-tight">
          {clinic.title}
        </h3>

        <p className="text-[#E91E7A] font-medium text-sm mb-3">
          {clinic.headline}
        </p>

        <p className="text-[#6B7D8C] text-sm leading-relaxed mb-4 line-clamp-2">
          {clinic.description}
        </p>

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

function PrinciplesSection() {
  const principles = [
    {
      number: "01",
      title: "면역력 회복과 자율신경 안정",
      description: "치료 중 저하된 면역과 자율신경을 조절해 회복 기반을 만듭니다"
    },
    {
      number: "02",
      title: "체력·식욕·수면 관리",
      description: "환자가 다음 치료를 이어갈 수 있는 기초 체력을 유지합니다"
    },
    {
      number: "03",
      title: "부작용·후유증 완화",
      description: "항암·방사선·수술 후 나타나는 증상을 선제적으로 관리합니다"
    }
  ];

  return (
    <section className="py-20 px-5 bg-gradient-to-br from-[#F8F9FA] to-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#3E5266] mb-4">
            암종과 치료 단계는 달라도,<br />
            회복의 원리는 같습니다.
          </h2>
          <div className="w-16 h-1 bg-[#E91E7A] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 mb-12">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-[#E91E7A] transition-all shadow-sm hover:shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[#E91E7A] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{principle.number}</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-[#3E5266] mb-2">{principle.title}</h3>
                  <p className="text-[#6B7D8C] leading-relaxed">{principle.description}</p>
                </div>
              </div>

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

        <div className="text-center p-6 bg-white rounded-xl border border-[#E91E7A]/20">
          <p className="text-[#6B7D8C] font-medium">
            이 원리는 모든 클리닉에 공통으로 적용됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
