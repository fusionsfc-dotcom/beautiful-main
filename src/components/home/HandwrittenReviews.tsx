/** HandwrittenReviews — 자필 후기 (다크 브라운 배경 + 손편지 노트) */
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

const BADGES = [
  "치료 효과",
  "식단 만족",
  "친절한 서비스",
  "쾌적한 환경",
];

export default function HandwrittenReviews() {
  return (
    <section
      className="py-14 lg:py-20 px-5 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #3D2817 0%, #5B3A1F 100%)",
      }}
    >
      <div className="lg:max-w-6xl lg:mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* 좌측 텍스트 */}
        <div className="flex-1 mb-10 lg:mb-0">
          <p className="text-sm text-[#C9A567] tracking-widest mb-4">
            환자분들의 진심이 증명합니다
          </p>

          {/* 자필 후기 + 100+ */}
          <div className="flex items-end gap-4 mb-6">
            {/* 월계관 왼쪽 */}
            <svg width="28" height="40" viewBox="0 0 28 40" fill="none" aria-hidden="true">
              <path d="M14 38C8 32 2 24 2 16C2 9 7 4 14 4" stroke="#C9A567" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 20C8 20 6 16 8 12" stroke="#C9A567" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M6 28C6 28 3 24 5 20" stroke="#C9A567" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>

            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-none">
                자필 후기
              </h2>
              <span className="text-4xl lg:text-5xl font-extrabold text-[#C9A567]">
                100+
              </span>
            </div>

            {/* 월계관 오른쪽 */}
            <svg width="28" height="40" viewBox="0 0 28 40" fill="none" aria-hidden="true">
              <path d="M14 38C20 32 26 24 26 16C26 9 21 4 14 4" stroke="#C9A567" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 20C20 20 22 16 20 12" stroke="#C9A567" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M22 28C22 28 25 24 23 20" stroke="#C9A567" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 뱃지 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="text-xs text-[#C9A567] border border-[#C9A567]/40 px-3 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* 전체 후기 보기 버튼 */}
          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-[#3D2817] text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#FAF6EE] transition-colors"
          >
            전체 후기 보기
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* 우측 손편지 노트 2장 */}
        <div className="flex-1 relative flex justify-center items-center min-h-[260px] lg:min-h-[320px]">
          {/* 노트 1 */}
          <div
            className={`absolute w-52 lg:w-64 bg-[#F8E8D4] rounded-xl p-4 shadow-xl -rotate-2`}
            style={{ left: "5%", top: 0 }}
          >
            {/* TODO: 실제 자필 후기 이미지로 교체 필요 */}
            <div className="flex flex-col gap-2">
              <div className="w-8 h-0.5 bg-[#C9A567] mb-1" />
              <p
                className="text-[13px] text-[#3D2817] leading-relaxed"
                style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}
              >
                {REVIEW_NOTES[0].text.slice(0, 90)}...
              </p>
              <p className="text-[11px] text-[#6B5547] mt-2 text-right">
                — {REVIEW_NOTES[0].author}
              </p>
            </div>
          </div>

          {/* 노트 2 */}
          <div
            className={`absolute w-52 lg:w-64 bg-[#F8E8D4] rounded-xl p-4 shadow-xl rotate-1`}
            style={{ right: "5%", top: "40px" }}
          >
            {/* TODO: 실제 자필 후기 이미지로 교체 필요 */}
            <div className="flex flex-col gap-2">
              <div className="w-8 h-0.5 bg-[#C9A567] mb-1" />
              <p
                className="text-[13px] text-[#3D2817] leading-relaxed"
                style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}
              >
                {REVIEW_NOTES[1].text.slice(0, 90)}...
              </p>
              <p className="text-[11px] text-[#6B5547] mt-2 text-right">
                — {REVIEW_NOTES[1].author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
