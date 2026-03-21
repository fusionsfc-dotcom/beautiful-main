import { useState } from "react";
import { 
  Bed, 
  Activity, 
  Leaf, 
  UtensilsCrossed,
  Check,
  Clock,
  Users,
  Phone
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
/** 임시: Vercel 링크테스트용 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";

type TabType = "rooms" | "treatment" | "healing" | "nutrition";

export default function Facilities() {
  const [activeTab, setActiveTab] = useState<TabType>("rooms");

  const tabs = [
    { id: "rooms" as TabType, label: "입원·병동", icon: Bed },
    { id: "treatment" as TabType, label: "치료공간", icon: Activity },
    { id: "healing" as TabType, label: "힐링생활", icon: Leaf },
    { id: "nutrition" as TabType, label: "영양식단", icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* 페이지 헤더 */}
      <div className="bg-[#F8F9FA] py-16 px-5">
        <div className="max-w-screen-lg mx-auto text-center">
          <h1 className="mb-4 text-[#3E5266]">치료환경</h1>
          <p className="text-[#6B7D8C] text-lg">
            회복에 집중할 수 있는 최적의 환경을 제공합니다
          </p>
        </div>
      </div>

      {/* 상단 탭 UI */}
      <div className="sticky top-16 lg:top-20 bg-white border-b border-gray-200 z-40">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? "border-[#E91E7A] text-[#E91E7A]"
                      : "border-transparent text-[#8FA8BA] hover:text-[#3E5266]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 중요 메시지 */}
      <div className="py-8 px-5 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-[#3E5266] text-lg font-medium">
            치료만큼 중요한 것은 회복할 수 있는 환경입니다.
          </p>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="py-16 px-5">
        <div className="max-w-screen-lg mx-auto">
          {activeTab === "rooms" && <RoomsSection />}
          {activeTab === "treatment" && <TreatmentSection />}
          {activeTab === "healing" && <HealingSection />}
          {activeTab === "nutrition" && <NutritionSection />}
        </div>
      </div>
    </div>
  );
}

// 1️⃣ 입원시설 섹션
function RoomsSection() {
  const features = [
    "1~4인실 중심 구성으로 쾌적한 입원 환경\n(호텔을 리모델링하여 고급스러운 입원환경)",
    "매일 청결 관리 시스템 운영",
    "보호자 전용 공간 및 편의시설 완비",
  ];

  return (
    <div className="space-y-12">
      {/* 메인 이미지 + 텍스트 */}
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* 이미지 60% */}
        <div className="lg:col-span-3">
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={PLACEHOLDER_IMAGE}
              alt="병실 전경"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 텍스트 40% */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-[#3E5266]">편안한 입원 공간</h2>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-[#E91E7A]" />
                </div>
                <p className="text-[#6B7D8C]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 추가 이미지 그리드 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="1인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">1인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="2인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">2인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="3~4인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">3~4인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="스타일러"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">스타일러</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="화장실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">파우더룸</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="화장실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">욕조화장실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="리셉션"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">리셉션</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀 로비"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀 로비</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="입원병동"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">입원병동</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2️⃣ 치료장비 섹션
function TreatmentSection() {
  const equipment = [
    {
      name: "고주파온열치료실",
      description: "암세포를 선택적으로 공격하고 면역력 상승을 높이는 치료",
      image: PLACEHOLDER_IMAGE
    },
    {
      name: "통합한방요법실",
      description: "침, 뜸, 약침 등 다양한 한방요법을 통합 적용하는 치료 공간입니다",
      image: PLACEHOLDER_IMAGE
    },
    {
      name: "통증치료실",
      description: "페인 레이저를 이용해 통증 완화와 조직 회복을 돕는 치료 공간입니다",
      image: PLACEHOLDER_IMAGE
    },
    {
      name: "X-ray 촬영실",
      description: "정확한 진단을 위한 디지털 X-ray 촬영 시스템",
      image: PLACEHOLDER_IMAGE
    },
  ];

  return (
    <div className="space-y-12">
      {equipment.map((item, index) => (
        <div
          key={index}
          className={`grid lg:grid-cols-5 gap-8 items-center ${
            index % 2 === 1 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* 이미지 */}
          <div className={`lg:col-span-3 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 텍스트 */}
          <div className={`lg:col-span-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            <div className="inline-block px-4 py-1 bg-[#E91E7A]/10 text-[#E91E7A] rounded-full text-sm font-medium mb-4">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-3 text-[#3E5266]">{item.name}</h3>
            <p className="text-[#6B7D8C] leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 3️⃣ 힐링생활 섹션
function HealingSection() {
  const features = [
    "자연 풍경을 즐길 수 있는 힐링생활 공간",
    "편안한 휴식을 위한 다양한 휴게 공간 운영",
    "정기적인 힐링 프로그램 운영",
  ];

  return (
    <div className="space-y-12">
      {/* 메인 이미지 + 텍스트 */}
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* 이미지 60% */}
        <div className="lg:col-span-3">
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src={PLACEHOLDER_IMAGE}
              alt="힐링생활"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 텍스트 40% */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-[#3E5266]">힐링생활</h2>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-[#E91E7A]" />
                </div>
                <p className="text-[#6B7D8C]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 추가 이미지 그리드 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="다양한 생활공예프로그램"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">다양한 생활공예프로그램</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="다양한 운동프로그램"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">다양한 운동프로그램</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="다양한 스트레칭 프로그램"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">다양한 스트레칭 프로그램</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4️⃣ 영양·생활 케어 섹션
function NutritionSection() {
  const principles = [
    "항암 환자 맞춤형 영양 밸런스 설계",
    "회복에 필요한 필수 영양소 중심 구성",
    "신선한 식재료 일일 검수 시스템",
  ];

  return (
    <div className="space-y-12">
      {/* 메인 이미지 + 텍스트 */}
      <div className="grid lg:grid-cols-5 gap-8 items-center">
        {/* 이미지 60% */}
        <div className="lg:col-span-3">
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src={PLACEHOLDER_IMAGE}
              alt="병원 식단"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 텍스트 40% */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-[#3E5266]">회복 중심 식단</h2>
          <div className="space-y-4 mb-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E91E7A]/10 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-[#E91E7A]" />
                </div>
                <p className="text-[#6B7D8C]">{principle}</p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#F8F9FA] rounded-lg border-l-4 border-[#E91E7A]">
            <p className="text-sm text-[#6B7D8C]">
              치료 효과를 높이는 영양 관리는 회복의 필수 요소입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 식단 사진 그리드 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={PLACEHOLDER_IMAGE}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
      </div>
    </div>
  );
}