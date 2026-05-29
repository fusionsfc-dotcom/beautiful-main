import { Link } from "react-router";

// TODO: 실제 네이버 톡톡 URL로 교체 필요
const NAVER_TALK_URL = "https://talk.naver.com/ct/wc4u6k";

const ACTIONS = [
  {
    id: "phone",
    label: "전화상담",
    href: "tel:031-945-2000",
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.02-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "talk",
    label: "네이버톡톡",
    href: NAVER_TALK_URL,
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "reservation",
    label: "상담예약",
    href: "/reservation",
    external: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "location",
    label: "오시는길",
    href: "/about#location",
    external: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A856D" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

interface BottomQuickActionsProps {
  onClose: () => void;
}

export default function BottomQuickActions({ onClose }: BottomQuickActionsProps) {
  return (
    <div className="bg-[#FAF0E0] rounded-2xl overflow-hidden">
      {/* 라벨 */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[11px] text-[#8B6F47] font-medium tracking-wide">
          퀵 액션 (상시 노출)
        </p>
      </div>
      {/* 4개 버튼 */}
      <div className="grid grid-cols-4">
        {ACTIONS.map((action) => {
          const content = (
            <div className="flex flex-col items-center justify-center gap-1.5 py-3 hover:bg-[#EDE3D0] transition-colors cursor-pointer">
              {action.icon}
              <span className="text-[11px] font-semibold text-[#9A856D] text-center leading-tight">
                {action.label}
              </span>
            </div>
          );

          if (action.external) {
            return (
              <a
                key={action.id}
                href={action.href}
                target={action.id === "phone" ? undefined : "_blank"}
                rel={action.id === "phone" ? undefined : "noopener noreferrer"}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={action.id} to={action.href} onClick={onClose}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
