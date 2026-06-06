/** FacilityNutritionShowcase — 시설·환경 / 영양 소개 쇼케이스 */
// 환자·보호자가 회복 환경의 매력을 느낄 수 있도록 큰 이미지 + 핵심 포인트 구성

import { Link } from "react-router";

const BASE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/";

const SHOWCASES = [
  {
    id: "facility",
    badge: "시설 & 환경",
    title: "치료에만 집중하는\n호텔형 입원 환경",
    desc: "호텔을 리모델링한 1인실 위주 병실과 쾌적한 치료 공간에서 편안하게 회복하세요.",
    points: ["호텔형 1인실 입원실", "전체 입원실 호텔형 화장실", "24시간 의료진 상주"],
    image: `${BASE}room/room_master.jpg`,
    href: "/facilities",
    cta: "치료환경 둘러보기",
  },
  {
    id: "nutrition",
    badge: "영양 & 식단",
    title: "면역을 키우는\n맞춤 항암 영양식단",
    desc: "직접 가꾼 텃밭 재료로 환자 상태에 맞춘 항암 식단을 제공해 체력과 면역 회복을 돕습니다.",
    points: ["개인별 맞춤 항암식단", "텃밭 직접 재배 식재료", "영양사 관리 식단"],
    image: `${BASE}food/foodmaster.png`,
    href: "/program/nutrition",
    cta: "영양 프로그램 보기",
  },
];

export default function FacilityNutritionShowcase() {
  return (
    <section className="bg-[#F8F3EA] py-12 lg:py-20 px-5 lg:px-8 border-t border-[#D8CDBE]">
      <div className="lg:max-w-6xl lg:mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-9 lg:mb-12">
          <p className="text-xs text-[#9A856D] tracking-widest uppercase mb-3">
            Healing Environment
          </p>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-[#2F2A26] leading-tight mb-3">
            치료를 넘어,<br className="sm:hidden" /> 머무는 공간까지 정성을 담다
          </h2>
          <p className="text-sm lg:text-base text-[#756A60] leading-relaxed">
            회복은 환경에서 시작됩니다. 편안한 시설과 건강한 식단으로<br className="hidden sm:block" />
            환자와 보호자 모두 안심할 수 있는 머무름을 제공합니다.
          </p>
        </div>

        {/* 2개 쇼케이스 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {SHOWCASES.map((s) => (
            <Link
              key={s.id}
              to={s.href}
              className="group block rounded-3xl overflow-hidden bg-white border border-[#D8CDBE] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 이미지 + 오버레이 */}
              <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.badge}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                {/* 뱃지 */}
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-[#6A5542]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide">
                  {s.badge}
                </span>
                {/* 제목 (이미지 위) */}
                <h3 className="absolute bottom-4 left-5 right-5 text-white text-xl lg:text-2xl font-extrabold leading-tight whitespace-pre-line drop-shadow">
                  {s.title}
                </h3>
              </div>

              {/* 본문 */}
              <div className="px-5 lg:px-6 py-5 lg:py-6">
                <p className="text-sm lg:text-[15px] text-[#756A60] leading-relaxed mb-4">
                  {s.desc}
                </p>

                {/* 핵심 포인트 */}
                <ul className="flex flex-col gap-2 mb-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px] lg:text-sm text-[#2F2A26]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-[#6A5542] text-sm font-bold group-hover:gap-2.5 transition-all">
                  {s.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
