/** CoreProgramsCarousel — 핵심 치료 프로그램 8개 아이콘 그리드 */
import { Link } from "react-router";

/** 선 일러스트 아이콘 SVG 컴포넌트들 */
function EnzymeSteamIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="30" width="36" height="18" rx="4" />
      <path d="M16 30V26a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" />
      <path d="M22 8c0 4-4 6-4 10" />
      <path d="M28 6c0 4-4 6-4 10" />
      <path d="M34 8c0 4-4 6-4 10" />
    </svg>
  );
}

function RehabIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="12" r="4" />
      <path d="M28 16v14" />
      <path d="M18 22l10 4 10-4" />
      <path d="M20 30l-4 14" />
      <path d="M36 30l4 14" />
    </svg>
  );
}

function PilatesIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="32" width="44" height="6" rx="3" />
      <circle cx="28" cy="20" r="4" />
      <path d="M28 24l-6 8h12l-6-8z" />
      <path d="M16 38v6" />
      <path d="M40 38v6" />
    </svg>
  );
}

function AcupunctureIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="28" r="16" />
      <path d="M28 12v4M28 40v4M12 28h4M40 28h4" />
      <circle cx="28" cy="28" r="4" />
      <path d="M28 28l-8-8" />
    </svg>
  );
}

function InjectionIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 10l8 8" />
      <path d="M34 14l8 8" />
      <path d="M18 38l-6 6" />
      <path d="M36 16L16 36" />
      <path d="M24 28l8 8" />
      <path d="M30 22l8 8" />
    </svg>
  );
}

function MoxaIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 8c8 8-4 12 4 20" />
      <path d="M22 16c-8 8 2 13-2 20" />
      <path d="M36 22c4 5 4 12-1 17a11 11 0 0 1-16 0c-4-5-3-11 1-16" />
      <path d="M18 44h20" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16a8 8 0 0 0-8 8c0 2 .7 3.8 2 5.2A8 8 0 0 0 18 44h9V16h-5z" />
      <path d="M34 16a8 8 0 0 1 8 8c0 2-.7 3.8-2 5.2A8 8 0 0 1 38 44h-9V16h5z" />
      <path d="M20 25h7M29 25h7M20 34h7M29 34h7" />
    </svg>
  );
}

function DentalIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 10c-8 0-14 5-14 12 0 4 2 7 3 10 1 3 1 6 1 9 0 4 2 7 5 7s4-5 5-9c1 4 2 9 5 9s5-3 5-7c0-3 0-6 1-9s3-6 3-10c0-7-6-12-14-12z" />
      <path d="M21 21c3 1 11 1 14 0" />
    </svg>
  );
}

const PROGRAMS = [
  {
    id: "enzyme-steam",
    icon: <EnzymeSteamIcon />,
    title: "효소찜질센터",
    href: "/program/integrated/yoso-jjimjil",
  },
  {
    id: "rehab",
    icon: <RehabIcon />,
    title: "운동재활",
    href: "/program/rehab",
  },
  {
    id: "pilates",
    icon: <PilatesIcon />,
    title: "항암필라테스",
    href: "/program/rehab",
  },
  {
    id: "acupuncture",
    icon: <AcupunctureIcon />,
    title: "침 치료",
    href: "/program/integrated/chim",
  },
  {
    id: "yakchim",
    icon: <InjectionIcon />,
    title: "약침치료",
    href: "/program/integrated/yakchim",
  },
  {
    id: "wangttum",
    icon: <MoxaIcon />,
    title: "약뜸",
    href: "/program/integrated/wangttum",
  },
  {
    id: "brain-moxa",
    icon: <BrainIcon />,
    title: "뇌신경뜸",
    href: "/program/integrated/noeshinkyung-ttum",
  },
  {
    id: "oral-care",
    icon: <DentalIcon />,
    title: "항암 구강관리",
    href: "/program/integrated/oral-care",
  },
];

export default function CoreProgramsCarousel() {
  return (
    <section className="bg-[#EFE7DC] py-12 lg:py-16">
      {/* 헤더 */}
      <div className="px-5 lg:max-w-6xl lg:mx-auto lg:px-8 mb-7">
        <p className="text-xs text-[#9A856D] tracking-widest mb-2 uppercase">
          Treatment Programs
        </p>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-[#2F2A26]">
          핵심 치료 프로그램
        </h2>
      </div>

      {/* 8개 아이콘 그리드 */}
      <div className="px-5 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-4">
          {PROGRAMS.map((program) => (
            <Link
              key={program.id}
              to={program.href}
              className="group bg-[#F8F3EA] rounded-2xl border border-[#D8CDBE] px-2 py-4 lg:py-5 flex flex-col items-center justify-center gap-2.5 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#9A856D] flex items-center justify-center group-hover:bg-[#7C654F] transition-colors shadow-sm [&_svg]:w-9 [&_svg]:h-9 lg:[&_svg]:w-10 lg:[&_svg]:h-10">
                {program.icon}
              </div>
              <span className="text-[12px] lg:text-[14px] font-extrabold text-[#2F2A26] text-center leading-snug break-keep">
                {program.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
