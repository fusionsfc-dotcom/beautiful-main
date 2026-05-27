/** CoreProgramsCarousel — 핵심 치료 프로그램 캐러셀 */
// TODO: 각 이미지 실제 사진으로 교체 필요 (/public/images/redesign/program-*.jpg)

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";

/** 선 일러스트 아이콘 SVG 컴포넌트들 */
function EnzymeSteamIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#3D2817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="30" width="36" height="18" rx="4" />
      <path d="M16 30V26a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" />
      <path d="M22 8c0 4-4 6-4 10" />
      <path d="M28 6c0 4-4 6-4 10" />
      <path d="M34 8c0 4-4 6-4 10" />
    </svg>
  );
}

function RehabIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#3D2817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="12" r="4" />
      <path d="M28 16v14" />
      <path d="M18 22l10 4 10-4" />
      <path d="M20 30l-4 14" />
      <path d="M36 30l4 14" />
    </svg>
  );
}

function PilatesIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#3D2817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="32" width="44" height="6" rx="3" />
      <circle cx="28" cy="20" r="4" />
      <path d="M28 24l-6 8h12l-6-8z" />
      <path d="M16 38v6" />
      <path d="M40 38v6" />
    </svg>
  );
}

function AcupunctureIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#3D2817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="28" r="16" />
      <path d="M28 12v4M28 40v4M12 28h4M40 28h4" />
      <circle cx="28" cy="28" r="4" />
      <path d="M28 28l-8-8" />
    </svg>
  );
}

const PROGRAMS = [
  {
    id: "enzyme-steam",
    icon: <EnzymeSteamIcon />,
    title: "효소찜질",
    description: "천연 효소와 한방 약재를 활용한 온열 찜질 치료. 혈액순환과 면역력 강화에 효과적입니다.",
    tag: "온열 치료",
  },
  {
    id: "rehab",
    icon: <RehabIcon />,
    title: "운동재활",
    description: "암 치료 중·후 체력 저하 회복을 위한 맞춤형 재활 운동 프로그램입니다.",
    tag: "재활 치료",
  },
  {
    id: "pilates",
    icon: <PilatesIcon />,
    title: "항암필라테스",
    description: "암 환자 특성에 맞게 설계된 저강도 필라테스로 근력과 균형을 회복합니다.",
    tag: "기능 회복",
  },
  {
    id: "acupuncture",
    icon: <AcupunctureIcon />,
    title: "침구 치료",
    description: "전통 침술과 뜸 치료로 면역 강화, 통증 완화, 기력 회복을 돕습니다.",
    tag: "한방 치료",
  },
];

export default function CoreProgramsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="bg-[#F5EEE0] py-14 lg:py-20">
      {/* 헤더 */}
      <div className="px-5 lg:max-w-6xl lg:mx-auto lg:px-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#C9A567] tracking-widest mb-2 uppercase">
              Treatment Programs
            </p>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#2A1F18]">
              핵심 치료 프로그램
            </h2>
          </div>
          {/* 화살표 */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={scrollPrev}
              aria-label="이전"
              className="w-9 h-9 rounded-full bg-[#3D2817] text-white flex items-center justify-center hover:bg-[#5B3A1F] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              aria-label="다음"
              className="w-9 h-9 rounded-full bg-[#3D2817] text-white flex items-center justify-center hover:bg-[#5B3A1F] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 캐러셀 */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 pl-5 lg:pl-8 pr-5 lg:pr-8">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="flex-[0_0_260px] lg:flex-[0_0_300px] min-w-0 bg-[#FAF6EE] rounded-2xl p-6 border border-[#E8DCC8] flex flex-col"
            >
              {/* 아이콘 */}
              <div className="mb-4">{program.icon}</div>
              {/* 태그 */}
              <span className="text-[11px] text-[#8B2A1F] bg-[#8B2A1F]/10 px-2.5 py-1 rounded-full w-fit mb-3 font-medium">
                {program.tag}
              </span>
              {/* 제목 */}
              <h3 className="text-lg font-extrabold text-[#2A1F18] mb-2">
                {program.title}
              </h3>
              {/* 설명 */}
              <p className="text-sm text-[#6B5547] leading-relaxed flex-1">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 도트 + 버튼 */}
      <div className="flex items-center justify-between px-5 lg:max-w-6xl lg:mx-auto lg:px-8 mt-6">
        {/* 도트 인디케이터 */}
        <div className="flex gap-2">
          {PROGRAMS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`${i + 1}번 슬라이드`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-6 h-2.5 bg-[#3D2817]"
                  : "w-2.5 h-2.5 bg-[#E8DCC8]"
              }`}
            />
          ))}
        </div>

        {/* 전체 보기 */}
        <Link
          to="/clinics"
          className="inline-flex items-center gap-1.5 text-sm text-[#3D2817] font-semibold border border-[#3D2817] px-4 py-2 rounded-lg hover:bg-[#3D2817] hover:text-white transition-colors"
        >
          전체 치료 프로그램 보기
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
