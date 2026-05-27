/** QuickLinkList — 빠른 정보 링크 (리스트형) */

import { Link } from "react-router";

const LINKS = [
  {
    number: "1",
    title: "암 칼럼",
    subtitle: "암 치료와 회복에 도움이 되는 전문 칼럼을 확인하세요.",
    href: "/columns",
    external: false,
  },
  {
    number: "2",
    title: "자주 묻는 질문 (FAQ)",
    subtitle: "환자분들이 가장 궁금해하시는 질문입니다.",
    href: "/columns",
    external: false,
  },
];

export default function QuickLinkList() {
  return (
    <section className="bg-[#FAF6EE] py-10 lg:py-14 px-5 lg:px-8 border-t border-[#E8DCC8]">
      <div className="lg:max-w-6xl lg:mx-auto">
        <p className="text-xs text-[#C9A567] tracking-widest mb-5 uppercase">
          Quick Links
        </p>
        <div className="flex flex-col divide-y divide-[#E8DCC8]">
          {LINKS.map((link) => (
            <Link
              key={link.number}
              to={link.href}
              className="flex items-center gap-4 py-5 group hover:bg-[#F5EEE0] -mx-5 px-5 lg:-mx-8 lg:px-8 transition-colors"
            >
              {/* 번호 */}
              <span className="text-2xl font-extrabold text-[#E8DCC8] group-hover:text-[#C9A567] transition-colors w-8 flex-shrink-0">
                {link.number}.
              </span>

              {/* 텍스트 */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-[#2A1F18] mb-0.5">
                  {link.title}
                </p>
                <p className="text-sm text-[#6B5547] truncate">
                  {link.subtitle}
                </p>
              </div>

              {/* 화살표 */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A567"
                strokeWidth="2"
                strokeLinecap="round"
                className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
