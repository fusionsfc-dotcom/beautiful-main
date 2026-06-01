import { Link } from "react-router";
import TreatmentIcon from "./TreatmentIcon";
import type { Treatment, TreatmentTheme } from "../../../data/integratedCareData";
import { themeColors } from "../../../data/integratedCareData";

interface TreatmentCardProps {
  treatment: Treatment;
  theme: TreatmentTheme;
}

export default function TreatmentCard({ treatment, theme }: TreatmentCardProps) {
  const color = themeColors[theme];

  return (
    <Link
      to={`/program/integrated/${treatment.slug}`}
      className="bg-[#FFFFFF] rounded-2xl overflow-hidden flex-shrink-0 flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-[4/3]">
        {/* TODO: 실제 사진 교체 필요 */}
        <img
          src={treatment.image}
          alt={treatment.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* 원형 아이콘 오버레이 (하단 중앙, 이미지에 겹침) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10"
        >
          <TreatmentIcon icon={treatment.icon} color={color.main} size={18} />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="pt-8 pb-5 px-4 text-center flex-1 flex flex-col justify-start">
        <h4
          className="text-[15px] font-extrabold mb-2"
          style={{ color: color.main }}
        >
          {treatment.name}
        </h4>
        {treatment.description.map((line, i) => (
          <p key={i} className="text-[13px] text-[#756A60] leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </Link>
  );
}
