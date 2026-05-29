import { Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import HandwrittenNote from "./HandwrittenNote";
import { handwrittenReviews } from "../../../data/nutritionData";

export default function HandwrittenReviewsSection() {
  return (
    <section className="px-5 lg:px-8 py-12 lg:py-14">
      <div className="max-w-6xl mx-auto">
        {/* 타이틀 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} className="rotate-180" />
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#2F2A26]">
            실제 환자 후기
          </h2>
          <Leaf size={14} color="#9A856D" strokeWidth={1.8} />
        </div>

        {/* 4장 노트 — 모바일 2×2, 데스크탑 4열 */}
        {/* 노트가 서로 살짝 겹치지 않도록 충분한 padding 적용 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-4">
          {handwrittenReviews.map((review, i) => (
            <HandwrittenNote key={i} review={review} />
          ))}
        </div>

        {/* 더 많은 후기 보기 */}
        <div className="flex justify-center mt-8">
          <Link
            to="/review/handwritten"
            className="inline-flex items-center gap-2 bg-[#FFFFFF] border border-[#D8CDBE] text-[#9A856D] text-[14px] font-bold px-6 py-3 rounded-full hover:bg-[#EFE7DC] transition-colors"
          >
            더 많은 후기 보기
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
