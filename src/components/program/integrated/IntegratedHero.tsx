/** IntegratedHero — 의·치·한 협진 히어로 섹션 */

// TODO: 실제 사진 교체 필요 — /public/images/redesign/integrated-hero.jpg (1인실, 자연광)
const HERO_IMAGE =
  "https://pzivoxyngofrrpdjramu.supabase.co/storage/v1/object/public/images/room_pa.jpeg";

export default function IntegratedHero() {
  return (
    <section className="bg-[#FAF6EE] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        {/* ── 텍스트 영역 ── */}
        <div className="flex-1">
          {/* 메인 타이틀 */}
          <h1 className="text-[30px] sm:text-[36px] lg:text-[44px] font-extrabold leading-tight mb-3">
            {/* 의(블루) · 치(퍼플) · 한(그린) · 협진(다크브라운) */}
            <span style={{ color: "#2D5BA0" }}>의</span>
            <span className="text-[#9B8B7A] font-normal mx-2">·</span>
            <span style={{ color: "#5D3FA0" }}>치</span>
            <span className="text-[#9B8B7A] font-normal mx-2">·</span>
            <span style={{ color: "#2D7A3E" }}>한</span>
            <span className="text-[#9B8B7A] font-normal mx-2">·</span>
            <span className="text-[#3D2817]">협진</span>
          </h1>
          <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-[#3D2817] leading-snug mb-5">
            항암관리·항암재활 시스템
          </h2>

          {/* 서브 카피 */}
          <p className="text-[14px] lg:text-[16px] text-[#6B5547] leading-relaxed max-w-md">
            의사·치과·한의사가 함께 설계하여
            <br />
            항암 치료의 효과를 높이고, 회복을 앞당깁니다.
          </p>

          {/* 3과 컬러 칩 */}
          <div className="flex gap-2 mt-7 flex-wrap">
            {[
              { label: "양방 의학", color: "#2D5BA0", bg: "#E5EDF7" },
              { label: "치과",     color: "#5D3FA0", bg: "#EBE5F5" },
              { label: "한방 의학", color: "#2D7A3E", bg: "#E8F3EB" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="text-[12px] font-bold px-3 py-1.5 rounded-full"
                style={{ color: chip.color, backgroundColor: chip.bg }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── 이미지 영역 ── */}
        <div className="w-full lg:w-[480px] lg:flex-shrink-0 h-56 sm:h-72 lg:h-[400px] rounded-2xl overflow-hidden shadow-md relative">
          {/* TODO: 실제 사진 교체 — integrated-hero.jpg */}
          <img
            src={HERO_IMAGE}
            alt="1인실 병실 — 자연광, 창밖 풍경"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FAF6EE]/10 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
