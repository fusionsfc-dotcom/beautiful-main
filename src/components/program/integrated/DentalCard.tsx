import { Link } from "react-router";
import TreatmentIcon from "./TreatmentIcon";
import type { Treatment } from "../../../data/integratedCareData";

const DENTAL_COLOR = "#6A5542";
const DENTAL_BG = "#D8CDBE";

const cardClassName =
  "bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D8CDBE] flex flex-col";

interface DentalCardProps {
  treatment: Treatment;
}

function CardContent({ treatment }: DentalCardProps) {
  return (
    <>
      <div className="relative aspect-[3/2]">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-5 flex gap-3 items-start">
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
    </>
  );
}

export default function DentalCard({ treatment }: DentalCardProps) {
  const isLinked = treatment.linked !== false;

  if (!isLinked) {
    return (
      <div className={cardClassName}>
        <CardContent treatment={treatment} />
      </div>
    );
  }

  return (
    <Link
      to={`/program/integrated/${treatment.slug}`}
      className={`${cardClassName} hover:shadow-md transition-shadow`}
    >
      <CardContent treatment={treatment} />
    </Link>
  );
}
