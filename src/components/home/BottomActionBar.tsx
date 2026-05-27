/** BottomActionBar — 하단 고정 4개 액션 버튼 */
// iOS safe-area-inset-bottom 대응

import { Link } from "react-router";

const ACTIONS = [
  {
    id: "phone",
    label: "전화 상담",
    href: "tel:031-945-2000",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "talk",
    label: "네이버 톡톡",
    // TODO: 실제 네이버 톡톡 URL로 교체 필요
    href: "https://talk.naver.com/ct/wc4u6k",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "reservation",
    label: "빠른 예약",
    href: "/reservation",
    external: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "location",
    label: "오시는 길",
    href: "/about#location",
    external: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function BottomActionBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#3D2817]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex divide-x divide-white/10">
        {ACTIONS.map((action) =>
          action.external ? (
            <a
              key={action.id}
              href={action.href}
              target={action.id !== "phone" ? "_blank" : undefined}
              rel={action.id !== "phone" ? "noopener noreferrer" : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white hover:bg-white/10 transition-colors active:bg-white/20"
            >
              {action.icon}
              <span className="text-[10px] font-medium tracking-wide leading-none">
                {action.label}
              </span>
            </a>
          ) : (
            <Link
              key={action.id}
              to={action.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white hover:bg-white/10 transition-colors active:bg-white/20"
            >
              {action.icon}
              <span className="text-[10px] font-medium tracking-wide leading-none">
                {action.label}
              </span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
