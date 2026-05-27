/**
 * BottomActionBarIntegrated
 * - 협진 안내(좌 30%) + 3분할 액션(우 70%) + 보조 3링크
 * - bottomBarVariant: "integrated" 페이지 (항암 치과 구강관리 등)
 * - 기존 BottomActionBar4 / BottomActionBarFull 는 그대로 유지
 */
import { Phone, MessageSquare, CalendarCheck, MapPin, Building2, UserSquare2 } from "lucide-react";

const PHONE = "02-000-0000";           // TODO: 실제 번호로 교체
const NAVER_TALK = "https://talk.naver.com/"; // TODO: 실제 URL
const RESERVE_URL = "/reservation";
const MAP_URL = "/intro/location";
const TOUR_URL = "/intro/facilities";
const DOCTOR_URL = "/intro/doctors";

export default function BottomActionBarIntegrated() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#3D2817] shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", transform: "translateZ(0)" }}
    >
      {/* 상단: 협진 안내(좌) + 3분할 액션(우) */}
      <div className="flex flex-col sm:flex-row">
        {/* 협진 안내 */}
        <div className="flex items-center gap-3 px-4 py-3 sm:w-[30%] sm:border-r border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <UserSquare2 size={16} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-white font-extrabold text-[12px] leading-tight">혼자가 아닙니다.</p>
            <p className="text-white/60 text-[10px] mt-0.5">전문 의료진이 직접 상담해 드립니다.</p>
          </div>
        </div>

        {/* 3분할 액션 */}
        <div className="flex flex-1 divide-x divide-white/10">
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <Phone size={18} color="#C9A567" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">전화 상담</span>
            <span className="text-[9px] text-white/50">{PHONE}</span>
          </a>

          <a
            href={NAVER_TALK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <MessageSquare size={18} color="#C9A567" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">네이버 톡톡</span>
            <span className="text-[9px] text-white/50">실시간 상담</span>
          </a>

          <a
            href={RESERVE_URL}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 hover:bg-white/10 transition-colors active:bg-white/20"
          >
            <CalendarCheck size={18} color="#C9A567" strokeWidth={1.8} />
            <span className="text-[10px] text-white font-bold">상담 예약</span>
            <span className="text-[9px] text-white/50">빠른 예약하기</span>
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
          <MapPin size={14} color="white" strokeWidth={1.8} />
          <span className="text-[9px] text-white/70">오시는 길</span>
        </a>
        <a
          href={TOUR_URL}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <Building2 size={14} color="white" strokeWidth={1.8} />
          <span className="text-[9px] text-white/70">둘러보기</span>
        </a>
        <a
          href={DOCTOR_URL}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <UserSquare2 size={14} color="white" strokeWidth={1.8} />
          <span className="text-[9px] text-white/70">의료진 소개</span>
        </a>
      </div>
    </div>
  );
}
