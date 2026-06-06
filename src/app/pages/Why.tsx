import SEOHead from "../../components/seo/SEOHead";
import { makeBreadcrumbList } from "../../lib/schema/breadcrumb";
import { Link } from "react-router";

const REASONS = [
  {
    num: "01",
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room/room1.jpg",
    imageAlt: "호텔식 1인실 병실",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#8B6F47" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="28" height="22" rx="2" />
        <path d="M4 16h28" />
        <path d="M13 8v8" />
        <path d="M4 26h28" />
        <rect x="8" y="20" width="5" height="4" rx="1" />
        <rect x="23" y="20" width="5" height="4" rx="1" />
      </svg>
    ),
    heading: (
      <>
        호텔을 리모델링하여 만든<br />
        <strong className="text-[#2F2A26]">쾌적하고 고급스러운<br />입원실</strong>
      </>
    ),
    desc: "프라이빗한 1인실과 호텔식 시설로 편안한 치료 환경을 제공합니다.",
  },
  {
    num: "02",
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/loca.jpeg",
    imageAlt: "병원 뒤 학령산과 자연환경",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#8B6F47" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 28L13 12l6 10 4-6 9 14H4z" />
        <circle cx="26" cy="10" r="3" />
      </svg>
    ),
    heading: (
      <>
        병원 뒤 학령산과 텃밭<br />그리고 파주 스타디움<br />
        <strong className="text-[#2F2A26]">(드론 촬영 영상)</strong>
      </>
    ),
    desc: "자연 속 힐링 환경과 드론으로 보는 감성 영상을 확인해보세요.",
  },
  {
    num: "03",
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/ceo_re.png",
    imageAlt: "한의학 박사 의료진 상담",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#8B6F47" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="10" r="5" />
        <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" />
        <path d="M18 20v4M15 22h6" />
      </svg>
    ),
    heading: (
      <>
        27년간 암환자 진료 경험이<br />
        <strong className="text-[#2F2A26]">있는 한의학박사의<br />24시간 케어</strong>
      </>
    ),
    desc: "풍부한 경험과 24시간 케어로 안심하고 치료 받으세요.",
  },
  {
    num: "04",
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/clinic/cl_1.jpeg",
    imageAlt: "치과 진료 — 항암 치료 중 구강 관리",
    icon: (
      // 치아(tooth) 아이콘
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#8B6F47" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4c-3 0-5 2-5 6 0 3 1 5 1.5 8s1 9 3 9 2-6 4-6 2 6 4 6 2.5-5 3-9 1.5-5 1.5-8c0-4-2-6-5-6-2 0-2.5 1-4 1s-2-1-4-1z" />
      </svg>
    ),
    heading: (
      <>
        의(醫)·치(齒)·한(韓) 통합 협진<br />
        <strong className="text-[#2F2A26]">치과 진료까지<br />한 곳에서</strong>
      </>
    ),
    desc: "양·한방에 더해 치과 협진으로 항암 중 구강 건강까지 통합 관리합니다.",
  },
  {
    num: "05",
    image:
      "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/program/beautiful_ai_img.025.jpeg",
    imageAlt: "운동 재활 프로그램",
    icon: (
      // 덤벨(dumbbell) 아이콘
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#8B6F47" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 14v8M9 11v14M27 11v14M31 14v8M9 18h18" />
      </svg>
    ),
    heading: (
      <>
        체력 회복을 위한<br />
        <strong className="text-[#2F2A26]">체계적인<br />운동 재활 프로그램</strong>
      </>
    ),
    desc: "암 치료 후 체력과 면역 회복을 돕는 1:1 맞춤 운동 재활을 제공합니다.",
  },
];

export default function Why() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "왜 뷰티풀이어야 하나요? — 뷰티풀한방병원",
      "url": "https://www.btful.co.kr/why",
      "description":
        "호텔식 입원실, 자연환경, 27년 경력 한의학박사 24시간 케어, 의·치·한 통합 협진(치과 진료), 운동 재활 프로그램. 뷰티풀한방병원이 특별한 5가지 이유.",
    },
    makeBreadcrumbList([{ name: "왜 뷰티풀인가", path: "/why" }]),
  ];

  return (
    <>
      <SEOHead
        title="왜 뷰티풀이어야 하나요? | 뷰티풀한방병원"
        description="호텔식 입원실, 자연 속 힐링 환경, 27년 경력 한의학박사 24시간 케어, 의·치·한 통합 협진(치과 진료), 운동 재활 프로그램. 뷰티풀한방병원이 특별한 5가지 이유를 확인하세요."
        keywords="암요양병원특징,뷰티풀한방병원,호텔식입원실,의치한협진,치과진료,운동재활,24시간케어,한의학박사"
        ogUrl="https://www.btful.co.kr/why"
        canonical="https://www.btful.co.kr/why"
        jsonLd={jsonLd}
      />

      <div className="bg-[#F8F3EA] min-h-screen pb-10">
        {/* ── 헤더 ── */}
        <div className="pt-10 pb-6 text-center px-5">
          <p className="text-sm text-[#8B6F47] tracking-widest mb-2">왜 뷰티풀이어야 하나요?</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F2A26] leading-tight">
            뷰티풀이 특별한{" "}
            <span className="text-[#9A856D]">5가지</span>{" "}
            이유
          </h1>
        </div>

        {/* ── 5개 카드 그리드 ── */}
        {/* 모바일: 2열, 태블릿: 3열, 데스크탑: 5열 */}
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {REASONS.map((r) => (
            <article
              key={r.num}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D8CDBE] flex flex-col"
            >
              {/* 이미지 + 번호 뱃지 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={r.image}
                  alt={r.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* 번호 뱃지 */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#6A5542]/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[#9A856D] tracking-wider leading-none">
                    {r.num}
                  </span>
                </div>
              </div>

              {/* 아이콘 + 텍스트 */}
              <div className="flex flex-col items-center text-center px-4 pt-5 pb-6 flex-1">
                {/* SVG 아이콘 */}
                <div className="mb-3">{r.icon}</div>

                {/* 제목 */}
                <p className="text-[14px] md:text-[15px] text-[#756A60] leading-snug mb-3">
                  {r.heading}
                </p>

                {/* 설명 */}
                <p className="text-[12px] md:text-[13px] text-[#9A856D] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ── 보조 CTA ── */}
        <div className="mt-12 text-center px-5">
          <p className="text-[#756A60] text-sm mb-5">
            직접 경험하고 싶으신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#6A5542] text-[#6A5542] text-sm font-semibold rounded-full hover:bg-[#F5EFE6] transition-colors"
            >
              치료환경 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
