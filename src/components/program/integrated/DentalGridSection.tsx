import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import DentalCard from "./DentalCard";
import type { TreatmentGroup } from "../../../data/integratedCareData";

const DENTAL_MAIN = "#6A5542";

interface DentalGridSectionProps {
  group: TreatmentGroup;
}

export default function DentalGridSection({ group }: DentalGridSectionProps) {
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
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-12 lg:py-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-7">
          <div className="flex items-start gap-4">
            <div
              className="w-1 rounded-full mt-1 self-stretch min-h-[40px]"
              style={{ backgroundColor: DENTAL_MAIN }}
            />
            <div>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-white text-[11px] font-bold mb-2"
                style={{ backgroundColor: DENTAL_MAIN }}
              >
                {group.badgeLabel}
              </span>
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26] leading-snug">
                {group.title}
              </h2>
            </div>
          </div>
          <p className="text-[13px] text-[#756A60] lg:max-w-xs lg:text-right leading-relaxed">
            {group.subtitle}
          </p>
        </div>

        {/* 가로형 슬라이드 (한방·양방 섹션과 동일한 동작) */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {group.treatments.map((t) => (
              <div
                key={t.slug}
                className="flex-[0_0_85%] md:flex-[0_0_33.333%] min-w-0 pl-4"
              >
                <DentalCard treatment={t} />
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
              style={{ backgroundColor: DENTAL_MAIN }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="다음"
              className="w-9 h-9 rounded-full text-white flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: DENTAL_MAIN }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

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
                  backgroundColor: i === selected ? DENTAL_MAIN : "#D8CDBE",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
