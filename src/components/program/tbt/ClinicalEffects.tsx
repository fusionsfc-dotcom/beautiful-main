/** ClinicalEffects — 임상으로 검증된 효과 4개 + 통계 박스 */
import { TrendingUp, Leaf } from "lucide-react";
import { clinicalEffects } from "../../../data/tbtData";

export default function ClinicalEffects() {
  return (
    <section className="px-5 lg:px-8 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Leaf size={14} color="#C9A567" strokeWidth={1.8} className="rotate-180" />
          <h2 className="text-[20px] lg:text-[26px] font-extrabold text-[#2A1F18] text-center">
            임상으로 검증된 효과
          </h2>
          <Leaf size={14} color="#C9A567" strokeWidth={1.8} />
        </div>

        {/* 4개 항목 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {clinicalEffects.map((effect, i) => (
            <div
              key={i}
              className="bg-[#FBF5E9] rounded-2xl p-5 flex flex-col items-center text-center gap-3"
            >
              {/* 체크 원형 */}
              <div className="w-10 h-10 rounded-full bg-[#3D2817] flex items-center justify-center flex-shrink-0">
                {/* 흰색 체크 */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                {effect.text.map((line, j) => (
                  <p key={j} className="text-[13px] lg:text-[14px] text-[#2A1F18] font-medium leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 통계 박스 */}
        <div className="bg-[#F8F2E5] rounded-xl px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F0E6D2] flex-shrink-0 flex items-center justify-center">
            <TrendingUp size={20} color="#5B3A1F" strokeWidth={2} />
          </div>
          <p className="text-[13px] text-[#5B3A1F] leading-relaxed">
            다수의 항암 환자분들의 치료 결과가{" "}
            <br className="hidden sm:block" />
            지속적으로 나타나고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
