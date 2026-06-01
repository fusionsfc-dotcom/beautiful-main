import { MapPin, Building2, UserRound } from "lucide-react";
import { Link } from "react-router";

export default function FinalConsultBar() {
  return (
    <section className="mt-2 pb-6 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* 상단 — 다크 그라데이션 박스 */}
        <div
          className="rounded-2xl px-6 py-7 flex flex-col md:flex-row items-start md:items-center gap-5"
          style={{
            background: "linear-gradient(135deg, #6A5542 0%, #9A856D 100%)",
          }}
        >
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center">
            <UserRound size={24} color="white" strokeWidth={1.8} />
          </div>

          {/* 텍스트 */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-[15px] lg:text-[17px] leading-snug mb-1">
              혼자가 아닙니다. 지금부터 함께입니다
            </p>
            <p className="text-white/70 text-[13px]">전문 의료진이 직접 상담해 드립니다.</p>
          </div>

        </div>

        {/* 하단 — 베이지 링크 박스 */}
        <div className="bg-[#F8F3EA] rounded-2xl border border-[#D8CDBE] px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-around gap-3 sm:gap-0">
            <Link
              to="/hospital/location"
              className="flex items-center gap-2 text-[13px] font-medium text-[#9A856D] hover:text-[#6A5542] transition-colors"
            >
              <MapPin size={15} color="#9A856D" />
              오시는 길
            </Link>
            <span className="hidden sm:block h-4 w-px bg-[#D8CDBE]" />
            <Link
              to="/hospital/facilities"
              className="flex items-center gap-2 text-[13px] font-medium text-[#9A856D] hover:text-[#6A5542] transition-colors"
            >
              <Building2 size={15} color="#9A856D" />
              둘러보기
            </Link>
            <span className="hidden sm:block h-4 w-px bg-[#D8CDBE]" />
            <Link
              to="/hospital/doctors"
              className="flex items-center gap-2 text-[13px] font-medium text-[#9A856D] hover:text-[#6A5542] transition-colors"
            >
              <UserRound size={15} color="#9A856D" />
              의료진 소개
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
