import { Link } from "react-router";
import TreatmentIcon from "./TreatmentIcon";
import type { Treatment } from "../../../data/integratedCareData";

const DENTAL_COLOR = "#6A5542";
const DENTAL_BG = "#D8CDBE";

interface DentalCardProps {
  treatment: Treatment;
}

export default function DentalCard({ treatment }: DentalCardProps) {
  return (
    <Link
      to={`/program/integrated/${treatment.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D8CDBE] flex flex-col hover:shadow-md transition-shadow"
    >
      {/* 이미지 */}
      <div className="relative aspect-[3/2]">
        {/* TODO: 실제 치과 사진으로 교체 필요 */}
        <img
          src={treatment.image}
          alt={treatment.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* 텍스트 */}
      <div className="p-5 flex gap-3 items-start">
        {/* 아이콘 원형 */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: DENTAL_BG }}
        >
          <TreatmentIcon icon={treatment.icon} color={DENTAL_COLOR} size={18} />
        </div>
        <div>
          <h4
            className="text-[14px] font-extrabold mb-1 leading-snug"
            style={{ color: DENTAL_COLOR }}
          >
            {treatment.name}
          </h4>
          {treatment.description.map((line, i) => (
            <p key={i} className="text-[12px] text-[#756A60] leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}
