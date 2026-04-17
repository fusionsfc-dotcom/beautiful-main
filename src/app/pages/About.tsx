import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
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
  AlertTriangle,
  ArrowDown,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import SEOHead from "../../components/seo/SEOHead";
/** Hero 배경 이미지 (calm hospital) */
const HERO_BG_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/yoga_s.jpeg";
/** 이형석 병원장 사진 */
const DIRECTOR_IMAGE_URL =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/doc/doc_ceo.jpeg";
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

type NoticeFeeRow = {
  item: string;
  price: string;
};

type NoticeFeeSection = {
  title: string;
  rows: NoticeFeeRow[];
};

const tabs = [
  { id: "intro" as TabType, label: "병원소개" },
  { id: "doctors" as TabType, label: "의료진" },
  { id: "location" as TabType, label: "오시는길" },
  { id: "guide" as TabType, label: "진료안내" },
  { id: "notices" as TabType, label: "공지안내" },
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

const NOTICE_PRICE_PATTERN = /^\d[\d,\s~/]*$/;

function parseNoticeFeeSections(content: string): NoticeFeeSection[] | null {
  const lines = content
    .split("\n")
    .map((line) => line.replace(/\r/g, "").trimEnd())
    .filter((line) => line.trim());

  const sections: NoticeFeeSection[] = [];
  const sectionByTitle = new Map<string, NoticeFeeSection>();
  let currentSection: NoticeFeeSection | null = null;
  let pricedRowCount = 0;

  for (const line of lines) {
    const rawColumns = line.split(/\t+| {2,}/).map((column) => column.trim());
    const columns = rawColumns.filter(Boolean);

    if (columns.length < 2) {
      continue;
    }

    const price = columns[columns.length - 1];
    if (!NOTICE_PRICE_PATTERN.test(price)) {
      continue;
    }

    const bodyColumns = columns.slice(0, -1);
    if (bodyColumns.length === 0) {
      continue;
    }

    let sectionTitle = currentSection?.title ?? "";
    let item = "";

    if (bodyColumns.length === 1) {
      if (!currentSection) {
        continue;
      }
      item = bodyColumns[0];
    } else {
      const firstColumn = bodyColumns[0];
      const remainingColumns = bodyColumns.slice(1).join(" ");

      if (firstColumn.startsWith("(") && currentSection) {
        const mergedTitle = `${currentSection.title} ${firstColumn}`
          .replace(/\s+/g, " ")
          .trim();

        if (mergedTitle !== currentSection.title) {
          sectionByTitle.delete(currentSection.title);
          currentSection.title = mergedTitle;
          sectionByTitle.set(currentSection.title, currentSection);
        }

        sectionTitle = currentSection.title;
        item = remainingColumns;
      } else {
        sectionTitle = firstColumn;
        item = remainingColumns;
      }
    }

    if (!sectionTitle || !item) {
      continue;
    }

    let section = sectionByTitle.get(sectionTitle);
    if (!section) {
      section = { title: sectionTitle, rows: [] };
      sections.push(section);
      sectionByTitle.set(sectionTitle, section);
    }

    section.rows.push({ item, price });
    currentSection = section;
    pricedRowCount += 1;
  }

  if (sections.length < 2 || pricedRowCount < 6) {
    return null;
  }

  return sections;
}

function NoticeContent({ content }: { content: string }) {
  const feeSections = parseNoticeFeeSections(content);

  if (!feeSections) {
    return (
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {content}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {feeSections.map((section) => (
        <div
          key={section.title}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <div className="bg-[#1a2847] px-4 py-3">
            <h4 className="font-semibold text-white">{section.title}</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a2847]">
                    항목
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-[#1a2847] whitespace-nowrap">
                    비용(원)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {section.rows.map((row, index) => (
                  <tr
                    key={`${section.title}-${row.item}-${row.price}-${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {row.item}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-[#1a2847] whitespace-nowrap">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("intro");
  const navigate = useNavigate();

  const doctorImages = [DIRECTOR_IMAGE_URL, DIRECTOR_2_IMAGE_URL, DIRECTOR_3_IMAGE_URL, DIRECTOR_4_IMAGE_URL];

  const aboutJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "뷰티풀한방병원",
      "url": "https://www.btful.co.kr",
      "telephone": "031-945-2000",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KR",
        "addressRegion": "경기도",
        "addressLocality": "파주시",
        "streetAddress": "중양로 94-9",
      },
      "medicalSpecialty": ["한방 암 치료", "통합 면역 치료", "중풍 재활", "이명 치료", "척추·관절 치료"],
      "areaServed": ["파주시", "고양시", "일산", "경기 북부"],
      "knowsAbout": ["암요양병원", "국립암센터 근처 요양병원", "항암 후 회복", "암환자 면역 치료"],
      "employee": doctors.map((doc, i) => ({
        "@type": "Physician",
        "name": doc.name.replace(" 원장", ""),
        "jobTitle": "원장",
        "medicalSpecialty": doc.specialty,
        "description": doc.experience,
        "alumniOf": doc.education,
        "memberOf": doc.activities.map((a) => ({ "@type": "Organization", "name": a })),
        ...(doctorImages[i] ? { "image": doctorImages[i] } : {}),
      })),
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">
      <SEOHead
        title="병원소개 | 뷰티풀한방병원 · 국립암센터 인근 암요양병원"
        description="경기도 파주시 소재 암요양병원 뷰티풀한방병원 소개. 국립암센터 차량 15분, 일산·고양 인근. 통합 암 면역 회복 전문 한방병원. 의료진, 진료 철학, 위치 안내."
        keywords="뷰티풀한방병원,암요양병원,파주암요양병원,국립암센터근처암요양병원,일산암요양병원,고양암요양병원,파주한방병원,병원소개,한방의료진"
        ogUrl="https://www.btful.co.kr/about"
        canonical="https://www.btful.co.kr/about"
        jsonLd={aboutJsonLd}
      />
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

const whyCards = [
  {
    title: "항암, 방사선 치료를 멈추지 않게 만드는 관리",
    desc1: "체력이 무너지면 치료는 중단됩니다.",
    desc2: "면역과 체력을 유지하는 것이 치료의 연장입니다.",
  },
  {
    title: "도심이 아닌, 회복에 집중하는 환경",
    desc1: "병원은 치료하는 곳이지만",
    desc2: "회복은 환경에서 시작됩니다.",
  },
  {
    title: "입원과 외래를 함께 운영하는 구조",
    desc1: "상태에 따라 입원과 외래를",
    desc2: "유연하게 선택할 수 있습니다.",
  },
  {
    title: "양·한·치과 통합 치료",
    desc1: "한 가지 방법이 아니라",
    desc2: "여러 치료를 통합해 접근합니다.",
  },
];

const problemSignals = [
  "항암 중 체력이 급격히 떨어지는 경우",
  "백혈구 수치 저하로 치료가 지연되는 경우",
  "수술 후 회복이 더딘 경우",
  "통증과 피로로 일상이 무너진 경우",
];

const coreSteps = [
  { step: "신경 긴장 안정", result: "회복 시작" },
  { step: "순환 회복", result: "기능 정상화" },
  { step: "압박 해소", result: "통증 감소" },
];

function IntroSection() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-8">
      {/* 1. HERO SECTION */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden rounded-2xl lg:rounded-3xl min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        />
        <div className="absolute inset-0 bg-[#1a2847]/70" />
        <div className="relative z-10 px-4 sm:px-6 py-16 lg:py-24 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 lg:mb-5">
            국립암센터 치료를 이어가면서
            <br />
            회복까지 함께 관리하는 병원
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 lg:mb-10 leading-relaxed">
            항암, 방사선치료를 건강하게 받고
            <br />
            암 이후의 건강한 삶까지 만드는 공간
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "국립암센터 차량 15분",
              "호텔 리모델링 입원 환경",
              "양·한·치과 협진",
            ].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY SECTION */}
      <section>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a2847] mb-8 lg:mb-12 text-center">
          왜 국립암센터 환자들이 이곳을 선택할까요?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#1a2847]/20 transition-all duration-300"
            >
              <h3 className="font-bold text-[#1a2847] text-base lg:text-lg mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.desc1}
                <br />
                {card.desc2}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROBLEM AWARENESS */}
      <section className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-6 sm:p-8 lg:p-10">
        <div className="flex items-start gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2847]">
            이런 상태라면, 이미 신호입니다
          </h2>
        </div>
        <ul className="space-y-3 mb-6">
          {problemSignals.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold text-amber-800 text-base sm:text-lg bg-amber-100/80 rounded-lg px-4 py-3">
          이 상태를 방치하면 치료 자체가 흔들릴 수 있습니다
        </p>
      </section>

      {/* 4. TREATMENT FLOW */}
      <section>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a2847] mb-8 lg:mb-12 text-center">
          치료는 병원에서, 회복은 여기서 이어집니다
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          <div className="flex-1 max-w-xs w-full bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <Building2 className="w-10 h-10 text-[#1a2847] mx-auto mb-3" />
            <p className="font-semibold text-[#1a2847]">대학병원 치료</p>
            <p className="text-sm text-gray-600 mt-1">
              (수술 / 항암 / 방사선)
            </p>
          </div>
          <div className="hidden lg:flex items-center text-gray-400">
            <ArrowDown className="w-8 h-8 rotate-[-90deg]" />
          </div>
          <div className="lg:hidden text-gray-400">
            <ArrowDown className="w-8 h-8 mx-auto" />
          </div>
          <div className="flex-1 max-w-xs w-full bg-[#1a2847] text-white rounded-xl p-6 text-center shadow-md">
            <Heart className="w-10 h-10 mx-auto mb-3 text-white" />
            <p className="font-semibold">뷰티풀한방병원</p>
            <p className="text-sm text-white/90 mt-1">
              (면역 / 체력 / 통증 관리)
            </p>
          </div>
          <div className="hidden lg:flex items-center text-gray-400">
            <ArrowDown className="w-8 h-8 rotate-[-90deg]" />
          </div>
          <div className="lg:hidden text-gray-400">
            <ArrowDown className="w-8 h-8 mx-auto" />
          </div>
          <div className="flex-1 max-w-xs w-full bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="font-semibold text-[#1a2847]">일상 복귀</p>
          </div>
        </div>
      </section>

      {/* 5. CORE SYSTEM */}
      <section>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a2847] mb-8 lg:mb-12 text-center">
          몸이 버틸 수 있도록 만드는 치료 구조
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {coreSteps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-[#1a2847]">{item.step}</p>
              <p className="text-sm text-gray-500 mt-1">→</p>
              <p className="font-medium text-gray-700 mt-2">{item.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ENVIRONMENT */}
      <section className="bg-[#f5f6f8] rounded-xl p-6 sm:p-8 lg:p-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a2847] mb-6 text-center">
          치료가 아닌 &apos;회복&apos;을 위한 공간
        </h2>
        <ul className="space-y-4 mb-6 max-w-2xl mx-auto">
          {[
            "고급 호텔을 리모델링한 입원 환경",
            "조용하고 안정적인 자연 중심 위치",
            "환자 맞춤 식단 및 생활 관리",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-center font-medium text-[#1a2847] text-lg">
          몸이 회복되기 위해 필요한 모든 조건을 갖춘 공간입니다
        </p>
      </section>

      {/* 7. SYSTEM SIMPLIFICATION */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1a2847] mb-6 text-center">
          치료를 나누지 않습니다
          <br />
          <span className="text-lg font-medium text-gray-600 mt-2 block">
            하나의 흐름으로 관리합니다
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <span className="px-5 py-3 bg-white border border-gray-200 rounded-lg font-medium text-[#1a2847] shadow-sm">
            대학병원 치료
          </span>
          <span className="text-gray-400">→</span>
          <span className="px-5 py-3 bg-white border border-gray-200 rounded-lg font-medium text-[#1a2847] shadow-sm">
            회복 관리
          </span>
          <span className="text-gray-400">→</span>
          <span className="px-5 py-3 bg-white border border-gray-200 rounded-lg font-medium text-[#1a2847] shadow-sm">
            재발 관리
          </span>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section
        id="about-cta"
        className="bg-[#1a2847] rounded-xl p-8 sm:p-10 lg:p-12 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          지금 상태라면, 관리가 필요합니다
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          치료를 계속 이어가기 위해
          <br />
          몸의 상태를 먼저 확인해보세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/health-check"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#E91E7A] text-white font-semibold rounded-lg hover:bg-[#d01a6d] transition-colors shadow-md"
          >
            3분 상태 체크
          </Link>
          <Link
            to="/reservation"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/40 hover:bg-white/30 transition-colors"
          >
            상담 예약
          </Link>
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
                        <NoticeContent content={notice.content} />
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