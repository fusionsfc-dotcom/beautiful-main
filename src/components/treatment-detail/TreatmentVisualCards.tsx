import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { TreatmentVisualCard } from "../../types/treatment";
import DetailedCardSection from "./DetailedCardSection";

interface CardProps {
  card: TreatmentVisualCard;
  colors: { main: string; bg: string };
}

/** 기본 카드 — 번호 뱃지 + 이미지 + 제목/부제 (왕뜸·뇌신경뜸) */
function VisualCard({ card, colors }: CardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-visible shadow-sm relative flex flex-col">
      {/* 번호 뱃지 — number가 있을 때만 표시 */}
      {card.number && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-md"
          style={{ backgroundColor: colors.bg, color: colors.main }}
        >
          <span className="text-[13px] font-extrabold">{card.number}</span>
        </div>
      )}

      {/* 이미지 */}
      <div className={`relative aspect-[4/3] overflow-hidden rounded-t-2xl ${card.number ? "mt-2" : ""}`}>
        {/* TODO: 실제 치료 효과 사진으로 교체 */}
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* 텍스트 */}
      <div className="px-4 py-4 text-center flex-1 flex flex-col justify-center">
        <h4 className="text-[15px] font-extrabold text-[#2F2A26] mb-1">{card.title}</h4>
        {card.subtitle && (
          <p className="text-[12px] text-[#756A60] whitespace-pre-line">{card.subtitle}</p>
        )}
      </div>
    </div>
  );
}

/** 단순 카드 — 정사각 이미지 + 라벨만 (침 치료 grid6) */
function SimpleCard({ card }: { card: TreatmentVisualCard }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="relative aspect-square">
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="px-3 py-3 text-center">
        <h4 className="text-[13px] sm:text-[14px] font-extrabold text-[#2F2A26]">{card.title}</h4>
      </div>
    </div>
  );
}

interface CarouselProps {
  title: string;
  cards: TreatmentVisualCard[];
  colors: { main: string; bg: string; label: string };
}

function CarouselCards({ title, cards, colors }: CarouselProps) {
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
        <div className="flex items-center justify-center gap-2 mb-12">
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">{title}</h2>
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} />
        </div>

        <div className="relative">
          <button
            onClick={scrollPrev}
            aria-label="이전 카드"
            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6A5542] items-center justify-center shadow-md hover:bg-[#7C654F] transition-colors"
          >
            <ChevronLeft size={20} color="white" strokeWidth={2} />
          </button>

          <div className="overflow-hidden pt-5 pb-8" ref={emblaRef}>
            <div className="flex -ml-6">
              {cards.map((card, i) => (
                <div
                  key={card.number ?? i}
                  className="flex-none w-[80%] sm:w-[33.333%] min-w-0 pl-6"
                >
                  <VisualCard card={card} colors={colors} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            aria-label="다음 카드"
            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#6A5542] items-center justify-center shadow-md hover:bg-[#7C654F] transition-colors"
          >
            <ChevronRight size={20} color="white" strokeWidth={2} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-2">
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
    </section>
  );
}

interface TreatmentVisualCardsProps {
  title: string;
  cards: TreatmentVisualCard[];
  colors: { main: string; bg: string; label: string };
  /** true면 embla 캐러셀 동작, 기본값 false */
  carousel?: boolean;
  /** "grid6" → 6장 2×3 정사각 그리드, 기본값 "default" */
  layout?: "default" | "grid6";
}

export default function TreatmentVisualCards({
  title,
  cards,
  colors,
  carousel = false,
  layout = "default",
}: TreatmentVisualCardsProps) {
  // detailed 모드 — 약침치료: 라벨배너+사진+제목+설명+체크리스트
  if (layout === "detailed") {
    return (
      <DetailedCardSection
        title={title}
        cards={cards}
        colors={colors}
        carousel={carousel}
      />
    );
  }

  // grid6 모드 — 침 치료: 6장 2×3, 사진+라벨만
  if (layout === "grid6") {
    return (
      <section className="px-5 lg:px-8 py-10 lg:py-14 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
            <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">{title}</h2>
            <Leaf size={14} color="#9A856D" strokeWidth={1.8} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {cards.map((card, i) => (
              <SimpleCard key={card.title ?? i} card={card} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 캐러셀 모드 — 뇌신경뜸
  if (carousel) {
    return <CarouselCards title={title} cards={cards} colors={colors} />;
  }

  // 기본 정적 그리드 — 왕뜸
  return (
    <section className="px-5 lg:px-8 py-10 lg:py-14 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-12">
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">{title}</h2>
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-5">
          {cards.map((card, i) => (
            <VisualCard key={card.number ?? i} card={card} colors={colors} />
          ))}
        </div>
      </div>
    </section>
  );
}
