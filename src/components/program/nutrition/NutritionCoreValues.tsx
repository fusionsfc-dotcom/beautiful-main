import { ShieldPlus, Dumbbell, Leaf, Leaf as LeafAlt } from "lucide-react";
import { Leaf as LeafIcon } from "lucide-react";
import { coreValues, type CoreValue } from "../../../data/nutritionData";

const C = "#9A856D";
const S = 1.5;
const SZ = 48;

function NutritionIcon({ icon }: { icon: CoreValue["icon"] }) {
  if (icon === "shield-plus") return <ShieldPlus size={SZ} color={C} strokeWidth={S} />;
  if (icon === "dumbbell")    return <Dumbbell    size={SZ} color={C} strokeWidth={S} />;
  if (icon === "leaf")        return <LeafIcon    size={SZ} color={C} strokeWidth={S} />;
  // intestine — 커스텀 SVG (lucide에 없음)
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 24 24" fill="none"
      stroke={C} strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3c0 2 2 3 2 5s-2 3-2 5 2 3 2 5" />
      <path d="M12 3c0 2 2 3 2 5s-2 3-2 5 2 3 2 5" />
      <path d="M18 3c0 2-2 3-2 5s2 3 2 5-2 3-2 5" />
    </svg>
  );
}

export default function NutritionCoreValues() {
  return (
    <section className="px-5 lg:px-8 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFFFF] rounded-2xl px-6 pt-8 pb-6">
          {/* 타이틀 */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <LeafIcon size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
            <h2 className="text-[18px] lg:text-[22px] font-extrabold text-[#2F2A26]">
              항암 식단의 핵심 가치
            </h2>
            <LeafIcon size={14} color="#9A856D" strokeWidth={1.8} />
          </div>

          {/* 4개 항목 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-[#D8CDBE]">
            {coreValues.map((val, i) => (
              <div
                key={val.title}
                className={[
                  "flex flex-col items-center text-center px-4 py-5 gap-3",
                  i % 2 === 0 && i < 2 ? "border-r border-b border-[#D8CDBE] lg:border-b-0" : "",
                  i % 2 !== 0 && i < 2 ? "border-b border-[#D8CDBE] lg:border-b-0" : "",
                  i === 1 ? "lg:border-r border-[#D8CDBE]" : "",
                  i === 2 ? "border-r border-[#D8CDBE]" : "",
                ].join(" ")}
              >
                <NutritionIcon icon={val.icon} />
                <div>
                  <p className="text-[14px] font-extrabold text-[#2F2A26] mb-1">{val.title}</p>
                  {val.description.map((line, j) => (
                    <p key={j} className="text-[12px] text-[#756A60] leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
