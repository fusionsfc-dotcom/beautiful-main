import { CheckCircle, Leaf } from "lucide-react";
import { gardenChecks, GARDEN_IMAGES } from "../../../data/nutritionData";

export default function GardenIngredientsBox() {
  return (
    <div className="bg-[#FBF5E9] rounded-2xl p-6 lg:p-7 flex flex-col gap-5">
      {/* 타이틀 */}
      <div className="flex items-center gap-2">
        <Leaf size={14} color="#C9A567" strokeWidth={1.8} className="rotate-180" />
        <h3 className="text-[16px] lg:text-[18px] font-extrabold text-[#2A1F18]">
          텃밭에서 키운 신선한 식재료
        </h3>
        <Leaf size={14} color="#C9A567" strokeWidth={1.8} />
      </div>

      {/* 이미지 2x2 그리드 + 체크리스트 */}
      <div className="flex flex-col sm:flex-row gap-5">
        {/* 이미지 그리드 */}
        <div className="grid grid-cols-2 gap-2 sm:w-1/2 flex-shrink-0">
          {GARDEN_IMAGES.map((src, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden relative">
              {/* TODO: 실제 텃밭 사진으로 교체 필요 */}
              <img
                src={src}
                alt={`텃밭 사진 ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 체크리스트 */}
        <div className="flex flex-col justify-center gap-3">
          {gardenChecks.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle
                size={18}
                color="#2D7A3E"
                fill="#E8F3EB"
                strokeWidth={2.5}
                className="flex-shrink-0 mt-0.5"
              />
              <div>
                {item.text.map((line, j) => (
                  <p key={j} className="text-[13px] text-[#2A1F18] leading-snug">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
