/**
 * ConsultBoxWithCTAs — 침 치료 등 consultCTAs 데이터가 있는 페이지 전용
 * - 데이터 주도: ConsultCTA[] 배열을 그대로 렌더링
 * - video-review 타입: videoUrl이 있으면 VideoModal, 없으면 안내 alert
 * - 기존 ConsultBoxSimple은 그대로 유지
 */
import { useState } from "react";
import { Link } from "react-router";
import { CalendarCheck, Play, Phone, MessageSquare, HeartHandshake } from "lucide-react";
import VideoModal from "../common/VideoModal";
import type { ConsultCTA } from "../../types/treatment";

function CTAIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  const p = { size, strokeWidth: 2 };
  switch (icon) {
    case "calendar":      return <CalendarCheck {...p} />;
    case "play":          return <Play {...p} />;
    case "phone":         return <Phone {...p} />;
    case "message":       return <MessageSquare {...p} />;
    default:              return <CalendarCheck {...p} />;
  }
}

interface CTAButtonProps {
  cta: ConsultCTA;
  colors: { main: string; bg: string };
}

function CTAButton({ cta, colors }: CTAButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (cta.type === "video-review") {
    const handleClick = () => {
      if (!cta.videoUrl) {
        alert("영상을 준비 중입니다. 잠시 후 다시 확인해주세요.");
        return;
      }
      setModalOpen(true);
    };

    return (
      <>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 border-2 text-[12px] sm:text-[13px] font-bold px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
          style={{ borderColor: colors.main, color: colors.main }}
        >
          <CTAIcon icon={cta.icon} />
          <span className="flex flex-col text-left leading-tight">
            <span>{cta.label}</span>
            {cta.subtitle && (
              <span className="text-[10px] font-normal opacity-70">{cta.subtitle}</span>
            )}
          </span>
        </button>

        {modalOpen && cta.videoUrl && (
          <VideoModal url={cta.videoUrl} onClose={() => setModalOpen(false)} />
        )}
      </>
    );
  }

  if (cta.type === "reservation" && cta.href) {
    return (
      <Link
        to={cta.href}
        className="inline-flex items-center gap-2 text-white text-[12px] sm:text-[13px] font-bold px-4 py-2.5 rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
        style={{ backgroundColor: colors.main }}
      >
        <CTAIcon icon={cta.icon} />
        {cta.label}
      </Link>
    );
  }

  // 기타 타입 — 기본 다크 버튼
  return (
    <button className="inline-flex items-center gap-2 bg-[#8BC31F] text-white text-[12px] sm:text-[13px] font-bold px-4 py-2.5 rounded-full hover:bg-[#75A915] transition-colors flex-shrink-0">
      <CTAIcon icon={cta.icon} />
      {cta.label}
    </button>
  );
}

interface ConsultBoxWithCTAsProps {
  question: string;
  ctas: ConsultCTA[];
  colors: { main: string; bg: string; label: string };
}

export default function ConsultBoxWithCTAs({ question, ctas, colors }: ConsultBoxWithCTAsProps) {
  const visibleCTAs = ctas.filter((cta) => cta.type !== "reservation");

  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFFFF] rounded-2xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* 아이콘 */}
          <div className="w-12 h-12 rounded-full bg-[#EFE7DC] flex-shrink-0 flex items-center justify-center">
            <HeartHandshake size={22} color="#9A856D" strokeWidth={1.8} />
          </div>

          {/* 질문 텍스트 — \n으로 줄 바꿈 지원 */}
          <p className="flex-1 text-[15px] font-extrabold text-[#2F2A26] leading-snug whitespace-pre-line">
            {question}
          </p>

          {visibleCTAs.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {visibleCTAs.map((cta, i) => (
                <CTAButton key={i} cta={cta} colors={colors} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
