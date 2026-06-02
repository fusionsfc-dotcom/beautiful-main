/** HandwrittenReviews — 자필 후기 (실제 손편지 사진 8장, 겹쳐 쌓인 연출) */

const REVIEW_IMAGES = [
  { src: "/images/reviews/handwritten-1.png", alt: "뷰티풀한방병원 자필 후기 — 건강식단과 세심한 돌봄에 대한 감사" },
  { src: "/images/reviews/handwritten-2.png", alt: "뷰티풀한방병원 자필 후기 — 직원들의 사랑과 배려" },
  { src: "/images/reviews/handwritten-3.png", alt: "뷰티풀한방병원 자필 후기 — 유방암 치료 후 회복" },
  { src: "/images/reviews/handwritten-4.png", alt: "뷰티풀한방병원 자필 후기 — 간호·상담·영양 선생님과 맞춤 운동" },
  { src: "/images/reviews/handwritten-5.png", alt: "뷰티풀한방병원 자필 후기 — 뜸치료와 효소방 찜질 치료" },
  { src: "/images/reviews/handwritten-6.png", alt: "뷰티풀한방병원 자필 후기 — 췌장암 항암 치료 후 도수·트램폴린 회복" },
  { src: "/images/reviews/handwritten-7.png", alt: "뷰티풀한방병원 자필 후기 — 턱관절 균형장치 치료 협진" },
  { src: "/images/reviews/handwritten-8.png", alt: "뷰티풀한방병원 자필 후기 — CPA TBA 치료 후 턱관절·이명 호전" },
];

/** 겹침 위치 — x/y(px), rotate(deg), zIndex */
const REVIEW_STACK = [
  { x: -138, y: -54, rotate: -11, z: 1 },
  { x: -98, y: 48, rotate: 8, z: 2 },
  { x: -58, y: -40, rotate: -6, z: 3 },
  { x: -18, y: 62, rotate: 7, z: 4 },
  { x: 22, y: -30, rotate: -5, z: 5 },
  { x: 62, y: 56, rotate: 9, z: 6 },
  { x: 102, y: -24, rotate: -7, z: 7 },
  { x: 142, y: 52, rotate: 6, z: 8 },
];

const REVIEW_BG_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/te_1.jpeg";

const NAVER_REVIEWS_URL =
  "https://map.naver.com/p/entry/place/1468544622?placePath=/review?additionalHeight=76&entry=plt&fromPanelNum=1&locale=ko&svcName=map_pcv5&timestamp=202605300822&fromPanelNum=1&additionalHeight=76&timestamp=202605300822&locale=ko&svcName=map_pcv5&from=map&searchType=place&lng=126.7934673&lat=37.7516697&c=15.00,0,0,2,dh";

const BADGES = [
  "치료 효과",
  "식단 만족",
  "친절한 서비스",
  "쾌적한 환경",
];

export default function HandwrittenReviews() {
  return (
    <section className="py-10 lg:py-16 px-5 lg:px-8 bg-[#F8F3EA]">
      <div className="lg:max-w-6xl lg:mx-auto relative overflow-visible rounded-3xl border border-[#D8CDBE] shadow-sm px-5 py-7 lg:px-10 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:gap-6">
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
          <img
            src={REVIEW_BG_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#F8F3EA]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#9A856D]/20 via-[#F8F3EA]/36 to-[#F5EFE6]/26" />
        </div>

        {/* 좌측 텍스트 */}
        <div className="flex-shrink-0 lg:w-[38%] relative z-10">
          <p className="text-sm text-[#FFFFFF] tracking-widest mb-3">
            환자분들의 진심이 증명합니다
          </p>

          <div className="flex flex-row items-center gap-3 lg:gap-5">
            <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/92 backdrop-blur-sm border border-white/55 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 shrink-0">
              <svg className="w-5 h-8 sm:w-7 sm:h-10" viewBox="0 0 28 40" fill="none" aria-hidden="true">
                <path d="M14 38C8 32 2 24 2 16C2 9 7 4 14 4" stroke="#9A856D" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 20C8 20 6 16 8 12" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M6 28C6 28 3 24 5 20" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>

              <div className="text-center">
                <h2 className="text-[22px] sm:text-2xl lg:text-3xl font-extrabold text-[#8BC31F] leading-none">
                  자필 후기
                </h2>
                <span className="text-[40px] sm:text-4xl lg:text-5xl font-extrabold text-[#8BC31F] leading-none">
                  100+
                </span>
              </div>

              <svg className="w-5 h-8 sm:w-7 sm:h-10" viewBox="0 0 28 40" fill="none" aria-hidden="true">
                <path d="M14 38C20 32 26 24 26 16C26 9 21 4 14 4" stroke="#9A856D" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 20C20 20 22 16 20 12" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M22 28C22 28 25 24 23 20" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="flex flex-col items-start gap-2 min-w-0">
              <div className="flex flex-wrap gap-1.5">
                {BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] sm:text-xs text-white bg-white/18 border border-white/35 backdrop-blur-sm px-2.5 py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <a
                href={NAVER_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#9A856D] text-white text-[12px] sm:text-sm font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#7C654F] transition-colors"
              >
                전체 후기 보기
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 우측 — 손편지 8장 겹쳐 쌓임 */}
        <div className="relative z-10 flex-1 w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] mt-6 lg:mt-0 flex items-center justify-center">
          <div
            className="relative w-full max-w-[520px] sm:max-w-[600px] lg:max-w-none h-[320px] sm:h-[400px] lg:h-[480px] mx-auto lg:mx-0"
            aria-label="환자 자필 후기 8장"
          >
            {REVIEW_IMAGES.map((note, index) => {
              const stack = REVIEW_STACK[index];
              return (
                <div
                  key={note.src}
                  className="absolute left-1/2 top-1/2 w-[148px] sm:w-[178px] lg:w-[208px] shadow-[0_10px_28px_rgba(106,85,66,0.24)] rounded-xl overflow-hidden border border-[#D8CDBE]/90 bg-white transition-[transform,z-index] duration-200 hover:z-[20] hover:scale-[1.05] hover:shadow-xl"
                  style={{
                    zIndex: stack.z,
                    transform: `translate(calc(-50% + ${stack.x}px), calc(-50% + ${stack.y}px)) rotate(${stack.rotate}deg)`,
                  }}
                >
                  <img
                    src={note.src}
                    alt={note.alt}
                    className="w-full h-auto object-cover object-top pointer-events-none"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
