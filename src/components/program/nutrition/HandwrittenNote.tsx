import type { HandwrittenReview } from "../../../data/nutritionData";

interface HandwrittenNoteProps {
  review: HandwrittenReview;
}

export default function HandwrittenNote({ review }: HandwrittenNoteProps) {
  const deg = review.rotate ?? 0;

  return (
    <div
      className="relative flex flex-col justify-between rounded-lg p-5 transition-transform duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "#F8E8D4",
        transform: `rotate(${deg}deg)`,
        boxShadow: "0 4px 14px rgba(61,40,23,0.10)",
        // 노트 가로줄 효과
        backgroundImage: "linear-gradient(transparent calc(1.6em - 1px), rgba(91,58,31,0.10) calc(1.6em - 1px))",
        backgroundSize: "100% 1.6em",
        backgroundPositionY: "calc(1.6em * 3.1)",
        minHeight: "220px",
      }}
    >
      {/* 상단 핀 장식 */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C9A567]/60 shadow-sm" />

      {/* 본문 손글씨 */}
      <div className="mt-5 mb-4 flex-1">
        {review.content.map((line, i) => (
          <p
            key={i}
            className="leading-[1.6em] text-[#5B3A1F]"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              fontSize: "19px",
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* 카테고리 뱃지 */}
      <div className="flex justify-center">
        <span className="inline-block bg-[#F0E6D2] text-[#5B3A1F] text-[12px] font-bold px-3 py-1 rounded-full border border-[#E8DCC8]">
          {review.category}
        </span>
      </div>
    </div>
  );
}
