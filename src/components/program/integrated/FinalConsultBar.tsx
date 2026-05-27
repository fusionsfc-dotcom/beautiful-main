import { Phone, MessageSquare, CalendarCheck, MapPin, Building2, UserRound } from "lucide-react";
import { Link } from "react-router";

const TEL = "tel:031-966-6677";
const NAVER_TALK = "https://talk.naver.com/ct/wc9es3";
const RESERVE = "https://booking.naver.com/booking/13/bizes/1046171";

export default function FinalConsultBar() {
  return (
    <section className="mt-2 pb-6 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* 상단 — 다크 그라데이션 박스 */}
        <div
          className="rounded-2xl px-6 py-7 flex flex-col md:flex-row items-start md:items-center gap-5"
          style={{
            background: "linear-gradient(135deg, #3D2817 0%, #5B3A1F 100%)",
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

          {/* 버튼 3개 */}
          <div className="flex flex-wrap gap-2">
            <a
              href={TEL}
              className="inline-flex items-center gap-1.5 bg-white text-[#3D2817] text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-[#FAF6EE] transition-colors"
            >
              <Phone size={13} />
              전화 상담
            </a>
            <a
              href={NAVER_TALK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-[#3D2817] text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-[#FAF6EE] transition-colors"
            >
              <MessageSquare size={13} />
              네이버 톡톡
            </a>
            <a
              href={RESERVE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-[#3D2817] text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-[#FAF6EE] transition-colors"
            >
              <CalendarCheck size={13} />
              상담 예약
            </a>
          </div>
        </div>

        {/* 하단 — 베이지 링크 박스 */}
        <div className="bg-[#FAF6EE] rounded-2xl border border-[#E8DCC8] px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-around gap-3 sm:gap-0">
            <Link
              to="/hospital/location"
              className="flex items-center gap-2 text-[13px] font-medium text-[#5B3A1F] hover:text-[#3D2817] transition-colors"
            >
              <MapPin size={15} color="#C9A567" />
              오시는 길
            </Link>
            <span className="hidden sm:block h-4 w-px bg-[#E8DCC8]" />
            <Link
              to="/hospital/facilities"
              className="flex items-center gap-2 text-[13px] font-medium text-[#5B3A1F] hover:text-[#3D2817] transition-colors"
            >
              <Building2 size={15} color="#C9A567" />
              둘러보기
            </Link>
            <span className="hidden sm:block h-4 w-px bg-[#E8DCC8]" />
            <Link
              to="/hospital/doctors"
              className="flex items-center gap-2 text-[13px] font-medium text-[#5B3A1F] hover:text-[#3D2817] transition-colors"
            >
              <UserRound size={15} color="#C9A567" />
              의료진 소개
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
