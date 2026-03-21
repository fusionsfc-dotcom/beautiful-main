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
import wardImage from "figma:asset/396e7409d3527b266c087cdfc131723c19549daf.png";
import room1Image from "figma:asset/c1cf4d8fdfba82a05c87acd4d84d073e561f0411.png";
import room2Image from "figma:asset/fed4d73f9f2c47622de05da37fd96ba302bb7122.png";
import room3Image from "figma:asset/576ebe983e8f8e332c87283f954b9aecaf24b58c.png";
import room4Image from "figma:asset/2d6258db2b8cf8eb395b7b6ec6a16458d5907bab.png";
import bathroom1Image from "figma:asset/483eeccfc384f2416b82710f3062e6d29f0e3788.png";
import bathroom2Image from "figma:asset/db30cef3becd96d57e4b73b5153ae153a7ac7f27.png";
import receptionImage from "figma:asset/f0037e9fbf736e45f30bef75650a26f27f20b7d4.png";
import lobbyImage from "figma:asset/f2f1d5a4e93103f329b0d1a15d5cb4b6ab8aedf6.png";
import hallwayImage from "figma:asset/1528653f12a63af5bce957c996a34a3103c231a3.png";
import treatmentImage1 from "figma:asset/6398b4b8bb5aecaae979deb8fe81cf0850d84929.png";
import treatmentImage2 from "figma:asset/0c3746cb09b7a9a3cab65946bb06a2e0a0443a30.png";
import treatmentImage3 from "figma:asset/e9ffe0c880f2e7a69d305866cea3fa11afd1708d.png";
import treatmentImage4 from "figma:asset/4e5ab924073d5683f8014dc7113f8f708f72b55e.png";
import gardenImage from "figma:asset/055f54ff0e7f332157a4a1b26e50f76983998083.png";
import healingRoomImage from "figma:asset/c4579d5f99fde89727f10d11b2ead74f6618c348.png";
import healing1Image from "figma:asset/5b156ee3c3fb36b7f217a74868810b96873e6e0c.png";
import healing2Image from "figma:asset/a1a9bf7fd917a8a5a08e21ffc9d4a11e92be4cc3.png";
import healing3Image from "figma:asset/4088a66fe607b72cef53b97cdceaeb581143bbf6.png";
import food1Image from "figma:asset/c7ef3b62abc1f5feaea0b7a86221ae63232b3fcb.png";
import food2Image from "figma:asset/c0c70168e661d1984142a31dcffc56c85209034f.png";
import food3Image from "figma:asset/415bce866a944bda79432e776f37923915ad1b6c.png";
import food4Image from "figma:asset/56e30cc8994922d8551ec086ab55034e74c23b7c.png";
import food5Image from "figma:asset/1ae70b57589991b8874fc5abc73aa3c8307ad90c.png";
import food6Image from "figma:asset/20d56442a8b0d1e3948eca2def262755ffa618f9.png";

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
              src={wardImage}
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
            src={room1Image}
            alt="1인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">1인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={room2Image}
            alt="2인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">2인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={room3Image}
            alt="3~4인실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">3~4인실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={room4Image}
            alt="스타일러"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">스타일러</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={bathroom1Image}
            alt="화장실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">파우더룸</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={bathroom2Image}
            alt="화장실"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">욕조화장실</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={receptionImage}
            alt="리셉션"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">리셉션</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={lobbyImage}
            alt="뷰티풀 로비"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀 로비</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={hallwayImage}
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
      image: treatmentImage1
    },
    {
      name: "통합한방요법실",
      description: "침, 뜸, 약침 등 다양한 한방요법을 통합 적용하는 치료 공간입니다",
      image: treatmentImage2
    },
    {
      name: "통증치료실",
      description: "페인 레이저를 이용해 통증 완화와 조직 회복을 돕는 치료 공간입니다",
      image: treatmentImage3
    },
    {
      name: "X-ray 촬영실",
      description: "정확한 진단을 위한 디지털 X-ray 촬영 시스템",
      image: treatmentImage4
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
              src={healingRoomImage}
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
            src={healing1Image}
            alt="다양한 생활공예프로그램"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">다양한 생활공예프로그램</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={healing2Image}
            alt="다양한 운동프로그램"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">다양한 운동프로그램</h3>
          </div>
        </div>
        
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={healing3Image}
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
              src={gardenImage}
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
            src={food1Image}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={food2Image}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={food3Image}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={food4Image}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={food5Image}
            alt="뷰티풀식단"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3E5266]/80 to-transparent p-6">
            <h3 className="text-white font-semibold">뷰티풀식단</h3>
          </div>
        </div>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src={food6Image}
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