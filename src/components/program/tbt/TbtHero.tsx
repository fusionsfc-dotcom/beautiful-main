/** TbtHero — 히어로 섹션 (영상 새 창 재생) */
import { Play } from "lucide-react";
import { TBT_HERO_IMAGE, TBT_VIDEO_LINK } from "../../../data/tbtData";

export default function TbtHero() {
  const openVideo = () => {
    window.open(TBT_VIDEO_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-[#F8F3EA] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

        {/* ── 텍스트 영역 ── */}
        <div className="flex-1">
          <div className="flex items-baseline gap-3 flex-wrap mb-3">
            <h1 className="text-[30px] sm:text-[36px] lg:text-[44px] font-extrabold text-[#6A5542] leading-tight">
              턱관절 균형 요법
            </h1>
            <span className="text-[16px] lg:text-[18px] font-bold text-[#756A60]">(TBT)</span>
          </div>

          <p className="text-[15px] lg:text-[17px] text-[#2F2A26] leading-relaxed mb-6 max-w-md">
            턱관절 균형을 바로잡으면
            <br />
            항암 중 나타나는{" "}
            <span className="font-extrabold" style={{ color: "#9A856D" }}>
              다양한 증상
            </span>
            도 함께 좋아집니다
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {["통증 완화", "전신 균형 회복", "면역 안정"].map((tag, i) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="bg-[#EFE7DC] text-[#9A856D] text-[12px] font-bold px-4 py-1.5 rounded-full">
                  {tag}
                </span>
                {i < 2 && <span className="text-[#9A856D] font-bold text-[14px]">+</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── 이미지 + 중앙 플레이 ── */}
        <div className="w-full lg:w-[480px] lg:flex-shrink-0 relative">
          <div className="relative h-60 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-md">
            <img
              src={TBT_HERO_IMAGE}
              alt="턱관절 균형 치료 시술 장면"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(139,42,31,0.12) 0%, transparent 65%)",
              }}
            />

            <button
              type="button"
              onClick={openVideo}
              aria-label="TBT 영상 보기"
              className="absolute inset-0 z-10 flex items-center justify-center group"
            >
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F8F3EA]/90 shadow-lg flex items-center justify-center group-hover:bg-white group-hover:scale-105 transition-all">
                <Play size={24} color="#6A5542" fill="#6A5542" className="translate-x-0.5" />
              </span>
            </button>
          </div>

          <div className="absolute bottom-1 right-4 translate-y-full mt-1 pointer-events-none">
            <span className="bg-[#6A5542]/80 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
              TBT 영상 보기
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
