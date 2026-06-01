import { Link } from "react-router";
import {
  Activity,
  Dumbbell,
  HeartPulse,
  Leaf,
  ShieldPlus,
  Stethoscope,
  Utensils,
} from "lucide-react";
import SEOHead from "../../../components/seo/SEOHead";
type CancerCare = {
  name: string;
  subtitle: string;
  description: string;
  focus: string[];
  icon: typeof Stethoscope;
};

const cancerCares: CancerCare[] = [
  {
    name: "위암 재활",
    subtitle: "수술 후 소화 회복과 체력 재건",
    description:
      "위 절제 후 식사량 감소, 체중 저하, 소화 불편을 고려해 영양과 운동, 면역 회복을 함께 관리합니다.",
    focus: ["소화 부담을 줄인 식단", "근감소 예방 운동", "기력·면역 회복 치료"],
    icon: Utensils,
  },
  {
    name: "폐암 재활",
    subtitle: "호흡 기능과 전신 지구력 회복",
    description:
      "수술·항암·방사선 치료 후 떨어진 호흡 능력과 피로도를 단계적으로 회복하도록 돕습니다.",
    focus: ["호흡 재활 운동", "피로·기력 관리", "염증·면역 회복 케어"],
    icon: Activity,
  },
  {
    name: "유방암 재활",
    subtitle: "상지 기능과 림프 순환 관리",
    description:
      "수술 후 어깨 가동 범위 저하, 림프 부종, 항호르몬 치료 중 컨디션 변화를 섬세하게 관리합니다.",
    focus: ["어깨·팔 기능 회복", "림프 순환 관리", "체형·근력 재활"],
    icon: HeartPulse,
  },
  {
    name: "기타 암 재활",
    subtitle: "암종과 치료 단계에 맞춘 개별 회복",
    description:
      "환자마다 다른 치료 이력, 체력, 부작용 양상에 맞춰 회복 목표와 프로그램 강도를 조정합니다.",
    focus: ["개인별 상태 평가", "맞춤 운동·영양 설계", "통합 면역 회복 관리"],
    icon: ShieldPlus,
  },
];

const careSteps = [
  {
    title: "현재 상태 평가",
    text: "치료 이력, 체력, 식사 상태, 통증과 피로도를 먼저 확인합니다.",
  },
  {
    title: "개별 회복 목표 설정",
    text: "암종과 치료 단계에 맞춰 운동·영양·한방 케어 목표를 정합니다.",
  },
  {
    title: "통합 재활 프로그램 진행",
    text: "의료진이 회복 반응을 확인하며 프로그램 강도를 조절합니다.",
  },
];

export default function CancerTypes() {
  return (
    <>
      <SEOHead
        title="암종별 재활 프로그램 | 뷰티풀한방병원"
        description="위암, 폐암, 유방암 및 기타 암 환자의 치료 단계와 회복 상태에 맞춘 암 재활 프로그램. 운동 재활, 항암 식단, 면역 회복 케어를 통합적으로 제공합니다."
        keywords="암재활,위암재활,폐암재활,유방암재활,암환자운동,항암후관리,뷰티풀한방병원"
        ogUrl="https://www.btful.co.kr/cancer/types"
        canonical="https://www.btful.co.kr/cancer/types"
      />

      <div
        className="bg-[#F8F3EA] min-h-screen"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Hero */}
        <section className="px-5 lg:px-8 pt-10 lg:pt-16 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden relative bg-[#6A5542] px-6 py-9 lg:px-12 lg:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,165,103,0.22),transparent_40%)]" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-white/12 border border-white/20 px-3 py-1 text-[12px] font-bold text-[#F3D79B] mb-5">
                  암 재활 프로그램
                </span>
                <h1 className="text-[32px] lg:text-[46px] font-extrabold text-white leading-tight mb-5">
                  암종별 회복 상태에 맞춘
                  <br />
                  맞춤 재활 프로그램
                </h1>
                <p className="text-[15px] lg:text-[17px] text-white/78 leading-relaxed">
                  위암·폐암·유방암·기타 암 환자마다 필요한 회복 방향은 다릅니다.
                  뷰티풀한방병원은 치료 이력과 현재 컨디션을 바탕으로 운동, 식단,
                  면역 회복을 통합적으로 설계합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cancer type cards */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Leaf size={17} color="#9A856D" strokeWidth={1.8} />
              <h2 className="text-[22px] lg:text-[28px] font-extrabold text-[#2F2A26]">
                암종별 재활 케어
              </h2>
              <Leaf size={17} color="#9A856D" strokeWidth={1.8} className="scale-x-[-1]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cancerCares.map((care) => {
                const Icon = care.icon;
                return (
                  <article
                    key={care.name}
                    className="rounded-2xl bg-[#FFFFFF] border border-[#D8CDBE] p-6 lg:p-7 shadow-sm"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#D8CDBE] flex items-center justify-center flex-shrink-0">
                        <Icon size={24} color="#9A856D" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-extrabold text-[#2F2A26] mb-1">
                          {care.name}
                        </h3>
                        <p className="text-[13px] font-bold text-[#9A856D]">
                          {care.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#756A60] leading-relaxed mb-5">
                      {care.description}
                    </p>
                    <ul className="space-y-2.5">
                      {care.focus.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#9A856D] flex-shrink-0" />
                          <span className="text-[14px] font-medium text-[#2F2A26]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto rounded-3xl bg-white border border-[#D8CDBE] px-6 py-8 lg:px-10 lg:py-10">
            <h2 className="text-[22px] lg:text-[28px] font-extrabold text-[#2F2A26] mb-7">
              회복 프로그램 진행 방식
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {careSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-[#F8F3EA] p-5 border border-[#D8CDBE]">
                  <div className="w-10 h-10 rounded-full bg-[#9A856D] text-white flex items-center justify-center font-extrabold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-[17px] font-extrabold text-[#2F2A26] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#756A60] leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related programs */}
        <section className="px-5 lg:px-8 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-[#EFE7DC] border border-[#D8CDBE] px-6 py-8 lg:px-10 lg:py-10">
              <h2 className="text-[22px] lg:text-[28px] font-extrabold text-[#2F2A26] mb-5">
                함께 설계되는 회복 프로그램
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/program/rehab"
                  className="rounded-2xl bg-[#FFFFFF] p-5 border border-[#D8CDBE] hover:bg-white transition-colors"
                >
                  <Dumbbell size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                  <p className="font-extrabold text-[#2F2A26] mb-1">운동 재활 치료</p>
                  <p className="text-[13px] text-[#756A60]">체력과 근력 회복</p>
                </Link>
                <Link
                  to="/program/nutrition"
                  className="rounded-2xl bg-[#FFFFFF] p-5 border border-[#D8CDBE] hover:bg-white transition-colors"
                >
                  <Utensils size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                  <p className="font-extrabold text-[#2F2A26] mb-1">항암 식단 & 영양</p>
                  <p className="text-[13px] text-[#756A60]">소화와 영양 회복</p>
                </Link>
                <Link
                  to="/program/integrated"
                  className="rounded-2xl bg-[#FFFFFF] p-5 border border-[#D8CDBE] hover:bg-white transition-colors"
                >
                  <ShieldPlus size={24} color="#9A856D" strokeWidth={1.8} className="mb-3" />
                  <p className="font-extrabold text-[#2F2A26] mb-1">통합 맞춤 치료</p>
                  <p className="text-[13px] text-[#756A60]">한·양·치과 협진 케어</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-[#6A5542] px-6 py-7 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-[#9A856D] text-[13px] font-bold mb-2">
                  내 몸 상태에 맞는 재활이 필요하다면
                </p>
                <p className="text-white text-[20px] lg:text-[24px] font-extrabold leading-snug">
                  의료진 상담으로 회복 방향을 먼저 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
