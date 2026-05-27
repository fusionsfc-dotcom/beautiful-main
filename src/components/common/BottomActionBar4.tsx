/** BottomActionBar4 — 4분할 하단 고정 액션바 */
import { Phone, MessageSquare, CalendarCheck, MapPin } from "lucide-react";

const TEL = "tel:031-966-6677";
const NAVER_TALK = "https://talk.naver.com/ct/wc9es3";
const RESERVE = "https://booking.naver.com/booking/13/bizes/1046171";
const MAP = "https://map.naver.com/v5/search/%EB%B7%B0%ED%8B%B0%ED%92%80%ED%95%9C%EB%B0%A9%EB%B3%91%EC%9B%90";

const ACTIONS = [
  { href: TEL,        Icon: Phone,          label: "전화 상담", sub: "031-966-6677", external: false },
  { href: NAVER_TALK, Icon: MessageSquare,   label: "네이버 톡톡", sub: "실시간 상담",  external: true },
  { href: RESERVE,    Icon: CalendarCheck,   label: "상담 예약", sub: "빠른 예약",    external: true },
  { href: MAP,        Icon: MapPin,          label: "오시는 길", sub: "위치 안내",    external: true },
];

export default function BottomActionBar4() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#3D2817] safe-area-bottom">
      <div className="grid grid-cols-4">
        {ACTIONS.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center gap-1 py-3 hover:bg-[#5B3A1F] transition-colors active:bg-[#5B3A1F]"
          >
            <action.Icon size={18} color="white" strokeWidth={1.8} />
            <span className="text-white text-[11px] font-bold">{action.label}</span>
            {/* 서브 텍스트는 태블릿 이상에서만 표시 */}
            <span className="hidden sm:block text-white/60 text-[9px]">{action.sub}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
