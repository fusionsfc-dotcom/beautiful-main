/** QuickActionsTriple — 하단 3개 빠른 액션 (재사용 가능 컴포넌트) */
import { Phone, MessageSquare, CalendarCheck } from "lucide-react";

const TEL = "tel:031-966-6677";
const NAVER_TALK = "https://talk.naver.com/ct/wc9es3";
const RESERVE = "https://booking.naver.com/booking/13/bizes/1046171";

const ACTIONS = [
  {
    href: TEL,
    Icon: Phone,
    label: "전화 상담",
    sub: "031-966-6677",
    external: false,
  },
  {
    href: NAVER_TALK,
    Icon: MessageSquare,
    label: "네이버 톡톡",
    sub: "실시간 상담",
    external: true,
  },
  {
    href: RESERVE,
    Icon: CalendarCheck,
    label: "상담 예약",
    sub: "빠른 예약하기",
    external: true,
  },
];

export default function QuickActionsTriple() {
  return (
    <section className="px-5 lg:px-8 pb-10 pt-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FBF5E9] rounded-2xl border border-[#E8DCC8] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {ACTIONS.map((action, i) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={[
                  "flex items-center gap-4 px-6 py-5 hover:bg-[#F5EEE0] transition-colors",
                  i < ACTIONS.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-[#E8DCC8]"
                    : "",
                ].join(" ")}
              >
                <div className="w-11 h-11 rounded-full bg-[#3D2817]/10 flex-shrink-0 flex items-center justify-center">
                  <action.Icon size={20} color="#3D2817" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[14px] font-extrabold text-[#2A1F18]">{action.label}</p>
                  <p className="text-[12px] text-[#6B5547]">{action.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
