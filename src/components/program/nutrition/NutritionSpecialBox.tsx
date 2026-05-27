import { ClipboardCheck, Leaf, User, HeartHandshake } from "lucide-react";
import { specialItems, type SpecialItem } from "../../../data/nutritionData";

const C = "#5B3A1F";

function SpecialIcon({ icon }: { icon: SpecialItem["icon"] }) {
  const p = { size: 22, color: C, strokeWidth: 1.8 };
  if (icon === "clipboard-check") return <ClipboardCheck {...p} />;
  if (icon === "leaf")            return <Leaf {...p} />;
  if (icon === "user")            return <User {...p} />;
  return <HeartHandshake {...p} />;
}

export default function NutritionSpecialBox() {
  return (
    <div className="bg-[#FBF5E9] rounded-2xl p-6 lg:p-7 flex flex-col gap-5">
      {/* 타이틀 */}
      <div className="flex items-center gap-2">
        <Leaf size={14} color="#C9A567" strokeWidth={1.8} className="rotate-180" />
        <h3 className="text-[16px] lg:text-[18px] font-extrabold text-[#2A1F18]">
          뷰티풀 항암 식단의 특별함
        </h3>
        <Leaf size={14} color="#C9A567" strokeWidth={1.8} />
      </div>

      {/* 4개 항목 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {specialItems.map((item) => (
          <div key={item.title} className="flex gap-3 items-start">
            {/* 원형 아이콘 */}
            <div className="w-10 h-10 rounded-full bg-[#F5EEE0] flex-shrink-0 flex items-center justify-center">
              <SpecialIcon icon={item.icon} />
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-[#2A1F18] leading-tight mb-0.5">
                {item.title}
              </p>
              {item.description.map((line, i) => (
                <p key={i} className="text-[11px] text-[#6B5547] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
