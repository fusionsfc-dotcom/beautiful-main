import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import VideoModal from "../common/VideoModal";
import type { TreatmentDetail } from "../../types/treatment";

interface TreatmentHeroProps {
  data: TreatmentDetail;
  colors: { main: string; bg: string; label: string };
}

export default function TreatmentHero({ data, colors }: TreatmentHeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const close = useCallback(() => setModalOpen(false), []);

  const handlePlay = () => {
    if (!data.heroVideoUrl) {
      alert("영상을 준비 중입니다.");
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <section className="bg-[#F8F3EA] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

          {/* ── 좌측 텍스트 (40%) ── */}
          <div className="flex-1 lg:max-w-[42%]">
            {/* 카테고리 뱃지 */}
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-white text-[11px] font-bold mb-4"
              style={{ backgroundColor: colors.main }}
            >
              {colors.label} 치료
            </span>

            {/* 상단 레이블 */}
            {data.topLabel && (
              <p className="text-[12px] text-[#756A60] mb-3">{data.topLabel}</p>
            )}

            {/* 메인 타이틀 — \n으로 줄 바꿈 지원 */}
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-[#6A5542] leading-tight mb-5 whitespace-pre-line">
              {data.title}
              {data.titleSubLine && (
                <span className="block text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-[#9A856D] mt-1">
                  {data.titleSubLine}
                </span>
              )}
            </h1>

            {/* 서브 카피 */}
            {data.subtitle.length > 0 && (
              <div className="text-[14px] lg:text-[16px] text-[#2F2A26] leading-relaxed space-y-0.5">
                {data.subtitle.map((line, i) => (
                  <p key={i}>
                    {data.subtitleHighlight && line.includes(data.subtitleHighlight) ? (
                      <>
                        {line.split(data.subtitleHighlight)[0]}
                        <span className="font-extrabold" style={{ color: colors.main }}>
                          {data.subtitleHighlight}
                        </span>
                        {line.split(data.subtitleHighlight)[1]}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* ── 우측 이미지 + 플레이 버튼 (60%) ── */}
          <div className="w-full lg:flex-1 h-60 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-md relative">
            {/* TODO: 실제 시술 사진으로 교체 */}
            <img
              src={data.heroImage}
              alt={`${data.title} 시술 장면`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* 플레이 버튼 — heroVideoLabel 또는 heroVideoUrl이 있을 때만 표시 */}
            {(data.heroVideoLabel || data.heroVideoUrl) && (
              <button
                onClick={handlePlay}
                aria-label={data.heroVideoLabel || "영상 보기"}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full bg-[#F8F3EA]/85 shadow-lg flex items-center justify-center group-hover:bg-white transition-colors">
                  <Play size={24} color="#6A5542" fill="#6A5542" className="translate-x-0.5" />
                </div>
                {data.heroVideoLabel && (
                  <span
                    className="text-white text-[12px] font-bold px-4 py-1.5 rounded-full"
                    style={{ backgroundColor: `${colors.main}CC` }}
                  >
                    {data.heroVideoLabel}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {modalOpen && data.heroVideoUrl && (
        <VideoModal url={data.heroVideoUrl} onClose={close} />
      )}
    </>
  );
}
