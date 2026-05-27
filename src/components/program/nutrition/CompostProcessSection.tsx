import { Leaf, ChevronRight } from "lucide-react";
import CompostStepCard from "./CompostStepCard";
import { compostSteps } from "../../../data/nutritionData";

export default function CompostProcessSection() {
  return (
    <section className="bg-[#FBF5E9] px-5 lg:px-8 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* ── 좌측 텍스트 (30%) ── */}
        <div className="lg:w-[28%] lg:flex-shrink-0 flex flex-col gap-4">
          <Leaf size={28} color="#C9A567" strokeWidth={1.5} />
          <h2 className="text-[20px] lg:text-[22px] font-extrabold text-[#2A1F18] leading-snug">
            건강한 토양에서 자란
            <br />
            건강한 식재료
          </h2>
          <p className="text-[13px] text-[#6B5547] leading-relaxed">
            정확한 영양 공급으로 면역력을 높이고
            <br />
            건강한 회복을 함께 만들어갑니다.
          </p>
        </div>

        {/* ── 우측 4단계 카드 + 화살표 (70%) ── */}
        <div className="flex-1">
          {/* 데스크탑: 가로 4열 + 화살표 */}
          <div className="hidden lg:flex items-center gap-2">
            {compostSteps.map((step, i) => (
              <div key={step.number} className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex-1">
                  <CompostStepCard step={step} />
                </div>
                {i < compostSteps.length - 1 && (
                  <ChevronRight size={20} color="#C9A567" strokeWidth={2.5} className="flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* 모바일: 2×2 그리드 */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {compostSteps.map((step) => (
              <CompostStepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
