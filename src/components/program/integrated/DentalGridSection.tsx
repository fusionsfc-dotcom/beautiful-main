import DentalCard from "./DentalCard";
import type { TreatmentGroup } from "../../../data/integratedCareData";

const DENTAL_MAIN = "#5D3FA0";

interface DentalGridSectionProps {
  group: TreatmentGroup;
}

export default function DentalGridSection({ group }: DentalGridSectionProps) {
  return (
    <section className="py-12 lg:py-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-7">
          <div className="flex items-start gap-4">
            <div
              className="w-1 rounded-full mt-1 self-stretch min-h-[40px]"
              style={{ backgroundColor: DENTAL_MAIN }}
            />
            <div>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-white text-[11px] font-bold mb-2"
                style={{ backgroundColor: DENTAL_MAIN }}
              >
                {group.badgeLabel}
              </span>
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2A1F18] leading-snug">
                {group.title}
              </h2>
            </div>
          </div>
          <p className="text-[13px] text-[#6B5547] lg:max-w-xs lg:text-right leading-relaxed">
            {group.subtitle}
          </p>
        </div>

        {/* 3열 그리드 (모바일: 1열) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {group.treatments.map((t) => (
            <DentalCard key={t.name} treatment={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
