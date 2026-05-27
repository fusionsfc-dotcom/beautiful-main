/** TreatmentCarousel — 한방·양방 치료 캐러셀 (theme prop으로 컬러 분기) */
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TreatmentCard from "./TreatmentCard";
import { themeColors } from "../../../data/integratedCareData";
import type { TreatmentGroup } from "../../../data/integratedCareData";

interface TreatmentCarouselProps {
  group: TreatmentGroup;
}

export default function TreatmentCarousel({ group }: TreatmentCarouselProps) {
  const color = themeColors[group.theme];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-12 lg:py-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-7">
          <div className="flex items-start gap-4">
            {/* 테마 컬러 세로 막대 */}
            <div
              className="w-1 rounded-full mt-1 self-stretch min-h-[40px]"
              style={{ backgroundColor: color.main }}
            />
            <div>
              {/* 알약 뱃지 */}
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-white text-[11px] font-bold mb-2"
                style={{ backgroundColor: color.main }}
              >
                {group.badgeLabel}
              </span>
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2A1F18] leading-snug">
                {group.title}
              </h2>
            </div>
          </div>
          <p className="text-[13px] text-[#6B5547] lg:max-w-xs lg:text-right leading-relaxed">
            {group.subtitle}
          </p>
        </div>

        {/* 캐러셀 */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {group.treatments.map((t) => (
              <div
                key={t.name}
                // 모바일: 85% 폭 (peek), 데스크탑: 1/3
                className="flex-[0_0_85%] md:flex-[0_0_calc(33.333%-11px)] min-w-0"
              >
                <TreatmentCard treatment={t} theme={group.theme} />
              </div>
            ))}
          </div>
        </div>

        {/* 화살표 + 도트 인디케이터 */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="이전"
              className="w-9 h-9 rounded-full text-white flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: color.main }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="다음"
              className="w-9 h-9 rounded-full text-white flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: color.main }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* 도트 */}
          <div className="flex gap-2">
            {group.treatments.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`${i + 1}번 슬라이드`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === selected ? 24 : 10,
                  height: 10,
                  backgroundColor: i === selected ? color.main : "#E8DCC8",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
