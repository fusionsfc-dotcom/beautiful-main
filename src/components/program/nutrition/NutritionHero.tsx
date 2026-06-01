import GardenVideoCard from "./GardenVideoCard";

export default function NutritionHero() {
  return (
    <section className="bg-[#F8F3EA] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

        {/* ── 좌측 텍스트 영역 (60%) ── */}
        <div className="flex-1">
          <p className="text-[11px] tracking-widest text-[#756A60] uppercase font-medium mb-4">
            정확한 영양 공급으로 면역력을 높이고 회복을 돕습니다
          </p>

          <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#6A5542] leading-tight mb-5">
            항암 식단 영양
          </h1>

          <div className="text-[14px] lg:text-[16px] text-[#2F2A26] leading-relaxed space-y-0.5 max-w-md">
            <p>항암 치료 중에는 체력과 면역력이</p>
            <p>크게 저하됩니다.</p>
            <p>뷰티풀 한방병원은 한방에서 정성껏 키운</p>
            <p>
              <span className="font-extrabold" style={{ color: "#9A856D" }}>
                신선한 채소와 유기농 식재료로
              </span>
            </p>
            <p>개인별 맞춤 항암 식단을 제공합니다.</p>
          </div>
        </div>

        {/* ── 우측 텃밭 영상 카드 (40%) ── */}
        <div className="w-full lg:w-[42%] lg:flex-shrink-0">
          <GardenVideoCard />
        </div>
      </div>
    </section>
  );
}
