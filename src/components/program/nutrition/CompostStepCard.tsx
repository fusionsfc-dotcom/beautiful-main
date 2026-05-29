import type { CompostStep } from "../../../data/nutritionData";

interface CompostStepCardProps {
  step: CompostStep;
}

export default function CompostStepCard({ step }: CompostStepCardProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-md bg-[#FFFFFF] border border-[#D8CDBE]">
      {/* 이미지 */}
      <div className="relative aspect-[4/3] sm:aspect-square">
        {/* TODO: 실제 퇴비 공정 사진으로 교체 필요 */}
        <img
          src={step.image}
          alt={step.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* 단계 번호 */}
        <div className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-[#6A5542] flex items-center justify-center">
          <span className="text-white text-[15px] font-extrabold">{step.number}</span>
        </div>
      </div>

      {/* 이름 */}
      <div className="px-4 py-5 text-center">
        <p className="text-[17px] lg:text-[15px] font-extrabold text-[#2F2A26] leading-tight">
          {step.name}
        </p>
      </div>
    </div>
  );
}
