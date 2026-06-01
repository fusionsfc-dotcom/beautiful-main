import type { TbtTreatment } from "../../../data/tbtData";

interface TbtTreatmentCardProps {
  treatment: TbtTreatment;
  index: number;
}

export default function TbtTreatmentCard({ treatment, index }: TbtTreatmentCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden flex shadow-sm">
      {/* 좌측 이미지 (35%) */}
      <div className="w-[35%] flex-shrink-0 relative">
        {/* TODO: 실제 치료 사진으로 교체 필요 */}
        <img
          src={treatment.image}
          alt={`${treatment.name} 시술 사진`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 단계 번호 뱃지 */}
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#6A5542] flex items-center justify-center">
          <span className="text-white text-[12px] font-extrabold">{index + 1}</span>
        </div>
      </div>

      {/* 우측 텍스트 (65%) */}
      <div className="flex-1 p-5 flex flex-col justify-center gap-2">
        <div>
          <h3 className="text-[16px] font-extrabold text-[#2F2A26] inline">{treatment.name}</h3>
          {treatment.subname && (
            <span className="text-[13px] text-[#756A60] ml-2">{treatment.subname}</span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          {treatment.description.map((line, i) => (
            <p key={i} className="text-[13px] text-[#756A60] leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
