import type { CompostStep } from "../../../data/nutritionData";

interface CompostStepCardProps {
  step: CompostStep;
}

export default function CompostStepCard({ step }: CompostStepCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-sm bg-[#FBF5E9]">
      {/* 이미지 */}
      <div className="relative aspect-square">
        {/* TODO: 실제 퇴비 공정 사진으로 교체 필요 */}
        <img
          src={step.image}
          alt={step.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* 단계 번호 */}
        <div className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-[#3D2817] flex items-center justify-center">
          <span className="text-white text-[11px] font-extrabold">{step.number}</span>
        </div>
      </div>

      {/* 이름 */}
      <div className="px-3 py-3 text-center">
        <p className="text-[12px] font-extrabold text-[#2A1F18] leading-tight">
          {step.name}
        </p>
      </div>
    </div>
  );
}
