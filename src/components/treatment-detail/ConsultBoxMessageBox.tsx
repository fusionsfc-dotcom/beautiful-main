/**
 * ConsultBoxMessageBox — 좌측 메시지 + 우측 1~2개 버튼 상담 박스
 * - consultBoxVariant: "message-box" 페이지에서 사용
 * - ctas 배열로 1개(구강관리) 또는 2개(효소찜질) 버튼 모두 지원
 * - 기존 ConsultBoxSimple·ConsultBoxWithCTAs는 그대로 유지
 */
import { useState } from "react";
import { Link } from "react-router";
import { CalendarCheck, Play, HeartHandshake } from "lucide-react";
import VideoModal from "../common/VideoModal";
import type { ConsultCTA } from "../../types/treatment";

interface CTAButtonProps {
  cta: ConsultCTA;
  colors: { main: string };
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
          className="w-full flex items-center gap-3 border-2 text-[12px] sm:text-[13px] font-bold px-4 py-3 rounded-xl hover:opacity-80 transition-opacity"
          style={{ borderColor: colors.main, color: colors.main, backgroundColor: "white" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${colors.main}15` }}
          >
            <Play size={14} style={{ color: colors.main }} fill={colors.main} className="translate-x-0.5" />
          </div>
          <span className="flex flex-col text-left leading-tight">
            <span>{cta.label}</span>
            {cta.subtitle && (
              <span className="text-[10px] font-normal opacity-60 mt-0.5">{cta.subtitle}</span>
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
        className="w-full flex items-center gap-3 text-white text-[12px] sm:text-[13px] font-bold px-4 py-3 rounded-xl hover:opacity-85 transition-opacity"
        style={{ backgroundColor: colors.main }}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <CalendarCheck size={14} color="white" strokeWidth={2} />
        </div>
        <span>{cta.label}</span>
      </Link>
    );
  }

  return null;
}

interface ConsultBoxMessageBoxProps {
  message: string[];
  /** 1개 또는 2개 CTA 모두 지원 */
  ctas?: ConsultCTA[];
  colors: { main: string; bg: string; label: string };
}

export default function ConsultBoxMessageBox({
  message,
  ctas = [],
  colors,
}: ConsultBoxMessageBoxProps) {
  return (
    <section className="px-5 lg:px-8 py-8 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-5"
          style={{ backgroundColor: `${colors.main}12` }}
        >
          {/* 아이콘 + 메시지 */}
          <div className="flex items-start gap-3 flex-1">
            <div
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5"
              style={{ backgroundColor: `${colors.main}25` }}
            >
              <HeartHandshake size={22} strokeWidth={1.8} style={{ color: colors.main }} />
            </div>
            <div>
              {message.map((line, i) => (
                <p key={i} className="text-[14px] font-bold text-[#2A1F18] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* CTA 버튼 영역 (1~2개) */}
          {ctas.length > 0 && (
            <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[260px]">
              {ctas.map((cta, i) => (
                <CTAButton key={i} cta={cta} colors={colors} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
