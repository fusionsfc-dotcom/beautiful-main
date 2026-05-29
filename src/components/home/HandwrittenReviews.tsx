/** HandwrittenReviews — 자필 후기 (밝은 배경 + 손편지 노트) */
// TODO: /public/images/redesign/review-note-1.jpg, review-note-2.jpg — 실제 자필 후기 사진으로 교체 필요

const REVIEW_NOTES = [
  {
    id: 1,
    author: "위암 3기 치료 중 입원",
    text: "항암 치료를 받으면서 체력이 너무 떨어졌는데, 이곳에서 한방 치료와 함께 정말 잘 회복할 수 있었습니다. 의료진 선생님들이 너무 친절하시고 음식도 정말 맛있었어요. 감사합니다.",
    rotate: "-rotate-2",
  },
  {
    id: 2,
    author: "대장암 수술 후 회복",
    text: "수술 후 회복이 더디어서 걱정이 많았는데 뷰티풀 한방병원에서 한 달 입원하면서 체력도 많이 회복되고 통증도 줄었습니다. 1인실이라 조용하고 쾌적해서 정말 좋았어요.",
    rotate: "rotate-1",
  },
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
    <section
      className="py-10 lg:py-16 px-5 lg:px-8 bg-[#F8F3EA]"
    >
      <div className="lg:max-w-6xl lg:mx-auto relative overflow-hidden rounded-3xl border border-[#D8CDBE] shadow-sm px-5 py-7 lg:px-10 lg:py-10 flex flex-col lg:flex-row lg:items-center lg:gap-14">
        {/* 라운드 배경 이미지 */}
        <img
          src={REVIEW_BG_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F8F3EA]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#9A856D]/20 via-[#F8F3EA]/36 to-[#F5EFE6]/26" />

        {/* 좌측 텍스트 */}
        <div className="flex-1 mb-2 lg:mb-0 relative z-10">
          <p className="text-sm text-[#FFFFFF] tracking-widest mb-3">
            환자분들의 진심이 증명합니다
          </p>

          <div className="flex flex-row items-center gap-3 lg:gap-5">
            {/* 자필 후기 + 100+ */}
            <div className="inline-flex items-center gap-2 sm:gap-4 bg-white/92 backdrop-blur-sm border border-white/55 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 shrink-0">
              {/* 월계관 왼쪽 */}
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

              {/* 월계관 오른쪽 */}
              <svg className="w-5 h-8 sm:w-7 sm:h-10" viewBox="0 0 28 40" fill="none" aria-hidden="true">
                <path d="M14 38C20 32 26 24 26 16C26 9 21 4 14 4" stroke="#9A856D" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 20C20 20 22 16 20 12" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M22 28C22 28 25 24 23 20" stroke="#9A856D" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* 우측 뱃지 + 전체 후기 보기 */}
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

        {/* 우측 손편지 노트 2장 */}
        <div className="flex-1 relative z-10 flex justify-center items-center min-h-[210px] lg:min-h-[280px] mt-2 lg:-mt-3">
          {/* 노트 1 */}
          <div
            className={`absolute w-52 lg:w-64 bg-[#FFFFFF] rounded-xl p-4 shadow-md border border-[#D8CDBE] -rotate-2`}
            style={{ left: "4%", top: "4px" }}
          >
            {/* TODO: 실제 자필 후기 이미지로 교체 필요 */}
            <div className="flex flex-col gap-2">
              <div className="w-8 h-0.5 bg-[#9A856D] mb-1" />
              <p
                className="text-[13px] text-[#6A5542] leading-relaxed"
                style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}
              >
                {REVIEW_NOTES[0].text.slice(0, 90)}...
              </p>
              <p className="text-[11px] text-[#756A60] mt-2 text-right">
                — {REVIEW_NOTES[0].author}
              </p>
            </div>
          </div>

          {/* 노트 2 */}
          <div
            className={`absolute w-52 lg:w-64 bg-[#FFFFFF] rounded-xl p-4 shadow-md border border-[#D8CDBE] rotate-1`}
            style={{ right: "4%", top: "38px" }}
          >
            {/* TODO: 실제 자필 후기 이미지로 교체 필요 */}
            <div className="flex flex-col gap-2">
              <div className="w-8 h-0.5 bg-[#9A856D] mb-1" />
              <p
                className="text-[13px] text-[#6A5542] leading-relaxed"
                style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}
              >
                {REVIEW_NOTES[1].text.slice(0, 90)}...
              </p>
              <p className="text-[11px] text-[#756A60] mt-2 text-right">
                — {REVIEW_NOTES[1].author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
