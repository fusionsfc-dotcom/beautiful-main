/** WhyBeautifulCarousel — 왜 뷰티풀이어야 하나요? (4가지 이유) */
// TODO: 각 이미지 실제 사진으로 교체 필요 (/public/images/redesign/why-*.jpg)

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const SLIDES = [
  {
    number: "1",
    title: "호텔을 리모델링한\n쾌적하고 고급스러운 입원실",
    description:
      "프라이빗한 1인실과 호텔식 시설로\n편안한 치료와 휴식을 제공합니다.",
    features: [
      { icon: "🏢", text: "전 병실 1인실 위주 구성" },
      { icon: "🛏", text: "호텔식 고급 인테리어" },
      { icon: "🛡", text: "감염 걱정 없는 쾌적한 환경" },
    ],
    // TODO: 실제 사진 교체 필요 — 1인실 침대 이미지 (창문, 베이지 톤)
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room/room1.jpg",
  },
  {
    number: "2",
    title: "국립암센터와 15분,\n자연 속에서 집중 회복",
    description:
      "도심의 소음을 벗어나\n자연 환경에서 치료에만 집중할 수 있습니다.",
    features: [
      { icon: "🌿", text: "조용한 자연 중심 위치" },
      { icon: "🚗", text: "국립암센터 차량 15분" },
      { icon: "🏞", text: "쾌적한 자연 회복 환경" },
    ],
    // TODO: 실제 사진 교체 필요 — 병원 외관 또는 자연 풍경
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/loca.jpeg",
  },
  {
    number: "3",
    title: "20년 이상 경력\n전문 의료진의 통합 케어",
    description:
      "한의학 박사 이형석 병원장을 중심으로\n양·한·치과 통합 치료를 제공합니다.",
    features: [
      { icon: "🩺", text: "암 치료 전문 한의사" },
      { icon: "💊", text: "양·한·치과 협진 체계" },
      { icon: "📋", text: "개인 맞춤 치료 계획" },
    ],
    // TODO: 실제 사진 교체 필요 — 의료진 상담 장면
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png",
  },
  {
    number: "4",
    title: "항암·방사선 치료를\n건강하게 이어가는 관리",
    description:
      "체력과 면역이 무너지지 않도록\n치료와 병행하는 체계적인 회복 관리.",
    features: [
      { icon: "💪", text: "면역·체력 집중 관리" },
      { icon: "🌡", text: "부작용 완화 한방 치료" },
      { icon: "🔄", text: "치료 중단 없는 연속 케어" },
    ],
    // TODO: 실제 사진 교체 필요 — 치료 장면
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic_onco.jpeg",
  },
];

export default function WhyBeautifulCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-[#F8F3EA] py-8 lg:py-16">
      {/* 헤더 */}
      <div className="px-5 lg:max-w-6xl lg:mx-auto lg:px-8 mb-5 lg:mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#9A856D] tracking-widest mb-1.5 uppercase">
              Why Beautiful
            </p>
            <h2 className="text-[22px] sm:text-2xl lg:text-3xl font-extrabold text-[#2F2A26] leading-snug whitespace-nowrap">
              왜 뷰티풀이어야 하나요?
            </h2>
            <p className="text-sm text-[#756A60] mt-1.5">
              암 환자를 위한 특별한 4가지 이유
            </p>
          </div>
          {/* 페이지 인디케이터 */}
          <span className="text-lg font-bold text-[#6A5542] mt-1">
            {selectedIndex + 1}{" "}
            <span className="text-[#D8CDBE] font-normal">/ {SLIDES.length}</span>
          </span>
        </div>
      </div>

      {/* 캐러셀 */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide) => (
            <div
              key={slide.number}
              className="flex-[0_0_100%] min-w-0 px-5 lg:max-w-6xl lg:mx-auto lg:px-8"
            >
              <div className="bg-[#EFE7DC] rounded-2xl overflow-hidden flex flex-col lg:flex-row lg:items-stretch">
                {/* 텍스트 영역 */}
                <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-extrabold text-[#2F2A26] leading-snug mb-3 whitespace-pre-line">
                      {slide.title}
                    </h3>
                  </div>

                  {/* 특징 리스트 — 이모지 대신 단색 말머리로 통일 */}
                  <div className="flex flex-col gap-2.5">
                    {slide.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#9A856D] flex-shrink-0" />
                        <span className="text-sm text-[#6A5542] font-medium">
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 이미지 영역 */}
                <div className="w-full lg:w-[300px] lg:flex-shrink-0 h-52 lg:h-auto relative">
                  {/* TODO: 실제 사진 교체 필요 */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 화살표 + 도트 인디케이터 */}
      <div className="flex items-center justify-between px-5 lg:max-w-6xl lg:mx-auto lg:px-8 mt-6">
        {/* 좌우 화살표 */}
        <div className="flex gap-3">
          <button
            onClick={scrollPrev}
            aria-label="이전"
            className="w-10 h-10 rounded-full bg-[#9A856D] text-white flex items-center justify-center hover:bg-[#7C654F] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="다음"
            className="w-10 h-10 rounded-full bg-[#9A856D] text-white flex items-center justify-center hover:bg-[#7C654F] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* 도트 인디케이터 */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`${i + 1}번 슬라이드`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-6 h-2.5 bg-[#9A856D]"
                  : "w-2.5 h-2.5 bg-[#D8CDBE]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
