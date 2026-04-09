import { Link } from "react-router";
import { 
  Heart,
  Activity,
  Brain,
  Zap,
  Users,
  Sparkles,
  Wind,
  Target,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Phone,
  ClipboardCheck,
  Building2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../../components/seo/SEOHead";

const HERO_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/hero_img.jpeg";
const EMPATHY_SECTION_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
const POST_SURGERY_CLINIC_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/1533a480-19c6-4888-a70a-5f635655c966.jpg";
const CHEMO_RADIATION_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/headdocimg.png";
const ADVANCED_CANCER_CARE_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg";
const LOCATION_RECOVERY_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/loca.jpeg";
const HOTEL_ROOM_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room_pa.jpeg";
const CANCER_REHAB_STORY_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg";
const CEO_STORY_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png";
const DIRECTOR_GREETING_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_1.png";
/** 임시: Vercel 링크테스트용 - 모든 figma:asset 이미지를 yoga_s.jpeg로 대체 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";

export default function Home() {
  // 메인 클리닉 (암 관련 핵심 3개)
  const mainClinics = [
    {
      id: "post-surgery-recovery",
      title: "수술 후 회복 클리닉",
      description: "수술 이후 체력 회복과 통증 관리",
      icon: Heart,
      image: POST_SURGERY_CLINIC_IMAGE_URL
    },
    {
      id: "chemo-radiation-care",
      title: "항암·방사선 치료 집중 관리",
      description: "면역, 백혈구, 부작용, 체력 유지 집중 케어",
      icon: Sparkles,
      image: CHEMO_RADIATION_CARE_IMAGE_URL,
      featured: true // 가장 강조
    },
    {
      id: "advanced-cancer-care",
      title: "진행성 암 통합 케어",
      description: "통증 관리와 삶의 질 회복",
      icon: Heart,
      image: ADVANCED_CANCER_CARE_IMAGE_URL
    }
  ];

  // 서브 클리닉 (기타 증상)
  const subClinics = [
    {
      title: "이명·난청·어지럼증·두통",
      icon: Brain
    },
    {
      title: "척추·관절 통증",
      icon: Zap
    },
    {
      title: "갱년기 여성 케어",
      icon: Sparkles
    }
  ];

  // 치료 원리 (간결하게)
  const principles = [
    {
      step: "신경 긴장 완화",
      icon: "🔄"
    },
    {
      step: "신경 순환 회복",
      icon: "⚡"
    },
    {
      step: "신경 압박 해소",
      icon: "🎯"
    }
  ];

  // 선택 이유 (스토리형 카드)
  const storyCards = [
    {
      title: "암 치료를 더 건강하게 받고\n암 이후의 삶을 준비하는 재활",
      description: "치료 후유증 예방과 부작용 개선은 기본\n암 이후의 삶을 준비하는 종합적인 재활 프로그램",
      image: CANCER_REHAB_STORY_IMAGE_URL
    },
    {
      title: "고급 호텔을 병원으로 바꾼\n진짜 호텔형 병원",
      description: "도심의 소음과 긴장을 벗어나\n회복과 휴식의 질이 달라지는 공간입니다",
      image: HOTEL_ROOM_IMAGE_URL
    },
    {
      title: "국립암센터와 15분,\n도심이 아닌 자연에서 회복",
      description: "치료는 가까이에서 이어가고,\n회복은 자연 속에서 집중할 수 있습니다",
      image: LOCATION_RECOVERY_IMAGE_URL
    },
    {
      title: "암 치료 경험 20년 이상의\n의료진이 함께합니다",
      description: "20년 암환자 면역 치료 경험의 이형석 병원장\n경희대학교 한의학 박사, 경희대학교 대학원 외래교수 등",
      image: CEO_STORY_IMAGE_URL
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="뷰티풀한방병원 | 국립암센터 인근 암요양병원 · 통합 암 면역 회복"
        description="국립암센터 차량 15분, 경기도 파주시 암요양병원. 수술·항암·방사선 치료 후 면역과 체력 회복을 돕는 통합 암 면역 회복 전문 한방병원. 호텔형 입원실, 24시간 의료진 상주, 양·한·치과 통합진료."
        keywords="암요양병원,국립암센터근처암요양병원,파주암요양병원,일산암요양병원,고양암요양병원,경기암요양병원,한방암치료,면역암치료,항암후관리,암회복,뷰티풀한방병원,국립암센터근처병원,통합암치료,암환자재활,암요양,항암부작용관리"
        ogUrl="https://www.btful.co.kr/"
        canonical="https://www.btful.co.kr/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "뷰티풀한방병원",
          "alternateName": "Beautiful Korean Medicine Hospital",
          "url": "https://www.btful.co.kr",
          "publisher": {
            "@type": "Hospital",
            "name": "뷰티풀한방병원",
            "telephone": "031-945-2000",
          },
        }}
      />
      {/* 1️⃣ 히어로 섹션 */}
      <section className="relative h-[100dvh] min-h-[600px] flex items-center justify-center">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={HERO_IMAGE_URL}
            alt="뷰티풀한방병원"
            className="w-full h-full object-cover"
          />
          {/* 어두운 네이비 오버레이 40% */}
          <div className="absolute inset-0 bg-[#3E5266] opacity-40"></div>
        </div>

        {/* 텍스트 중앙 배치 */}
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <h1 className="text-white mb-4 leading-tight text-3xl sm:text-4xl lg:text-5xl font-bold">
            국립암센터 치료 효과를 높이는<br />
            통합 암 면역 회복 프로그램<br />
            뷰티풀한방병원
          </h1>
          
          {/* 서브카피 */}
          <p className="text-white/95 text-lg sm:text-xl leading-relaxed mb-3">
            수술, 항암, 방사선 치료 중<br />
            면역과 체력을 함께 관리하며
          </p>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
            암 이후의 삶을 준비하는 회복 치료
          </p>
          
          {/* 배지 3개 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-[#E91E7A] rounded-full animate-pulse"></div>
              <span className="text-[#3E5266] font-semibold text-sm">국립암센터 차량 15분</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-[#E91E7A] rounded-full animate-pulse"></div>
              <span className="text-[#3E5266] font-semibold text-sm">24시간 의료진 상주</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-[#E91E7A] rounded-full animate-pulse"></div>
              <span className="text-[#3E5266] font-semibold text-sm">양·한·치과 통합진료</span>
            </div>
          </div>

          {/* CTA 버튼 2개 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/health-check"
              className="py-4 px-8 bg-[#E91E7A] text-white rounded-xl text-center transition-all hover:bg-[#d11a6d] font-semibold shadow-lg text-base"
            >
              3분 상태 체크
            </Link>
            <Link
              to="/about"
              className="py-4 px-8 bg-white/95 text-[#3E5266] rounded-xl text-center transition-all hover:bg-white font-semibold shadow-lg text-base"
            >
              상담 예약
            </Link>
          </div>
        </div>
      </section>

      {/* 2️⃣ 공감 섹션 (암 중심) */}
      <section className="py-20 px-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 이미지 */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={EMPATHY_SECTION_IMAGE_URL}
                alt="재활 운동"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 우측: 텍스트 */}
            <div>
              {/* 타이틀 */}
              <h2 className="mb-4 text-[#3E5266] leading-tight">
                항암, 방사선치료를 이어가야 하는데<br />
                몸이 무너지기 시작했다면
              </h2>
              
              {/* 서브카피 (경고) */}
              <p className="text-[#E91E7A] text-lg font-semibold mb-8 leading-relaxed">
                이 상태를 방치하면<br />
                치료 일정이 끊기거나 회복이 늦어질 수 있습니다
              </p>
              
              {/* 리스트 (경고형 구조) */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#E91E7A]"></div>
                  </div>
                  <p className="text-[#3E5266] text-lg leading-relaxed">
                    <span className="font-semibold">항암 치료 중 체력이 급격히 떨어지면</span><br />
                    치료를 중단하거나 연기하게 될 수 있습니다
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#E91E7A]"></div>
                  </div>
                  <p className="text-[#3E5266] text-lg leading-relaxed">
                    <span className="font-semibold">백혈구 수치가 계속 낮다면</span><br />
                    다음 항암 치료가 지연될 수 있습니다
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#E91E7A]"></div>
                  </div>
                  <p className="text-[#3E5266] text-lg leading-relaxed">
                    <span className="font-semibold">수술 후 회복이 늦어지면</span><br />
                    합병증 위험이 높아질 수 있습니다
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#E91E7A]"></div>
                  </div>
                  <p className="text-[#3E5266] text-lg leading-relaxed">
                    <span className="font-semibold">통증과 피로가 지속되면</span><br />
                    일상 복귀가 더 늦어질 수 있습니다
                  </p>
                </div>
              </div>

              {/* 하단 강조 문구 */}
              <div className="p-5 bg-[#F8F9FA] rounded-xl mb-6">
                <p className="text-[#6B7D8C] text-base leading-relaxed">
                  수술 전/후 집중회복 관리<br />
                  항암치료 후유증 예방과 부작용 개선관리<br />
                  방사선치료 부작용 개선관리
                </p>
              </div>

              {/* 마지막 한 줄 강조 */}
              <div className="p-6 bg-[#3E5266] rounded-xl">
                <p className="text-white leading-relaxed font-bold text-lg text-center">
                  암치료 회복관리와 면역재활은<br />
                  암 이후의 삶을 결정합니다!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ 클리닉 섹션 (메인 3개 + 서브 3개) */}
      <section className="py-20 px-5 bg-[#F8F9FA]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="mb-4 text-center text-[#3E5266]">
            암 치료 시기별로 재활방법은 달라져야 합니다
          </h2>
          <p className="text-center text-[#6B7D8C] text-lg mb-12">
            국립암센터 환자를 위한 체계적 면역재활 프로그램
          </p>
          
          {/* 메인 클리닉 3개 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {mainClinics.map((clinic) => {
              const Icon = clinic.icon;
              return (
                <Link
                  key={clinic.id}
                  to="/clinics/cancer-immune-clinic"
                  className={`bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all group border-2 ${
                    clinic.featured ? 'border-[#E91E7A]' : 'border-[#8FA8BA]/20'
                  }`}
                >
                  {/* 특별 배지 */}
                  {clinic.featured && (
                    <div className="bg-[#E91E7A] text-white text-center py-2 text-sm font-semibold">
                      뷰티풀 항암방사선 부작용 클리닉
                    </div>
                  )}
                  
                  {/* 16:9 이미지 */}
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={clinic.image}
                      alt={clinic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* 하단 텍스트 */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        clinic.featured ? 'bg-[#E91E7A]/10' : 'bg-[#F8F9FA]'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          clinic.featured ? 'text-[#E91E7A]' : 'text-[#3E5266]'
                        }`} />
                      </div>
                      <h3 className="text-[#3E5266] text-lg font-bold">{clinic.title}</h3>
                    </div>
                    <p className="text-sm text-[#6B7D8C] mb-4 leading-relaxed">{clinic.description}</p>
                    <div className="flex items-center text-[#E91E7A]">
                      <span className="text-sm font-medium">자세히 보기</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 서브 클리닉 (작게 표시) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-[#3E5266] text-lg font-semibold mb-6 text-center">
              암 환자가 함께 겪는 다른 증상도 관리합니다
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subClinics.map((clinic, index) => {
                const Icon = clinic.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#E91E7A]/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#3E5266]" />
                    </div>
                    <span className="text-[#3E5266] font-medium text-sm">{clinic.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ 선택 이유 섹션 */}
      <section className="py-20 px-5 bg-[#F8F9FA]">
        <div className="max-w-screen-xl mx-auto">
          {/* 섹션 타이틀 */}
          <h2 className="mb-16 text-center text-[#3E5266] leading-tight">
            왜 국립암센터 환자들이<br className="sm:hidden" />
            이곳까지 이동해서 치료를 받을까요?
          </h2>
          
          {/* 스토리형 카드 4개 (세로 스크롤) */}
          <div className="space-y-8">
            {storyCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* 좌측: 이미지 (16:9) */}
                  <div className="relative aspect-video lg:aspect-auto lg:h-full overflow-hidden group">
                    <ImageWithFallback
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* 우측: 텍스트 */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-[#3E5266] text-2xl lg:text-3xl font-bold leading-tight mb-4 whitespace-pre-line text-left">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-[#6B7D8C] text-lg leading-relaxed whitespace-pre-line text-left font-light">
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ 원장 인사말 (간결하게) */}
      <section className="py-20 px-5 bg-[#F8F9FA]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl overflow-hidden shadow-xl">
            {/* 좌측: 원장 프로필 사진 */}
            <div className="relative h-96 lg:h-[500px]">
              <img
                src={DIRECTOR_GREETING_IMAGE_URL}
                alt="원장님"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 우측: 진료 철학 */}
            <div className="p-8 lg:p-12">
              <div className="text-sm text-[#E91E7A] font-semibold mb-2">병원장 인사말</div>
              <h2 className="mb-6 text-[#3E5266]">
                암치료 회복과 재활은 암 이후의 삶을 결정합니다
              </h2>
              
              <div className="space-y-4 mb-8 text-[#6B7D8C] leading-relaxed">
                <p>
                  국립암센터 치료와 시너지를 만들고<br />
                  통합 암케어로 건강을 지킵니다!
                </p>
                <p>
                  암 수술, 항암, 방사선치료 중<br />
                  후유증을 예방하고 부작용을 개선하는<br />
                  1:1 맞춤 암 케어를 받으세요
                </p>
              </div>

              <Link
                to="/columns"
                className="inline-flex items-center gap-2 text-[#E91E7A] font-medium hover:gap-3 transition-all"
              >
                커뮤니티 보기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}