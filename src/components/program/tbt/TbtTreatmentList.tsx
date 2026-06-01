import TbtTreatmentCard from "./TbtTreatmentCard";
import { tbtTreatments } from "../../../data/tbtData";

export default function TbtTreatmentList() {
  return (
    <section className="px-5 lg:px-8 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <h2 className="text-[20px] lg:text-[26px] font-extrabold text-[#2F2A26] text-center mb-8">
          턱관절 균형 요법(TBT)의 치료 내용
        </h2>

        {/* 카드 세로 적층 */}
        <div className="flex flex-col gap-3">
          {tbtTreatments.map((t, i) => (
            <TbtTreatmentCard key={t.name} treatment={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
