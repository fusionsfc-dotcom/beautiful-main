/**
 * DetailedCardSection — "detailed" 레이아웃 카드 섹션
 * 구조: 라벨 배너 → 이미지 → 제목+설명 → 체크리스트
 * 사용: 약침치료 등 visualCardsLayout: "detailed"
 */
import { Leaf, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { TreatmentVisualCard } from "../../types/treatment";

interface DetailedCardProps {
  card: TreatmentVisualCard;
  colors: { main: string; bg: string };
}

function DetailedCard({ card, colors }: DetailedCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* 상단 라벨 배너 */}
      {card.badge && (
        <div
          className="py-2.5 px-4 text-center text-white text-[13px] font-extrabold tracking-wide"
          style={{ backgroundColor: "#6A5542" }}
        >
          {card.badge}
        </div>
      )}

      {/* 이미지 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={card.image}
          alt={card.badge ?? card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* 본문 */}
      <div className="px-5 py-5 flex-1 flex flex-col gap-3">
        {/* 제목 + 설명 */}
        <div>
          <p className="text-[13px] text-[#2F2A26] font-bold leading-snug">
            {card.title}
          </p>
          {card.description?.map((line, i) => (
            <p key={i} className="text-[13px] text-[#2F2A26] leading-snug">
              {line}
            </p>
          ))}
        </div>

        {/* 구분선 */}
        {card.checkList && card.checkList.length > 0 && (
          <div className="h-px bg-[#D8CDBE]" />
        )}

        {/* 체크리스트 */}
        {card.checkList && card.checkList.length > 0 && (
          <ul className="space-y-2">
            {card.checkList.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  size={15}
                  strokeWidth={2}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: colors.main }}
                />
                <span className="text-[12px] text-[#2F2A26] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

interface DetailedCardSectionProps {
  title: string;
  cards: TreatmentVisualCard[];
  colors: { main: string; bg: string; label: string };
  carousel?: boolean;
}

export default function DetailedCardSection({
  title,
  cards,
  colors,
  carousel = false,
}: DetailedCardSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="px-5 lg:px-8 py-10 lg:py-14 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">{title}</h2>
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} />
        </div>

        {carousel ? (
          /* ── 캐러셀 모드 ── */
          <div className="relative">
            {/* 좌측 화살표 */}
            <button
              onClick={scrollPrev}
              aria-label="이전 카드"
              className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6A5542] items-center justify-center shadow-md hover:bg-[#7C654F] transition-colors"
            >
              <ChevronLeft size={20} color="white" strokeWidth={2} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-5 items-stretch">
                {cards.map((card, i) => (
                  <div
                    key={card.badge ?? i}
                    className="flex-none w-[85%] sm:w-[33.333%] min-w-0 pl-5"
                  >
                    <DetailedCard card={card} colors={colors} />
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 화살표 */}
            <button
              onClick={scrollNext}
              aria-label="다음 카드"
              className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6A5542] items-center justify-center shadow-md hover:bg-[#7C654F] transition-colors"
            >
              <ChevronRight size={20} color="white" strokeWidth={2} />
            </button>

            {/* 도트 인디케이터 */}
            <div className="flex justify-center gap-2 mt-5">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`${i + 1}번 카드`}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === selectedIndex ? colors.main : "#D8CDBE",
                    transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── 정적 그리드 모드 ── */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <DetailedCard key={card.badge ?? i} card={card} colors={colors} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
