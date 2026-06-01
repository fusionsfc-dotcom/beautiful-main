/**
 * BottomActionBarFull
 * - 협진 안내 텍스트 + 전화·톡톡·예약 3분할 + 오시는길·둘러보기·의료진 보조 3링크
 * - 뇌신경뜸 등 bottomBarVariant: "full" 페이지에서 사용
 * - 기존 BottomActionBar4는 그대로 유지
 */
import { Phone, MessageSquare, CalendarCheck, MapPin, Building2, UserSquare2 } from "lucide-react";

const PHONE = "02-000-0000";   // TODO: 실제 번호로 교체
const NAVER_TALK = "https://talk.naver.com/"; // TODO: 실제 URL
const RESERVE_URL = "/reserve";
const MAP_URL = "/intro/location";
const TOUR_URL = "/intro/facilities";
const DOCTOR_URL = "/intro/doctors";

export default function BottomActionBarFull() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#6A5542] shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", transform: "translateZ(0)" }}
    >
      {/* 상단: 협진 안내 + 3분할 액션 */}
      <div className="flex flex-col md:flex-row">
        {/* 협진 안내 텍스트 */}
        <div className="flex items-center gap-3 px-5 py-3 md:w-2/5 md:border-r border-white/10">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <UserSquare2 size={18} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-white font-extrabold text-[13px] leading-tight">혼자가 아닙니다.</p>
            <p className="text-[#9A856D] font-bold text-[12px] leading-tight">지금부터 함께입니다</p>
            <p className="text-white/60 text-[10px] mt-0.5">전문 의료진이 직접 상담해 드립니다.</p>
          </div>
        </div>

        {/* 3분할 액션 */}
        <div className="flex flex-1 divide-x divide-white/10">
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <Phone size={20} color="#9A856D" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">전화 상담</span>
            <span className="text-[9px] text-white/60">{PHONE}</span>
          </a>

          <a
            href={NAVER_TALK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <MessageSquare size={20} color="#9A856D" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">네이버 톡톡</span>
            <span className="text-[9px] text-white/60">실시간 상담</span>
          </a>

          <a
            href={RESERVE_URL}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <CalendarCheck size={20} color="#9A856D" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">상담 예약</span>
            <span className="text-[9px] text-white/60">빠른 예약하기</span>
          </a>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-white/10 mx-4" />

      {/* 하단: 보조 3링크 */}
      <div className="flex divide-x divide-white/10">
        <a
          href={MAP_URL}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <MapPin size={16} color="white" strokeWidth={1.8} />
          <span className="text-[10px] text-white/70">오시는 길</span>
        </a>
        <a
          href={TOUR_URL}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <Building2 size={16} color="white" strokeWidth={1.8} />
          <span className="text-[10px] text-white/70">둘러보기</span>
        </a>
        <a
          href={DOCTOR_URL}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <UserSquare2 size={16} color="white" strokeWidth={1.8} />
          <span className="text-[10px] text-white/70">의료진 소개</span>
        </a>
      </div>
    </div>
  );
}
