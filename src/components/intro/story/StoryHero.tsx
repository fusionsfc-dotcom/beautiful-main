import { STORY_HERO_IMAGE } from "../../../data/brandStoryData";

export default function StoryHero() {
  return (
    <section className="bg-[#FAF6EE] pt-6 pb-10 lg:pt-10 lg:pb-16 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">

        {/* ── 텍스트 영역 ── */}
        <div className="flex-1">
          {/* 상단 소제목 */}
          <p className="text-[11px] tracking-widest text-[#6B5547] uppercase font-medium mb-4">
            Brand Story &amp; Philosophy
          </p>

          {/* 메인 타이틀 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-[#3D2817] leading-tight mb-4">
            암은 절망이 아닌,
            <br />
            새로운 시작입니다
          </h1>

          {/* 구분선 */}
          <div className="w-12 h-1 bg-[#C9A567] rounded-full mb-5" />

          {/* 서브 카피 */}
          <p className="text-[15px] lg:text-[17px] text-[#5B3A1F] leading-relaxed max-w-sm">
            몸과 마음을 바로 세우면
            <br />
            치료의 결과가 달라집니다
          </p>
        </div>

        {/* ── 이미지 영역 ── */}
        <div className="w-full lg:w-[480px] lg:flex-shrink-0 h-60 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-md relative">
          {/* TODO: 실제 사진 교체 — /public/images/redesign/story/hero.jpg */}
          <img
            src={STORY_HERO_IMAGE}
            alt="자연 뷰가 보이는 1인실 — 창문 너머 자연 풍경"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FAF6EE]/10 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
