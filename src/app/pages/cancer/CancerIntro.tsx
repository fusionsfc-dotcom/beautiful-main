import { Link } from "react-router";
import {
  CheckCircle2,
  Dumbbell,
  HeartPulse,
  Leaf,
  ShieldPlus,
  Stethoscope,
  Utensils,
} from "lucide-react";
import SEOHead from "../../../components/seo/SEOHead";
const programPillars = [
  {
    title: "체력 회복",
    text: "치료 과정에서 떨어진 근력과 지구력을 환자 상태에 맞춰 단계적으로 회복합니다.",
    icon: Dumbbell,
  },
  {
    title: "면역 회복",
    text: "면역 저하, 피로, 염증 반응을 고려해 한방 통합 회복 케어를 병행합니다.",
    icon: ShieldPlus,
  },
  {
    title: "영양 회복",
    text: "식욕 저하와 소화 부담을 줄이고, 치료를 버틸 수 있는 영양 기반을 만듭니다.",
    icon: Utensils,
  },
  {
    title: "마음 회복",
    text: "치료 중 불안과 스트레스를 낮추고, 일상으로 돌아갈 힘을 함께 준비합니다.",
    icon: HeartPulse,
  },
];

const programFlow = [
  "치료 이력과 현재 컨디션 확인",
  "암종·치료 단계별 회복 목표 설정",
  "운동 재활·영양·한방 치료 통합 설계",
  "회복 반응에 따른 강도 조절과 지속 관리",
];

const targets = [
  "수술 후 체력과 식사량이 떨어진 환자",
  "항암·방사선 치료 중 피로와 부작용이 큰 환자",
  "치료 후 일상 복귀를 준비하는 환자",
  "면역력과 근력 회복을 함께 관리하고 싶은 환자",
];

export default function CancerIntro() {
  return (
    <>
      <SEOHead
        title="암 재활 프로그램 소개 | 뷰티풀한방병원"
        description="암 치료 전후 체력, 면역, 영양, 마음 회복을 통합적으로 돕는 뷰티풀한방병원 암 재활 프로그램 소개."
        keywords="암재활프로그램,암환자재활,항암후회복,암환자운동,암환자영양,뷰티풀한방병원"
        ogUrl="https://www.btful.co.kr/cancer/intro"
        canonical="https://www.btful.co.kr/cancer/intro"
      />

      <div
        className="bg-[#F8F3EA] min-h-screen"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Hero */}
        <section className="px-5 lg:px-8 pt-10 lg:pt-16 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden relative bg-[#6A5542] px-6 py-9 lg:px-12 lg:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,165,103,0.22),transparent_42%)]" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-white/12 border border-white/20 px-3 py-1 text-[12px] font-bold text-[#F3D79B] mb-5">
                  Cancer Rehabilitation Program
                </span>
                <h1 className="text-[32px] lg:text-[46px] font-extrabold text-white leading-tight mb-5">
                  치료를 버틸 힘,
                  <br />
                  회복에서 다시 시작합니다
                </h1>
                <p className="text-[15px] lg:text-[17px] text-white/78 leading-relaxed">
                  암 재활은 단순한 운동이 아니라, 치료 중 무너진 체력과 면역,
                  영양 상태를 함께 회복하는 과정입니다. 뷰티풀한방병원은 환자
                  상태에 맞춰 회복의 우선순위를 정하고 통합 프로그램을 설계합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Four pillars */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Leaf size={17} color="#9A856D" strokeWidth={1.8} />
              <h2 className="text-[22px] lg:text-[28px] font-extrabold text-[#2F2A26]">
                암 재활의 4가지 회복 축
              </h2>
              <Leaf size={17} color="#9A856D" strokeWidth={1.8} className="scale-x-[-1]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {programPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className="rounded-2xl bg-[#FFFFFF] border border-[#D8CDBE] p-6 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#D8CDBE] flex items-center justify-center mb-4">
                      <Icon size={24} color="#9A856D" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[18px] font-extrabold text-[#2F2A26] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[14px] text-[#756A60] leading-relaxed">{pillar.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flow and target */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-white border border-[#D8CDBE] px-6 py-8 lg:px-8">
              <Stethoscope size={28} color="#9A856D" strokeWidth={1.8} className="mb-4" />
              <h2 className="text-[22px] font-extrabold text-[#2F2A26] mb-5">
                프로그램 진행 방식
              </h2>
              <div className="space-y-4">
                {programFlow.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#9A856D] text-white flex items-center justify-center text-[13px] font-extrabold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[15px] font-medium text-[#2F2A26] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#EFE7DC] border border-[#D8CDBE] px-6 py-8 lg:px-8">
              <CheckCircle2 size={28} color="#9A856D" strokeWidth={1.8} className="mb-4" />
              <h2 className="text-[22px] font-extrabold text-[#2F2A26] mb-5">
                이런 분께 필요합니다
              </h2>
              <ul className="space-y-3">
                {targets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#9A856D] flex-shrink-0" />
                    <span className="text-[15px] font-medium text-[#2F2A26] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto rounded-3xl bg-[#FFFFFF] border border-[#D8CDBE] px-6 py-8 lg:px-10">
            <h2 className="text-[22px] lg:text-[28px] font-extrabold text-[#2F2A26] mb-5">
              함께 보면 좋은 프로그램
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/cancer/types"
                className="rounded-2xl bg-white p-5 border border-[#D8CDBE] hover:bg-[#F8F3EA] transition-colors"
              >
                <ShieldPlus size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                <p className="font-extrabold text-[#2F2A26] mb-1">암종별 재활 케어</p>
                <p className="text-[13px] text-[#756A60]">위암·폐암·유방암·기타 암</p>
              </Link>
              <Link
                to="/program/rehab"
                className="rounded-2xl bg-white p-5 border border-[#D8CDBE] hover:bg-[#F8F3EA] transition-colors"
              >
                <Dumbbell size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                <p className="font-extrabold text-[#2F2A26] mb-1">운동 재활 치료</p>
                <p className="text-[13px] text-[#756A60]">체력과 근력 회복</p>
              </Link>
              <Link
                to="/program/nutrition"
                className="rounded-2xl bg-white p-5 border border-[#D8CDBE] hover:bg-[#F8F3EA] transition-colors"
              >
                <Utensils size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                <p className="font-extrabold text-[#2F2A26] mb-1">항암 식단 & 영양</p>
                <p className="text-[13px] text-[#756A60]">소화와 영양 회복</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-[#6A5542] px-6 py-7 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-[#9A856D] text-[13px] font-bold mb-2">
                  회복 프로그램이 고민된다면
                </p>
                <p className="text-white text-[20px] lg:text-[24px] font-extrabold leading-snug">
                  현재 상태에 맞는 재활 방향을 상담해보세요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
