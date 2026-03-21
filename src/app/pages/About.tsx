import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Car,
  Bus,
  FileText,
  Award,
  Heart,
  Shield,
  Stethoscope,
  Star,
  Bell,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
/** 임시: Vercel 링크테스트용 */
const PLACEHOLDER_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
/** 이형석 병원장 사진 */
const DIRECTOR_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc1.png";
  /** 고은상 원장 사진 */
const DIRECTOR_2_IMAGE_URL =
"https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc2.png";
/** 장엽섭 원장 사진 */
const DIRECTOR_3_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc3.png";
  /** 이하림 원장 사진 */
const DIRECTOR_4_IMAGE_URL =
"https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc4.png";

type TabType = "intro" | "doctors" | "location" | "guide" | "notices";

const tabs = [
  { id: "intro" as TabType, label: "병원소개" },
  { id: "doctors" as TabType, label: "의료진" },
  { id: "location" as TabType, label: "오시는길" },
  { id: "guide" as TabType, label: "진료안내" },
  { id: "notices" as TabType, label: "공지안내" },
];

const hospitalStrengths = [
  {
    icon: MapPin,
    title: "국립암센터 인접",
    description: "암센터와 긴밀한 협력으로 신속한 병행 치료",
  },
  {
    icon: Clock,
    title: "24시간 의료진",
    description: "언제든 대응 가능한 전문 의료진 상주",
  },
  {
    icon: Stethoscope,
    title: "양·한·치과 협진",
    description: "통합 의료 시스템으로 맞춤 치료 제공",
  },
  {
    icon: Building2,
    title: "호텔급 입원 시설",
    description: "쾌적하고 편안한 치료 환경",
  },
];

const doctors = [
  {
    name: "김한의 원장",
    specialty: "암 치료 및 면역 관리",
    experience: "20년 이상의 임상 경험",
    education: "경희대학교 한의과대학 졸업",
    activities: ["대한한방종양학회 정회원", "대한암한의학회 이사"],
  },
  {
    name: "이한의 원장",
    specialty: "중풍·파킨슨병 재활",
    experience: "15년 이상의 신경계 치료 경력",
    education: "동국대학교 한의과대학 졸업",
    activities: ["대한한방신경정신과학회 정회원", "대한중풍학회 회원"],
  },
  {
    name: "박한의 원장",
    specialty: "척추·관절 통증 치료",
    experience: "18년 이상의 근골격계 치료 경력",
    education: "원광대학교 한의과대학 졸업",
    activities: ["대한침구의학회 정원", "대한추나학회 회원"],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("intro");
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Tab Navigation */}
      <div className="sticky top-16 lg:top-20 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#1a2847] text-[#1a2847]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {activeTab === "intro" && <IntroSection />}
        {activeTab === "doctors" && <DoctorsSection doctors={doctors} />}
        {activeTab === "location" && <LocationSection />}
        {activeTab === "guide" && <GuideSection />}
        {activeTab === "notices" && <NoticesSection />}
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-[#1a2847] mb-4">
          더 건강하게 암치료를 받고
        </h1>
        <p className="text-lg text-gray-600">
          더 행복한 암 이후의 삶을 만듭니다
        </p>
      </section>

      {/* Hospital Strengths */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6 text-center">
          뷰티풀한방병원의 강점
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitalStrengths.map((strength, idx) => {
            const Icon = strength.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#1a2847] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[#1a2847] mb-2">
                  {strength.title}
                </h3>
                <p className="text-sm text-gray-600">{strength.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Treatment System */}
      <section className="bg-[#f5f6f8] rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6 text-center">
          진료 시스템
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Building2 className="w-8 h-8 text-[#1a2847]" />
            </div>
            <p className="font-medium text-[#1a2847]">대학병원 치료</p>
            <p className="text-sm text-gray-600 mt-1">1차 진단 및 치료</p>
          </div>

          <div className="hidden lg:block text-gray-400">→</div>
          <div className="lg:hidden text-gray-400">↓</div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Heart className="w-8 h-8 text-[#1a2847]" />
            </div>
            <p className="font-medium text-[#1a2847]">병행 재활 치료</p>
            <p className="text-sm text-gray-600 mt-1">한방 통합 치료</p>
          </div>

          <div className="hidden lg:block text-gray-400">→</div>
          <div className="lg:hidden text-gray-400">↓</div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <CheckCircle className="w-8 h-8 text-[#1a2847]" />
            </div>
            <p className="font-medium text-[#1a2847]">일상 회복</p>
            <p className="text-sm text-gray-600 mt-1">삶의 질 개선</p>
          </div>
        </div>
      </section>

      {/* Core Technology */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-4">
          핵심 치료 체계
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-[#1a2847] mb-3">
            신경 통로 복원 기반 치료
          </h3>
          <p className="text-gray-600 mb-4">
            손상된 신경 기능의 회복을 돕기 위해 침술, 한약, 추나요법 등을
            통합적으로 활용하여 환자 개인별 맞춤 치료를 제공합니다.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>개인별 증상 분석 및 맞춤 치료 계획 수립</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>양방·한방 협진을 통한 통합 치료 접근</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>지속적인 경과 관찰 및 치료 조정</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function DoctorsSection({ doctors }: { doctors: typeof doctors }) {
  return (
    <div className="space-y-12">
      {/* Director's Message */}
      <section className="bg-[#f5f6f8] rounded-lg p-8">
        <div className="flex items-start gap-4 mb-4">
          <Shield className="w-8 h-8 text-[#1a2847] flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-[#1a2847] mb-3">
              원장 메시지
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              뷰티풀한방병원은 난치성 질환으로 어려움을 겪는 환자분들이 다시
              일상으로 돌아갈 수 있도록 돕는 것을 목표로 합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              대학병원 치료와 병행하여 한방 통합 치료를 제공함으로써, 부작용을
              최소화하고 삶의 질을 개선하는 데 집중합니다. 모든 환자분께 최선의
              치료를 제공하기 위해 끊임없이 노력하겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          의료진 소개
        </h2>
        
        {/* 이형복 원장 */}
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-8">
          {/* 의사 사진 섹션 */}
          <div className="relative h-64 md:h-80">
            <img 
              src={DIRECTOR_IMAGE_URL} 
              alt="이형석 병원장" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* 정보 섹션 */}
          <div className="p-6 md:p-8">
            {/* 이름과 전문분야 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#3E5266] mb-2">이형석 병원장</h3>
              <p className="text-[#E91E7A] font-semibold text-lg">한의사</p>
            </div>
            
            {/* 학력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">학력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 한의과대학 졸업</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 한의학 박사(면역학)</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 한의원 석사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 대학원 동서의학과 외래교수</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>노아자연학교 이사장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>예장생활협동조합 교육이사</span>
                </li>
              </ul>
            </div>
            
            {/* 경력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">경력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 효소앤한의원 원장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 경희대성의원 원장</span>
                </li>
              </ul>
            </div>
            
            {/* 논문 */}
            <div>
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">논문</h4>
              <ul className="space-y-3">
                <li className="bg-[#F8F9FA] p-4 rounded-lg">
                  <p className="text-xs text-[#8FA8BA] mb-1">2008</p>
                  <p className="text-sm text-[#3E5266] leading-relaxed">
                    The bark of Betula platyphylla var. japonica inhibits the development of atopic dermatitis-like skin lesions in NC/Nga mice J Ethnopharmacol
                  </p>
                </li>
                <li className="bg-[#F8F9FA] p-4 rounded-lg">
                  <p className="text-xs text-[#8FA8BA] mb-1">2008</p>
                  <p className="text-sm text-[#3E5266] leading-relaxed">
                    Inhibitory Effects of Saururus chinensis (LOUR.) BAILL on the Development of Atopic Dermatitis-Like Skin Lesions in NC/Nga Mice(Pharmacology) Biol Pharm Bull
                  </p>
                </li>
                <li className="bg-[#F8F9FA] p-4 rounded-lg">
                  <p className="text-xs text-[#8FA8BA] mb-1">2006</p>
                  <p className="text-sm text-[#3E5266] leading-relaxed">
                    Inhibitory effects of Rumex japonicus Houtt. on the development of atopic dermatitis-like skin lesions in NC/Nga mice. Br J Dermatol
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 고은상 한의사 */}
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-8">
          {/* 의사 사진 섹션 */}
          <div className="relative h-64 md:h-80">
            <img 
              src={DIRECTOR_2_IMAGE_URL} 
              alt="고은상 한의사" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* 정보 섹션 */}
          <div className="p-6 md:p-8">
            {/* 이름과 전문분야 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#3E5266] mb-2">고은상</h3>
              <p className="text-[#E91E7A] font-semibold text-lg">한의사</p>
            </div>
            
            {/* 학력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">학력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 한의학과 졸업</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 대학원 동서의학과 한의학 석사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>경희대학교 대학원 동서의학과 박사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>동수원 한방병원 내과 전문수련의</span>
                </li>
              </ul>
              
              <div className="h-4"></div>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>추나학회 정직원</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>미국 응용근신경학 전문의</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>미국 응용근신경학회 임상강사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>한국 응용근신경학회 총무이사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>한의기능영양학회 기술이사</span>
                </li>
              </ul>
            </div>
            
            {/* 경력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">경력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 가산의료재단 광동병원 센터장</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 이형복 한의사 */}
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-8">
          {/* 의사 사진 섹션 */}
          <div className="relative h-64 md:h-80">
            <img 
              src={DIRECTOR_3_IMAGE_URL} 
              alt="장영섭 의사" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* 정보 섹션 */}
          <div className="p-6 md:p-8">
            {/* 이름과 전문분야 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#3E5266] mb-2">장영섭</h3>
              <p className="text-[#E91E7A] font-semibold text-lg">의사 (일반외과 전문의)</p>
            </div>
            
            {/* 학력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">학력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>전남대학교 의과대학 졸업</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>전주예수병원 일반외과 수료</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>일반외과 전문의 자격증 취득</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>육군 군의관 소령 예편</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>서울시 의사회 의무이사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>일본 소화의과대학 의학박사 취득</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>대한임상노인학회 평생회원</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>IMS 회원 및 자격증 취득</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>치매특별등급 연수교육 수료</span>
                </li>
              </ul>
            </div>
            
            {/* 경력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">경력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 경기도 고양시 일산동구 일산로 123 뷰티풀한방병원 개원</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 경남 밀양시 영남종합병원 일반외과 및 응급실 실장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 인천시 영종도 화림요양병원 양방원장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 김포시 김포청심실버요양병원 원장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 인천 계양 경의병원 원장</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 이하림 치과의사 */}
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg mb-8">
          {/* 의사 사진 섹션 */}
          <div className="relative h-64 md:h-80">
            <img 
              src={DIRECTOR_4_IMAGE_URL} 
              alt="이하림 치과의사" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* 정보 섹션 */}
          <div className="p-6 md:p-8">
            {/* 이름과 전문분야 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#3E5266] mb-2">이하림</h3>
              <p className="text-[#E91E7A] font-semibold text-lg">치과의사 (보건복지부인증 통합치의학과 전문의)</p>
            </div>
            
            {/* 학력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">학력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>이화여자대학교 졸업</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>원광대학교 치과대학 졸업</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>고려대학교 임상치의학대학원 교정학과 석사</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>대한치과교정학회 회원</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>연세대학교 Orthodontic Mini Residency Course 수료</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>Dr.Kosujin Clinical Orthodontic Course 수료</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E91E7A] mt-2 flex-shrink-0" />
                  <span>Mini-Tube Appliance Orthodontic Course 수료</span>
                </li>
              </ul>
            </div>
            
            {/* 경력 */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#6B7D8C] mb-3">경력</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 분당형치과 교정과장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 강북디자인치과 교정과장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>전) 선한치과 교정대표원장</span>
                </li>
                <li className="flex items-start gap-2 text-[#3E5266]">
                  <Star className="w-4 h-4 text-[#E91E7A] mt-0.5 flex-shrink-0" />
                  <span>부평치과 디지털해피스치과 교정과장</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 기존 의료진 카드들 (필요시) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 0).map((doctor, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-[#1a2847] to-[#2d3f5f] h-32 flex items-center justify-center">
                <Users className="w-16 h-16 text-white/20" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1a2847] mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">경력</p>
                    <p className="text-gray-700">{doctor.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">학력</p>
                    <p className="text-gray-700">{doctor.education}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">학회 활동</p>
                    <ul className="space-y-1">
                      {doctor.activities.map((activity, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-2">
                          <Star className="w-3 h-3 text-[#1a2847] flex-shrink-0 mt-1" />
                          <span className="text-xs">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LocationSection() {
  return (
    <div className="space-y-8">
      {/* Map Image */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          찾아오시는 길
        </h2>
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
          <iframe
            src="https://www.google.com/maps?q=경기도+파주시+중앙로+94-9&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="뷰티풀한방병원 위치"
          ></iframe>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#1a2847] mb-2">주소 안내</p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">도로명(지번):</span> 경기도 파주시 중앙로 94-9 (금릉동 25) 뷰티풀한방병원
            </p>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bus className="w-5 h-5 text-[#1a2847]" />
            <h3 className="font-semibold text-[#1a2847]">대중교통 이용안내</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700 mb-1">지하철 / 버스</p>
                <p>경의중앙선 금촌역 하차</p>
                <p className="mt-1">버스정류장 [금촌역] 승차 / 버스정류장 [대창리] 하차</p>
                <p className="mt-1 text-blue-600 font-medium">H4 (032/062/064/065/066/068)</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="flex gap-4">
        <a
          href="https://map.kakao.com/link/search/경기도 파주시 중앙로 94-9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#1a2847] text-white py-3 rounded-md hover:bg-[#243554] transition-colors text-center"
        >
          카카오맵으로 길찾기
        </a>
        <a
          href="https://map.naver.com/v5/search/경기도 파주시 중앙로 94-9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border border-[#1a2847] text-[#1a2847] py-3 rounded-md hover:bg-gray-50 transition-colors text-center"
        >
          네이버 지도로 길찾기
        </a>
      </section>
    </div>
  );
}

function GuideSection() {
  return (
    <div className="space-y-8">
      {/* Operating Hours */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          진료 시간
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700 w-32">평일</td>
                <td className="px-6 py-4 text-gray-600">오전 9:00 - 오후 6:00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700">토요일</td>
                <td className="px-6 py-4 text-gray-600">오전 9:00 - 오후 1:00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700">공휴일</td>
                <td className="px-6 py-4 text-gray-600">오전 9:00 - 오후 1:00</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-700">일요일</td>
                <td className="px-6 py-4 text-gray-600">휴진</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700">설날추석당일</td>
                <td className="px-6 py-4 text-gray-600">휴진</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700">점심시간</td>
                <td className="px-6 py-4 text-gray-600">오후 12:30 - 오후 1:30</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          ※ 입원 환자는 24시간 의료진 상주
        </p>
      </section>

      {/* Admission Process */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          입원 절차 안내
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: "1", title: "상담 예약", desc: "전화 또는 온라인" },
            { step: "2", title: "초진 상담", desc: "의료진 진단" },
            { step: "3", title: "입원 결정", desc: "치료 계획 수립" },
            { step: "4", title: "입원 진행", desc: "치료 시작" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-[#1a2847] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                {item.step}
              </div>
              <h3 className="font-semibold text-[#1a2847] mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          필요 서류 안내
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#1a2847] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                초진 환자
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>신분증</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>건강보험증</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>진료 의뢰서 (타 병원 진료 시)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>검사 결과지 (있는 경우)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1a2847] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                입원 환자
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>초진 환자 서류 전체</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>입원 동의서</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>개인정보 수집 동의서</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Info */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1a2847] mb-6">
          보험 및 비용 안내
        </h2>
        <div className="bg-[#f5f6f8] rounded-lg p-6">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Award className="w-5 h-5 text-[#1a2847] flex-shrink-0 mt-0.5" />
              <span>
                <strong>건강보험 적용:</strong> 침술, 한약 등 일부 항목 건강보험 적용 가능
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="w-5 h-5 text-[#1a2847] flex-shrink-0 mt-0.5" />
              <span>
                <strong>실손보험 청구:</strong> 입원 치료 시 실손보험 청구 가능 (보험사별 상이)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="w-5 h-5 text-[#1a2847] flex-shrink-0 mt-0.5" />
              <span>
                <strong>비용 상담:</strong> 정확한 비용은 초진 후 개별 안내
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function NoticesSection() {
  const { user, isAdmin } = useAuth();
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  // ✅ Fetch notices - Supabase client 직접 사용
  const fetchNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching notices:', error);
        toast.error('공지사항을 불러오는데 실패했습니다');
      } else {
        setNotices(data || []);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('공지사항을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ✅ Create notice - Supabase client 직접 사용
  const handleCreateNotice = async () => {
    if (!formData.title || !formData.content) {
      toast.error('제목과 내용을 모두 입력해주세요');
      return;
    }

    if (!user) {
      toast.error('로그인이 필요합니다');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notices')
        .insert({
          title: formData.title,
          content: formData.content,
          author_id: user.id,
          is_published: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating notice:', error);
        toast.error(error.message || '공지사항 등록에 실패했습니다');
      } else {
        toast.success('공지사항이 등록되었습니다');
        setShowModal(false);
        setFormData({ title: '', content: '' });
        fetchNotices();
      }
    } catch (error) {
      console.error('Error creating notice:', error);
      toast.error('공지사항 등록에 실패했습니다');
    }
  };

  // ✅ Update notice - Supabase client 직접 사용
  const handleUpdateNotice = async () => {
    if (!formData.title || !formData.content) {
      toast.error('제목과 내용을 모두 입력해주세요');
      return;
    }

    if (!editingNotice) return;

    try {
      const { error } = await supabase
        .from('notices')
        .update({
          title: formData.title,
          content: formData.content,
        })
        .eq('id', editingNotice.id);

      if (error) {
        console.error('Error updating notice:', error);
        toast.error(error.message || '공지사항 수정에 실패했습니다');
      } else {
        toast.success('공지사항이 수정되었습니다');
        setShowModal(false);
        setEditingNotice(null);
        setFormData({ title: '', content: '' });
        fetchNotices();
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      toast.error('공지사항 수정에 실패했습니다');
    }
  };

  // ✅ Delete notice - Supabase client 직접 사용
  const handleDeleteNotice = async (noticeId: string) => {
    if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', noticeId);

      if (error) {
        console.error('Error deleting notice:', error);
        toast.error(error.message || '공지사항 삭제에 실패했습니다');
      } else {
        toast.success('공지사항이 삭제되었습니다');
        fetchNotices();
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('공지사항 삭제에 실패했습니다');
    }
  };

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({ title: '', content: '' });
    setShowModal(true);
  };

  const openEditModal = (notice: any) => {
    setEditingNotice(notice);
    setFormData({ title: notice.title, content: notice.content });
    setShowModal(true);
  };

  const toggleNoticeExpand = (noticeId: string) => {
    setExpandedNoticeId(expandedNoticeId === noticeId ? null : noticeId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1a2847] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#1a2847]">
            공지안내
          </h2>
          {isAdmin && (
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-[#1a2847] text-white px-4 py-2 rounded-md hover:bg-[#243554] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>공지 작성</span>
            </button>
          )}
        </div>

        {notices.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">등록된 공지사항이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => {
              const isExpanded = expandedNoticeId === notice.id;
              return (
                <div
                  key={notice.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* 제목 영역 - 클릭 가능 */}
                  <div
                    onClick={() => toggleNoticeExpand(notice.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <Bell className="w-5 h-5 text-[#E91E7A] flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-[#3E5266]">
                          {notice.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {new Date(notice.created_at).toLocaleDateString('ko-KR')}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 내용 영역 - 펼쳤을 때만 표시 */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {notice.content}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              작성일: {new Date(notice.created_at).toLocaleDateString('ko-KR')}
                            </span>
                            {notice.updated_at !== notice.created_at && (
                              <span>
                                수정일: {new Date(notice.updated_at).toLocaleDateString('ko-KR')}
                              </span>
                            )}
                          </div>
                          {isAdmin && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(notice);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="수정"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNotice(notice.id);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="삭제"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#1a2847]">
                {editingNotice ? '공지사항 수정' : '공지사항 작성'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2847]"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2847] resize-none"
                  placeholder="공지사항 내용을 입력하세요"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingNotice(null);
                  setFormData({ title: '', content: '' });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={editingNotice ? handleUpdateNotice : handleCreateNotice}
                className="px-4 py-2 bg-[#1a2847] text-white rounded-md hover:bg-[#243554] transition-colors"
              >
                {editingNotice ? '수정' : '등록'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}