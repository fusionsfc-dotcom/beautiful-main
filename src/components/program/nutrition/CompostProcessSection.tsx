import { Leaf, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CompostStepCard from "./CompostStepCard";
import { compostSteps } from "../../../data/nutritionData";

export default function CompostProcessSection() {
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
    <section className="bg-[#FFFFFF] px-5 lg:px-8 py-14 lg:py-18">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── 좌측 텍스트 (30%) ── */}
        <div className="lg:w-[30%] lg:flex-shrink-0 flex flex-col gap-5">
          <Leaf size={42} color="#9A856D" strokeWidth={1.5} />
          <h2 className="text-[30px] lg:text-[32px] font-extrabold text-[#2F2A26] leading-snug">
            건강한 토양에서 자란
            <br />
            건강한 식재료
          </h2>
          <p className="text-[16px] lg:text-[17px] text-[#756A60] leading-relaxed">
            정확한 영양 공급으로 면역력을 높이고
            <br />
            건강한 회복을 함께 만들어갑니다.
          </p>
        </div>

        {/* ── 우측 4단계 카드 + 화살표 (70%) ── */}
        <div className="flex-1">
          {/* 데스크탑: 가로 4열 + 화살표 */}
          <div className="hidden lg:flex items-center gap-3">
            {compostSteps.map((step, i) => (
              <div key={step.number} className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-1">
                  <CompostStepCard step={step} />
                </div>
                {i < compostSteps.length - 1 && (
                  <ChevronRight size={24} color="#9A856D" strokeWidth={2.5} className="flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* 모바일/태블릿: 가로형 슬라이드 */}
          <div className="lg:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {compostSteps.map((step) => (
                  <div key={step.number} className="flex-[0_0_82%] sm:flex-[0_0_48%] min-w-0">
                    <CompostStepCard step={step} />
                  </div>
                ))}
              </div>
            </div>

            {/* 모바일 슬라이드 컨트롤 */}
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="이전"
                  className="w-9 h-9 rounded-full bg-[#9A856D] text-white flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="다음"
                  className="w-9 h-9 rounded-full bg-[#9A856D] text-white flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2">
                {compostSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`${i + 1}번 슬라이드`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === selected ? 24 : 10,
                      height: 10,
                      backgroundColor: i === selected ? "#6A5542" : "#D8CDBE",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
